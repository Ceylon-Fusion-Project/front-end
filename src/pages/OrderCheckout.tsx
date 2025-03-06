import React, { useState } from "react";
import OrderSummary from "../components/OrderCheckoutComponents/OrderSummary";
import ShippingInfoForm from "../components/OrderCheckoutComponents/ShippingInfo";
import PlaceOrderButton from "../components/OrderCheckoutComponents/PlaceOrderButton";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface OrderSummaryProps {
  items: Item[];
  subtotal: number;
  shippingCost: number;
  tax: number;
}

const sampleItems: Item[] = [
  { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1, image: "https://via.placeholder.com/60" },
  { id: 2, name: "Smart Watch", price: 49.99, quantity: 2, image: "https://via.placeholder.com/60" },
];

const OrderCheckout: React.FC = () => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const subtotal = sampleItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 5.99;
  const tax = 15.00;

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log("Shipping Info Submitted:", shippingInfo);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <ShippingInfoForm
              shippingInfo={shippingInfo}
              onChange={handleShippingInfoChange}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <OrderSummary
              items={sampleItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
            />
          </div>
        </div>

        {/* Final Checkout Button */}
        <PlaceOrderButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default OrderCheckout;