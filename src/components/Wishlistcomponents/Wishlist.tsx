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

    const handleRemove = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleAddToCart = (id: number) => {
        const itemToAdd = items.find((item) => item.id === id);
        if (itemToAdd) {
            alert(`${itemToAdd.name} added to cart!`);
        }
    };

    return (
        <div className="w-full mx-auto mt-10 px-4">
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
        </div>
    );
};

export default Wishlist;
