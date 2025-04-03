import React, { useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  longDescription?: string;
  price?: string;
  onClick?: () => void;
  isFeatured?: boolean;
  packageID?: number;
  packageDetails?: {
    rooms: any[];
    events: any[];
  };
}

const ListCard: React.FC<CardProps> = ({
  image,
  title,
  description,
  longDescription,
  price,
  onClick,
  isFeatured = false,
  packageID,
  packageDetails,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const handleViewMoreDetails = () => {
    if (packageID) {
      navigate(`/packages/package-details/${packageID}`);
    }
  };

  return (
    <div
      className="flex overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl"
      style={{ backgroundColor: "white" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative w-1/3 h-72">
        <img src={image} alt={title} className="object-cover w-full h-full" />

        {/* Featured Badge */}
        {isFeatured && (
          <span
            className="absolute px-2 py-1 text-xs font-semibold text-white rounded top-2 left-2"
            style={{ backgroundColor: "#56ab91" }}
          >
            Featured
          </span>
        )}

        {hovered && (
          <div className="absolute flex gap-2 top-3 right-3">
            <button
              className="p-2 transition rounded-full shadow-md hover:opacity-75"
              style={{ backgroundColor: "white" }}
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <Heart
                className="w-5 h-5"
                style={{ color: isWishlist ? "#4d9a83" : "#346757" }}
              />
            </button>
            <button
              className="p-2 transition rounded-full shadow-md hover:opacity-75"
              style={{ backgroundColor: "white" }}
              onClick={() => setIsInCart(!isInCart)}
            >
              <ShoppingCart
                className="w-5 h-5"
                style={{ color: isInCart ? "#4d9a83" : "#346757" }}
              />
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between w-2/3 p-6">
        <div>
          <h3
            className="mb-2 text-3xl font-bold"
            style={{
              color: "#22443a",
              fontFamily: theme.fonts.serif[0],
            }}
          >
            {title}
          </h3>
          <p
            className="mb-4 text-md"
            style={{
              color: "#3c7866",
              fontFamily: theme.fonts.sans[0],
            }}
          >
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {price && (
            <p
              className="text-2xl font-semibold"
              style={{
                color: isFeatured ? "#56ab91" : "#09110e",
                fontFamily: theme.fonts.sans[0],
              }}
            >
              {price}
            </p>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 transition-all duration-300 rounded-lg bg-[#2b5649] text-[#bbddd3] hover:bg-[#3c7866]"
              style={{
                fontFamily: theme.fonts.sans[0],
              }}
            >
              Quick Preview
            </button>

            {isFeatured && (
              <button
                onClick={onClick}
                className="px-4 py-2 transition-all duration-300 rounded-lg hover:bg-[#346757]"
                style={{
                  backgroundColor: "#56ab91",
                  color: "white",
                  fontFamily: theme.fonts.sans[0],
                }}
              >
                Quick Book
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal (same as grid view) */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="p-12 rounded-lg shadow-lg w-[900px] max-w-full"
            style={{ backgroundColor: "white" }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-4xl font-bold"
                style={{
                  color: "#22443a",
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
              className="object-cover w-full mt-2 rounded h-96"
            />
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
            >
              {longDescription || description}
            </p>

            {packageDetails && (
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {packageDetails.rooms && packageDetails.rooms.length > 0 && (
                    <div>
                      <h4
                        className="text-lg font-semibold"
                        style={{
                          color: "#22443a",
                          fontFamily: theme.fonts.sans[0],
                        }}
                      >
                        Accommodations:
                      </h4>
                      <ul className="pl-5 list-disc" style={{ color: "#3c7866" }}>
                        {packageDetails.rooms.map((room, index) => (
                          <li key={index}>{room.name || `${room.roomType} Room ${room.roomNumber}`}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {packageDetails.events && packageDetails.events.length > 0 && (
                    <div>
                      <h4
                        className="text-lg font-semibold"
                        style={{
                          color: "#22443a",
                          fontFamily: theme.fonts.sans[0],
                        }}
                      >
                        Events:
                      </h4>
                      <ul className="pl-5 list-disc" style={{ color: "#3c7866" }}>
                        {packageDetails.events.map((event, index) => (
                          <li key={index}>{event.name || event.eventName}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {price && (
              <p
                className="mt-4 text-2xl font-semibold"
                style={{
                  color: "#11221d",
                  fontFamily: theme.fonts.sans[0],
                }}
              >
                {price}
              </p>
            )}

            <div className="flex justify-between mt-4">
              <button
                className="px-8 py-3 text-lg transition rounded bg-[#2b5649] text-[#bbddd3] hover:bg-[#3c7866]"
                style={{
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

export default ListCard;