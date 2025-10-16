// backend/controllers/user.controller.js
const User = require('../models/User');
const asyncHandler = require('../utils/asynchandler');

// Helper to remove password from user object
const sanitizeUser = (user) => {
  if (!user) return null;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

exports.getProfile = asyncHandler(async (req, res) => {
  // The user's ID comes from the validated token, not a URL parameter
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: sanitizeUser(user) });
});

// PUT /users/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  // IMPORTANT: Prevent users from updating their email or password through this route
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

// DELETE /users/profile
exports.deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, message: 'Account deleted successfully' });
});