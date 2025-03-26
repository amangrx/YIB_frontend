import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-wrap justify-between">
        {/* Logo and Tagline */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-white text-2xl font-bold flex items-center">
            YOUR IELTS BOOK
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Your Path to IELTS Success
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 lg:mb-0">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Take test", path: "/take_test" },
              { name: "Library", path: "/library" },
              { name: "Practice", path: "/practice" },
              { name: "Contact Us", path: "/contact" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mb-6 lg:mb-0">
          <h3 className="text-white font-semibold">Contact Us</h3>
          <p className="mt-2 text-sm">
            Street-17 , Pokhara, <br /> Nepal, 33700
          </p>
          <p className="mt-2 text-sm">📞 +9815632456</p>
          <p className="mt-2 text-sm">✉ yourieltsbook@gmail.com</p>
        </div>

        {/* Check resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Check resources</h3>
          <Button name="Explore" />
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center space-x-4">
        <FaFacebookF className="hover:text-white cursor-pointer" />
        <FaTwitter className="hover:text-white cursor-pointer" />
        <FaLinkedinIn className="hover:text-white cursor-pointer" />
        <FaInstagram className="hover:text-white cursor-pointer" />
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>&copy; 2025 Your IELTS Book. All rights reserved.</p>
        <p>Designed for IELTS Learners</p>
      </div>
    </footer>
  );
};

export default Footer;
