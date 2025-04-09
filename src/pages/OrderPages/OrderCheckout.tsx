// import React, { useState } from "react";
// import OrderSummary from "../../components/OrderCheckoutComponents/OrderSummary";
// import ShippingInfoForm from "../../components/OrderCheckoutComponents/ShippingInfo";
// import PlaceOrderButton from "../../components/OrderCheckoutComponents/PlaceOrderButton";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/footer";

// interface Item {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface ShippingInfo {
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   zip: string;
//   country: string;
//   phone: string;
// }

// const sampleItems: Item[] = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 99.99,
//     quantity: 1,
//     image: "https://via.placeholder.com/60",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 49.99,
//     quantity: 2,
//     image: "https://via.placeholder.com/60",
//   },
// ];

// const OrderCheckout: React.FC = () => {
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: "",
//   });

//   const subtotal = sampleItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const shippingCost = 5.99;
//   const tax = 15.0;

//   const handleShippingInfoChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setShippingInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Handle form submission, e.g., send data to the server
//     console.log("Shipping Info Submitted:", shippingInfo);
//   };

//   return (
//     <section className="mt-5 pt-3">
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow bg-white p-6">
//           <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Shipping Information Form */}
//               <div>
//                 <ShippingInfoForm
//                   shippingInfo={shippingInfo}
//                   onChange={handleShippingInfoChange}
//                   onSubmit={handleSubmit}
//                 />
//               </div>

//               {/* Order Summary */}
//               <div>
//                 <OrderSummary
//                   items={sampleItems}
//                   subtotal={subtotal}
//                   shippingCost={shippingCost}
//                   tax={tax}
//                 />
//               </div>
//             </div>

//             {/* Final Checkout Button */}
//             <PlaceOrderButton onClick={handleSubmit} />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </section>
//   );
// };

// export default OrderCheckout;

import React, { useEffect, useState } from "react";
import OrderSummary from "../../components/OrderCheckoutComponents/OrderSummary";
import ShippingInfoForm from "../../components/OrderCheckoutComponents/ShippingInfo";
import PlaceOrderButton from "../../components/OrderCheckoutComponents/PlaceOrderButton";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import api from "@/api/axiosInstance";
import NotificationService from "@/utils/NotificationService";
import { getUserID } from "@/services/user-service/userService";

interface Item {
  id: number;
  productId: number;
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

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const userResponse = await getUserID();
        const fetchedUserId = userResponse.data?.userId;

        if (!fetchedUserId) {
          throw new Error("User ID not found");
        }

        setUserId(fetchedUserId);

        const cartResponse = await api.get("/aggregated-cart/merged-cart-details", {
          params: { userId: fetchedUserId },
        });

        setItems(cartResponse.data.cart); // Ensure your API returns items in 'cart' key
      } catch (error) {
        console.error(error);
        NotificationService.error("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 5.99;
  const tax = 0.15 * subtotal;

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
    console.log("Shipping Info Submitted:", shippingInfo);
    // You can also send the data to your backend here
  };

  return (
    <section className="mt-5 pt-3">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-white p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ShippingInfoForm
                  shippingInfo={shippingInfo}
                  onChange={handleShippingInfoChange}
                  onSubmit={handleSubmit}
                />
              </div>
              <div>
                {loading ? (
                  <p>Loading order summary...</p>
                ) : items.length > 0 ? (
                  <OrderSummary
                    items={items}
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    tax={tax}
                  />
                ) : (
                  <p>No items in cart.</p>
                )}
              </div>
            </div>

            <PlaceOrderButton onClick={handleSubmit} />
          </div>
        </main>
        <Footer />
      </div>
    </section>
  );
};

export default OrderCheckout;
