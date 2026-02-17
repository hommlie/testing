import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '../../context/ToastProvider';
import { Copy, Share2, Smartphone, Users, Gift, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { FaGift } from 'react-icons/fa';

const ReferAndEarn = ({ isOpen, onClose }) => {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const notify = useToast();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  useEffect(() => {
    if (!isOpen) return;
    const jwtToken = Cookies.get('HommlieUserjwtToken');
    if (jwtToken) {
      try {
        const user = jwtDecode(jwtToken);
        setReferralCode(user.referral_code || 'REFERRAL_CODE');
      } catch (error) {
        console.error('Error decoding JWT:', error);
        onClose();
      }
    }
  }, [isOpen, onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      notify('Referral code copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }, (err) => {
      notify('Failed to copy code', 'error');
    });
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Hey! 👋 Use my referral code ${referralCode} to sign up on Hommlie and get rewards! 🎉`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const steps = [
    { icon: <Smartphone size={18} className="text-[#0463ac]" />, title: "INVITE", desc: "Share code" },
    { icon: <Users size={18} className="text-[#0463ac]" />, title: "JOIN", desc: "Friends join" },
    { icon: <Gift size={18} className="text-[#0463ac]" />, title: "REWARD", desc: "Get rewards" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Mobile Only (Already handled by fixed inset-0 on container) */}

          {/* Modal / Dropdown Container */}
          <div className={`${isMobile ? "fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" : ""}`} onClick={isMobile ? onClose : undefined}>
            <motion.div
              initial={isMobile ? { scale: 0.9, opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              animate={isMobile ? { scale: 1, opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isMobile ? { scale: 0.9, opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`
                bg-white shadow-2xl flex flex-col overflow-hidden
                ${isMobile
                  ? "relative w-full max-w-sm rounded-[2rem] max-h-[90vh]"
                  : "absolute right-0 top-full mt-3 w-[340px] rounded-2xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50"
                }
              `}
            >
              {/* Desktop Top Arrow */}
              {!isMobile && (
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45 z-10" />
              )}

              {/* Header Accent */}
              <div className={`h-1 w-full bg-gradient-to-r from-[#0463ac] via-[#0580ca] to-[#0463ac] flex-shrink-0 ${isMobile ? 'hidden' : 'block'}`} />

              {/* Mobile Drag Handle */}
              {isMobile && (
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                  <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>
              )}

              {/* Top Branding Section - Compact */}
              <div className="relative bg-gradient-to-br from-[#0463ac] to-[#0580ca] py-4 px-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/30">
                      <FaGift className="text-white text-xs" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-base leading-tight">Refer & Earn</h2>
                      <p className="text-white/70 text-[10px] uppercase font-bold tracking-wider">Invite & Get Rewards</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="h-7 w-7 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 transition-all font-bold"
                  >
                    <IoMdClose size={16} />
                  </button>
                </div>
              </div>

              {/* Body Content - Compact */}
              <div className="px-6 py-4 overflow-y-auto scrollbar-hide flex-1 bg-white">
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50/50 flex items-center justify-center mb-3 relative">
                    <div className="absolute inset-0 bg-[#0463ac]/5 rounded-xl animate-pulse" />
                    <Gift size={22} className="text-[#0463ac] relative z-10" />
                  </div>

                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Spread the Joy!</h3>
                  <p className="text-gray-500 text-[12px] font-semibold text-center leading-tight mb-4 max-w-[220px]">
                    Share your code and get rewards on <span className="text-[#0463ac]">Hommlie</span>.
                  </p>

                  {/* Steps Section - Mini */}
                  <div className="grid grid-cols-3 gap-2 w-full mb-5">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center mb-1.5 border border-gray-100 shadow-sm">
                          {step.icon}
                        </div>
                        <span className="text-[8px] font-bold text-[#033053] uppercase tracking-wide">{step.title}</span>
                        <span className="text-[7px] text-gray-400 font-bold">{step.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Referral Box - Low Profile */}
                  <div className="w-full bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Your Personal Code</p>

                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-between px-3 transition-all active:scale-[0.98] group hover:border-[#0463ac]/30 shadow-sm"
                      >
                        <span className="text-[13px] font-bold text-[#033053] tracking-widest font-mono">
                          {referralCode}
                        </span>
                        <div className="text-[#0463ac]">
                          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </div>
                      </button>

                      <button
                        onClick={shareOnWhatsApp}
                        className="h-10 w-10 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Slim */}
              <div className="px-6 py-2.5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-center text-center flex-shrink-0">
                <p className="text-[8px] font-bold text-[#0463ac]/60 uppercase tracking-[0.2em]">Rewards await you</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReferAndEarn;
