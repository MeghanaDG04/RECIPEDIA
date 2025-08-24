import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-gray-300">
      <div className="footer-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Mission */}
        <div className="footer-section about">
          <h4 className="text-xl font-semibold text-amber-400 mb-3">Recipedia</h4>
          <p className="text-sm leading-relaxed text-gray-400">
            Your go-to platform for sharing and discovering delicious recipes from around the world.
            Join our food-loving community!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4 className="text-lg font-semibold text-amber-400 mb-3">Quick Links</h4>
          <ul>
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/add-recipe" className="footer-link">Add Recipe</a></li>
            <li><a href="/profile" className="footer-link">Profile</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section links">
          <h4 className="text-lg font-semibold text-amber-400 mb-3">Categories</h4>
          <ul>
            <li><a href="/veg" className="footer-link">Veg</a></li>
            <li><a href="/nonveg" className="footer-link">Non-Veg</a></li>
            <li><a href="/dessert" className="footer-link">Dessert</a></li>
            <li><a href="/beverages" className="footer-link">Beverages</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="text-lg font-semibold text-amber-400 mb-3">Contact Us</h4>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <a href="mailto:support@recipedia.com" className="footer-link">
              support@recipedia.com
            </a>
          </p>
          <p className="text-sm text-gray-400">Phone: +91-123-456-7890</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="social-icons flex justify-center gap-5 mt-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
          <FaLinkedinIn />
        </a>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom mt-6 border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        <div className="footer-legal space-x-3 mb-2">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="/terms-of-use" className="hover:underline">Terms of Use</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Recipedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
