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

import React, { useState, useRef } from "react";
import { Search } from "lucide-react";

interface AutoCompleteSearchBarProps {
  data: string[];
  onSearch: (query: string) => void;
  className?: string;
}

const AutoCompleteSearchBar: React.FC<AutoCompleteSearchBarProps> = ({ data, onSearch, className }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = data.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6); // Limit suggestions to 6 items
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
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div 
        className={`relative flex items-center w-64 sm:w-80 md:w-96 h-12 bg-white ${
          isFocused ? "ring-2 ring-amber-700 shadow-md" : "border border-gray-300 shadow-sm"
        } rounded-lg transition-all duration-200 ${className || ""}`} 
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
        <button
          onClick={handleSearchClick}
          className="flex items-center justify-center w-12 h-full text-amber-800 hover:text-amber-900 hover:bg-gray-100 rounded-r-lg transition-colors duration-200"
          aria-label="Submit search"
        >
          <Search size={22} strokeWidth={2.5} />
        </button>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul 
            className="absolute left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg top-full max-h-64 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 text-gray-800 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
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