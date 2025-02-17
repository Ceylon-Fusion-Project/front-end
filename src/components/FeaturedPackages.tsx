// src/components/FeaturedPackages.tsx
import React from 'react';
import Card from './Card';
import NatureRetreat from '../assets/images/nature-retreat.jpg';
import EcoFriendlyLodge from '../assets/images/eco-friendly-lodge.jpg';
import CinnamonTour from '../assets/images/cinnamon-tour.jpg';

const FeaturedPackages = () => {
  const packages = [
    {
      image: NatureRetreat,
      title: 'Nature Retreat',
      description: 'Experience the beauty of cinnamon plantations.',
      price: '$200',
    },
    {
      image: EcoFriendlyLodge,
      title: 'Eco-Friendly Lodge',
      description: 'Stay in our sustainable lodges.',
      price: '$150',
    },
    {
      image: CinnamonTour,
      title: 'Cinnamon Tour',
      description: 'Explore the cinnamon production process.',
      price: '$100',
    },
  ];

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-primary font-serif text-3xl font-bold text-center mb-8">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              image={pkg.image}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              onClick={() => alert(`Selected: ${pkg.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPackages;