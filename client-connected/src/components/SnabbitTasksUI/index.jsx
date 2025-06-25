import React from 'react';
import { motion } from 'framer-motion';

const tasks = [
  { title: 'General Cleaning', image: '/images/general-cleaning.png' },
  { title: 'Dishwashing', image: '/images/dishwashing.png' },
  { title: 'Laundry', image: '/images/laundry.png' },
  { title: 'Fan Cleaning', image: '/images/fan-cleaning.png' },
  { title: 'Kitchen Prep', image: '/images/kitchen-prep.png' },
  { title: 'Window Cleaning', image: '/images/window-cleaning.png' },
  { title: 'Bathroom Cleaning', image: '/images/bathroom-cleaning.png' },
];

export default function SnabbitTasksUI() {
  // Duplicate the tasks for seamless looping
  const duplicatedTasks = [...tasks, ...tasks, ...tasks];
  
  return (
    <div className="min-h-screen bg-[#5c0b38] text-white flex flex-col items-center py-16 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          ONE BOOKING, <span className="text-[#ff4c7b] italic">MANY TASKS</span>
        </h1>
      </div>

      <div className="relative w-full max-w-6xl h-[500px] mb-16">
        {/* HOMMLIE highlight box */}
        <motion.div 
          className="absolute z-10 w-64 h-[450px] rounded-3xl border-4 border-white/20 flex items-center justify-center pointer-events-none mx-auto left-0 right-0"
          style={{
            boxShadow: '0 0 0 8px rgba(92, 11, 56, 0.9)',
          }}
          animate={{
            boxShadow: [
              '0 0 0 8px rgba(92, 11, 56, 0.9)',
              '0 0 0 8px rgba(92, 11, 56, 0.9), 0 0 30px rgba(255, 76, 123, 0.7)',
              '0 0 0 8px rgba(92, 11, 56, 0.9)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute top-6 left-0 right-0 text-center">
            <span className="bg-[#ff4c7b] text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
              HOMMLIE
            </span>
          </div>
        </motion.div>

        {/* Auto-scrolling track */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <motion.div
            className="flex items-center gap-8"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedTasks.map((task, index) => (
              <motion.div
                key={`${task.title}-${index}`}
                className="w-56 h-72 flex-shrink-0 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: 1,
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.2
                }}
              >
                {/* Card with enhanced styling */}
                <div className="absolute inset-0 bg-white text-black rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 border-2 border-transparent group-hover:border-[#ff4c7b] z-10">
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 text-center font-semibold text-lg transition-all duration-300 bg-white group-hover:bg-[#ff4c7b] group-hover:text-white flex-1 flex items-center justify-center">
                    {task.title}
                  </div>
                </div>
                
                {/* Glow effect when centered */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 76, 123, 0.7)',
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-[#5c0b38] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-[#5c0b38] to-transparent z-10 pointer-events-none" />
      </div>
      
      {/* CTA Button */}
      <motion.button
        className="px-8 py-3 bg-[#ff4c7b] text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Now
      </motion.button>
    </div>
  );
}