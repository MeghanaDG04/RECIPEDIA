import React, { useState, useEffect } from 'react';
import { PlusSquare, Search, UserPlus, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Sign up for free to get your personalized profile and start your collection.",
    bgColor: "from-red-500 to-pink-600",
    features: ["Free forever", "Secure profile", "Personal dashboard"]
  },
  {
    icon: PlusSquare,
    title: "Add Your Recipes",
    description: "Share your favorite dishes with our community using our simple recipe editor.",
    bgColor: "from-yellow-500 to-orange-600",
    features: ["Easy editor", "Photo uploads", "Step-by-step guide"]
  },
  {
    icon: Search,
    title: "Explore & Interact",
    description: "Discover new meals, leave comments, and like the recipes that inspire you.",
    bgColor: "from-green-500 to-emerald-600",
    features: ["Smart search", "Save favorites", "Community interaction"]
  }
];

const StepCard = ({ step, index, isActive, onHover }) => {
  const IconComponent = step.icon;

  return (
    <div
      className={`group relative p-8 rounded-2xl transition-all duration-700 transform hover:-translate-y-4 cursor-pointer ${
        isActive
          ? 'bg-gray-100 dark:!bg-gray-200 shadow-2xl scale-105 border border-gray-300 dark:border-gray-400'
          : 'bg-white/50 dark:bg-slate-800/50 shadow-lg hover:shadow-xl'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Step Number */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
        <span className="text-white font-bold text-lg">{index + 1}</span>
      </div>

      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 ${isActive ? 'opacity-5' : ''} dark:hidden rounded-2xl transition-opacity duration-500`} />

      {/* Icon */}
      <div className={`relative mb-6 mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgColor} shadow-lg flex items-center justify-center transform transition-all duration-500 ${isActive ? 'scale-110 rotate-3' : ''}`}>
        <IconComponent className="w-10 h-10 text-white" />

        {/* Icon Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl blur-xl opacity-50 ${isActive ? 'opacity-75' : 'opacity-0'} transition-opacity duration-500`} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:!text-gray-900 group-hover:!text-gray-900">
          {step.title}
        </h3>

        <p className="text-gray-600 dark:!text-gray-700 group-hover:!text-gray-700 mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Features List */}
        <div className="space-y-2">
          {step.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:!text-gray-700 group-hover:!text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Arrow */}
      <div className={`absolute bottom-6 right-6 w-10 h-10 bg-gradient-to-r ${step.bgColor} rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <ArrowRight className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

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
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
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
