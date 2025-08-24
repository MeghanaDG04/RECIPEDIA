
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/animations.css";

// Axios configuration
import "./services/axiosConfig.js";
import { authService } from "./services/authService.js";

// Reusable and Core Page Imports with .jsx extension
// Page Imports
import RecipeListPage from "./pages/RecipeListPage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import RecipeHome from "./pages/RecipeHome.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Explore from "./pages/Explore.jsx";

// Component Imports with .jsx extension
import Navbar from "./components/Header.jsx"; // Changed from Header to Navbar
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import ScrollReset from "./components/ScrollReset.jsx";

// AppContent handles all routes and layout
function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Determine if current page is an auth page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // Check authentication status on mount and route changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
    
    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    authService.clearAuth();
    setIsAuthenticated(false);
  };

  // Handle successful login/register
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Add/remove body classes for auth pages
  useEffect(() => {
    if (isAuthPage) {
      document.body.classList.add("auth-page");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("auth-page");
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.classList.remove("auth-page");
      document.body.style.overflow = "auto";
    };
  }, [isAuthPage]);

  return (
    <div className="app-container">
      <ScrollToTop />
      
      {/* Only show Navbar if NOT on auth pages */}
      {!isAuthPage && (
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
        />
      )}
      
      <Routes>
        {/* Core Routes */}
        <Route path="/" element={<RecipeHome />} />
        <Route path="/home" element={<RecipeHome />} />
        
        {/* Auth Routes - Clean without wrapper divs */}
        <Route 
          path="/login" 
          element={<Login onAuthSuccess={handleAuthSuccess} />} 
        />
        <Route 
          path="/register" 
          element={<Register onAuthSuccess={handleAuthSuccess} />} 
        />
        
        {/* Protected/User Routes */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<UserProfile />} /> {/* You can create a separate Settings component */}
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />

        {/* Category Pages */}
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

      {/* Show Footer only if NOT on auth pages */}
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