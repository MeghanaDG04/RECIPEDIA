// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaPlus,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
} from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme,setTheme] = useState(()=>{return localStorage.getItem('mode')||'light'});

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleProfileDropdown = () => setProfileDropdownOpen((prev) => !prev);
  const closeProfileDropdown = () => setProfileDropdownOpen(false);

  const handleLogout = () => {
    onLogout();
    closeProfileDropdown();
    closeMobileMenu();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Explore", path: "/explore" },
    { title: "About", path: "/about" },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-gray-700 dark:text-white hover:text-amber-500 hover:scale-105 font-medium transition-colors duration-200 text-center ${
      isActive ? "text-amber-500 font-semibold" : ""
    }`;

  const getMobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 dark:text-white text-center hover:scale-105 ${
      isActive
        ? "bg-amber-400 text-amber-600  font-semibold "
        : "text-gray-700 hover:text-white hover:bg-amber-500 "
    }`;

    useEffect(() => {
    const html = document.documentElement;;
    if(theme==='dark'){
      html.classList.add('dark')
    }
    else{
      html.classList.remove('dark');
    }
    localStorage.setItem("mode", theme);
    
  
    
  }, [theme]);

    const ChangeTheme = ()=>{
       setTheme((prev)=>(prev==='light'?'dark':'light'))

    }

  return (
    // The header itself is the positioning context for the mobile menu
    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-800  backdrop-blur-md  shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-bold text-red-500 hover:text-red-600   transition-colors duration-300"
            >
              Recipedia
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8 ">
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

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/add-recipe"
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <FaPlus className="mr-2" />
                  Add Recipe
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="text-gray-700 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 rounded-full"
                    aria-label="Open user menu"
                    aria-haspopup="true"
                    aria-expanded={profileDropdownOpen}
                  >
                    <FaUserCircle size={32} />
                  </button>
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1 origin-top-right transition-all duration-200 ease-out ${
                      profileDropdownOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 transition-colors"
                      onClick={closeProfileDropdown}
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-amber-100 transition-colors"
                      role="menuitem"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex  items-center space-x-3 justify-center">
                <Link
                  to="/login"
                  className="px-4 py-2  hover:underline text-gray-700 hover:text-amber-500 font-medium transition-colors rounded-md dark:text-white "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-400 text-white px-5 py-2  rounded-full font-semibold hover:bg-amber-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap "
                >
                  Sign Up
                </Link>
                <button onClick={ChangeTheme} className="text-white rounded-full hover:bg-gray-700 transition border border-amber-500 mb-2 bg-slate-800">
                  {theme === "dark" ? <IoSunnySharp className="text-yellow-400 text-2xl my-1 mx-1"/> : <FaMoon className="text-yellow-400 text-xl my-2 mx-2" />}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle - This is now guaranteed to be visible */}
          {/* Added Dark Mode  */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-white dark:hover:bg-slate-600 hover:text-amber-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only dark:text-white">Open main menu</span>
              {mobileMenuOpen ? (
                <FaTimes size={24} className="" />
              ) : (
                <FaBars size={24} />
              )}
            </button>
            <button onClick={ChangeTheme} className="text-white rounded-full hover:bg-gray-700 transition border border-amber-500 mb-2 bg-slate-800">
              {theme === "dark" ? <IoSunnySharp className="text-yellow-400 text-3xl "/> : <FaMoon className="text-yellow-400 text-2xl my-1 mx-1" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- CORRECTED MOBILE MENU --- */}
      {/* It is now absolutely positioned relative to the header and will not interfere with the hamburger button */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-y-0" : "-translate-y-[150%]"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 dark:bg-slate-700 dark:text-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              end={link.path === "/"}
              className={getMobileNavLinkClass}
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <div className="pt-4 pb-4 border-t border-gray-200 px-4 dark:bg-slate-700">
          {isAuthenticated ? (
            <div className="space-y-3">
              <Link
                to="/profile"
                className="flex items-center text-gray-800 font-medium hover:text-amber-500 transition-colors"
              >
                <FaUserCircle className="mr-3 text-gray-600" size={24} /> My
                Profile
              </Link>
              <Link
                to="/add-recipe"
                className="flex items-center justify-center w-full bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <FaPlus className="mr-2" /> Add New Recipe
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full bg-gray-100 px-4 py-2.5 rounded-lg font-medium text-red-500 hover:bg-gray-200 transition-colors"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3 ">
              <Link
                to="/login"
                className="block w-full text-center bg-amber-400 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-amber-500 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
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
