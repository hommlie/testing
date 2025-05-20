import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import config from "../../config/config";

export default function ProdSection({
  openExploreModal,
  title,
  items,
  btnHidden,
  id,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
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
    sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - visibleItemsCount ? 0 : prevIndex + 1
    );
    sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (originalPrice <= 0 || discountedPrice <= 0) return 0;
    const discount = originalPrice - discountedPrice;
    const percentage = (discount / originalPrice) * 100;
    return Math.round(percentage);
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
    <section className="w-full mx-auto section" id={id}>
      <div className="px-2 md:px-0 flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#10847E]">
          {title}
        </h2>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div
            onClick={() => openExploreModal(items, title)}
            className={`flex items-center ${btnHidden ? "hidden" : ""}`}
          >
            <button className="text-base" style={{ color: "#035240" }}>
              See all
            </button>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div
          ref={sliderRef}
          className="relative w-full flex overflow-x-auto scrollbar-hide scroll-smooth"
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={onDrag}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items?.map((item, index) => {
            const discountPercentage = calculateDiscountPercentage(
              item.product_price,
              item.discounted_price
            );
            return (
              <div
                key={index}
                className="p-2 lg:px-4 w-28 md:w-40 lg:w-72 flex-shrink-0 scroll-snap-align-start"
              >
                <div
                  onClick={() =>
                    navigate(`${config.VITE_BASE_URL}/product/${item.slug}`)
                  }
                  className="block cursor-pointer"
                >
                  <div className="relative">
                    <img
                      className="pd-imgs w-72 h-[100px] md:h-40 lg:h-56 object-cover rounded-lg"
                      src={item.productimage?.image_url}
                      title={item.productimage?.image_title}
                      alt={item.productimage?.alt_tag}
                    />
                    {discountPercentage > 0 && (
                      <span
                        className="absolute top-2 left-2 px-1 md:px-2 rounded-full text-white text-[8px] md:text-sm"
                        style={{ backgroundColor: "#FF5959" }}
                      >
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <h5 className="text-[10px] md:text-sm line-clamp-2 lg:text-sm lg:font-semibold text-gray-500 text-wrap mt-2">
                    {item.product_name}
                  </h5>
                  <p className="text-[10px] md:text-[12px] lg:text-sm lg:font-semibold flex flex-row gap-2 mt-1">
                    <span>₹{item.discounted_price}</span>
                    <span
                      className="line-through font-normal"
                      style={{ color: "#ADB6BB" }}
                    >
                      ₹{item.product_price}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={handlePrevClick}
          className={`${
            items?.length > 4
              ? "bg-white shadow-md hidden lg:group-hover:block"
              : "hidden"
          } absolute top-1/2 -translate-x-0 translate-y-[-50%] left-2 lg:left-3 text-xl lg:text-xl rounded-full p-1 cursor-pointer`}
        >
          <IoIosArrowBack color="grey" />
        </button>
        <button
          onClick={handleNextClick}
          className={`${
            items?.length > 4
              ? "bg-white shadow-md hidden lg:group-hover:block"
              : "hidden"
          } absolute top-1/2 -translate-x-0 translate-y-[-50%] right-2 lg:right-3 text-xl lg:text-xl rounded-full p-1 cursor-pointer`}
        >
          <IoIosArrowForward color="grey" />
        </button>
      </div>
    </section>
  );
}
