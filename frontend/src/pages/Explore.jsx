// Explore.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiArrowRight, FiClock, FiStar } from "react-icons/fi";
import { GiKnifeFork, GiRoastChicken, GiCakeSlice, GiMartini } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi"; // ✨ NEW: Added sparkles icon
import recipes from "../data/recipes.json"; // Adjust path as necessary
import RecipeCard from "../components/RecipeCard"
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
// ✨ NEW: Added floating animation variants
const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
// ✨ NEW: Added sparkle animation variants
const sparkleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// --- Reusable Components (NoResults is still specific to ExplorePage for now) ---







const NoResults = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-12 w-full text-center"
  >
    <motion.div 
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      className="p-8 bg-white/50 dark:bg-white/10 rounded-2xl shadow-md backdrop-blur-sm relative"
    >
      {/* ✨ NEW: Added animated sparkles around no results */}
      <motion.div
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        className="absolute -top-2 -right-2 text-yellow-400"
      >
        <HiSparkles className="w-4 h-4" />
      </motion.div>
      <motion.div
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute -bottom-2 -left-2 text-pink-400"
      >
        <HiSparkles className="w-4 h-4" />
      </motion.div>

      <GiKnifeFork className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
        No recipes found.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try a different search term!</p>
    </motion.div>
  </motion.div>
);
// ✨ NEW: Added featured recipe component - COMPACT VERSION
const FeaturedRecipe = ({ recipe, navigate }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-0.5"
  >
    <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Image Section - Smaller */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="relative flex-shrink-0"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg">
            <img
              src={recipe?.imageUrl || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300"}
              alt={recipe?.title || "Featured Recipe"}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Smaller floating elements */}
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md"
          >
            <HiSparkles className="text-white w-3 h-3" />
          </motion.div>
        </motion.div>
        

        {/* Content Section - More Compact */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center md:justify-start gap-2 mb-2"
          >
            <HiSparkles className="text-yellow-500 w-4 h-4" />
            <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              FEATURED RECIPE
            </span>
          </motion.div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {recipe?.title || "Chef's Special Pasta"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm line-clamp-2">
            {recipe?.description || "A delightful fusion of flavors that will transport your taste buds to culinary heaven."}
          </p>
          <motion.button
            onClick={() => navigate(`/recipes/${recipe?.category || 'featured'}/${recipe?.slug || 'special'}`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Try This Recipe
            <FiArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);
const RecipeSection = ({ config, searchQuery, navigate }) => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const filteredData = useMemo(() =>
    config.data.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    ), [config.data, searchQuery]);
  // --- Scroll buttons state ---
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const maxScrollLeft = container.scrollWidth - container.offsetWidth;
    const threshold = 5; // small buffer
    setCanScrollLeft(container.scrollLeft > threshold);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - threshold);
  };
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    container.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    const container = scrollContainerRef.current;
    container.scrollBy({ left: 300, behavior: "smooth" });
  };
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => requestAnimationFrame(updateScrollButtons);
    container.addEventListener("scroll", handleScroll);
    updateScrollButtons(); // initial check
    return () => container.removeEventListener("scroll", handleScroll);
  }, [filteredData]);
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
        {/* ✨ NEW: Enhanced section header with recipe count */}
        <span className="ml-4 px-3 py-1 bg-slate-200/50 dark:bg-slate-700/50 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300">
          {filteredData.length} recipes
        </span>
        <div className={`h-1 flex-grow ml-6 rounded-full bg-gradient-to-r ${config.accent} opacity-30`} />
      </motion.div>
      <div className="relative">
        {/* --- Left Scroll Button --- */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md transition-all"
          >
            &#8249;
          </button>
        )}
        {/* --- Recipe Cards Scroll Container --- */}
        <div
          ref={scrollContainerRef}
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
          <div className="flex-shrink-0 w-1 h-1" /> {/* Spacer */}
        </div>
        {/* --- Right Scroll Button --- */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md transition-all"
          >
            &#8250;
          </button>
        )}
        {filteredData.length === 0 && isInView && <NoResults />}
      </div>
    </motion.section>
  );
};
// --- Main Page Component ---
// --- Main Page Component ---
const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredRecipe, setFeaturedRecipe] = useState(null); // ✨ NEW: Added featured recipe state
  const navigate = useNavigate();

  // ✨ NEW: Set featured recipe on component mount
  useEffect(() => {
    if (recipes.length > 0) {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      setFeaturedRecipe({
        title: randomRecipe.name,
        description: randomRecipe.about,
        imageUrl: randomRecipe.image,
        category: randomRecipe.category,
        slug: randomRecipe.id,
      });
    }
  }, []);

  const sectionConfigs = useMemo(() => {

    const mapRecipes = (category) =>
      recipes
        .filter((r) => r.category === category)
        .map((r) => ({
          title: r.name,
          description: r.about,
          imageUrl: r.image,
          images: r.images,
          category: r.category,
          slug: r.id,
        }));

    return [
      { 
        title: "Vegetarian Delights", 
        data: mapRecipes("veg"), 
        Icon: GiKnifeFork, 
        accent: "from-emerald-500 to-green-600",
        scrollbar: "scrollbar-green" // ✨ NEW: Added themed scrollbars
      },
      { 
        title: "Hearty Non-Vegetarian", 
        data: mapRecipes("nonveg"), 
        Icon: GiRoastChicken, 
        accent: "from-rose-500 to-red-600",
        scrollbar: "scrollbar-red"
      },
      { 
        title: "Sweet Desserts", 
        data: mapRecipes("dessert"), 
        Icon: GiCakeSlice,  
        accent: "from-amber-500 to-orange-600",
        scrollbar: "scrollbar-orange"
      },
      { 
        title: "Cool Beverages", 
        data: mapRecipes("beverages"), 
        Icon: GiMartini,  
        accent: "from-sky-500 to-indigo-600",
        scrollbar: "scrollbar-blue"
      },
    ];
  }, []);
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden">
      {/* ✨ ENHANCED: More dynamic animated aurora background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-40"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-40"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-40"></div>
        {/* ✨ NEW: Added more floating background elements */}
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-6000 dark:opacity-30"></div>
        <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-8000 dark:opacity-35"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center pt-24 pb-12"
        >
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-red-600 dark:from-white dark:to-slate-400">
              World of Flavors
            </h1>
            {/* ✨ NEW: Added floating sparkles around the title */}
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              className="absolute -top-4 -right-4 text-yellow-400"
            >
              <HiSparkles className="w-8 h-8" />
            </motion.div>
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: '1s' }}
              className="absolute -bottom-2 -left-4 text-pink-400"
            >
              <HiSparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Find your next favorite meal. Search our curated collections and start cooking today.
          </motion.p>
          
          {/* ✨ NEW: Added quick stats */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 mt-8 text-sm font-medium"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{recipes.length}+</div>
              <div className="text-slate-600 dark:text-slate-400">Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
              <div className="text-slate-600 dark:text-slate-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5★</div>
              <div className="text-slate-600 dark:text-slate-400">Rated</div>
            </div>
          </motion.div>
        </motion.div>
        {/* ✨ ENHANCED: Better search bar with more animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="relative group">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl pointer-events-none transition-colors duration-300 group-focus-within:text-indigo-500" />
            <input
              type="text"
              placeholder="Search for Pad Thai, Brownies, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-transparent dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 shadow-lg backdrop-blur-md hover:bg-white/80 dark:hover:bg-slate-800/80"
            />
            {/* ✨ NEW: Added search suggestions indicator */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500"
              >
                {recipes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).length} found
              </motion.div>
            )}
          </div>
        </motion.div>
        {/* ✨ NEW: Added Featured Recipe Section */}
        {featuredRecipe && <FeaturedRecipe recipe={featuredRecipe} navigate={navigate} />}
        {/* Recipe Sections */}
        <div className="space-y-12">
          {sectionConfigs.map((config) => (
            <RecipeSection
              key={config.title}
              config={config}
              searchQuery={searchQuery}
              //searchQuery={debounceSearch}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ExplorePage;
