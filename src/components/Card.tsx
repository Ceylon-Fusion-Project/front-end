// import React, { useState } from "react";
// import { Heart, ShoppingCart, X } from "lucide-react";
// import { theme } from "@/styles/theme";
// import { useNavigate } from "react-router-dom";

// interface CardProps {
//   image: string;
//   title: string;
//   description: string;
//   longDescription?: string;
//   price?: string;
//   onClick?: () => void;
//   isFeatured?: boolean;
// }

// const Card: React.FC<CardProps> = ({
//   image,
//   title,
//   description,
//   longDescription,
//   price,
//   onClick,
//   isFeatured,
// }) => {
//   const [hovered, setHovered] = useState(false);
//   const [isWishlist, setIsWishlist] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);

//   const navigate = useNavigate();

//   // Navigate to Marketplace when "Shop Now" is clicked
//   const handleViewMoreDetails = () => {
//     navigate("/products/product-details/1");
//   };

//   return (
//     <div
//       className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl"
//       style={{ backgroundColor: theme.colors.background }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="relative">
//         <img src={image} alt={title} className="object-cover w-full h-48" />

//         {hovered && (
//           <button
//             className="absolute p-2 transition rounded-full shadow-md top-3 right-3 hover:opacity-75"
//             style={{ backgroundColor: "white" }}
//             onClick={() => setIsWishlist(!isWishlist)}
//           >
//             <Heart
//               className="w-5 h-5"
//               style={{ color: isWishlist ? theme.colors.primary : "gray" }}
//             />
//           </button>
//         )}

//         {hovered && (
//           <button
//             className="absolute p-2 transition rounded-full shadow-md bottom-3 right-3 hover:opacity-75"
//             style={{ backgroundColor: "white" }}
//             onClick={() => setIsInCart(!isInCart)}
//           >
//             <ShoppingCart
//               className="w-5 h-5"
//               style={{ color: isInCart ? theme.colors.textPrimary : "gray" }}
//             />
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col items-center p-6">
//         <h3
//           className="mb-2 font-bold"
//           style={{
//             color: theme.colors.primary,
//             fontFamily: theme.fonts.serif[0],
//           }}
//         >
//           {title}
//         </h3>
//         <p
//           className="mb-4 text-sm"
//           style={{
//             color: theme.colors.secondary,
//             fontFamily: theme.fonts.sans[0],
//           }}
//         >
//           {description}
//         </p>
//         {price && (
//           <p
//             className="mb-4 text-lg font-semibold"
//             style={{
//               color: theme.colors.accent,
//               fontFamily: theme.fonts.sans[0],
//             }}
//           >
//             {price}
//           </p>
//         )}

//         {isFeatured && (
//           <button
//             onClick={onClick}
//             className="w-full py-3 transition-all duration-300 rounded-lg"
//             style={{
//               backgroundColor: theme.colors.accent,
//               color: "white",
//               fontFamily: theme.fonts.sans[0],
//             }}
//           >
//             Quick Buy
//           </button>
//         )}

//         <button
//           onClick={() => setShowPreview(true)}
//           className="w-full py-3 mt-2 transition-all duration-300 rounded-lg"
//           style={{
//             backgroundColor: "#E5E5E5",
//             color: theme.colors.textPrimary,
//             fontFamily: theme.fonts.sans[0],
//           }}
//         >
//           Quick Preview
//         </button>
//       </div>

//       {showPreview && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div
//             className="p-12 rounded-lg shadow-lg w-[900px] max-w-full"
//             style={{ backgroundColor: "white" }}
//           >
//             <div className="flex items-center justify-between">
//               <h2
//                 className="text-4xl font-bold"
//                 style={{
//                   color: theme.colors.primary,
//                   fontFamily: theme.fonts.serif[0],
//                 }}
//               >
//                 {title}
//               </h2>
//               <button
//                 onClick={() => setShowPreview(false)}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <img
//               src={image}
//               alt={title}
//               className="object-cover w-full mt-4 rounded h-96"
//             />
//             <p
//               className="mt-6 text-lg leading-relaxed"
//               style={{ color: "gray", fontFamily: theme.fonts.sans[0] }}
//             >
//               {longDescription || description}
//             </p>
//             {price && (
//               <p
//                 className="mt-4 text-2xl font-semibold"
//                 style={{
//                   color: theme.colors.primary,
//                   fontFamily: theme.fonts.sans[0],
//                 }}
//               >
//                 {price}
//               </p>
//             )}

//             <div className="flex justify-between mt-8">
//               <button
//                 className="px-8 py-4 text-lg transition rounded"
//                 style={{
//                   backgroundColor: "#D3D3D3",
//                   color: theme.colors.textPrimary,
//                   fontFamily: theme.fonts.sans[0],
//                 }}
//                 onClick={handleViewMoreDetails}
//               >
//                 View more details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;

// import React, { useState } from "react";
// import { Heart, ShoppingCart, X } from "lucide-react";
// import { theme } from "@/styles/theme";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance"; // Adjust path as needed

// interface CardProps {
//   image: string; // Image URL from backend
//   title: string;
//   description: string;
//   longDescription?: string;
//   price?: string;
//   onClick?: () => void;
//   isFeatured?: boolean;
//   productID?: number; // Add productID for navigation
// }

// const Card: React.FC<CardProps> = ({
//   image,
//   title,
//   description,
//   longDescription,
//   price,
//   onClick,
//   isFeatured,
//   productID,
// }) => {
//   const [hovered, setHovered] = useState(false);
//   const [isWishlist, setIsWishlist] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);

//   const navigate = useNavigate();

//   // Navigate to product details using productID
//   const handleViewMoreDetails = () => {
//     if (productID) {
//       navigate(`/products/product-details/${productID}`);
//     }
//   };

//   return (
//     <div
//       className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl"
//       style={{ backgroundColor: theme.colors.background }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="relative">
//         <img src={image} alt={title} className="object-cover w-full h-48" />

//         {hovered && (
//           <button
//             className="absolute p-2 transition rounded-full shadow-md top-3 right-3 hover:opacity-75"
//             style={{ backgroundColor: "white" }}
//             onClick={() => setIsWishlist(!isWishlist)}
//           >
//             <Heart
//               className="w-5 h-5"
//               style={{ color: isWishlist ? theme.colors.primary : "gray" }}
//             />
//           </button>
//         )}

//         {hovered && (
//           <button
//             className="absolute p-2 transition rounded-full shadow-md bottom-3 right-3 hover:opacity-75"
//             style={{ backgroundColor: "white" }}
//             onClick={() => setIsInCart(!isInCart)}
//           >
//             <ShoppingCart
//               className="w-5 h-5"
//               style={{ color: isInCart ? theme.colors.textPrimary : "gray" }}
//             />
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col items-center p-6">
//         <h3
//           className="mb-2 font-bold"
//           style={{
//             color: theme.colors.primary,
//             fontFamily: theme.fonts.serif[0],
//           }}
//         >
//           {title}
//         </h3>
//         <p
//           className="mb-4 text-sm text-center"
//           style={{
//             color: theme.colors.secondary,
//             fontFamily: theme.fonts.sans[0],
//           }}
//         >
//           {description}
//         </p>
//         {price && (
//           <p
//             className="mb-4 text-lg font-semibold"
//             style={{
//               color: theme.colors.accent,
//               fontFamily: theme.fonts.sans[0],
//             }}
//           >
//             {price}
//           </p>
//         )}

//         {isFeatured && (
//           <button
//             onClick={onClick}
//             className="w-full py-3 transition-all duration-300 rounded-lg"
//             style={{
//               backgroundColor: theme.colors.accent,
//               color: "white",
//               fontFamily: theme.fonts.sans[0],
//             }}
//           >
//             Quick Buy
//           </button>
//         )}

//         <button
//           onClick={() => setShowPreview(true)}
//           className="w-full py-3 mt-2 transition-all duration-300 rounded-lg"
//           style={{
//             backgroundColor: "#E5E5E5",
//             color: theme.colors.textPrimary,
//             fontFamily: theme.fonts.sans[0],
//           }}
//         >
//           Quick Preview
//         </button>
//       </div>

