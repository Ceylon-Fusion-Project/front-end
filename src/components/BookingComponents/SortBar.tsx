import React, { useEffect } from 'react';

interface SortBarProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  className?: string;
}

const SortBar: React.FC<SortBarProps> = ({ sortOption, setSortOption, className = '' }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'priceAsc', label: 'Price Ascending' },
    { value: 'priceDesc', label: 'Price Descending' },
    { value: 'rating', label: 'Top Rated' },
  ];

  // Set default sort option to "newest" when component mounts if no option is selected
  useEffect(() => {
    if (!sortOption) {
      setSortOption('newest');
    }
  }, [sortOption, setSortOption]);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setSortOption(option.value)}
          className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${
            sortOption === option.value
              ? 'bg-[#11221d] text-white'
              : 'bg-[#cde0e0] text-gray-700 hover:bg-[#81b3b3]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortBar;