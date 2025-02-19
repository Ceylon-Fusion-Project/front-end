import React, { useState } from "react";
import SearchIcon from "../assets/SearchIcon.svg";

interface AutoCompleteSearchBarProps {
  data: string[];
  onSearch: (query: string) => void;
}

const AutoCompleteSearchBar: React.FC<AutoCompleteSearchBarProps> = ({
  data,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    const filteredSuggestions = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="relative flex items-center w-[200px] h-[35px] rounded-full border-2 border-gray-300 shadow-md focus-within:border-gray-500">
        {/* Search input */}
        <input
          type="search"
          placeholder="Search ..."
          value={query}
          onChange={handleInputChange}
          className="flex-grow w-full px-3 text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none rounded-full outline-none"
        />
        <img
          src={SearchIcon} 
          alt="Search" 
          // onClick={handleSearchClick}
          onClick={() => alert("Search icon clicked!")}
          className="w-8 h-8 rounded-r-full"
        />
      
      {/* Suggestion list */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-transparent border border-gray-300 rounded-md shadow-lg top-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
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
