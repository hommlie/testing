import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line } from 'react-icons/ri';
import AiChatDrawer from '../AiChat';

const WhatsAppWidget = () => {
    const [isAiOpen, setIsAiOpen] = useState(false);

    const toggleAi = () => {
        setIsAiOpen(!isAiOpen);
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
                className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-gradient-to-tr from-[#0463ac] to-[#0693e3] text-white rounded-full cursor-pointer shadow-lg z-[999] flex items-center justify-center transition-shadow hover:shadow-2xl"
            >
                <RiRobot2Line className="text-2xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </motion.div>

            {/* AI Chat Drawer (full flow) */}
            <AiChatDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
        </>
    );
};

export default WhatsAppWidget;
