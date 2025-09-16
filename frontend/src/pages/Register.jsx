import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ChefHat,
  User,
  Calendar,
} from "lucide-react";

import ErrorAlert from "../components/ErrorAlert";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
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
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.dob) errors.dob = "Date of birth is required.";
    if (!formData.agree) errors.agree = "You must agree to the terms.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError("");
    if (!validateForm()) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        name: formData.name,
        email: formData.email,

        password: formData.password,
        gender: formData.gender,
        dob: formData.dob,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setGeneralError("Registration failed. Please try again.");
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

      {/* Main Register Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md space-y-5 p-8 border-t-8 border-red-500 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header with Chef Hat logo */}
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
            Create an Account
          </motion.h2>
          <motion.p className="text-gray-500 dark:text-gray-400 text-sm">
            Join us to explore endless recipes and ideas
          </motion.p>
        </motion.div>

        {/* Error Alert */}
        <ErrorAlert
          error={generalError}
          onDismiss={() => setGeneralError("")}
        />

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white dark:bg-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
            )}
          </div>

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
              placeholder="Password (min 8 chars, strong)"   // ✅ fixed placeholder
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
              <p className="mt-1 text-xs text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Gender */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full"
          >
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className={`w-full border rounded-xl pl-3 pr-8 py-2 text-sm outline-none appearance-none transition-all duration-300 bg-white dark:bg-slate-900 cursor-pointer
                ${
                  fieldErrors.gender
                    ? "border-red-500 text-red-800 bg-red-50 dark:bg-red-900/30 dark:text-red-300"
                    : "border-gray-200 text-gray-500 dark:border-slate-700 dark:text-gray-300"
                }
                focus:border-red-400 focus:shadow-sm focus:shadow-red-100 dark:focus:border-red-400 dark:focus:shadow-red-900/20
              `}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="male" className="text-gray-500 dark:text-gray-300">
                Male
              </option>
              <option
                value="female"
                className="text-gray-500 dark:text-gray-300"
              >
                Female
              </option>
              <option value="other" className="text-gray-500 dark:text-gray-300">
                Other
              </option>
              <option
                value="prefer-not-to-say"
                className="text-gray-500 dark:text-gray-300"
              >
                Prefer not to say
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {fieldErrors.gender && (
              <p className="mt-1 text-xs text-red-600" id="gender-error">
                {fieldErrors.gender}
              </p>
            )}
          </motion.div>

          {/* DOB */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full border rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white dark:bg-slate-700 focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {fieldErrors.dob && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.dob}</p>
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
            Register →
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-slate-600">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 font-semibold underline-offset-2 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
