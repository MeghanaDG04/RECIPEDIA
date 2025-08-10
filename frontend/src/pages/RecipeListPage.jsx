import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard.jsx'; // Updated import
import allRecipes from '../data/recipes.json';


const RecipeListPage = ({ category }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.category === category &&
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-black text-center mb-10">
        {pageTitle} Recipes
      </h1>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder={`Search for ${category} recipes...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full md:w-1/2 px-5 py-3 border border-gray-300 !text-black rounded-full shadow-sm focus:outline-none placeholder:text-black dark:placeholder:text-white focus:ring-2 focus:ring-red-500 !bg-white dark:!bg-black dark:!text-white"
/>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {filteredRecipes.map((recipe) => (
  <RecipeCard key={recipe.id} recipe={recipe} searchQuery={searchQuery} />
))}

        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-xl">
          No recipes found for your search.
        </p>
      )}
    </div>
  );
};

export default RecipeListPage;


