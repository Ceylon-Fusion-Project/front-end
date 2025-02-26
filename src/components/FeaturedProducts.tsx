// // src/components/FeaturedProducts.tsx
// //import React from "react";
// import Card from "./Card";
// import cinnamonPowder from "../assets/images/cinnamon-powder.jpg";
// import cinnamonSticks from "../assets/images/cinnamon-sticks.jpg";
// import cinnamonOil from "../assets/images/cinnamon-oil.jpg";
// import ShopNowButton from "@/components/ShopNowButton";

// const FeaturedProducts = () => {
//   const products = [
//     {
//       image: cinnamonPowder,
//       title: "Cinnamon Powder",
//       description: "Finely ground cinnamon for all your culinary needs.",
//       price: "$10",
//     },
//     {
//       image: cinnamonSticks,
//       title: "Cinnamon Sticks",
//       description: "Perfect for brewing and cooking.",
//       price: "$15",
//     },
//     {
//       image: cinnamonOil,
//       title: "Cinnamon Oil",
//       description: "Pure cinnamon oil for aromatherapy and cooking.",
//       price: "$20",
//     },

//   ];

//   return (

//     <div className=" bg-secondary-100 py-16 shadow-sm"> {/* Differentiating Background */}
//       <div className="container mx-auto px-6">
//         {/* Section Title */}
//         <h2 className="text-4xl font-bold text-center mb-10" style={{ color: "#3E2723" }}>
//           Featured Products
//         </h2>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {products.map((product, index) => (
//              <Card
//              key={index}
//              image={product.image}
//              title={product.title}
//              description={product.description}
//              price={product.price}
//              onClick={() => alert(`Quick Buy: ${product.title}`)}
//              isFeatured={true} // Enables the "Quick Buy" button
//            />
//           ))}
//         </div>

//         {/* Shop Now Button - Positioned Outside the Grid */}
//         {/* <div className="w-full flex justify-center mt-12">
//           <button className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-primary transition-all duration-300">
//             Shop Now
//           </button>
//         </div> */}
//         <div className="text-center">
//       <ShopNowButton text="Shop Now" />
//     </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;

import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance"; // Importing axios instance
import Card from "./Card";
import { theme } from "../../src/styles/theme";

interface Product {
  productID: number;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  productImageURL: string;
  productRatingValue: number;
  categoryType: string;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/get-all-products", {
          params: {
            status: true,
            sort: "newest",
            page: 0,
            size: 3,
          },
        });

        console.log("API Response:", response);

        // Corrected data access
        const fetchedProducts =
          response?.data?.data?.data?.productGetAllResponseDTOS;

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Unexpected data structure:", response.data);
          setError("Invalid data format from API.");
        }
      } catch (err: any) {
        console.error("Error fetching products:", err);
        if (err.response) {
          console.error("Server Response Data:", err.response.data);
          console.error("Status Code:", err.response.status);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error Message:", err.message);
        }
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">Loading featured products...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-secondary-100 py-16 shadow-sm">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2
          className="text-4xl font-bold text-center mb-10"
          style={{ color: "#3E2723" }}
        >
          Featured Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <Card
              key={product.productID}
              image={product.productImageURL}
              title={product.productName}
              description={product.productDescription}
              price={`$${product.sellingPrice}`}
              productID={product.productID} // Pass productID for navigation
              onClick={() => alert(`Quick Buy: ${product.productName}`)}
              isFeatured={true}
            />
          ))}
        </div>

        {/* Shop Now Button - Positioned Outside the Grid */}
        <div className="w-full flex justify-center mt-12"> 
        <button
            className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 
             hover:bg-primary hover:scale-105 hover:shadow-lg hover:text-black"
                style={{
            backgroundColor: "#a68f83",
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.sans[0],
          }}
            >
              Shop Now
            </button>

        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
