import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3; // lg screens
    if (window.innerWidth >= 768) return 2; // md screens
    return 1; // mobile screens
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length, visibleCount]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? testimonials.length - visibleCount : newIndex;
    });
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex > testimonials.length - visibleCount ? 0 : newIndex;
    });
  };

  const getVisibleTestimonials = () => {
    const visibleItems = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-sm uppercase tracking-wider text-teal-800 mb-2">
          REVIEWS
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Users Say
        </h3>
      </div>

      <div className="relative overflow-hidden py-2">
        <div className="relative h-[450px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <div
                    key={`${currentIndex}-${idx}`}
                    className="bg-white rounded-lg p-6 shadow-sm border border-hommlie"
                  >
                    <p className="text-gray-700 text-lg mb-6 italic">
                      "{testimonial?.feedback}"
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial?.image}
                          alt={testimonial?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial?.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-2 right-0 flex gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-hommlie hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-hommlie hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(Math.ceil(testimonials.length / visibleCount))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleCount)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / visibleCount) === index
                    ? "bg-teal-800 w-4"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
