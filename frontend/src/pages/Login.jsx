import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FaCheckCircle } from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (field, value) => {
    let error = "";
    if (field === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
    }
    if (field === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6) error = "Password must be at least 6 characters";
    }
    return error;
  };

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    const error = validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleLogin = async () => {
    const newErrors = {
      email: validate("email", email),
      password: validate("password", password),
    };
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("username", res.data.username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      setErrors({ general: "Invalid credentials. Please try again." });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value.trim())}
            style={{
              borderColor: errors.email
                ? "#e63946"
                : email && !errors.email
                ? "green"
                : "#ccc",
            }}
          />
          {email && !errors.email && <FaCheckCircle className="tick-icon" />}
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value.trim())}
            style={{
              borderColor: errors.password
                ? "#e63946"
                : password && !errors.password
                ? "green"
                : "#ccc",
            }}
          />
          {password && !errors.password && (
            <FaCheckCircle className="tick-icon" />
          )}
          {errors.password && (
            <small className="error-text">{errors.password}</small>
          )}
        </div>

        {errors.general && (
          <small className="error-text">{errors.general}</small>
        )}

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>
        <p>
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
