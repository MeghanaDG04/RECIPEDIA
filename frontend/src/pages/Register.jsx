import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { signInWithGoogle } from "../auth";
const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };
  //sign in with google
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User Info:", user);
      alert(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };
  const validateForm = () => {
    const { username, email, password, age, gender, address, phone } = formData;

    if (
      !username ||
      !email ||
      !password ||
      !age ||
      !gender ||
      !address ||
      !phone
    ) {
      return "Please fill in all fields";
    }
    if (password.length < 6) return "Password must be at least 6 characters";
    if (isNaN(age) || age < 1 || age > 120) return "Please enter a valid age";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10)
      return "Please enter a valid phone number";

    if (!agreeTerms) return "Please agree to the Terms of Use & Privacy Policy";

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/register`,
        {
          username: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          age: parseInt(formData.age),
          gender: formData.gender,
          address: formData.address.trim(),
          phone: formData.phone.trim(),
        }
      );

      const { token, user } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Registration failed");
      } else if (err.request) {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="heading">Register for RECIPEDIA</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength="6"
        />
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
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          required
        />
        {/* /google sign in */}
        {/* <button
          type="button" // <-- important
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Sign In with Google
        </button> */}
        

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        
<div className="flex flex-col items-center space-y-4">
  {/* Default Sign In button */}
 
  {/* "Other ways" separator */}
  <div className="flex items-center w-full my-2">
    <div className="flex-grow h-px bg-gray-300 mt-2"></div>
    <span className="px-4 text-gray-500 text-sm mt-2">Other ways to sign in</span>
    <div className="flex-grow h-px bg-gray-300 mt-2"></div>
  </div>

  {/* Google Sign In */}
  <button
  onclick="signInWithGoogle()"
  class="p-3 border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    class="w-6 h-6 ml-32"
  />
</button>

</div>

      </form>

      <p className="swap_state">
        Already have an account?{" "}
        <span className="link">
          <Link to="/login">Login</Link>
        </span>
      </p>

      <div className="termsandconditions">
        <input
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <label htmlFor="terms">
          <h6>By continuing, I agree to the Terms of Use & Privacy Policy</h6>
        </label>
      </div>
    </div>
  );
};

export default Register;
