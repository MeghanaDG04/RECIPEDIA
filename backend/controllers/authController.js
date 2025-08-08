const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
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
};
