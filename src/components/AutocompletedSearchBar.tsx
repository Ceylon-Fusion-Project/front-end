import React, { useState } from "react";

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
    <div className="relative w-full max-w-lg">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a product..."
          className="w-full px-4 py-3 border border-gray-300 rounded-full bg-background text-textPrimary font-sans focus:outline-none"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-accent text-white p-2 rounded-full hover:bg-primary transition"
        >
          🔍
        </button>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-background dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-3 cursor-pointer hover:bg-secondary dark:hover:bg-gray-700 transition-all text-textPrimary dark:text-white"
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
