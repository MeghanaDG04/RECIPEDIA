import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/register", {
        username, email, password, age, gender, address, phone
      });
      localStorage.setItem("username", username);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      alert("Registration failed. Please try again later.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Join Recipedia and start sharing your recipes today!</p>

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

        <button className="register-btn" onClick={handleRegister}>Register</button>

        <p className="login-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
