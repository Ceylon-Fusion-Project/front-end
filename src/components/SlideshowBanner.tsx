import React, { useState, useEffect } from "react";

// Replace these paths with the actual paths or URLs to your images
const bannerImages = [
  "C:/Users/User/Downloads/coffee-2534919_1920.jpg",
  "C:/Users/User/Downloads/pexels-katja-b-713703402-30705538.jpg",
  "C:/Users/User/Downloads/tea-6791234_1920.jpg",
];

const SlideshowBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-64 md:h-96 bg-center bg-cover bg-no-repeat transition-all duration-700"
      style={{
        backgroundImage: `url(${bannerImages[currentIndex]})`,
      }}
    >
      {/* Optional overlay for darkening/lightening the background image */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Find your Product
        </h1>
        <p className="text-sm md:text-xl font-medium">
          100% pure &amp; Sustainable.
        </p>
      </div>
    </div>
  );
};

export default SlideshowBanner;
