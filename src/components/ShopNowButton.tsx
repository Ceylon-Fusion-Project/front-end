import React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/styles/theme";

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
      navigate(navigateTo);
    } else if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-accent hover:bg-primary hover:scale-105 hover:shadow-lg hover:text-black"
                style={{
            backgroundColor: "#a68f83",
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.sans[0],
                    }}
    >
      {text}
    </button>
  );
};

export default ShopNowButton;
