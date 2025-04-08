// // import React, { useState } from "react";
// // import SortButton from "./SortButton";

// // const sortOptions = [
// //   { value: "newest", label: "New" },
// //   { value: "priceAsc", label: "Price Ascending" },
// //   { value: "priceDesc", label: "Price Descending" },
// //   { value: "rating", label: "Rating" },
// // ];

// // const SortBar: React.FC = () => {
// //   const [selectedSort, setSelectedSort] = useState<string>("");

// //   const handleSortSelection = (sortValue: string) => {
// //     setSelectedSort(sortValue);
// //     alert(`Sorting by: ${sortValue}`);
// //     console.log("Sorting by:", sortValue);
// //   };

// //   return (
// //     <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
// //       {sortOptions.map((option) => (
// //         <SortButton
// //           key={option.value}
// //           label={option.label}
// //           isSelected={selectedSort === option.value}
// //           onClick={() => handleSortSelection(option.value)}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default SortBar;

// import React, { useState } from "react";
// import SortButton from "./SortButton";

// const sortOptions = [
//   { value: "newest", label: "Newest" },
//   { value: "priceAsc", label: "Price Ascending" },
//   { value: "priceDesc", label: "Price Descending" },
//   { value: "ratingDesc", label: "Top Rated" },
// ];

// interface SortBarProps {
//   setSortOption: (sort: string) => void;
//   className?: string;
// }

// const SortBar: React.FC<SortBarProps> = ({ setSortOption }) => {
//   const [selectedSort, setSelectedSort] = useState("newest");

//   const handleSortSelection = (sortValue: string) => {
//     setSelectedSort(sortValue);
//     setSortOption(sortValue);
//   };

//   return (
//     <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
//       {sortOptions.map((option) => (
//         <SortButton
//           key={option.value}
//           label={option.label}
//           isSelected={selectedSort === option.value}
//           onClick={() => handleSortSelection(option.value)}
//         />
//       ))}
//     </div>
//   );
// };

// export default SortBar;

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "priceAsc", label: "Price Ascending" },
  { value: "priceDesc", label: "Price Descending" },
  { value: "ratingDesc", label: "Top Rated" },
];

interface SortBarProps {
  setSortOption: (sort: string) => void;
  className?: string;  // ✅ Ensure className is included in the props
}

const SortBar: React.FC<SortBarProps> = ({ setSortOption, className = "" }) => {  
  const [selectedSort, setSelectedSort] = useState("newest");
  const [isOpen, setIsOpen] = useState(false);

  const handleSortSelection = (sortValue: string) => {
    setSelectedSort(sortValue);
    setSortOption(sortValue);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className={`relative w-full md:w-auto ${className}`}> {/* ✅ Now className is correctly used */}
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium bg-white border rounded-md md:w-48 hover:bg-[#f0e6d9] focus:outline-none"
      >
        {sortOptions.find((option) => option.value === selectedSort)?.label || "Sort By"}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 z-10 w-full mt-2 bg-white border rounded-md shadow-lg md:w-48">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelection(option.value)}
              className={`block w-full px-4 py-2 text-sm text-left transition-all duration-150 hover:bg-[#f0e6d9] ${
                selectedSort === option.value ? "bg-[#d4b893]" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBar;

