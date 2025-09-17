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

// GET /users/profile
exports.getProfile = asyncHandler(async (req, res) => {
  // WHY: We get the user's ID from 'req.user', which was added by the
  // 'authenticateToken' middleware. This is secure and reliable.
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: sanitizeUser(user) });
});

// PUT /users/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, {
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
  await User.findByIdAndDelete(req.user.userId);
  res.status(200).json({ success: true, message: 'Account deleted successfully' });
});