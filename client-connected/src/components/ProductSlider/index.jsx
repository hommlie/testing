import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import config from "../../config/config";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ title, services = [] }) => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setSlidesToShow(3);
      else if (window.innerWidth >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom arrow components
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
      aria-label="Previous services"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
      aria-label="Next services"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );

  // Handle custom dot navigation
  const handleDotClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index * slidesToShow);
    }
  };

  // Slick settings
  const settings = {
    dots: false, // Disable default dots
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  // Calculate number of dot groups
  const totalGroups = Math.ceil(services.length / slidesToShow);

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">{title}</h2>

        <div className="relative group mx-6">
          <Slider ref={sliderRef} {...settings}>
            {services.map((service) => (
              <div key={service.id} className="px-3">
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
                    <div className="flex flex-col md:flex-row justify-center md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-2">
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
              </div>
            ))}
          </Slider>
        </div>

        {/* Custom Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalGroups)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / slidesToShow) === idx
                  ? "bg-hommlie w-4"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to service group ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
