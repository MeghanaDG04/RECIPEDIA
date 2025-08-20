import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <section className="bg-red-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 data-aos="fade-up" className="text-3xl font-bold text-white mb-4">
          Ready to Share Your Culinary Genius?
        </h2>
        <p data-aos="fade-up" className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
          Create your free account today and become part of the Recipedia family. 
          Your next favorite dish is just a click away.
        </p>
        <div data-aos="fade-up">
          <Link 
            to="/register"
            className="bg-white text-red-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
