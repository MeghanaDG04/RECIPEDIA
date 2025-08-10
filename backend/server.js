const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/User");
const Recipe = require("./models/Recipe");
const trendingJob = require("./cron/trendingJob");
const Like = require('./models/Like');

const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173']; // fallback for development

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// JWT middleware for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
};

// Home
app.get("/", (req, res) => {
  res.send("Welcome to RECIPEDIA");
});

// Register
app.post("/register", async (req, res) => {
  console.log("Registration request received:", req.body);

  const { username, email, password, age, gender, address, phone } = req.body;

  try {
    // Validate required fields
    if (
      !username ||
      !email ||
      !password ||
      !age ||
      !gender ||
      !address ||
      !phone
    ) {
      console.log("Missing fields:", {
        username: !!username,
        email: !!email,
        password: !!password,
        age: !!age,
        gender: !!gender,
        address: !!address,
        phone: !!phone,
      });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    // Validate age
    if (isNaN(age) || age < 1 || age > 120) {
      return res
        .status(400)
        .json({ message: "Please enter a valid age between 1 and 120" });
    }

    // Validate gender
    const validGenders = ["male", "female", "other", "prefer-not-to-say"];
    if (!validGenders.includes(gender)) {
      return res
        .status(400)
        .json({ message: "Please select a valid gender option" });
    }

    // Password strength validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Check if username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      age: parseInt(age),
      gender,
      address: address.trim(),
      phone: phone.trim(),
    });

    console.log("Attempting to save user:", { username, email, age, gender });

    await user.save();

    console.log("User saved successfully");

    // Generate JWT token
    const token = jwt.sign(
      { user: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration error details:", err);

    if (err.code === 11000) {
      // Duplicate key error
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists`,
      });
    }

    if (err.name === "ValidationError") {
      // Mongoose validation error
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        message: `Validation error: ${errors.join(", ")}`,
      });
    }

    res.status(500).json({
      message: "Error registering user",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
});

// Login
// Login endpoint with improved error handling
app.post("/login", async (req, res) => {
  console.log("Login request received:", { email: req.body.email });

  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      console.log("Missing credentials");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    console.log("Looking for user with email:", email.toLowerCase().trim());

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found, checking password");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Password valid, generating token");

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not found in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Login successful for user:", user.email);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error details:", err);
    res.status(500).json({
      message: "Login error",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
});

// Forgot Password
app.post("/forgot-password", async (req, res) => {
  console.log("Forgot password request received:", { email: req.body.email });

  const { email } = req.body;

  try {
    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    console.log("Looking for user with email:", email.toLowerCase().trim());

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // For security reasons, don't reveal if the email exists or not
      console.log("User not found for password reset");
      return res.json({ 
        message: "If an account with that email exists, we've sent password reset instructions." 
      });
    }

    console.log("User found, generating reset token");

    // Generate a simple reset token (in production, you'd want a more secure token)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Store the reset token and its expiration (24 hours from now)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await user.save();

    // In a real application, you would send an email here
    // For now, we'll just log the reset token
    console.log("Password reset token generated:", resetToken);
    console.log("Reset token expires:", new Date(user.resetPasswordExpires));

    res.json({ 
      message: "If an account with that email exists, we've sent password reset instructions." 
    });
  } catch (err) {
    console.error("Forgot password error details:", err);
    res.status(500).json({
      message: "Error processing password reset request",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
});

// Protected route - Get user profile
app.get("/profile/:email", authenticateToken, async (req, res) => {
  try {
    // Ensure user can only access their own profile
    if (req.user.email !== req.params.email) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findOne({ email: req.params.email })
      .populate("favoriteRecipe")
      .populate("likedRecipes")
      .populate("savedRecipes")
      .populate("recentComments.recipe")
      .select("-password"); // Exclude password from response

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Protected route - Update user profile
app.put("/update/:email", authenticateToken, async (req, res) => {
  try {
    // Ensure user can only update their own profile
    if (req.user.email !== req.params.email) {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      username,
      password,
      avatar,
      bio,
      favoriteCuisines,
      dietaryPreferences,
      favoriteRecipe,
    } = req.body;

    const updateData = {
      username,
      avatar,
      bio,
      favoriteCuisines,
      dietaryPreferences,
      favoriteRecipe,
    };

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
      updateData.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Protected route - Add recipe
app.post("/recipes", authenticateToken, async (req, res) => {
  const { title, description, ingredients, image } = req.body;

  try {
    // Basic validation
    if (!title || !description || !ingredients) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and ingredients are required"
      });
    }

    // Create recipe
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      image,
      user: req.user.user  
    });

    await recipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      data: recipe
    });
  } catch (err) {
    console.error("Recipe creation error:", err);
    res.status(500).json({
      success: false,
      message: "Error adding recipe"
    });
  }
});


// Protected route - Add comment to recipe
app.post("/recipes/:id/comments", authenticateToken, async (req, res) => {
  const { text } = req.body;

  try {
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.comments.push({
      user: req.user.user,
      text: text.trim(),
      createdAt: new Date(),
    });

    await recipe.save();
    res.json({ message: "Comment added successfully", recipe });
  } catch (err) {
    console.error("Comment creation error:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
});

// Public routes (no authentication required)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        username: 1,
        email: 1,
        avatar: 1,
        bio: 1,
        favoriteCuisines: 1,
        dietaryPreferences: 1,
      }
    );
    res.json(users);
  } catch (err) {
    console.error("Users fetch error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      Recipe.find()
        .populate("user", "username")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Recipe.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: {
        recipes,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          pageSize: limit,
          totalItems: total
        }
      }
    });
  } catch (err) {
    console.error("Recipes fetch error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching recipes"
    });
  }
});
// GET /api/recipes/search?query=paneer&category=indian
// Example: /api/recipes/search?query=paneer&category=indian
// GET /api/recipes/search


app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "username")
      .populate("comments.user", "username");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    console.error("Recipe fetch error:", err);
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

// Protected routes for recipe modification
app.put("/recipes/:id", authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only allow recipe owner to update
    if (recipe.user.toString() !== req.user.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (err) {
    console.error("Recipe update error:", err);
    res.status(500).json({ message: "Error updating recipe" });
  }
});

app.delete("/recipes/:id", authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only allow recipe owner to delete
    if (recipe.user.toString() !== req.user.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Recipe deletion error:", err);
    res.status(500).json({ message: "Error deleting recipe" });
  }
});


// Like recipe (protected)
app.post('/recipes/:id/like', authenticateToken, async (req, res) => {
  const session = await mongoose.startSession(); 

  try {
    session.startTransaction(); 

    const recipeId = req.params.id;
    const user = req.user.user;

    // Prevent duplicate likes inside the session
    const alreadyLiked = await Like.findOne({ user: user, recipe: recipeId }).session(session);
    if (alreadyLiked) {
      await session.abortTransaction(); 
      session.endSession();
      return res.status(400).json({ message: 'You already liked this recipe.' });
    }

    // Create Like
    const newLike = new Like({ user: userId, recipe: recipeId });
    await newLike.save({ session });

    // Increment Recipe's like count
    await Recipe.findByIdAndUpdate(
      recipeId,
      { $inc: { likes: 1 } },
      { session }
    );

    await session.commitTransaction(); 
    session.endSession();

    res.status(201).json({ message: 'Recipe liked successfully.' });

  } catch (err) {
    await session.abortTransaction(); 
    session.endSession();

    console.error("Error liking recipe:", err);
    res.status(500).json({ message: 'Error liking recipe' });
  }
});


app.get('/recipes/featured', async (req, res) => {
  try {
    const featured = await Recipe.findOne({ featured: true }).populate('user', 'username');
    if (!featured) {
      return res.status(404).json({ message: 'No featured recipe today.' });
    }
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch featured recipe.' });
  }
});

// Delete user account (protected)
app.delete("/delete/:email", authenticateToken, async (req, res) => {
  try {
    if (req.user.email !== req.params.email) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Account deletion error:", err);
    res.status(500).json({ message: "Error deleting account" });
  }
});

// Use error handling middleware
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected Successfully");
    trendingJob.start();
  })
  .catch((err) => console.log("DB Connection Error:", err));

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is running on port ${port}`);
});
