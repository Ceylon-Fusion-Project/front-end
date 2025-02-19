// src/pages/LandingPage.tsx
import React from 'react';
import IntroSection from '../components/IntroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import FeaturedPackages from '../components/FeaturedPackages';
import TestimonialsSection from '../components/TestimonialsSection';

const LandingPage = () => {
  return (
    <div className=" text-textPrimary">
      {/* Hero Section */}
     

      {/* Intro Section */}
      <section className="  min-h-screen flex items-center justify-center snap-start">
        <IntroSection />
      </section>

      {/* Featured Products Section */}
      <section className="bg-background min-h-screen flex items-center justify-center snap-start">
        <FeaturedProducts />
      </section>

      {/* Featured Packages Section */}
      <section className=" bg-background min-h-screen flex items-center justify-center snap-start">
        <FeaturedPackages />
      </section>

        {/* Featured TestimonialCard */}
        <section className="min-h-screen flex items-center">
        <TestimonialsSection/>
        </section>

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;