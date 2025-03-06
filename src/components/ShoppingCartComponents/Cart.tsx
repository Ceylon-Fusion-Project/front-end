import { useState } from "react";
import CartItem from "./CartItem";

const initialCart = [
  { id: 1, name: "Laptop", price: 1200, image: "https://via.placeholder.com/80" },
  { id: 2, name: "Headphones", price: 200, image: "https://via.placeholder.com/80" },
  { id: 3, name: "Smartphone", price: 800, image: "https://via.placeholder.com/80" },
];

const Cart: React.FC = () => {
  const [cart, setCart] = useState(initialCart);

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} removeItem={removeItem} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-semibold">Total: ${totalPrice}</span>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Checkout</button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
