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

export default function QuickHeroSection() {
  const duplicatedTasks = [...tasks, ...tasks, ...tasks];

  return (
    <>
      {/* SECTION 1 – Hero */}
      <section className="relative bg-gradient-to-b from-white to-[#fef4f6] pt-16 pb-32 text-center overflow-hidden">
        {/* Sparkles */}
        <div className="absolute top-4 left-6 text-pink-500 text-3xl">✦</div>
        <div className="absolute top-4 right-6 text-pink-500 text-3xl">✦</div>
        <div className="absolute bottom-4 left-16 text-pink-500 text-3xl">✦</div>
        <div className="absolute bottom-4 right-20 text-pink-500 text-3xl">✦</div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-4">
          INDIA'S FIRST <br />
          <span className="inline-block relative text-pink-600 font-extrabold italic">
            QUICK
            <span className="absolute left-0 bottom-0 w-full h-[5px] bg-pink-400 rounded-full -z-10 translate-y-[6px]" />
          </span>{' '}
          <span className="text-[#2a0014] font-extrabold">SERVICE APP</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[#5c0b38] text-base md:text-lg font-medium mt-4">
          On-demand home services to empower <br className="hidden md:block" />
          urban households
        </p>

        {/* App Store Buttons and Girls */}
        <div className="mt-8 relative flex justify-center items-center">
          {/* Left Girls */}
          <img
            src="/images/image2.png"
            alt="Cleaning Girls Left"
            className="h-[280px] md:h-[300px] object-contain hidden md:block mr-4"
          />

          {/* Buttons */}
          <div className="flex flex-col gap-3 z-10">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/playstore.svg"
                alt="Get it on Google Play"
                className="h-12 md:h-14 mx-auto"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/appstore.svg"
                alt="Download on the App Store"
                className="h-12 md:h-14 mx-auto"
              />
            </a>
          </div>

          {/* Right Girls */}
          <img
            src="/images/image1.png"
            alt="Cleaning Girls Right"
            className="h-[280px] md:h-[300px] object-contain hidden md:block ml-4"
          />
        </div>
      </section>

      {/* SECTION 2 – Tasks Showcase */}
      <section className="bg-[#5c0b38] text-white overflow-hidden">
        <div className="min-h-screen flex flex-col items-center py-6 px-4">
          <div className="max-w-4xl mx-auto text-center mb-2 px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-3">
              ONE BOOKING, <span className="text-[#ff4c7b] italic">MANY TASKS</span>
            </h1>
          </div>

          {/* Scrolling Tasks */}
          <div className="relative w-full max-w-6xl h-[400px] mb-0">
            <div className="absolute inset-0 flex items-center overflow-hidden">
              <motion.div
                className="flex items-end gap-8"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {duplicatedTasks.map((task, index) => (
                  <motion.div
                    key={`${task.title}-${index}`}
                    className="w-44 h-60 flex-shrink-0 relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [10, -10, 10],
                      opacity: [0.9, 1, 0.9],
                      scale: [0.95, 1, 0.95],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    }}
                  >
                    <div className="absolute inset-0 bg-white text-black rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 border-2 border-transparent group-hover:border-[#ff4c7b] z-10">
                      <div className="h-36 bg-gray-100 overflow-hidden relative">
                        <img
                          src={task.image}
                          alt={task.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-3 text-center font-medium text-base transition-all duration-300 bg-white group-hover:bg-[#ff4c7b] group-hover:text-white flex-1 flex items-center justify-center">
                        {task.title}
                      </div>
                    </div>

                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                      style={{
                        boxShadow: '0 0 30px rgba(255, 76, 123, 0.7)',
                      }}
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-[#5c0b38] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-[#5c0b38] to-transparent z-10 pointer-events-none" />
          </div>

          <motion.button
            className="px-8 py-3 bg-[#ff4c7b] text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </section>
    </>
  );
}
