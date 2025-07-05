import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "As a working professional, I struggle big time whenever my paid help is on leave. Snabbit's services have been a game changer. From dusting to bathroom cleaning, they take care of everything.",
      author: "Sunny Gala",
      location: "Powai",
      rating: 5,
      image: "/images/testi1.jpg",
    },
    {
      id: 2,
      content:
        "My regular house help doesn't clean fans or bathrooms, so I tried Snabbit. It's super convenient, and they pay attention to details my maid overlooks. I couldn't be happier!",
      author: "Priya Sharma",
      location: "Andheri",
      rating: 5,
      image: "/images/testi1.jpg",
    },
    {
      id: 3,
      content:
        "Snabbit's weekly deep cleans have become a part of our routine now. They are professional, punctual, and do a thorough job every single time.",
      author: "Ravi Menon",
      location: "Koramangala",
      rating: 5,
      image: "/images/testi1.jpg",
    },
    {
      id: 4,
      content:
        "Being a pet parent, cleanliness is everything. Snabbit understood our needs and delivered more than we expected. Highly recommended!",
      author: "Neha Kapoor",
      location: "Indiranagar",
      rating: 5,
      image: "/images/testi1.jpg",
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What Our Customers Say
        </h2>

        <div className="relative">
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex space-x-6 w-max px-4 min-h-[500px] items-center">
              {testimonials.map((testimonial, index) => {
                const isFull = index % 2 === 0;
                const heightClass = isFull ? 'h-[480px]' : 'h-[340px]';

                return (
                  <motion.div
                    key={testimonial.id + index}
                    className={`relative w-80 ${heightClass} flex-shrink-0 rounded-3xl overflow-hidden shadow-lg flex ${isFull ? 'items-end' : 'items-center'}`}
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