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

export default function WhyChooseHommlie() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cardWidth = 240;
  const cardHeight = 160;
  const gapX = 280;
  const gapY = 200;

  // Compute transforms to spread into 3x2 grid centered
  const transforms = cardData.map((_, i) => {
    const col = i % 3; // 0, 1, 2
    const row = Math.floor(i / 3); // 0 or 1
    const x = (col - 1) * gapX; // -1, 0, 1 => center
    const y = (row - 0.5) * gapY; // -0.5, 0.5 => center
    const rotate = (col - 1) * 5 + (row === 0 ? -5 : 5); // small angle

    return {
      x: useTransform(scrollYProgress, [0, 0.4], [0, x]),
      y: useTransform(scrollYProgress, [0, 0.4], [0, y]),
      rotate: useTransform(scrollYProgress, [0, 0.4], ['0deg', `${rotate}deg`]),
    };
  });

  return (
    <section className="bg-[#f9f9f9] py-20 text-center">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold">
          WHY CHOOSE <span className="text-[#ff4c7b]">HOMMLIE</span>
        </h2>
      </div>

      {/* Scroll animation container */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="relative max-w-[900px] w-full h-[500px] mx-auto">
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
}
