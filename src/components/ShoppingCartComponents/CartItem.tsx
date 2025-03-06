import { useState } from "react";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
