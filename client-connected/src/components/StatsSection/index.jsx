import React, { useEffect, useRef, useState } from "react";
import Customers from "../../assets/icons/customer.svg";
import Reviews from "../../assets/icons/reviews.svg";
import Cities from "../../assets/icons/cities.svg";
import Warranty from "../../assets/icons/warranty.svg";
import Iso from "../../assets/icons/iso.png";
import { motion } from "framer-motion";

const statsData = [
  { id: 1, count: "10,000+", title: "Happy Customers", icon: Customers },
  { id: 2, count: "4.9/5", title: "Customer Rating", icon: Reviews },
  { id: 3, count: "290+", title: "Pin-Codes", icon: Cities },
  { id: 4, count: "100%", title: "Warranty Services", icon: Warranty },
  { id: 5, count: "ISO", title: "Certified Company", icon: Iso },
];

const StatsSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemWidth = 180; // Width of one item (card), including margin/padding

  // Auto scroll logic for mobile only
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 640 && scrollRef.current) {
        setActiveIndex((prevIndex) =>
          prevIndex === statsData.length - 2 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to active item on index change
  useEffect(() => {
    if (window.innerWidth < 640 && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: activeIndex * itemWidth * 2, // Multiply by 2 to scroll two items at once
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8 overflow-x-auto scrollbar-hide sm:overflow-visible scroll-smooth transition-all duration-500"
          style={{ overflowY: "hidden", display: "flex" }} // Enable side-scrolling
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-[160px] sm:min-w-0 w-[160px] flex flex-col items-center text-center"
            >
              <img
                src={stat.icon}
                alt={stat.title}
                className="h-12 w-12 mb-3 object-contain"
              />
              <h3 className="text-xl font-bold text-emerald-700 mb-1">
                {stat.count}
              </h3>
              <p className="text-sm font-medium text-gray-800">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Dot Indicators for Mobile */}
        <div className="flex justify-center mt-4 sm:hidden">
          {statsData.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-emerald-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
