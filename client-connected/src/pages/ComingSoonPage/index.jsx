import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRocket, FaTimes } from "react-icons/fa";

const ComingSoonModal = ({ isOpen, onClose, source }) => {
  // If not open, we don't render anything (though AnimatePresence handles the exit)
  // However, for AnimatePresence to work, the parent usually needs to conditionally render the component 
  // OR the component itself returns null but AnimatePresence wraps it ???
  // Actually, usually: <AnimatePresence>{isOpen && <Modal />}</AnimatePresence>
  // But here existing code passed isOpen into the component. 
  // Let's stick to the pattern: Component returns the AnimatePresence block.

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with Blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/5"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Premium Header Decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 z-10"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="px-8 pb-8 pt-10 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100">
                <FaRocket className="text-3xl" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                {source === "See More" ? "More Services!" : source === "Product" ? "Product Store" : source === "Hommlie Chat" ? "Hommlie AI Chat" : "Coming Soon"}
              </h2>

              <div className="text-gray-500 leading-relaxed mb-8 text-[13px]">
                {source === "See More" ? (
                  <>
                    We're preparing to launch more services across every category.
                    <br className="hidden sm:block" />
                    The next big upgrade is on the way.
                  </>
                ) : source === "Product" ? (
                  <>
                    We are building an exclusive store for premium home products.
                    <br className="hidden sm:block" />
                    <span className="font-semibold text-emerald-600 mt-1 block">Something amazing is in the works!</span>
                  </>
                ) : source === "Hommlie Chat" ? (
                  <>
                    Our <strong className="text-[#0463ac]">AI-powered Hommlie Chat</strong> is currently in the final stages of development.
                    <br className="hidden sm:block" />
                    <span className="block mt-2">Get ready for a smarter, faster way to manage your home services. We are perfecting the experience to ensure it's nothing short of excellent.</span>
                  </>
                ) : (
                  <>
                    Our <strong className="text-gray-800">{source}</strong> service is currently under development.
                    <br />
                    We'll notify you when it's live.
                  </>
                )}
              </div>

              <div className="space-y-3">
                <Link
                  to="/register-free-listing"
                  onClick={onClose}
                  className="block w-full rounded-xl bg-gradient-to-r from-[#0463ac] to-[#035240] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  Join Waitlist / ONDC
                </Link>

                <button
                  onClick={onClose}
                  className="block w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonModal;
