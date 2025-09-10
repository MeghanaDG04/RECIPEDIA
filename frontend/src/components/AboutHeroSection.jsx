import React from 'react';
import { ChefHat, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutHeroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5
      }
    })
  };

  return (
    <section className="relative h-96 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 overflow-hidden">
      {/* Enhanced Animated Background */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500 to-red-400 rounded-full blur-3xl opacity-20"
        variants={floatingVariants}
        animate="animate"
        custom={2}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-15"
        variants={floatingVariants}
        animate="animate"
        custom={3}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-2xl opacity-10"
        variants={floatingVariants}
        animate="animate"
        custom={4}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={0}
        >
          <Link
            to="/home"
            className="group inline-flex items-center gap-2 mb-6 text-white hover:text-red-200 transition-all duration-300 mt-16 font-semibold"
            aria-label="Back to Home"
          >
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowLeft className="w-5 h-5 " />
            </motion.div>
            Back to Home
          </Link>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <ChefHat className="w-5 h-5 mr-2 text-yellow-300" />
            </motion.div>
            <span className="font-semibold">About Recipedia</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 ml-2 text-yellow-200" />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-black mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Empowering Food Lovers to{' '}
            <motion.span 
              className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Share & Discover
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl opacity-90"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Building a global community where every recipe tells a story.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
