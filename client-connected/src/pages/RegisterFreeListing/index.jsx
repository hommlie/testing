import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OtpVerificationModal from '../../components/OtpVerificationModal';
import FreeListingFromBg from '../../assets/bg/skillindia-form-bg1.png';
import { FaTelegramPlane } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import BusinessRegistrationForm from '../../components/FreeListingForm';

export default function ServiceProviderRegistration() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleGetStarted = () => {
    if (phoneNumber.length === 10) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-10">
      <AnimatePresence mode="wait">
        {!showRegistrationForm ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Left: Registration Intro + Input */}
            <div className="space-y-6">
              <div className="inline-flex items-center text-[#035240] bg-[#C4DBC9] px-4 py-1.5 rounded-full text-sm font-medium w-fit shadow-sm">
                <FaTelegramPlane className="mr-2" />
                Join for Best Service in India
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
                Grow your business with us. <br className="hidden md:block" />
                <span className="text-[#035240]">Join for Free</span>
              </h1>

              <p className="text-lg text-gray-600">
                Get listed and connect with thousands of potential customers looking for services like yours.
              </p>

              {/* Phone Input */}
              <div className="flex w-full max-w-md bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    className="w-full px-4 py-3 pl-12 text-sm border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">+91</span>
                </div>
                <button
                  onClick={handleGetStarted}
                  disabled={phoneNumber.length !== 10}
                  className="px-6 py-3 text-sm font-semibold bg-[#035240] text-white hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  Get Started
                </button>
              </div>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li className="flex items-center">
                  <GiCheckMark className="mr-2 text-green-600" /> Get Discovered and Build Online Presence
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="mr-2 text-green-600" /> Respond to Reviews & Customer Queries
                </li>
                <li className="flex items-center">
                  <GiCheckMark className="mr-2 text-green-600" /> Showcase Your Services and Offers
                </li>
              </ul>
            </div>

            {/* Right: Image Visual */}
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-[#e6f4ec] to-white p-6">
              <img
                src={FreeListingFromBg}
                alt="Service Provider Registration"
                className="w-full h-auto object-contain max-h-[480px] mx-auto"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="registration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Left Image */}
            <div className="flex items-center justify-center rounded-xl overflow-hidden shadow-md bg-gradient-to-tr from-[#f0fdf4] to-white p-6">
              <img
                src={FreeListingFromBg}
                alt="Business Registration"
                className="w-full h-auto object-contain max-h-[480px]"
              />
            </div>

            {/* Right Form */}
            <div className="bg-white p-6 lg:p-8 shadow-md border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Business Details</h2>
              <BusinessRegistrationForm phoneNumber={phoneNumber} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Modal */}
      <OtpVerificationModal
        isOpen={isModalOpen}
        phone={phoneNumber}
        onVerificationSuccess={() => {
          setIsModalOpen(false);
          setShowRegistrationForm(true);
        }}
      />
    </div>
  );
}
