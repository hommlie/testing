import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import config from "../../config/config";

export default function ProdSection({ openExploreModal, title, items, btnHidden, id }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItemsCount, setVisibleItemsCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const updateVisibleItemsCount = () => {
            if (window.innerWidth >= 1024) {
                setVisibleItemsCount(5);
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
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - visibleItemsCount : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - visibleItemsCount ? 0 : prevIndex + 1
        );
    };

    const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
        if (originalPrice <= 0 || discountedPrice <= 0) return 0;
        const discount = originalPrice - discountedPrice;
        const percentage = (discount / originalPrice) * 100;
        return Math.round(percentage);
    };

    const handleProductClick = (item) => {
        const slug = item.product_name.toLowerCase().replace(/ /g, '-');
        navigate(`${config.VITE_BASE_URL}/product/${slug}`, { state: { id: item.id, title: item.title } });
    };

    const visibleItems = items?.slice(currentIndex, currentIndex + visibleItemsCount);

    return (
        <section className="w-full mx-auto section" id={id}>
            <div className="px-2 md:px-0 flex flex-row justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#10847E]">{title}</h2>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <div onClick={() => openExploreModal(items, title)} className={`flex items-center ${btnHidden ? 'hidden' : ''}`}>
                        <button className="text-base" style={{color: "#035240"}}>See all</button>
                    </div>
                </div>
            </div>
            <div className="relative group">
                <div className="relative w-full flex justify-center overflow-hidden lg:gap-10">
                    {visibleItems?.map((item, index) => {
                        const discountPercentage = calculateDiscountPercentage(item.product_price, item.discounted_price);
                        return (
                            <div key={index} className="p-2 w-full sm:w-auto mt-4">
                                <div onClick={() => handleProductClick(item)} className="block cursor-pointer">
                                    <div className="relative">
                                        <img
                                            className="pd-imgs w-60 h-[100px] sm:h-56 object-cover rounded-lg"
                                            src={item.productimage?.image_url}
                                            alt={item.product_name}
                                        />
                                        {discountPercentage > 0 && (
                                            <span 
                                                className="absolute top-2 left-2 px-1 md:px-2 rounded-full text-white text-[8px] md:text-sm" 
                                                style={{backgroundColor: "#FF5959"}}
                                            >
                                                {discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <h5 className="text-sm lg:text-md lg:font-semibold text-gray-500 text-wrap mt-2">
                                        {item.product_name}
                                    </h5>
                                    <p className="text-sm lg:font-semibold flex flex-row gap-2">
                                        <span>₹{item.discounted_price}</span>
                                        <span className="line-through font-normal" style={{color: "#ADB6BB"}}>₹{item.product_price}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <button
                        onClick={handlePrevClick}
                        className={`${items?.length > 4 ? "bg-white shadow-md lg:hidden lg:group-hover:block" : "hidden" } absolute top-1/2 -translate-x-0 translate-y-[-50%] left-2 lg:left-3 text-xl lg:text-xl rounded-full p-1 cursor-pointer`}
                    >
                        <IoIosArrowBack color="grey" />
                    </button>
                    <button
                        onClick={handleNextClick}
                        className={`${items?.length > 4 ? "bg-white shadow-md lg:hidden lg:group-hover:block" : "hidden" } absolute top-1/2 -translate-x-0 translate-y-[-50%] right-2 lg:right-3 text-xl lg:text-xl rounded-full p-1 cursor-pointer`}
                    >
                        <IoIosArrowForward color="grey" />
                    </button>
                </div>
            </div>
        </section>
    );
}