// components/Card.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Animation Variants (can be moved to a shared file if many components use them)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
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

export default RecipeCard;