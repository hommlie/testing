import React, { useState } from "react";
import { CheckCircle, Phone, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import config from "../../config/config";

const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    interest: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${config.API_URL}/api/createInspection`, {
        fullName: formData.name,
        address: `Pincode: ${formData.pincode}`,
        mobile: formData.mobile,
        email: "",
        date: new Date().toISOString(),
        time: "N/A",
        service: formData.interest || "HomeForm Lead",
      });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        interest: "",
      });
    } catch (err) {
      console.error("HomeForm submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative ml-0 sm:ml-8 mt-0 sm:max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative overflow-hidden"
        >
          {/* Name Field */}
          <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#033053]/60 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0463ac] transition-all duration-300">
                <User size={16} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Ex: John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0463ac]/10 focus:bg-white text-[#033053] text-[13px] placeholder:text-gray-300 font-semibold transition-all duration-300 border border-transparent focus:border-[#0463ac]/20"
              />
            </div>
          </motion.div>

          {/* Mobile Field */}
          <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#033053]/60 ml-1">
              Mobile Number
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0463ac] transition-all duration-300">
                <Phone size={16} strokeWidth={2.5} />
              </div>
              <input
                type="tel"
                name="mobile"
                placeholder="10-digit number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0463ac]/10 focus:bg-white text-[#033053] text-[13px] placeholder:text-gray-300 font-semibold transition-all duration-300 border border-transparent focus:border-[#0463ac]/20"
              />
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-1"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0463ac] hover:bg-[#03528b] text-white rounded-xl font-bold transition-all duration-300 shadow-sm text-[12px] tracking-wider"
            >
              <span>CALL BACK</span>
              <Phone size={14} className="fill-current" />
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      {/* Premium Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-[#033053]/30 backdrop-blur-md z-[9999]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[3rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] p-12 w-[90%] max-w-md text-center border border-white relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0463ac] to-[#25D366]" />

              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle className="text-green-500 w-12 h-12" strokeWidth={3} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-green-100"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>

              <h3 className="text-3xl font-bold text-[#033053] mb-4 tracking-tighter text-center">
                REQUEST SENT!
              </h3>
              <p className="text-gray-500 font-bold text-[15px] leading-relaxed mb-8">
                We've received your request. One of our experts will call you back shortly.
              </p>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-[#033053] font-black text-[12px] uppercase tracking-widest rounded-2xl transition-all duration-300"
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeForm;
