
// import React, { useEffect, useRef } from 'react';
// import { motion, useAnimation, useInView, useScroll } from 'framer-motion';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import EcoFarmingImage from '@/assets/packages/plantation_02.jpg';
// import EthicalSourcingImage from '@/assets/images/ethical-sourcing.jpg';
// import CommunityImpactImage from '@/assets/images/community-impact.jpg';
// import { useState } from 'react';

// interface FeatureCardProps {
//   title: string;
//   description: string;
//   image: string;
//   index: number;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image, index }) => {
//   const controls = useAnimation();
//   const [isHovered, setIsHovered] = useState(false);
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         transition: { delay: index * 0.2, duration: 0.6, ease: "backOut" }
//       });
//     }
//   }, [isInView, controls, index]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={controls}
//       whileHover={{ 
//         scale: 1.03,
//         transition: { duration: 0.3 }
//       }}
//       className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-2xl"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <motion.img
//         src={image}
//         alt={title}
//         className="w-full h-full object-cover brightness-75"
//         initial={{ opacity: 0.7 }}
//         animate={{ 
//           opacity: isHovered ? 0.9 : 0.7,
//           scale: isHovered ? 1.1 : 1
//         }}
//         transition={{ duration: 0.5 }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent flex items-end p-8">
//         <motion.div
//           initial={{ y: 30 }}
//           animate={{ 
//             y: isHovered ? 0 : 30,
//             opacity: isHovered ? 1 : 0.9
//           }}
//           transition={{ duration: 0.4 }}
//         >
//           <h3 className="text-2xl font-bold text-white mb-3">
//             {title}
//           </h3>
//           <motion.p 
//             className="text-gray-100 text-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isHovered ? 1 : 0.8 }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//           >
//             {description}
//           </motion.p>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// const IntroSection: React.FC = () => {
//   const controls = useAnimation();
//   const navigate = useNavigate();
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(sectionRef, {
//     margin: "0px 0px -100px 0px",
//     amount: 0.1
//   });

//   // Scroll progress tracking
//   useScroll({
//     target: sectionRef,
//     offset: ["start end", "end end"]
//   });

//   useEffect(() => {
//     if (isInView) {
//       controls.start({
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.8, ease: "easeOut" }
//       });
//     } else {
//       controls.start({
//         opacity: 0,
//         y: 50
//       });
//     }
//   }, [isInView, controls]);

//   const features = [
//     {
//       title: "Eco-friendly Farming",
//       description: "We grow cinnamon organically without chemicals, using regenerative methods that heal the soil and protect nature. This produces premium-quality cinnamon while keeping farming sustainable for future generations",
//       image: EcoFarmingImage,
//     },
//     {
//       title: "Ethical Sourcing",
//       description: "We partner directly with farmers, paying above fair-trade prices while following all regulations. Our transparent supply chain supports sustainable incomes and preserves traditional cinnamon farming methods.",
//       image: EthicalSourcingImage,
//     },
//     {
//       title: "Community Impact",
//       description: "We provide stable jobs for local families, fund education programs, and improve healthcare access. Your visit or order helps sustain traditional farming communities while preserving Sri Lanka's cinnamon heritage.",
//       image: CommunityImpactImage,
//     }
//   ];

//   return (
//     <section 
//       ref={sectionRef}
//       className="h-screen snap-start flex items-center justify-center py-12 px-4 bg-gradient-to-b from-gray-50 to-white"
//       style={{
//         scrollSnapAlign: 'start',
//         height: '100vh',
//         overflow: 'hidden'
//       }}
//     >
//       <div 
//         ref={containerRef}
//         className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center"
//       >
//         <motion.div 
//           initial={{ opacity: 0, y: -40 }}
//           animate={controls}
//           className="text-center mb-8 lg:mb-12"
//         >
//           <motion.h2 
//             className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             Sustainability at Our <span className="text-green-600">Core</span>
//           </motion.h2>
//           <motion.p 
//             className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             We're committed to responsible farming that benefits both people and the environment.
//           </motion.p>
//         </motion.div>
        
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 flex-grow"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           style={{
//             maxHeight: '60vh',
//             overflow: 'hidden'
//           }}
//         >
//           {features.map((feature, index) => (
//             <FeatureCard
//               key={index}
//               title={feature.title}
//               description={feature.description}
//               image={feature.image}
//               index={index}
//             />
//           ))}
//         </motion.div>

//         <motion.div 
//           className="flex justify-center mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <Button 
//             variant="contained"
//             onClick={() => navigate('/sustainability')}
//             sx={{
//               padding: '14px 32px',
//               fontSize: '1.1rem',
//               fontWeight: 600,
//               textTransform: 'none',
//               borderRadius: '12px',
//               background: 'linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)',
//               color: 'white',
//               boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
//               '&:hover': {
//                 background: 'linear-gradient(45deg, #388E3C 30%, #1B5E20 90%)',
//                 boxShadow: '0 6px 24px rgba(76, 175, 80, 0.4)'
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             Discover Our Sustainability Journey
//           </Button>
//         </motion.div>

//         <motion.div 
//           className="text-center text-gray-500"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <p className="text-base md:text-lg italic">
//             Quality cinnamon grown with care for nature and communities.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default IntroSection;

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EcoFarmingImage from '@/assets/packages/plantation_02.jpg';
import EthicalSourcingImage from '@/assets/images/ethical-sourcing.jpg';
import CommunityImpactImage from '@/assets/images/community-impact.jpg';
import { useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image, index }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.15, duration: 0.5, ease: "backOut" }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      className="relative h-full rounded-xl overflow-hidden shadow-lg"
      style={{ minHeight: 'clamp(300px, 30vh, 400px)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover brightness-75"
        initial={{ opacity: 0.7 }}
        animate={{ 
          opacity: isHovered ? 0.9 : 0.7,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent flex items-end p-6">
        <motion.div
          initial={{ y: 20 }}
          animate={{ 
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <motion.p 
            className="text-gray-100 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const IntroSection: React.FC = () => {
  const controls = useAnimation();
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      });
    }
  }, [isInView, controls]);

  const features = [
    {
      title: "Eco-friendly Farming",
      description: "We grow cinnamon organically without chemicals, using regenerative methods that heal the soil and protect nature.",
      image: EcoFarmingImage,
    },
    {
      title: "Ethical Sourcing",
      description: "We partner directly with farmers, paying above fair-trade prices while following all regulations.",
      image: EthicalSourcingImage,
    },
    {
      title: "Community Impact",
      description: "We provide stable jobs for local families, fund education programs, and improve healthcare access.",
      image: CommunityImpactImage,
    }
  ];

  return (
    <section 
      ref={ref}
      className="h-screen w-full snap-start flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          className="text-center mb-6 md:mb-10"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sustainability at Our <span className="text-green-600">Core</span>
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We're committed to responsible farming that benefits both people and the environment.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ maxHeight: '60vh' }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            variant="contained"
            onClick={() => navigate('/sustainability')}
            sx={{
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #388E3C 30%, #1B5E20 90%)',
                boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Discover Our Sustainability Journey
          </Button>
          <motion.p 
            className="text-gray-500 text-sm md:text-base italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Quality cinnamon grown with care for nature and communities.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;