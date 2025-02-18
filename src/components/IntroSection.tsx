import React from "react";
import ecoFarming from "../assets/images/eco-farming.jpg";
import ethicalSourcing from "../assets/images/ethical-sourcing.jpg";
import communityImpact from "../assets/images/community-impact.jpg";

const IntroSection = () => {
  return (
    <div className="bg-green-300 py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="text-black font-serif text-4xl font-bold mb-4">
            Sustainability at Our Core
          </h1>
        </div>

        {/* 3-Column Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <img
              src={ecoFarming}
              alt="Eco-friendly Farming"
              className="w-24 h-24 object-contain mb-4"
            />
            <h3 className="text-black font-bold text-lg mt-2">
              Eco-friendly Farming
            </h3>
            <p className="text-black text-sm mb-6">
              Our cinnamon is grown using sustainable techniques that protect nature.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={ethicalSourcing}
              alt="Ethical Sourcing"
              className="w-24 h-24 object-contain mb-4"
            />
            <h3 className="text-black font-bold text-lg mt-2">Ethical Sourcing</h3>
            <p className="text-black text-sm mb-6">
              We ensure fair practices and responsible sourcing throughout our supply chain.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={communityImpact}
              alt="Community Impact"
              className="w-24 h-24 object-contain mb-4"
            />
            <h3 className="text-black font-bold text-lg mt-2">Community Impact</h3>
            <p className="text-black text-sm mb-6">
              We support local communities and promote sustainable development.
            </p>
          </div>
        </div>

        {/* Learn More Button */}
        <div className="text-center mt-8">
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800">
            Learn More About Our Sustainability
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
