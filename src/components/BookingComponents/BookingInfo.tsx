import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { theme } from "@/styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { mockData } from "@/components/BookingComponents/BookingList";

interface BookingInfoProps {
  type: "package" | "room" | "event";
}

const BookingInfo: React.FC<BookingInfoProps> = ({ type }) => {
  const [isWishlist, setIsWishlist] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const getItemData = () => {
    if (!id) return null;
    const numberId = parseInt(id, 10);
    switch (type) {
      case "package":
        return mockData.packages.find((pkg) => pkg.packageId === numberId);
      case "room":
        return mockData.rooms.find((room) => room.roomId === numberId);
      case "event":
        return mockData.events.find((event) => event.eventId === numberId);
      default:
        return null;
    }
  };

  const item = getItemData();

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-xl text-gray-600">Item not found</p>
      </div>
    );
  }

  const handleBookNow = () => {
    if (type === "package" && "packageName" in item) {
      navigate(`/booking/package/${id}`);
      console.log(`Booking package: ${item.packageName} with ID: ${id}`);
    } else if (type === "room" && "roomType" in item) {
      navigate(`/booking/room/${id}`);
      console.log(`Booking room: ${item.roomType} Room ${item.roomNumber} with ID: ${id}`);
    } else if (type === "event" && "eventName" in item) {
      navigate(`/booking/event/${id}`);
      console.log(`Booking event: ${item.eventName} with ID: ${id}`);
    }
  };

  const getTitle = () => {
    if (type === "package" && "packageName" in item) return item.packageName;
    if (type === "room" && "roomType" in item) return `${item.roomType} Room ${item.roomNumber}`;
    if (type === "event" && "eventName" in item) return item.eventName;
    return "";
  };

  const getDescription = () => {
    if (type === "package" && "description" in item) return item.description;
    if (type === "room" && "beds" in item)
      return `Beds: ${item.beds}, ${item.isAvailable ? "Available" : "Not Available"}`;
    if (type === "event" && "eventDescription" in item) return item.eventDescription;
    return "";
  };

  const getPrice = () => {
    if (type === "package" && "pricePerDay" in item) return `$${item.pricePerDay}/day`;
    if (type === "room" && "pricePerNight" in item) return `$${item.pricePerNight}/night`;
    if (type === "event" && "pricePerEvent" in item) return `$${item.pricePerEvent}`;
    return "";
  };

  const renderRatingStars = (rating: number) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{
              color: index < filledStars ? "#024747" : "#358585",
              fill: index < filledStars ? "#024747" : "none",
            }}
          />
        ))}
      </div>
    );
  };

  const renderReviewData = () => {
    if ("reviews" in item && Array.isArray(item.reviews) && item.reviews.length > 0) {
      return (
        <div className="mt-4">
          <h4
            className="mb-2 text-base font-semibold sm:text-lg"
            style={{ color: "#22443a", fontFamily: theme.fonts.sans[0] }}
          >
            Reviews:
          </h4>
          <ul
            className="pl-5 text-sm list-disc sm:text-base"
            style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
          >
            {item.reviews.map((review, index) => (
              <li key={index}>
                {review.rating !== undefined && `${review.rating}/5 - `}
                {review.comment || "No comment provided"}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen px-4 pt-20 pb-8 bg-white sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h1
            className="text-2xl font-bold sm:text-3xl md:text-4xl"
            style={{ color: "#22443a", fontFamily: theme.fonts.serif[0] }}
          >
            {getTitle()}
          </h1>
          
        </div>

        <div className="space-y-6">
          <p
            className="text-base font-bold leading-relaxed sm:text-lg"
            style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
          >
            {getDescription()}
          </p>

          {item.ratingValue !== undefined && (
            <div
              className="flex items-center gap-2 text-md sm:text-md"
              style={{ color: "#22443a", fontFamily: theme.fonts.sans[0] }}
            >
              {renderRatingStars(item.ratingValue)}
              <span>
                <strong>{item.ratingValue}</strong>/5
              </span>
              {"ratingCount" in item && item.ratingCount !== undefined && (
                <span style={{ color: "#6b7280" }}>- {item.ratingCount} Reviews</span>
              )}
            </div>
          )}

          {renderReviewData()}

          <p
            className="text-md sm:text-md"
            style={{
              color: item.isAvailable ? "#56ab91" : "#d9534f",
              fontFamily: theme.fonts.sans[0],
            }}
          >
            {item.isAvailable ? "Available" : "Not Available"}
          </p>

          {item.amenities && item.amenities.length > 0 && (
            <div>
              <h4
                className="mb-2 text-base font-semibold sm:text-lg"
                style={{ color: "#22443a", fontFamily: theme.fonts.sans[0] }}
              >
                Amenities:
              </h4>
              <ul
                className="pl-5 text-sm list-disc sm:text-base"
                style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
              >
                {item.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}

          {type === "package" && "rooms" in item && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {item.rooms && item.rooms.length > 0 && (
                <div>
                  <h4
                    className="mb-2 text-base font-semibold sm:text-lg"
                    style={{ color: "#22443a", fontFamily: theme.fonts.sans[0] }}
                  >
                    Accommodations:
                  </h4>
                  <ul
                    className="pl-5 text-sm list-disc sm:text-base"
                    style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
                  >
                    {item.rooms.map((room, index) => (
                      <li key={index}>
                        {room.roomType} Room {room.roomNumber}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.events && item.events.length > 0 && (
                <div>
                  <h4
                    className="mb-2 text-base font-semibold sm:text-lg"
                    style={{ color: "#22443a", fontFamily: theme.fonts.sans[0] }}
                  >
                    Experiences:
                  </h4>
                  <ul
                    className="pl-5 text-sm list-disc sm:text-base"
                    style={{ color: "#3c7866", fontFamily: theme.fonts.sans[0] }}
                  >
                    {item.events.map((event, index) => (
                      <li key={index}>{event.eventName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <p
            className="text-xl font-semibold sm:text-2xl"
            style={{ color: "#11221d", fontFamily: theme.fonts.sans[0] }}
          >
            {getPrice()}
          </p>

          <div className="flex flex-col items-center gap-4 pt-4">
            {/* Grid for Add to Cart and Book Now */}
            <div className="grid w-full grid-cols-2 gap-4">
              <button
                className="px-6 py-2 text-base sm:text-lg rounded-sm transition-all duration-300 bg-[#22443a] text-white hover:bg-[#346757] w-full"
                style={{ fontFamily: theme.fonts.sans[0] }}
                onClick={() => {
                  setIsInCart(!isInCart);
                  handleBookNow();
                }}
              >
                <ShoppingCart className="inline-block w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                className="px-6 py-2 text-base sm:text-lg rounded-sm transition-all duration-300 bg-[#56ab91] text-white hover:bg-[#346757] w-full"
                style={{ fontFamily: theme.fonts.sans[0] }}
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>

            {/* Add to Wishlist button below */}
            <button
              className="px-6 py-2 text-base sm:text-lg rounded-sm transition-all duration-300 bg-white shadow-md hover:bg-gray-200 text-[#346757] w-full border-2 border-[#346757]"
              style={{ fontFamily: theme.fonts.sans[0] }}
              onClick={() => {
                setIsWishlist(!isWishlist);
                handleBookNow();
              }}
            >
              <Heart
                className="inline-block w-5 h-5 mr-2"
                style={{ color: isWishlist ? "#4d9a83" : "#346757" }}
                fill={isWishlist ? "#4d9a83" : "none"}
              />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;