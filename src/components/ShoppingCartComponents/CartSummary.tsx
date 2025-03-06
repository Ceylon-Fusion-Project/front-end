import React from "react";

interface CartSummaryProps {
    cart: { id: number; name: string; price: number }[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const total = subtotal;

    return (
        <div className="mt-6 w-1/2 p-4 border-t">
            <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-1/2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                PROCEED TO CHECKOUT
            </button>
        </div>
    );
};

export default CartSummary;
