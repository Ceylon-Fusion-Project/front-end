// import { useState } from "react";
// import { Star, Heart, Minus, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { tokens } from "@/styles/tokens";
// import { theme } from "@/styles/theme";

// interface ProductInfoProps {
//   name: string;
//   brand: string;
//   rating: number;
//   reviewCount: number;
//   price: number;
//   originalPrice: number;
//   description: string;
// }

// export function ProductInfo({
//   name,
//   brand,
//   rating,
//   reviewCount,
//   price,
//   originalPrice,
//   description,
// }: ProductInfoProps) {
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className={`space-y-4 md:space-y-6 ${tokens.fonts.body}`}>
//       {/* Product Name and Brand */}
//       <div className="space-y-2">
//         <h1
//           //className={`${tokens.fontSizes["2xl"]} md:${tokens.fontSizes["3xl"]} lg:${tokens.fontSizes["4xl"]} font-bold ${tokens.fonts.heading}`}
//           className="text-4xl md:text-4xl lg:text-5xl font-extrabold"
//           style={{ color: theme.colors.textPrimary }}
//         >
//           {name}
//         </h1>
//         <p 
//           className="text-lg font-semibold"
//           style={{ color: theme.colors.textSecondary }}
//         >
//           {brand}
//         </p>
//       </div>

//       {/* Ratings and Reviews */}
//       <div className="flex flex-wrap items-center gap-2 md:gap-4">
//         <div className="flex">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <Star
//               key={i}
//               className={`h-5 w-5 ${
//                 i <= rating
//                   ? `text-yellow-500 fill-current`
//                   : `text-[#4c381e]`
//               }`}
//             />
//           ))}
//         </div>
//         <span className="text-base "
//           style={{ color: theme.colors.textPrimary }}
//         >
//           {rating}/5 - {reviewCount} Reviews
//         </span>
//       </div>

//       {/* Pricing Section */}
//       <div className="space-y-1 md:space-y-2">
//         <p className={`text-2xl md:text-3xl font-bold text-green-600`}>
//           ${price.toFixed(2)}
//         </p>
//         <p className={`text-[${tokens.colors.textLight}] line-through`}>
//           ${originalPrice.toFixed(2)}
//         </p>
//         <p className={`text-red-500 font-semibold`}>
//           -{((1 - price / originalPrice) * 100).toFixed(0)}% Off
//         </p>
//       </div>

//       {/* Stock Info */}
//       <p className={`text-green-600 font-semibold`}>In Stock</p>

//       {/* Product Description */}
//       <p 
//         className="text-lg lg:text-xl"
//         style={{ color: theme.colors.textPrimary }}
//       >
//         {description}
//       </p>

//       {/* Quantity Selector */}
//       <div className="space-y-4 pt-4">
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setQuantity(Math.max(1, quantity - 1))}
//             className={`h-8 w-8 md:h-10 md:w-10 transition duration-200 ease-in-out`}
//           >
//             <Minus className={`h-4 w-4 text-gray-700`} />
//           </Button>
//           <span className="text-lg md:text-xl font-semibold w-8 text-center text-[#4c381e]">
//             {quantity}
//           </span>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setQuantity(quantity + 1)}
//             className={`h-8 w-8 md:h-10 md:w-10 transition duration-200 ease-in-out`}
//           >
//             <Plus className={`h-4 w-4 text-gray-700`} />
//           </Button>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Add to Cart Button */}
//           <Button
//             size="lg"
//             className={`w-full bg-green-600 text-white hover:bg-green-700 transition duration-200 ease-in-out`}
//           >
//             Add to Cart
//           </Button>

//           {/* Buy Now Button */}
//           <Button
//             size="lg"
//             className={`w-full bg-orange-500 text-white hover:bg-orange-600 transition duration-200 ease-in-out`}
//           >
//             Buy Now
//           </Button>
//         </div>

//         {/* Wishlist Button */}
//         <Button
//           variant="outline"
//           className={`w-full border-[#291e10] text-[#4c381e] hover:bg-[#f0e6d9] transition duration-200 ease-in-out`}
//         >
//           <Heart className={`h-5 w-5 mr-2 text-red-500`} />
//           Add to Wishlist
//         </Button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Star, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tokens } from "@/styles/tokens";
import { theme } from "@/styles/theme";
import api from "../api/axiosInstance";
import { v4 as uuidv4 } from "uuid"; // Import UUID for idempotency key
import NotificationService from "@/utils/NotificationService";

