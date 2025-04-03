import React from "react";
import Card from "./Card"; // Grid view card
import ListCard from "./ListCard"; // List view card
import { theme } from "@/styles/theme";
import Deluxe01 from "../../assets/rooms/deluxe_01.jpg";
import Deluxe02 from "../../assets/rooms/deluxe_02.jpg";
import Deluxe03 from "../../assets/rooms/deluxe_03.jpg";
import Standard01 from "../../assets/rooms/standard_01.jpg";
import Standard02 from "../../assets/rooms/standard_02.jpg";
import Standard03 from "../../assets/rooms/standard_03.jpg";
import Suite01 from "../../assets/rooms/suite_01.jpg";
import Suite02 from "../../assets/rooms/suite_02.jpg";
import Premium01 from "../../assets/rooms/premium_01.jpg";
import Packge01 from "../../assets/packages/carft_01.jpg";
import Packge02 from "../../assets/packages/cooking_01.jpg";
import Packge03 from "../../assets/packages/meditation_01.jpg";
import Packge04 from "../../assets/packages/planting_01.jpg";
import Packge05 from "../../assets/packages/ride_01.jpg";
import Packge06 from "../../assets/packages/yoga_01.jpeg";
import Packge07 from "../../assets/packages/tea_01.jpg";
import Packge08 from "../../assets/packages/spa_01.jpg";
import Event01 from "../../assets/events/cook_01.jpg";
import Event02 from "../../assets/events/crafting_01.jpg";
import Event03 from "../../assets/events/market_01.jpg";
import Event04 from "../../assets/events/med_01.jpg";
import Event05 from "../../assets/events/plantation_01.jpg";
import Event06 from "../../assets/events/spatreat_01.jpg";
import Event07 from "../../assets/events/sunset_01.jpg";
import Event08 from "../../assets/events/tour_01.jpg";
import Event09 from "../../assets/events/yogasession_01.jpg";

