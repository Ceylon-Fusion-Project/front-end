// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import api from "../api/axiosInstance"; // Import axios instance
// import NotificationService from "@/utils/NotificationService";
// import userConfirmation from "@/utils/useConfirmation";
// import { ShoppingCart, Heart, LogOut, User } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const { requestConfirmation, ConfirmationDialog } = userConfirmation();

//   // Function to check authentication status
//   const checkAuthStatus = async () => {
//     try {
//       const response = await api.get("/auth/check");
//       setIsLoggedIn(response.data.authenticated);
//     } catch (error) {
//       setIsLoggedIn(false);
//     }
//   };

//   useEffect(() => {
//     checkAuthStatus(); // Check auth status on mount
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     requestConfirmation({
//       title: "Logout Confirmation",
//       message: "Are you sure you want to logout?",
//       onConfirm: async () => {
//         try {
//           await api.get("/auth/logout");
//           setIsLoggedIn(false);
//           NotificationService.success("You have been logged out.");
//           navigate("/");
//         } catch (error) {
//           console.error("Logout failed:", error);
//           NotificationService.error("Logout failed. Try again.");
//         }
//       },
//       onCancel: () => NotificationService.info("Logout canceled."),
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
//       const response = await api.get(
//         `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`
//       );
//       if (response.request?.responseURL) {
//         window.location.href = response.request.responseURL;
//       }
//     } catch (error) {
//       console.error("Login redirect failed:", error);
//       NotificationService.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="text-2xl font-bold text-gray-800">
//                 Ceylon Fusion
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-gray-800 hover:text-gray-600 focus:outline-none"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>

//             {/* Navigation links - Desktop */}
//             <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
//               <Link
//                 to="/"
//                 className="text-gray-800 hover:text-gray-600 px-3 py-2"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/products/product-marketplace"
//                 className="text-gray-800 hover:text-gray-600 px-3 py-2"
//               >
//                 Shop Now
//               </Link>
//               <Link
//                 to="/booking/booking-page"
//                 className="text-gray-800 hover:text-gray-600 px-3 py-2"
//               >
//                 Booking
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-gray-800 hover:text-gray-600 px-3 py-2"
//               >
//                 About
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-gray-800 hover:text-gray-600 px-3 py-2"
//               >
//                 Contact
//               </Link>
//             </div>

//             {/* Authentication Links - Desktop */}
//             <div className="hidden md:flex space-x-6">
//               {!isLoggedIn ? (
//                 <>
//                   {/* <a
//                     href="https://localhost:3001/api/v1/auth/login"
//                     className="text-gray-800 hover:text-gray-600 px-3 py-2"
//                   >
//                     Login
//                   </a> */}
//                   <a
//                     href={`https://localhost:3001/api/v1/auth/login?redirectTo=${encodeURIComponent(window.location.pathname)}`}
//                     className="text-gray-800 hover:text-gray-600 px-3 py-2"
//                     onClick={handleLogin}
//                   >
//                     Login
//                   </a>
//                   <a
//                     href="https://localhost:3001/api/v1/auth/signup"
//                     className="text-gray-800 hover:text-gray-600 px-6 py-2"
//                   >
//                     Sign Up
//                   </a>
//                 </>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link to="/orders/shopping-cart" title="Cart">
//                     <ShoppingCart className="w-5 h-5 text-gray-800 hover:text-blue-600 cursor-pointer" />
//                   </Link>
//                   <Link to="/orders/wishList" title="Wishlist">
//                     <Heart className="w-5 h-5 text-gray-800 hover:text-pink-500 cursor-pointer" />
//                   </Link>
//                   <Link to="/profile" title="Profile">
//                     <User className="w-5 h-5 text-gray-800 hover:text-green-600 cursor-pointer" />
//                   </Link>
//                   <button onClick={handleLogout} title="Logout">
//                     <LogOut className="w-5 h-5 text-gray-800 hover:text-red-600 cursor-pointer" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-4 py-2">
//             <Link
//               to="/"
//               className="block text-gray-800 hover:text-gray-600 px-3 py-2"
//             >
//               Home
//             </Link>
//             <Link
//               to="/products/product-marketplace"
//               className="text-gray-800 hover:text-gray-600 px-3 py-2"
//             >
//               Shop Now
//             </Link>
//             <Link
//               to="/booking/booking-page"
//               className="block text-gray-800 hover:text-gray-600 px-3 py-2"
//             >
//               Booking
//             </Link>
//             <Link
//               to="/about"
//               className="block text-gray-800 hover:text-gray-600 px-3 py-2"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               className="block text-gray-800 hover:text-gray-600 px-3 py-2"
//             >
//               Contact
//             </Link>

//             {!isLoggedIn ? (
//               <>
//                 {/* <a
//                 href="https://localhost:3001/api/v1/auth/login"
//                 className="block text-gray-800 hover:text-gray-600 px-3 py-2"
//               >
//                 Login
//               </a> */}
//                 <a
//                   href={`https://localhost:3001/api/v1/auth/login?redirectTo=${encodeURIComponent(window.location.pathname)}`}
//                   className="text-gray-800 hover:text-gray-600 px-3 py-2"
//                   onClick={handleLogin}
//                 >
//                   Login
//                 </a>
//                 <a
//                   href="https://localhost:3001/api/v1/auth/signup"
//                   className="block text-gray-800 hover:text-gray-600 px-3 py-2"
//                 >
//                   Sign Up
//                 </a>
//               </>
//             ) : (
//               <div className="flex items-center space-x-6 px-3 py-2 mt-2">
//                 <Link to="/orders/shopping-cart" title="Cart">
//                   <ShoppingCart className="w-5 h-5 text-gray-800 hover:text-blue-600" />
//                 </Link>
//                 <Link to="/orders/wishList" title="Wishlist">
//                   <Heart className="w-5 h-5 text-gray-800 hover:text-pink-500" />
//                 </Link>
//                 <Link to="/profile" title="Profile">
//                   <User className="w-5 h-5 text-gray-800 hover:text-green-600" />
//                 </Link>
//                 <button onClick={handleLogout} title="Logout">
//                   <LogOut className="w-5 h-5 text-gray-800 hover:text-red-600" />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog />
//     </>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X} from "lucide-react";
import api from "../api/axiosInstance"; // Import axios instance
import NotificationService from "@/utils/NotificationService";
import userConfirmation from "@/utils/useConfirmation";
import { ShoppingCart, Heart, LogOut, User } from "lucide-react";
import type { CustomAxiosRequestConfig } from "@/api/customAxios";
import logo from "../assets/images/Ceylon fusion.png"; // ✅ Add your logo file here

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { requestConfirmation, ConfirmationDialog } = userConfirmation();

  // Function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const config: CustomAxiosRequestConfig = {
        suppressGlobalError: true,
      };// Suppress global error
      const response = await api.get("/auth/check", config);
      setIsLoggedIn(response.data.authenticated);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Check auth status on mount
  }, []);

  // Logout function
  const handleLogout = () => {
    requestConfirmation({
      title: "Logout Confirmation",
      message: "Are you sure you want to logout?",
      onConfirm: async () => {
        try {
          const config: CustomAxiosRequestConfig = {
            suppressGlobalError: true,
          };
          await api.get("/auth/logout", config); // Suppress global error
          setIsLoggedIn(false);
          NotificationService.success("You have been logged out.");
          navigate("/");
          window.location.reload();
        } catch (error) {
          window.location.reload();
          console.error("Logout failed:", error);
          //NotificationService.error("Logout failed. Try again.");
        }
      },
      onCancel: () => NotificationService.info("Logout canceled."),
    });
  };

  const handleLogin = async () => {
    try {
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const response = await api.get(
        `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`
      );
      if (response.request?.responseURL) {
        window.location.href = response.request.responseURL;
      }
    } catch (error) {
      console.error("Login redirect failed:", error);
      NotificationService.error("Something went wrong. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const response = await api.get(
        `/auth/signup?redirectTo=${encodeURIComponent(currentPath)}`
      );
      if (response.request?.responseURL) {
        window.location.href = response.request.responseURL;
      }
    } catch (error) {
      console.error("Signup redirect failed:", error);
      NotificationService.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="Ceylon Fusion Logo"
                  className="h-10 w-auto rounded-full"
                />
                <span className="text-2xl font-bold text-gray-800">
                  Ceylon Fusion
                </span>
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
              <Link
                to="/"
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Home
              </Link>
              <Link
                to="/products/product-marketplace"
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Shop Now
              </Link>
              <Link
                to="/booking/booking-page"
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Booking
              </Link>
              <Link
                to="/about"
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                Contact
              </Link>
            </div>

            {/* Authentication Links - Desktop */}
            <div className="hidden md:flex space-x-6">
              {!isLoggedIn ? (
                <>
                  <a
                    href={`https://localhost:3001/api/v1/auth/login?redirectTo=${encodeURIComponent(
                      window.location.pathname
                    )}`}
                    className="text-gray-800 hover:text-gray-600 px-3 py-2"
                    onClick={handleLogin}
                  >
                    Login
                  </a>
                  <a
                    href="https://localhost:3001/api/v1/auth/signup"
                    className="text-gray-800 hover:text-gray-600 px-6 py-2"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </a>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/orders/shopping-cart" title="Cart">
                    <ShoppingCart className="w-5 h-5 text-gray-800 hover:text-blue-600 cursor-pointer" />
                  </Link>
                  <Link to="/orders/wishList" title="Wishlist">
                    <Heart className="w-5 h-5 text-gray-800 hover:text-pink-500 cursor-pointer" />
                  </Link>
                  <Link to="/profile" title="Profile">
                    <User className="w-5 h-5 text-gray-800 hover:text-green-600 cursor-pointer" />
                  </Link>
                  <button onClick={handleLogout} title="Logout">
                    <LogOut className="w-5 h-5 text-gray-800 hover:text-red-600 cursor-pointer" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full px-4 py-2">
            <Link
              to="/"
              className="block text-gray-800 hover:text-gray-600 px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="/products/product-marketplace"
              className="text-gray-800 hover:text-gray-600 px-3 py-2"
            >
              Shop Now
            </Link>
            <Link
              to="/booking/booking-page"
              className="block text-gray-800 hover:text-gray-600 px-3 py-2"
            >
              Booking
            </Link>
            <Link
              to="/about"
              className="block text-gray-800 hover:text-gray-600 px-3 py-2"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-800 hover:text-gray-600 px-3 py-2"
            >
              Contact
            </Link>

            {!isLoggedIn ? (
              <>
                <a
                  href={`https://localhost:3001/api/v1/auth/login?redirectTo=${encodeURIComponent(
                    window.location.pathname
                  )}`}
                  className="text-gray-800 hover:text-gray-600 px-3 py-2"
                  onClick={handleLogin}
                >
                  Login
                </a>
                <a
                  href={`https://localhost:3001/api/v1/auth/signup?redirectTo=${encodeURIComponent(window.location.pathname)}`}
                  className="block text-gray-800 hover:text-gray-600 px-3 py-2"
                  onClick={handleSignup}
                >
                  Sign Up
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-6 px-3 py-2 mt-2">
                <Link to="/orders/shopping-cart" title="Cart">
                  <ShoppingCart className="w-5 h-5 text-gray-800 hover:text-blue-600" />
                </Link>
                <Link to="/orders/wishList" title="Wishlist">
                  <Heart className="w-5 h-5 text-gray-800 hover:text-pink-500" />
                </Link>
                <Link to="/profile" title="Profile">
                  <User className="w-5 h-5 text-gray-800 hover:text-green-600" />
                </Link>
                <button onClick={handleLogout} title="Logout">
                  <LogOut className="w-5 h-5 text-gray-800 hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Confirmation Dialog */}
      <ConfirmationDialog />
    </>
  );
};

export default Navbar;


