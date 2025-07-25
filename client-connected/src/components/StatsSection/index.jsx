import React from "react";
import Customers from "../../assets/icons/customer.svg";
import Reviews from "../../assets/icons/reviews.svg";
import Cities from "../../assets/icons/cities.svg";
import Warranty from "../../assets/icons/warranty.svg";
import Iso from "../../assets/icons/iso.png";
import { motion } from "framer-motion";

const statsData = [
  {
    id: 1,
    count: "10,000+",
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
    title: "Warranty Services",
    icon: Warranty,
  },
  {
    id: 5,
    count: null,
    title: "ISO Certified Company",
    icon: Iso,
  },
];

const StatsSection = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={stat.icon}
                alt={stat.title}
                className="h-12 w-12 mb-3 object-contain"
              />
              {stat.count && (
                <h3 className="text-xl font-bold text-emerald-700 mb-1">
                  {stat.count}
                </h3>
              )}
              <p className="text-sm font-medium text-gray-800">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
