import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '../../context/ToastProvider';
import { Copy, Share2, Smartphone, Users, Gift, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const ReferAndEarn = ({ isOpen, onClose }) => {
  const [referralCode, setReferralCode] = useState('');
  const [userName, setUserName] = useState('');
  const [copied, setCopied] = useState(false);
  const notify = useToast();

  useEffect(() => {
    if (!isOpen) return;
    const jwtToken = Cookies.get('HommlieUserjwtToken');
    if (jwtToken) {
      try {
        const user = jwtDecode(jwtToken);
        setReferralCode(user.referral_code || 'REFERRAL_CODE_NOT_FOUND');
        setUserName(user.name || 'Friend');
      } catch (error) {
        console.error('Error decoding JWT:', error);
        onClose();
      }
    }
  }, [isOpen, onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      notify('Referral code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
      notify('Failed to copy referral code', 'error');
    });
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Hey! 👋 I'm using Hommlie for my home services and it's amazing. Use my referral code ${referralCode} to sign up and get rewards! 🎉`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const steps = [
    { icon: <Smartphone className="w-5 h-5 text-[#0463ac]" />, title: "INVITE", desc: "Share code" },
    { icon: <Users className="w-5 h-5 text-[#0463ac]" />, title: "JOIN", desc: "Friends join" },
    { icon: <Gift className="w-5 h-5 text-[#0463ac]" />, title: "REWARD", desc: "Get rewards" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with premium blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative bg-white w-[90%] sm:w-full max-w-sm rounded-[32px] shadow-2xl z-[101] flex flex-col border border-gray-100 overflow-hidden max-h-[70vh]"
          >
            {/* Header - Fixed & Sticky */}
            <div className="p-6 pb-2 flex justify-between items-start bg-white z-20 flex-shrink-0">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-[#033053] tracking-tight leading-none">
                  Refer & Earn
                </h2>
                <div className="w-12 h-1.5 bg-[#0463ac] mt-2 rounded-full" />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
                aria-label="Close"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain">
              <p className="text-gray-500 text-[13px] font-medium leading-relaxed mb-8 text-center sm:text-left">
                Spread the joy of Hommlie! Invite your friends and family to join and get <span className="text-[#0463ac] font-bold">instant rewards</span>.
              </p>

              {/* Steps Gid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="w-14 h-14 rounded-2xl bg-[#f0f9ff] flex items-center justify-center mb-3 shadow-[0_4px_10px_rgba(4,99,172,0.1)] group-hover:scale-105 transition-transform border border-blue-50">
                      {step.icon}
                    </div>
                    <h4 className="text-[10px] font-black text-[#033053] tracking-widest uppercase mb-1">{step.title}</h4>
                    <p className="text-[9px] text-gray-400 font-bold leading-none">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Referral Box - Enhanced Visuals */}
              <div className="bg-gradient-to-br from-[#f8faff] to-white rounded-[24px] p-5 border border-dashed border-[#0463ac]/30 shadow-sm">
                <p className="text-[10px] font-extrabold text-[#033053]/70 uppercase tracking-[0.2em] text-center mb-3">Your Unique Code</p>

                <div className="flex items-center gap-2.5">
                  <div
                    onClick={copyToClipboard}
                    className="flex-1 bg-white cursor-pointer hover:border-[#0463ac]/50 transition-colors rounded-xl h-12 px-4 flex items-center justify-between border border-gray-200 shadow-sm active:scale-[0.98]"
                  >
                    <span className="text-lg font-black text-[#033053] tracking-widest font-mono">
                      {referralCode}
                    </span>
                    <div className="text-[#0463ac]">
                      {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </div>
                  </div>

                  <button
                    onClick={shareOnWhatsApp}
                    className="h-12 w-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-lg shadow-green-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Decorative Bar */}
            <div className="h-2 bg-gradient-to-r from-[#0463ac] via-[#035240] to-[#033053] flex-shrink-0" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReferAndEarn;


