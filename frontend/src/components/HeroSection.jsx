import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Users,
  ChefHat,
} from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image: "/hero-section-1.jpg",
    title: "Discover Amazing",
    subtitle: "Recipes",
    description:
      "Explore thousands of delicious recipes from around the world, crafted by passionate food lovers just like you.",
    buttonText: "Start Cooking",
    buttonLink: "#categories",
    accent: "from-red-500 to-pink-600",
    stats: { recipes: "10K+", chefs: "2K+" },
  },
  {
    id: 2,
    image: "/hero-section-2.jpg",
    title: "Share Your Culinary",
    subtitle: "Masterpieces",
    description:
      "Join our vibrant community and share your favorite recipes with food enthusiasts worldwide.",
    buttonText: "Explore",
    buttonLink: "/register",
    accent: "from-orange-500 to-red-600",
    stats: { recipes: "500+", reviews: "15K+" },
  },
  {
    id: 3,
    image: "/hero-section-3.webp",
    title: "Cook Like a",
    subtitle: "Professional",
    description:
      "Master the art of cooking with step-by-step guides, expert tips, and interactive cooking sessions.",
    buttonText: "Learn More",
    buttonLink: "/about",
    accent: "from-yellow-500 to-orange-600",
    stats: { tutorials: "200+", students: "5K+" },
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight =
        document.getElementById("hero-section")?.offsetHeight || 0;
      if (window.scrollY > heroHeight) {
        setShowButton(false); // hide when past hero
      } else {
        setShowButton(true); // show inside hero
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const currentSlideData = heroSlides[currentSlide];

  const FeaturedRecipeCard = (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group max-w-md mx-auto lg:mx-0 ">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentSlideData.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Featured Recipe</h3>
          <p className="text-gray-300 text-sm">Trending Today</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
        <span className="text-white ml-2 text-sm">4.9 (234 reviews)</span>
      </div>
    </div>
  );

  return (
    <section className="relative  top-[50px]  lg:h-screen md:h-screen h-[680px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 lg:mt-0 md:mt-0 mt-4">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <img
              src={slide.image}
              alt={`${slide.title} ${slide.subtitle}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-20`}
            />
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0  pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-white/3 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/4 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-24 h-24 bg-white/3 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 lg:h-full md:h-full h-auto lg:flex md:flex sm:flex-col justify-center  ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-8 gap-10 items-center min-h-[80vh]">
            {/* Text Content */}
            <div className="lg:col-span-7 text-white  mb-10  lg:mb-0 relative bottom-[30px]  lg:mt-10 md:mt-0 mt-10   ">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r mt-2 ${
                  currentSlideData.accent
                } bg-white/10 backdrop-blur-sm border border-white/20 lg:mb-6 md:mb-6 mb-0 transform transition-all duration-700 ${
                  isAnimating
                    ? "translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <ChefHat
                  className="w-4 h-4 mr-2 animate-spin "
                  style={{ animationDuration: "3s" }}
                />
                <span className="text-sm font-semibold ">
                  Welcome to Recipedia
                </span>
              </div>

              <div className="mb-4 overflow-hidden">
                <h1
                  className={`text-4xl sm:text-4xl lg:text-6xl font-black leading-tight transform transition-all duration-700 delay-100 ${
                    isAnimating
                      ? "translate-y-full opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  <span className="block">{currentSlideData.title}</span>
                  <span
                    className={`block bg-gradient-to-r ${currentSlideData.accent} bg-clip-text text-transparent animate-pulse`}
                  >
                    {currentSlideData.subtitle}
                  </span>
                </h1>
              </div>

              <div className="mb-3 overflow-hidden">
                <p
                  className={`text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed transform transition-all duration-700 delay-200 ${
                    isAnimating
                      ? "translate-y-8 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  {currentSlideData.description}
                </p>
              </div>

              <div
                className={`flex flex-wrap gap-6 md:mb-4 mb-6  transform transition-all duration-700 delay-300 ${
                  isAnimating
                    ? "translate-y-6 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentSlideData.accent} animate-pulse`}
                  />
                  <span className="text-sm font-semibold">
                    {currentSlideData.stats.recipes ||
                      currentSlideData.stats.tutorials}{" "}
                    Recipes
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {currentSlideData.stats.chefs ||
                      currentSlideData.stats.students ||
                      currentSlideData.stats.reviews}{" "}
                    Community
                  </span>
                </div>
              </div>

              <div
                className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-500 ${
                  isAnimating
                    ? "translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <a
                  href={currentSlideData.buttonLink}
                  className={`group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${currentSlideData.accent} text-white font-bold text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1`}
                >
                  {currentSlideData.buttonText}
                  <Play className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center px-7 py-3 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
                >
                  Join Community
                  <Users className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Desktop Featured Card - visible on large screens */}
            <div className="hidden lg:block lg:col-span-5 lg:pl-8">
              {FeaturedRecipeCard}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Navigation (visible lg+) */}
      <div className="hidden lg:flex absolute bottom-[50px] left-1/2 transform -translate-x-1/2 z-20 items-center gap-4 bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 disabled:opacity-50 group"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `bg-gradient-to-r ${currentSlideData.accent} scale-125`
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 disabled:opacity-50 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Mobile Side Navigation Buttons (visible below lg) */}
      <div className="lg:hidden">
        {/* Prev Button Left Side */}
        {showButton && ( // change this condition based on your requirement
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            aria-label="Previous Slide"
            className="fixed top-1/2 left-4 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button Right Side */}
        {showButton && (
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            aria-label="Next Slide"
            className="fixed top-1/2 right-4 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
