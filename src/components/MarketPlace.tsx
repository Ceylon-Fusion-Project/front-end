import React from "react";
import AutoCompleteSearchBar from "./AutocompletedSearchBar";

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
    <div className="flex flex-col items-center min-h-screen p-8 md:p-12">
      <AutoCompleteSearchBar data={products} onSearch={fetchProductDetails} />
    </div>
  );
};

export default Marketplace;
