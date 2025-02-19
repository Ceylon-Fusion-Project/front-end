import React, { useState } from "react";
import AutoCompleteSearchBar from "../components/AutoCompleteSearchBar"; 
import FilterButton from "../components/FilterButton";
import SortBar from "../components/SortBar";

const products = [
  "iPhone 15 Pro",
  "Samsung Galaxy S23",
  "MacBook Pro M2",
  "Dell XPS 13",
  "Sony WH-1000XM5",
  "Apple Watch Ultra",
  "Google Pixel 7",
];

const fetchProductDetails = async (query: string) => {
  try {
    const response = await fetch(
      `/api/products?name=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    console.log("Product Details:", data);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const Marketplace: React.FC = () => {
  return (
    <div className="flex min-h-screen p-6 bg-gray-100 md:p-12">
      {/* Sidebar (Left) */}
      <FilterButton />

      {/* Main Content (Right) */}
      <div className="flex flex-col flex-grow ml-6">
        {/* Search Bar + Sort Buttons in one row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-grow">
            <AutoCompleteSearchBar data={products} onSearch={fetchProductDetails} />
          </div>

          {/* Sort Buttons */}
          <div className="flex flex-wrap gap-2">
            <SortBar />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Marketplace;