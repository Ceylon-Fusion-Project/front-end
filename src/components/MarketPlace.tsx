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
    <div className="p-8 md:p-12 bg-primary min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6">
        🔥 Explore the Latest Products
      </h1>

      <AutoCompleteSearchBar data={products} onSearch={fetchProductDetails} />

      {/* Product Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {products.map((product, index) => (
          <div
            key={index}
            className="p-6 bg-background text-textPrimary shadow-lg rounded-xl transition hover:scale-105"
          >
            <h2 className="text-lg font-semibold">{product}</h2>
            <button
              className="mt-3 w-full bg-secondary text-white py-2 px-4 rounded-full hover:bg-highlight transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
