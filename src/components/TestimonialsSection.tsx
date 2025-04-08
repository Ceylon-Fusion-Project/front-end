import React from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-12"> 
      {/* You can change the background color to match your design (#F8EBD4, #EDE2CA, etc.) */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>

      {/* Container for testimonials */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <TestimonialCard
          feedback="The cinnamon from this farm is the best I’ve ever tasted!"
          userName="John Doe"
        />
        <TestimonialCard
          feedback="Our stay at the eco-lodge was unforgettable. We learned so much about sustainable farming!"
          userName="Jane Smith"
        />
      </div>

      {/* Our Impact section */}
      <div className="max-w-6xl mx-auto text-center mt-12 px-4">
        <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
        <p className="text-gray-700">
          We’ve planted 10,000+ trees as part of our sustainability mission.
          <br />
          Trusted by major organic brands worldwide.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;

