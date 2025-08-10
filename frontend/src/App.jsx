import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/animations.css";

// Reusable and Core Page Imports with .jsx extension
import RecipeListPage from "./pages/RecipeListPage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import RecipeHome from "./pages/RecipeHome.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import About from "./pages/About.jsx";
import NotFound from './pages/NotFound.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// Component Imports with .jsx extension
import Header from "./components/Header.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";

// App Content Component (needed for useLocation hook)
function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if current route is an auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Check authentication status on mount
  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  // Manage body classes for auth pages
  useEffect(() => {
    if (isAuthPage) {
      document.body.classList.add('auth-page');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('auth-page');
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('auth-page');
      document.body.style.overflow = 'auto';
    };
  }, [isAuthPage]);

  return (
    <div className="app-container">
      <ScrollToTop />
      
      {/* Only show Header if NOT on auth pages */}
      {!isAuthPage && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      
      <Routes>
        {/* Core Routes */}
        <Route path="/" element={<RecipeHome />} />
        <Route path="/home" element={<RecipeHome />} />
        
        {/* Auth Routes - Clean without wrapper divs */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        
        {/* Protected/User Routes */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/about" element={<About />} />
        
        {/* Dynamic Category List Pages */}
        <Route path="/veg" element={<RecipeListPage category="veg" />} />
        <Route path="/nonveg" element={<RecipeListPage category="nonveg" />} />
        <Route path="/dessert" element={<RecipeListPage category="dessert" />} />
        <Route path="/beverages" element={<RecipeListPage category="beverages" />} />

        {/* Dynamic Recipe Detail Page */}
        <Route path="/recipes/:category/:recipeId" element={<RecipeDetailPage />} />
        
        {/* Error and Fallback Routes */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Only show Footer if NOT on auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
