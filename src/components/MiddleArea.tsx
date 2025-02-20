import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import AutoCompletedSearchBar from "./AutoCompletedSearchBar";
import SortBar from "./SortBar";

const MiddleArea: React.FC = () => {
    const [products, setProducts] = useState<string[]>([]);

    useEffect(() => {
      // Simulated API Call - Replace with real API once the database is connected
      const fetchProducts = async () => {
        try {
          // Dummy data instead of API call
          const dummyData = [
            { productName: "Ceylon Cinnamon Sticks" },
            { productName: "Cinnamon Powder" },
            { productName: "Cinnamon Oil" },
            { productName: "Cinnamon Tea" },
            { productName: "Cinnamon Capsules" }
          ];
          
          // Extract product names from dummy data
          const productNames = dummyData.map((product) => product.productName);
          setProducts(productNames);
        } catch (error) {
          console.error("Error fetching product names:", error);
        }
      };
  
      fetchProducts();
    }, []);
  
    const fetchProductDetails = async (query: string) => {
      try {
        // Dummy product details instead of API call
        const dummyDetails = {
          name: query,
          description: `This is a dummy description for ${query}.`,
          price: Math.floor(Math.random() * 100) + 1, // Random price for testing
          category: "Food & Beverage"
        };
  
        console.log("Product Details:", dummyDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    return (
        <div>
        {/* Target Section */}
        <section id="target-section" className="min-h-screen p-8 bg-gray-100">
            <div className="flex min-h-screen p-6 bg-gray-100 md:p-12">
                {/* Filter Button */}
                <FilterButton />
                {/* Search Bar and SortBar on the Same Line */}
                <div className="flex flex-col flex-grow ml-6">
                    <div className="flex items-center justify-between mb-6">
                        <AutoCompletedSearchBar data={products} onSearch={fetchProductDetails} />
                        <SortBar />
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default MiddleArea;