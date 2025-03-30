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
    <div className="relative w-full h-screen">
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
              backfaceVisibility: 'hidden'
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>
      
      <button
        onClick={resetToDefault}
        className="absolute z-30 px-4 py-2 text-sm font-medium text-white transition-all transform -translate-x-1/2 bg-black rounded-lg top-4 left-1/2 bg-opacity-70 hover:bg-opacity-100 hover:scale-105"
      >
        Reset to Default
      </button>

      {/* Updated button with FiShare as a launch icon, with tooltip */}
      {selectedType && (
        <div className="absolute z-30 flex items-center gap-4 mb-16 bottom-20 right-12">
          <button
            className="flex items-center gap-2 px-6 py-3 text-base font-medium text-white transition-all bg-black shadow-lg rounded-xl hover:bg-gray-800"
          >
            {selectedType === 'accommodation' ? (
              <>
                <FaBed className="w-5 h-5 text-white" />
                Find Rooms
                <span className="relative group">
                  <LaunchIcon className="w-5 h-5 text-white" />
                  {/* Tooltip */}
                  <span className="absolute hidden px-2 py-1 mb-2 text-xs text-white bg-black rounded bottom-full group-hover:block bg-opacity-90">
                    Launch
                  </span>
                </span>
              </>
            ) : (
              <>
                <FaCalendarAlt className="w-5 h-5 text-white" />
                Find Events
                <span className="relative group">
                  <LaunchIcon className="w-5 h-5 text-white" />
                  {/* Tooltip */}
                  <span className="absolute hidden px-2 py-1 mb-2 text-xs text-white bg-black rounded bottom-full group-hover:block bg-opacity-90">
                    Launch
                  </span>
                </span>
              </>
            )}
          </button>
        </div>
      )}
      
      <div className="relative z-10 flex flex-col w-full h-full">
        <div className="w-full px-4 pt-20 pb-4">
          <div className="relative mx-auto max-w-7xl">
            {allCards.length > cardsPerPage && (
              <>
                <button 
                  onClick={goToPreviousCards}
                  className="absolute left-0 z-20 flex items-center justify-center w-10 h-10 -ml-4 transition-all -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100 hover:scale-110"
                >
                  <FiChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button 
                  onClick={goToNextCards}
                  className="absolute right-0 z-20 flex items-center justify-center w-10 h-10 -mr-4 transition-all -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100 hover:scale-110"
                >
                  <FiChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}
            
            <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-6">
              {displayCards.map((card, index) => (
                card ? (
                  <div 
                    key={`${card.name}-${currentCardIndex}`}
                    className="relative overflow-hidden transition-all duration-300 rounded-lg shadow-md cursor-pointer hover:scale-105"
                    onClick={() => handleCardClick(card.image, card.type, card.name)}
                  >
                    <div className="relative h-28 sm:h-32">
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
                          <FaCheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-end p-2 sm:p-3">
                        <h3 className="w-full text-sm font-bold text-center text-white truncate drop-shadow-md sm:text-base">
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

        <div className="flex flex-col items-center justify-center flex-grow px-4 text-center text-white">
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
      </div>

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