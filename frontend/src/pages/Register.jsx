import React, { useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import { signInWithGoogle } from "../auth";

import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import AuthButton from '../components/AuthButton';
import ErrorAlert from '../components/ErrorAlert';
import { authService } from '../services/authService';



const Register = ({ setIsLoggedIn }) => {

const Register = ({ onAuthSuccess }) => {


import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Phone, MapPin, Calendar, ArrowRight, Eye, EyeOff, ChefHat, User } from "lucide-react";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "", email: "", password: "", age: "", gender: "", phone: "", address: "", agree: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // clear error when user types
  };

  //sign in with google
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User Info:", user);
      alert(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };


  // Form validation

  const validateForm = () => {
    const { username, email, password, age, gender, address, phone } = formData;
    
    if (!username || !email || !password || !age || !gender || !address || !phone) {
      return "Please fill in all fields";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (isNaN(age) || age < 1 || age > 120) {
      return "Please enter a valid age between 1 and 120";
    }


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.agree) return setError("You must agree to the terms.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters.");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Registration failed");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const Input = ({ icon: Icon, ...props }) => (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
      <input
        {...props}
        autoComplete="on"
        className="w-full border-2 rounded-lg px-10 py-2 text-sm outline-none focus:border-red-400 transition"
      />
    </motion.div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
      <form className="bg-white rounded-lg shadow-md w-full max-w-sm space-y-4 p-6 border-t-4 border-red-400" onSubmit={handleSubmit}>
        <motion.div className="flex items-center justify-center mb-4" initial={{ y: -10 }} animate={{ y: 0 }} whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}>
          <div className="bg-red-400 rounded-lg flex items-center justify-center w-12 h-12">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        <h2 className="text-xl font-bold text-center text-red-500">Recipedia</h2>
        <p className="text-xs text-center text-gray-500">Join Recipedia! Create your account and start your culinary adventure</p>
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <Input placeholder="Username" name="username" value={formData.username} onChange={handleChange} icon={User} required />
        <Input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} icon={Mail} required />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password (min 8 chars)"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
            autoComplete="new-password"
            className="w-full border-2 rounded-lg px-10 py-2 text-sm outline-none focus:border-red-400 transition"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </span>
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Age" type="number" name="age" value={formData.age} onChange={handleChange} icon={Calendar} min="1" max="120" required />
          <motion.select initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} name="gender" value={formData.gender} onChange={handleChange} required className="w-full border-2 rounded-lg px-3 py-2 text-sm text-gray-400 outline-none focus:border-red-400 transition">
            <option value="" disabled hidden>Select Gender</option>
            <option value="male" className="text-black">Male</option>
            <option value="female" className="text-black">Female</option>
            <option value="other" className="text-black">Other</option>
            <option value="prefer-not-to-say" className="text-black">Prefer not to say</option>
          </motion.select>
        </div>

        <Input placeholder="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} />
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <textarea placeholder="Address" name="address" value={formData.address} onChange={handleChange} className="w-full border-2 rounded-lg px-10 py-2 text-sm outline-none resize-none focus:border-red-400 transition" />
        </div>

        <motion.div className="flex items-center text-xs" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="mr-2 w-3 h-3" />
          I agree to the <span className="text-red-500 underline cursor-pointer">Terms of Use & Privacy Policy</span>
        </motion.div>

        <motion.button type="submit" className="w-full bg-red-400 text-white py-1.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          Create Account <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-center text-xs text-gray-600">
          Already have an account? <span className="text-red-500 underline cursor-pointer" onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>


        {/* Login Link */}
        <motion.div 
          className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >


          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          required
        />
        {/* /google sign in */}
        {/* <button
          type="button" // <-- important
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Sign In with Google
        </button> */}
        

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        
<div className="flex flex-col items-center space-y-4">
  {/* Default Sign In button */}
 
  {/* "Other ways" separator */}
  <div className="flex items-center w-full my-2">
    <div className="flex-grow h-px bg-gray-300 mt-2"></div>
    <span className="px-4 text-gray-500 text-sm mt-2">Other ways to sign in</span>
    <div className="flex-grow h-px bg-gray-300 mt-2"></div>
  </div>

  {/* Google Sign In */}
  <button
  onclick="signInWithGoogle()"
  class="p-3  rounded-full bg-white hover:bg-gray-100 transition"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    class="w-6 h-6 ml-32"
  />
</button>

</div>

      </form>

      <p className="swap_state">
        Already have an account?{" "}
        <span className="link">
          <Link to="/login">Login</Link>
        </span>
      </p>

      <div className="termsandconditions">
        <input
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <label htmlFor="terms">
          <h6>By continuing, I agree to the Terms of Use & Privacy Policy</h6>
        </label>
      </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm">

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
