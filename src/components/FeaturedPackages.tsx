// src/components/FeaturedPackages.tsx
import React from 'react';
import Card from './Card';

const FeaturedPackages = () => {
  const packages = [
    {
      image: 'https://via.placeholder.com/300',
      title: 'Nature Retreat',
      description: 'Experience the beauty of cinnamon plantations.',
      price: '$200',
    },
    {
      image: 'https://via.placeholder.com/300',
      title: 'Eco-Friendly Lodge',
      description: 'Stay in our sustainable lodges.',
      price: '$150',
    },
    {
      image: 'https://via.placeholder.com/300',
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