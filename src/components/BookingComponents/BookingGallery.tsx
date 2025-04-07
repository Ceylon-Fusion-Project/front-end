import { useState, useEffect } from "react";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { theme } from "@/styles/theme";
import { useParams, useLocation } from "react-router-dom";
import { mockData } from "@/components/BookingComponents/BookingList";

const defaultImages = [
  "https://source.unsplash.com/800x800/?resort,1",
  "https://source.unsplash.com/800x800/?resort,2",
  "https://source.unsplash.com/800x800/?resort,3",
  "https://source.unsplash.com/800x800/?resort,4",
  "https://source.unsplash.com/800x800/?resort,5",
];

export function BookingGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);

  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const path = window.location.pathname;

  const stateImages = (location.state as { images?: string[] })?.images;

  let itemType: "package" | "room" | "event" | null = null;
  if (path.includes("/booking/package/")) itemType = "package";
  else if (path.includes("/booking/room/")) itemType = "room";
  else if (path.includes("/booking/event/")) itemType = "event";

  const getItemImages = () => {
    if (stateImages && stateImages.length > 0) return stateImages;
    if (!id || !itemType) return defaultImages;

    const numberId = parseInt(id);

    if (itemType === "package" && mockData?.packages) {
      const pkg = mockData.packages.find(p => p.packageId === numberId);
      if (pkg) {
        const pkgImages = Array.isArray(pkg.image) ? pkg.image : [pkg.image];
        const roomImages = pkg.rooms?.flatMap(r => {
          if ('image' in r && r.image) {
            return Array.isArray(r.image) ? r.image : [r.image];
          }
          return [];
        }) || [];
        const eventImages = pkg.events?.flatMap(e => {
          if ('image' in e && e.image) {
            return Array.isArray(e.image) ? e.image : [e.image];
          }
          return [];
        }) || [];
        return [...pkgImages, ...roomImages, ...eventImages].filter(Boolean);
      }
      return defaultImages;
    } else if (itemType === "room" && mockData?.rooms) {
      const room = mockData.rooms.find(r => r.roomId === numberId);
      return room ? (Array.isArray(room.image) ? room.image : [room.image]) : defaultImages;
    } else if (itemType === "event" && mockData?.events) {
      const event = mockData.events.find(e => e.eventId === numberId);
      return event ? [event.image] : defaultImages;
    }
    return defaultImages;
  };

  useEffect(() => {
    const itemImages = getItemImages();
    // Skip validation for imported images; assume they are valid since they come from mockData or state
    setValidImages(itemImages.filter((img): img is string => typeof img === "string" && img !== ""));
  }, [id, itemType, stateImages]);

  const nextImage = () => setCurrentImage(prev => (prev + 1) % validImages.length);
  const previousImage = () => setCurrentImage(prev => (prev - 1 + validImages.length) % validImages.length);
  const toggleZoom = () => setIsZoomed(!isZoomed);

  if (validImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] w-full mt-16">
        <p className="text-lg text-gray-500">No images available.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 pt-20 pb-8 mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
      {/* Main Booking Image */}
      <div className={`relative w-full ${isZoomed ? "fixed top-0 left-0 right-0 bottom-0 z-50 bg-black flex items-center justify-center" : "h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"}`}>
        <img
          src={validImages[currentImage]}
          alt={`${itemType} Image ${currentImage + 1}`}
          className={`w-full h-full ${isZoomed ? "max-h-full max-w-full object-contain" : "object-cover rounded-lg border border-gray-200"}`}
          style={{ boxShadow: theme.shadows.medium }}
        />

        {/* Zoom Button */}
        <button
          onClick={toggleZoom}
          className="absolute z-10 p-2 transition-all duration-200 bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100"
        >
          <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#346757" }} />
        </button>

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={previousImage}
              className="w-8 h-8 transition-all duration-200 rounded-full shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white sm:w-10 sm:h-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#346757]" strokeWidth={3} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextImage}
              className="w-8 h-8 transition-all duration-200 rounded-full shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white sm:w-10 sm:h-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#346757]" strokeWidth={3} />
            </Button>
          </div>
        )}

        {/* Close button for zoomed view */}
        {isZoomed && (
          <button
            onClick={toggleZoom}
            className="absolute z-10 p-2 text-white transition-all duration-200 bg-black rounded-full shadow-md top-4 right-4 hover:bg-gray-800"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {/* Thumbnails and Indicators */}
      {validImages.length > 1 && (
        <div className="space-y-4">
          {/* Desktop Thumbnails */}
          <div className="justify-center hidden gap-2 px-2 overflow-x-auto sm:flex sm:gap-4">
            {validImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden transition-all duration-200 ${
                  currentImage === index 
                    ? "shadow-lg ring-2 ring-[#346757] ring-opacity-50" 
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                <img
                  src={image}
                  alt={`${itemType} Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center gap-2 sm:hidden">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  currentImage === index ? "bg-[#346757] scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingGallery;