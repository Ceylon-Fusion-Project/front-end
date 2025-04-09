import React from "react";
import { useNavigate } from "react-router-dom";

interface CheckoutButtonProps {
  disabled?: boolean;
  label?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  disabled = false,
  label = "Place Order",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate("/payment");
    }
  };

  return (
    <button
      className={`mt-6 w-1/2 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
      } transition`}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CheckoutButton;
