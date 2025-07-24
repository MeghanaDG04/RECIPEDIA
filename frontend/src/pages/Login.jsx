import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = (field, value) => {
    let error = "";
    if (field === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
    }

    if (field === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
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
    <div className="modern-auth-container">
      <div className="modern-auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="modern-input-wrapper">
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => handleChange("email", e.target.value.trim())}
                className={`modern-input ${
                  errors.email
                    ? "error"
                    : email && !errors.email
                    ? "success"
                    : ""
                }`}
              />
              {email && !errors.email && (
                <FaCheckCircle className="success-icon" />
              )}
            </div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="modern-input-wrapper">
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  handleChange("password", e.target.value.trim())
                }
                className={`modern-input ${
                  errors.password
                    ? "error"
                    : password && !errors.password
                    ? "success"
                    : ""
                }`}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {password && !errors.password && (
                <FaCheckCircle className="success-icon" />
              )}
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          {errors.general && (
            <div className="general-error">{errors.general}</div>
          )}

          <button className="modern-auth-btn" onClick={handleLogin}>
            <span>Sign In</span>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            New to our platform?{" "}
            <Link to="/register" className="auth-link">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
