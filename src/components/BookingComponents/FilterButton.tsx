import React from "react";
import { Filter } from "lucide-react";

interface FilterButtonProps {
    setFilters: (filters: any) => void;
    onClick: () => void; // Required onClick prop to trigger sidebar in parent
}

const FilterButton: React.FC<FilterButtonProps> = ({ setFilters, onClick }) => {
    return (
        <button
            onClick={onClick} // Trigger parent's handler to show sidebar
            className="flex items-center justify-center w-[90px] h-[35px] gap-2 px-2 py-2 transition bg-white border border-[#1a332b] rounded-sm shadow-sm hover:bg-amber-20 focus:outline-none focus:ring-2 focus:ring-[#1a332b] text-[#346757] hover:text-[#1a332b]"
        >
            <Filter size={16} />
            <span>Filters</span>
        </button>
    );
};

export default FilterButton;