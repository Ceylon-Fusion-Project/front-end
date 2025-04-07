

// import { motion } from "framer-motion"; // For animations
// import { FaLeaf, FaHandsHelping, FaUsers } from "react-icons/fa"; // Modern icons

// const IntroSection = () => {
//   return (
//     <div className="bg-[#FAF3E0] min-h-screen flex items-center py-20 relative overflow-hidden">
//       {/* Subtle Background Pattern */}
//       <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')] opacity-10"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Title */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl font-serif font-bold text-[#59332c] mb-4">
//             Sustainability at Our Core
//           </h1>
//           <p className="text-[#4A4A4A] text-lg">
//             Discover how Ceylon Fusion is committed to eco-friendly practices,
//             ethical sourcing, and community impact.
//           </p>
//         </motion.div>

//         {/* 3-Column Image Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           {/* Eco-friendly Farming */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <div className="w-20 h-20 flex items-center justify-center bg-[#86d72f] rounded-full mb-4">
//               <FaLeaf className="text-3xl text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-[#86d72f] mb-2">
//               Eco-friendly Farming
//             </h3>
//             <p className="text-[#4A4A4A] text-sm">
//               Our cinnamon is grown using sustainable techniques that protect
//               nature and promote biodiversity.
//             </p>
//           </motion.div>

//           {/* Ethical Sourcing */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <div className="w-20 h-20 flex items-center justify-center bg-[#59332c] rounded-full mb-4">
//               <FaHandsHelping className="text-3xl text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
//               Ethical Sourcing
//             </h3>
//             <p className="text-[#4A4A4A] text-sm">
//               We ensure fair practices and responsible sourcing throughout our
//               supply chain.
//             </p>
//           </motion.div>

//           {/* Community Impact */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <div className="w-20 h-20 flex items-center justify-center bg-[#c29a64] rounded-full mb-4">
//               <FaUsers className="text-3xl text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-[#c29a64] mb-2">
//               Community Impact
//             </h3>
//             <p className="text-[#4A4A4A] text-sm">
//               We support local communities and promote sustainable development.
//             </p>
//           </motion.div>
//         </div>

//         {/* Learn More Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="text-center mt-16"
//         >
//           <button className="bg-[#8B4513] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#6B2C1E] transition-colors duration-300 flex items-center justify-center mx-auto">
//             Learn More About Our Sustainability
//             <FaLeaf className="ml-2" />
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default IntroSection;


import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import EcoFarmingImage from '@/assets/packages/plantation_02.jpg';
import EthicalSourcingImage from '@/assets/images/ethical-sourcing.jpg';
import CommunityImpactImage from '@/assets/images/community-impact.jpg';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image, index }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 }
    });
  }, [controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative h-full min-h-[350px] rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover brightness-75"
        initial={{ opacity: 0.7 }}
        animate={{ 
          opacity: isHovered ? 0.8 : 0.7,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.5 }}
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
          <h3 className="text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <motion.p 
            className="text-gray-100"
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
      });
    }
  }, [inView, controls]);

  const features = [
    {
      title: "Eco-friendly Farming",
      description: "We grow cinnamon organically without chemicals, using regenerative methods that heal the soil and protect nature. This produces premium-quality cinnamon while keeping farming sustainable for future generations",
      image: EcoFarmingImage,
    },
    {
      title: "Ethical Sourcing",
      description: "We partner directly with farmers, paying above fair-trade prices while following all regulations. Our transparent supply chain supports sustainable incomes and preserves traditional cinnamon farming methods.",
      image: EthicalSourcingImage,
    },
    {
      title: "Community Impact",
      description: "We provide stable jobs for local families, fund education programs, and improve healthcare access. Your visit or order helps sustain traditional farming communities while preserving Sri Lanka's cinnamon heritage.",
      image: CommunityImpactImage,
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sustainability at Our Core
          </h2>
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We're committed to responsible farming that benefits both people and the environment.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm md:text-base italic">
            Quality cinnamon grown with care for nature and communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;