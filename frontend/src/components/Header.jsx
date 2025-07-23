import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  const navLinks = (
    <>
      <Link to="/" className="text-gray-600 hover:text-red-500 font-medium">Home</Link>
      <a href="/#categories" className="text-gray-600 hover:text-red-500 font-medium">Explore</a>
      <a href="/#features" className="text-gray-600 hover:text-red-500 font-medium">Features</a>
      <Link to="/about" className="text-gray-600 hover:text-red-500 font-medium">How It Works</Link>
    </>
  );

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">Recipedia</Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/add-recipe" className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition shadow-sm">Add Recipe</Link>
          <Link to="/login" className="text-gray-600 hover:text-red-500 font-medium">Login</Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-gray-600 hover:text-red-500" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 space-y-2 p-4">
          {navLinks}
          <hr />
          <Link to="/add-recipe" className="block bg-red-500 text-white text-center px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition shadow-sm">Add Recipe</Link>
          <Link to="/login" className="block text-center mt-2 bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition">Login</Link>
        </nav>
      )}
    </header>
  );
};

export default Header; 