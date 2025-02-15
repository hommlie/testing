import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductSlider = ({ title, services = [] }) => {
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
      Math.min(prev + slidesPerView, services.length - slidesPerView)
    );
  };

  const hasNext = currentIndex < services.length - slidesPerView;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="relative w-full px-8 py-6">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>

      <div className="relative group">
        {/* Navigation Buttons */}
        {hasPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
            aria-label="Previous services"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
            aria-label="Next services"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Services Container */}
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
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="flex-shrink-0"
                style={{
                  width: `calc(${100 / slidesPerView}% - ${
                    (16 * (slidesPerView - 1)) / slidesPerView
                  }px)`,
                }}
              >
                <div className="bg-white rounded-lg overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-video w-full">
                    <img
                      src={service.productimage?.image_url}
                      alt={service.productimage?.alt_tag}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {service.product_name}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm">
                        {service.rating} ({service.total_reviews})
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      From ₹{service.discounted_price}/service
                    </div>

                    {/* Book Now Button */}
                    <button className="w-full bg-white text-hommlie border border-hommlie hover:bg-hommlie hover:text-white text-center py-2 rounded transition-colors relative overflow-hidden group">
                      <span className="relative z-10">Book Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(Math.ceil(services.length / slidesPerView))].map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * slidesPerView)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / slidesPerView) === idx
                  ? "bg-hommlie w-4"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to service group ${idx + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
