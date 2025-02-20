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
          className="flex items-center w-[100px] h-[45px] gap-2 px-2 py-2 transition bg-gray-300 rounded-lg shadow-sm"
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