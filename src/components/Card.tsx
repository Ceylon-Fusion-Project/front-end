import React, { useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react"; // Close icon added

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
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Controls the modal visibility

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
          <button
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart className={`w-5 h-5 transition ${isWishlist ? "text-[#D2691E]" : "text-gray-500"}`} />
          </button>
        )}

        {/* Cart Icon - Bottom Right */}
        {hovered && (
          <button
            className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={() => setIsInCart(!isInCart)}
          >
            <ShoppingCart className={`w-5 h-5 transition ${isInCart ? "text-black" : "text-gray-500"}`} />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col items-center">
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

        {/* Quick Preview Button */}
        <button
          onClick={() => setShowPreview(true)}
          className="w-full bg-gray-200 text-black py-3 rounded-lg mt-2 hover:bg-gray-300 transition-all duration-300"
        >
          Quick Preview
        </button>

        <button
                onClick={onClick}
                className="w-full bg-gray-200 text-black py-3 rounded-lg mt-2 hover:bg-primary transition-all duration-300"
              >
                 Buy
              </button>
      </div>

      {/* Quick Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <img src={image} alt={title} className="w-full h-40 object-cover mt-4 rounded" />
            <p className="text-gray-600 mt-4">{description}</p>
            {price && <p className="text-lg font-semibold text-primary mt-2">{price}</p>}

            <div className="mt-4 flex justify-between">
              <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition">
               BUY
              </button>
              <button
                onClick={onClick}
                className="bg-accent text- px-6 py-2 rounded-lg hover:bg-primary transition-all duration-300"
              >
                Quick Buy
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Card;
