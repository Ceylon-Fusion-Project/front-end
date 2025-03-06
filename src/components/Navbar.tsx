import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import api from "../api/axiosInstance"; // Import axios instance

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/auth/check");
      setIsLoggedIn(response.data.authenticated);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Check auth status on mount
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

          {/* Authentication Links - Desktop */}
          <div className="hidden md:flex space-x-6">
            {!isLoggedIn ? (
              <>
                <a
                  href="http://localhost:3001/api/v1/auth/login"
                  className="text-gray-800 hover:text-gray-600 px-3 py-2"
                >
                  Login
                </a>
                <a
                  href="http://localhost:3001/api/v1/auth/signup"
                  className="text-gray-800 hover:text-gray-600 px-6 py-2"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-4 py-2">
          <Link to="/" className="block text-gray-800 hover:text-gray-600 px-3 py-2">
            Home
          </Link>
          <Link to="/categories" className="block text-gray-800 hover:text-gray-600 px-3 py-2">
            Categories
          </Link>
          <Link to="/booking" className="block text-gray-800 hover:text-gray-600 px-3 py-2">
            Booking
          </Link>
          <Link to="/about" className="block text-gray-800 hover:text-gray-600 px-3 py-2">
            About
          </Link>
          <Link to="/contact" className="block text-gray-800 hover:text-gray-600 px-3 py-2">
            Contact
          </Link>

          {!isLoggedIn ? (
            <>
              <a
                href="http://localhost:3001/api/v1/auth/login"
                className="block text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Login
              </a>
              <a
                href="http://localhost:3001/api/v1/auth/signup"
                className="block text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Sign Up
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-gray-800 hover:text-gray-600 px-3 py-2 w-full text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
