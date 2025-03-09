import React, { useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Import axios instance
import { v4 as uuidv4 } from "uuid";
import NotificationService from "@/utils/NotificationService";

interface CardProps {
  image: string;
  title: string;
  description: string;
  longDescription?: string;
  price: string;
  isFeatured?: boolean;
  productID: number;
}

interface IdempotencyKeys {
  [productId: number]: { addToCartKey: string; removeFromCartKey: string };
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  longDescription,
  price,
  isFeatured,
  productID,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [idempotencyKeys, setIdempotencyKeys] = useState<IdempotencyKeys>({});
  const navigate = useNavigate();

  // ✅ Function to generate or retrieve idempotency keys for a product
  const getIdempotencyKeys = (productId: number) => {
    // Check if the key already exists in state
    if (idempotencyKeys[productId]) {
      return idempotencyKeys[productId]; // Return existing keys
    }
  
    // Generate new keys
    const newKeys = {
      addToCartKey: uuidv4(),
      removeFromCartKey: uuidv4(),
    };
  
    // Update state properly
    setIdempotencyKeys((prevKeys) => ({
      ...prevKeys,
      [productId]: newKeys,
    }));
  
    return newKeys; // Return new keys immediately
  };
  

  //Extract Price from String Price
  function extractPrice(value: string): number {
    // Remove all non-numeric characters except dots (for decimals)
    const numericString = value.replace(/[^0-9.]/g, "");
    // Convert to number
    return parseFloat(numericString);
  }

  // Navigate to product details using productID
  const handleViewMoreDetails = () => {
    if (productID) {
      navigate(`/products/product-details/${productID}`);
    }
  };

  // Add product to cart
  const addToCart = async () => {
    if (!productID) {
      NotificationService.error("Product ID is missing.");
      return;
    }

    setIsInCart(true);

    const { addToCartKey } = getIdempotencyKeys(productID);

    console.log("🛒 Using Idempotency Key:", addToCartKey);

    //Construct Request Body Properly
    const requestBody = {
      userId:5, // Dynamically passed user ID
      cartItem: {
        productId:productID,
        cartItemQuantity: 1,
        cartItemPrice: extractPrice(price),
      },
    };

    console.log("🛒 Sending Add to Cart request:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await api.post("/cart/add-item-to-cart", requestBody, {
        headers: {
          "X-Idempotency-Key": addToCartKey
        },
      });

      console.log("✅ Add to Cart Response:", response);

      if (response?.status === 200 || response?.status === 201) {
        NotificationService.success("Product added to cart successfully!");
      } else {
        NotificationService.error("Unexpected response from server.");
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      // Reset cart state if request fails
    setIsInCart(false);

      if ((error as any).response) {
        setIsInCart(false);
        console.error(
          "❌ Axios Error Response:",(error as any).response?.data);
        NotificationService.error(
          `Failed to add item: ${(error as any).response?.data?.message || "Unknown error"}`
        );
      } else {
        NotificationService.error("Network error. Please try again.");
      }
    }
  };

  // Remove product from cart
  const removeItemFromCart = async () => {
    if (!productID) {
      NotificationService.error("Product ID is missing.");
      return;
    }

    setIsInCart(false);

    const { removeFromCartKey } = getIdempotencyKeys(productID);

    console.log("🗑️ Using Remove Idempotency Key:", removeFromCartKey);

    const requestBody = {
      userId:5,
      productId:productID,
    };

    console.log("🗑️ Removing from cart:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await api.post("/cart/remove-item-from-cart",
      requestBody,
      {
        headers: {
          "X-Idempotency-Key": removeFromCartKey
        },
      });

      console.log("�� Remove from Cart Response:", response);

      if (response?.status === 200 || response?.status === 201) {
        NotificationService.success("Product removed from cart successfully!");
      }else{
        NotificationService.error("Unexpected response from server.");
        throw new Error("Unexpected response from server.");
      }
    } catch (error){
      console.error("Error removing from cart:", error);
      setIsInCart(true);
      if ((error as any).response) {
        console.error(
          "�� Axios Error Response:",(error as any).response?.data);
        NotificationService.error(
          `Failed to remove item: ${(error as any).response?.data?.message || "Unknown error"}`
        );
      } else {
        NotificationService.error("Network error. Please try again.");
      }
    }
  };

  // Handle Quick Buy using axiosInstance
  const handleQuickBuy = async () => {
    if (!productID) {
      alert("Product ID not found.");
      return;
    }

    setIsBuying(true);

    try {
      const response = await api.post("/orders/place-direct-order", {
        productID: productID,
        quantity: 1, // Assuming a default quantity
      });

      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again Later.");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      style={{ backgroundColor: theme.colors.background }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {hovered && (
          <button
            className="absolute top-3 right-3 p-2 rounded-full shadow-md hover:opacity-75 transition"
            style={{ backgroundColor: theme.colors.background }}
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart
              className="w-5 h-5"
              style={{ color: isWishlist ? theme.colors.primary : "gray" }}
            />
          </button>
        )}

        {hovered && (
          <button
            className="absolute bottom-3 right-3 p-2 rounded-full shadow-md hover:opacity-75 transition"
            style={{ backgroundColor: theme.colors.background }}
            onClick={isInCart? removeItemFromCart : addToCart}
          >
            <ShoppingCart
              className="w-5 h-5"
              style={{ color: isInCart ? theme.colors.textPrimary : "gray" }}
            />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col items-center">
        <h3
          className="font-bold mb-2"
          style={{
            color: theme.colors.textPrimary,
            //fontFamily: theme.fonts.body,
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm mb-4 text-center"
          style={{
            color: theme.colors.textSecondary,
            //fontFamily: theme.fonts.body,
          }}
        >
          {description}
        </p>
        {price && (
          <p
            className="text-lg font-semibold mb-4"
            style={{
              color: theme.colors.accent,
              //fontFamily: theme.fonts.body,
            }}
          >
            {price}
          </p>
        )}

        {/* Quick Buy Button */}
        {isFeatured && (
          <button
            onClick={handleQuickBuy}
            className={`w-full py-3 rounded-lg transition-all duration-300 ${
              isBuying ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: theme.colors.accent,
              color: "white",
              //fontFamily: theme.fonts.body,
            }}
            disabled={isBuying}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = theme.colors.primary)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = theme.colors.accent)
            }
          >
            {isBuying ? "Placing Order..." : "Quick Buy"}
          </button>
        )}

        {/* Quick Preview Button */}
        <button
          onClick={() => setShowPreview(true)}
          className="w-full py-3 rounded-lg mt-2 transition-all duration-300"
          style={{
            //backgroundColor: "#c4c0c0",
            backgroundColor: theme.colors.primary,
            color: theme.colors.textButton,
            //fontFamily: theme.fonts.body,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = theme.colors.secondary)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = theme.colors.primary)
          }
        >
          Quick Preview
        </button>
      </div>

      {/* Quick Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="p-12 rounded-lg shadow-lg w-[900px] max-w-full bg-white">
            <div className="flex justify-between items-center">
              <h2
                className="text-4xl font-bold"
                style={{
                  color: theme.colors.textPrimary,
                  //fontFamily: theme.fonts.body,
                }}
              >
                {title}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  color: theme.colors.textPrimary, // Use your theme color
                }}
                className="hover:opacity-75 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <img
              src={image}
              alt={title}
              className="w-full h-96 object-cover mt-4 rounded shadow-lg"
              //style={{ border: `2px solid ${theme.colors.accent}` }}
            />
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.body,
              }}
            >
              {longDescription || description}
            </p>
            {price && (
              <p
                className="text-2xl font-semibold mt-4"
                style={{
                  color: theme.colors.accent,
                  //fontFamily: theme.fonts.body,
                }}
              >
                {price}
              </p>
            )}

            <div className="mt-8 flex justify-between">
              <button
                className="w-full py-3 rounded-lg mt-2 transition-all duration-300"
                style={{
                  //backgroundColor: "#c4c0c0",
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.textButton,
                  //fontFamily: theme.fonts.body,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    theme.colors.secondary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = theme.colors.primary)
                }
                onClick={handleViewMoreDetails}
              >
                View more details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
