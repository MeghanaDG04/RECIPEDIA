import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

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
            <li><Link to="/about" className="hover:text-white transition-colors duration-300">About</Link></li>
            <li><Link to="/add-recipe" className="hover:text-white transition-colors duration-300">Add Recipe</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors duration-300">Profile</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-white transition-colors duration-300">Terms</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section links">
          <h4 className="text-lg font-semibold text-amber-400 mb-3">Categories</h4>
          <ul>
            <li><Link to="/veg" className="transition-colors duration-300">Veg</Link></li>
            <li><Link to="/nonveg" className="transition-colors duration-300">Non-Veg</Link></li>
            <li><Link to="/dessert" className="transition-colors duration-300">Dessert</Link></li>
            <li><Link to="/beverages" className="transition-colors duration-300">Beverages</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="text-lg font-semibold text-amber-400 mb-3">Contact</h4>
          {/* Contact Page Link */}
          <p className="mb-2">
            <Link to="/contactus" className="hover:text-white transition-colors duration-300">
              Contact Us
            </Link>
          </p>

          <p className="text-sm text-gray-400">
            Email:{" "}
            <a href="mailto:support@recipedia.com" className="hover:text-red-500 transition-colors duration-300">
              support@recipedia.com
            </a>
          </p>
          <p className="text-sm text-gray-400">Phone: +91-123-456-7890</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer-section mb-6 links">
        <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
        <div className="social-icons flex space-x-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaXTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors duration-300"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom mt-6 border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        <div className="footer-legal space-x-3 mb-2">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-of-use" className="hover:underline">Terms of Use</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Recipedia. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
