import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const initialCart = [
    { id: 1, name: "Laptop", price: 1200, image: "https://via.placeholder.com/80", quantity: 1 },
    { id: 2, name: "Headphones", price: 200, image: "https://via.placeholder.com/80", quantity: 1 },
    { id: 3, name: "Smartphone", price: 800, image: "https://via.placeholder.com/80", quantity: 1 },
];

const Cart: React.FC = () => {
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        setCart(initialCart);
    }, []);

    const removeItem = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length > 0 ? (
                <>
                    {/* Header Row */}
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 mb-4 font-bold">
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Subtotal</div>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                removeItem={removeItem}
                                quantity={item.quantity || 1} // Default quantity to 1 if not provided
                                updateQuantity={updateQuantity}
                            />
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <CartSummary cart={cart} />
                </>
            ) : (
                <p className="text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;