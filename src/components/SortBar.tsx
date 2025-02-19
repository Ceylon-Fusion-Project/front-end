import React, { useState } from "react";
import SortButton from "./SortButton";

const sortOptions = [
  { value: "newest", label: "New" },
  { value: "priceAsc", label: "Price ascending" },
  { value: "priceDesc", label: "Price descending" },
  { value: "rating", label: "Rating" },
];

const SortBar: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");

  const handleSortSelection = (sortValue: string) => {
    setSelectedSort(sortValue);
    console.log("Sorting by:", sortValue);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
      {sortOptions.map((option) => (
        <SortButton
          key={option.value}
          label={option.label}
          isSelected={selectedSort === option.value}
          onClick={() => handleSortSelection(option.value)}
        />
      ))}
    </div>
  );
};

export default SortBar;
