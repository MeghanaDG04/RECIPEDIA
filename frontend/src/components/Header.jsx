// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaBars,
  FaTimes,
  FaPlus,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { authService } from '../services/authService';

// ThemeToggle extracted
const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    className="text-white rounded-full hover:bg-gray-700 transition border border-amber-500 mb-2 bg-slate-800"
  >
    {theme === "dark" ? (
      <IoSunnySharp className="text-yellow-400 text-2xl my-1 mx-1" />
    ) : (
      <FaMoon className="text-yellow-400 text-xl my-2 mx-2" />
    )}
  </button>
);

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const Navbar = ({ isAuthenticated,isLoggedIn, setIsLoggedIn,onLogout}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("mode") || "light"
  );
  const [username, setUsername] = useState("");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleProfileDropdown = () => setProfileDropdownOpen((prev) => !prev);
  const closeProfileDropdown = () => setProfileDropdownOpen(false);

  // Get username when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      const user = authService.getUser();
      setUsername(user ? user.username : "User");
    } else {
      setUsername("");
    }
  }, [isAuthenticated]);

  // Listen for auth logout events (from axios interceptor)
  useEffect(() => {
    const handleAuthLogout = () => {
      if (onLogout) {
        onLogout();
      }
    };

    window.addEventListener('auth-logout', handleAuthLogout);
    return () => window.removeEventListener('auth-logout', handleAuthLogout);
  }, [onLogout]);

  const handleLogout = () => {
    onLogout();
    closeProfileDropdown();
    closeMobileMenu();
    navigate("/");
  };


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    closeMobileMenu();
    closeProfileDropdown();
  }, [location.pathname]);

  // Dark mode
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("mode", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Explore", path: "/explore" },
    { title: "About", path: "/about" },
    { title: "Contact ", path: "/ContactUs" },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-gray-700 dark:text-white hover:text-amber-500 hover:scale-105 font-medium transition-colors duration-200 ${
      isActive ? "text-amber-500 font-semibold" : ""
    }`;

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-800 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-red-500 hover:text-red-600 transition-colors duration-300"
          >
            Recipedia
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                end={link.path === "/"}
                className={getNavLinkClass}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // Authenticated User Section
              <>
                <Link
                  to="/add-recipe"
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <FaPlus className="mr-2" /> Add Recipe
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    aria-label="Open user menu"
                    className="text-gray-700 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 rounded-full"
                  >
                    <FaUserCircle size={32} />
                  </button>
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-xl z-20 py-1 origin-top-right transition-all duration-200 ease-out ${
                      profileDropdownOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-amber-100 dark:hover:bg-slate-700"
                      onClick={closeProfileDropdown}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-amber-100 dark:hover:bg-slate-700"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </>
            ) : (
              // Non-Authenticated User Section
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 text-sm md:text-base lg:text-lg hover:underline text-gray-700 hover:text-amber-500 font-medium transition-colors rounded-md dark:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-amber-400 text-white px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-sm md:text-base lg:text-lg rounded-full font-semibold hover:bg-amber-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:scale-105 whitespace-nowrap"
                >
                  Sign Up
                </Link>

                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleMobileMenu}
              aria-label="Open main menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-white dark:hover:bg-slate-600 hover:text-amber-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
  id="mobile-menu"
  className={`md:hidden fixed top-20 left-0 w-full shadow-2xl border-t-4 border-red-600 rounded-b-3xl transform transition-all duration-300 ease-in-out
    ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"}
    bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-800/95 dark:backdrop-blur-lg`}
>
  <div className="flex flex-col px-6 py-6 space-y-5">
    {/* Navigation Links */}
    {navLinks.map((link) => (
      <NavLink
        key={link.title}
        to={link.path}
        end={link.path === "/"}
        className={({ isActive }) =>
          `block text-center px-5 py-3 text-lg font-semibold rounded-xl border shadow-sm transition-all duration-300
          ${
            isActive
              ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
              : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800/70 border-gray-300 dark:border-slate-700 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:scale-[1.02]"
          }`
        }
        onClick={closeMobileMenu}
      >
        {link.title}
      </NavLink>
    ))}

    {/* Mobile Auth Section */}
    <div className="pt-5 border-t border-gray-300 dark:border-gray-700 flex flex-col gap-3">
      {isAuthenticated ? (
        <>
          <div className="text-center text-gray-700 dark:text-gray-100 font-medium mb-2">
            👋 Welcome, <span className="font-bold text-red-500">{username}</span>!
          </div>
          <Link
            to="/profile"
            className="block text-center bg-gray-100 dark:bg-slate-700/70 text-gray-800 dark:text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-400 hover:text-white transition-all duration-200"
            onClick={closeMobileMenu}
          >
            My Profile
          </Link>
          <Link
            to="/settings"
            className="block text-center bg-gray-100 dark:bg-slate-700/70 text-gray-800 dark:text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-400 hover:text-white transition-all duration-200"
            onClick={closeMobileMenu}
          >
            Settings
          </Link>
          <Link
            to="/add-recipe"
            className="block text-center bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 shadow-md"
            onClick={closeMobileMenu}
          >
            ➕ Add Recipe
          </Link>
          <button
            onClick={handleLogout}
            className="block text-center bg-gray-100 dark:bg-slate-700/70 text-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200"
          >
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="block text-center bg-amber-400 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-500 transition-all duration-200 shadow-md"
            onClick={closeMobileMenu}
          >
             Login
          </Link>
          <Link
            to="/register"
            className="block text-center bg-gray-100 dark:bg-slate-700/70 text-gray-800 dark:text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200"
            onClick={closeMobileMenu}
          >
             Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
</div>

    </header>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Navbar;