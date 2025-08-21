
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, searchQuery }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipes/${recipe.category}/${recipe.id}`);
  };

  // ✅ Function to highlight search term
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="bg-yellow-300">{part}</mark> : part
    );
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition cursor-pointer"
      onClick={handleCardClick}
    >
      <img 
        src={recipe.image} 
        onError={(e) => {
        if (e.target.src !== '/default.jpg') {
        e.target.src = '/default.jpg';
        e.target.alt = 'Recipe image not available';
       }
      }}
        className="h-48 w-full object-cover" 
      />
      <div className="p-4 !bg-white dark:!bg-slate-800">
        <h3 className="font-semibold text-xl !text-gray-800 dark:!text-white text-center">
          {highlightText(recipe.name, searchQuery)}
        </h3>
      </div>
    </div>
  );
};

export default RecipeCard;
