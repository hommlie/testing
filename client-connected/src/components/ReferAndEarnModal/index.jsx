import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '../../context/ToastProvider';
import { Copy, Share2 } from 'lucide-react';

const ReferAndEarn = ({ isOpen, onClose }) => {
  const [referralCode, setReferralCode] = useState('');
  const [userName, setUserName] = useState('');
  const notify = useToast();

  useEffect(() => {
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
    } else {
      onClose();
    }
  }, [onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      notify('Referral code copied to clipboard!', 'success');
    }, (err) => {
      console.error('Could not copy text: ', err);
      notify('Failed to copy referral code', 'error');
    });
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Hey! 👋 I'm using this amazing service and thought you might like it too. Use my referral code ${referralCode} to sign up and we both get rewards! 🎉`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 opacity-60 bg-black" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-lg max-w-md mx-auto relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-8 bg-gradient-to-r from-[#035240] to-[#04bf95]">
          <h2 className="text-3xl font-bold mb-6 text-white">Refer and Earn</h2>
          <p className="text-white mb-6">Share your referral code with friends and family to earn rewards!</p>
          <div className="bg-white rounded-lg p-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">{referralCode}</span>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-[#035240] text-white rounded-full hover:bg-[#04bf95] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#035240] transition duration-300"
                aria-label="Copy referral code"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] transition duration-300"
                aria-label="Share on WhatsApp"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">How it works</h3>
          <ol className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="bg-[#035240] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
              <span>Copy your unique referral code or share directly via WhatsApp.</span>
            </li>
            <li className="flex items-center">
              <span className="bg-[#035240] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
              <span>Share the code with your friends.</span>
            </li>
            <li className="flex items-center">
              <span className="bg-[#035240] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
              <span>Earn rewards when they use your code!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;