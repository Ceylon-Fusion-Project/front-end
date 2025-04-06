import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

interface WishlistItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  name,
  price,
  image,
  onRemove,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => onRemove(id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors duration-300"
          title="Remove from wishlist"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1 text-lg truncate">{name}</h3>
        <p className="font-bold text-xl text-[#b45309] mb-3">${price.toFixed(2)}</p> 
        <button
          onClick={() => onAddToCart(id)}
          className="w-full py-2.5 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 font-medium"
        >
          <FaShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;