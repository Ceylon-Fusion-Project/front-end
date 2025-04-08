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
  roomID?: number;
  eventID?: number;
  packageDetails?: {
    rooms?: any[];
    events?: any[];
  };
  rating?: number;
  amenities?: string[];
  availability?: boolean;
  onViewMoreDetails?: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  longDescription,
  price,
  onClick,
  isFeatured = false,
  packageID,
  roomID,
  eventID,
  packageDetails,
  onViewMoreDetails
}) => {
  const [hovered, setHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const isPackageCard = !!packageID;
  const isAccommodationCard = !!roomID;
  const isExperienceCard = !!eventID;

  const handleViewMoreDetails = () => {
    console.log("Navigating with:", { packageID, roomID, eventID });
    if (onViewMoreDetails) {
      onViewMoreDetails();
    } else if (eventID) {
      navigate(`/booking/event/${eventID}`);
    } else if (roomID) {
      navigate(`/booking/room/${roomID}`);
    } else if (packageID) {
      navigate(`/booking/package/${packageID}`);
    } else {
      console.error("No valid ID provided for navigation");
    }
  };

  const cardTypeLabel = isPackageCard
    ? "Package"
    : isAccommodationCard
    ? "Accommodation"
    : isExperienceCard
    ? "Experience"
    : "Unknown";

  return (
    <div
      className={`relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl`}
      style={{ backgroundColor: "white" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute px-2 py-1 text-xs font-semibold text-white rounded top-2 left-2"
        style={{ backgroundColor: "#56ab91" }}
      >
        {isFeatured ? `Featured ${cardTypeLabel}` : cardTypeLabel}
      </span>

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
              style={{ color: isWishlist ? "#4d9a83" : "#346757" }}
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
              style={{ color: isInCart ? "#4d9a83" : "#346757" }}
            />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center p-6">
        <h3
          className="mb-2 font-bold"
          style={{
            color: "#22443a",
            fontFamily: theme.fonts.sans[0],
          }}
        >
          {title}
        </h3>
        <p
          className="mb-4 text-sm text-center"
          style={{
            color: "#3c7866",
            fontFamily: theme.fonts.sans[0],
          }}
        >
          {description}
        </p>
        {price && (
          <p
            className="mb-4 text-lg font-semibold"
            style={{
              color: isFeatured ? "#56ab91" : "#09110e",
              fontFamily: theme.fonts.sans[0],
            }}
          >
            {price}
          </p>
        )}

        {isFeatured && (
          <button
            onClick={onClick}
            className="w-full py-3 transition-all duration-300 rounded-lg hover:bg-[#346757]"
            style={{
              backgroundColor: "#56ab91",
              color: "white",
              fontFamily: theme.fonts.sans[0],
            }}
          >
            Quick Book
          </button>
        )}

        <button
          onClick={() => setShowPreview(true)}
          className="w-full py-3 transition-all duration-300 rounded-lg bg-[#2b5649] text-[#bbddd3] hover:bg-[#3c7866]"
          style={{
            fontFamily: theme.fonts.sans[0],
          }}
        >
          Quick Preview
        </button>
      </div>

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
              className="object-cover w-full mt-2 rounded h-80"
            />
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
            >
              {longDescription || description}
            </p>

            {packageDetails && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {(isPackageCard || isAccommodationCard) &&
                  packageDetails.rooms &&
                  packageDetails.rooms.length > 0 && (
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
                          <li key={index}>
                            {room.name || `${room.roomType} Room ${room.roomNumber}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {(isPackageCard || isExperienceCard) &&
                  packageDetails.events &&
                  packageDetails.events.length > 0 && (
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
                View More Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;