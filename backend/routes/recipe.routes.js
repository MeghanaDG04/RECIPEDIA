const router = require('express').Router();
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, likeRecipe } = require('../controllers/recipe.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', authenticateToken, createRecipe);
router.put('/:id', authenticateToken, updateRecipe);
router.delete('/:id', authenticateToken, deleteRecipe);
router.post('/:id/like', authenticateToken, likeRecipe);

module.exports = router;
