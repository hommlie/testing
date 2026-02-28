import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* WhatsApp Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className="fixed bottom-20 md:bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full cursor-pointer shadow-lg z-[999] flex items-center justify-center text-3xl transition-shadow hover:shadow-2xl"
            >
                💬
            </motion.div>

            {/* WhatsApp Popup Box */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-[152px] md:bottom-24 right-6 w-72 bg-white rounded-2xl shadow-2xl font-sans z-[999] overflow-hidden border border-gray-100"
                    >
                        <div className="bg-[#075E54] text-white p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#075E54] font-bold text-lg">
                                        H
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075E54] rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base leading-tight">Hommlie Support</h3>
                                    <p className="text-xs text-green-200">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white opacity-80 hover:opacity-100 transition-opacity text-2xl leading-none"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-5 bg-[#e5ddd5] min-h-[100px] relative">
                            {/* Message Bubble effect */}
                            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-800 relative inline-block max-w-[90%]">
                                <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent"></div>
                                Hi 👋<br />
                                How can we help you today?
                            </div>
                        </div>
                        <div className="p-4 bg-white">
                            <a
                                href="https://wa.me/918884445855?text=Hello%20I%20want%20more%20information"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold no-underline hover:bg-[#1ebe5d] transition-colors shadow-md active:translate-y-0.5"
                            >
                                <span>Start Chat</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WhatsAppWidget;
