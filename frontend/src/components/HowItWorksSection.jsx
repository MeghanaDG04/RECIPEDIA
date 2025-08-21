import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import { steps } from './stepsData';
import StepCard from './StepCard';

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(-1);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-64 h-64 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-15 animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full blur-3xl opacity-10 animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-800 mb-8">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 animate-pulse mr-3" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white mb-6">
            Get Cooking in{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                3 Easy Steps
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Join our vibrant community and start your culinary journey today. It's simple, fun, and completely free!
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
  <StepCard 
    key={index} 
    step={step} 
    index={index}
    isActive={activeStep === index || currentStep === index}
    onHover={setActiveStep}
    onIconClick={
      step.title === "Create an Account"
        ? () => navigate('/register')
        : step.title === "Add Your Recipes"
        ? () => navigate('/recipes')
        : step.title === "Explore & Interact"
        ? () => navigate('/explore')
        : undefined
    }
  />
))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl px-8 py-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">Ready to start?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Join thousands of food lovers</div>
            </div>
            <a 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
