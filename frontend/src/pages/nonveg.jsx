import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Nonveg = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      name: 'Butter Chicken',
      image: '/chicken.jpg',
      route: '/recipe/butter-chicken'
    },
    {
      id: 2,
      name: 'Fish Curry',
      image: '/fish.jpg',
      route: '/recipe/fish'
    },
    {
      id: 3,
      name: 'Chicken Biryani',
      image: '/biriyani.jpg',
      route: '/recipe/biryani'
    },
    {
      id: 4,
      name: 'Prawn Masala',
      image: '/prawn.jpg',
      route: '/recipe/prawn'
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">Non-Vegetarian Recipes</h1>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search for non-vegetarian recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes
          .filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition cursor-pointer"
              onClick={() => handleCardClick(recipe.route)}
            >
              <img src={recipe.image} alt={recipe.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 text-center">{recipe.name}</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Nonveg;
