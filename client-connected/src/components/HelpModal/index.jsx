import React, { useContext } from "react";
import {
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaUser,
  FaWallet,
  FaGift,
  FaSignOutAlt,
} from "react-icons/fa";

import { MdEmail, MdLocationOn } from "react-icons/md";
import Cookies from "js-cookie";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../LoginModal";
import config from "../../config/config";
import { NavLink } from "react-router-dom";
import ReferAndEarn from "../ReferAndEarnModal";
import AddressModal from "../AddressModal";

const HelpModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useCont();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const handleLogout = () => {
    setUser([]);
    Cookies.remove("HommlieUserjwtToken");
    localStorage.removeItem("Hommlieuser");
    localStorage.removeItem("HommlieselectedAddrs");
    localStorage.removeItem("Hommliecart");
    notify("Successfully logged out", "success");
    onClose();
  };

  const topics = [
    { title: "Order Related", icon: "🛒", route: "/my-bookings" },
    { title: "Raise a Complaint", icon: "📢", route: "/my-bookings" },
    { title: "Shopping", icon: "🛍️", route: "/add-to-cart" },
    { title: "Hommlie Account", icon: "👤" },
    { title: "Payments", icon: "💳", route: "/my-wallet" },
    { title: "Others", icon: "📄", route: "/privacy-policy" },
  ];

  const contactMethods = [
    {
      icon: <FaWhatsapp className="text-green-500 text-xl" />,
      title: "WhatsApp",
      detail: "+91 74838-60408",
      action: "https://wa.me/917483860408"
    },
    {
      icon: <FaPhoneAlt className="text-blue-500 text-xl" />,
      title: "Call Us",
      detail: "63638-65658",
      action: "tel:6363865658"
    },
    {
      icon: <MdEmail className="text-red-500 text-xl" />,
      title: "Email",
      detail: "reach@hommlie.com",
      action: "mailto:help@hommlie.com"
    },
    {
      icon: <MdLocationOn className="text-amber-500 text-xl" />,
      title: "Visit Us",
      detail: "Corporate Office Address",
      action: `${config.VITE_BASE_URL}/contact-us`
    }
  ];

  const [isReferAndEarnOpen, setIsReferAndEarnOpen] = React.useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false);


  const renderAccountContent = () => (
  <div className="p-4">
    <button
      onClick={() => setSelectedTopic(null)}
      className="mb-4 text-sm text-blue-600 hover:underline"
    >
      ← Back to Help Topics
    </button>
    <h3 className="text-2xl font-bold text-gray-800 mb-6">
      Manage Your Account
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NavLink
        to="/add-to-cart"
        className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 shadow-sm transition-all"
        onClick={onClose}
      >
        <svg
          className="w-6 h-6 text-emerald-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M16 6H4V4h12v2zM3 8h14v8H3V8zm2 2v4h10v-4H5z" />
        </svg>
        <span className="text-sm font-medium text-gray-800">My Cart</span>
      </NavLink>

      <NavLink
        to="/my-bookings"
        className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 shadow-sm transition-all"
        onClick={onClose}
      >
        <MdEmail className="text-emerald-600 w-6 h-6" />
        <span className="text-sm font-medium text-gray-800">My Bookings</span>
      </NavLink>

      <NavLink
        to="/edit-profile"
        className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 shadow-sm transition-all"
        onClick={onClose}
      >
        <FaUser className="text-emerald-600 w-6 h-6" />
        <span className="text-sm font-medium text-gray-800">Edit Profile</span>
      </NavLink>

      <NavLink
        to="/my-wallet"
        className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 shadow-sm transition-all"
        onClick={onClose}
      >
        <FaWallet className="text-emerald-600 w-6 h-6" />
        <span className="text-sm font-medium text-gray-800">My Wallet</span>
      </NavLink>

      <button
  onClick={() => {
    setSelectedTopic(null);
    setIsAddressModalOpen(true);
  }}
  className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 shadow-sm transition-all w-full text-left"
>
  <MdLocationOn className="text-emerald-600 w-6 h-6" />
  <span className="text-sm font-medium text-gray-800">
    Your Addresses
  </span>
</button>

<button
  onClick={() => {
    setSelectedTopic(null);
    setIsReferAndEarnOpen(true);
  }}
  className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 rounded-lg border border-gray-200 shadow-sm transition-all w-full text-left"
>
  <FaGift className="text-emerald-600 w-6 h-6" />
  <span className="text-sm font-medium text-gray-800">Refer & Earn</span>
</button>

    </div>
  </div>
);


  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
        <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg flex flex-col max-h-[90vh]">
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Help Center</h2>
                <p className="text-gray-600">How can we help you today?</p>
              </div>
              <button
                className="text-gray-600 hover:text-black"
                onClick={onClose}
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* User Status Section */}
            {!user?.name ? (
              <div className="flex items-center justify-between border rounded-lg px-4 py-3 mt-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A4.5 4.5 0 019 14.25h6a4.5 4.5 0 014.5 4.5v1.5" />
                    </svg>
                    <span className="absolute -bottom-1 -right-1 text-white text-[10px] bg-[#92B775] rounded-full px-[3px] py-[1px] font-bold leading-none">
                      H
                    </span>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">Getting help is easy</h2>
                    <p className="text-sm text-gray-600">Sign in to get help with recent orders</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 text-white bg-[#92b775] hover:bg-[#133215] rounded-lg font-semibold text-sm transition-all"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between border rounded-lg px-4 py-3 mt-4 bg-emerald-50 border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.5A4.5 4.5 0 019 14.25h6a4.5 4.5 0 014.5 4.5v1.5" />
                    </svg>
                    <span className="absolute -bottom-1 -right-1 text-white text-[10px] bg-[#92B775] rounded-full px-[3px] py-[1px] font-bold leading-none">
                      H
                    </span>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-emerald-800">Hello, {user?.name}</h2>
                    <p className="text-sm text-emerald-600">How can we help you today?</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold text-sm transition-all"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="overflow-y-auto flex-1 px-6 py-4">
            {selectedTopic === "account" ? (
              renderAccountContent()
            ) : (
              <>
                {/* Browse Topics */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Browse Topics</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {topics.map((topic, idx) => (
                      topic.route ? (
                        <NavLink
                          key={idx}
                          to={topic.route}
                          onClick={onClose}
                          className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition cursor-pointer hover:border-emerald-200"
                        >
                          <div className="text-3xl mb-2">{topic.icon}</div>
                          <p className="text-sm font-medium text-center">{topic.title}</p>
                        </NavLink>
                      ) : (
                        <div
                          key={idx}
                          className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition cursor-pointer hover:border-emerald-200"
                          onClick={() => {
                            if (topic.title === "Hommlie Account") {
                              setSelectedTopic("account");
                            } else {
                              console.log(`Selected topic: ${topic.title}`);
                            }
                          }}
                        >
                          <div className="text-3xl mb-2">{topic.icon}</div>
                          <p className="text-sm font-medium text-center">{topic.title}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Contact Options */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Contact Options</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactMethods.map((method, idx) => (
                      <a
                        key={idx}
                        href={method.action}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-lg p-4 flex items-center gap-4 hover:shadow transition cursor-pointer hover:border-emerald-200"
                      >
                        <div className="flex-shrink-0">{method.icon}</div>
                        <div>
                          <p className="font-medium text-gray-800">{method.title}</p>
                          <p className="text-sm text-gray-500">{method.detail}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Need more help? Contact our support team 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
            <LoginSignup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
        }}
      />

      {/* Refer & Earn Modal */}
      <ReferAndEarn
        isOpen={isReferAndEarnOpen}
        onClose={() => setIsReferAndEarnOpen(false)}
      />

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </>

  );
};

export default HelpModal;