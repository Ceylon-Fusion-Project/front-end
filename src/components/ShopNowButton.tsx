import React from "react";
import { useNavigate } from "react-router-dom";

interface ShopNowButtonProps {
  scrollToId?: string;
  text?: string;
  navigateTo?: string;
}

const ShopNowButton: React.FC<ShopNowButtonProps> = ({
  scrollToId,
  text = "Shop Now",
  navigateTo = "/products/product-marketplace",
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo); // Navigate to product marketplace
    } else if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll down one viewport height if no target ID is provided
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 mt-4 font-semibold text-white transition duration-300 bg-green-500 rounded-full hover:bg-green-600"
    >
      {text}
    </button>
  );
};

export default ShopNowButton;
