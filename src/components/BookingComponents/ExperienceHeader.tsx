import AgricultureIcon from '@mui/icons-material/Agriculture';
import GrassIcon from '@mui/icons-material/Grass';
import image01 from '../../assets/events/tour_01.jpg';
import image02 from '../../assets/events/market_01.jpg';
import { theme } from '@/styles/theme';
import { useEffect, useState, useRef } from 'react';

const ExperienceHeader = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef(null);

  const scrollToExperienceList = () => {
    const experienceListSection = document.getElementById('experience-list');
    if (experienceListSection) {
      experienceListSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimating(true);
          const timer = setTimeout(() => {
            setIsAnimating(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative max-w-6xl p-6 mx-auto mb-24 bg-white">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left content section */}
        <div className="w-full md:w-1/2">
          <h1
            className="mb-8 text-5xl font-semibold"
            style={{ fontFamily: theme.fonts.sans[0] }}
          >
            Authentic Experiences
          </h1>

          <p className="mb-12 text-[#4f9494]">
            Immerse yourself in the authentic world of Ceylon cinnamon. Our hands-on experiences take you through the entire journey of this precious spice - from planting and harvesting to processing and tasting. Discover the centuries-old traditions that make our cinnamon the finest in the world.
          </p>

          <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2">
            {/* Experience 1: Planting */}
            <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                    <AgricultureIcon sx={{ fontSize: 48, color: '#4f9494' }} />
                </div>
                <div>
                    <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: theme.fonts.sans[0] }}
                    >
                        Plantation Tour
                    </h3>
                </div>
            </div>

            {/* Experience 2: Harvesting */}
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <GrassIcon sx={{ fontSize: 48, color: '#4f9494' }} />
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: theme.fonts.sans[0] }}
                >
                  Harvesting
                </h3>
              </div>
            </div>
          </div>

          <ul className="mb-12 space-y-4">
            <li className="flex items-start gap-2">
              <svg
                className="flex-shrink-0 w-6 h-6 mt-1 text-[#023d3d]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-[#68a3a3]">
                <strong>Hands-on Activities:</strong> Participate in cinnamon planting, peeling, and drying processes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="flex-shrink-0 w-6 h-6 mt-1 text-[#023d3d]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-[#68a3a3]">
                <strong>Expert Guidance:</strong> Learn from generations of cinnamon growers and processors.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="flex-shrink-0 w-6 h-6 mt-1 text-[#023d3d]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" fillOpacity="0.2" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-[#68a3a3]">
                <strong>Sensory Journey:</strong> Experience the aroma, texture, and flavor of fresh cinnamon.
              </span>
            </li>
          </ul>

          <button
            onClick={scrollToExperienceList}
            className="px-8 py-4 font-bold text-white bg-[#023333] hover:bg-[#035c5c] transition-colors duration-300"
          >
            VIEW EXPERIENCES
          </button>
        </div>

        {/* Right images section */}
        <div className="relative w-full mt-24 md:w-1/2" ref={imageRef}>
          <div className="relative">
            <div 
              className="w-full h-[480px] bg-gray-200 rounded-sm shadow-lg overflow-hidden"
              style={{
                animation: isAnimating ? 'fadeInUp 5s forwards' : 'none'
              }}
            >
              <img
                src={image01}
                alt="Cinnamon Plantation"
                className="object-cover w-full h-full"
              />
            </div>

            <div 
              className="absolute w-64 h-64 overflow-hidden bg-gray-200 border-8 border-white rounded-sm shadow-lg -top-24 -right-12"
              style={{
                animation: isAnimating ? 'fadeInScale 5s 0.5s forwards' : 'none'
              }}
            >
              <img
                src={image02}
                alt="Cinnamon Processing"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 border-2 border-amber-200 -z-10" />

      {/* Add keyframe animations to the component */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceHeader;