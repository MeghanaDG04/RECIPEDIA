import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import { signInWithGoogle } from "../auth";

import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  Users, 
  Phone, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormTextarea from '../components/FormTextarea';
import AuthButton from '../components/AuthButton';
import ErrorAlert from '../components/ErrorAlert';


const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
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
  const validateForm = () => {
    const { username, email, password, age, gender, address, phone } = formData;

    if (
      !username ||
      !email ||
      !password ||
      !age ||
      !gender ||
      !address ||
      !phone
    ) {
      return "Please fill in all fields";
    }
    if (password.length < 6) return "Password must be at least 6 characters";
    if (isNaN(age) || age < 1 || age > 120) return "Please enter a valid age";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10)
      return "Please enter a valid phone number";

    if (!agreeTerms) return "Please agree to the Terms of Use & Privacy Policy";

    return null;
  };

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
      const res = await axios.post(
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

      const { token, user } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
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

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ];

  return (
    <div className="auth-page-container">
      <AuthLayout 
        title="Join Recipedia" 
        subtitle="Create your account and start sharing amazing recipes"
      >
        <ErrorAlert error={error} onDismiss={() => setError("")} />

        <form onSubmit={handleRegister} className="space-y-3">
          {/* Username */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <FormInput
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange}
              required
              icon={User}
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <FormInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              icon={Mail}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <FormInput
              type="password"
              name="password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
              icon={Lock}
            />
          </motion.div>

          {/* Age and Gender Row */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <FormInput
              type="number"
              name="age"
              placeholder="Your age"
              value={formData.age}
              onChange={handleInputChange}
              min="1"
              max="120"
              required
              icon={Calendar}
            />
            <FormSelect
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={genderOptions}
              placeholder="Select gender"
              required
              icon={Users}
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <FormInput
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              icon={Phone}
            />
          </motion.div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <FormTextarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              required
              icon={MapPin}
            />
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div 
            className="flex items-start gap-3 py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 text-red-500 bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded focus:ring-red-500 focus:ring-2 mt-0.5 flex-shrink-0"
              whileTap={{ scale: 0.9 }}
            />
            <label htmlFor="terms" className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
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
            transition={{ delay: 0.45, duration: 0.3 }}
            className="pt-2"
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

        {/* Sign In Link */}
        <motion.div 
          className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
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
  class="p-3 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition"
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