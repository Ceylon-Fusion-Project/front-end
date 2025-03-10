import React from "react";

interface SortButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 h-[45px] py-2 rounded-sm transition-all duration-200 font-medium text-sm sm:text-base
        ${isSelected ? "bg-black text-white" : "bg-gray-300 text-gray-700"}
        hover:bg-gray-400 focus:outline-none
        flex items-center justify-center w-auto md:w-auto min-w-[100px]`}
    >
      {label}
    </button>
  );
};

export default SortButton;
