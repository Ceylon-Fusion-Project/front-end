// import React, { useEffect, useState } from "react";
// import FilterButton from "./FilterButton";
// import AutoCompletedSearchBar from "./AutoCompletedSearchBar";
// import SortBar from "../components/SortBar";
// import ProductList from "./ProductList";
// import ProductsData from "./ProductsData"; // Import products

// const MiddleArea: React.FC = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredProducts, setFilteredProducts] = useState(ProductsData);

//     useEffect(() => {
//         if (searchQuery.trim() === "") {
//             setFilteredProducts(ProductsData);
//         } else {
//             const filtered = ProductsData.filter((product) =>
//                 product.productName.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredProducts(filtered);
//         }
//     }, [searchQuery]);

//     return (
//         <div className="flex flex-col flex-grow py-6">
//             <div className="flex p-6 bg-gray-100 md:p-12">
//                 {/* Filter Button */}
//                 <FilterButton />

//                 {/* Search Bar and SortBar on the Same Line */}
//                 <div className="flex flex-col flex-grow ml-6">
//                     <div className="flex items-center justify-between mb-6">
//                         {/* Auto Completed Search Bar */}
//                         <AutoCompletedSearchBar 
//                           data={ProductsData.map((p) => p.productName)} 
//                           onSearch={setSearchQuery} 
//                         />
                        
//                         {/* Sort Bar */}
//                         <SortBar />
//                     </div>

//                     {/* Product List */}
//                     <ProductList products={filteredProducts} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MiddleArea;

// import React, { useState } from "react";
// import FilterButton from "./FilterButton";
// import AutoCompletedSearchBar from "./AutoCompletedSearchBar";
// import SortBar from "../components/SortBar";
// import ProductList from "./ProductList";
// import ProductsData from "./ProductsData"; // Import product data

// const MiddleArea: React.FC = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortOption, setSortOption] = useState("nameAsc");
//     const [filters, setFilters] = useState({});
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(6);

//     return (
//         <div className="flex flex-col flex-grow py-6">
//             <div className="flex p-6 bg-gray-100 md:p-12">
//                 {/* Filter Button */}
//                 <FilterButton setFilters={setFilters} />

//                 {/* Search & Sorting */}
//                 <div className="flex flex-col flex-grow ml-6">
//                     <div className="flex items-center justify-between mb-6">
//                         <AutoCompletedSearchBar 
//                           data={ProductsData.map((p) => p.productName)} 
//                           onSearch={setSearchQuery} 
//                         />
//                         <SortBar setSortOption={setSortOption} />
//                     </div>

//                     {/* Product List */}
//                     <ProductList 
//                         searchQuery={searchQuery}
//                         sortOption={sortOption}
//                         filters={filters}
//                         page={page}
//                         setPage={setPage}
//                         size={size}
//                         setSize={setSize}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MiddleArea;


import React, { useState } from "react";
import FilterButton from "./FilterButton";
import AutoCompletedSearchBar from "./AutoCompletedSearchBar";
import SortBar from "../components/SortBar";
import ProductList from "./ProductList";
import ProductsData from "./ProductsData"; // Import product data

const MiddleArea: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("nameAsc");
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    return (
        <div className="flex flex-col flex-grow py-6">
            <div className="flex flex-col p-4 bg-white md:flex-row md:p-6">
                
                {/* Filter Button */}
                <div className="w-full mb-4 md:w-auto md:mb-0">
                    <FilterButton setFilters={setFilters} />
                </div>

                {/* Search & Sorting */}
                <div className="flex flex-col flex-grow gap-4">
                    
                    {/* Search Bar & Sorting in Row */}
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        
                        {/* Search Bar with full available width */}
                        <div className="w-full md:flex-grow">
                            <AutoCompletedSearchBar 
                                data={ProductsData.map((p) => p.productName)} 
                                onSearch={setSearchQuery}
                                className="w-full"
                            />
                        </div>

                        {/* Sort Bar */}
                        <div className="w-full md:w-auto">
                            <SortBar setSortOption={setSortOption} />
                        </div>
                    </div>
                    {/* Product List */}
                    <ProductList 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortOption={sortOption}
                        filters={filters}
                        setFilters={setFilters}
                        page={page}
                        setPage={setPage}
                        size={size}
                        setSize={setSize}
                    />
                </div>
            </div>
        </div>
    );
};

export default MiddleArea;
