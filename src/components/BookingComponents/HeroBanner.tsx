import React, { useState, useEffect } from 'react';
import image1 from "../../assets/images/Villa01.jpg";
import image2 from "../../assets/images/Villa02.jpg";
import image3 from "../../assets/images/Villa03.jpg";
import image4 from "../../assets/images/Villa04.jpg";
import image5 from "../../assets/images/Villa05.jpg";
import image6 from "../../assets/images/Villa06.jpg";
import image7 from "../../assets/images/Event01.jpg";
import image8 from "../../assets/images/Event02.jpg";
import image9 from "../../assets/images/Event03.jpg";
import image10 from "../../assets/images/Event04.jpg";
import image11 from "../../assets/images/Event05.jpg";
import image12 from "../../assets/images/Event06.jpg";
import BookNowButton from "./BookNowButton";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaBed, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import LaunchIcon from '@mui/icons-material/Launch';

const HeroBanner: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>(image1);
  const [selectedType, setSelectedType] = useState<'accommodation' | 'experience' | null>('accommodation');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    const preloadImages = [...accommodations.map(a => a.image), ...experiences.map(e => e.image)];
    preloadImages.forEach(imgSrc => {
      const img = new Image();
      img.src = imgSrc;
    });
  }, []);

  const accommodations = [
    { name: "Cinnamon Breeze", image: image1, type: 'accommodation' },
    { name: "Spice Haven", image: image2, type: 'accommodation' },
    { name: "Ceylon Serenity", image: image3, type: 'accommodation' },
    { name: "Golden Bark Villa", image: image4, type: 'accommodation' },
    { name: "Cinnamon Whisper", image: image5, type: 'accommodation' },
    { name: "Ceylon Charm", image: image6, type: 'accommodation' },
  ];

  const experiences = [
    { name: "Cinnamon Tour", image: image7, type: 'experience' },
    { name: "Cinnamon Peeling", image: image8, type: 'experience' },
    { name: "Cinnamon Plantation", image: image9, type: 'experience' },
    { name: "Cinnamon Cooking", image: image10, type: 'experience' },
    { name: "Cinnamon Organic Farm", image: image11, type: 'experience' },
    { name: "Cinnamon Stick", image: image12, type: 'experience' },
  ];


  // const scrollToBookingArea = () => {
  //   const bookingAreaSection = document.getElementById('booking-area');
  //   if (bookingAreaSection) {
  //     bookingAreaSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  const allCards = [];
  const maxLength = Math.max(accommodations.length, experiences.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < accommodations.length) allCards.push(accommodations[i]);
    if (i < experiences.length) allCards.push(experiences[i]);
  }

  const cardsPerPage = 6;
  const totalPages = Math.ceil(allCards.length / cardsPerPage);
  const visibleCards = allCards.slice(
    currentCardIndex * cardsPerPage,
    (currentCardIndex + 1) * cardsPerPage
  );

  const emptyCardsNeeded = cardsPerPage - visibleCards.length;
  const displayCards = [
    ...visibleCards,
    ...Array(emptyCardsNeeded > 0 ? emptyCardsNeeded : 0).fill(null)
  ];

  const goToPreviousCards = () => {
    setCurrentCardIndex(prev => 
      prev === 0 ? totalPages - 1 : prev - 1
    );
  };

  const goToNextCards = () => {
    setCurrentCardIndex(prev => 
      prev === totalPages - 1 ? 0 : prev + 1
    );
  };

  const handleCardClick = (image: string, type: 'accommodation' | 'experience', name: string) => {
    setSelectedImage(image);
    setSelectedType(type);
    setSelectedCard(name);
  };

  const resetToDefault = () => {
    setSelectedImage(image1);
    setSelectedType('accommodation');
    setSelectedCard("Cinnamon Breeze");
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={selectedImage}
            alt="Selected item"
            className="object-cover w-full h-full"
            loading="eager"
            decoding="async"
            style={{
              imageRendering: 'crisp-edges',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              filter: 'blur(1.5px)'
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetToDefault}
        className="absolute z-30 px-3 py-1 text-xs font-medium text-white transition-all transform -translate-x-1/2 bg-black rounded-lg sm:px-4 sm:py-2 sm:text-sm top-4 left-1/2 bg-opacity-70 hover:bg-opacity-100 hover:scale-105"
      >
        Reset to Default
      </button>

      {/* Find Rooms/Events Button */}
      {/* {selectedType && (
        <div className="absolute z-30 flex items-center gap-2 mb-8 sm:gap-4 sm:mb-16 bottom-12 sm:bottom-20 right-4 sm:right-12">
          <button
            className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white transition-all bg-[#11221d] shadow-lg rounded-xl hover:bg-[#22443a]"
          >
            {selectedType === 'accommodation' ? (
              <>
                <FaBed className="w-4 h-4 sm:w-5 sm:h-5 text-[#ddeee9]" />
                Find Rooms
                <span className="relative group">
                  <LaunchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ddeee9]" />
                  <span className="absolute hidden px-2 py-1 mb-2 text-xs text-[#ddeee9] bg-black rounded bottom-full group-hover:block bg-opacity-90">
                    Launch
                  </span>
                </span>
              </>
            ) : (
              <>
                <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#ddeee9]" />
                Find Events
                <span className="relative group">
                  <LaunchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ddeee9]" />
                  <span className="absolute hidden px-2 py-1 mb-2 text-xs text-[#ddeee9] bg-black rounded bottom-full group-hover:block bg-opacity-90">
                    Launch
                  </span>
                </span>
              </>
            )}
          </button>
        </div>
      )} */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <div className="w-full px-2 pt-16 pb-4 sm:px-4 sm:pt-20">
          <div className="relative mx-auto max-w-7xl">
            {allCards.length > cardsPerPage && (
              <>
                <button 
                  onClick={goToPreviousCards}
                  className="absolute left-0 z-20 flex items-center justify-center w-8 h-8 -ml-2 transition-all -translate-y-1/2 bg-white rounded-full shadow-md sm:w-10 sm:h-10 sm:-ml-4 top-1/2 hover:bg-gray-100 hover:scale-110"
                >
                  <FiChevronLeft className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6" />
                </button>
                <button 
                  onClick={goToNextCards}
                  className="absolute right-0 z-20 flex items-center justify-center w-8 h-8 -mr-2 transition-all -translate-y-1/2 bg-white rounded-full shadow-md sm:w-10 sm:h-10 sm:-mr-4 top-1/2 hover:bg-gray-100 hover:scale-110"
                >
                  <FiChevronRight className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
            
            <div className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:px-4">
              {displayCards.map((card, index) => (
                card ? (
                  <div 
                    key={`${card.name}-${currentCardIndex}`}
                    className="relative overflow-hidden transition-all duration-300 rounded-lg shadow-md cursor-pointer hover:scale-105"
                    onClick={() => handleCardClick(card.image, card.type, card.name)}
                  >
                    <div className="relative h-24 sm:h-28 md:h-32">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      {selectedCard === card.name && (
                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <FaCheckCircle className="w-6 h-6 text-green-500 sm:w-8 sm:h-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-end p-1 sm:p-2 md:p-3">
                        <h3 className="w-full text-xs font-bold text-center text-white truncate sm:text-sm md:text-base drop-shadow-md">
                          {card.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    key={`empty-${index}`}
                    className="overflow-hidden bg-transparent rounded-lg cursor-default"
                    aria-hidden="true"
                  />
                )
              ))}
            </div>
          </div>
        </div>

        {/* Centered Hero Text */}
        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center text-white min-h-[50vh]">
          <h1 className="mb-2 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Book Your Dream Getaway
          </h1>
          <p className="mb-4 text-base font-medium sm:mb-6 sm:text-lg md:text-xl lg:text-2xl">
            Your dream stay, just a click away!
          </p>
          <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:gap-4">

            {/* <BookNowButton scrollToId="booking-section" /> */}

          </div>
        </div>
      </div>

      {/* Bottom SVG */}
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