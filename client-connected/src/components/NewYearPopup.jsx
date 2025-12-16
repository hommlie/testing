import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

const NewYearPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup immediately
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleClaim = () => {
        setIsVisible(false);
        navigate(`${config.VITE_BASE_URL}/services`);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-sm mx-4 overflow-hidden text-center bg-white shadow-2xl rounded-3xl md:max-w-md"
                        style={{
                            background: "linear-gradient(135deg, #2c003e 0%, #000000 100%)",
                        }}
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-purple-500 rounded-full mix-blend-screen filter blur-[60px] opacity-30"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-yellow-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors hover:bg-white/10 rounded-full z-10"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div className="relative p-8 pt-12 flex flex-col items-center">

                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[10px] font-bold tracking-widest text-black uppercase shadow-lg shadow-yellow-500/20"
                            >
                                Limited Time Offer
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-sm mb-1 tracking-tight"
                            >
                                HAPPY NEW YEAR
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="text-[80px] font-black leading-none text-white/90 tracking-tighter drop-shadow-2xl my-2"
                                style={{ textShadow: "0 0 40px rgba(168, 85, 247, 0.4)" }}
                            >
                                2026
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-1 mb-6"
                            >
                                <p className="text-lg text-purple-200 font-medium">Start your year with savings!</p>
                                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white">
                                    <span>FLAT</span>
                                    <span className="text-yellow-400">26% OFF</span>
                                </div>
                            </motion.div>

                            {/* Coupon Code Box */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md mb-6 relative group cursor-pointer overflow-hidden"
                                onClick={() => {
                                    navigator.clipboard.writeText('HOMMLIE2026');
                                }}
                            >
                                {/* Dashed border effect */}
                                <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-xl pointer-events-none"></div>

                                <p className="text-xs text-purple-200 mb-1 uppercase tracking-wider">Use Coupon Code</p>
                                <p className="text-2xl font-mono font-bold text-white tracking-wider">HOMMLIE2026</p>

                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClaim}
                                className="w-full py-4 text-base font-bold text-black uppercase transition-transform transform bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl hover:shadow-lg hover:shadow-yellow-500/20"
                            >
                                Claim Offer Now
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NewYearPopup;
