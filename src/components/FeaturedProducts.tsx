// src/components/FeaturedProducts.tsx
import React from 'react';
import Card from './Card';
import cinnamonPowder from '../assets/images/cinnamon-powder.jpg';
import cinnamonSticks from '../assets/images/cinnamon-sticks.jpg';
import cinnamonOil from '../assets/images/cinnamon-oil.jpg';

const FeaturedProducts = () => {
  const products = [
    {
      image: cinnamonPowder,
      title: 'Cinnamon Powder',
      description: 'Finely ground cinnamon for all your culinary needs.',
      price: '$10',
    },
    {
      image: cinnamonSticks,
      title: 'Cinnamon Sticks',
      description: 'Perfect for brewing and cooking.',
      price: '$15',
    },
    {
      image: cinnamonOil,
      title: 'Cinnamon Oil',
      description: 'Pure cinnamon oil for aromatherapy and cooking.',
      price: '$20',
    },
    
  ];
  

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-primary font-serif text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              onClick={() => alert(`Selected: ${product.title}`)}
            />
          ))}
          

        <button
        
         // onClick={onClick}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
        >
        Shop Now
        </button>

        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;