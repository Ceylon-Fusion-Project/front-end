import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation?: { lat: number; lng: number };
  markerColor?: string;
}

const MapComponent = ({ 
  onLocationSelect, 
  initialLocation,
  markerColor = "#B45309"
}: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize the map centered on Sri Lanka
      mapRef.current = L.map(mapContainerRef.current).setView([7.8731, 80.7718], 7);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Create custom icon using Place icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            color: ${markerColor};
            font-size: 24px;
            transform: translate(-12px, -24px);
          ">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });

      // Add initial marker if location provided
      if (initialLocation) {
        markerRef.current = L.marker([initialLocation.lat, initialLocation.lng], { 
          icon: customIcon,
          draggable: true 
        }).addTo(mapRef.current);

        // Set view without animation
        mapRef.current.setView([initialLocation.lat, initialLocation.lng], 15, { animate: false });
      } else {
        // Add default marker at center if no initial location
        markerRef.current = L.marker(mapRef.current.getCenter(), { 
          icon: customIcon,
          draggable: true 
        }).addTo(mapRef.current);
      }

      // Handle marker drag end
      markerRef.current.on('dragend', function(e) {
        const marker = e.target;
        const position = marker.getLatLng();
        onLocationSelect(position.lat, position.lng);
        
        // Update view without animation
        if (mapRef.current) {
          mapRef.current.setView(position, 15, { animate: false });
        }
      });

      // Disable map click handler since we're using draggable marker
      mapRef.current.off('click');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onLocationSelect, initialLocation, markerColor]);

  return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapComponent;