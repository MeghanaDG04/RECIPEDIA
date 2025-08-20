import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Veg = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      name: "Paneer Butter Masala",
      image: "/paneer.jpg",
      route: "/recipe/paneer-butter-masala",
    },
    {
      id: 2,
      name: "Vegetable Biryani",
      image: "/vegbiriyani.jpg",
      route: "/recipe/vegetable-biryani",
    },
    {
      id: 3,
      name: "Palak Soup",
      image: "/palak.jpg",
      route: "/recipe/palak-soup",
    },
    {
      id: 4,
      name: "Dal Makhani",
      image: "/dal.jpg",
      route: "/recipe/dal-makhani",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-16 pb-16 dark:bg-slate-800 ">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-black text-center mb-10">
        Vegetarian Recipes
      </h1>
   <div className="mb-10 flex justify-center ">
        <input
          type="text"
          placeholder="Search for vegetarian recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-slate-800 text-black dark:text-white"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes
          .filter((recipe) =>
            recipe.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
          )
          .map((recipe) => (
            <div
              key={recipe.id}
              role="button"
              tabIndex={0}
              aria-label={`View recipe: ${recipe.name}`}
              onClick={() => handleCardClick(recipe.route)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleCardClick(recipe.route)
              }
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition cursor-pointer"
            >
              <img
                src={recipe.image}
                onError={(e) => {
                  e.target.src = "/default.jpg";
                }}
                alt={recipe.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-white text-center">
                  {recipe.name}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Veg;
