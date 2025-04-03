import React, { useState } from "react";
import { X } from "lucide-react";
import { theme } from "@/styles/theme";

interface FilterSideBarProps {
  onClose: () => void;
  setFilters: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSideBarProps> = ({ onClose, setFilters }) => {
  const [priceRange, setPriceRange] = useState<[string, string]>(["", ""]);
  const [rating, setRating] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [featured, setFeatured] = useState<boolean>(false);

  const availableAmenities = [
    "Pool",
    "Spa",
    "WiFi",
    "Breakfast",
    "Airport Transfer",
    "Guide",
    "Transportation",
    "Workshop",
    "Meals Included",
    "Kids Club",
  ];

  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleRatingChange = (value: string) => {
    // Allow empty string or valid numbers
    if (value === "" || /^\d*\.?\d{0,1}$/.test(value)) {
      // For non-empty values, check the range
      if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 5)) {
        setRating(value);
      }
    }
  };

  const applyFilters = () => {
    setFilters({
      minPrice: priceRange[0] ? Number(priceRange[0]) : undefined,
      maxPrice: priceRange[1] ? Number(priceRange[1]) : undefined,
      rating: rating ? Number(rating) : undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
      featured: featured || undefined
    });
    onClose();
  };

  return (
    <div
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-80"
      style={{
        border: `2px solid ${theme.colors.border}`,
      }}
    >
      {/* Header with Close Button */}
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={onClose}
          className="transition hover:opacity-75"
          style={{ color: theme.colors.textPrimary }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label
          className="block mb-2 font-medium text-md"
          style={{ fontFamily: theme.fonts.body }}
        >
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
            className="w-full p-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
            placeholder="Min"
            style={{
              border: `1px solid ${theme.colors.border}`,
              fontFamily: theme.fonts.body,
            }}
          />
          
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
            className="w-full p-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
            placeholder="Max"
            style={{
              border: `1px solid ${theme.colors.border}`,
              fontFamily: theme.fonts.body,
            }}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label
          className="block mb-2 font-medium text-md"
          style={{ fontFamily: theme.fonts.body }}
        >
          Minimum Rating
        </label>
        <input
          type="number"
          value={rating}
          onChange={(e) => handleRatingChange(e.target.value)}
          className="w-full p-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d7bc99]"
          placeholder="Min Rating"
          min="0"
          max="5"
          step="0.1"
          style={{
            border: `1px solid ${theme.colors.border}`,
            fontFamily: theme.fonts.body,
          }}
        />
        <p className="mt-1 text-xs text-gray-500" style={{ fontFamily: theme.fonts.body }}>
          Enter a value between 0 and 5 with up to one decimal place (e.g., 4.5)
        </p>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <label
          className="block mb-2 font-medium text-md"
          style={{ fontFamily: theme.fonts.body }}
        >
          Amenities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availableAmenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4 h-4"
                style={{ accentColor: "#023333" }}
              />
              <span style={{ fontFamily: theme.fonts.body }}>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="w-full px-4 py-2 mt-4 transition-colors duration-200 rounded-md bg-[#2b5649] text-[#bbddd3] hover:bg-[#3c7866]"
        style={{
          // backgroundColor: theme.colors.primary,
          // color: theme.colors.textPrimary,
          fontFamily: theme.fonts.body,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#3c7866")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#2b5649")
        }
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;