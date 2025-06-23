// Updated StatsSection component (keep this in your StatsSection.js file)
import React from "react";
import Customers from "../../assets/icons/customer.svg";
import Reviews from "../../assets/icons/reviews.svg";
import Cities from "../../assets/icons/cities.svg";
import Warranty from "../../assets/icons/warranty.svg";
import { motion } from "framer-motion";

const statsData = [
  {
    id: 1,
    count: "10000+",
    title: "Happy Customers",
    icon: Customers,
  },
  {
    id: 2,
    count: "4.9/5",
    title: "Customer Rating",
    
    icon: Reviews,
  },
  {
    id: 3,
    count: "290+",
    title: "Pin-Codes",
    icon: Cities,
  },
  {
    id: 4,
    count: "100%",
    title: "Warrenty Services",
    
    icon: Warranty,
  },
];

const StatsSection = () => {
  return (
    <section className="py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className=""
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-0 p-3 bg-emerald-50 rounded-full">
                  <img 
                    src={stat.icon} 
                    alt={stat.title} 
                    className="h-10 w-10" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-emerald-600 mb-0">
                  {stat.count}
                </h3>
                <p className="text-sm font-medium text-gray-800 mb-0">
                  {stat.title}
                </p>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;