// frontend/src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-gray-300">
      <div className="footer-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Logo & Mission */}
        <div className="footer-section about">
          <h4>Recipedia</h4>
          <p>
            Your go-to platform for sharing and discovering delicious recipes from around the world.
            Join our food-loving community!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section mb-4 links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
            <li><a href="/about" className="hover:text-white transition-colors duration-300">About</a></li>
            <li><a href="/add-recipe" className="hover:text-white transition-colors duration-300">Add Recipe</a></li>
            <li><a href="/profile" className="hover:text-white transition-colors duration-300">Profile</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section mb-4 links">
          <h4>Categories</h4>
          <ul>
            <li><a href="/veg" className="hover:text-white transition-colors duration-300">Veg</a></li>
            <li><a href="/nonveg" className="hover:text-white transition-colors duration-300">Non-Veg</a></li>
            <li><a href="/dessert" className="hover:text-white transition-colors duration-300">Dessert</a></li>
            <li><a href="/beverages" className="hover:text-white transition-colors duration-300">Beverages</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section mb-4 links">
          <h4>Contact Us</h4>
          <p>
            Email:{" "}
            <a href="mailto:support@recipedia.com" className="hover:text-white transition-colors duration-300">
              support@recipedia.com
            </a>
          </p>
          <p>Phone: +91-123-456-7890</p>
        </div>

        {/* Social Icons */}
        <div className="footer-section mb-6 links">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="social-icons flex space-x-6 text-2xl text-gray-600 hover:text-gray-800">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-sky-400 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom mt-8 border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <span> | </span>
          <a href="/terms-of-use">Terms of Use</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Recipedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