// Mock data with fixed image property
const mockData = {
  rooms: [
    { roomId: 1, roomCode: "CIN101", roomNumber: 101, roomType: "Deluxe", beds: 2, pricePerNight: 125.0, isAvailable: true, createdAt: "2025-01-01T10:00:00", updatedAt: "2025-01-02T12:00:00", image: Deluxe01, ratingValue: 4.5, amenities: ["WiFi", "Breakfast", "Pool"] },
    { roomId: 2, roomCode: "CIN102", roomNumber: 102, roomType: "Standard", beds: 1, pricePerNight: 85.0, isAvailable: true, createdAt: "2025-01-01T12:00:00", updatedAt: "2025-01-02T13:00:00", image: Standard01, ratingValue: 4.2, amenities: ["WiFi", "Breakfast"] },
    { roomId: 3, roomCode: "CIN103", roomNumber: 103, roomType: "Suite", beds: 3, pricePerNight: 160.0, isAvailable: true, createdAt: "2025-01-01T11:00:00", updatedAt: "2025-01-03T14:00:00", image: Suite01, ratingValue: 4.8, amenities: ["WiFi", "Breakfast", "Pool", "Spa"] },
    { roomId: 4, roomCode: "CIN104", roomNumber: 104, roomType: "Deluxe", beds: 2, pricePerNight: 135.0, isAvailable: true, createdAt: "2025-01-01T14:00:00", updatedAt: "2025-01-02T16:00:00", image: Deluxe02, ratingValue: 4.6, amenities: ["WiFi", "Breakfast", "Pool"] },
    { roomId: 5, roomCode: "CIN105", roomNumber: 105, roomType: "Premium Suite", beds: 3, pricePerNight: 180.0, isAvailable: false, createdAt: "2025-01-02T09:00:00", updatedAt: "2025-01-04T17:00:00", image: Premium01, ratingValue: 4.9, amenities: ["WiFi", "Breakfast", "Pool", "Spa", "Airport Transfer"] },
    { roomId: 6, roomCode: "CIN106", roomNumber: 106, roomType: "Standard", beds: 1, pricePerNight: 90.0, isAvailable: true, createdAt: "2025-01-02T11:00:00", updatedAt: "2025-01-03T15:00:00", image: Standard02, ratingValue: 4.1, amenities: ["WiFi", "Breakfast"] },
    { roomId: 7, roomCode: "CIN107", roomNumber: 107, roomType: "Deluxe", beds: 2, pricePerNight: 140.0, isAvailable: true, createdAt: "2025-01-03T08:00:00", updatedAt: "2025-01-04T12:00:00", image: Deluxe03, ratingValue: 4.7, amenities: ["WiFi", "Breakfast", "Pool"] },
    { roomId: 8, roomCode: "CIN108", roomNumber: 108, roomType: "Suite", beds: 3, pricePerNight: 170.0, isAvailable: false, createdAt: "2025-01-03T10:00:00", updatedAt: "2025-01-05T14:00:00", image: Suite02, ratingValue: 4.8, amenities: ["WiFi", "Breakfast", "Pool", "Spa"] },
    { roomId: 9, roomCode: "CIN109", roomNumber: 109, roomType: "Standard", beds: 1, pricePerNight: 95.0, isAvailable: true, createdAt: "2025-01-04T07:00:00", updatedAt: "2025-01-06T16:00:00", image: Standard03, ratingValue: 4.3, amenities: ["WiFi", "Breakfast"] },
  ],
  events: [
    { eventId: 1, eventName: "Cinnamon Plantation Tour", eventDescription: "Explore a real cinnamon plantation", pricePerEvent: 55.0, isAvailable: true, startTime: "08:00", endTime: "11:00", createdAt: "2025-01-01T07:00:00", updatedAt: "2025-01-02T09:00:00", image: Event05, ratingValue: 4.7, amenities: ["Guide", "Transportation"] },
    { eventId: 2, eventName: "Cinnamon Spa Experience", eventDescription: "Relax with cinnamon-infused treatments", pricePerEvent: 70.0, isAvailable: true, startTime: "10:00", endTime: "12:00", createdAt: "2025-01-01T09:00:00", updatedAt: "2025-01-02T10:00:00", image: Event06, ratingValue: 4.9, amenities: ["Spa"] },
    { eventId: 3, eventName: "Cinnamon Cooking Workshop", eventDescription: "Learn to cook with cinnamon", pricePerEvent: 50.0, isAvailable: true, startTime: "14:00", endTime: "16:00", createdAt: "2025-01-01T13:00:00", updatedAt: "2025-01-02T15:00:00", image: Event01, ratingValue: 4.6, amenities: ["Workshop", "Meals Included"] },
    { eventId: 4, eventName: "Sunset Cinnamon Tea Tasting", eventDescription: "Taste premium cinnamon tea blends", pricePerEvent: 30.0, isAvailable: true, startTime: "17:00", endTime: "18:30", createdAt: "2025-01-02T10:00:00", updatedAt: "2025-01-03T11:00:00", image: Event07, ratingValue: 4.8, amenities: ["Guide", "Meals Included"] },
    { eventId: 5, eventName: "Cinnamon-Themed Yoga", eventDescription: "Relax with a cinnamon-scented yoga session", pricePerEvent: 40.0, isAvailable: true, startTime: "06:30", endTime: "08:00", createdAt: "2025-01-02T07:00:00", updatedAt: "2025-01-03T08:00:00", image: Event09, ratingValue: 4.5, amenities: ["Workshop"] },
    { eventId: 6, eventName: "Cinnamon Bark Craft Workshop", eventDescription: "Create handmade crafts using cinnamon bark", pricePerEvent: 45.0, isAvailable: true, startTime: "15:00", endTime: "17:00", createdAt: "2025-01-03T09:00:00", updatedAt: "2025-01-04T10:00:00", image: Event02, ratingValue: 4.4, amenities: ["Workshop", "Kids Club"] },
    { eventId: 7, eventName: "Cinnamon Plantation Cycling Tour", eventDescription: "Cycle through lush cinnamon fields", pricePerEvent: 50.0, isAvailable: true, startTime: "09:00", endTime: "12:00", createdAt: "2025-01-03T08:00:00", updatedAt: "2025-01-04T09:00:00", image: Event08, ratingValue: 4.7, amenities: ["Guide", "Transportation"] },
    { eventId: 8, eventName: "Cinnamon Scented Meditation", eventDescription: "Meditate in a cinnamon-scented environment", pricePerEvent: 35.0, isAvailable: true, startTime: "18:00", endTime: "19:30", createdAt: "2025-01-04T10:00:00", updatedAt: "2025-01-05T11:00:00", image: Event04, ratingValue: 4.6, amenities: ["Workshop"] },
    { eventId: 9, eventName: "Cinnamon Farmers' Market Tour", eventDescription: "Visit a market specializing in cinnamon products", pricePerEvent: 25.0, isAvailable: true, startTime: "07:00", endTime: "09:00", createdAt: "2025-01-05T06:00:00", updatedAt: "2025-01-06T07:00:00", image: Event03, ratingValue: 4.3, amenities: ["Guide", "Transportation"] },
  ],
  accommodations: [
    { accommodationId: 1, accommodationCode: "A1", accommodationName: "Ocean View Hotel", accommodationDescription: "Rooms by the sea", location: "Beach", isAvailable: true },
    { accommodationId: 2, accommodationCode: "A2", accommodationName: "Mountain Lodge", accommodationDescription: "Cozy stay", location: "Mountains", isAvailable: true },
    { accommodationId: 3, accommodationCode: "A3", accommodationName: "City Inn", accommodationDescription: "Central location", location: "City", isAvailable: true },
    { accommodationId: 4, accommodationCode: "A4", accommodationName: "Beach Resort", accommodationDescription: "Luxury stay", location: "Beach", isAvailable: true },
  ],
  experiences: [
    { experienceId: 1, experienceCode: "E1", experienceName: "Surfing Adventure", experienceDescription: "Water sports", location: "Beach", totalPrice: 50.0, isAvailable: true },
    { experienceId: 2, experienceCode: "E2", experienceName: "Hiking Experience", experienceDescription: "Trail exploration", location: "Mountains", totalPrice: 40.0, isAvailable: true },
    { experienceId: 3, experienceCode: "E3", experienceName: "Food Tour", experienceDescription: "Culinary delights", location: "City", totalPrice: 60.0, isAvailable: true },
    { experienceId: 4, experienceCode: "E4", experienceName: "Kayaking Trip", experienceDescription: "Water adventure", location: "River", totalPrice: 45.0, isAvailable: true },
  ],
  packages: [
    {
      packageId: 1,
      packageName: "Cinnamon Plantation Retreat",
      description: "Stay amidst lush cinnamon fields",
      pricePerDay: 160.0,
      image: Packge04,
      isAvailable: true,
      createdAt: "2025-01-01T10:00:00",
      ratingValue: 4.6,
      amenities: ["WiFi", "Breakfast", "Guide", "Transportation"],
      rooms: [
        { roomId: 10, roomCode: "CIN101", roomNumber: 101, roomType: "Deluxe", beds: 2, pricePerNight: 125.0, isAvailable: true, createdAt: "2025-01-01T10:00:00", updatedAt: "2025-01-02T12:00:00", amenities: ["WiFi", "Breakfast", "Pool"] },
      ],
      events: [
        { eventId: 10, eventName: "Cinnamon Plantation Tour", eventDescription: "Explore a real cinnamon plantation", pricePerEvent: 55.0, isAvailable: true, startTime: "08:00", endTime: "11:00", createdAt: "2025-01-01T07:00:00", updatedAt: "2025-01-02T09:00:00", amenities: ["Guide", "Transportation"] },
      ],
    },
    {
      packageId: 2,
      packageName: "Cinnamon Wellness Escape",
      description: "A relaxing spa getaway with cinnamon treatments",
      pricePerDay: 220.0,
      image: Packge08,
      isAvailable: true,
      createdAt: "2025-01-02T10:00:00",
      ratingValue: 4.8,
      amenities: ["WiFi", "Breakfast", "Spa", "Pool"],
      rooms: [
        { roomId: 11, roomCode: "CIN102", roomNumber: 102, roomType: "Standard", beds: 1, pricePerNight: 85.0, isAvailable: true, createdAt: "2025-01-01T12:00:00", updatedAt: "2025-01-02T13:00:00", amenities: ["WiFi", "Breakfast"] },
      ],
      events: [
        { eventId: 11, eventName: "Cinnamon Spa Experience", eventDescription: "Relax with cinnamon-infused treatments", pricePerEvent: 70.0, isAvailable: true, startTime: "10:00", endTime: "12:00", createdAt: "2025-01-01T09:00:00", updatedAt: "2025-01-02T10:00:00", amenities: ["Spa"] },
      ],
    },
    {
      packageId: 3,
      packageName: "Cinnamon Culinary Journey",
      description: "Learn to cook with fresh cinnamon",
      pricePerDay: 180.0,
      image: Packge02,
      isAvailable: true,
      createdAt: "2025-01-03T10:00:00",
      ratingValue: 4.7,
      amenities: ["WiFi", "Workshop", "Meals Included", "Breakfast"],
      rooms: [
        { roomId: 12, roomCode: "CIN103", roomNumber: 103, roomType: "Suite", beds: 3, pricePerNight: 160.0, isAvailable: true, createdAt: "2025-01-01T11:00:00", updatedAt: "2025-01-03T14:00:00", amenities: ["WiFi", "Breakfast", "Pool", "Spa"] },
      ],
      events: [
        { eventId: 12, eventName: "Cinnamon Cooking Workshop", eventDescription: "Learn to cook with cinnamon", pricePerEvent: 50.0, isAvailable: true, startTime: "14:00", endTime: "16:00", createdAt: "2025-01-01T13:00:00", updatedAt: "2025-01-02T15:00:00", amenities: ["Workshop", "Meals Included"] },
      ],
    },
    {
      packageId: 4,
      packageName: "Cinnamon Sunset Retreat",
      description: "Enjoy cinnamon tea while watching the sunset",
      pricePerDay: 140.0,
      image: Packge07,
      isAvailable: true,
      createdAt: "2025-01-04T10:00:00",
      ratingValue: 4.5,
      amenities: ["WiFi", "Breakfast", "Guide", "Meals Included"],
      rooms: [
        { roomId: 13, roomCode: "CIN104", roomNumber: 104, roomType: "Deluxe", beds: 2, pricePerNight: 135.0, isAvailable: true, createdAt: "2025-01-01T14:00:00", updatedAt: "2025-01-02T16:00:00", amenities: ["WiFi", "Breakfast", "Pool"] },
      ],
      events: [
        { eventId: 13, eventName: "Sunset Cinnamon Tea Tasting", eventDescription: "Taste premium cinnamon tea blends", pricePerEvent: 30.0, isAvailable: true, startTime: "17:00", endTime: "18:30", createdAt: "2025-01-02T10:00:00", updatedAt: "2025-01-03T11:00:00", amenities: ["Guide", "Meals Included"] },
      ],
    },
    {
      packageId: 5,
      packageName: "Cinnamon Serenity Yoga",
      description: "A peaceful yoga retreat with cinnamon aromatherapy",
      pricePerDay: 190.0,
      image: Packge06,
      isAvailable: false,
      createdAt: "2025-01-05T10:00:00",
      ratingValue: 4.9,
      amenities: ["WiFi", "Breakfast", "Workshop", "Pool", "Spa"],
      rooms: [
        { roomId: 14, roomCode: "CIN105", roomNumber: 105, roomType: "Premium Suite", beds: 3, pricePerNight: 180.0, isAvailable: false, createdAt: "2025-01-02T09:00:00", updatedAt: "2025-01-04T17:00:00", amenities: ["WiFi", "Breakfast", "Pool", "Spa", "Airport Transfer"] },
      ],
      events: [
        { eventId: 14, eventName: "Cinnamon-Themed Yoga", eventDescription: "Relax with a cinnamon-scented yoga session", pricePerEvent: 40.0, isAvailable: true, startTime: "06:30", endTime: "08:00", createdAt: "2025-01-02T07:00:00", updatedAt: "2025-01-03T08:00:00", amenities: ["Workshop"] },
      ],
    },
    {
      packageId: 6,
      packageName: "Cinnamon Craft & Culture",
      description: "Create crafts using cinnamon bark",
      pricePerDay: 170.0,
      image: Packge01,
      isAvailable: true,
      createdAt: "2025-01-06T10:00:00",
      ratingValue: 4.4,
      amenities: ["WiFi", "Breakfast", "Workshop", "Kids Club"],
      rooms: [
        { roomId: 15, roomCode: "CIN106", roomNumber: 106, roomType: "Standard", beds: 1, pricePerNight: 90.0, isAvailable: true, createdAt: "2025-01-02T11:00:00", updatedAt: "2025-01-03T15:00:00", amenities: ["WiFi", "Breakfast"] },
      ],
      events: [
        { eventId: 15, eventName: "Cinnamon Bark Craft Workshop", eventDescription: "Create handmade crafts using cinnamon bark", pricePerEvent: 45.0, isAvailable: true, startTime: "15:00", endTime: "17:00", createdAt: "2025-01-03T09:00:00", updatedAt: "2025-01-04T10:00:00", amenities: ["Workshop", "Kids Club"] },
      ],
    },
    {
      packageId: 7,
      packageName: "Cycling Through Cinnamon Fields",
      description: "Explore cinnamon plantations on a bike",
      pricePerDay: 180.0,
      image: Packge05,
      isAvailable: true,
      createdAt: "2025-01-07T10:00:00",
      ratingValue: 4.7,
      amenities: ["WiFi", "Breakfast", "Guide", "Transportation"],
      rooms: [
        { roomId: 16, roomCode: "CIN107", roomNumber: 107, roomType: "Deluxe", beds: 2, pricePerNight: 140.0, isAvailable: true, createdAt: "2025-01-03T08:00:00", updatedAt: "2025-01-04T12:00:00", amenities: ["WiFi", "Breakfast", "Pool"] },
      ],
      events: [
        { eventId: 16, eventName: "Cinnamon Plantation Cycling Tour", eventDescription: "Cycle through lush cinnamon fields", pricePerEvent: 50.0, isAvailable: true, startTime: "09:00", endTime: "12:00", createdAt: "2025-01-03T08:00:00", updatedAt: "2025-01-04T09:00:00", amenities: ["Guide", "Transportation"] },
      ],
    },
    {
      packageId: 8,
      packageName: "Cinnamon Meditation Retreat",
      description: "Deep meditation with a cinnamon-scented atmosphere",
      pricePerDay: 130.0,
      image: Packge03,
      isAvailable: false,
      createdAt: "2025-01-08T10:00:00",
      ratingValue: 4.6,
      amenities: ["WiFi", "Breakfast", "Workshop"],
      rooms: [
        { roomId: 17, roomCode: "CIN108", roomNumber: 108, roomType: "Suite", beds: 3, pricePerNight: 170.0, isAvailable: false, createdAt: "2025-01-03T10:00:00", updatedAt: "2025-01-05T14:00:00", amenities: ["WiFi", "Breakfast", "Pool", "Spa"] },
      ],
      events: [
        { eventId: 17, eventName: "Cinnamon Scented Meditation", eventDescription: "Meditate in a cinnamon-scented environment", pricePerEvent: 35.0, isAvailable: true, startTime: "18:00", endTime: "19:30", createdAt: "2025-01-04T10:00:00", updatedAt: "2025-01-05T11:00:00", amenities: ["Workshop"] },
      ],
    },
  ],
};

