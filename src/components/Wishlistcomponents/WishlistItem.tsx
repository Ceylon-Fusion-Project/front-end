import React from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon from react-icons

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
    <div className="flex justify-between items-center p-4 border-b">
      {/* Image */}
      <div className="w-1/6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
      </div>

      {/* Name */}
      <div className="w-2/6">
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>

      {/* Price */}
      <div className="w-1/6">
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>

      {/* Buttons */}
      <div className="w-2/6 flex justify-end space-x-2">
        <button
          onClick={() => onAddToCart(id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
        >
          <FaTrash className="w-5 h-5" /> {/* Trash icon */}
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;