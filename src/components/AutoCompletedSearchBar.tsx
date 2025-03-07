// import React, { useState, useRef } from "react";
// import SearchIcon from "../assets/SearchIcon.svg";
// import ProductsData from "./ProductsData";

// interface AutoCompleteSearchBarProps {
//   data : string[];
//   onSearch: (query: string) => void;
// }

// const AutoCompleteSearchBar: React.FC<AutoCompleteSearchBarProps> = ({ onSearch }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const searchRef = useRef<HTMLDivElement>(null);

//   // Extract product names from ProductsData
//   const productNames = ProductsData.map((product) => product.productName);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setQuery(value);

//     if (value.trim() === "") {
//       setSuggestions([]);
//     } else {
//       const filteredSuggestions = productNames.filter((name) =>
//         name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     }
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     setQuery(suggestion);
//     setSuggestions([]);
//     onSearch(suggestion);
//   };

//   const handleSearchClick = () => {
//     if (query.trim() !== "") {
//       alert(`Search Query: ${query}`);
//       onSearch(query);
//     } else {
//       alert("Please enter a product name to search!");
//     }
//   };

//   function hexToRGBA(background: string, arg1: number) {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div className="relative flex items-center w-[250px] h-[45px] rounded-full border-3 shadow-md bg-white" ref={searchRef}>
//       {/* Search input */}
//       <input
//         type="search"
//         placeholder="Search ..."
//         value={query}
//         onChange={handleInputChange}
//         onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Hide after selection
//         className="flex-grow w-full px-3 text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none rounded-full outline-none"
//       />
//       <img
//         src={SearchIcon}
//         alt="Search"
//         onClick={handleSearchClick} // Show alert when clicked
//         className="w-[45px] h-[45px] cursor-pointer rounded-r-full"
//       />

//       {/* Suggestion list with fixed positioning */}
//       {suggestions.length > 0 && (
//         <ul
//           className="absolute left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg top-full bg-[#F9D9B6]">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onMouseDown={() => handleSuggestionClick(suggestion)} // Prevent blur before click
//               className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AutoCompleteSearchBar;

import React, { useState, useRef,useEffect } from "react";
import { Search } from "lucide-react";
import { theme } from "@/styles/theme";

interface AutoCompleteSearchBarProps {
  data: string[];
  onSearch: (query: string) => void;
  className?: string;
}

const AutoCompleteSearchBar: React.FC<AutoCompleteSearchBarProps> = ({
  data,
  onSearch,
  className,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState({ width: "0px", top: "0px", left: "0px" });

  useEffect(() => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownStyles({
        width: `${rect.width}px`,
        top: `${rect.top + rect.height + window.scrollY}px`, // Correct placement below search bar
        left: `${rect.left + window.scrollX}px`, // Align with search bar
      });
    }
  }, [query, isFocused]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = data
        .filter((name) => name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 6); // Limit suggestions to 6 items
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  const handleSearchClick = () => {
    if (query.trim() !== "") {
      onSearch(query);
      setSuggestions([]);
    } else {
      alert("Please enter a product name to search!");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
    className={`w-full max-w-screen-md mx-auto p-3 rounded-md border transition-all duration-200 flex items-center bg-white 
    ${isFocused ? "ring-2 ring-[#d7bc99] shadow-md" : "border border-gray-300 shadow-sm"} ${className || ""}`}
    ref={searchRef}
  >
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setSuggestions([]), 200);
          }}
          className="flex-grow w-full h-full px-4 text-base text-gray-800 placeholder-gray-500 bg-transparent border-none rounded-lg outline-none font-medium"
          aria-label="Search products"
        />

        {/* Search button */}
        <button
          onClick={handleSearchClick}
          className="flex items-center justify-center w-12 h-full transition-colors duration-200 rounded-r-lg"
          style={{
            color: theme.colors.iconPrimary,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.iconSecondary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.iconPrimary)}
          aria-label="Submit search"
        >
          <Search size={22} strokeWidth={2.5} />
        </button>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul
          ref={dropdownRef}
          className="absolute z-50 border rounded-lg shadow-lg max-h-64 overflow-y-auto"
          style={{
            width: dropdownStyles.width, // Dynamic width
            position: "absolute", // Ensures correct positioning
            top: dropdownStyles.top, // Positioned below search bar
            left: dropdownStyles.left, // Align dropdown with search bar
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            boxShadow: theme.shadows.medium,
          }}
        >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 text-sm font-medium cursor-pointer transition-colors border-b last:border-b-0"
                style={{
                  color: theme.colors.textPrimary,
                  borderBottom: `1px solid ${theme.colors.border}`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.secondary)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.colors.background)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteSearchBar;
