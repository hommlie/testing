import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Enhanced animation values with smoother transitions
  const step1Opacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.3], 
    [1, 1, 0]
  );
  const step1Scale = useTransform(scrollYProgress, 
    [0, 0.3], 
    [1, 0.95]
  );
  const step1Width = useTransform(scrollYProgress,
    [0, 0.3],
    ['100%', '95%']
  );

  const step2Opacity = useTransform(scrollYProgress, 
    [0.2, 0.3, 0.6, 0.7], 
    [0, 1, 1, 0]
  );
  const step2Y = useTransform(scrollYProgress, 
    [0.3, 0.45, 0.6], 
    [30, 0, 0]
  );
  const step2Scale = useTransform(scrollYProgress, 
    [0.3, 0.45, 0.6], 
    [0.95, 1, 0.95]
  );
  const step2Width = useTransform(scrollYProgress,
    [0.3, 0.45, 0.6],
    ['95%', '100%', '95%']
  );

  const step3Opacity = useTransform(scrollYProgress, 
    [0.6, 0.7, 1], 
    [0, 1, 1]
  );
  const step3Y = useTransform(scrollYProgress, 
    [0.7, 0.8], 
    [30, 0]
  );
  const step3Scale = useTransform(scrollYProgress, 
    [0.7, 0.8], 
    [0.95, 1]
  );
  const step3Width = useTransform(scrollYProgress,
    [0.7, 0.8],
    ['95%', '100%']
  );

  return (
    <div className="h-[300vh] relative" ref={ref}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-2xl mx-auto px-4 h-full flex items-center justify-center">

          {/* STEP 1 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{
              opacity: step1Opacity,
              scale: step1Scale,
              width: step1Width,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <motion.div 
              className="w-full bg-white rounded-2xl shadow-xl p-8"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-center mb-8">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 shadow-md"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.8,
                    ease: "easeInOut"
                  }}
                >
                  STEP 1
                </motion.span>
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  SNABBIT YOUR WAY
                </motion.h2>
                <p className="text-gray-600 mb-8 text-base leading-relaxed">
                  Need help now? Get a Snabbit expert at your doorstep in just 10 minutes. 
                  Prefer a later time? Schedule what works best for you.
                </p>
              </div>
              <motion.div 
                className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-100"
                whileHover={{ 
                  backgroundColor: 'rgba(249, 250, 251, 1)',
                  borderColor: 'rgba(229, 231, 235, 1)'
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-3">House Help Service</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-pink-600 font-bold text-xl">$169</span>
                    <span className="text-gray-400 line-through ml-2 text-sm">$199</span>
                    <span className="text-gray-500 ml-2 text-sm">60 mins</span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Snabbit Now
                    </motion.button>
                    <motion.button 
                      className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 px-4 py-2 rounded-full font-semibold text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Prebook
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{
              opacity: step2Opacity,
              y: step2Y,
              scale: step2Scale,
              width: step2Width,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <motion.div 
              className="w-full bg-white rounded-2xl shadow-xl p-8"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-center mb-8">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 shadow-md"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.8,
                    delay: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  STEP 2
                </motion.span>
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  SET TIME & DURATION
                </motion.h2>
                <p className="text-gray-600 mb-8 text-base leading-relaxed">
                  Choose a time, set the duration, and get multiple tasks done in one booking.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-base">Select Date Of Service</h3>
                  <div className="flex gap-3 mb-3">
                    <motion.button 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      TODAY
                    </motion.button>
                    {['SUN', 'MON'].map(day => (
                      <motion.button 
                        key={day}
                        className="border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors bg-white"
                        whileHover={{ 
                          scale: 1.03,
                          backgroundColor: 'rgba(249, 250, 251, 1)'
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {day}
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {[18, 19, 20].map(day => (
                      <motion.button 
                        key={day}
                        className="border border-gray-200 hover:border-gray-300 w-12 h-12 rounded-lg text-sm transition-colors bg-white flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(249, 250, 251, 1)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {day}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-base">Select Time Of Service</h3>
                  <div className="flex gap-3 flex-wrap">
                    {[1, 2, 3, 4].map(hour => (
                      <motion.button 
                        key={hour}
                        className="border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors bg-white"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(249, 250, 251, 1)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {hour} PM
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{
              opacity: step3Opacity,
              y: step3Y,
              scale: step3Scale,
              width: step3Width,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <motion.div 
              className="w-full bg-white rounded-2xl shadow-xl p-8"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-center mb-8">
                <motion.span 
                  className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 shadow-md"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.8,
                    delay: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  STEP 3
                </motion.span>
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  EXPERTS ARRIVE ON-TIME
                </motion.h2>
                <p className="text-gray-600 mb-8 text-base leading-relaxed">
                  Our experts reach your doorstep at the scheduled time. Share the OTP to start the service.
                </p>
              </div>
              <motion.div 
                className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  backgroundColor: 'rgba(249, 250, 251, 1)',
                  borderColor: 'rgba(229, 231, 235, 1)'
                }}
              >
                <p className="font-semibold text-gray-700 mb-5 text-base">KINDLY SHARE THE OTP TO START THE WORK</p>
                <div className="flex justify-center gap-4 mb-6">
                  {[1, 3, 5].map(num => (
                    <motion.div 
                      key={num}
                      className="w-12 h-14 border-2 border-gray-200 rounded-lg flex items-center justify-center text-xl font-bold bg-white shadow-sm"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold text-base shadow-lg w-full max-w-xs mx-auto"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  GET STARTED
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HowItWorks;