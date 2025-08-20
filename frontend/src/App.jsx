
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/animations.css";

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

// Component Imports
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ScrollReset from "./components/ScrollReset.jsx";

// AppContent handles all routes and layout
function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Determine if current page is an auth page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // Check login status on mount
  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

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
      <ScrollReset />

      {/* Show Header only if NOT on auth pages */}
      {!isAuthPage && (
        <Header
          isAuthenticated={!!sessionStorage.getItem("token")}
          onLogout={() => setIsLoggedIn(false)}
        />
      )}

      <Routes>
        {/* Core Routes */}
        <Route path="/" element={<RecipeHome />} />
        <Route path="/home" element={<RecipeHome />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected/User Routes */}
        <Route path="/profile" element={<UserProfile />} />
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
