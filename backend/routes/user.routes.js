// backend/routes/user.routes.js
const router = require('express').Router();
const { getProfile, updateProfile, deleteAccount } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteAccount);

module.exports = router;