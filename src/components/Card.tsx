// src/components/Card.tsx
import React from 'react';

interface CardProps {
  image: string;
  title: string;
  description: string;
  price?: string;
  onClick?: () => void; // Add this line
}

const Card: React.FC<CardProps> = ({ image, title, description, price, onClick }) => {
  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-primary font-serif text-xl font-bold mb-2">{title}</h3>
        <p className="text-secondary font-sans text-sm mb-4">{description}</p>
        {price && <p className="text-accent font-sans text-lg font-semibold mb-4">{price}</p>}
        <button
          onClick={onClick}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
        >
         Quick Buy
        </button>
      </div>
    </div>
  );
};

export default Card;