import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import "./styles/animations.css";
// Axios configuration
import "./services/axiosConfig.js";
import { authService } from "./services/authService.js";
// Page Imports
const RecipeListPage = lazy(() => import("./pages/RecipeListPage.jsx"));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage.jsx"));
import RecipeHome from "./pages/RecipeHome.jsx";
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const UserProfile = lazy(() => import("./pages/UserProfile.jsx"));
const AddRecipe = lazy(() => import("./pages/AddRecipe.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const Explore = lazy(() => import("./pages/Explore.jsx"));
const ForgotPass = lazy(() => import("./pages/ForgotPass.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.jsx"));

// Components
import Navbar from "./components/Header.jsx"; 
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import ScrollReset from "./components/ScrollReset.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" ||  location.pathname === "/forgot-password";

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
    const handleStorageChange = () => { checkAuth(); };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location.pathname]);

  const handleLogout = () => { authService.clearAuth(); setIsAuthenticated(false); };
  const handleAuthSuccess = () => { setIsAuthenticated(true); };

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
    <div className="app-container min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <ScrollToTop />
      {!isAuthPage && <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<RecipeHome />} />

          {/* Auth Routes */}
          <Route path="/login" element={<div className="login-bg"><Login onAuthSuccess={handleAuthSuccess} /></div>} />
          <Route path="/register" element={<div className="register-bg"><Register onAuthSuccess={handleAuthSuccess} /></div>} />
          <Route path="/forgot-password" element={<div className="login-bg"><ForgotPass /></div>} />

          {/* Protected/User Routes */}
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/add-recipe" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />

          {/* Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/contactus" element={<ContactUs />} />

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
      </Suspense>

      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
