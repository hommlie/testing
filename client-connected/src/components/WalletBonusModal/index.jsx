import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { FaWallet, FaCheckCircle, FaTimes, FaStar } from "react-icons/fa";

const WalletBonusModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const particles = Array.from({ length: 12 });

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden p-8 text-center border border-blue-50"
                >
                    {/* Decorative Sparks */}
                    {particles.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                x: Math.cos(i * 30 * Math.PI / 180) * 150,
                                y: Math.sin(i * 30 * Math.PI / 180) * 150,
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeOut"
                            }}
                            className="absolute top-1/2 left-1/2 pointer-events-none"
                        >
                            <FaStar className="text-yellow-400 opacity-60 text-lg" />
                        </motion.div>
                    ))}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                    >
                        <FaTimes size={18} />
                    </button>

                    {/* Icon Area with Glowing Effect */}
                    <div className="relative mb-8 pt-4">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
                        <motion.div
                            initial={{ rotate: -15, scale: 0.5 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="relative w-24 h-24 bg-gradient-to-br from-[#0463ac] to-[#0580ca] rounded-3xl mx-auto flex items-center justify-center shadow-2xl ring-8 ring-blue-50"
                        >
                            <FaWallet className="text-white text-4xl" />
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="absolute -bottom-2 right-[calc(50%-2.5rem)] w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg"
                        >
                            <FaCheckCircle className="text-white text-lg" />
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-tight">
                                Welcome Reward!
                            </h2>
                            <p className="text-gray-500 font-bold text-[10px] mt-1 uppercase tracking-[0.2em] opacity-80">Registration Bonus</p>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-inner"
                        >
                            <span className="block text-5xl font-black text-[#0463ac] mb-1 drop-shadow-sm">₹100</span>
                            <span className="text-xs font-bold text-[#0580ca] uppercase tracking-wider">Enjoyment Bonus Added</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-600 text-sm leading-relaxed px-4"
                        >
                            As a special <span className="text-[#0463ac] font-bold">welcome gift</span>, we've credited ₹100 to your wallet. Use it for your first booking!
                        </motion.p>
                    </div>

                    {/* Action Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8"
                    >
                        <button
                            onClick={onClose}
                            className="w-full bg-[#0463ac] hover:bg-[#03528b] text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-widest"
                        >
                            Claim Now
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default WalletBonusModal;
