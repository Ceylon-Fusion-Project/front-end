import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Ceylon Fusion
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation links - Desktop */}
          <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
            <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2">Home</Link>
            <Link to="/categories" className="text-gray-800 hover:text-gray-600 px-3 py-2">Categories</Link>
            <Link to="/booking" className="text-gray-800 hover:text-gray-600 px-3 py-2">Booking</Link>
            <Link to="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2">Contact</Link>
          </div>

          {/* Login and Signup - Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link to="/login" className="text-gray-800 hover:text-gray-600 px-3 py-2">Login</Link>
            <Link to="/signup" className="text-gray-800 hover:text-gray-600 px-6 py-2">SignUp</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-4 py-2">
          <Link to="/" className="block text-gray-800 hover:text-gray-600 px-3 py-2">Home</Link>
          <Link to="/categories" className="block text-gray-800 hover:text-gray-600 px-3 py-2">Categories</Link>
          <Link to="/booking" className="block text-gray-800 hover:text-gray-600 px-3 py-2">Booking</Link>
          <Link to="/about" className="block text-gray-800 hover:text-gray-600 px-3 py-2">About</Link>
          <Link to="/contact" className="block text-gray-800 hover:text-gray-600 px-3 py-2">Contact</Link>
          <Link to="/login" className="block text-gray-800 hover:text-gray-600 px-3 py-2">Login</Link>
          <Link to="/signup" className="block text-gray-800 hover:text-gray-600 px-3 py-2">SignUp</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
