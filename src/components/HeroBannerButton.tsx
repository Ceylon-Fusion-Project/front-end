import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  ariaLabel: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, ariaLabel }) => {
  return (
    <button
    className="bg-black text-white px-8 py-3 text-lg rounded-md font-semibold hover:bg-gray-800 transition duration-300"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {text}
  </button>
  
  
  );
};

export default Button;