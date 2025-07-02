import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const cardWidth = 240;
  const gapX = 280;
  const gapY = 200;

  const gridPositions = cardData.map((_, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = (col - 1) * (cardWidth + 40);
    const y = (row - 0.5) * 200;
    return { x, y };
  });

  const transforms = cardData.map((_, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = (col - 1) * gapX;
    const y = (row - 0.5) * gapY;
    const rotate = (col - 1) * 5 + (row === 0 ? -5 : 5);

    return {
      x: useTransform(scrollYProgress, [0, 0.8, 1], [0, x, gridPositions[i].x]),
      y: useTransform(scrollYProgress, [0, 0.8, 1], [0, y, gridPositions[i].y]),
      rotate: useTransform(scrollYProgress, [0, 0.8, 1], ['0deg', `${rotate}deg`, '0deg']),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 1]),
      scale: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 1]),
    };
  });

  return (
    <section className="bg-[#f9f9f9] py-10 overflow-visible">
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold">
          WHY CHOOSE <span className="text-[#ff4c7b]">HOMMLIE</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative h-[400vh] max-w-[1200px] mx-auto">
        <div className="sticky top-20 h-[calc(100vh-6rem)] flex items-center justify-center">
          <div className="relative w-full h-[500px] flex items-center justify-center">
            {cardData.map((card, i) => (
              <motion.div
                key={card.id}
                className="absolute w-[240px] h-[160px] bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center px-4 text-center"
                style={{
                  x: transforms[i].x,
                  y: transforms[i].y,
                  rotate: transforms[i].rotate,
                  opacity: transforms[i].opacity,
                  scale: transforms[i].scale,
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
