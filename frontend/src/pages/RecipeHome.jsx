import React, { useEffect } from 'react';
import { PlusSquare , Search , UserPlus } from "lucide-react"
import HeroSection from '../components/HeroSection.jsx';
import CategoriesSection from '../components/CategoriesSection.jsx';
import HowItWorksSection from '../components/HowItWorksSection.jsx';
import FeaturesSection from '../components/FeaturesSection.jsx';
import CTASection from '../components/CTASection.jsx';
// import Footer from '../components/FooterSection.jsx';


const RecipeHome = () => {
  return (
    <div>
      <div>
      <HeroSection />        
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturesSection />
      {/* <Footer/> */}
      </div>

    </div>
  );
};

export default RecipeHome;