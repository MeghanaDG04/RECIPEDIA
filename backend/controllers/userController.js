const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
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
};

exports.updateProfile = async (req, res) => {
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
};

exports.getUser = async (req, res) => {
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
};

exports.deleteUser = async (req, res) => {
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
};
