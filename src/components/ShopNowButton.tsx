import React from "react";

interface ShopNowButtonProps {
  scrollToId?: string;
  text?: string;
}

const ShopNowButton: React.FC<ShopNowButtonProps> = ({
  scrollToId,
  text = "Shop Now",
}) => {
  const handleClick = () => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition duration-300"
    >
      {text}
    </button>
  );
};

export default ShopNowButton;
