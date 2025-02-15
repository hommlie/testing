import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoMdPlay } from "react-icons/io";

const ThoughtfulSlider = ({ videos = [], onVideoClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(4);
      else if (window.innerWidth >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - slidesPerView, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + slidesPerView, videos.length - slidesPerView)
    );
  };

  const hasNext = currentIndex < videos.length - slidesPerView;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="relative w-full">
      <h2 className="text-2xl font-bold mb-8">Thoughtful Curations</h2>

      <div className="relative group">
        {/* Navigation Buttons */}
        {hasPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
            aria-label="Previous videos"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
            aria-label="Next videos"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Videos Container */}
        <div className="overflow-hidden mx-6">
          <motion.div
            className="flex gap-4"
            initial={false}
            animate={{
              x: `calc(-${currentIndex * (100 / slidesPerView)}%)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {videos.map((content, index) => (
              <motion.div
                key={content.id}
                className={`relative flex-shrink-0`}
                style={{
                  width: `calc(${100 / slidesPerView}% - ${
                    (16 * (slidesPerView - 1)) / slidesPerView
                  }px)`,
                }}
              >
                <div
                  className="relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => onVideoClick(index)}
                >
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
                    >
                      <IoMdPlay className="text-2xl text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(Math.ceil(videos.length / slidesPerView))].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx * slidesPerView)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / slidesPerView) === idx
                ? "bg-hommlie w-4"
                : "bg-gray-300"
            }`}
            aria-label={`Go to video group ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThoughtfulSlider;
