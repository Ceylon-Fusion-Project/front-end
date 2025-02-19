import React, { useState } from "react";
import FilterIcon from "../assets/FilterIcon.svg";
import FilterSideBar from "./FilterSideBar";

const FilterButton: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Conditionally render the Filter Button or the Sidebar */}
      {!isSidebarOpen ? (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center h-[35px] gap-2 px-2 py-2 transition border rounded-lg shadow-sm hover:bg-gray-300 hover:border-gray-500"
        >
          <img src={FilterIcon} alt="Filter Icon" className="w-5 h-5" />
          Filters
        </button>
      ) : (
        <FilterSideBar onClose={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
};

export default FilterButton;