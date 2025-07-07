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

  const duplicatedTasks = [...tasks, ...tasks];

  const [phoneRef, phoneInView] = useInView({ threshold: 0.3 });
  const [cardsRef, cardsInView] = useInView({ threshold: 0.2 });

  const phoneScale = useTransform(scrollYProgress, [0, 0.4], [1.3, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 0.4], ['20%', '104%']);

  return (
    <div ref={containerRef} className="hidden sm:block relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#fef4f6] pb-12 text-center overflow-hidden">
        {/* <h1 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-4">
          INDIA'S FIRST <br />
          <span className="inline-block relative text-[#fcce00] font-extrabold italic">
            HOME

          </span>{' '}
          <span className="text-[#2a0014] font-extrabold">SERVICE'S APP</span>
        </h1> */}
        <div className="text-center relative py-2">
        {/* Sparkles */}
        <div className="absolute top-4 left-4 text-[#133215] text-5xl animate-pulse">✦</div>
        <div className="absolute top-4 right-4 text-[#133215] text-5xl animate-pulse">✦</div>
        <div className="absolute bottom-4 left-1/3 text-[#133215] text-3xl animate-pulse">✦</div>
        <div className="absolute bottom-4 right-1/3 text-[#133215] text-3xl animate-pulse">✦</div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-3 uppercase">
          INDIA'S FIRST <br />
        </h2>


        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-3 uppercase">
          <span className="text-3xl md:text-5xl italic font-extrabold text-[#92B775] leading-tight mb-4 uppercase">
            HOME
          </span>{' '}
          SERVICE APP
        </h1>


        {/* Subtext */}
        <p className="text-sm md:text-base text-[#133215] font-medium mt-2 mb-3">
          On-demand home services to empower <br /> urban households
        </p>
      </div>

        <div className="flex justify-center gap-6 mb-16">
          <a href="#"><img src="/images/playstore.svg" alt="Google Play" className="h-10 md:h-12" /></a>
          <a href="#"><img src="/images/appstore.svg" alt="App Store" className="h-10 md:h-12" /></a>
        </div>

        <div className="flex justify-center items-end gap-8 md:gap-36 z-10 relative">
          <img src="/images/image3.png" alt="Left" className="h-[240px] md:h-[320px] object-contain mr-20" />
          <img src="/images/image1.png" alt="Right" className="h-[240px] md:h-[320px] object-contain ml-20" />
        </div>
      </section>

      {/* Phone Mockup */}
      <motion.div
        ref={phoneRef}
        className="absolute top-[24%] left-[39%] transform -translate-x-1/2 z-20 w-[260px] h-[500px]"
        style={{ scale: phoneScale, y: phoneY }}
      >
        <div className="rounded-[40px] shadow-2xl border-8 border-black bg-[#F3E8D3] relative overflow-hidden">
          <div className="w-20 h-4 rounded-full bg-black mt-2 mb-2 mx-auto"></div>
          <div className="h-[440px] flex items-center justify-center relative">
            <img
              src="/assets/logo/homlogo.png"
              alt="Hommlie Logo"
              className="absolute top-4 w-40 h-auto"
            />
          </div>
        </div>
      </motion.div>

      {/* Scrolling Cards Section */}
      <section ref={cardsRef} className="bg-[#92B775] text-black min-h-[650px] pt-[15px] pb-[120px] relative z-10">
        <div className="flex flex-col items-center px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-3">
         Instant Home Services, <br />
        </h2>


        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-3">
          <span className="text-3xl md:text-5xl italic font-extrabold text-white leading-tight mb-4">
           Right at Your Doorstep
          </span>{' '}
        </h1>
          <motion.p
            className="text-xl text-[#483fa1] mt-4 mb-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: cardsInView ? 1 : 0, y: cardsInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Scroll Track positioned above phone */}
          <div className="w-full max-w-6xl mx-auto relative h-[320px] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24  z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24  z-10 pointer-events-none" />

            <motion.div
              className="flex absolute top-0 left-1/2 -translate-x-1/2 h-full items-center"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {duplicatedTasks.map((task, index) => {
                const delay = (index % tasks.length) * 0.2;
                return (
                  <motion.div
                    key={`${task.title}-${index}`}
                    className="w-48 h-64 flex-shrink-0 mx-6 group"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      delay,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="bg-white text-black rounded-xl overflow-hidden shadow-lg flex flex-col border-2 border-transparent group-hover:border-[#F3E8D3] transition-all duration-300 h-full">
                      <div className="h-40 bg-gray-100 overflow-hidden relative">
                        <img
                          src={task.image}
                          alt={task.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 text-center font-medium bg-white group-hover:bg-[#F3E8D3] group-hover:text-black flex-1 flex items-center justify-center transition-all duration-300">
                        {task.title}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
