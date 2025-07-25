import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VideoModal from "../VideoModal";
import { IoMdPlay } from 'react-icons/io';

const Testimonials = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      type: 'image',
      content: "As a working professional, I struggle big time whenever my paid help is on leave. Hommlie's services have been a game changer.",
      
      location: "Electronic City",
      image: "/images/testi1.jpg",
    },
    {
      id: 2,
      type: 'video',
      content: "My regular house help doesn't clean fans or bathrooms, so I tried Hommlie. They pay attention to details my maid overlooks.",
    
      location: "Sarjapura",
      video: "https://www.youtube.com/watch?v=WuMuCWBXtxM",
    },
    {
      id: 3,
      type: 'image',
      content: "Hommlie's weekly deep cleans have become a part of our routine. They're professional and punctual every time.",
  
      location: "Jayanagar",
      image: "/images/testi2.jpg",
    },
    {
      id: 4,
      type: 'video',
      content: "Being a pet parent, cleanliness is everything. Hommlie understood our needs and exceeded expectations.",
   
      location: "Nagarbhavi",
      video: "https://www.youtube.com/watch?v=-XAvFyQJoLw",
    },
  ];

  return (
    <section className="py-0 px-0 sm:py-0 mb-5 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          What Our Customers Say
        </h2>

        <div className="relative">
          <div className="overflow-x-auto px-2 sm:mr-3 sm:px-0 scrollbar-hide">
            <div className="flex gap-4 sm:space-x-6 w-max min-h-[500px] items-center pb-4 sm:pb-0">
              {testimonials.map((testimonial, index) => {
                const isFull = index % 2 === 0;
                const heightClass = isFull ? 'h-[460px] sm:h-[480px]' : 'h-[320px] sm:h-[340px]';

                return (
                  <motion.div
                    key={testimonial.id}
                    className={`relative w-72 sm:w-80 ${heightClass} flex-shrink-0 rounded-3xl overflow-hidden shadow-lg flex ${isFull ? 'items-end' : 'items-center'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    {testimonial.type === 'image' ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <HoverVideo
                        src={testimonial.video}
                        onClick={() => {
                          setCurrentVideo(testimonial.video);
                          setIsModalOpen(true);
                        }}
                      />
                    )}

                    {isFull && (
                      <div className="relative z-30 w-full px-4 pb-4">
                        <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-md">
                          <p className="text-sm text-[#3f0018] font-medium mb-3 leading-snug">
                            {testimonial.content}
                          </p>
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-[#3f0018]">{testimonial.author}</p>
                            <span className="bg-[#f5f5f5] px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                              {testimonial.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && currentVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={currentVideo}
        />
      )}
    </section>
  );
};

export default Testimonials;

// ✅ HoverVideo – auto loads thumbnail from YouTube video
const HoverVideo = ({ src, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);

  const getYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(src);
  // For silent hover preview
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&rel=0&playsinline=1`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="absolute inset-0 w-full h-full cursor-pointer rounded-3xl overflow-hidden bg-black"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Thumbnail always rendered below */}
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* YouTube iframe rendered on hover and layered above */}
      {isHovering && (
        <iframe
          src={embedUrl}
          title="YouTube Preview"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full z-10"
          frameBorder="0"
        />
      )}

      {/* Play icon always on top */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
          <IoMdPlay className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
};

