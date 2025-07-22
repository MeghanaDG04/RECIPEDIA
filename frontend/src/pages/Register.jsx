import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FaCheckCircle } from "react-icons/fa";

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
  const navigate = useNavigate();

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

  const renderInput = (field, type, placeholder) => (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        value={formData[field]}
        required
        onChange={(e) => handleChange(field, e.target.value.trim())}
        style={{
          borderColor: errors[field]
            ? "#e63946"
            : formData[field] && !errors[field]
            ? "green"
            : "#ccc",
        }}
      />
      {formData[field] && !errors[field] && (
        <FaCheckCircle color="green" className="tick-icon" />
      )}
      {errors[field] && <small className="error-text">{errors[field]}</small>}
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        {renderInput("username", "text", "Username")}
        {renderInput("email", "email", "Email")}
        {renderInput("password", "password", "Password")}
        {renderInput("age", "number", "Age")}

        <div className="input-wrapper">
          <select
            value={formData.gender}
            required
            onChange={(e) => handleChange("gender", e.target.value)}
            className="custom-select"
            style={{
              borderColor: errors.gender
                ? "#e63946"
                : formData.gender && !errors.gender
                ? "green"
                : "#ccc",
            }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formData.gender && !errors.gender && (
            <FaCheckCircle color="green" className="tick-icon" />
          )}
          {errors.gender && (
            <small className="error-text">{errors.gender}</small>
          )}
        </div>

        {renderInput("phone", "text", "Phone Number")}
        {renderInput("address", "text", "Address")}

        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button> 
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
