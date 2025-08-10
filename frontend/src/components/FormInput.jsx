import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({ 
  type = 'text', 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  icon: Icon,
  error,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  // Filter out non-DOM props
  const { jsx, ...validProps } = props;

  return (
    <motion.div 
      className="relative mb-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <motion.div 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
            animate={{ 
              scale: isFocused ? 1.1 : 1,
              color: isFocused ? '#ef4444' : '#9ca3af'
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
        )}

        {/* Input Field */}
        <motion.input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} ${isPassword ? 'pr-10' : 'pr-3'} py-3 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200/50 dark:border-slate-600/50 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900/20 focus:bg-white dark:focus:bg-slate-700 backdrop-blur-sm ${error ? 'border-red-400 ring-2 ring-red-100 dark:ring-red-900/20' : ''}`}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          {...validProps}
        />

        {/* Password Toggle */}
        {isPassword && (
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </motion.button>
        )}

        {/* Focus Border Animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-red-400 to-pink-400 opacity-0 -z-10"
          animate={{ 
            opacity: isFocused ? 0.2 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.p 
          className="text-red-500 text-xs mt-1 ml-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FormInput;
