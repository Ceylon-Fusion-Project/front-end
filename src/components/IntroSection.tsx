import React from "react";
import ecoFarming from "../assets/images/eco-farming.jpg";
import ethicalSourcing from "../assets/images/ethical-sourcing.jpg";
import communityImpact from "../assets/images/community-impact.jpg";
import { motion } from "framer-motion"; // For animations
import { FaLeaf, FaHandsHelping, FaUsers } from "react-icons/fa"; // Modern icons

const IntroSection = () => {
  return (
    <div className="bg-[#FAF3E0] min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif font-bold text-[#8B4513] mb-4">
            Sustainability at Our Core
          </h1>
          <p className="text-[#4A4A4A] text-lg">
            Discover how Ceylon Fusion is committed to eco-friendly practices,
            ethical sourcing, and community impact.
          </p>
        </motion.div>

        {/* 3-Column Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Eco-friendly Farming */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-[#8B4513] rounded-full mb-4">
              <FaLeaf className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
              Eco-friendly Farming
            </h3>
            <p className="text-[#4A4A4A] text-sm">
              Our cinnamon is grown using sustainable techniques that protect
              nature and promote biodiversity.
            </p>
          </motion.div>

          {/* Ethical Sourcing */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-[#8B4513] rounded-full mb-4">
              <FaHandsHelping className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
              Ethical Sourcing
            </h3>
            <p className="text-[#4A4A4A] text-sm">
              We ensure fair practices and responsible sourcing throughout our
              supply chain.
            </p>
          </motion.div>

          {/* Community Impact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-[#8B4513] rounded-full mb-4">
              <FaUsers className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
              Community Impact
            </h3>
            <p className="text-[#4A4A4A] text-sm">
              We support local communities and promote sustainable development.
            </p>
          </motion.div>
        </div>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="bg-[#8B4513] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#6B2C1E] transition-colors duration-300 flex items-center justify-center mx-auto">
            Learn More About Our Sustainability
            <FaLeaf className="ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroSection;