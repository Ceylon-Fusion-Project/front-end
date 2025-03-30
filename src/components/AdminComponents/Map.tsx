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

      // Add initial marker if location provided
      if (initialLocation) {
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        markerRef.current = L.marker([initialLocation.lat, initialLocation.lng], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`Selected Location: ${initialLocation.lat.toFixed(4)}, ${initialLocation.lng.toFixed(4)}`)
          .openPopup();
      }

      // Add click event
      mapRef.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        
        // Remove previous marker if exists
        if (markerRef.current && mapRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        // Create custom icon
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        // Add new marker
        if (mapRef.current) {
          markerRef.current = L.marker([lat, lng], { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(`Selected Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();

          // Call the callback with the selected location
          onLocationSelect(lat, lng);
        }
      });
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