import React, { useState } from "react";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar"; 
import FilterButton from "./FilterButton";
<<<<<<< HEAD
<<<<<<< HEAD
import SlideshowBanner from "./SlideshowBanner";
=======
import SortBar from "./SortBar"; // Import the SortButtons component
>>>>>>> 17975987a8ecee4ef0dab78eb132eaf5341481cf
=======
import SortBar from "./SortBar"; // Import the SortButtons component
>>>>>>> 17975987a8ecee4ef0dab78eb132eaf5341481cf

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
<<<<<<< HEAD
    <div>
      <div><SlideshowBanner/></div>
      <div className="flex min-h-screen p-6 bg-gray-100 md:p-12">
        
        {/* Sidebar (Left) */}
        {/* <FilterSideBar /> */}

        <FilterButton />

        {/* Main Content (Right) */}
        <div className="flex flex-col flex-grow ml-6">
          {/* Search Bar */}
          <div className="mb-6">
            <AutoCompleteSearchBar data={products} onSearch={fetchProductDetails} />
          </div>
=======
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
<<<<<<< HEAD
=======

          {/* Sort Buttons */}
          <div className="flex flex-wrap gap-2">
            <SortBar />
          </div>
        </div>
>>>>>>> 17975987a8ecee4ef0dab78eb132eaf5341481cf

          {/* Sort Buttons */}
          <div className="flex flex-wrap gap-2">
            <SortBar />
          </div>
        </div>
>>>>>>> 17975987a8ecee4ef0dab78eb132eaf5341481cf

          {/* Product Listings (Placeholder) */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Product Listings</h2>
            <p className="text-gray-600">Products will be displayed here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;