// import React from "react";
// import { FaTrash } from "react-icons/fa"; // Import the trash icon from react-icons

// interface WishlistItemProps {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   onRemove: (id: number) => void;
//   onAddToCart: (id: number) => void;
// }

// const WishlistItem: React.FC<WishlistItemProps> = ({
//   id,
//   name,
//   price,
//   image,
//   onRemove,
//   onAddToCart,
// }) => {
//   return (
//     // <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-3 transition hover:shadow-md">
//     //   {/* Product Info */}
//     //   <div className="flex items-center w-full sm:w-1/2 gap-4 mb-3 sm:mb-0">
//     //     <img src={image} alt={name} className="w-16 h-16 object-cover rounded" />
//     //     <div>
//     //       <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
//     //       <p className="text-gray-500">${price.toFixed(2)}</p>
//     //     </div>
//     //   </div>

//     //   {/* Buttons */}
//     //   <div className="flex gap-3 w-full sm:w-auto justify-end">
//     //     <button
//     //       onClick={() => onAddToCart(id)}
//     //       className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition"
//     //     >
//     //       Add to Cart
//     //     </button>
//     //     <button
//     //       onClick={() => onRemove(id)}
//     //       className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
//     //     >
//     //       <FaTrash className="w-5 h-5" />
//     //     </button>
//     //   </div>
//     // </div>
//     <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center justify-between text-center">
//       <img
//         src={image}
//         alt={name}
//         className="w-24 h-24 object-cover rounded-lg mb-3"
//       />
//       <h3 className="text-md font-semibold text-gray-800 mb-1">{name}</h3>
//       <p className="text-sm text-gray-500 mb-3">${price.toFixed(2)}</p>
//       <div className="flex gap-2 mt-auto">
//         <button
//           onClick={() => onAddToCart(id)}
//           className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
//         >
//           Add to Cart
//         </button>
//         <button
//           onClick={() => onRemove(id)}
//           className="p-2 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full"
//           title="Remove"
//         >
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WishlistItem;

import React from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

interface WishlistItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  name,
  price,
  image,
  onRemove,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => onRemove(id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors duration-300"
          title="Remove from wishlist"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1 text-lg truncate">{name}</h3>
        <p className="font-bold text-xl text-[#b45309] mb-3">${price.toFixed(2)}</p> 
        <button
          onClick={() => onAddToCart(id)}
          className="w-full py-2.5 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 font-medium"
        >
          <FaShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;