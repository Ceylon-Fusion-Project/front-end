import React, { useState } from "react";
import OrderSummary from "../../components/OrderCheckoutComponents/OrderSummary";
import ShippingInfoForm from "../../components/OrderCheckoutComponents/ShippingInfo";
import PlaceOrderButton from "../../components/OrderCheckoutComponents/PlaceOrderButton";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

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

const sampleItems: Item[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    image: "https://via.placeholder.com/60",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 49.99,
    quantity: 2,
    image: "https://via.placeholder.com/60",
  },
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

  const subtotal = sampleItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 5.99;
  const tax = 15.0;

  const handleShippingInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to the server
    console.log("Shipping Info Submitted:", shippingInfo);
  };

  return (
    <section className="mt-5 pt-3">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-white p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Information Form */}
              <div>
                <ShippingInfoForm
                  shippingInfo={shippingInfo}
                  onChange={handleShippingInfoChange}
                  onSubmit={handleSubmit}
                />
              </div>

              {/* Order Summary */}
              <div>
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
        </main>
        <Footer />
      </div>
    </section>
  );
};

export default OrderCheckout;
