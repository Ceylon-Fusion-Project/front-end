import React, { useState } from "react";
import WishlistItem from "./WishlistItem";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [cart, setCart] = useState<Item[]>([]); // Cart state

  const handleRemove = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    const itemToAdd = items.find((item) => item.id === id);
    if (itemToAdd) {
      setCart((prevCart) => [...prevCart, itemToAdd]);
      alert(`${itemToAdd.name} added to cart!`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        items.map((item) => (
          <WishlistItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
          />
        ))
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center space-x-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <span>
                  {item.name} - ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wishlist;