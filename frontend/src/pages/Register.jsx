import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Phone, MapPin, Calendar, ArrowRight, Eye, EyeOff, ChefHat, User } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "", email: "", password: "", age: "", gender: "", phone: "", address: "", agree: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.agree) return setError("You must agree to the terms.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters.");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Registration failed");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const Input = ({ icon: Icon, ...props }) => (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
      <input
        {...props}
        autoComplete="on"
        className="w-full border-2 rounded-lg px-10 py-2 text-sm outline-none focus:border-red-400 transition"
      />
    </motion.div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
      <form className="bg-white rounded-lg shadow-md w-full max-w-sm space-y-4 p-6 border-t-4 border-red-400" onSubmit={handleSubmit}>
        <motion.div className="flex items-center justify-center mb-4" initial={{ y: -10 }} animate={{ y: 0 }} whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}>
          <div className="bg-red-400 rounded-lg flex items-center justify-center w-12 h-12">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        <h2 className="text-xl font-bold text-center text-red-500">Recipedia</h2>
        <p className="text-xs text-center text-gray-500">Join Recipedia! Create your account and start your culinary adventure</p>
        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <Input placeholder="Username" name="username" value={formData.username} onChange={handleChange} icon={User} required />
        <Input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} icon={Mail} required />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password (min 8 chars)"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
            autoComplete="new-password"
            className="w-full border-2 rounded-lg px-10 py-2 text-sm outline-none focus:border-red-400 transition"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </span>
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Age" type="number" name="age" value={formData.age} onChange={handleChange} icon={Calendar} min="1" max="120" required />
          <motion.select initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} name="gender" value={formData.gender} onChange={handleChange} required className="w-full border-2 rounded-lg px-3 py-2 text-sm text-gray-400 outline-none focus:border-red-400 transition">
            <option value="" disabled hidden>Select Gender</option>
            <option value="male" className="text-black">Male</option>
            <option value="female" className="text-black">Female</option>
            <option value="other" className="text-black">Other</option>
            <option value="prefer-not-to-say" className="text-black">Prefer not to say</option>
          </motion.select>
        </div>

        <Input placeholder="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} />
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <textarea placeholder="Address" name="address" value={formData.address} onChange={handleChange} className="w-full border-2 rounded-lg px-10 py-2 text-sm outline-none resize-none focus:border-red-400 transition" />
        </div>

        <motion.div className="flex items-center text-xs" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="mr-2 w-3 h-3" />
          I agree to the <span className="text-red-500 underline cursor-pointer">Terms of Use & Privacy Policy</span>
        </motion.div>

        <motion.button type="submit" className="w-full bg-red-400 text-white py-1.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          Create Account <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-center text-xs text-gray-600">
          Already have an account? <span className="text-red-500 underline cursor-pointer" onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>

    </div>
  );
};

export default Register;
