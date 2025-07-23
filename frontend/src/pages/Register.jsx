import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";  // Import CSS
import Login from "./Login";

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
    await axios.post("http://localhost:5000/register", { username, email, password });
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
      <input type="text" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;