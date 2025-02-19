// src/pages/LandingPage.tsx
import React from 'react';
import IntroSection from '../components/IntroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import FeaturedPackages from '../components/FeaturedPackages';
import TestimonialsSection from '../components/TestimonialsSection';

const LandingPage = () => {
  return (
    <div className="bg-background text-textPrimary">
      {/* Hero Section */}
     

      {/* Intro Section */}
      <section className="min-h-screen flex items-center">
        <IntroSection />
      </section>

      {/* Featured Products Section */}
      <section className="min-h-screen flex items-center">
        <FeaturedProducts />
      </section>

      {/* Featured Packages Section */}
      <section className="min-h-screen flex items-center">
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