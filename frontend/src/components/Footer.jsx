import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-wrap justify-between">
        {/* Logo and Tagline */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-white text-2xl font-bold flex items-center">
            YOUR IELTS BOOK
          </h2>
          <p className="text-sm text-gray-400 mt-2">Your Path to IELTS Success</p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 lg:mb-0">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Practice Tests</a></li>
            <li><a href="#" className="hover:text-white">Study Resources</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mb-6 lg:mb-0">
          <h3 className="text-white font-semibold">Contact Us</h3>
          <p className="mt-2 text-sm">123 IELTS Street, Education City, <br/> Knowledge Park, TX 56789</p>
          <p className="mt-2 text-sm">📞 +123-456-789</p>
          <p className="mt-2 text-sm">✉ support@ieltsmaster.com</p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-white font-semibold">Stay Updated</h3>
          <input
            type="email"
            placeholder="Your email address"
            className="mt-2 px-4 py-2 w-full bg-gray-800 text-white rounded focus:outline-none"
          />
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </div>
      
      {/* Social Icons */}
      <div className="mt-10 flex justify-center space-x-4">
        <FaFacebookF className="hover:text-white cursor-pointer" />
        <FaTwitter className="hover:text-white cursor-pointer" />
        <FaLinkedinIn className="hover:text-white cursor-pointer" />
        <FaInstagram className="hover:text-white cursor-pointer" />
        <FaYoutube className="hover:text-white cursor-pointer" />
      </div>
      
      {/* Footer Bottom */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>&copy; 2025 IELTS Master. All rights reserved.</p>
        <p>Designed for IELTS Learners</p>
      </div>
    </footer>
  );
};

export default Footer;
