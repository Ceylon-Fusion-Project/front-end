import React, { useState, useEffect } from 'react';
import image1 from "../../assets/images/Villa04.jpg";
import image2 from "../../assets/images/Villa05.jpg";
import image3 from "../../assets/images/Villa02.jpg";
import BookNowButton from "./BookNowButton";

const HeroBanner: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image Slideshow Background */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <div 
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">
          Book Your Dream Getaway
        </h1>
        <p className="mb-6 text-lg font-medium md:text-2xl">
            Your dream stay, just a click away!
        </p>
        <div className="flex flex-col gap-4 mt-2 sm:flex-row">
            <BookNowButton scrollToId="booking-section" />
        </div>
      </div>
      
      {/* Slideshow Indicators */}
      <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-24 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex 
                ? 'bg-white border-2 border-black' 
                : 'bg-white/50 border-2 border-black/50'
            }`}
          />
        ))}
      </div>

      {/* Wave shape at the bottom - Increased height */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,128L80,138.7C160,149,320,171,480,160C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;