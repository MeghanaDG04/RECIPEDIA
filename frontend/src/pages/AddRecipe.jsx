// src/AddRecipe.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ref } from 'react'; // Note: This should be from 'react', but for useInView, it's from framer-motion if using that variant.
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/AddRecipeCard';
import * as recipeService from '../services/recipeService';
import { authService } from '../services/authService';
import { ChefHat, UtensilsCrossed } from 'lucide-react'; // Added icons for enhancement

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const AddRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    image: "",
  });
  const [editingRecipe, setEditingRecipe] = useState(null);
  const navigate = useNavigate();
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch all recipes
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const loadRecipes = async () => {
        try {
          setLoading(true);
          setError('');
          const data = await recipeService.fetchRecipes();
          setRecipes(Array.isArray(data) ? data : []);
        } catch (err) {
          setError('Error fetching recipes: ' + err.message);
          setRecipes([]);
        } finally {
          setLoading(false);
        }
      };
      loadRecipes();
    }
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = async (recipeData) => {
    if (!authService.isAuthenticated()) {
      setError('Please log in to add recipes');
      navigate('/login');
      return;
    }

    try {
      setError('');
      if (editingRecipe) {
        // Update recipe
        const updatedRecipe = await recipeService.updateRecipe(editingRecipe._id, recipeData);
        setRecipes(prev => prev.map(r => r._id === editingRecipe._id ? updatedRecipe : r));
        setEditingRecipe(null);
      } else {
        // Add new recipe
        const addedRecipe = await recipeService.addRecipe(recipeData);
        setRecipes(prev => [...prev, addedRecipe]);
      }
      setNewRecipe({ title: "", description: "", ingredients: "", image: "" });
    } catch (err) {
      setError('Error saving recipe: ' + err.message);
    }
  };

  // Handle edit
  const handleEdit = (recipe) => {
    const currentUser = authService.getUser();
    if (!currentUser || recipe.userId !== currentUser.id) {
      setError('You can only edit your own recipes');
      return;
    }
    setNewRecipe({
      title: recipe.title,
      description: recipe.description,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients,
      image: recipe.image || ''
    });
    setEditingRecipe(recipe);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    if (!authService.isAuthenticated()) {
      setError('Please log in to delete recipes');
      navigate('/login');
      return;
    }
    try {
      await recipeService.deleteRecipe(id);
      setRecipes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      setError('Error deleting recipe: ' + err.message);
    }
  };

  // Handle like
  const handleLike = async (id) => {
    if (!authService.isAuthenticated()) {
      setError('Please log in to like recipes');
      navigate('/login');
      return;
    }
    try {
      const updatedLikes = await recipeService.likeRecipe(id);
      setRecipes(prev => prev.map(r => r._id === id ? { ...r, likes: updatedLikes } : r));
    } catch (err) {
      setError('Error liking recipe: ' + err.message);
    }
  };

  // Handle add comment
  const handleAddComment = async (recipeId, commentText) => {
    if (!commentText.trim()) return;
    if (!authService.isAuthenticated()) {
      setError('Please log in to add comments');
      navigate('/login');
      return;
    }
    try {
      const updatedRecipe = await recipeService.addComment(recipeId, commentText);
      setRecipes(prev => prev.map(r => r._id === recipeId ? updatedRecipe : r));
    } catch (err) {
      setError('Error adding comment: ' + err.message);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8"> {/* Increased pt-24 to avoid navbar overlap */}
      <div className="max-w-7xl mx-auto">
        {/* Header with Icon */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <ChefHat className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Recipe Creator</h1>
          <p className="text-lg text-gray-600 mt-2">Share your culinary masterpieces</p>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 text-red-700 p-4 rounded-xl mb-8 shadow-md flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RecipeForm
            newRecipe={newRecipe}
            setNewRecipe={setNewRecipe}
            editingRecipe={editingRecipe}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingRecipe(null);
              setNewRecipe({ title: "", description: "", ingredients: "", image: "" });
            }}
          />
        </motion.div>

        {/* Recipe List */}
        <motion.div 
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <div className="flex items-center justify-center mb-8">
            <UtensilsCrossed className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">All Recipes</h2>
          </div>
          {recipes.length === 0 ? (
            <motion.p 
              variants={childVariants}
              className="text-center text-gray-600 text-lg italic"
            >
              No recipes yet. Start creating!
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <motion.div key={recipe._id} variants={childVariants}>
                  <RecipeCard
                    recipe={recipe}
                    currentUser={authService.getUser()}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onLike={handleLike}
                    onAddComment={handleAddComment}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AddRecipe;
