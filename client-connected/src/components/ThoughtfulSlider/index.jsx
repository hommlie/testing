import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoMdPlay } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoModal from "../VideoModal";

const ThoughtfulSlider = ({ videos = [] }) => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesToShow(4);
      else if (window.innerWidth >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Set initialized after component mounts
    setIsInitialized(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if videos array exists and has content
  const hasVideos = Array.isArray(videos) && videos.length > 0;

  // Custom arrow components
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
      aria-label="Previous videos"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-transform duration-300 transform hover:scale-110"
      aria-label="Next videos"
    >
      <ChevronRight className="w-5 h-5" />
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
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "20px",
          initialSlide: 0,
        },
      },
    ],
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  // Calculate number of dot groups
  const totalGroups = Math.ceil(hasVideos ? videos.length / slidesToShow : 0);

  // Render placeholder if no videos available
  if (!hasVideos) {
    return (
      <div className="relative w-full">
        <h2 className="text-2xl font-bold mb-8">Thoughtful Curations</h2>
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <p className="text-gray-500">No videos available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <h2 className="text-2xl font-bold mb-8">Thoughtful Curations</h2>

      {/* Ensure content is visible on initial load */}
      <div className={`relative group ${isInitialized ? "" : "opacity-0"}`}>
        <div className="mx-4 md:mx-6 lg:mx-8">
          <Slider ref={sliderRef} {...settings}>
            {videos.map((content, index) => (
              <div key={content.id || index} className="px-2">
                <div
                  className="relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => {
                    setCurrentVideo(content);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    src={content.thumbnail}
                    alt={content.title || "Video thumbnail"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
                    <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                      <IoMdPlay className="text-2xl text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
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
            aria-label={`Go to video group ${idx + 1}`}
          />
        ))}
      </div>

      {currentVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={currentVideo.video}
        />
      )}
    </div>
  );
};

export default ThoughtfulSlider;
