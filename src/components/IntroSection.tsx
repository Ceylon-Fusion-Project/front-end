
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  const ref = useRef(null);
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
      className="relative rounded-xl overflow-hidden shadow-lg min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-full object-cover brightness-75"
        animate={{ 
          opacity: isHovered ? 0.9 : 0.7,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent flex items-end p-6">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
          <motion.p 
            className="text-gray-100 text-sm md:text-base"
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
  const ref = useRef(null);
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
      className="w-full flex flex-col items-center justify-center px-4 py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        className="text-center mb-10"
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sustainability at Our <span className="text-green-600">Core</span>
        </motion.h2>
        <motion.p 
          className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          We're committed to responsible farming that benefits both people and the environment.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
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
        className="mt-10 flex justify-center"
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
      </motion.div>
    </section>
  );
};

export default IntroSection;
