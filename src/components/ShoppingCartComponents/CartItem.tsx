import api from "@/api/axiosInstance";
//import { v4 as uuidv4 } from "uuid";
import NotificationService from "@/utils/NotificationService";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    productId: number;
  };
  removeItem: (id: number) => void;
  quantity: number;
  updateQuantity: (id: number, quantity: number) => void;
  userId: number;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  removeItem,
  quantity,
  updateQuantity,
  userId,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, Math.max(newQuantity, 1));
  };

  const handleRemoveItem = async () => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirmRemove) return;

    try {
      const requestBody = {
        userId: 3,
        productId: item.productId,
      };
      const response = await api.post("/cart/remove-item-from-cart-byCard",
        requestBody,
    );
  
      if (response?.status === 200 || response?.status === 201) {
        NotificationService.success("Product removed from cart successfully!");
        removeItem(item.id);
      } else {
        //NotificationService.error("Unexpected response from server.");
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      NotificationService.error("Failed to remove product from cart.");
    }
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-white p-4 rounded-lg border gap-4 shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      {/* Image & Name */}
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 min-w-[80px] object-cover rounded border"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          -
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-gray-700 font-medium w-20 text-center transition">
        ${(item.price * quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemoveItem}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
