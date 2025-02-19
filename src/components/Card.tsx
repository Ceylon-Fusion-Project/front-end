import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react"; // Importing icons

interface CardProps {
  image: string;
  title: string;
  description: string;
  price?: string;
  onClick?: () => void; // Quick Buy button
  isFeatured?: boolean; // Flag to customize for Featured Products
}

const Card: React.FC<CardProps> = ({ image, title, description, price, onClick, isFeatured }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image with Hover Icons */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {/* Wishlist (Heart) Icon - Top Right */}
        {hovered && (
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        )}

        {/* Cart Icon - Bottom Center */}
        {hovered && (
          <button className="absolute bottom-3 right-3  bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-primary font-serif text-xl font-bold mb-2">{title}</h3>
        <p className="text-secondary font-sans text-sm mb-4">{description}</p>
        {price && <p className="text-accent font-sans text-lg font-semibold mb-4">{price}</p>}

        {/* Quick Buy Button (Only for Featured Products) */}
        {isFeatured && (
          <button
            onClick={onClick}
            className="w-full bg-accent text-white py-3 rounded-lg hover:bg-primary transition-all duration-300"
          >
            Quick Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
