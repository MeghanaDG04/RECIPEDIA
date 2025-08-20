import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 2
      }
    })
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-red-200/30 to-pink-200/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        custom={0}
      />
      <motion.div 
        className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"
        variants={floatingVariants}
        animate="animate"
        custom={1}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        custom={2}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        custom={3}
      />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-16 right-16 text-red-300/50"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <ChefHat className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-16 text-pink-300/50"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      {/* Main Content - with better sizing and scrolling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative z-50 max-h-[95vh] flex flex-col"
      >
        {/* Glass Card - with scrolling support */}
        <motion.div 
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 relative overflow-hidden flex flex-col max-h-full"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ zIndex: 10000 }}
        >
          {/* Header Gradient Overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-t-3xl" />
          
          {/* Header Section - Fixed */}
          <motion.div 
            className="text-center p-6 pb-4 flex-shrink-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mb-3 shadow-lg"
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <ChefHat className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-2xl font-bold text-gray-800 dark:text-white mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Recipedia
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-gray-500 dark:text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Scrollable Form Content with Custom Red Scrollbar */}
          <motion.div
            className="flex-1 overflow-y-auto px-6 pb-6 pr-4
                       [&::-webkit-scrollbar]:w-2
                       [&::-webkit-scrollbar-track]:bg-slate-100
                       [&::-webkit-scrollbar-track]:dark:bg-slate-700
                       [&::-webkit-scrollbar-track]:rounded-full
                       [&::-webkit-scrollbar-thumb]:bg-red-500
                       [&::-webkit-scrollbar-thumb]:rounded-full
                       [&::-webkit-scrollbar-thumb]:hover:bg-red-600
                       [&::-webkit-scrollbar-thumb]:transition-colors
                       [&::-webkit-scrollbar-thumb]:duration-300
                       scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-red-500
                       dark:scrollbar-track-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ maxHeight: 'calc(95vh - 180px)' }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
