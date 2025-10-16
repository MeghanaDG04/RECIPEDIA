// src/pages/ForgotPass.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ChevronLeft, ChefHat, XCircle } from "lucide-react";

const ForgotPass = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null); // ✅ custom notification

  // --- Password strength check ---
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "text-red-500" };
    if (strength === 3 || strength === 4) return { label: "Medium", color: "text-yellow-500" };
    if (strength === 5) return { label: "Strong", color: "text-green-500" };
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    let errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.newPassword) {
      errs.newPassword = "New password is required.";
    } else {
      const password = formData.newPassword;
      const regex = {
        upper: /[A-Z]/,
        lower: /[a-z]/,
        number: /[0-9]/,
        special: /[!@#$%^&*(),.?":{}|<>]/,
      };

      if (password.length < 8) {
        errs.newPassword = "Password must be at least 8 characters long.";
      } else if (
        !regex.upper.test(password) ||
        !regex.lower.test(password) ||
        !regex.number.test(password) ||
        !regex.special.test(password)
      ) {
        errs.newPassword =
          "Password must include uppercase, lowercase, number, and special character.";
      }
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    setTimeout(() => {
      setNotification({ type: "success", message: "Password reset successfully!" });
      setLoading(false);

      // auto-hide + redirect
      setTimeout(() => {
        setNotification(null);
        navigate("/login");
      }, 2000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <motion.button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      </div>

      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md space-y-5 p-8 border-t-8 border-red-500"
      >
        {/* Header */}
        <motion.div
          className="text-center pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mb-3 shadow-lg">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Recipedia
            </span>
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Reset Your Password
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Enter your email and set a new password
          </p>
        </motion.div>

        {/* ✅ Notification Banner */}
        {notification && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl shadow-md mb-4 animate-slide-in ${
            notification.type === "success"
            ? "bg-green-50 text-green-700 border border-green-300"
            : "bg-red-50 text-red-700 border border-red-300"
          }`}
          role="alert"
        >
        <span className="text-lg">
          {notification.type === "success" ? "✅" : "⚠️"}
        </span>
        <span className="font-medium">{notification.message}</span>
        </div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Email */}
          <motion.div variants={childVariants} className="w-full">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-white dark:bg-slate-900 dark:border-slate-700 focus-within:border-red-400">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-sm bg-transparent outline-none dark:text-gray-200"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1.5">
                <XCircle size={14} /> {errors.email}
              </p>
            )}
          </motion.div>

          {/* New Password */}
          <motion.div variants={childVariants} className="w-full">
            <label htmlFor="newPassword" className="sr-only">New Password</label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-white dark:bg-slate-900 dark:border-slate-700 focus-within:border-red-400">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full text-sm bg-transparent outline-none dark:text-gray-200"
                aria-describedby="password-strength"
              />
              <span
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={toggleNewPassword}
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1.5">
                <XCircle size={14} /> {errors.newPassword}
              </p>
            )}

            {/* ✅ Password Strength Indicator */}
            {formData.newPassword && (
              <p
                id="password-strength"
                className={`mt-1 text-xs font-medium ${getPasswordStrength(formData.newPassword).color}`}
                aria-live="polite"
              >
                Strength: {getPasswordStrength(formData.newPassword).label}
              </p>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={childVariants} className="w-full">
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-white dark:bg-slate-900 dark:border-slate-700 focus-within:border-red-400">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full text-sm bg-transparent outline-none dark:text-gray-200"
              />
              <span
                className="cursor-pointer text-gray-500 hover:text-red-500"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1.5">
                <XCircle size={14} /> {errors.confirmPassword}
              </p>
            )}
          </motion.div>

          {/* Submit */}
          <motion.button
            variants={childVariants}
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-md disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgotPass;
