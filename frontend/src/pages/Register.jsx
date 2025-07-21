import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Import CSS
import Login from "./Login";

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

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!age) newErrors.age = "Age is required";
    else if (age <= 0) newErrors.age = "Age must be greater than 0";

    if (!gender) newErrors.gender = "Gender is required";

    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!address) newErrors.address = "Address is required";

    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        age,
        gender,
        phone,
        address,
      });
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        required
        onChange={(e) => setUsername(e.target.value.trim())}
        style={{ borderColor: errors.username ? "#e63946" : "#ccc" }}
      />
      {errors.username && (
        <small className="error-text">{errors.username}</small>
      )}

      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value.trim())}
        style={{ borderColor: errors.email ? "#e63946" : "#ccc" }}
      />
      {errors.email && <small className="error-text">{errors.email}</small>}

      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value.trim())}
        style={{ borderColor: errors.password ? "#e63946" : "#ccc" }}
      />
      {errors.password && (
        <small className="error-text">{errors.password}</small>
      )}

      <input
        type="number"
        placeholder="Age"
        required
        onChange={(e) => setAge(e.target.value.trim())}
        style={{ borderColor: errors.age ? "#e63946" : "#ccc" }}
      />
      {errors.age && <small className="error-text">{errors.age}</small>}

      <input
        type="text"
        placeholder="Gender"
        required
        onChange={(e) => setGender(e.target.value.trim())}
        style={{ borderColor: errors.gender ? "#e63946" : "#ccc" }}
      />
      {errors.gender && <small className="error-text">{errors.gender}</small>}

      <input
        type="text"
        placeholder="Phone Number"
        required
        onChange={(e) => setPhone(e.target.value.trim())}
        style={{ borderColor: errors.phone ? "#e63946" : "#ccc" }}
      />
      {errors.phone && <small className="error-text">{errors.phone}</small>}

      <input
        type="text"
        placeholder="Address"
        required
        onChange={(e) => setAddress(e.target.value.trim())}
        style={{ borderColor: errors.address ? "#e63946" : "#ccc" }}
      />
      {errors.address && <small className="error-text">{errors.address}</small>}

      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
