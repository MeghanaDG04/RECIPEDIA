
import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const categories = [
  { 
    name: 'Vegetarian', 
    image: '/veg.jpg', 
    href: '/veg',
    gradient: 'from-green-500 to-emerald-600',
    recipes: '2.5K+',
    description: 'Fresh & healthy plant-based delights'
  },
  { 
    name: 'Non-Vegetarian', 
    image: '/nonveg.jpg', 
    href: '/nonveg',
    gradient: 'from-red-500 to-rose-600',
    recipes: '3.2K+',
    description: 'Rich protein-packed culinary adventures'
  },
  { 
    name: 'Desserts', 
    image: '/dessert.jpg', 
    href: '/dessert',
    gradient: 'from-pink-500 to-purple-600',
    recipes: '1.8K+',
    description: 'Sweet indulgences for every occasion'
  },
  { 
    name: 'Beverages', 
    image: '/beverages.jpg', 
    href: '/beverages',
    gradient: 'from-blue-500 to-cyan-600',
    recipes: '900+',
    description: 'Refreshing drinks & creative cocktails'
  }
];

const CategoryCard = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />

        {/* Floating Elements */}
        <div className="absolute top-4 right-4">
          <div className={`bg-white/20 backdrop-blur-sm rounded-full p-2 ${isHovered ? 'animate-bounce' : ''}`}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Recipe Count Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-bold text-gray-800">{category.recipes}</span>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm opacity-90">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>Trending recipes</span>
            </div>
          </div>

          <a 
            href={category.href}
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${category.gradient} text-white shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Animated Border */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} 
           style={{ padding: '2px' }}>
        <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-800" />
      </div>
    </div>
  );
};


const CTASection = () => {
  return (
    <section className="bg-red-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Share Your Culinary Genius?
        </h2>
        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
          Create your free account today and become part of the Recipedia family. 
          Your next favorite dish is just a click away.
        </p>
        <a 
          href="/register" 
          className="bg-white text-red-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
        >
          Sign Up Now
        </a>
      </div>
    </section>
  );
};


export default CTASection;

