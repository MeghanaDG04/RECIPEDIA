// Explore.jsx
import React, { useState, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { GiKnifeFork, GiRoastChicken, GiCakeSlice, GiMartini } from "react-icons/gi";
import recipes from "../data/recipes.json"; // Adjust path as necessary

// --- Animation Variants ---
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

// --- Reusable Components ---

const RecipeCard = ({ recipe, accent, onClick }) => (
  <motion.div
    layout
    variants={itemVariants}
    onClick={onClick}
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative flex-shrink-0 w-[280px] md:w-[320px] h-[400px] snap-start cursor-pointer"
  >
    <div className={`absolute inset-0 rounded-2xl ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg`} />
    <div className="relative w-full h-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 shadow-xl group-hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="w-full h-1/2 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 truncate">{recipe.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 flex-grow">{recipe.description}</p>
        <div className="mt-4">
          <span className="inline-flex items-center text-sm font-semibold text-slate-700 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-pink-500 to-violet-500">
            View Recipe
            <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

const NoResults = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-12 w-full text-center"
  >
    <div className="p-8 bg-white/50 dark:bg-white/10 rounded-2xl shadow-md backdrop-blur-sm">
      <GiKnifeFork className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
        No recipes found.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try a different search term!</p>
    </div>
  </motion.div>
);

const RecipeSection = ({ config, searchQuery, navigate }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredData = useMemo(() =>
    config.data.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    ), [config.data, searchQuery]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="mb-16"
    >
      <motion.div variants={itemVariants} className="flex items-center mb-6">
        <config.Icon className={`text-4xl mr-3 bg-clip-text text-transparent bg-gradient-to-br ${config.accent}`} />
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{config.title}</h2>
        <div className={`h-1 flex-grow ml-6 rounded-full bg-gradient-to-r ${config.accent} opacity-30`} />
      </motion.div>

      <div className="relative">
        <div
          className={`flex overflow-x-auto space-x-6 py-4 px-1 snap-x snap-mandatory scrollbar-base ${config.scrollbar}`}
        >
          <AnimatePresence>
            {filteredData.length > 0 ? (
              filteredData.map((recipe) => (
                <RecipeCard
                  key={recipe.slug}
                  recipe={recipe}
                  accent={config.accent}
                  onClick={() => navigate(`/recipes/${recipe.category}/${recipe.slug}`)}
                />
              ))
            ) : (
              !isInView && <div/> // Prevents NoResults from showing before section is in view
            )}
          </AnimatePresence>
          {/* Add a spacer at the end for better scrolling UX */}
          <div className="flex-shrink-0 w-1 h-1" />
        </div>
        {filteredData.length === 0 && isInView && <NoResults />}
      </div>
    </motion.section>
  );
};

// --- Main Page Component ---
const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const sectionConfigs = useMemo(() => {
    const mapRecipes = (category) =>
      recipes
        .filter((r) => r.category === category)
        .map((r) => ({
          title: r.name,
          description: r.about,
          imageUrl: r.image,
          category: r.category,
          slug: r.id,
        }));

    return [
      { title: "Vegetarian Delights", data: mapRecipes("veg"), Icon: GiKnifeFork, accent: "from-emerald-500 to-green-600" },
      { title: "Hearty Non-Vegetarian", data: mapRecipes("nonveg"), Icon: GiRoastChicken, accent: "from-rose-500 to-red-600" },
      { title: "Sweet Desserts", data: mapRecipes("dessert"), Icon: GiCakeSlice, accent: "from-amber-500 to-orange-600" },
      { title: "Cool Beverages", data: mapRecipes("beverages"), Icon: GiMartini, accent: "from-sky-500 to-indigo-600" },
    ];
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-40"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-40"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-40"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          // --- CHANGE HERE ---
          // Increased top padding from pt-8 to pt-24 to ensure the heading is visible below a fixed navbar.
          className="text-center pt-24 pb-12"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-red-600 dark:from-white dark:to-slate-400">
            World of Flavors
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Find your next favorite meal. Search our curated collections and start cooking today.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
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
              placeholder="Search for Pad Thai, Brownies, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-transparent dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 shadow-lg backdrop-blur-md"
            />
          </div>
        </motion.div>

        {/* Recipe Sections */}
        <div className="space-y-12">
          {sectionConfigs.map((config) => (
            <RecipeSection
              key={config.title}
              config={config}
              searchQuery={searchQuery}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ExplorePage;