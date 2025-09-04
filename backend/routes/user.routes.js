const router = require('express').Router();
const { getProfile, updateProfile, deleteAccount } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/:email', authenticateToken, getProfile);
router.put('/:email', authenticateToken, updateProfile);
router.delete('/:email', authenticateToken, deleteAccount);

module.exports = router;
