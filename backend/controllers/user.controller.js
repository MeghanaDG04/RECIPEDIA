const User = require('../models/User');
const asyncHandler = require('../utils/asynchandler');

// Helper to remove password from user object
const sanitizeUser = (user) => {
  if (!user) return null;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

// ==============================
// GET /users/profile
// ==============================
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: sanitizeUser(user) });
});

// ==============================
// PUT /users/profile
// ==============================
exports.updateProfile = asyncHandler(async (req, res) => {
  const { email, password, ...updateData } = req.body;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: sanitizeUser(updatedUser) });
});

// ==============================
// DELETE /users/profile
// ==============================
exports.deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, message: 'Account deleted successfully' });
});

// ==============================
// POST /users/favorites  → Toggle Favorite Recipe
// ==============================
exports.toggleFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.body;
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const index = user.savedRecipes.indexOf(recipeId);
  if (index === -1) {
    user.savedRecipes.push(recipeId);
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'Recipe added to favorites',
      data: user.savedRecipes,
    });
  } else {
    user.savedRecipes.splice(index, 1);
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites',
      data: user.savedRecipes,
    });
  }
});

// ==============================
// GET /users/favorites  → Get All Saved Recipes
// ==============================
exports.getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).populate('savedRecipes');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    data: user.savedRecipes,
  });
});
