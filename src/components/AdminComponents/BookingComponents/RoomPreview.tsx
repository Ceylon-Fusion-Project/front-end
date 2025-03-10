import { ArrowLeft } from "lucide-react";
import { roomTypes, accommodations } from "../../../lib/data";

interface RoomPreviewProps {
  room: {
    roomCode?: string;
    roomNumber?: number;
    roomType?: string;
    beds?: number;
    pricePerNight?: number;
    isAvailable?: boolean;
    roomImageURLs?: string[];
    accommodationId?: number;
  };
  onBack: () => void;
}

export function RoomPreview({ room, onBack }: RoomPreviewProps) {
  const getRoomTypeLabel = (value?: string) => {
    return roomTypes.find((type) => type.value === value)?.label || "Unknown";
  };

  const getAccommodationName = (id?: number) => {
    return accommodations.find((acc) => acc.id === id)?.name || "Unknown";
  };

  return (
    <div className="p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="flex items-center p-1 text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h3 className="ml-4 text-xl font-semibold">Room Preview</h3>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Room Images */}
        <div>
          {room.roomImageURLs && room.roomImageURLs.length > 0 ? (
            <div>
              <div className="mb-4 overflow-hidden border border-gray-200 rounded-lg aspect-square">
                <img
                  src={room.roomImageURLs[0] || "/placeholder.svg"}
                  alt="Room"
                  className="object-cover w-full h-full"
                />
              </div>
              {room.roomImageURLs.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {room.roomImageURLs.slice(1, 5).map((url, i) => (
                    <div
                      key={i}
                      className="overflow-hidden border border-gray-200 rounded-md aspect-square"
                    >
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Room thumbnail ${i + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg aspect-square">
              <p className="text-gray-400">No images available</p>
            </div>
          )}
        </div>

        {/* Right: Room Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 border rounded border-amber-200 bg-amber-50 text-amber-700">
              {room.roomCode || "No Code"}
            </span>
            <span className="px-2 py-1 text-green-700 border border-green-200 rounded bg-green-50">
              {getRoomTypeLabel(room.roomType)}
            </span>
          </div>

          <h1 className="text-2xl font-bold">
            {room.roomCode || "Untitled Room"}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">
              {getAccommodationName(room.accommodationId)}
            </span>
            <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">
              {room.beds} Beds
            </span>
          </div>

          <div className="text-3xl font-bold text-amber-800">
            $
            {typeof room.pricePerNight === "number"
              ? room.pricePerNight.toFixed(2)
              : Number.parseFloat(String(room.pricePerNight || 0)).toFixed(2)}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Available</h3>
            <p className="text-gray-700">
              {room.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>

          <div className="pt-4">
            <button className="w-full px-4 py-2 text-white rounded bg-amber-700 hover:bg-amber-800">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}