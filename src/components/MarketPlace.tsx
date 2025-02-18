import React from "react";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar"; 
import FilterSideBar from "./FilterSideBar";
import { Sidebar } from "lucide-react";

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
      {/* <div className="w-1/4 min-w-[250px] bg-white shadow-lg rounded-lg p-4">
        <FilterSidebar />
      </div> */}

      <FilterSideBar />

      {/* Main Content (Right) */}
      <div className="flex flex-col flex-grow ml-6">
        {/* Search Bar */}
        <div className="mb-6">
          <AutoCompleteSearchBar data={products} onSearch={fetchProductDetails} />
        </div>

        {/* Product Listings (Placeholder) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Product Listings</h2>
          <p className="text-gray-600">Products will be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
