import React, { useState } from "react";
import CategoryBar from "./CategoryBar";
import GridListView from "./GridListView";
import FilterSidebar from "./FilterSidebar";
import SortBar from "./SortBar";
import BookingList from "./BookingList";
import FilterButton from "./FilterButton";

const BookingArea: React.FC = () => {
    const [category, setCategory] = useState<"all" | "packages" | "accommodations" | "experiences">("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortOption, setSortOption] = useState("newest");
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterButtonClick = () => {
        setIsFilterOpen(true); // Show the FilterSidebar when button is clicked
    };

    return (
        <div className="flex flex-col flex-grow py-6 border-2 border-gray-200">
            <div className="flex flex-col p-4 mt-10 bg-white md:flex-row md:p-6 md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                    <CategoryBar
                        selectedCategory={category}
                        onCategoryChange={(newCategory) => setCategory(newCategory as "all" | "packages" | "accommodations" | "experiences")}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <GridListView
                        viewMode={viewMode}
                        onViewChange={(mode) => setViewMode(mode)}
                    />
                </div>
            </div>

            <div className="flex flex-col p-4 bg-white md:flex-row md:p-6">
                <div className="w-full mb-4 md:w-auto md:mb-0">
                    {isFilterOpen ? (
                        <FilterSidebar 
                            onClose={() => setIsFilterOpen(false)} 
                            setFilters={setFilters}
                        />
                    ) : (
                        <FilterButton 
                            setFilters={setFilters} 
                            onClick={handleFilterButtonClick}
                        />
                    )}
                </div>

                <div className={`flex flex-col flex-grow ${isFilterOpen ? "ml-6" : "ml-0"}`}>
                    <div className="flex flex-col items-center justify-end gap-4 mb-6 md:flex-row">
                        <SortBar 
                            sortOption={sortOption}
                            setSortOption={setSortOption} 
                            className="w-full md:w-auto"
                        />
                    </div>
                    <BookingList 
                        category={category}
                        viewMode={viewMode}
                        sortOption={sortOption}
                        filters={filters}
                        page={page}
                        size={size}
                        setPage={setPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingArea;