// src/components/FeaturedProducts.tsx
//import React from "react";
import Card from "./Card";
import cinnamonPowder from "../assets/images/cinnamon-powder.jpg";
import cinnamonSticks from "../assets/images/cinnamon-sticks.jpg";
import cinnamonOil from "../assets/images/cinnamon-oil.jpg";
import ShopNowButton from "@/components/ShopNowButton";

const FeaturedProducts = () => {
  const products = [
    {
      image: cinnamonPowder,
      title: "Cinnamon Powder",
      description: "Finely ground cinnamon for all your culinary needs.",
      price: "$10",
    },
    {
      image: cinnamonSticks,
      title: "Cinnamon Sticks",
      description: "Perfect for brewing and cooking.",
      price: "$15",
    },
    {
      image: cinnamonOil,
      title: "Cinnamon Oil",
      description: "Pure cinnamon oil for aromatherapy and cooking.",
      price: "$20",
    },
    
  ];
  

  return (
    

    <div className="py-16 shadow-sm  bg-secondary-100"> {/* Differentiating Background */}
      <div className="container px-6 mx-auto">
        {/* Section Title */}
        <h2 className="mb-10 text-4xl font-bold text-center" style={{ color: "#3E2723" }}>
          Featured Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
             <Card
             key={index}
             image={product.image}
             title={product.title}
             description={product.description}
             price={product.price}
             onClick={() => alert(`Quick Buy: ${product.title}`)}
             isFeatured={true} // Enables the "Quick Buy" button
           />
          ))}
        </div>

        {/* Shop Now Button - Positioned Outside the Grid */}
        {/* <div className="flex justify-center w-full mt-12"> 
          <button className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-accent hover:bg-primary">
            Shop Now
          </button>
        </div> */}
        <div className="text-center">
      <ShopNowButton text="Shop Now" />
    </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
