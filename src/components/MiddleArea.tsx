import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import AutoCompletedSearchBar from "./AutoCompletedSearchBar";
import SortBar from "./SortBar";
import ProductList from "./ProductList";
import ProductsData from "./ProductsData"; // Import products

const MiddleArea: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(ProductsData);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts(ProductsData);
        } else {
            const filtered = ProductsData.filter((product) =>
                product.productName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery]);

    return (
        <div className="flex flex-col flex-grow py-6">
            <div className="flex p-6 bg-gray-100 md:p-12">
                {/* Filter Button */}
                <FilterButton />

                {/* Search Bar and SortBar on the Same Line */}
                <div className="flex flex-col flex-grow ml-6">
                    <div className="flex items-center justify-between mb-6">
                        {/* Auto Completed Search Bar */}
                        <AutoCompletedSearchBar 
                          data={ProductsData.map((p) => p.productName)} 
                          onSearch={setSearchQuery} 
                        />
                        
                        {/* Sort Bar */}
                        <SortBar />
                    </div>

                    {/* Product List */}
                    <ProductList products={filteredProducts} />
                </div>
            </div>
        </div>
    );
};

export default MiddleArea;