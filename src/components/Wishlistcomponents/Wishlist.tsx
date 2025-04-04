import React, { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import api from "@/api/axiosInstance";
import NotificationService from "@/utils/NotificationService";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  productId: number;
}

interface WishlistResponse {
  wishlist: Item[];
}

const userId = 3; // Replace with dynamic user context later

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [idempotencyKeyMap] = useState<{ [key: number]: string }>(() => ({}));


  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get<WishlistResponse>(
          "/aggregated-wishlist/merged-wishlist",
          {
            params: { userId },
          }
        );
        console.log("Fetched wishlist response:", response.data);
        setItems(response.data.wishlist);
      } catch (error: any) {
        console.error("Error fetching wishlist:", error);
        NotificationService.error("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = async (productId: number) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
  
    const idempotencyKey =
      idempotencyKeyMap[productId] || (idempotencyKeyMap[productId] = uuidv4());
  
    const requestBody = {
      userId,
      cartItem: {
        productId: item.productId,
        cartItemQuantity: 1,
        cartItemPrice: item.price,
      },
    };
  
    try {
      const response = await api.post("/cart/add-item-to-cart", requestBody, {
        headers: {
          "X-Idempotency-Key": idempotencyKey,
        },
      });
  
      if (response?.status === 200 || response?.status === 201) {
        NotificationService.success("Item added to cart successfully!");
      } else {
        NotificationService.error("Unexpected server response.");
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error?.response?.data?.message) {
        NotificationService.error(error.response.data.message);
      } else {
        NotificationService.error("Network error. Please try again.");
      }
    }
  };  

  const handleRemove = (productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );

    // Optional: call backend to remove from wishlist
    api
      .post("/wishlist/remove-item-from-wishlist", {
        userId,
        productId,
      })
      .then(() => NotificationService.success("Removed from wishlist"))
      .catch(() => NotificationService.error("Failed to remove item"));
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-0 px-4 min-h-[300px] text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaHeart className="text-red-500 text-2xl" />
        <h2 className="text-3xl font-bold text-gray-800">My Wishlist</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl">
          <FaHeart className="text-gray-300 text-5xl mb-4" />
          <p className="text-gray-500 text-xl mb-2">Your wishlist is empty</p>
          <p className="text-gray-400 mb-6">
            Save your favorite products to start planning your next purchase
          </p>
          <button
            onClick={() => navigate("/products/product-marketplace")}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FaShoppingBag />
            <span>Explore Products</span>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <WishlistItem
                id={item.productId}
                name={item.name}
                price={item.price}
                image={item.image}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </motion.div>
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   className="flex gap-6 overflow-x-auto px-6 py-4 w-full max-w-[95%] mx-auto hide-scrollbar"
        // >
        //   {items.map((item, index) => (
        //     <motion.div
        //       key={item.productId}
        //       initial={{ opacity: 0, y: 20 }}
        //       animate={{ opacity: 1, y: 0 }}
        //       transition={{ delay: index * 0.1 }}
        //       className="min-w-[260px] max-w-[260px] flex-shrink-0"
        //     >
        //       <WishlistItem
        //         id={item.productId}
        //         name={item.name}
        //         price={item.price}
        //         image={item.image}
        //         onRemove={handleRemove}
        //         onAddToCart={handleAddToCart}
        //       />
        //     </motion.div>
        //   ))}
        // </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
