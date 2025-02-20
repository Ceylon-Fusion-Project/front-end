import React, { useState } from "react";
import Close from "../assets/Close.svg";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

interface FilteringSidebarProps {
  onClose: () => void;
}

const FilterSideBar: React.FC<FilteringSidebarProps> = ({ onClose }) => {
  // State variables for filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isOnSale, setIsOnSale] = useState(false);
  const [bestSelling, setBestSelling] = useState(false);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedRating, setSelectedRating] = useState("4-5");

  // Reset all filters when clicking "Clear All Filters"
  const clearFilters = () => {
    setSelectedCategory("all");
    setIsOnSale(false);
    setBestSelling(false);
    setPriceRange(500);
    setSelectedRating("4-5");
  };

  return (
    <div className="p-4 space-y-4 bg-white border-2 border-gray-300 rounded-lg shadow-md w-80">
      {/* Close Button */}
      <button onClick={onClose} className="mb-4 text-sm text-gray-500">
        <img src={Close} alt="Close" className="inline-block w-5 h-5" />
      </button>

      {/* On Sale */}
      <div>
        <h3 className="font-bold text-black">Discounts</h3>
        <Checkbox label="On Sale" checked={isOnSale} onChange={setIsOnSale} />
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Best Selling */}
      <div>
        <h3 className="font-bold text-black">Best Selling</h3>
        <Checkbox label="Show Best Selling" checked={bestSelling} onChange={setBestSelling} />
      </div>

      <hr className="border-t-2 border-gray-300"/>
      
      {/* Categories */}
      <div>
        <h3 className="font-bold text-black">Categories</h3>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Categories" },
            { value: "food", label: "Food & Beverage" },
            { value: "health", label: "Health & Wellness" },
            { value: "personal", label: "Personal Care" },
            { value: "ayurvedic", label: "Ayurvedic" },
            { value: "home", label: "Home & Lifestyle" },
            { value: "industrial", label: "Industrial" },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="categories"
                value={option.value}
                checked={selectedCategory === option.value}
                onChange={() => setSelectedCategory(option.value)}
                className="w-4 h-4 text-blue-600 border-gray-300"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-gray-800">Price Range</h3>
        <input
          type="range"
          min={0}
          max={10000}
          step={1}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="mt-2 text-sm text-center text-gray-600">{priceRange}</div>
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Ratings */}
      <div>
        <h3 className="font-medium text-gray-800">Ratings</h3>
        <div className="space-y-2">
          {[
            { value: "0-1", label: "⭐ 0 - 1 Stars" },
            { value: "1-2", label: "⭐⭐ 1 - 2 Stars" },
            { value: "2-3", label: "⭐⭐⭐ 2 - 3 Stars" },
            { value: "3-4", label: "⭐⭐⭐⭐ 3 - 4 Stars" },
            { value: "4-5", label: "⭐⭐⭐⭐⭐ 4 - 5 Stars" },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="ratings"
                value={option.value}
                checked={selectedRating === option.value}
                onChange={() => setSelectedRating(option.value)}
                className="w-4 h-4 text-blue-600 border-gray-300"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-t-2 border-gray-300"/>

      {/* Clear Filters Button */}
      <button
        className="w-full px-4 py-2 text-black border-2 border-gray-300 rounded-full bg-white hover:bg-gradient-to-r hover:from-[#1CD8D2] hover:to-[#93EDC7] hover:text-blue-700 transition-all duration-300 focus-within:border-gray-500 hover:border-gray-500"
        onClick={clearFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSideBar;
