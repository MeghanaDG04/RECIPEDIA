const express = require("express");
const {
  recipes,
  recipeComments,
  recipeModification,
  removeRecipe,
  likeRecipe,
  recipeById,
  getAllRecipes,
  recipeFeatured,
} = require("../controllers/recipeController");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

router.post("/recipes", authenticateToken, recipes);
router.get("/recipes", getAllRecipes);
router.post("/recipes/:id/comments", authenticateToken, recipeComments);

router.put("/recipes/:id", authenticateToken, recipeModification);
router.delete("/recipes/:id", authenticateToken, removeRecipe);

router.post("/recipes/:id/like", authenticateToken, likeRecipe);
router.get("/recipes/:id", recipeById);

router.get("/recipes/featured", recipeFeatured);

module.exports = router;
