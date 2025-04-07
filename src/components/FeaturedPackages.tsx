// src/components/FeaturedPackages.tsx
//import React from 'react';
import Card from "../components/BookingComponents/Card";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import NatureRetreat from "../assets/images/nature-retreat.jpg";
import EcoFriendlyLodge from "../assets/images/eco-friendly-lodge.jpg";
import CinnamonTour from "../assets/images/cinnamon-tour.jpg";

const FeaturedPackages = () => {
  const navigate = useNavigate();
  const handleBookingNow = () => {
    navigate("/booking/booking-page");
  };
  const packages = [
    {
      image: NatureRetreat,
      title: "Nature Retreat",
      description: "Experience the beauty of cinnamon plantations.",
      price: "$200",
      
    },
    {
      image: EcoFriendlyLodge,
      title: "Eco-Friendly Lodge",
      description: "Stay in our sustainable lodges.",
      price: "$150",
      
    },
    {
      image: CinnamonTour,
      title: "Cinnamon Tour",
      description: "Explore the cinnamon production process.",
      price: "$100",
    },
  ];

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-primary font-roboto text-3xl font-bold text-center mb-8">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              image={pkg.image}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              onClick={() => alert(`Selected: ${pkg.title}`)}
            />
          ))}
        </div>

        {/* Shop Now Button - Positioned Outside the Grid */}
        <div className="w-full flex justify-center mt-12">
          <button
            className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 
                       hover:bg-primary hover:scale-105 hover:shadow-lg hover:text-black"
            style={{
              backgroundColor: "#19342e",
              color: "#ffffff",
              //fontFamily: theme.fonts.body,
            }}
            onClick={handleBookingNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPackages;
