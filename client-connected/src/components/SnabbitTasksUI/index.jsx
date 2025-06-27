import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DownloadHommlieApp from '../DownloadHommlieApp';

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const duplicatedTasks = [...tasks, ...tasks]; // Only duplicate once for loop

  const [phoneRef, phoneInView] = useInView({ threshold: 0.3 });
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  const phoneScale = useTransform(scrollYProgress, [0, 0.4], [1.3, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 0.4], ['20%', '104%']);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#fef4f6] pb-12 text-center overflow-hidden">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-4">
          INDIA'S FIRST <br />
          <span className="inline-block relative text-pink-600 font-extrabold italic">
            QUICK
            <span className="absolute left-0 bottom-0 w-full h-[5px] bg-pink-400 rounded-full -z-10 translate-y-[6px]" />
          </span>{' '}
          <span className="text-[#2a0014] font-extrabold">SERVICE APP</span>
        </h1>

        <p className="text-[#5c0b38] text-lg md:text-xl font-medium mt-4 mb-8">
          On-demand home services to empower urban households
        </p>

        <div className="flex justify-center gap-6 mb-6">
          <a href="#"><img src="/images/playstore.svg" alt="Google Play" className="h-10 md:h-12" /></a>
          <a href="#"><img src="/images/appstore.svg" alt="App Store" className="h-10 md:h-12" /></a>
        </div>

        <div className="flex justify-center items-end gap-8 md:gap-44 z-10 relative">
          <img src="/images/image3.png" alt="Left" className="h-[220px] md:h-[300px] object-contain mr-20" />
          <img src="/images/image1.png" alt="Right" className="h-[220px] md:h-[300px] object-contain ml-20" />
        </div>
      </section>

      {/* Transparent Phone Mockup Frame */}
      <motion.div
        ref={phoneRef}
        className="absolute top-[18%] left-[39%] transform -translate-x-1/2 z-20 w-[260px] h-[500px]"
        style={{ scale: phoneScale, y: phoneY }}
      >
        <div className="rounded-[40px] shadow-2xl border-8 border-black bg-transparent relative">
          <div className="w-20 h-4 rounded-full bg-black mt-2 mb-2 mx-auto"></div>
          <div className="h-[440px] flex items-center justify-center relative">
            {/* Empty phone frame */}
          </div>
        </div>
      </motion.div>

      {/* Task Section with Enhanced Scrolling Cards */}
      <section ref={cardsRef} className="bg-[#5c0b38] text-white min-h-[650px] pt-[15px] pb-[120px] relative z-10">
        <div className="flex flex-col items-center px-4">
          <motion.h1
            className="text-3xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: cardsInView ? 1 : 0, y: cardsInView ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            ONE BOOKING, <span className="text-[#ff4c7b] italic">MANY TASKS</span>
          </motion.h1>
          <motion.p
            className="text-xl text-pink-200 mt-4 mb-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: cardsInView ? 1 : 0, y: cardsInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
          </motion.p>

          {/* Enhanced Scrolling Container */}
          <div className="w-full max-w-6xl mx-auto relative h-[320px] overflow-hidden">
            {/* Gradient overlays for better UX */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#5c0b38] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#5c0b38] to-transparent z-10 pointer-events-none" />
            
            {/* Continuous scroll wrapper */}
            <motion.div
              className="flex absolute left-0 top-0 h-full items-center"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...duplicatedTasks].map((task, index) => (
                <div
                  key={`${task.title}-${index}`}
                  className="w-48 h-64 flex-shrink-0 mx-6 group"
                >
                  <div className="bg-white text-black rounded-xl overflow-hidden shadow-lg flex flex-col border-2 border-transparent group-hover:border-[#ff4c7b] transition-all duration-300 h-full">
                    <div className="h-40 bg-gray-100 overflow-hidden relative">
                      <img
                        src={task.image}
                        alt={task.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center font-medium bg-white group-hover:bg-[#ff4c7b] group-hover:text-white flex-1 flex items-center justify-center transition-all duration-300">
                      {task.title}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <DownloadHommlieApp />
    </div>
  );
}
