import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ title, services = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setSlidesPerView(3);
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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const hasNext = currentIndex < services.length - slidesPerView;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2 text-green-800 uppercase tracking-wide text-sm font-semibold">
          Services
        </div>
        <h2 className="text-4xl font-bold mb-8 text-gray-900">{title}</h2>

        <div className="relative group">
          {hasPrevious && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
              aria-label="Next services"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            ref={containerRef}
            className="overflow-hidden mx-6"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <motion.div
              className="flex gap-6 py-3"
              initial={false}
              animate={{
                x: `calc(-${currentIndex * (100 / slidesPerView)}%)`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / slidesPerView}% - ${
                      (24 * (slidesPerView - 1)) / slidesPerView
                    }px)`,
                  }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={service.productimage?.image_url}
                        alt={service.productimage?.alt_tag}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-semibold">
                        {service.product_name}
                      </h3>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <span className="text-yellow-400 text-lg">⭐</span>
                            <span className="ml-1 text-sm font-medium">
                              {service.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            (
                            {service.total_reviews > 1000
                              ? `${(service.total_reviews / 1000).toFixed(1)}K`
                              : service.total_reviews}{" "}
                            )
                          </span>
                        </div>
                        <div className="text-sm">
                          From{" "}
                          <span className="font-semibold">
                            ₹{service.discounted_price}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            navigate(
                              `${config.VITE_BASE_URL}/product/${service.id}/${service.slug}`
                            )
                          }
                          className="bg-white text-hommlie border border-hommlie px-4 py-2 rounded-lg hover:bg-hommlie hover:text-white transition-colors duration-200"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

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
    </div>
  );
};

export default ProductSlider;
