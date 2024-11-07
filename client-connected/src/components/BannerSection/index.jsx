import React, { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const bannerDatalider = ({ bannerData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.scrollTo({
        left: (currentIndex - 1) * sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextSlide = () => {
    if (currentIndex < bannerData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current.scrollTo({
        left: (currentIndex + 1) * sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-white w-full overflow-hidden md:px-8 py-5 md:py-10">
      <div
        className="flex w-[100vw] h-full overflow-x-auto scroll-smooth gap-5 md:gap-10 md:gap-9 scrollbar-hide"
        ref={sliderRef}
      >
        {bannerData?.map((banner, index) => (
          <div
            key={index}
            className="shrink-0 flex-col justify-center items-center"
          >
            <a href={banner.link}>
              <img
                src={banner.image_url}
                alt={`Banner ${index}`}
                className="w-full h-32 lg:h-[290px] object-cover rounded-lg border"
              />
            </a>
          </div>
        ))}
      </div>
      <button
        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 text-2xl rounded-full p-2 bg-gray-400 hover:bg-gray-500 text-white"
        onClick={prevSlide}
      >
        <IoIosArrowBack />
      </button>
      <button
        className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 text-2xl rounded-full p-2 bg-gray-400 hover:bg-gray-500 text-white"
        onClick={nextSlide}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default bannerDatalider;