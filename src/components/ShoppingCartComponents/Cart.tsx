import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import api from "@/api/axiosInstance";
import NotificationService from "@/utils/NotificationService";
import {getUserID} from "@/services/user-service/userService";

interface CartItemType {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
const userId = 3; // ✅ static assignment for testing purposes
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getUserID();
  }, []);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/aggregated-cart/merged-cart-details", {
          params: { userId },
        });
        setCart(response.data.cart);
      } catch (error: any) {
        NotificationService.error("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg">
      {/* <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2> */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        {/* Left Side - Summary */}
        <div className="w-full lg:w-1/3">
          <CartSummary cart={cart} />
        </div>

        {/* Right Side - Cart Items */}
        <div className="flex-1 space-y-4">
          {/* {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : cart.length > 0 ? (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeItem={removeItem}
                quantity={item.quantity}
                updateQuantity={updateQuantity}
                userId={userId}
              />
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )} */}
          {!loading && userId !== null && cart.length > 0 ? (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeItem={removeItem}
                quantity={item.quantity}
                updateQuantity={updateQuantity}
                userId={userId}
              />
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
