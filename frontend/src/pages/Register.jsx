import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authService";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff, MdCalendarToday } from "react-icons/md";

export default function Register({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("a number");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("a special character");

  return errors;
};


  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

  if (name === "password") {
    setPasswordErrors(validatePassword(value)); // live validate password
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!validateAllFields()) {
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
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

    const { token, user } = response.data;

    if (!token || !user) {
      throw new Error("Invalid response from server");
    }

    authService.setAuth(token, user);

    if (onAuthSuccess) {
      onAuthSuccess();
    }

    navigate("/");

  } catch (err) {
    console.error("Registration error:", err);
    if (err.response) {
      setError(err.response.data?.message || "Registration failed.");
    } else if (err.request) {
      setError("Cannot connect to server. Please check your internet connection.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
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

      console.log("Register response:", response.data);

      const { token, user } = response.data.data || response.data;
      if (token && user) {
        authService.setAuth(token, user);
        onAuthSuccess?.();
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-red-500 text-center">Recipedia</h1>
        <h2 className="text-xl font-semibold text-center mt-2">Create Account</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Unlock a world of flavors! Begin your delicious culinary adventure.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-900/50 text-red-400 border border-red-700 px-4 py-2 rounded-lg mb-4 text-sm flex items-center gap-2">
            <span>❌</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2"
              required
            />
          </div>

          {/* Password */}
         {/* Password */}
<div className="flex flex-col gap-1">
  <div className="flex items-center bg-slate-700 rounded-lg px-3">
    <FaLock className="text-gray-400 mr-2" />
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full bg-transparent outline-none py-2"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-400"
    >
      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
    </button>
  </div>

  {/* Password validation messages */}
  {passwordErrors.length > 0 && (
    <ul className="text-xs text-red-400 mt-1 list-disc list-inside">
      {passwordErrors.map((err, idx) => (
        <li key={idx}>Password must include {err}</li>
      ))}
    </ul>
  )}
</div>


          {/* Confirm Password */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2"
              required
            />
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center bg-slate-700 rounded-lg px-3">
              <MdCalendarToday className="text-gray-400 mr-2" />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-transparent outline-none py-2"
                required
              />
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg px-3 py-2 outline-none"
              required
            >
              <option value="">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2"
            />
          </div>

          {/* Address */}
          <div className="flex items-start bg-slate-700 rounded-lg px-3">
            <FaMapMarkerAlt className="text-gray-400 mt-3 mr-2" />
            <textarea
              name="address"
              placeholder="Address (Optional)"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-transparent outline-none py-2 resize-none"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center text-sm">
            <input type="checkbox" required className="mr-2 accent-red-500" />
            <p>
              I agree to the{" "}
              <span className="text-red-500 cursor-pointer">Terms of Use</span> &{" "}
              <span className="text-red-500 cursor-pointer">Privacy Policy</span>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
