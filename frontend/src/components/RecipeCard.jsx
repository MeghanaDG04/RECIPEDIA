// components/Card.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
// Animation Variants (can be moved to a shared file if many components use them)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const RecipeCard = ({ recipe, accent, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return(
  <motion.div
    layout
    variants={itemVariants}
    onClick={onClick}
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px] h-[440px] snap-start cursor-pointer"
  >
    <div className={`absolute inset-0 rounded-2xl ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
    <div className="relative w-full h-full bg-gradient-to-br  from-white/60 via-white/40 to-white/20 dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 group-hover:border-amber-400 group-hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="relative w-full h-1/2 overflow-hidden">
        <img
          src={recipe.imageUrl}
          //src={recipe.images}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> 

        {recipe.category && (  
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {recipe.category}
          </span>
        )}

        <button
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 text-xl text-white hover:scale-110 transition-transform"
        >
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 truncate">{recipe.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 flex-grow">{recipe.description}</p>
        {recipe.rating && (   
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`${i < recipe.rating ? "text-yellow-400" : "text-gray-300 dark:text-slate-500"} mr-1`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({recipe.reviews} reviews)</span>
          </div>
        )}

        <div className="mt-4">
          <span className="inline-flex items-center text-sm font-semibold  text-slate-700 dark:text-white  group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-pink-500 to-violet-500">
            View Recipe
            <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  </motion.div>
  );
};
export default RecipeCard;
