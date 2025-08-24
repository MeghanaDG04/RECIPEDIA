import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import AuthButton from '../components/AuthButton';
import ErrorAlert from '../components/ErrorAlert';
import { authService } from '../services/authService';

const Register = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
 // Updated input change handler with real-time validation
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Real-time validation for already touched fields
  if (touchedFields[name]) {
    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: fieldError }));
  }
  
  if (error) setError("");
};

// Add new blur handler (add this function)
const handleFieldBlur = (e) => {
  const { name, value } = e.target;
  setTouchedFields(prev => ({ ...prev, [name]: true }));
  
  const fieldError = validateField(name, value);
  setFieldErrors(prev => ({ ...prev, [name]: fieldError }));
};

// Form validation
const [fieldErrors, setFieldErrors] = useState({});
const [touchedFields, setTouchedFields] = useState({});

// Individual field validation function
const validateField = (name, value) => {
  switch (name) {
    case 'username':
      if (!value?.trim()) return "Username is required";
      if (value.length < 3) return "Username must be at least 3 characters";
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscores";
      return "";
    case 'email':
      if (!value?.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
      return "";
    case 'password':
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters long";
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return "Password must contain uppercase, lowercase, and number";
      return "";
    case 'age':
      if (!value) return "Age is required";
      const ageNum = parseInt(value);
      if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) return "Age must be between 13 and 120";
      return "";
    case 'gender':
      if (!value) return "Please select your gender";
      const validGenders = ["male", "female", "other", "prefer-not-to-say"];
      if (!validGenders.includes(value)) return "Please select a valid gender option";
      return "";
    case 'phone':
      if (!value?.trim()) return "Phone number is required";
      const cleanPhone = value.replace(/\s/g, '');
      if (!/^[\+]?[1-9][\d]{9,15}$/.test(cleanPhone)) return "Please enter a valid phone number (10-16 digits)";
      return "";
    case 'address':
      if (!value?.trim()) return "Address is required";
      if (value.trim().length < 10) return "Please enter a complete address";
      return "";
    default:
      return "";
  }
};

// Updated form validation for final submit
const validateForm = () => {
  const errors = {};
  
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field]);
    if (error) errors[field] = error;
  });

  if (!agreeTerms) {
    errors.terms = "Please agree to the Terms of Use & Privacy Policy";
  }

  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
};
  // Handle form submit
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Attempting registration:", { 
        username: formData.username, 
        email: formData.email 
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          age: parseInt(formData.age),
          gender: formData.gender,
          address: formData.address.trim(),
          phone: formData.phone.trim(),
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
      console.error("Registration error:", err);
      if (err.response) {
        setError(err.response.data?.message || "Registration failed");
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
        title="Join Recipedia!" 
        subtitle="Create your account and start your culinary adventure"
      >
        <ErrorAlert error={error} onDismiss={() => setError("")} />

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <FormInput
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleFieldBlur} 
            required
            icon={User}
            aria-describedby={fieldErrors.username ? "username-error" : undefined} 
            aria-invalid={!!fieldErrors.username} 
            />
            {touchedFields.username && fieldErrors.username && ( //error display
            <p id="username-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.username}
            </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FormInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleFieldBlur} 
              required
              autoComplete="email"
              icon={Mail}
              aria-describedby={fieldErrors.email ? "email-error" : undefined} 
              aria-invalid={!!fieldErrors.email} 
            />
            {touchedFields.email && fieldErrors.email && ( //error display
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.email}
            </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <FormInput
              type="password"
              name="password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleFieldBlur}
              required
              autoComplete="new-password"
              icon={Lock}
              aria-describedby={fieldErrors.password ? "password-error" : undefined} 
              aria-invalid={!!fieldErrors.password} 
            />
            {touchedFields.password && fieldErrors.password && ( //error display
            <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.password}
            </p>
            )}
          </motion.div>

          {/* Age and Gender Row */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <FormInput
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                required
                min="1"
                max="120"
                icon={Calendar}
                aria-describedby={fieldErrors.age ? "age-error" : undefined} 
                aria-invalid={!!fieldErrors.age} 
              />
            {touchedFields.age && fieldErrors.age && ( //error display
            <p id="age-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.age}
            </p>
            )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </motion.div>
          </div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <FormInput
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleFieldBlur}
              required
              icon={Phone}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined} 
              aria-invalid={!!fieldErrors.phone} 
            />
            {touchedFields.phone && fieldErrors.phone && ( //error display
            <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.phone}
            </p>
            )}
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <FormInput
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
              onBlur={handleFieldBlur} 
              required
              icon={MapPin}
              aria-describedby={fieldErrors.address ? "address-error" : undefined} 
              aria-invalid={!!fieldErrors.address} 
            />
            {touchedFields.address && fieldErrors.address && ( //error display
            <p id="address-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.address}
            </p>
            )}
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div 
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
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
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <AuthButton 
              type="submit" 
              loading={loading}
              disabled={loading}
            >
              {loading ? "Creating Account..." : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </AuthButton>
          </motion.div>
        </form>

        {/* Login Link */}
        <motion.div 
          className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </AuthLayout>
    </div>
  );
};

export default Register;