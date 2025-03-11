// MapComponent.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

export const MapComponent = ({ onLocationSelect, initialLocation }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize the map
      mapInstance.current = L.map(mapRef.current).setView(
        initialLocation ? [initialLocation.lat, initialLocation.lng] : [7.8731, 80.7718], // Default to Sri Lanka
        8
      );

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Add a marker
      markerInstance.current = L.marker(
        initialLocation ? [initialLocation.lat, initialLocation.lng] : [7.8731, 80.7718],
        { draggable: true }
      ).addTo(mapInstance.current);

      // Handle marker dragend event
      markerInstance.current.on("dragend", async () => {
        const latLng = markerInstance.current!.getLatLng();
        const address = await getAddressFromCoordinates(latLng.lat, latLng.lng);
        onLocationSelect({
          lat: latLng.lat,
          lng: latLng.lng,
          address: address || "Unknown Address",
        });
      });
    }

    // Cleanup function to remove the map instance when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [initialLocation, onLocationSelect]);

  // Function to get address from coordinates using OpenStreetMap Nominatim API
  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Unknown Address";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Address";
    }
  };

  return <div ref={mapRef} style={{ height: "300px", width: "100%", marginTop: "1rem" }} />;
};