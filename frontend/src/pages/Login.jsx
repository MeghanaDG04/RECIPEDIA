import React, {useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import '../App.css'

const Login = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const res = await axios.post("http://localhost:5000/login", { email, password });
          localStorage.setItem("username", res.data.username);
          setIsLoggedIn(true);
          navigate("/home");
        } catch (error) {
          alert("Invalid Credentials");
        }
    }

  return (
    <div>
     <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>New user? <Link to="/register">Register</Link></p>
    </div>
    </div>
  )
}

export default Login;