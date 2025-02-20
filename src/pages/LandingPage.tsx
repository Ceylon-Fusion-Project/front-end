// src/pages/LandingPage.tsx
//import React from 'react';
import IntroSection from "../components/IntroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import FeaturedPackages from "../components/FeaturedPackages";
import TestimonialsSection from "../components/TestimonialsSection";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/footer";

const LandingPage = () => {
  return (
    // <div className=" text-textPrimary">
    //   {/* Navigation Bar */}
    //   <section>
    //     <Navbar />
    //   </section>

    //   {/* Hero Section */}
    //   <section className="pt-16 h-screen w-full">
    //     <HeroBanner />
    //   </section>

    //   {/* Intro Section */}
    //   <section className="  min-h-screen flex items-center justify-center snap-start">
    //     <IntroSection />
    //   </section>

    //   {/* Featured Products Section */}
    //   <section className="bg-background min-h-screen flex items-center justify-center snap-start">
    //     <FeaturedProducts />
    //   </section>

    //   {/* Featured Packages Section */}
    //   <section className=" bg-background min-h-screen flex items-center justify-center snap-start">
    //     <FeaturedPackages />
    //   </section>

    //   {/* Featured TestimonialCard */}
    //   <section className="bg-background min-h-screen flex items-center justify-center snap-start">
    //     <TestimonialsSection />
    //   </section>

    //   {/* Footer */}
    //   <section>
    //     <Footer />
    //   </section>
    // </div>
    <div className="text-textPrimary snap-y snap-mandatory overflow-y-scroll h-screen">
      {/* Navigation Bar */}
      <section className="snap-start">
        <Navbar />
      </section>

      {/* Hero Section */}
      <section className="snap-start h-screen">
        <HeroBanner />
      </section>

      {/* Intro Section */}
      <section className="snap-start min-h-screen flex items-center justify-center">
        <IntroSection />
      </section>

      {/* Featured Products Section */}
      <section className="snap-start min-h-screen flex items-center justify-center">
        <FeaturedProducts />
      </section>

      {/* Featured Packages Section */}
      <section className="snap-start min-h-screen flex items-center justify-center">
        <FeaturedPackages />
      </section>

      {/* Testimonials Section */}
      <section className="snap-start min-h-screen flex items-center justify-center">
        <TestimonialsSection />
      </section>

      {/* Footer */}
      <section className="snap-start">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
