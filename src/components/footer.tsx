import React from 'react';
//import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#8d6837] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Flex container for better alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left items-center">

          {/* About Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-3xl mb-4">About Us</h4>
            <p className="text-base text-white text-center md:text-left max-w-[300px]">
              We are committed to providing the best shopping experience with high-quality products.
            </p>
          </div>

          {/* Customer Service Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-3xl  mb-4">Customer Service</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li><span className="text-base text-white">Provide Quality Products</span></li>
              <li><span className="text-base text-white">Good Accommodations</span></li>
              <li><span className="text-base text-white">Secure Online Payments</span></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-3xl mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a href="#" target="_blank" rel="_blank" className="text-white hover:text-gray-300" aria-label="Facebook">
                <FaFacebookF size={24} />
              </a>
              <a href="#" target="_blank" rel="_blank" className="text-white hover:text-gray-300" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="#" target="_blank" rel="_blank" className="text-white hover:text-gray-300" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" target="_blank" rel="_blank" className="text-white hover:text-gray-300" aria-label="YouTube">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-white mt-12">
          <p>Copyright &copy; {new Date().getFullYear()} Ceylon Fusion</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
