import React from "react";
import img from "../assets/images/hero-banner.png";
import Button from "./HeroBannerButton";

const HeroBanner: React.FC = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center text-white text-center px-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to Ceylon Fusion</h1>
        <p className="mt-2 text-lg md:text-xl">Discover amazing products and deals</p>

        {/* Buttons using the reusable Button component */}
        <div className="mt-6 flex flex-wrap justify-center gap-10">
          <Button text="Shop Now" ariaLabel="Shop Now" />
          <Button text="Booking" ariaLabel="Booking" />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
