import React from 'react';

interface CategoryBarProps {
  selectedCategory: "all" | "packages" | "accommodations" | "experiences";
  onCategoryChange: (category: "all" | "packages" | "accommodations" | "experiences") => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories: Array<"all" | "packages" | "accommodations" | "experiences"> = ["all", "packages", "accommodations", "experiences"];
  const displayNames = {
    "all": "ALL",
    "packages": "Packages",
    "accommodations": "Accommodations",
    "experiences": "Experiences"
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${
            selectedCategory === category
              ? 'bg-[#11221d] text-white'
              : 'bg-[#cde0e0] text-gray-700 hover:bg-[#81b3b3]'
          }`}
        >
          {displayNames[category]}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;