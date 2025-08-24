import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import AuthButton from '../components/AuthButton';
import ErrorAlert from '../components/ErrorAlert';
import { authService } from '../services/authService';

const Login = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // clear error when user types
  };

  // Form validation
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "Please fill in all fields";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    if (!agreeTerms) return "Please agree to the Terms of Use & Privacy Policy";

    return null;
  };

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Attempting login:", { email: formData.email });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }
      );

      const { token, user } = response.data;

      // Store auth info using authService
      authService.setAuth(token, user);

      // Notify parent component about successful authentication
      if (onAuthSuccess) {
        onAuthSuccess();
      }

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data?.message || "Login failed");
      } else if (err.request) {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <AuthLayout 
        title="Welcome Back!" 
        subtitle="Sign in to continue your culinary journey"
      >
        <ErrorAlert error={error} onDismiss={() => setError("")} />

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <FormInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              icon={Mail}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FormInput
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
              icon={Lock}
            />
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div 
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-5 h-5 text-red-500 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded focus:ring-red-500 focus:ring-2 mt-0.5"
              whileTap={{ scale: 0.9 }}
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              I agree to the{" "}
              <span className="text-red-500 hover:text-red-600 cursor-pointer font-medium">
                Terms of Use
              </span>{" "}
              &{" "}
              <span className="text-red-500 hover:text-red-600 cursor-pointer font-medium">
                Privacy Policy
              </span>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AuthButton 
              type="submit" 
              loading={loading}
              disabled={loading}
            >
              {loading ? "Signing In..." : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </AuthButton>
          </motion.div>
        </form>

        {/* Sign Up Link */}
        <motion.div 
          className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
            New to Recipedia?{" "}
            <Link 
              to="/register" 
              className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
      </AuthLayout>
    </div>
  );
};

export default Login;