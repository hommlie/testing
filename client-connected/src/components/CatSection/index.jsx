import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CategorySlider({ title, categories, openSubCatModal }) {
    const [visibleItemsCount, setVisibleItemsCount] = useState(5);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {        
        const updateVisibleItemsCount = () => {
            if (window.innerWidth >= 1024) {
                setVisibleItemsCount(6);
            } else if (window.innerWidth >= 640) {
                setVisibleItemsCount(4);
            } else {
                setVisibleItemsCount(3);
            }
        };

        updateVisibleItemsCount();
        window.addEventListener("resize", updateVisibleItemsCount);

        return () => {
            window.removeEventListener("resize", updateVisibleItemsCount);
        };
    }, []);

    const handlePrevClick = () => {
        sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const handleNextClick = () => {
        sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
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
        <section className="w-full mx-auto section">
            <div className="px-2 md:px-0 flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#10847E]">{title}</h2>
            </div>
            <div className="relative group">
                <div 
                    ref={sliderRef}
                    className="relative w-full flex overflow-x-auto scrollbar-hide scroll-smooth"
                    onMouseDown={startDragging}
                    onMouseLeave={stopDragging}
                    onMouseUp={stopDragging}
                    onMouseMove={onDrag}
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {categories?.map((category, index) => (
                        <div 
                            key={index} 
                            className="p-2 w-28 md:w-40 lg:w-52 flex-shrink-0 scroll-snap-align-start cursor-pointer"
                            onClick={() => openSubCatModal([category.id, category.subcategory_name])}
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={category.image_url}
                                        alt={category.subcategory_name}
                                    />
                                </div>
                                <h5 className="text-sm lg:text-base font-medium text-gray-700 text-center mt-2">
                                    {category.subcategory_name}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handlePrevClick}
                    className={`${categories?.length > visibleItemsCount ? "bg-white shadow-md hidden lg:group-hover:block" : "hidden"} absolute top-1/2 -translate-x-0 translate-y-[-50%] left-2 lg:left-3 text-xl lg:text-xl rounded-full p-1 cursor-pointer`}
                >
                    <IoIosArrowBack color="grey" />
                </button>
                <button
                    onClick={handleNextClick}
                    className={`${categories?.length > visibleItemsCount ? "bg-white shadow-md hidden lg:group-hover:block" : "hidden"} absolute top-1/2 -translate-x-0 translate-y-[-50%] right-2 lg:right-3 text-xl lg:text-xl rounded-full p-1 cursor-pointer`}
                >
                    <IoIosArrowForward color="grey" />
                </button>
            </div>
        </section>
    );
}