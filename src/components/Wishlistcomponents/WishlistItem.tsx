import React from "react";

interface WishlistItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void; // New callback for adding to cart
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
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onAddToCart(id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onRemove(id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;