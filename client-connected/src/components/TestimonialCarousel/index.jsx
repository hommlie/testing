// import React, { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { RiVerifiedBadgeFill } from "react-icons/ri";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const TestimonialCarousel = ({ testimonials = [] }) => {
//   const [slidesToShow, setSlidesToShow] = useState(3);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setSlidesToShow(3);
//       else if (window.innerWidth >= 768) setSlidesToShow(2);
//       else setSlidesToShow(1);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Custom arrow components
//   const PrevArrow = ({ onClick }) => (
//     <button
//       onClick={onClick}
//       className="p-2 rounded-full bg-white shadow-lg hover:bg-hommlie hover:text-white transition-colors"
//       aria-label="Previous testimonial"
//     >
//       <ChevronLeft className="w-5 h-5" />
//     </button>
//   );

//   const NextArrow = ({ onClick }) => (
//     <button
//       onClick={onClick}
//       className="p-2 rounded-full bg-white shadow-lg hover:bg-hommlie hover:text-white transition-colors"
//       aria-label="Next testimonial"
//     >
//       <ChevronRight className="w-5 h-5" />
//     </button>
//   );

//   // Handle custom dot navigation
//   const handleDotClick = (index) => {
//     if (sliderRef.current) {
//       sliderRef.current.slickGoTo(index * slidesToShow);
//     }
//   };

//   // Slick settings
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: slidesToShow,
//     slidesToScroll: slidesToShow,
//     initialSlide: 0,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     prevArrow: null,
//     nextArrow: null,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//     beforeChange: (current, next) => setCurrentSlide(next),
//   };

//   // Calculate number of dot groups
//   const totalGroups = Math.ceil(testimonials.length / slidesToShow);

//   return (
//     <div className="w-full max-w-7xl mx-auto mb-52" >
//       <div className="text-center mb-12">
//         <h2 className="text-sm uppercase tracking-wider text-teal-800 mb-2">
//           REVIEWS
//         </h2>
//         <h3 className="text-2xl font-bold text-gray-900">What Our Users Say</h3>
//       </div>

//       <div className="relative pb-14">
//         <div className="mx-0">
//           <Slider ref={sliderRef} {...settings}>
//             {testimonials.map((testimonial, index) => (
//               <div key={testimonial?.id || index} className="px-3">
//                 <div className="bg-white rounded-lg p-6 shadow-sm border border-hommlie h-[320px] flex flex-col">
//                   <p className="text-gray-700 text-lg mb-6 italic line-clamp-4 overflow-hidden flex-grow">
//                     "{testimonial?.feedback}"
//                   </p>

//                   <div className="flex items-center gap-2 mb-4">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className="w-5 h-5 text-yellow-400"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>

//                   <div className="flex items-center gap-4 mt-auto">
//                     <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
//                       <img
//                         src={testimonial?.image}
//                         alt={testimonial?.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="overflow-hidden">
//                       <h4 className="flex gap-2 items-center font-semibold text-gray-900 truncate">
//                         {testimonial?.name}
//                         <RiVerifiedBadgeFill className="text-blue-500 flex-shrink-0" />
//                       </h4>
//                       <p className="text-sm text-gray-500 truncate">
//                         {testimonial?.location}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="absolute bottom-2 right-0 flex gap-2">
//           <PrevArrow
//             onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
//           />
//           <NextArrow
//             onClick={() => sliderRef.current && sliderRef.current.slickNext()}
//           />
//         </div>

//         {/* Progress Dots */}
//         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
//           {[...Array(totalGroups)].map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleDotClick(idx)}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 Math.floor(currentSlide / slidesToShow) === idx
//                   ? "bg-teal-800 w-4"
//                   : "bg-gray-300"
//               }`}
//               aria-label={`Go to testimonial group ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialCarousel;
import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Star icons for reviews

const TestimonialCarousel = () => {
  // Random testimonial data
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
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/24.jpg",
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      location: 'Koramangala, Bangalore',
      feedback: "Hommlie provided excellent bird netting services. I feel so much safer now! The service was fast and the team was professional.",
      rating: 4.5,
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Auto-play for the carousel
    autoplaySpeed: 4000,
  };

  // Function to render the star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 -mt-12 mb-10">
      <h2 className="text-[22px] font-bold text-center mb-4 text-gray-800">What Our Customers Are Saying</h2>

      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="testimonial-slide p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center space-x-4">
              {/* <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              /> */}
              <div className="text-gray-800">
                <p className="font-semibold text-xl">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{testimonial.feedback}</p>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
