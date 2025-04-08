
// import React from "react";
// import TestimonialCard from "./TestimonialCard";

// const TestimonialsSection: React.FC = () => {
//   return (
//     <section className="bg-[#F8EBD4] py-12"> 
//       {/* You can change the background color to match your design (#F8EBD4, #EDE2CA, etc.) */}
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
//         What Our Customers Say
//       </h2>

//       {/* Container for testimonials */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
//         <TestimonialCard
//           feedback="The cinnamon from this farm is the best I’ve ever tasted!"
//           userName="John Doe"
//         />
//         <TestimonialCard
//           feedback="Our stay at the eco-lodge was unforgettable. We learned so much about sustainable farming!"
//           userName="Jane Smith"
//         />
//       </div>

//       {/* Our Impact section */}
//       <div className="max-w-6xl mx-auto text-center mt-12 px-4">
//         <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
//         <p className="text-gray-700">
//           We’ve planted 10,000+ trees as part of our sustainability mission.
//           <br />
//           Trusted by major organic brands worldwide.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;

import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.jpg';
import photo3 from '@/assets/photo3.jpg';

const testimonials = [
  {
    message: 'The cinnamon quality surpassed all my expectations. The aroma and flavor are unmatched!',
    bgImage: photo1,
    name: 'John Doe',
    country: 'USA',
    rating: 5
  },
  {
    message: 'Booking the estate tour was seamless. The experience of seeing cinnamon harvesting firsthand was unforgettable.',
    bgImage: photo2,
    name: 'Jane Smith',
    country: 'Canada',
    rating: 5
  },
  {
    message: 'As a chef, I appreciate the premium quality. My customers can taste the difference in every dish.',
    bgImage: photo3,
    name: 'Carlos Garcia',
    country: 'Spain',
    rating: 4
  },
  {
    message: 'The cinnamon oil has become essential in my wellness routine. Pure, potent, and sustainably sourced.',
    bgImage: photo1,
    name: 'Maria Lopez',
    country: 'Mexico',
    rating: 5
  },
  {
    message: 'From ordering online to visiting the estate - every interaction reflects their commitment to excellence.',
    bgImage: photo2,
    name: 'Liam Brown',
    country: 'Australia',
    rating: 5
  },
  {
    message: 'The customer service is exceptional. They helped me choose the perfect cinnamon variety for my bakery.',
    bgImage: photo3,
    name: 'Sophie Martin',
    country: 'France',
    rating: 5
  },
  {
    message: 'The organic certification gives me confidence in their products. Truly ethical sourcing.',
    bgImage: photo1,
    name: 'David Wilson',
    country: 'UK',
    rating: 4
  },
];

const TestimonialsSection = () => {
  return (
    <section className="h-screen w-full bg-gradient-to-b from-amber-50 to-white overflow-hidden flex flex-col justify-start">
      <div className="w-full max-w-7xl mx-auto px-4 pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
            Voices of Our Community
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why tourists, travelers ,chef and  wellness enthusiasts worldwide trust our cinnamon and experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="relative">
            <div className="flex overflow-x-auto pb-6 md:pb-8 gap-4 md:gap-6 snap-x snap-mandatory scrollbar-hide scroll-smooth">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-64 md:h-72 rounded-2xl shadow-xl overflow-hidden relative snap-center"
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 hover:scale-105"
                    style={{ backgroundImage: `url(${testimonial.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-4 sm:p-5">
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) =>
                        i < testimonial.rating ? (
                          <StarIcon key={i} className="text-amber-400" fontSize="small" />
                        ) : (
                          <StarBorderIcon key={i} className="text-amber-400" fontSize="small" />
                        )
                      )}
                    </div>
                    <p className="text-white text-xs sm:text-sm md:text-base font-medium mb-2">
                      {testimonial.message}
                    </p>
                    <div>
                      <h3 className="text-white text-sm sm:text-base md:text-lg font-bold">
                        {testimonial.name}
                      </h3>
                      <p className="text-amber-200 text-xs sm:text-sm">{testimonial.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-amber-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

