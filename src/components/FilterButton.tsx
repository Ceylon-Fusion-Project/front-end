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
          className="flex items-center w-[100px] h-[45px] gap-2 px-2 py-2 transition bg-gray-300 rounded-lg shadow-sm"
        >
          <Filter className="w-5 h-5 text-gray-600" />
          Filters
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
