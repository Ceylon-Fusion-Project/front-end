import { ArrowLeft } from "lucide-react";
import { experienceCenters } from "../../../lib/data";

interface EventPreviewProps {
  event: {
    eventName?: string;
    eventDescription?: string;
    pricePerEvent?: number;
    isAvailable?: boolean;
    startTime?: string; // Ensure this is a valid datetime string (e.g., "2024-01-01T10:00")
    endTime?: string; // Ensure this is a valid datetime string (e.g., "2024-01-01T12:00")
    eventImageURLs?: string[];
    experienceId?: number;
  };
  onBack: () => void;
}

export function EventPreview({ event, onBack }: EventPreviewProps) {
  const getExperienceCenterName = (id?: number) => {
    return experienceCenters.find((exp) => exp.id === id)?.name || "Unknown";
  };

  // Format the datetime string to a readable format
  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return "N/A";
    const date = new Date(dateTime);
    return date.toLocaleString(); // Format as "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  return (
    <div className="p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="flex items-center p-1 text-gray-600">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h3 className="ml-4 text-xl font-semibold">Event Preview</h3>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Event Images */}
        <div>
          {event.eventImageURLs && event.eventImageURLs.length > 0 ? (
            <div>
              <div className="mb-4 overflow-hidden border border-gray-200 rounded-lg aspect-square">
                <img
                  src={event.eventImageURLs[0] || "/placeholder.svg"}
                  alt="Event"
                  className="object-cover w-full h-full"
                />
              </div>
              {event.eventImageURLs.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {event.eventImageURLs.slice(1, 5).map((url, i) => (
                    <div
                      key={i}
                      className="overflow-hidden border border-gray-200 rounded-md aspect-square"
                    >
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Event thumbnail ${i + 1}`}
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

        {/* Right: Event Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 border rounded border-amber-200 bg-amber-50 text-amber-700">
              {event.eventName || "No Name"}
            </span>
            <span className="px-2 py-1 text-green-700 border border-green-200 rounded bg-green-50">
              {getExperienceCenterName(event.experienceId)}
            </span>
          </div>

          <h1 className="text-2xl font-bold">
            {event.eventName || "Untitled Event"}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">
              {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
            </span>
          </div>

          <div className="text-3xl font-bold text-amber-800">
            ${event.pricePerEvent?.toFixed(2) || "0.00"}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {event.eventDescription || "No description provided."}
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