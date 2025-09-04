import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const AuthButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <motion.button
      onClick={handleBack}
      aria-label="Go back"
      
      // Animate sliding in from the left
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }} // Subtle lift on hover
      whileTap={{ scale: 0.95 }}
      
      // Styling to match your image exactly
      className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full
                 bg-gradient-to-r from-pink-500 to-red-500 
                 text-white font-semibold text-base
                 shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50
                 transition-all duration-300 ease-in-out"
    >
      <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Back</span>
    </motion.button>
  );
};

export default AuthButton;