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
            <h3 className="text-xl font-bold text-gray-800 dark:text-black group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
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

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-2xl opacity-25 animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-red-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">Explore Categories</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white mb-6">
            Browse by{' '}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover your next favorite dish from our carefully curated categories, each packed with authentic recipes from around the world.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">8.4K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Recipes</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">2.1K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Chefs</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">15K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;