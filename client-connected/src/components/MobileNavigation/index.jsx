import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiRobot2Line,
  RiRobot2Fill,
  RiTeamLine,
  RiTeamFill,
} from "react-icons/ri";
import { FaUser, FaWallet, FaGift, FaSignOutAlt, FaQuestionCircle, FaTimes, FaTools, FaHandshake, FaHeadset } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useCont } from "../../context/MyContext";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import ComingSoonModal from "../../pages/ComingSoonPage";

const MobileNavigation = () => {
  const navItems = [
    { path: "/", label: "Home", iconImage: "/images/logoh.png" },
    { path: "#", label: "AI Chat", IconOutline: RiRobot2Line, IconFill: RiRobot2Fill, isComingSoon: true },
    { path: "/help", label: "Help", IconOutline: FaQuestionCircle, IconFill: FaQuestionCircle },
    { path: "#", label: "Account", IconOutline: FaUser, IconFill: FaUser, isDrawer: true },
  ];

  const {
    user,
    handleLogout,
    setIsAddressModalOpen,
    setIsReferAndEarnOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
  } = useCont();
  const isLoggedIn = user && Object.keys(user).length > 0;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const loginDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(e.target)) {
        setIsLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-50 pb-safe"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <nav className="flex justify-between items-center px-0 py-1">
        {navItems.map(({ path, label, IconOutline, IconFill, iconImage, isDrawer, isComingSoon }, index) => {
          const Content = ({ isActive = false }) => (
            <motion.div whileTap={{ scale: 0.92 }} className="flex flex-col items-center gap-0.5">
              {iconImage && index === 0 ? (
                <img
                  src={iconImage}
                  alt=""
                  aria-hidden="true"
                  className="w-[2.9rem] h-[2.9rem] object-contain -mt-1.5 -mb-1"
                />
              ) : (
                <>
                  {isActive ? (
                    <IconFill className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <IconOutline className="w-6 h-6" aria-hidden="true" />
                  )}
                  <span className="text-[11px] font-bold tracking-tight">{label}</span>
                </>
              )}
            </motion.div>
          );

          if (isDrawer) {
            return (
              <button
                key={label}
                onClick={() => setIsLoginOpen(true)}
                className="flex flex-col items-center justify-center flex-1 py-1.5 min-h-[58px] transition-all duration-300 text-gray-500"
              >
                <Content isActive={isLoginOpen} />
              </button>
            );
          }

          if (isComingSoon) {
            return (
              <button
                key={label}
                onClick={() => setIsComingSoonOpen(true)}
                className="flex flex-col items-center justify-center flex-1 py-1.5 min-h-[58px] transition-all duration-300 text-gray-500"
              >
                <Content isActive={isComingSoonOpen} />
              </button>
            );
          }

          return (
            <NavLink
              key={path}
              to={path}
              onClick={() => window.scrollTo(0, 0)}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center flex-1 py-1.5 min-h-[58px] transition-all duration-300",
                  isActive ? "text-[#0463ac]" : "text-gray-500",
                ].join(" ")
              }
            >
              {({ isActive }) => <Content isActive={isActive} />}
            </NavLink>
          );
        })}
      </nav>

      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        source="Hommlie Chat"
      />

      {createPortal(
        <AnimatePresence>
          {isLoginOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsLoginOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
              />

              <motion.div
                ref={loginDropdownRef}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-[75%] max-w-sm bg-white z-[9999] shadow-2xl overflow-hidden flex flex-col md:hidden"
              >
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setIsLoginOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="relative bg-gradient-to-br from-[#0463ac] to-[#0580ca] px-6 py-8 flex-shrink-0">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-5 blur-xl"></div>

                  <div className="relative flex flex-col gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ring-4 ring-white/10 shadow-lg">
                      <FaUser className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl tracking-tight">Hello, {user?.name || user?.username || "User"}!</h3>
                      <p className="text-blue-100 text-sm font-medium opacity-90">Welcome back to Hommlie</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 py-2">
                  <div className="grid grid-cols-1 gap-1 p-2">
                    {isLoggedIn && (
                      <>
                        <NavLink
                          to="/edit-profile"
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                          onClick={() => setIsLoginOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                            <FaUser className="text-[#0463ac] group-hover:text-white transition-colors" />
                          </div>
                          <span className="font-semibold text-sm">Edit Profile</span>
                        </NavLink>

                        <NavLink
                          to="/my-bookings"
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                          onClick={() => setIsLoginOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                            <MdEmail className="text-[#0463ac] group-hover:text-white transition-colors" />
                          </div>
                          <span className="font-semibold text-sm">My Bookings</span>
                        </NavLink>

                        <NavLink
                          to="/my-wallet"
                          className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                          onClick={() => setIsLoginOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                            <FaWallet className="text-[#0463ac] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">My Wallet</span>
                            <span className="text-[10px] text-gray-400 font-medium">Balance & Transactions</span>
                          </div>
                        </NavLink>

                        <button
                          onClick={() => {
                            setIsAddressModalOpen(true);
                            setIsLoginOpen(false);
                          }}
                          className="flex w-full text-left items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                            <MdLocationOn className="text-[#0463ac] group-hover:text-white transition-colors" />
                          </div>
                          <span className="font-semibold text-sm">Your Addresses</span>
                        </button>
                      </>
                    )}

                    <div className="my-3 px-4">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Explore</p>
                    </div>

                    <NavLink
                      to="/services"
                      className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                        <FaTools className="text-[#0463ac] group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-semibold text-sm">Services</span>
                    </NavLink>

                    <NavLink
                      to="/register-free-listing"
                      className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                        <FaHandshake className="text-[#0463ac] group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-semibold text-sm">Join ONDC</span>
                    </NavLink>

                    <NavLink
                      to="/help-us"
                      className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                      onClick={() => setIsLoginOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                        <FaHeadset className="text-[#0463ac] group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-semibold text-sm">Help & Support</span>
                    </NavLink>

                    {isLoggedIn ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsLoginOpen(false);
                        }}
                        className="flex w-full text-left items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group mt-4 border-t border-gray-100 pt-6"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-500 group-hover:shadow-md transition-all duration-200">
                          <FaSignOutAlt className="text-red-500 group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-semibold text-sm text-red-500">Log Out</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsLoginModalOpen(true);
                          setIsLoginOpen(false);
                        }}
                        className="flex w-full text-left items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group mt-4 border-t border-gray-100 pt-6"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                          <FaUser className="text-[#0463ac] group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-semibold text-sm">Log In / Register</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};

export default MobileNavigation;
