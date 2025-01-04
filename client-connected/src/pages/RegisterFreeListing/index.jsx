import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginSignup from '../../components/LoginModal';
import OtpVerificationModal from '../../components/OtpVerificationModal';
import FreeListingFromBg from '../../assets/bg/skillindia-form-bg.svg';
import CountdownTimer from '../../components/CountDownTimer';
import { FaTelegramPlane } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import BusinessRegistrationForm from '../../components/FreeListingForm';

export default function ServiceProviderRegistration() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    businessName: '',
    email: '',
    address: '',
    city: '',
    services: '',
    experience: ''
  });

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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowRegistrationForm(true);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
            {!showRegistrationForm ? (
            <motion.div
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-40 flex flex-col lg:flex-row items-center gap-12"
            >
                <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center text-[#035240] bg-[#C4DBC9] px-4 py-2 rounded-full">
                    <span className="mr-2"><FaTelegramPlane /></span>
                    Join For Best Service in India
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                    Grow your business with us.
                    <br />
                    Join for Free and get listed
                </h1>
                
                <p className="text-xl text-gray-600">
                    India's Fastest Service Providers
                </p>
                
                <div className="flex w-full max-w-md">
                    <div className="relative flex-1">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter Mobile Number"
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        maxLength={10}
                    />
                    {/* {phoneNumber && ( */}
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        +91
                        </span>
                    {/* )} */}
                    </div>
                    <button
                    onClick={handleGetStarted}
                    disabled={phoneNumber.length !== 10}
                    className="px-6 py-3 bg-[#035240] text-white rounded-r-lg hover:bg-emerald-700 disabled:opacity-50"
                    >
                    Get Started
                    </button>
                </div>
                
                <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                    <span className="mr-2"><GiCheckMark /></span>
                    Get Discovered and Create Your Online Business
                    </li>
                    <li className="flex items-center text-gray-600">
                    <span className="mr-2"><GiCheckMark /></span>
                    Respond to Customer Reviews and Questions
                    </li>
                    <li className="flex items-center text-gray-600">
                    <span className="mr-2"><GiCheckMark /></span>
                    Showcase Your Product and Service Offerings
                    </li>
                </ul>

                <CountdownTimer />
                </div>
                
                <div className="lg:w-1/2">
                <img 
                    src={FreeListingFromBg} 
                    alt="Service Provider Hero"
                    className="w-full h-auto" 
                />
                </div>
            </motion.div>
            ) : (
            <motion.div
                key="registration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12"
            >
                <div className="lg:w-1/2">
                <img 
                    src={FreeListingFromBg} 
                    alt="Service Provider Hero"
                    className="w-full h-auto" 
                />
                </div>
                
                <div className="lg:w-1/2 bg-white p-8">
                    <h2 className="text-2xl font-semibold mb-6">Enter your business Details</h2>
                
                    <BusinessRegistrationForm />
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      
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