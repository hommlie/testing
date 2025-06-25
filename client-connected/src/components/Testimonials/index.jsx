import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "As a working professional, I struggle big time whenever my paid help is on leave. Snabbit's services have been a game changer. From dusting to bathroom cleaning, they take care of everything.",
      author: "Sunny Gala",
      location: "Powai",
      rating: 5
    },
    {
      id: 2,
      content: "My regular house help doesn't clean fans or bathrooms, so I tried Snabbit. It's super convenient, and they pay attention to details my maid overlooks. I couldn't be happier!",
      author: "Priya Sharma",
      location: "Andheri",
      rating: 5
    },
    // Add more testimonials as needed
    {
      id: 1,
      content: "As a working professional, I struggle big time whenever my paid help is on leave. Snabbit's services have been a game changer. From dusting to bathroom cleaning, they take care of everything.",
      author: "Sunny Gala",
      location: "Powai",
      rating: 5
    },
    {
      id: 2,
      content: "My regular house help doesn't clean fans or bathrooms, so I tried Snabbit. It's super convenient, and they pay attention to details my maid overlooks. I couldn't be happier!",
      author: "Priya Sharma",
      location: "Andheri",
      rating: 5
    },
    
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
        
        <div className="relative">
          {/* Scrollable container */}
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex space-x-6 w-max px-4">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  className="w-80 flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;