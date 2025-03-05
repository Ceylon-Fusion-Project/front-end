import React from "react";
import OrderSummary from "../components/OrderCheckoutComponents/OrderSummary";
import ShippingInfo from "../components/OrderCheckoutComponents/ShippingInfo";

const sampleItems = [
  { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1, image: "https://via.placeholder.com/60" },
  { id: 2, name: "Smart Watch", price: 49.99, quantity: 2, image: "https://via.placeholder.com/60" },
];

const OrderCheckout: React.FC = () => {
  const subtotal = sampleItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 5.99;
  const tax = 15.00;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

        {/* Shipping Information */}
        <ShippingInfo
          name="John Doe"
          address="123 Main St"
          city="New York"
          state="NY"
          zip="10001"
          country="USA"
          shippingMethod="Express Delivery"
        />

        {/* Order Summary */}
        <OrderSummary
          items={sampleItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          tax={tax}
        />

        {/* Final Checkout Button */}
        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderCheckout;
