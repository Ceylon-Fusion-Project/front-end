//import React from "react";
import ecoFarming from "../assets/images/eco-farming.jpg";
import ethicalSourcing from "../assets/images/ethical-sourcing.jpg";
import communityImpact from "../assets/images/community-impact.jpg";

const IntroSection = () => {
  return (
    <div className="bg-[#FAF3E0] min-h-screen flex items-center py-20">  {/* Updated Background */}


   
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h1 className="text-black font-serif text-4xl font-bold">
            Sustainability at Our Core
          </h1>
        </div>

        {/* 3-Column Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <img src={ecoFarming} alt="Eco-friendly Farming" className="w-24 h-24 object-contain mb-4"/>
            <h3 className="text-black font-bold text-lg">Eco-friendly Farming</h3>
            <p className="text-black text-sm">Our cinnamon is grown using sustainable techniques that protect nature.</p>
          </div>

          <div className="flex flex-col items-center">
            <img src={ethicalSourcing} alt="Ethical Sourcing" className="w-24 h-24 object-contain mb-4"/>
            <h3 className="text-black font-bold text-lg">Ethical Sourcing</h3>
            <p className="text-black text-sm">We ensure fair practices and responsible sourcing throughout our supply chain.</p>
          </div>

          <div className="flex flex-col items-center">
            <img src={communityImpact} alt="Community Impact" className="w-24 h-24 object-contain mb-4"/>
            <h3 className="text-black font-bold text-lg">Community Impact</h3>
            <p className="text-black text-sm">We support local communities and promote sustainable development.</p>
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