interface ProductInfoProps {
  name: string;
  brand: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  description: string;
  productId: number;
  //userId: number; // User ID should be passed dynamically
}

export function ProductInfo({
  name,
  brand,
  rating,
  reviewCount,
  price,
  originalPrice,
  description,
  productId,
  //userId,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [idempotencyKey] = useState<string>(uuidv4()); // Generate only once

  // Function to handle Add to Cart
  const handleAddToCart = async () => {
    if (quantity < 1) {
      NotificationService.warning("Quantity must be greater than zero");
      return;
    }

    setLoading(true);

    // ✅ Construct Request Body Properly
    const requestBody = {
      userId:3, // Dynamically passed user ID
      cartItem: {
        productId,
        cartItemQuantity: quantity,
        cartItemPrice: price * quantity,
      },
    };

    console.log("🛒 Sending Add to Cart request:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await api.post(
        "/cart/add-item-to-cart",
        requestBody,
        {
          headers: {
            "X-Idempotency-Key": idempotencyKey, // Prevent duplicate requests
          },
        }
      );

      console.log("✅ Add to Cart Response:", response);

      if (response?.status === 200 || response?.status === 201) {
        NotificationService.success("Item added to cart successfully!");
      } else {
        NotificationService.error("Unexpected response from server.");
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("❌ Add to Cart Error:", error);

      if ((error as any).response) {
        console.error("❌ Axios Error Response:", (error as any).response?.data);
        NotificationService.error(`Failed to add item: ${(error as any).response?.data?.message || "Unknown error"}`);
      } else {
        NotificationService.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-4 md:space-y-6 ${tokens.fonts.body}`}>
      {/* Product Name and Brand */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: theme.colors.textPrimary }}>
          {name}
        </h1>
        <p className="text-lg font-semibold" style={{ color: theme.colors.textSecondary }}>
          {brand}
        </p>
      </div>

      {/* Ratings and Reviews */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className={`h-5 w-5 ${i <= rating ? `text-yellow-500 fill-current` : `text-[#4c381e]`}`} />
          ))}
        </div>
        <span className="text-base " style={{ color: theme.colors.textPrimary }}>
          {rating}/5 - {reviewCount} Reviews
        </span>
      </div>

      {/* Pricing Section */}
      <div className="space-y-1 md:space-y-2">
        <p className={`text-2xl md:text-3xl font-bold text-green-600`}>${price.toFixed(2)}</p>
        <p className={`text-[${tokens.colors.textLight}] line-through`}>${originalPrice.toFixed(2)}</p>
        <p className={`text-red-500 font-semibold`}>-{((1 - price / originalPrice) * 100).toFixed(0)}% Off</p>
      </div>

      {/* Stock Info */}
      <p className={`text-green-600 font-semibold`}>In Stock</p>

      {/* Product Description */}
      <p className="text-lg lg:text-xl" style={{ color: theme.colors.textPrimary }}>
        {description}
      </p>

      {/* Quantity Selector */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className={`h-8 w-8 md:h-10 md:w-10 transition duration-200 ease-in-out`}
          >
            <Minus className={`h-4 w-4 text-gray-700`} />
          </Button>
          <span className="text-lg md:text-xl font-semibold w-8 text-center text-[#4c381e]">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className={`h-8 w-8 md:h-10 md:w-10 transition duration-200 ease-in-out`}
          >
            <Plus className={`h-4 w-4 text-gray-700`} />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Add to Cart Button */}
          <Button
            size="lg"
            className={`w-full bg-green-600 text-white hover:bg-green-700 transition duration-200 ease-in-out`}
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>

          {/* Buy Now Button */}
          <Button size="lg" className={`w-full bg-orange-500 text-white hover:bg-orange-600 transition duration-200 ease-in-out`}>
            Buy Now
          </Button>
        </div>

        {/* Wishlist Button */}
        <Button variant="outline" className={`w-full border-[#291e10] text-[#4c381e] hover:bg-[#f0e6d9] transition duration-200 ease-in-out`}>
          <Heart className={`h-5 w-5 mr-2 text-red-500`} />
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
}

