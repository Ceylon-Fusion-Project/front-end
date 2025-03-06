import { useState } from "react";

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
    removeItem: (id: number) => void;
    quantity: number;
    updateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem, quantity, updateQuantity }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    const handleQuantityChange = (newQuantity: number) => {
        setLocalQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    return (
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 p-4 border rounded-lg bg-white">
            {/* Image */}
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />

            {/* Name and Price */}
            <div className="flex items-center gap-16">
                <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleQuantityChange(Math.max(localQuantity - 1, 1))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    -
                </button>
                <span className="text-lg w-6 text-center">{localQuantity}</span>
                <button
                    onClick={() => handleQuantityChange(localQuantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    +
                </button>
            </div>

            {/* Subtotal */}
            <p className="text-gray-600 text-right">
                ${(item.price * localQuantity).toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
                onClick={() => removeItem(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;