//       {showPreview && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div
//             className="p-12 rounded-lg shadow-lg w-[900px] max-w-full bg-white"
//           >
//             <div className="flex items-center justify-between">
//               <h2
//                 className="text-4xl font-bold"
//                 style={{
//                   color: theme.colors.primary,
//                   fontFamily: theme.fonts.serif[0],
//                 }}
//               >
//                 {title}
//               </h2>
//               <button
//                 onClick={() => setShowPreview(false)}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <img
//               src={image}
//               alt={title}
//               className="object-cover w-full mt-4 rounded h-96"
//             />
//             <p
//               className="mt-6 text-lg leading-relaxed"
//               style={{ color: "gray", fontFamily: theme.fonts.sans[0] }}
//             >
//               {longDescription || description}
//             </p>
//             {price && (
//               <p
//                 className="mt-4 text-2xl font-semibold"
//                 style={{
//                   color: theme.colors.primary,
//                   fontFamily: theme.fonts.sans[0],
//                 }}
//               >
//                 {price}
//               </p>
//             )}

//             <div className="flex justify-between mt-8">
//               <button
//                 className="px-8 py-4 text-lg transition rounded"
//                 style={{
//                   backgroundColor: "#D3D3D3",
//                   color: theme.colors.textPrimary,
//                   fontFamily: theme.fonts.sans[0],
//                 }}
//                 onClick={handleViewMoreDetails}
//               >
//                 View more details
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;

import React, { useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // Import axios instance

interface CardProps {
  image: string;
  title: string;
  description: string;
  longDescription?: string;
  price?: string;
  onClick?: () => void;
  isFeatured?: boolean;
  productID?: number;
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

  const navigate = useNavigate();

  // Navigate to product details using productID
  const handleViewMoreDetails = () => {
    if (productID) {
      navigate(`/products/product-details/${productID}`);
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
      className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl"
      style={{ backgroundColor: theme.colors.background }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative">
        <img src={image} alt={title} className="object-cover w-full h-48" />

        {hovered && (
          <button
            className="absolute p-2 transition rounded-full shadow-md top-3 right-3 hover:opacity-75"
            style={{ backgroundColor: "white" }}
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
            className="absolute p-2 transition rounded-full shadow-md bottom-3 right-3 hover:opacity-75"
            style={{ backgroundColor: "white" }}
            onClick={() => setIsInCart(!isInCart)}
          >
            <ShoppingCart
              className="w-5 h-5"
              style={{ color: isInCart ? theme.colors.textPrimary : "gray" }}
            />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center p-6">
        <h3
          className="mb-2 font-bold"
          style={{
            color: theme.colors.primary,
            fontFamily: theme.fonts.serif[0],
          }}
        >
          {title}
        </h3>
        <p
          className="mb-4 text-sm text-center"
          style={{
            color: theme.colors.secondary,
            fontFamily: theme.fonts.sans[0],
          }}
        >
          {description}
        </p>
        {price && (
          <p
            className="mb-4 text-lg font-semibold"
            style={{
              color: theme.colors.accent,
              fontFamily: theme.fonts.sans[0],
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
              fontFamily: theme.fonts.sans[0],
            }}
            disabled={isBuying}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.colors.accent)}
          >
            {isBuying ? "Placing Order..." : "Quick Buy"}
          </button>
        )}

        {/* Quick Preview Button */}
        <button
          onClick={() => setShowPreview(true)}
          className="w-full py-3 mt-2 transition-all duration-300 rounded-lg"
          style={{
            backgroundColor: "#c4c0c0",
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.sans[0],
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.secondary)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c4c0c0")}
        >
          Quick Preview
        </button>
      </div>

      {/* Quick Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="p-12 rounded-lg shadow-lg w-[900px] max-w-full bg-white">
            <div className="flex items-center justify-between">
              <h2
                className="text-4xl font-bold"
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.serif[0],
                }}
              >
                {title}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <img
              src={image}
              alt={title}
              className="object-cover w-full mt-4 rounded h-96"
            />
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: "gray", fontFamily: theme.fonts.sans[0] }}
            >
              {longDescription || description}
            </p>
            {price && (
              <p
                className="mt-4 text-2xl font-semibold"
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.sans[0],
                }}
              >
                {price}
              </p>
            )}

            <div className="flex justify-between mt-8">
              <button
                className="px-8 py-4 text-lg transition rounded"
                style={{
                  backgroundColor: "#D3D3D3",
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.sans[0],
                }}
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
