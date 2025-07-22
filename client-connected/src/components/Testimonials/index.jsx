import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "As a working professional, I struggle big time whenever my paid help is on leave. Hommlie's services have been a game changer. From dusting to bathroom cleaning, they take care of everything.",
      author: "Sunny Gala",
      location: "Electronic City",
      rating: 5,
      image: "/images/testi1.jpg",
    },
    {
      id: 2,
      content:
        "My regular house help doesn't clean fans or bathrooms, so I tried Hommlie. It's super convenient, and they pay attention to details my maid overlooks. I couldn't be happier!",
      author: "Priya Sharma",
      location: "Sarjapura",
      rating: 5,
      image: "/images/testi3.jpg",
    },
    {
      id: 3,
      content:
        "Hommlie's weekly deep cleans have become a part of our routine now. They are professional, punctual, and do a thorough job every single time.",
      author: "Ravi Menon",
      location: "Jayanagar",
      rating: 5,
      image: "/images/testi2.jpg",
    },
    {
      id: 4,
      content:
        "Being a pet parent, cleanliness is everything. Hommlie understood our needs and delivered more than we expected. Highly recommended!",
      author: "Neha Kapoor",
      location: "Nagarbhavi",
      rating: 5,
      image: "/images/testi1.jpg",
    },
  ];

  return (
    <section className="py-0 px-0 sm:py-0 mb-5 sm:px-0"> 
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          What Our Customers Say
        </h2>

    <div className="relative">
      <div className="overflow-x-auto px-2 sm:mr-3 sm:px-0 scrollbar-hide"> {/* Mobile horizontal padding */}
        <div className="flex gap-4 sm:space-x-6 w-max min-h-[500px] items-center pb-4 sm:pb-0"> {/* gap for mobile, space-x only on desktop */}
          {testimonials.map((testimonial, index) => {
            const isFull = index % 2 === 0;
            const heightClass = isFull ? 'h-[460px] sm:h-[480px]' : 'h-[320px] sm:h-[340px]'; // slight height tweak for tighter mobile view

            return (
              <motion.div
                key={testimonial.id + index}
                className={`relative w-72 sm:w-80 ${heightClass} flex-shrink-0 rounded-3xl overflow-hidden shadow-lg flex ${isFull ? 'items-end' : 'items-center'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                {/* Background Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay Card */}
                {isFull && (
                  <div className="relative z-10 w-full px-4 pb-4">
                    <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-md">
                      <p className="text-sm text-[#3f0018] font-medium mb-3 leading-snug">
                        {testimonial.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-[#3f0018]">{testimonial.author}</p>
                        <span className="bg-[#f5f5f5] px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                          {testimonial.location}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Testimonials;