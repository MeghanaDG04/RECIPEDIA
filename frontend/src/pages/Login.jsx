import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ChefHat } from "lucide-react";

import ErrorAlert from "../components/ErrorAlert";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.agree) errors.agree = "You must agree to the terms.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");
    if (!validateForm()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setGeneralError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 overflow-auto">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      {/* Main Login Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md space-y-5 p-8 border-t-8 border-red-500 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header with Chef Hat square logo */}
        <motion.div className="text-center pb-4">
          <motion.div
            className="inline-block mb-2"
            whileTap={{ scale: 0.9, rotate: 20, borderRadius: "25%" }}
            style={{ borderRadius: "20px" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-16 h-16 flex items-center justify-center bg-red-500 border-4 border-white rounded-xl mx-auto">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Recipedia Title */}
          <motion.h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Recipedia
            </span>
          </motion.h1>

          {/* Welcome Text */}
          <motion.h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-1">
            Welcome Back!
          </motion.h2>
          <motion.p className="text-gray-500 dark:text-gray-400 text-sm">
            Sign in to continue your culinary journey
          </motion.p>
        </motion.div>

        {/* Error Alert */}
        <ErrorAlert error={generalError} onDismiss={() => setGeneralError("")} />

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white dark:bg-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border rounded-xl pl-10 pr-10 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white dark:bg-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleInputChange}
              className="mt-1"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-red-500 hover:underline">
                Terms of Use
              </a>{" "}
              &{" "}
              <a href="#" className="text-red-500 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
          {fieldErrors.agree && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.agree}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-xl hover:bg-red-600 transition-all duration-300"
          >
            Sign In →
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            New to Recipedia?{" "}
            <Link
              to="/register"
              className="text-red-500 hover:text-red-600 font-semibold underline-offset-2 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
