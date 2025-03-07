// import React, { useState } from "react";
// import FilterIcon from "../assets/FilterIcon.svg";
// import FilterSideBar from "./FilterSideBar";

// const FilterButton: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <>
//       {/* Conditionally render the Filter Button or the Sidebar */}
//       {!isSidebarOpen ? (
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="flex items-center w-[100px] h-[45px] gap-2 px-2 py-2 transition bg-gray-300 rounded-lg shadow-sm"
//         >
//           <img src={FilterIcon} alt="Filter Icon" className="w-5 h-5" />
//           Filters
//         </button>
//       ) : (
//         <FilterSideBar onClose={() => setIsSidebarOpen(false)} />
//       )}
//     </>
//   );
// };

// export default FilterButton;

import React, { useState } from "react";
import { Filter } from "lucide-react"; // Using lucide-react for icons
import FilterSideBar from "./FilterSideBar";

interface FilterButtonProps {
  setFilters: (filters: any) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ setFilters }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {!isSidebarOpen ? (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center justify-center w-[90px] h-[35px] gap-2 px-2 py-2 transition bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-amber-20 focus:outline-none focus:ring-2 focus:ring-amber-700"
        >
          <Filter className="w-4 h-4 text-amber-800" />
          <span className="text-gray-600 font-medium">Filters</span>
        </button>
      ) : (
        <FilterSideBar 
          onClose={() => setIsSidebarOpen(false)} 
          setFilters={setFilters} // Pass setFilters to the sidebar
        />
      )}
    </>
  );
};

export default FilterButton;
