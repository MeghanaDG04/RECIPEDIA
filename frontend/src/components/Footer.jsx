import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo & Mission */}
        <div className="footer-section about">
          <h3>Recipedia</h3>
          <p>Your go-to platform for sharing and discovering delicious recipes from around the world. Join our food-loving community!</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/add-recipe">Add Recipe</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section links">
          <h4>Categories</h4>
          <ul>
            <li><a href="/category/vegan">Vegan</a></li>
            <li><a href="/category/desserts">Desserts</a></li>
            <li><a href="/category/quick-meals">Quick Meals</a></li>
            <li><a href="/category/healthy-snacks">Healthy Snacks</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@recipedia.com">support@recipedia.com</a></p>
          <p>Phone: +91-123-456-7890</p>
        </div>

        {/* Social Icons */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <span> | </span>
          <a href="/terms-of-use">Terms of Use</a>
        </div>
        <p>&copy; 2025 Recipedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
