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
import SearchIcon from "../assets/SearchIcon.svg";

interface AutoCompleteSearchBarProps {
  data: string[]; // Now `data` is correctly accepted
  onSearch: (query: string) => void;
  className?: string;
}

const AutoCompleteSearchBar: React.FC<AutoCompleteSearchBarProps> = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = data.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
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
    } else {
      alert("Please enter a product name to search!");
    }
  };

  return (
    <div className="relative flex items-center w-[250px] h-[45px] rounded-full border-3 shadow-md bg-white" ref={searchRef}>
      <input
        type="search"
        placeholder="Search ..."
        value={query}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Hide after selection
        className="flex-grow w-full px-3 text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none rounded-full outline-none"
      />
      <img
        src={SearchIcon} 
        alt="Search" 
        onClick={handleSearchClick} 
        className="w-[45px] h-[45px] cursor-pointer rounded-r-full"
      />

      {/* Suggestion list */}
      {suggestions.length > 0 && (
        <ul 
          className="absolute left-0 z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg top-full bg-[#F9D9B6]">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteSearchBar;
