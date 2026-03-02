import React, { useState } from "react";
import { motion } from "framer-motion";

const stats = [
    {
        id: 1,
        count: "15,000+",
        title: "Happy Customers",
        icon: "https://cdn-icons-png.flaticon.com/512/3481/3481061.png",
        color: "text-[#035240]"
    },
    {
        id: 2,
        count: "4.9/5",
        title: "Customer Rating",
        icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
        color: "text-[#035240]"
    },
    {
        id: 3,
        count: "290+",
        title: "Pin-Codes",
        icon: "https://cdn-icons-png.flaticon.com/512/235/235861.png",
        color: "text-[#035240]"
    },
    {
        id: 4,
        count: "100%",
        title: "Warranty Service",
        icon: "https://cdn-icons-png.flaticon.com/512/3502/3502601.png",
        color: "text-[#035240]"
    },
    {
        id: 5,
        count: "ISO",
        title: "Certified Company",
        icon: "https://cdn-icons-png.flaticon.com/512/2873/2873133.png",
        color: "text-[#035240]"
    }
];

const ImpactStats = () => {
    const [activeStatIndex, setActiveStatIndex] = useState(0);

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[12px] font-black uppercase text-[#033053]/60 tracking-[0.4em] mb-1"
                >
                    Our Impact
                </motion.h2>
                <h2 className="text-xl md:text-2xl font-black uppercase text-[#033053] tracking-tighter">
                    WHY TRUST <span className="text-[#0463ac]">HOMMLIE</span>
                </h2>
            </div>

            <div className="relative w-full">
                <div
                    className="flex md:grid md:grid-cols-5 md:gap-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide snap-x flex-nowrap scroll-smooth"
                    onScroll={(e) => {
                        const scrollLeft = e.target.scrollLeft;
                        const cardWidth = 140 + 16;
                        const newIndex = Math.round(scrollLeft / cardWidth);
                        setActiveStatIndex(newIndex);
                    }}
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex-shrink-0 md:flex-shrink w-[140px] md:w-full snap-center bg-transparent p-2 md:p-1 flex flex-col items-center text-center group cursor-default"
                        >
                            <div className="w-12 h-12 md:w-10 md:h-10 mb-3 p-3 bg-blue-50/50 rounded-full group-hover:scale-110 transition-transform duration-500">
                                <img src={stat.icon} alt={stat.title} className="w-full h-full object-contain" />
                            </div>
                            <h3 className={`text-xl md:text-lg font-black ${stat.color} mb-0.5 tracking-tighter italic`}>{stat.count}</h3>
                            <p className="text-gray-700 text-[8px] md:text-[9px] font-extrabold uppercase tracking-widest md:tracking-wider leading-tight">
                                {stat.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImpactStats;
