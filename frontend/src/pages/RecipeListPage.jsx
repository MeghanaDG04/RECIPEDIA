<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import allRecipes from "../data/recipes.json";
import { fetchFoodImage } from "../services/imageService.js";

const FALLBACK_IMAGE = "/fallback.jpg"; // Put a default image in public/
=======
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import allRecipes from '../data/recipes.json';
import { fetchFoodImage } from '../services/imageService.js';

const FALLBACK_IMAGE = '/fallback-image.jpg'; // Add a fallback image in /public
>>>>>>> 640103c50142a7e990c5c02051bc568009a7912e

const RecipeListPage = ({ category }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pexelsImage, setPexelsImage] = useState(null);
<<<<<<< HEAD
  const [loadingImage, setLoadingImage] = useState(false);
=======
  const [loading, setLoading] = useState(false);
>>>>>>> 640103c50142a7e990c5c02051bc568009a7912e

  const filteredRecipes = allRecipes.filter(
    (recipe) =>
      recipe.category === category &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
<<<<<<< HEAD
    const fetchImageIfNoMatch = async () => {
      if (searchQuery.trim() !== "" && filteredRecipes.length === 0) {
        setLoadingImage(true);
=======
    const timeout = setTimeout(async () => {
      if (searchQuery.trim() !== '' && filteredRecipes.length === 0) {
        setLoading(true);
>>>>>>> 640103c50142a7e990c5c02051bc568009a7912e
        try {
          const image = await fetchFoodImage(searchQuery);
          setPexelsImage(image || FALLBACK_IMAGE);
        } catch (error) {
<<<<<<< HEAD
          console.error("Image fetch failed:", error);
          setPexelsImage(FALLBACK_IMAGE);
        } finally {
          setLoadingImage(false);
        }
=======
          console.error('Image fetch failed:', error);
          setPexelsImage(FALLBACK_IMAGE);
        } finally {
          setLoading(false);
        }
      } else {
        setPexelsImage(null);
>>>>>>> 640103c50142a7e990c5c02051bc568009a7912e
      }
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [searchQuery, filteredRecipes]);

  const pageTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-black text-center mb-10">
        {pageTitle} Recipes
      </h1>

      {/* Search bar */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder={`Search for ${category} recipes...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-5 py-3 border border-gray-300 !text-black rounded-full shadow-sm focus:outline-none placeholder:text-black dark:placeholder:text-white focus:ring-2 focus:ring-red-500 !bg-white dark:!bg-black dark:!text-white"
        />
      </div>

      {/* Show recipes */}
      {filteredRecipes.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} searchQuery={searchQuery} />
          ))}
        </div>
<<<<<<< HEAD
      ) : loadingImage ? (
=======
      ) : loading ? (
>>>>>>> 640103c50142a7e990c5c02051bc568009a7912e
        <p className="text-center text-gray-500 dark:text-gray-400 text-xl">
          Loading image...
        </p>
      ) : pexelsImage ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg">
            <img
              src={pexelsImage}
              alt={searchQuery}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
            {searchQuery}
          </h2>
          <p className="text-center text-gray-400 dark:text-gray-400">
            No recipe found in our list, but here’s what it may look like.
          </p>
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
