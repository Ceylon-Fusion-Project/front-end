import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <p className="text-sm text-gray-400">
              We are committed to providing the best shopping experience with high-quality products.
            </p>
          </div>

          {/* Customer Service Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/help-support" className="text-sm text-gray-400 hover:text-gray-600">Help & Support</Link></li>
              <li><Link to="/returns-exchanges" className="text-sm text-gray-400 hover:text-gray-600">Returns & Exchanges</Link></li>
              <li><Link to="/track-order" className="text-sm text-gray-400 hover:text-gray-600">Track Order</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-400 mt-8">
          <p>Copyright &copy; {new Date().getFullYear()} Ceylon Fusion</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
