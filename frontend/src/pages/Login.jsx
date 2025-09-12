import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, XCircle, ChefHat, Sparkles, Eye, EyeOff, ChevronLeft, House } from 'lucide-react';

import ErrorAlert from '../components/ErrorAlert';
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
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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
if (generalError) setGeneralError("");
// / Clear general error on any input change
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

setFieldErrors(errors);
return Object.keys(errors).length === 0;
 // Return true if no errors
  };

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    setGeneralError(""); 
    setFieldErrors({}); 
if (!validateForm()) return;
setLoading(true);

try {
 const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
  {
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
  }
);

  console.log("Login response:", response.data);
  const { token, user } = response.data;

  if (!token || !user) {
    throw new Error("Invalid response format from server");
  }

  authService.setAuth(token, user);
  if (onAuthSuccess) onAuthSuccess();

  navigate("/");
} catch (err) {
  console.error("Login error:", err.response?.data || err.message);
  if (err.response) {
    setGeneralError(
      err.response.data?.message || "Invalid credentials. Please try again."
    );
  } else if (err.request) {
    setGeneralError("Cannot connect to server. Please check your internet.");
  } else {
    setGeneralError("An unexpected error occurred. Please try again.");
  }
} finally {
  setLoading(false);
}
  };

 
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

  const handleBack = () => {
    navigate(-1);
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
      {/* Back Button Container - Positioned at top-left */}
      <div className="absolute top-4 left-4 z-50">
        {/* Mobile Version: Only Home Icon (visible on mobile, hidden on desktop) */}
        <motion.button
          onClick={handleBack}
          aria-label="Go home"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex sm:hidden items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 ease-in-out"
        >
          <House className="w-5 h-5" />
        </motion.button>

        {/* Desktop Version: Full Button with Back Arrow and Text (hidden on mobile, visible on desktop) */}
        <motion.button
          onClick={handleBack}
          aria-label="Go back"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex group items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-base shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 ease-in-out"
        >
          <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back</span>
        </motion.button>
      </div>

      {/* Background Decorative Elements */}
        {/* Card */}
  <motion.div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border-t-8 border-red-500">
    {/* Header */}
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mb-3">
        <ChefHat className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">Recipedia</h1>
      <h2 className="text-lg font-semibold text-gray-700">Welcome Back!</h2>
      <p className="text-gray-500 text-sm">
        Sign in to continue your culinary journey
      </p>
    </div>

    <ErrorAlert error={generalError} onDismiss={() => setGeneralError("")} />

    {/* Form */}
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          className="w-full border rounded-xl pl-10 pr-4 py-2 text-sm"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="current-password"
          className="w-full border rounded-xl pl-10 pr-10 py-2 text-sm"
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={togglePassword}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </span>
        {fieldErrors.password && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-center text-xs gap-2">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="agreeTerms" className="text-gray-700">
          I agree to the{" "}
          <Link to="/terms-of-use" className="text-red-500 underline">
            Terms of Use
          </Link>{" "}
          &{" "}
          <Link to="/privacy-policy" className="text-red-500 underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      {fieldErrors.agreeTerms && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <XCircle size={14} /> {fieldErrors.agreeTerms}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600"
        disabled={loading}
      >
        {loading ? "Signing In..." : <>Sign In <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>

    {/* Sign up link */}
    <div className="text-center mt-6 pt-4 border-t border-gray-200">
      <p className="text-gray-700 text-sm">
        New to Recipedia?{" "}
        <Link to="/register" className="text-red-500 hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  </motion.div>
</div>
);
};

export default Login;