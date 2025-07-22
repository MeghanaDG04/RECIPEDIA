import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FaCheckCircle } from "react-icons/fa";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "age":
        setAge(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleRegister = async () => {
    const fields = { username, email, password, age, gender, phone, address };
    const newErrors = {};
    Object.entries(fields).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.post("http://localhost:5000/register", fields);
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  const renderInput = (field, type, placeholder, value) => (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required
        onChange={(e) => handleChange(field, e.target.value.trim())}
        style={{
          borderColor: errors[field]
            ? "#e63946"
            : value && !errors[field]
            ? "green"
            : "#ccc",
        }}
      />
      {value && !errors[field] && <FaCheckCircle color="green" />}
      {errors[field] && <small className="error-text">{errors[field]}</small>}
    </div>
  );

  return (
    <div className="container">
      <h2>Register</h2>
      {renderInput("username", "text", "Username", username)}
      {renderInput("email", "email", "Email", email)}
      {renderInput("password", "password", "Password", password)}
      {renderInput("age", "number", "Age", age)}

      <div className="input-wrapper">
        <select
          value={gender}
          required
          onChange={(e) => handleChange("gender", e.target.value)}
          style={{
            borderColor: errors.gender
              ? "#e63946"
              : gender && !errors.gender
              ? "green"
              : "#ccc",
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "1rem",
            appearance: "none",
            background: "white",
            borderStyle: "solid",
            borderWidth: "1px",
            height: "40px", // Match input field height
          }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {gender && !errors.gender && <FaCheckCircle color="green" />}
        {errors.gender && <small className="error-text">{errors.gender}</small>}
      </div>

      {renderInput("phone", "text", "Phone Number", phone)}
      {renderInput("address", "text", "Address", address)}

      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
