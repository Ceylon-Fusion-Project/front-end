import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Home, ArrowRight } from "lucide-react";

const SelectionPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#4c381e]">
            Welcome to Cinnamon Global
          </h1>
          <p className="text-[#75572e]">Please select where you would like to go</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setHoveredCard("admin")}
            onHoverEnd={() => setHoveredCard(null)}
            className={`cursor-pointer transition-all duration-300 ${
              hoveredCard === "admin" ? "border-2 border-orange-400 shadow-lg" : "border border-gray-200"
            } rounded-lg bg-white`}
            onClick={() => handleNavigate("/admin")}
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-3 bg-orange-100 rounded-full">
                <ShieldCheck className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-[#4c381e] mb-1">Admin Dashboard</h2>
              <p className="text-sm text-[#75572e] mb-4">
                Access administrative controls and management tools
              </p>
              <ul className="text-sm space-y-1 text-[#4c381e]">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                  Manage products and inventory
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                  View sales analytics and reports
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                  Handle user accounts and permissions
                </li>
              </ul>
              <button
                className="mt-6 w-full py-2 px-4 bg-[#c29a64] text-white rounded hover:bg-[#cdad81] transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("/admin");
                }}
              >
                Go to Admin
              </button>
            </div>
          </motion.div>

          {/* Normal View Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setHoveredCard("landing")}
            onHoverEnd={() => setHoveredCard(null)}
            className={`cursor-pointer transition-all duration-300 ${
              hoveredCard === "landing" ? "border-2 border-orange-400 shadow-lg" : "border border-gray-200"
            } rounded-lg bg-white`}
            onClick={() => handleNavigate("/landing")}
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-3 bg-orange-100 rounded-full">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-[#4c381e] mb-1">Normal View</h2>
              <p className="text-sm text-[#75572e] mb-4">
                Browse products and use the platform as a regular user
              </p>
              <ul className="text-sm space-y-1 text-[#4c381e]">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                  Browse our premium cinnamon products
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                  Check special offers and discounts
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                  Manage your personal account
                </li>
              </ul>
              <button
                className="mt-6 w-full py-2 px-4 border border-[#c29a64] text-[#4c381e] rounded hover:bg-orange-50 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("/");
                }}
              >
                Go to Normal View
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center text-sm text-[#75572e]">
          Global Cinnamon Products Platform • Admin Selection
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
