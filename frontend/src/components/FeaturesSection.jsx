import React, { useState, useEffect } from 'react';
import { Lock, Edit, ThumbsUp, Zap, Star, Shield } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Secure User Authentication",
    description: "Keep your recipes and profile safe with our secure login and sign-up system.",
    gradient: "from-blue-500 to-cyan-600",
    stats: "99.9% uptime"
  },
  {
    icon: Edit,
    title: "Full Recipe Management",
    description: "Easily add, edit, and delete your recipes whenever you want.",
    gradient: "from-green-500 to-emerald-600",
    stats: "Real-time sync"
  },
  {
    icon: ThumbsUp,
    title: "Community Interaction",
    description: "Like your favorite recipes and leave comments to connect with other foodies.",
    gradient: "from-purple-500 to-pink-600",
    stats: "50K+ interactions"
  }
];

const FeatureItem = ({ feature, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = feature.icon;
  
  return (
    <li 
      className={`flex items-start space-x-6 p-6 rounded-2xl transition-all duration-700 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      } ${isHovered ? 'bg-white/50 dark:bg-slate-700/50 shadow-lg scale-105' : ''}`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Container */}
      <div className="relative flex-shrink-0">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 ${isHovered ? 'opacity-30' : ''} transition-opacity duration-500`} />
        
        {/* Floating Badge */}
        <div className={`absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center transform transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}>
          <Star className="w-4 h-4 text-yellow-800 fill-current" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {feature.title}
          </h3>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{feature.stats}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {feature.description}
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-1000 ${isHovered ? 'w-full' : 'w-0'}`}
          />
        </div>
      </div>
    </li>
  );
};

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-content');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-15 animate-bounce" style={{ animationDelay: '2s' }} />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-20 w-5 h-5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/Recipedia.png"
                alt="Recipedia App Interface" 
                className="w-full h-auto" 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-800">Live Updates</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">4.9</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Background Card */}
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl -z-10 shadow-xl" />
          </div>

          {/* Content Side */}
          <div id="features-content" className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
                <Zap className="w-4 h-4 mr-2 text-purple-500 animate-pulse" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Powerful Features</span>
              </div>
              
              <h2 data-aos="fade-left" className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white leading-tight">
                All The Tools{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  You Need
                </span>
              </h2>
              
              <p data-aos="fade-left" className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Experience the power of our comprehensive recipe management platform with cutting-edge features designed for food enthusiasts.
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index} 
                  feature={feature} 
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </ul>

            {/* Bottom Stats */}
            <div data-aos="fade-up-left" className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">99.9%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">24/7</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">Free</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
