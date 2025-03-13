import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Brand & Info */}
          <div>
            <h2 className="text-2xl font-bold">Your IELTS Book</h2>
            <p className="text-gray-400 mt-2">
              Prepare for your IELTS exam with our expert resources and practice tests.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/library" className="text-gray-400 hover:text-white transition">
                  Resources
                </a>
              </li>
              <li>
                <a href="/take_test" className="text-gray-400 hover:text-white transition">
                  Take a Test
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-500 transition text-2xl">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition text-2xl">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-600 transition text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Your IELTS Book. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
