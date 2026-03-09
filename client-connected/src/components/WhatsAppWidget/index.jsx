import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line } from 'react-icons/ri';
import AiChatDrawer from '../AiChat';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAiOpen, setIsAiOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (isAiOpen) setIsAiOpen(false);
    };

    const toggleAi = () => {
        setIsAiOpen(!isAiOpen);
        if (isOpen) setIsOpen(false);
    };

    return (
        <>
            {/* AI Chatbot Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleAi}
                className="fixed bottom-[152px] md:bottom-28 right-6 w-14 h-14 bg-gradient-to-tr from-[#0463ac] to-[#0693e3] text-white rounded-full cursor-pointer shadow-lg z-[999] flex items-center justify-center transition-shadow hover:shadow-2xl"
            >
                <RiRobot2Line className="text-2xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </motion.div>

            {/* AI Chat Drawer (full flow) */}
            <AiChatDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

            {/* WhatsApp Chat Button */}
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
                        className="fixed bottom-[152px] md:bottom-24 right-6 w-72 bg-white rounded-2xl shadow-2xl font-sans z-[1001] overflow-hidden border border-gray-100"
                    >
                        <div className="bg-[#075E54] text-white p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#075E54] font-bold text-lg">H</div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075E54] rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base leading-tight">Hommlie Support</h3>
                                    <p className="text-xs text-green-200">Online</p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="text-white opacity-80 hover:opacity-100 transition-opacity text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-5 bg-[#e5ddd5] min-h-[100px] relative">
                            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-800 relative inline-block max-w-[90%]">
                                <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent"></div>
                                Hi 👋<br />How can we help you today?
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
