import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AuthButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  type = 'button',
  variant = 'primary',
  onClick,
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-200/50 dark:shadow-red-900/30',
    secondary: 'bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600',
    outline: 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-white'
  };

  // Filter out non-DOM props
  const {
    jsx, // Remove jsx if it exists
    variant: _, // Remove variant from DOM props
    loading: __, // Remove loading from DOM props
    ...validProps
  } = props;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${variants[variant]}`}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...validProps} // Only spread filtered props
    >
      {/* Loading Overlay */}
      {loading && (
        <motion.div 
          className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </motion.div>
      )}
      
      {/* Button Content */}
      <motion.span 
        className="flex items-center justify-center gap-2"
        animate={{ opacity: loading ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ translateX: ['100%', '-100%'] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 3
        }}
      />
    </motion.button>
  );
};

export default AuthButton;
