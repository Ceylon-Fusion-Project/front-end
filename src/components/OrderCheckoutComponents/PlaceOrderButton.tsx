import React from "react";

interface CheckoutButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  onClick,
  disabled = false,
  label = "Place Order",
}) => {
  return (
    <button
      className={`mt-6 w-1/2 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
      } transition`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CheckoutButton;