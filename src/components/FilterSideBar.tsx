// import React, { useState } from "react";
// import Close from "../assets/Close.svg";
// import { theme } from "@/styles/theme";

// interface CheckboxProps {
//   label: string;
//   checked?: boolean;
//   onChange?: (checked: boolean) => void;
// }

// const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
//   return (
//     <label className="flex items-center space-x-2 cursor-pointer">
//       <input
//         type="checkbox"
//         className="w-4 h-4 text-blue-600 border-gray-300 rounded"
//         checked={checked}
//         onChange={(e) => onChange && onChange(e.target.checked)}
//       />
//       <span className="text-gray-700">{label}</span>
//     </label>
//   );
// };

// interface FilteringSidebarProps {
//   onClose: () => void;
// }

// const FilterSideBar: React.FC<FilteringSidebarProps> = ({ onClose }) => {
//   // State variables for filters
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [isOnSale, setIsOnSale] = useState(false);
//   const [bestSelling, setBestSelling] = useState(false);
//   const [priceRange, setPriceRange] = useState(500);
//   const [selectedRating, setSelectedRating] = useState("4-5");

//   // Reset all filters when clicking "Clear All Filters"
//   const clearFilters = () => {
//     setSelectedCategory("all");
//     setIsOnSale(false);
//     setBestSelling(false);
//     setPriceRange(500);
//     setSelectedRating("4-5");
//   };

//   return (
//     <div className="p-4 space-y-4 bg-white border-2 border-gray-300 rounded-lg shadow-md w-80">
//       {/* Close Button */}
//       <button onClick={onClose} className="mb-4 text-sm text-gray-500">
//         <img src={Close} alt="Close" className="inline-block w-5 h-5" />
//       </button>

//       {/* On Sale */}
//       <div>
//         <h3 className="font-bold text-black">Discounts</h3>
//         <Checkbox label="On Sale" checked={isOnSale} onChange={setIsOnSale} />
//       </div>

//       <hr className="border-t-2 border-gray-300"/>

//       {/* Best Selling */}
//       <div>
//         <h3 className="font-bold text-black">Best Selling</h3>
//         <Checkbox label="Show Best Selling" checked={bestSelling} onChange={setBestSelling} />
//       </div>

//       <hr className="border-t-2 border-gray-300"/>

//       {/* Categories */}
//       <div>
//         <h3 className="font-bold text-black">Categories</h3>
//         <div className="space-y-2">
//           {[
//             { value: "all", label: "All Categories" },
//             { value: "food", label: "Food & Beverage" },
//             { value: "health", label: "Health & Wellness" },
//             { value: "personal", label: "Personal Care" },
//             { value: "ayurvedic", label: "Ayurvedic" },
//             { value: "home", label: "Home & Lifestyle" },
//             { value: "industrial", label: "Industrial" },
//           ].map((option) => (
//             <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="categories"
//                 value={option.value}
//                 checked={selectedCategory === option.value}
//                 onChange={() => setSelectedCategory(option.value)}
//                 className="w-4 h-4 text-blue-600 border-gray-300"
//               />
//               <span className="text-gray-700">{option.label}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <hr className="border-t-2 border-gray-300"/>

//       {/* Price Range */}
//       <div>
//         <h3 className="font-medium text-gray-800">Price Range</h3>
//         <input
//           type="range"
//           min={0}
//           max={10000}
//           step={1}
//           value={priceRange}
//           onChange={(e) => setPriceRange(Number(e.target.value))}
//           className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
//         />
//         <div className="mt-2 text-sm text-center text-gray-600">{priceRange}</div>
//       </div>

//       <hr className="border-t-2 border-gray-300"/>

//       {/* Ratings */}
//       <div>
//         <h3 className="font-medium text-gray-800">Ratings</h3>
//         <div className="space-y-2">
//           {[
//             { value: "0-1", label: "⭐ 0 - 1 Stars" },
//             { value: "1-2", label: "⭐⭐ 1 - 2 Stars" },
//             { value: "2-3", label: "⭐⭐⭐ 2 - 3 Stars" },
//             { value: "3-4", label: "⭐⭐⭐⭐ 3 - 4 Stars" },
//             { value: "4-5", label: "⭐⭐⭐⭐⭐ 4 - 5 Stars" },
//           ].map((option) => (
//             <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="ratings"
//                 value={option.value}
//                 checked={selectedRating === option.value}
//                 onChange={() => setSelectedRating(option.value)}
//                 className="w-4 h-4 text-blue-600 border-gray-300"
//               />
//               <span className="text-gray-700">{option.label}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <hr className="border-t-2 border-gray-300"/>

//       {/* Clear Filters Button */}
//       <button
//         className="w-full px-4 py-2 text-black text-lg rounded-md bg-[#a68f83] hover:text-gray-700 transition-all duration-300"
//         style={{
//           color: theme.colors.textPrimary,
//           fontFamily: theme.fonts.sans[0]
//         }}
//         onClick={clearFilters}
//       >
//         Clear All Filters
//       </button>
//     </div>
//   );
// };

// export default FilterSideBar;

import React, { useState } from "react";
import Close from "../assets/Close.svg";
import { theme } from "@/styles/theme";
import { X } from "lucide-react";

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

  const applyFilters = () => {
    setFilters({
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      //isOnSale,
      bestSelling,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      averageRating: averageRating ? Number(averageRating) : undefined,
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
        <option value="all">All Categories</option>
        <option value="food">Food & Beverage</option>
        <option value="health">Health & Wellness</option>
        <option value="personal">Personal Care</option>
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
