// src/components/IntroSection.tsx
import React from 'react';
import ecoFarming from '../assets/images/eco-farming.jpg';
import ethicalSourcing from '../assets/images/ethical-sourcing.jpg';
import communityImpact from '../assets/images/community-impact.jpg';

const IntroSection = () => {
  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Sustainability Text */}
        <div className="text-center mb-12">
          <h1 className="text-primary font-serif text-4xl font-bold mb-4">
            Sustainability at Our Core
          </h1>
          <p className="text-secondary font-sans text-lg">
            Our cinnamon is grown using sustainable techniques that protect nature.
          </p>
        </div>

        {/* 3-Column Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src={ecoFarming}
              alt="Eco-friendly Farming"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-primary font-serif text-xl font-bold mb-2">
              Eco-friendly Farming
            </h3>
            <p className="text-secondary font-sans text-sm">
              Our cinnamon is grown using sustainable techniques that protect nature.
            </p>
          </div>

          <div className="text-center">
            <img
              src={ethicalSourcing}
              alt="Ethical Sourcing"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-primary font-serif text-xl font-bold mb-2">
              Ethical Sourcing
            </h3>
            <p className="text-secondary font-sans text-sm">
              We ensure fair practices and responsible sourcing throughout our supply chain.
            </p>
          </div>

          <div className="text-center">
            <img
              src={communityImpact}
              alt="Community Impact"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-primary font-serif text-xl font-bold mb-2">
              Community Impact
            </h3>
            <p className="text-secondary font-sans text-sm">
              We support local communities and promote sustainable development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;