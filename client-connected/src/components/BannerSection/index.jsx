import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerDataSlider = ({ bannerData = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.querySelector(".banner-slider-container")?.offsetWidth ||
        window.innerWidth;
      // Estimate how many banners can fit in the container
      // This calculation depends on your banner width plus gap
      const bannerWidth = 340; // Approximate width of a banner + gap
      const calculatedSlidesToShow = Math.max(
        1,
        Math.floor(containerWidth / bannerWidth)
      );
      setSlidesToShow(calculatedSlidesToShow);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom arrow components
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 text-2xl rounded-full p-2 bg-white hover:bg-gray-400 text-black shadow-lg z-10"
      aria-label="Previous banner"
    >
      <IoIosArrowBack />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 text-2xl rounded-full p-2 bg-white hover:bg-gray-400 text-black shadow-lg z-10"
      aria-label="Next banner"
    >
      <IoIosArrowForward />
    </button>
  );

  // Slick settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
    variableWidth: false,
    centerMode: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative bg-white w-full overflow-hidden md:px-8 banner-slider-container">
      <Slider ref={sliderRef} {...settings}>
        {bannerData?.map((banner, index) => (
          <div key={index} className="px-2">
            <a href={banner.link}>
              <div className="">
                <img
                  src={banner.image_url}
                  title={banner.image_title}
                  alt={banner.alt_tag}
                  className="w-full h-auto rounded-lg border"
                />
              </div>
            </a>
          </div>
        ))}
      </Slider>

      {/* Optional indicator dots */}
      {bannerData.length > slidesToShow && (
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(bannerData.length - slidesToShow + 1)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => sliderRef.current.slickGoTo(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-gray-800 w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to banner ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerDataSlider;
