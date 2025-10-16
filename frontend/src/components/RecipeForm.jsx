// src/components/RecipeForm.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Image, List, Type } from 'lucide-react'; // Added icons for fields

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const RecipeForm = ({ newRecipe, setNewRecipe, editingRecipe, onSubmit, onCancel }) => {
  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      title: newRecipe.title.trim(),
      description: newRecipe.description.trim(),
      ingredients: newRecipe.ingredients.split(',').map(item => item.trim()).filter(item => item),
      image: newRecipe.image.trim()
    };

    if (!recipeData.title || !recipeData.description || !recipeData.ingredients.length) {
      // Note: Error handling is in parent, but you could add local state if needed
      return;
    }

    onSubmit(recipeData);
  };

  return (
    <motion.div 
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-red-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Edit className="w-6 h-6 text-red-500" />
        {editingRecipe ? "Edit Your Recipe" : "Create New Recipe"}
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <motion.div variants={inputVariants} className="relative">
          <Type className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            name="title" 
            placeholder="Recipe Title" 
            value={newRecipe.title} 
            onChange={handleChange} 
            required 
            className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white/50"
          />
        </motion.div>
        <motion.div variants={inputVariants} className="relative">
          <Type className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <textarea 
            name="description" 
            placeholder="Description" 
            value={newRecipe.description} 
            onChange={handleChange} 
            required
            rows="4"
            className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white/50"
          />
        </motion.div>
        <motion.div variants={inputVariants} className="relative">
          <List className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <textarea 
            name="ingredients" 
            placeholder="Ingredients (comma separated)" 
            value={newRecipe.ingredients} 
            onChange={handleChange} 
            required 
            rows="3"
            className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white/50"
          />
        </motion.div>
        <motion.div variants={inputVariants} className="relative">
          <Image className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          <input 
            type="url" 
            name="image" 
            placeholder="Image URL (optional)" 
            value={newRecipe.image} 
            onChange={handleChange} 
            className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white/50"
          />
        </motion.div>
        <div className="flex justify-end space-x-4 pt-2">
          {editingRecipe && (
            <motion.button 
              type="button" 
              onClick={onCancel}
              whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition shadow-sm"
            >
              Cancel
            </motion.button>
          )}
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transition"
          >
            {editingRecipe ? "Update Recipe" : "Add Recipe"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default RecipeForm;
