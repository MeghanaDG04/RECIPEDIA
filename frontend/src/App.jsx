import { createHashRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
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
import * as Sentry from "@sentry/react";

// Components
import Navbar from "./components/Header.jsx"; // header component is named Navbar in the import
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
// import CustomizedProgressBars from "./components/Loader.jsx";
import ScrollReset from "./components/ScrollReset.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.jsx"));

// Layout component for non-auth pages
function Layout() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    authService.clearAuth();
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

// Auth Layout component for login/register pages
function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle successful login/register
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Add/remove body classes for auth pages
  useEffect(() => {
    document.body.classList.add("auth-page");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("auth-page");
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="app-container min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet context={{ onAuthSuccess: handleAuthSuccess }} />
      </Suspense>
    </div>
  );
}

// Create the router configuration
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RecipeHome />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "explore",
        element: <Explore />
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />
      },
      {
        path: "terms-conditions",
        element: <TermsConditions />
      },
      {
        path: "veg",
        element: <RecipeListPage category="veg" />
      },
      {
        path: "nonveg",
        element: <RecipeListPage category="nonveg" />
      },
      {
        path: "dessert",
        element: <RecipeListPage category="dessert" />
      },
      {
        path: "beverages",
        element: <RecipeListPage category="beverages" />
      },
      {
        path: "recipes/:category/:recipeId",
        element: <RecipeDetailPage />
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        )
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        )
      },
      {
        path: "add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        )
      },
      {
        path: "error",
        element: <ErrorPage />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="login-bg">
            <Login />
          </div>
        )
      }
    ]
  },
  {
    path: "/register",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="register-bg">
            <Register />
          </div>
        )
      }
    ]
  }
]);

// Main App Component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
