import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '../../context/ToastProvider';
import config from '../../config/config';

const ReferAndEarn = ({ isOpen, onClose }) => {
  const [friendMobile, setFriendMobile] = useState('');
  const [friendName, setFriendName] = useState('');
  const notify = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get('HommlieUserjwtToken');
    if (jwtToken) {
      const user = jwtDecode(jwtToken);
      try {
        const response = await axios.post(
          `${config.API_URL}/inviteRefer`,
          {
            user_id: user.id,
            friend_mobile: friendMobile,
            friend_name: friendName,
            discount_amount: 100
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.data.status === 1) {
          notify('Invitation sent successfully!', 'success');
          onClose();
        } else {
          notify(response.data.message, 'warning');
        }
      } catch (error) {
        notify('Error sending invitation', 'error');
        console.error('Error sending invitation:', error);
      }
    }
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
          <p className="text-white mb-6">Invite your friends and family and get instant ₹100 off in your Hommlie wallet.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="friendName" className="block text-sm font-medium text-white">Friend's Name</label>
              <input
                type="text"
                id="friendName"
                value={friendMobile}
                onChange={(e) => setFriendName(e.target.value)}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                required
                pattern="[0-9]{10}"
              />
            </div>
            <div>
              <label htmlFor="friendMobile" className="block text-sm font-medium text-white">Friend's Mobile Number</label>
              <input
                type="tel"
                id="friendMobile"
                value={friendMobile}
                onChange={(e) => setFriendMobile(e.target.value)}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                required
                pattern="[0-9]{10}"
              />
            </div>
            <button
              type="submit"
              className="w-40 px-4 py-2 bg-white text-[#035240] rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Send Invite
            </button>
          </form>
        </div>
        <div className="p-6 bg-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">How it works</h3>
          <ol className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="bg-[#035240] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
              <span>Enter your friend's mobile number.</span>
            </li>
            <li className="flex items-center">
              <span className="bg-[#035240] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
              <span>Click 'Send Invite' to share the offer.</span>
            </li>
            <li className="flex items-center">
              <span className="bg-[#035240] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
              <span>Get ₹100 off in your Hommlie wallet when they join!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;