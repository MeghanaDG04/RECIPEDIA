import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, XCircle, ChefHat, Sparkles, Eye, EyeOff } from 'lucide-react'; // Added Eye and EyeOff for password toggle

import ErrorAlert from '../components/ErrorAlert'; // Assuming this is updated for dark mode
import { authService } from '../services/authService';

const Login = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState(""); // For network/server/general form errors
  const [fieldErrors, setFieldErrors] = useState({}); // For input-specific validation errors

  // Focus states for inputs to match Register's behavior
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (generalError) setGeneralError(""); // Clear general error on any input change
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Form validation
  const validateForm = () => {
    const { email, password } = formData;
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (!agreeTerms) {
      errors.agreeTerms = "You must agree to the Terms & Privacy Policy.";
    }

    setFieldErrors(errors); // Update field errors state
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    setGeneralError(""); // Clear previous general errors
    setFieldErrors({}); // Clear previous field errors

    if (!validateForm()) {
      // If validation fails, errors are already set in fieldErrors
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      authService.setAuth(token, user);

      if (onAuthSuccess) {
        onAuthSuccess();
      }

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        // More specific error handling for common login failures
        if (err.response.status === 401 || err.response.status === 400) {
          setGeneralError(err.response.data?.message || "Invalid credentials. Please try again.");
        } else {
          setGeneralError(err.response.data?.message || "Login failed. Please try again.");
        }
      } else if (err.request) {
        setGeneralError("Cannot connect to server. Please check your internet connection.");
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger for a snappier feel
        delayChildren: 0.1, // Slight delay before starting the stagger
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 250, damping: 25, mass: 0.5 },
    },
  };

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 2
      }
    })
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 overflow-hidden font-sans antialiased"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      {/* Background Decorative Elements from AuthLayout */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-red-200/30 to-pink-200/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        custom={0}
      />
      <motion.div 
        className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"
        variants={floatingVariants}
        animate="animate"
        custom={1}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        custom={2}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
        custom={3}
      />

      {/* Floating Icons from AuthLayout */}
      <motion.div
        className="absolute top-16 right-16 text-red-300/50"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <ChefHat className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-16 text-pink-300/50"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      {/* Main Content Container - with dark mode */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md space-y-5 p-8 border-t-8 border-red-500 transform transition-all duration-300 hover:shadow-2xl"
      >
        {/* Header Section from AuthLayout - replicated with animations and dark mode */}
        <motion.div 
          className="text-center pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mb-3 shadow-lg"
            whileHover={{ 
              rotate: [0, -10, 10, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <ChefHat className="w-6 h-6 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-2xl font-bold text-gray-800 dark:text-white mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Recipedia
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome Back!
          </motion.h2>
          
          <motion.p 
            className="text-gray-500 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Sign in to continue your culinary journey
          </motion.p>
        </motion.div>

        <ErrorAlert error={generalError} onDismiss={() => setGeneralError("")} />

        <motion.form
          onSubmit={handleLogin}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Email Input - matched to Register's style with focus state */}
          <motion.div variants={childVariants} className="relative w-full">
            <Mail
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200
                ${fieldErrors.email ? 'text-red-500' : isEmailFocused ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}
              `}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              required
              autoComplete="email"
              className={`w-full border rounded-xl pl-10 pr-4 py-2 text-sm transition-all duration-300
                ${fieldErrors.email
                  ? 'border-red-500 focus:border-red-500 text-red-800 placeholder-red-300 bg-red-50 dark:bg-red-900/30 dark:text-red-300 dark:placeholder-red-500'
                  : 'border-gray-200 focus:border-red-400 text-gray-800 placeholder-gray-400 focus:shadow-sm focus:shadow-red-100 bg-white dark:bg-slate-900 dark:border-slate-700 dark:focus:border-red-400 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:shadow-red-900/20'
                }
                outline-none
              `}
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <div className="absolute inset-y-0 right-3 flex items-center pr-1 pointer-events-none">
                <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
              </div>
            )}
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5" id="email-error">
                {fieldErrors.email}
              </p>
            )}
          </motion.div>

          {/* Password Input - matched to Register's style with focus state and toggle */}
          <motion.div variants={childVariants} className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
              autoComplete="current-password"
              className={`w-full border rounded-xl pl-10 pr-10 py-2 text-sm transition-all duration-300 outline-none
                ${fieldErrors.password
                  ? 'border-red-500 focus:border-red-500 text-red-800 placeholder-red-300 bg-red-50 dark:bg-red-900/30 dark:text-red-300 dark:placeholder-red-500'
                  : 'border-gray-200 focus:border-red-400 text-gray-800 placeholder-gray-400 focus:shadow-sm focus:shadow-red-100 bg-white dark:bg-slate-900 dark:border-slate-700 dark:focus:border-red-400 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:shadow-red-900/20'
                }
              `}
              aria-invalid={fieldErrors.password ? "true" : "false"}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 z-10"
              onClick={togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </span>
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 
              ${fieldErrors.password ? 'text-red-500' : isPasswordFocused ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} 
            />
            {fieldErrors.password && (
              <div className="absolute inset-y-0 right-3 flex items-center pr-1 pointer-events-none">
                <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
              </div>
            )}
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5" id="password-error">
                {fieldErrors.password}
              </p>
            )}
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            variants={childVariants}
            className="flex items-start text-xs sm:flex-row gap-1.5"
          >
            <div className="flex items-start flex-grow">
              <input
                type="checkbox"
                id="agreeTerms" // Renamed from 'terms' to 'agreeTerms' for consistency
                name="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  setFieldErrors((prev) => ({ ...prev, agreeTerms: "" })); // Clear error on change
                }}
                className={`mr-2 w-4 h-4 mt-0.5 rounded accent-red-500 cursor-pointer transition-colors duration-200
                  ${fieldErrors.agreeTerms ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
              />
              <label htmlFor="agreeTerms" className="text-gray-700 dark:text-gray-300 cursor-pointer leading-tight">
                I agree to the{" "}
                <Link to="/terms-of-use" className="text-red-500 font-medium underline-offset-2 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors duration-200">
                  Terms of Use
                </Link>{" "}
                &{" "}
                <Link to="/privacy-policy" className="text-red-500 font-medium underline-offset-2 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors duration-200">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {fieldErrors.agreeTerms && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <XCircle size={14} /> {fieldErrors.agreeTerms}
              </p>
            )}
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            variants={childVariants}
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Sign Up Link */}
        <motion.div
          className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-700 dark:text-gray-300 text-sm"> {/* Adjusted text color and size */}
            New to Recipedia?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-semibold underline-offset-2 hover:underline transition-colors duration-200"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
