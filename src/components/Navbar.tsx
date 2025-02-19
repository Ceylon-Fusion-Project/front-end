import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Ceylon Fusion
            </Link>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
            <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2">
              Home
            </Link>
            <Link to="/categories" className="text-gray-800 hover:text-gray-600 px-3 py-2">
              Categories
            </Link>
            <Link to="/booking" className="text-gray-800 hover:text-gray-600 px-3 py-2">
              Booking
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2">
              Contact
            </Link>
          </div>

          {/* Login and Signup on the right side */}
          <div className="flex space-x-6">
            <Link to="/login" className="text-gray-800 hover:text-gray-600 px-3 py-2">
              Login
            </Link>
            <Link to="/signup" className="text-gray-800 hover:text-gray-600 px-6 py-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;