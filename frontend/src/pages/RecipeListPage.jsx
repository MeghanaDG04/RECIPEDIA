import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'; // For the search bar icon
import { GiKnifeFork, GiRoastChicken, GiCakeSlice, GiMartini } from 'react-icons/gi'; // For NoResults icon
import RecipeCard from '../components/RecipeCard.jsx';
import allRecipes from '../data/recipes.json';
// --- Animation Variants (Consistent with Explore.jsx) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
// --- Reusable NoResults Component (Consistent with Explore.jsx) ---
const NoResults = ({ categoryTitle }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }} // Add exit animation
    transition={{ duration: 0.2 }}
    className="flex flex-col items-center justify-center py-12 w-full text-center"
  >
    <div className="p-8 bg-white/50 dark:bg-white/10 rounded-2xl shadow-md backdrop-blur-sm">
      {/* Dynamic icon based on category, or a fallback */}
      {categoryTitle === 'Vegetarian' && <GiKnifeFork className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />}
      {categoryTitle === 'Nonveg' && <GiRoastChicken className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />}
      {categoryTitle === 'Dessert' && <GiCakeSlice className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />}
      {categoryTitle === 'Beverages' && <GiMartini className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />}
      {categoryTitle === 'Recipes' && <GiKnifeFork className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />} {/* Fallback if no specific icon */}
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
        No {categoryTitle.toLowerCase()} recipes found.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try a different search term!</p>
    </div>
  </motion.div>
);
const RecipeListPage = ({ category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  // Determine accent color based on category for consistency with ExplorePage cards
  const categoryAccent = useMemo(() => {
    switch (category) {
      case 'veg': return "from-emerald-500 to-green-600";
      case 'nonveg': return "from-rose-500 to-red-600";
      case 'dessert': return "from-amber-500 to-orange-600";
      case 'beverages': return "from-sky-500 to-indigo-600";
      default: return "from-gray-500 to-gray-600"; // Fallback accent
    }
  }, [category]);
  // Memoize filtered recipes for performance
  const filteredRecipes = useMemo(() =>
    allRecipes.filter(recipe =>
      recipe.category === category &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [allRecipes, category, searchQuery]
  );
  const pageTitle = useMemo(() => {
    let title = category.charAt(0).toUpperCase() + category.slice(1);
    // Add full titles for better display, consistent with ExplorePage section titles
    if (category === 'veg') return 'Vegetarian Delights';
    if (category === 'nonveg') return 'Hearty Non-Vegetarian';
    if (category === 'dessert') return 'Sweet Desserts';
    if (category === 'beverages') return 'Cool Beverages';
    return title + ' Recipes'; // Default if a generic category
  }, [category]);
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden">
      {/* Animated Aurora Background (Consistent with Explore.jsx) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-40"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-40"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-40"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
        {/* Header (Consistent with Explore.jsx) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center pt-24 pb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-red-600 dark:from-white dark:to-slate-400"
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto"
          >
            Explore all our delicious {pageTitle.toLowerCase()} recipes.
          </motion.p>
        </motion.div>
        {/* Search Bar (Consistent with Explore.jsx) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="relative">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl pointer-events-none" />
            <input
              type="text"
              placeholder={`Search for ${category} recipes...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-transparent dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 shadow-lg backdrop-blur-md"
            />
          </div>
        </motion.div>
        <AnimatePresence mode='wait'> {/* AnimatePresence for items entering/leaving the DOM */}
          {filteredRecipes.length > 0 ? (
            <motion.div
              key="recipes-grid" // Unique key for AnimatePresence
              variants={containerVariants} // Apply container variants to the grid for staggered children
              initial="hidden"
              animate="visible"
              exit="hidden" // Animate grid out when empty
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={{
                    title: recipe.name,
                    description: recipe.about,
                    imageUrl: recipe.image,
                    category: recipe.category,
                    slug: recipe.id,
                  }}
                  accent={categoryAccent}
                  onClick={() => navigate(`/recipes/${recipe.category}/${recipe.id}`)}
                />
              ))}
            </motion.div>
          ) : (
            <NoResults key="no-results" categoryTitle={pageTitle} /> // Use the consistent NoResults component
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
export default RecipeListPage;
