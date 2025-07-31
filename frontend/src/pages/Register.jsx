import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    address: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { username, email, password, age, gender, address, phone } = formData;

    if (!username || !email || !password || !age || !gender || !address || !phone) {
      return "Please fill in all fields";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (isNaN(age) || age < 1 || age > 120) {
      return "Please enter a valid age";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
      return "Please enter a valid phone number";
    }

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Use & Privacy Policy");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          age: parseInt(formData.age),
          gender: formData.gender,
          address: formData.address.trim(),
          phone: formData.phone.trim()
        }
      );

      const { token, user } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Registration failed");
      } else if (error.request) {
        setError("Cannot connect to server. Please check if the server is running.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register for RECIPEDIA</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleRegister}>
        {/* Name & Email */}
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength="6"
        />

        {/* Age & Gender */}
        <div className="form-group">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="120"
            required
          />
          <div class="custom-select">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          </div>
        </div>

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          required
        />

        {/* Terms */}
        <div className="termsandconditions">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            <h6>By continuing, I agree to the Terms of Use & Privacy Policy</h6>
          </label>
        </div>

        {/* Submit Button */}
        <div className="button-container">
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </div>
      </form>

      <p className="swap_state">
        Already have an account?{" "}
        <span className="link">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
