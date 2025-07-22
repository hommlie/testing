import React from "react";
import { motion } from "framer-motion";

const ComingSoonModal = ({ isOpen, onClose, source }) => {
  if (!isOpen) return null;

  const isSeeMore = source === "See More";

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white max-w-md w-full p-6 rounded-2xl text-center shadow-xl relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#035240] mb-2">
          {isSeeMore ? "More Services Coming Soon!" : "Coming Soon"}
        </h2>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {isSeeMore ? (
            <>
              We're preparing to launch more services across every category.<br />
              From tech-driven automation to next-gen home care, the next big upgrade is on the way.
              <br />
              <br />
              <span className="font-semibold text-[#035240]">Stay tuned. You're going to love it.</span>
            </>
          ) : (
            <>
              Our <strong>{source}</strong> service is currently under development.
              <br />
              We’ll be live soon with a better, faster experience.
              <br />
              <span className="text-[#035240] font-medium">Thanks for your patience!</span>
            </>
          )}
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-[#92b876] text-white px-6 py-2 rounded-lg hover:bg-[#044d3f] transition-all text-sm font-medium"
        >
          Back to Services
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonModal;
