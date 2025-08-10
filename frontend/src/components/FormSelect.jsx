import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FormSelect = ({ 
  name, 
  value, 
  onChange, 
  options, 
  placeholder = "Select an option",
  icon: Icon,
  error,
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Filter out non-DOM props
  const {
    jsx, // Remove jsx if it exists
    ...validProps
  } = props;

  return (
    <motion.div 
      className="relative mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <motion.div 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
            animate={{ 
              scale: isFocused ? 1.1 : 1,
              color: isFocused ? '#ef4444' : '#9ca3af'
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}

        {/* Select Field */}
        <motion.select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-12 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200/50 dark:border-slate-600/50 rounded-xl text-gray-800 dark:text-white transition-all duration-300 focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/20 focus:bg-white dark:focus:bg-slate-700 backdrop-blur-sm appearance-none cursor-pointer ${error ? 'border-red-400 ring-2 ring-red-100 dark:ring-red-900/20' : ''}`}
          {...validProps} // Only spread filtered props
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-800 dark:text-white">
              {option.label}
            </option>
          ))}
        </motion.select>

        {/* Dropdown Arrow */}
        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          animate={{ 
            rotate: isFocused ? 180 : 0,
            color: isFocused ? '#ef4444' : '#9ca3af'
          }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>

        {/* Focus Border Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-red-400 to-pink-400 opacity-0 -z-10"
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
          className="text-red-500 text-sm mt-2 ml-1"
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

export default FormSelect;
