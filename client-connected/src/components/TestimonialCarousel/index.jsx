import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Mehta',
      location: 'Indiranagar, Bangalore',
      feedback: "Hommlie’s service was amazing! My home is now completely pest-free, and the team was very professional. Their attention to detail is unmatched.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      location: 'Whitefield, Bangalore',
      feedback: "I had a great experience with Hommlie. Their pest control service is effective and quick! The team was friendly and efficient.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/24.jpg",
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      location: 'Koramangala, Bangalore',
      feedback: "Hommlie provided excellent bird netting services. I feel so much safer now! The service was fast and the team was professional.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      id: 4,
      name: 'Priya Sharma',
      location: 'Marathahalli, Bangalore',
      feedback: "The cleaning team from Hommlie is very professional and thorough. Highly recommended! I’m impressed with their work ethic and attention to detail.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 5,
      name: 'Vikram Raj',
      location: 'Jayanagar, Bangalore',
      feedback: "Amazing pest control service! They resolved my termite problem with such care and expertise. Hommlie really knows their stuff!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/36.jpg",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    adaptiveHeight: true,
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-yellow-400 w-4 h-4" : "text-gray-200 w-4 h-4"} />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 mb-10 relative overflow-hidden bg-white">
      {/* Premium Header - Reusing consistent style */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2 relative z-10">
          <motion.h3
            className="text-2xl font-bold text-center relative inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#033053] via-[#0463ac] to-[#033053] bg-[length:200%_auto] block pb-1 uppercase tracking-wider"
              animate={{
                backgroundPosition: ["0% 50%", "200% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Testimonials
            </motion.span>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-[#0463ac] to-[#034d85] mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h3>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-5xl font-bold text-[#033053] mt-1"
        >
          What Our Customers Are Saying
        </motion.h2>
      </div>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, idx) => (
            <div key={testimonial.id} className="outline-none">
              <div className="mx-2 my-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row gap-8 items-center md:items-start"
                >
                  {/* User Profile Section */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative group/avatar">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0463ac] to-[#033053] rounded-full blur-sm opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover grayscale-[20%] group-hover/avatar:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg">
                        <RiVerifiedBadgeFill className="text-blue-500 w-6 h-6 md:w-7 md:h-7" />
                      </div>
                    </div>
                  </div>

                  {/* Feedback Content */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-[#033053] flex items-center gap-2">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium">
                          {testimonial.location}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>

                    <div className="relative">
                      <FaQuoteLeft className="absolute -top-4 -left-6 text-gray-100 w-8 h-8 -z-10" />
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic relative z-10">
                        "{testimonial.feedback}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Navigation */}
        <div className="flex justify-between items-center mt-10 px-4">
          {/* Elegant Page Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => sliderRef.current.slickGoTo(i)}
                className={`transition-all duration-500 rounded-full h-1.5 ${currentSlide === i
                  ? "bg-[#0463ac] w-8 shadow-[0_0_10px_rgba(4,99,172,0.3)]"
                  : "bg-gray-200 w-3 hover:bg-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="p-3 rounded-full bg-white border border-gray-100 text-[#033053] hover:bg-[#033053] hover:text-white shadow-sm transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="p-3 rounded-full bg-white border border-gray-100 text-[#033053] hover:bg-[#033053] hover:text-white shadow-sm transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
