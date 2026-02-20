import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useCont } from "../../context/MyContext";
import {
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  User,
  Smartphone,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck
} from "lucide-react";

const InspectionFormSection = () => {
  const { categoryData } = useCont();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [managerName, setManagerName] = useState("");
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  const notify = useToast();
  const errorNotify = (msg) => notify(msg, "error");

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

  useEffect(() => {
    const names = ["Anglin Malar", "Sharvista", "Ranjith", "Kiran", "Rahul"];
    // Randomize name once per session
    setManagerName(names[Math.floor(Math.random() * names.length)]);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${config.API_URL}/api/createInspection`, {
        fullName: formData.name,
        mobile: formData.phone,
        email: formData.email || "reach@hommlie.com",
        service: "Free Inspection Request",
        address: "Home Service Request",
        date: new Date().toISOString(),
        time: "ASAP",
      });

      if (response.data.status === 1) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "" });
      } else {
        errorNotify("Booking failed.");
      }
    } catch (err) {
      errorNotify("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full mx-auto px-0 md:px-8 py-0 md:py-10 overflow-hidden">
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 text-[#0463ac] text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <ShieldCheck size={14} className="group-hover:rotate-12 transition-transform" />
            Certified Inspections
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-[#033053] tracking-tight leading-[1.1] mb-6"
          >
            Schedule Your <span className="text-[#0463ac]">Inspection</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 font-medium text-base max-w-xl mx-auto leading-relaxed"
          >
            Experience premium service standards with a dedicated expert assigned to your home within minutes.
          </motion.p>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl"
          >
            <div className="bg-white rounded-none md:rounded-[28px] p-6 md:p-10 shadow-none md:shadow-[0_20px_60px_rgba(3,48,83,0.06)] border-none md:border border-gray-50">
              <div className="mb-8 text-center md:text-left">
                <h3 className="text-[#033053] text-2xl md:text-3xl font-black tracking-tight mb-2">Request callback</h3>
                <p className="text-gray-400 text-sm font-medium">Takes less than 30 seconds to book.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-[#033053] ml-2 block">Full Name</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#033053]/60 group-focus-within:text-[#0463ac] transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#0463ac] focus:bg-white transition-all outline-none text-[#033053] font-semibold text-base placeholder:text-[#033053]/30"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold uppercase tracking-wider text-[#033053] ml-2 block">Phone Number</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#033053]/60 group-focus-within:text-[#0463ac] transition-colors">
                        <Smartphone size={18} />
                      </div>
                      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-[#033053]/60 font-bold text-sm border-r border-gray-200 pr-3">IN</div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        className="w-full pl-20 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#0463ac] focus:bg-white transition-all outline-none text-[#033053] font-semibold text-base placeholder:text-[#033053]/30"
                        placeholder="Mobile number"
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 ml-2 font-bold uppercase tracking-wider mt-1">{errors.phone}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#0463ac] to-[#033053] text-white py-4 md:py-6 rounded-[16px] md:rounded-[24px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[13px] shadow-xl md:shadow-2xl hover:shadow-[#0463ac]/30 transition-all flex items-center justify-center gap-2 md:gap-3 group/btn cursor-pointer overflow-hidden relative"
                  >
                    {/* Infinite Shimmer Animation - Matches Brand Standard */}
                    <motion.div
                      animate={{
                        x: ['-200%', '200%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20 pointer-events-none"
                    />

                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="relative z-10 hidden md:inline">Secure Inspection Now</span>
                        <span className="relative z-10 md:hidden">Book Inspection</span>
                        <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>

                  <div className="pt-4 text-center border-t border-gray-50">
                    <p className="text-[#033053]/80 text-[10px] font-semibold uppercase tracking-[0.3em] mb-2">Personal Concierge Assigned</p>
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 px-5 py-2 border border-gray-100 rounded-2xl bg-white shadow-sm"
                      >
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                          <User size={14} className="text-[#0463ac]" />
                        </div>
                        <span className="text-[#033053] font-black text-lg tracking-tight italic flex items-center gap-2">
                          {managerName}
                          <Sparkles size={14} className="text-amber-400" />
                        </span>
                      </motion.div>
                      <div className="flex items-center gap-5 mt-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#033053]">
                          <Clock size={12} className="text-emerald-500" /> 5 Min Response
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#033053]">
                          <ShieldCheck size={12} className="text-emerald-500" /> Verified Pro
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Carousel with Heading */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-center mb-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[15px] font-black uppercase text-[#033053]/60 tracking-[0.4em] mb-1 font-semibold"
          >
            Our Impact
          </motion.h2>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#033053] tracking-tighter">
            WHY TRUST <span className="text-[#0463ac]">HOMMLIE</span>
          </h2>
        </div>

        <div className="relative w-full">
          <div
            className="overflow-x-auto pb-10 scrollbar-hide snap-x flex flex-nowrap gap-6 px-4 scroll-smooth"
            onScroll={(e) => {
              const scrollLeft = e.target.scrollLeft;
              const cardWidth = 180 + 24;
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
                className="flex-shrink-0 w-[200px] snap-center bg-transparent p-6 flex flex-col items-center text-center group cursor-default"
              >
                <div className="w-16 h-16 mb-4 p-4 bg-blue-50/50 rounded-full group-hover:scale-110 transition-transform duration-500">
                  <img src={stat.icon} alt={stat.title} className="w-full h-full object-contain" />
                </div>
                <h3 className={`text-2xl font-black ${stat.color} mb-1 tracking-tighter italic`}>{stat.count}</h3>
                <p className="text-gray-700 text-[10px] font-bold uppercase tracking-widest">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator for Mobile */}
          <div className="flex justify-center gap-2 -mt-4 md:hidden">
            {stats.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStatIndex ? 'bg-[#0463ac] w-6' : 'bg-gray-200 w-1.5'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[48px] p-10 md:p-14 shadow-2xl text-center w-full max-w-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-[#033053] mb-4 tracking-tighter">Request Received!</h3>
              <p className="text-gray-500 mb-10 font-medium leading-relaxed">
                Thank you for choosing luxury. <span className="font-bold text-[#033053]">{managerName}</span> will be your personal concierge and will connect with you within minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full bg-[#033053] text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#0463ac] transition-all shadow-xl active:scale-[0.98]"
              >
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspectionFormSection;
