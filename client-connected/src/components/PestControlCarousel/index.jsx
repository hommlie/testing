import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import config from '../../config/config';

const PestControlCarousel = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [subcategories, setSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCarouselData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${config.API_URL}/api/category`);
                const allCategories = response.data.data;
                const pestControl = allCategories.find(c =>
                    c.category_name?.toLowerCase().includes('pest control')
                );
                if (pestControl && pestControl.Subcategories) {
                    setSubcategories(pestControl.Subcategories);
                }
            } catch (error) {
                console.error("Error fetching carousel data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCarouselData();
    }, []);

    const getImageUrl = (item) => {
        if (!item) return '/assets/images/placeholder.png';
        return item.app_icon || '/assets/images/placeholder.png';
    };

    const onScroll = (e) => {
        if (!e.target) return;
        const scrollLeft = e.target.scrollLeft;
        const cardWidth = 300 + 24; // width + gap
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    const scrollTo = (index) => {
        if (scrollRef.current) {
            const cardWidth = 300 + 24;
            scrollRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading || subcategories.length === 0) return null;

    return (
        <div className="pt-0 pb-10 overflow-hidden">
            <div className="max-w-[1332px] mx-auto px-4">
                {/* Header Section */}
                <div className="text-center -mt-1 mb-10">
                    <div className="flex justify-center mb-0 relative z-10">
                        <motion.h3
                            className="text-2xl font-bold text-center relative inline-block px-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-[#033053] via-[#0463ac] to-[#033053] bg-[length:200%_auto] block pb-1 uppercase tracking-tight whitespace-nowrap text-[15px] md:text-2xl"
                                animate={{
                                    backgroundPosition: ["0% 50%", "200% 50%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                Expert Solutions For Every Pest Problem
                            </motion.span>
                            <motion.div
                                className="h-1 w-16 bg-gradient-to-r from-[#0463ac] to-[#034d85] mx-auto rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: 64 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </motion.h3>
                    </div>
                </div>

                {/* Carousel wrapper */}
                <div className="relative group/carousel">
                    <div
                        ref={scrollRef}
                        onScroll={onScroll}
                        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-6 pb-10 pt-0 px-4 scroll-smooth"
                    >
                        {subcategories.map((item, index) => {
                            const subImage = getImageUrl(item);
                            return (
                                <motion.div
                                    key={item.id || index}
                                    className="min-w-[260px] md:min-w-[300px] flex flex-col items-center group snap-start relative pb-4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Circular Image wrapper */}
                                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#f8f1dd]/50 flex items-center justify-center relative z-20 -mb-14 transition-transform duration-500 group-hover:scale-105">
                                        <img
                                            src={subImage}
                                            alt={item.subcategory_name}
                                            className="w-3/4 h-3/4 object-contain"
                                            onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"; }}
                                        />
                                    </div>

                                    {/* Content Card below */}
                                    <div className="w-full bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center p-6 pt-20 min-h-[280px]">
                                        <h3 className="text-xl md:text-2xl font-bold text-[#033053] mb-4 text-center leading-tight group-hover:text-[#0463ac] transition-colors">
                                            {item.subcategory_name}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-8 text-center flex-grow">
                                            {item.description || `Ensuring your space remains healthy and pest-free with our premium ${item.subcategory_name} treatment.`}
                                        </p>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate(`${config.VITE_BASE_URL}/subcategory/${item.slug}`)}
                                            className="w-full relative group/btn flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#0463ac] to-[#033053] text-white rounded-[12px] transition-all duration-300 shadow-[0_10px_30px_rgba(4,99,172,0.25)] overflow-hidden"
                                        >
                                            {/* Infinite Shimmer Animation */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20"
                                                animate={{
                                                    x: ['-200%', '200%']
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                    repeatDelay: 1
                                                }}
                                            />
                                            <span className="font-bold uppercase tracking-[0.05em] relative z-10 whitespace-nowrap">Book Service</span>
                                            <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Scroll Indicators / Dots */}
                <div className="flex justify-center gap-2 mt-0 md:-mt-8 lg:-mt-10 relative z-30">
                    {subcategories.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`h-2.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-[#0463ac] w-10' : 'bg-gray-200 w-2.5 hover:bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PestControlCarousel;
