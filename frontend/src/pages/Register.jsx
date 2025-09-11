import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, Phone, MapPin, Calendar, ArrowRight, Eye, EyeOff, User, ChefHat, XCircle, Sparkles, ChevronLeft, House } from "lucide-react";

const CustomFormInput = ({ icon: Icon, type = "text", name, value, onChange, onBlur, placeholder, required, autoComplete, min, max, minLength, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e); // Call the passed onBlur handler
  };


  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="relative w-full">
      {Icon && (
        <Icon
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200
            ${error ? 'text-red-500' : isFocused ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}
          `}
        />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur} 
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        min={min}
        max={max}
        minLength={minLength}
        className={`w-full border rounded-xl pl-10 pr-4 py-2 text-sm transition-all duration-300
          ${error
            ? 'border-red-500 focus:border-red-500 text-red-800 placeholder-red-300 bg-red-50 dark:bg-red-900/30 dark:text-red-300 dark:placeholder-red-500'
            : 'border-gray-200 focus:border-red-400 text-gray-800 placeholder-gray-400 focus:shadow-sm focus:shadow-red-100 bg-white dark:bg-slate-900 dark:border-slate-700 dark:focus:border-red-400 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:shadow-red-900/20'
          }
          outline-none
        `}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <div className="absolute inset-y-0 right-3 flex items-center pr-1 pointer-events-none">
          <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
        </div>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5" id={`${name}-error`}>
          {error}
        </p>
      )}
    </motion.div>
  );
};
// --- END: Local Input Component ---

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
  hidden: { opacity: 0, y: 15, scale: 0.98 }, // Start slightly scaled down and below
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 25, mass: 0.5 }, // More refined spring animation
  },
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

 const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === "checkbox" ? checked : value;
  
  setFormData((prev) => ({ ...prev, [name]: newValue }));

  // Mark field as touched
  setTouchedFields(prev => ({ ...prev, [name]: true }));

  // Validate field in real-time only if it has been touched
  if (touchedFields[name] || newValue !== '') {
    const error = validateField(name, newValue, { ...formData, [name]: newValue });
    setFieldErrors((prev) => ({ 
      ...prev, 
      [name]: error 
    }));
  }
    // Clear general error if any input changes
  if (generalError) setGeneralError("");
};
const handleFieldBlur = (e) => {
  const { name, value, type, checked } = e.target;
  const fieldValue = type === "checkbox" ? checked : value;
  
  // Mark field as touched when user leaves the field
  setTouchedFields(prev => ({ ...prev, [name]: true }));
  
  // Validate the field
  const error = validateField(name, fieldValue, formData);
  setFieldErrors(prev => ({ ...prev, [name]: error }));
};
  const validateAllFields = () => {
  const { username, email, password, age, gender, phone, agreeTerms } = formData;
  let errors = {};

  errors.username = validateField('username', username, formData);
  errors.email = validateField('email', email, formData);
  errors.password = validateField('password', password, formData);
  errors.age = validateField('age', age, formData);
  errors.gender = validateField('gender', gender, formData);
  errors.phone = validateField('phone', phone, formData);
  errors.agreeTerms = validateField('agreeTerms', agreeTerms, formData);

  // Remove empty errors
  Object.keys(errors).forEach(key => {
    if (!errors[key]) delete errors[key];
  });

  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
};
  const togglePassword = () => setShowPassword((prev) => !prev);

const validateField = (name, value, formData) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?(\d[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,15}$/;

  switch (name) {
    case 'username':
      if (!value.trim()) return "Username is required.";
      if (value.trim().length < 3) return "Username must be at least 3 characters.";
      if (value.trim().length > 30) return "Username cannot exceed 30 characters.";
      return "";

    case 'email':
      if (!value.trim()) return "Email is required.";
      if (!emailRegex.test(value.trim())) return "Please enter a valid email address.";
      return "";

    case 'password':
      if (!value) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters long.";
      if (!/[A-Z]/.test(value)) return "Password needs at least one uppercase letter.";
      if (!/[a-z]/.test(value)) return "Password needs at least one lowercase letter.";
      if (!/[0-9]/.test(value)) return "Password needs at least one digit.";
      if (!/[!@#$%^&*()]/.test(value)) return "Password needs at least one special character.";
      return "";

    case 'age':
      if (!value) return "Age is required.";
      if (isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 120) {
        return "Age must be between 1 and 120.";
      }
      return "";

    case 'gender':
      if (!value) return "Gender is required.";
      return "";

    case 'phone':
      if (value.trim() && !phoneRegex.test(value.trim())) {
        return "Please enter a valid phone number (e.g., +15551234567).";
      }
      return "";

    case 'agreeTerms':
      if (!value) return "You must agree to the Terms & Privacy Policy.";
      return "";

    default:
      return "";
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  setGeneralError("");
  
  // Mark all fields as touched
  const allFields = ['username', 'email', 'password', 'age', 'gender', 'phone', 'agreeTerms'];
  setTouchedFields(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

  if (!validateAllFields()) {
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/register`,
      {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
      }
    );

    if (response.status === 201) {
      navigate("/login");
    } else {
      setGeneralError("Registration successful, but an unexpected status was returned.");
    }
  } catch (err) {
    console.error("Registration error:", err);
    if (err.response) {
      if (err.response.status === 409 && err.response.data?.message?.includes("Email already registered")) {
        setFieldErrors((prev) => ({ ...prev, email: "This email is already registered. Please login or use another email." }));
      } else if (err.response.status === 409 && err.response.data?.message?.includes("Username already taken")) {
        setFieldErrors((prev) => ({ ...prev, username: "This username is already taken. Please choose another one." }));
      } else {
        setGeneralError(err.response.data?.message || "Registration failed. Please try again.");
      }
    } else if (err.request) {
      setGeneralError("Cannot connect to the server. Please check your internet connection and try again.");
    } else {
      setGeneralError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
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

      {/* Original Register Form - with dark mode adaptations and aligned header styling */}
      <motion.form
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md space-y-5 p-8 border-t-8 border-red-500 transform transition-all duration-300 hover:shadow-2xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} // Custom cubic-bezier for a more refined bounce
      >
        {/* Header Section - aligned with Login's styling */}
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
            Create Account
          </motion.h2>
          
          <motion.p 
            className="text-gray-500 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Unlock a world of flavors! Begin your delicious culinary adventure.
          </motion.p>
        </motion.div>

        {generalError && (
          <motion.p
            className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-lg p-2 text-xs text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <XCircle className="h-4 w-4" />
            {generalError}
          </motion.p>
        )}

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
          {/* Username */}
          <motion.div variants={childVariants}>
            <CustomFormInput placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} onBlur={handleFieldBlur} icon={User} required error={fieldErrors.username} />
          </motion.div>

          {/* Email */}
          <motion.div variants={childVariants}>
            <CustomFormInput placeholder="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleFieldBlur} icon={Mail} required error={fieldErrors.email} autoComplete="email" />
          </motion.div>

          {/* Password */}
          <motion.div variants={childVariants} className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 8 chars, strong)"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleFieldBlur}
              minLength={8}
              required
              autoComplete="new-password"
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
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${fieldErrors.password ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
            {fieldErrors.password && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5" id="password-error">
                {fieldErrors.password}
              </p>
            )}
          </motion.div>

          {/* Age and Gender */}
          <motion.div variants={childVariants} className="grid grid-cols-2 gap-3">
            {/* Age */}
            <CustomFormInput placeholder="Age" type="number" name="age" value={formData.age} onChange={handleInputChange} onBlur={handleFieldBlur} icon={Calendar} min="1" max="120" required error={fieldErrors.age} />

            {/* Gender Select */}
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="relative w-full">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                required
                className={`w-full border rounded-xl pl-3 pr-8 py-2 text-sm outline-none appearance-none transition-all duration-300 bg-white dark:bg-slate-900 cursor-pointer
                  ${fieldErrors.gender ? 'border-red-500 text-red-800 bg-red-50 dark:bg-red-900/30 dark:text-red-300' :
                    formData.gender ? 'border-gray-200 text-gray-800 dark:border-slate-700 dark:text-gray-200' : 'border-gray-200 text-gray-400 dark:border-slate-700 dark:text-gray-500'
                  }
                  focus:border-red-400 focus:shadow-sm focus:shadow-red-100 dark:focus:border-red-400 dark:focus:shadow-red-900/20
                `}
                aria-invalid={fieldErrors.gender ? "true" : "false"}
                aria-describedby={fieldErrors.gender ? "gender-error" : undefined}
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="male" className="text-gray-800 bg-white hover:bg-red-50 dark:text-gray-200 dark:bg-slate-900 dark:hover:bg-red-900/20">Male</option>
                <option value="female" className="text-gray-800 bg-white hover:bg-red-50 dark:text-gray-200 dark:bg-slate-900 dark:hover:bg-red-900/20">Female</option>
                <option value="other" className="text-gray-800 bg-white hover:bg-red-50 dark:text-gray-200 dark:bg-slate-900 dark:hover:bg-red-900/20">Other</option>
                <option value="prefer-not-to-say" className="text-gray-800 bg-white hover:bg-red-50 dark:text-gray-200 dark:bg-slate-900 dark:hover:bg-red-900/20">Prefer not to say</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
              {fieldErrors.gender && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5" id="gender-error">
                  {fieldErrors.gender}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Phone */}
          <motion.div variants={childVariants}>
            <CustomFormInput placeholder="Phone (Optional)" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleFieldBlur} icon={Phone} error={fieldErrors.phone} autoComplete="tel" />
          </motion.div>

          {/* Address Textarea */}
          <motion.div variants={childVariants} className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <textarea
              placeholder="Address (Optional)"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              onBlur={handleFieldBlur}
              className={`w-full border rounded-xl pl-10 pr-4 py-2 text-sm outline-none resize-none transition-all duration-300
                ${fieldErrors.address
                  ? 'border-red-500 focus:border-red-500 text-red-800 placeholder-red-300 bg-red-50 dark:bg-red-900/30 dark:text-red-300 dark:placeholder-red-500'
                  : 'border-gray-200 focus:border-red-400 text-gray-800 placeholder-gray-400 focus:shadow-sm focus:shadow-red-100 bg-white dark:bg-slate-900 dark:border-slate-700 dark:focus:border-red-400 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:shadow-red-900/20'
                }
              `}
              rows="3"
              aria-invalid={fieldErrors.address ? "true" : "false"}
              aria-describedby={fieldErrors.address ? "address-error" : undefined}
            />
            {fieldErrors.address && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5" id="address-error">
                {fieldErrors.address}
              </p>
            )}
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div variants={childVariants} className="flex items-start text-xs sm:flex-row gap-1.5" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start flex-grow">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                onBlur={handleFieldBlur}
                className={`mr-2 w-4 h-4 mt-0.5 rounded accent-red-500 cursor-pointer ${fieldErrors.agreeTerms ? 'border-red-500' : 'border-gray-300'}`}
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

          {/* Create Account Button */}
          <motion.button
            variants={childVariants}
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-semibold underline-offset-2 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors duration-200">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;