interface BookingListProps {
  category: "all" | "packages" | "accommodations" | "experiences";
  viewMode: "grid" | "list";
  sortOption: string;
  filters: any;
  page: number;
  size: number;
  setPage: (page: number) => void;
}

const BookingList: React.FC<BookingListProps> = ({
  category,
  viewMode,
  sortOption,
  filters,
  page,
  size,
  setPage,
}) => {
  // Filter and sort data
  const getFilteredData = () => {
    let packages = mockData.packages.map(pkg => ({ ...pkg, type: "package" as const }));
    let rooms = mockData.rooms.map(room => ({ ...room, type: "room" as const }));
    let events = mockData.events.map(event => ({ ...event, type: "event" as const }));

    const applyFilters = (data: any[]) => {
      let filteredData = [...data];

      if (filters.minPrice !== undefined) {
        filteredData = filteredData.filter(item => {
          const price = item.type === "package" ? item.pricePerDay : 
                        item.type === "room" ? item.pricePerNight : item.pricePerEvent;
          return price >= filters.minPrice;
        });
      }

      if (filters.maxPrice !== undefined) {
        filteredData = filteredData.filter(item => {
          const price = item.type === "package" ? item.pricePerDay : 
                        item.type === "room" ? item.pricePerNight : item.pricePerEvent;
          return price <= filters.maxPrice;
        });
      }

      if (filters.rating !== undefined) {
        filteredData = filteredData.filter(item => item.ratingValue >= filters.rating);
      }

      if (filters.featured) {
        filteredData = filteredData.filter(item => item.isAvailable === true);
      }

      if (filters.amenities && filters.amenities.length > 0) {
        filteredData = filteredData.filter(item => {
          if (!item.amenities || !Array.isArray(item.amenities)) return false;
          return filters.amenities.some((amenity: string) => item.amenities.includes(amenity));
        });
      }

      return filteredData;
    };

    const applySort = (data: any[]) => {
      const sortedData = [...data];
      if (sortOption === "newest") {
        sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (sortOption === "priceAsc") {
        sortedData.sort((a, b) => {
          const priceA = a.type === "package" ? a.pricePerDay : a.type === "room" ? a.pricePerNight : a.pricePerEvent;
          const priceB = b.type === "package" ? b.pricePerDay : b.type === "room" ? b.pricePerNight : b.pricePerEvent;
          return priceA - priceB;
        });
      } else if (sortOption === "priceDesc") {
        sortedData.sort((a, b) => {
          const priceA = a.type === "package" ? a.pricePerDay : a.type === "room" ? a.pricePerNight : a.pricePerEvent;
          const priceB = b.type === "package" ? b.pricePerDay : b.type === "room" ? b.pricePerNight : b.pricePerEvent;
          return priceB - priceA;
        });
      } else if (sortOption === "rating") {
        sortedData.sort((a, b) => b.ratingValue - a.ratingValue);
      }
      return sortedData;
    };

    return {
      packages: applySort(applyFilters(packages)),
      rooms: applySort(applyFilters(rooms)),
      events: applySort(applyFilters(events)),
    };
  };

  const { packages, rooms, events } = getFilteredData();

  const [packagePage, setPackagePage] = React.useState(0);
  const [roomPage, setRoomPage] = React.useState(0);
  const [eventPage, setEventPage] = React.useState(0);

  React.useEffect(() => {
    setPackagePage(0);
    setRoomPage(0);
    setEventPage(0);
  }, [filters]);

  const paginate = (data: any[], currentPage: number) => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / size) || 1;
    const paginatedData = data.slice(currentPage * size, (currentPage + 1) * size);
    return { paginatedData, totalPages, totalItems };
  };

  const { paginatedData: paginatedPackages, totalPages: packagePages, totalItems: totalPackages } = paginate(packages, packagePage);
  const { paginatedData: paginatedRooms, totalPages: roomPages, totalItems: totalRooms } = paginate(rooms, roomPage);
  const { paginatedData: paginatedEvents, totalPages: eventPages, totalItems: totalEvents } = paginate(events, eventPage);

  const renderSection = (title: string, data: any[], currentPage: number, setCurrentPage: (page: number) => void, totalPages: number, totalItems: number) => (
    <div className="mb-8">
      <h2 
        className="mb-4 text-3xl font-bold"
        style={{ fontFamily: theme.fonts.sans[0] }}
      >
        {title}
      </h2>
      
      {data.length > 0 ? (
        <>
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {data.map((item, index) => {
              const CardComponent = viewMode === "grid" ? Card : ListCard;
              return (
                <CardComponent
                  key={`${item.type}-${index}`}
                  image={item.image || "default.jpg"}
                  title={
                    item.type === "package" ? item.packageName :
                    item.type === "room" ? `${item.roomType} Room ${item.roomNumber}` :
                    item.eventName
                  }
                  description={
                    item.type === "package" ? item.description :
                    item.type === "room" ? `Beds: ${item.beds}, ${item.isAvailable ? "Available" : "Not Available"}` :
                    item.eventDescription
                  }
                  price={`$${item.type === "package" ? item.pricePerDay : item.type === "room" ? item.pricePerNight : item.pricePerEvent}`}
                  onClick={() => console.log("Quick Buy:", item)}
                  isFeatured={false} // Force all cards to be normal (no Quick Buy button)
                  packageID={item.type === "package" ? item.packageId : undefined}
                  packageDetails={item.type === "package" ? { rooms: item.rooms, events: item.events } : undefined}
                />
              );
            })}
          </div>
          
          {totalItems > size && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 text-white bg-black rounded disabled:bg-gray-300 disabled:text-black"
              >
                Previous
              </button>
              <span>{currentPage + 1} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 text-white bg-black rounded disabled:bg-gray-300 disabled:text-black"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No {title.toLowerCase()} match your criteria.</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      {category === "all" ? (
        <>
          {renderSection("Packages", paginatedPackages, packagePage, setPackagePage, packagePages, totalPackages)}
          {renderSection("Accommodations", paginatedRooms, roomPage, setRoomPage, roomPages, totalRooms)}
          {renderSection("Experiences", paginatedEvents, eventPage, setEventPage, eventPages, totalEvents)}
          {(totalPackages === 0 && totalRooms === 0 && totalEvents === 0) && (
            <p className="text-center text-gray-500">No items match your criteria.</p>
          )}
        </>
      ) : category === "packages" ? (
        renderSection("Packages", paginatedPackages, packagePage, setPackagePage, packagePages, totalPackages)
      ) : category === "accommodations" ? (
        renderSection("Accommodations", paginatedRooms, roomPage, setRoomPage, roomPages, totalRooms)
      ) : category === "experiences" ? (
        renderSection("Experiences", paginatedEvents, eventPage, setEventPage, eventPages, totalEvents)
      ) : null}
    </div>
  );
};

export default BookingList;