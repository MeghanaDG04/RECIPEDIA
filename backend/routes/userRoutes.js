const express = require("express");
const {
  getProfile,
  updateProfile,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

router.get("/profile/:email", authenticateToken, getProfile);
router.put("/update/:email", authenticateToken, updateProfile);
router.get("/users", getUser);
router.delete("/delete/:email", authenticateToken, deleteUser);

module.exports = router;
