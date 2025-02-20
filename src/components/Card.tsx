import React, { useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { theme } from "@/styles/theme";

interface CardProps {
  image: string;
  title: string;
  description: string;
  longDescription?: string;
  price?: string;
  onClick?: () => void;
  isFeatured?: boolean;
}

const Card: React.FC<CardProps> = ({ image, title, description, longDescription, price, onClick, isFeatured }) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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
            style={{ backgroundColor: "white" }}
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart className="w-5 h-5" style={{ color: isWishlist ? theme.colors.primary : "gray" }} />
          </button>
        )}

        {hovered && (
          <button
            className="absolute bottom-3 right-3 p-2 rounded-full shadow-md hover:opacity-75 transition"
            style={{ backgroundColor: "white" }}
            onClick={() => setIsInCart(!isInCart)}
          >
            <ShoppingCart className="w-5 h-5" style={{ color: isInCart ? theme.colors.textPrimary : "gray" }} />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col items-center">
        <h3 className="font-bold mb-2" style={{ color: theme.colors.primary, fontFamily: theme.fonts.serif[0] }}>
          {title}
        </h3>
        <p className="text-sm mb-4" style={{ color: theme.colors.secondary, fontFamily: theme.fonts.sans[0] }}>
          {description}
        </p>
        {price && (
          <p className="text-lg font-semibold mb-4" style={{ color: theme.colors.accent, fontFamily: theme.fonts.sans[0] }}>
            {price}
          </p>
        )}

        {/* Quick Buy Button */}
        {isFeatured && (
          <button
            onClick={onClick}
            className="w-full py-3 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: theme.colors.accent,
              color: "white",
              fontFamily: theme.fonts.sans[0],
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.colors.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.colors.accent)}
          >
            Quick Buy
          </button>
        )}

        {/* Quick Preview Button */}
        <button
          onClick={() => setShowPreview(true)}
          className="w-full py-3 rounded-lg mt-2 transition-all duration-300"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="p-12 rounded-lg shadow-lg w-[900px] max-w-full" style={{ backgroundColor: "white" }}>
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold" style={{ color: theme.colors.primary, fontFamily: theme.fonts.serif[0] }}>
                {title}
              </h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <img src={image} alt={title} className="w-full h-96 object-cover mt-4 rounded" />
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "gray", fontFamily: theme.fonts.sans[0] }}>
              {longDescription || description}
            </p>
            {price && (
              <p className="text-2xl font-semibold mt-4" style={{ color: theme.colors.primary, fontFamily: theme.fonts.sans[0] }}>
                {price}
              </p>
            )}

            <div className="mt-8 flex justify-between">
              <button
                className="px-8 py-4 rounded transition text-lg"
                style={{ backgroundColor: "#D3D3D3", color: theme.colors.textPrimary, fontFamily: theme.fonts.sans[0] }}
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
