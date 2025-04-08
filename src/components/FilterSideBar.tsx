import React, { useState } from "react";
import { theme } from "@/styles/theme";
import { X } from "lucide-react";
import { categoryTypes } from "@/lib/data"; 

interface FilterSideBarProps {
  onClose: () => void;
  setFilters: (filters: any) => void;
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({
  onClose,
  setFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  //const [isOnSale, setIsOnSale] = useState(false);
  const [bestSelling, setBestSelling] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);

  const applyFilters = () => {
    setFilters({
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      //isOnSale,
      bestSelling,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      averageRating: averageRating ? Number(averageRating) : undefined,
      activeStatus,
    });
    onClose(); // Close sidebar after applying filters
  };

  return (
    <div
      className="p-4 rounded-lg shadow-sm w-80"
      style={{
        backgroundColor: theme.colors.background,
        border: `2px solid ${theme.colors.border}`,
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          color: theme.colors.textPrimary, // Use your theme color
        }}
        className="hover:opacity-75 transition"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Category Filter */}
      <h3
        className="font-medium mb-2"
        style={{
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.body,
        }}
      >
        Categories
      </h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 mt-1 rounded-md border transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.textPrimary,
          border: `1px solid ${theme.colors.border}`,
          //fontFamily: theme.fonts.body,
        }}
      >
        {/* <option value="all">All Categories</option>
        <option value="food">Food & Beverage</option>
        <option value="health">Health & Wellness</option>
        <option value="personal">Personal Care</option> */}
        <option value="all">All Categories</option>
        {categoryTypes.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h3
        className="mt-4 font-medium mb-2"
        style={{ color: theme.colors.textPrimary }}
      >
        Price Range
      </h3>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full p-2 mt-1 rounded-md border transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.textPrimary,
            border: `1px solid ${theme.colors.border}`,
            fontFamily: theme.fonts.body,
          }}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full p-2 mt-1 rounded-md border transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
          style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.textPrimary,
            border: `1px solid ${theme.colors.border}`,
            fontFamily: theme.fonts.body,
          }}
        />
      </div>

      {/* Average Rating */}
      <h3
        className="mt-4 font-medium mb-2"
        style={{
          color: theme.colors.textPrimary,
          //fontFamily: theme.fonts.body,
        }}
      >
        Minimum Rating
      </h3>
      <input
        type="number"
        min="0"
        max="5"
        step="0.1"
        placeholder="Min Rating"
        value={averageRating}
        onChange={(e) => setAverageRating(e.target.value)}
        className="w-full p-2 mt-1 rounded-md border transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.textPrimary,
          border: `1px solid ${theme.colors.border}`,
          fontFamily: theme.fonts.body,
        }}
      />
      
      {/* Active Status Checkbox */}
      <label className="flex items-center mt-3 space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={activeStatus}
          onChange={() => setActiveStatus(!activeStatus)}
          className="w-4 h-4"
          style={{
            accentColor: theme.colors.accent, // Checkbox color from theme
          }}
        />
        <span
          style={{ color: theme.colors.textPrimary}}
        >
          Active Products
        </span>
      </label>

      {/* Best Selling Checkbox */}
      <label className="flex items-center mt-3 space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={bestSelling}
          onChange={() => setBestSelling(!bestSelling)}
          className="w-4 h-4"
          style={{
            accentColor: theme.colors.accent, // Checkbox color from theme
          }}
        />
        <span
          style={{ color: theme.colors.textPrimary}}
        >
          Best Selling
        </span>
      </label>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full px-4 py-2 mt-4 rounded-md transition-colors duration-200"
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.textButton,
          fontFamily: theme.fonts.body,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.secondary)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primary)}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSideBar;
