import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DownloadHommlieApp from '../DownloadHommlieApp';

const cardData = [
  {
    id: 1,
    content: (
      <>
        <div className="text-[#ff4c7b] text-5xl font-extrabold leading-none mb-1">6000+</div>
        <p className="text-sm text-gray-700 font-semibold">Trusted By 6000+ Families</p>
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <div className="text-[#ff4c7b] text-4xl font-bold mb-2">4.5</div>
        <p className="text-[#5c0b38] font-semibold text-sm">Average Service Rating</p>
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        <div className="w-12 h-12 bg-[#5c0b38] text-white flex items-center justify-center text-sm font-bold rounded-full mb-2">W</div>
        <p className="text-sm text-gray-700 font-semibold">Powered By Strong Women</p>
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        <div className="text-[#ff4c7b] text-4xl font-bold mb-2">30+</div>
        <p className="text-sm text-gray-700 font-semibold">Services Offered</p>
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        <div className="text-[#ff4c7b] text-4xl font-bold mb-2">24/7</div>
        <p className="text-sm text-gray-700 font-semibold">Support Available</p>
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        <div className="text-[#ff4c7b] text-4xl font-bold mb-2">100%</div>
        <p className="text-sm text-gray-700 font-semibold">Satisfaction Guarantee</p>
      </>
    ),
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const { scrollYProgress: cardScroll } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  const cardWidth = 240;
  const cardHeight = 160;
  const gapX = 280;
  const gapY = 200;

  const transforms = cardData.map((_, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = (col - 1) * gapX;
    const y = (row - 0.5) * gapY;
    const rotate = (col - 1) * 5 + (row === 0 ? -5 : 5);

    return {
      x: useTransform(cardScroll, [0, 0.4], [0, x]),
      y: useTransform(cardScroll, [0, 0.4], [0, y]),
      rotate: useTransform(cardScroll, [0, 0.4], ['0deg', `${rotate}deg`]),
    };
  });

  return (
    <section className="bg-[#f9f9f9] py-20">
      {/* Scroll-Controlled Cards (Now moved below) */}
      <div className="text-center px-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold">
          HOW <span className="text-[#5c0b38]">HOMMLIE</span> <span className="text-[#ff4c7b] italic">WORKS?</span>
        </h2>
      </div>

      <div ref={ref} className="relative h-[250vh]">
        <div className="sticky top-28 h-[calc(100vh-7rem)] flex items-center justify-center">
          <div className="relative w-full max-w-2xl mx-auto px-4 h-full flex items-center justify-center">
            {/* STEP 1 */}
            <motion.div className="absolute inset-0 flex items-center justify-center px-4"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]),
                scale: useTransform(scrollYProgress, [0, 0.3], [1, 0.95]),
                width: useTransform(scrollYProgress, [0, 0.3], ['100%', '95%'])
              }}>
              <motion.div className="w-full bg-white rounded-2xl shadow-xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <div className="text-center mb-8">
                  <motion.span className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 shadow-md"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.8, ease: 'easeInOut' }}>
                    STEP 1
                  </motion.span>
                  <motion.h2 className="text-2xl font-bold text-gray-800 mb-4">Book Instantly or Schedule</motion.h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Need pest control or cleaning? Book instantly or choose a convenient time.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* STEP 2 */}
            <motion.div className="absolute inset-0 flex items-center justify-center px-4"
              style={{
                opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.6, 0.7], [0, 1, 1, 0]),
                y: useTransform(scrollYProgress, [0.3, 0.45, 0.6], [30, 0, 0]),
                scale: useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0.95, 1, 0.95]),
                width: useTransform(scrollYProgress, [0.3, 0.45, 0.6], ['95%', '100%', '95%'])
              }}>
              <motion.div className="w-full bg-white rounded-2xl shadow-xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <div className="text-center mb-8">
                  <motion.span className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 shadow-md"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.8, delay: 0.3, ease: 'easeInOut' }}>
                    STEP 2
                  </motion.span>
                  <motion.h2 className="text-2xl font-bold text-gray-800 mb-4">Pick Services & Time</motion.h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Choose services like mosquito netting, sofa cleaning, or pest control. Set your timing and duration.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* STEP 3 */}
            <motion.div className="absolute inset-0 flex items-center justify-center px-4"
              style={{
                opacity: useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]),
                y: useTransform(scrollYProgress, [0.7, 0.8], [30, 0]),
                scale: useTransform(scrollYProgress, [0.7, 0.8], [0.95, 1]),
                width: useTransform(scrollYProgress, [0.7, 0.8], ['95%', '100%'])
              }}>
              <motion.div className="w-full bg-white rounded-2xl shadow-xl p-8"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                <div className="text-center mb-8">
                  <motion.span className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 shadow-md"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.8, delay: 0.6, ease: 'easeInOut' }}>
                    STEP 3
                  </motion.span>
                  <motion.h2 className="text-2xl font-bold text-gray-800 mb-4">Experts Arrive On Time</motion.h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Hommlie professionals reach your doorstep as scheduled. Share OTP and get started worry-free.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE HOMMLIE Cards Section - moved below */}
      <div className="text-center px-4 mt-32 mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold">
          WHY CHOOSE <span className="text-[#ff4c7b]">HOMMLIE</span>
        </h2>
      </div>
      <div ref={containerRef} className="relative h-[300vh] max-w-[1200px] mx-auto">
        <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center">
          <div className="relative w-full max-w-[900px] h-[500px]">
            {cardData.map((card, i) => (
              <motion.div
                key={card.id}
                className="absolute w-[240px] h-[160px] bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center px-4 text-center"
                style={{
                  x: transforms[i].x,
                  y: transforms[i].y,
                  rotate: transforms[i].rotate,
                  zIndex: 10 - i,
                }}
              >
                {card.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;