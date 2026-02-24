import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import config from '../../config/config';

const ContactForm = ({ user, isOpen, onClose, source = "homepage" }) => {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // ---------- Validation ----------
  const validateForm = () => {
    const newErrors = {};

    if (!callbackName.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z ]+$/.test(callbackName.trim())) {
      newErrors.name = 'Name must contain only letters.';
    }

    if (!callbackPhone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{10}$/.test(callbackPhone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Submit ----------
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const fullPhone = `${countryCode}${callbackPhone.trim()}`;

    try {
      const address = source === "qrproject"
        ? "Callback request from qrproject"
        : "Callback request from homepage";

      await axios.post(`${config.API_URL}/api/createInspection`, {
        fullName: callbackName,
        address,
        mobile: fullPhone,
        email: "",
        date: new Date().toISOString(),
        time: "N/A",
        service: "Request Callback",
      });

      setIsSubmitted(true);
      setTimeout(() => {
        onClose(); // close after success
        setIsSubmitted(false);
        setCallbackName('');
        setCallbackPhone('');
        setErrors({});
      }, 2500);
    } catch (err) {
      console.error("Callback submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999999]">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[92%] max-w-md text-center border border-gray-100 animate-in fade-in zoom-in duration-300">
        {!isSubmitted ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#033053]">Request a Call Back</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your details and we'll reach out shortly.</p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#033053]/60 mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0463ac]/10 focus:border-[#0463ac]/20 text-[#033053] font-semibold transition-all"
                />
                {errors.name && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#033053]/60 mb-1.5 ml-1">Mobile Number</label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[#033053] font-semibold focus:outline-none transition-all"
                  >
                    <option value="+91">+91 🇮🇳</option>
                    <option value="+1">+1 🇺🇸</option>
                    <option value="+44">+44 🇬🇧</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={callbackPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setCallbackPhone(value);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0463ac]/10 focus:border-[#0463ac]/20 text-[#033053] font-semibold transition-all"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[11px] mt-1 ml-1">{errors.phone}</p>}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0463ac] hover:bg-[#03528b] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#0463ac]/20 transition-all duration-300"
                >
                  SUBMIT REQUEST
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-sm text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                  NOT NOW
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-[#033053] mb-2">THANK YOU!</h3>
            <p className="text-gray-500 font-medium px-4">
              Your request has been sent. We will call you back shortly.
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ContactForm;