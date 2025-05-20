import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config/config";

export default function CategorySlider({ title, categories, openSubCatModal }) {
  const [visibleItemsCount, setVisibleItemsCount] = useState(6); // Increased default count
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleItemsCount(7); // Increased for larger screens
      } else if (window.innerWidth >= 1024) {
        setVisibleItemsCount(6); // Increased for medium screens
      } else if (window.innerWidth >= 768) {
        setVisibleItemsCount(5); // Increased for tablets
      } else if (window.innerWidth >= 640) {
        setVisibleItemsCount(4); // Increased for small screens
      } else {
        setVisibleItemsCount(3); // Increased for mobile
      }
    };

    const handleScroll = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);
    sliderRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateVisibleItemsCount);
      sliderRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePrevClick = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleSubCategoryClick = (category) => {
    if (category?.category?.is_page === 1) {
      navigate(`${config.VITE_BASE_URL}/subcategory/${category.slug}`);
    } else {
      openSubCatModal([category.id, category.subcategory_name]);
    }
  };

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full mx-auto px-4 md:px-8 py-4 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-row justify-between items-center mb-4"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#10847E]">
          {title}
        </h2>
      </motion.div>

      <div className="relative group">
        <div
          ref={sliderRef}
          className="relative w-full flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={onDrag}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {categories?.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-2 w-28 sm:w-36 md:w-44 lg:w-48 flex-shrink-0 scroll-snap-align-start cursor-pointer"
              onClick={() => handleSubCategoryClick(category)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <img
                    className="w-full h-full object-cover"
                    src={category?.image_url}
                    alt={category?.subcategory_name}
                    loading="lazy"
                  />
                </div>
                <h5 className="text-sm md:text-base font-medium text-gray-700 text-center mt-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#10847E]">
                  {category?.subcategory_name}
                </h5>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showLeftArrow && categories?.length > visibleItemsCount && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={handlePrevClick}
              className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 bg-white shadow-lg rounded-full p-2 cursor-pointer hidden lg:block hover:shadow-xl transition-shadow duration-300"
            >
              <IoIosArrowBack className="text-2xl text-gray-600" />
            </motion.button>
          )}

          {showRightArrow && categories?.length > visibleItemsCount && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={handleNextClick}
              className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 bg-white shadow-lg rounded-full p-2 cursor-pointer hidden lg:block hover:shadow-xl transition-shadow duration-300"
            >
              <IoIosArrowForward className="text-2xl text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
