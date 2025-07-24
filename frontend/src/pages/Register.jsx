import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  const validateField = (field, value) => {
    switch (field) {
      case "username":
        return value ? "" : "Username is required";
      case "email":
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "age":
        if (!value) return "Age is required";
        if (Number(value) <= 0) return "Age must be greater than 0";
        return "";
      case "gender":
        return value ? "" : "Gender is required";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "address":
        return value ? "" : "Address is required";
      default:
        return "";
    }
  };
=======
 const validateField = (field, value) => {
  switch (field) {
    // Validates if username field is empty
    case "username":
      return value ? "" : "Username is required";

    // Validates if email field is empty, if email format is not proper
    case "email":
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
      return "";

    // Validates if password field is empty, password must be at least 6 characters
    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";

    // Validates if age field is empty, validates on age < 0
    case "age":
      if (!value) return "Age is required";
      if (Number(value) <= 0) return "Age must be greater than 0";
      return "";

    // Validates if gender field is empty
    case "gender":
      return value ? "" : "Gender is required";

    // Validates if phone number field is empty, accepts only digits and must be 10 digits
    case "phone":
      if (!value) return "Phone number is required";
      if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
      return "";

    // Validates if address field is empty
    case "address":
      return value ? "" : "Address is required";

    default:
      return "";
  }
};

>>>>>>> c5f9c0e01b49a6c45b8eb3ff8827d57149bdd401

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleRegister = async () => {
    const newErrors = {};
    Object.entries(formData).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.post("http://localhost:5000/register", formData);
      localStorage.setItem("username", formData.username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const getFieldIcon = (field) => {
    const iconMap = {
      username: FaUser,
      email: FaEnvelope,
      password: FaLock,
      age: FaCalendarAlt,
      gender: FaVenusMars,
      phone: FaPhone,
      address: FaMapMarkerAlt,
    };
    const IconComponent = iconMap[field];
    return IconComponent ? <IconComponent className="input-icon" /> : null;
  };

  const renderInput = (field, type, placeholder) => (
    <div className="modern-input-wrapper">
      <div className="input-container">
        {getFieldIcon(field)}
        <input
          type={field === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={formData[field]}
          required
          onChange={(e) => handleChange(field, e.target.value.trim())}
          className={`modern-input ${
            errors[field]
              ? "error"
              : formData[field] && !errors[field]
              ? "success"
              : ""
          }`}
        />
        {field === "password" && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
        {formData[field] && !errors[field] && (
          <FaCheckCircle className="success-icon" />
        )}
      </div>
      {errors[field] && <div className="error-message">{errors[field]}</div>}
    </div>
  );

  return (
    <div className="modern-auth-container">
      <div className="modern-auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us and start your journey!</p>
        </div>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {renderInput("username", "text", "Username")}
          {renderInput("email", "email", "Email Address")}
          {renderInput("password", "password", "Password")}

          <div className="input-row">
            {renderInput("age", "number", "Age")}
            <div className="modern-input-wrapper">
              <div className="input-container">
                <FaVenusMars className="input-icon" />
                <select
                  value={formData.gender}
                  required
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={`modern-select ${
                    errors.gender
                      ? "error"
                      : formData.gender && !errors.gender
                      ? "success"
                      : ""
                  }`}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formData.gender && !errors.gender && (
                  <FaCheckCircle className="success-icon" />
                )}
              </div>
              {errors.gender && (
                <div className="error-message">{errors.gender}</div>
              )}
            </div>
          </div>

          {renderInput("phone", "text", "Phone Number")}
          {renderInput("address", "text", "Address")}

          <button className="modern-auth-btn" onClick={handleRegister}>
            <span>Sign Up</span>
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
