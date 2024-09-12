import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TestimonialSection = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials?.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => 
          (prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1)
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1)
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1)
    );
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full mx-auto py-12" style={{ backgroundColor: '#F8F9FF' }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
          What people say
        </h2>
        <div className="relative">
          {/* <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-7 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
          >
            <FaChevronLeft className="h-5 w-5 text-[#035240]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-7 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
          >
            <FaChevronRight className="h-5 w-5 text-[#035240]" />
          </button> */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex space-x-8"
              >
                {[0, 1].map((offset) => {
                  const testimonial = testimonials[(activeIndex + offset) % testimonials.length];
                  return (
                    <div key={testimonial.id} className="w-full lg:w-1/2 flex-shrink-0">
                      <div className="bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-between">
                        <div>
                          <FaQuoteLeft className="text-4xl mb-4 text-[#035240]" />
                          <p className="text-gray-600 mb-6">{testimonial.feedback}</p>
                        </div>
                        <div className="flex items-center">
                          <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                          <div>
                            <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                            <p className="text-gray-500">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;