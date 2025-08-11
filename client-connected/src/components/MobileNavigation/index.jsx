import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiBuilding2Line,
  RiBuilding2Fill,
  RiTeamLine,
  RiTeamFill,
} from "react-icons/ri";
import { FaUser, FaWallet, FaGift, FaSignOutAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdEmail, MdLocationOn, MdProductionQuantityLimits } from "react-icons/md";
import { useCont } from "../../context/MyContext";

const MobileNavigation = () => {
  const navItems = [
    { path: "/", label: "Home", iconImage: "/images/logoh.png" },
    { path: "https://b2b.hommlie.com/", label: "B2B", IconOutline: RiBuilding2Line, IconFill: RiBuilding2Fill },
    { path: "/product", label: "Product", IconOutline: MdProductionQuantityLimits, IconFill: MdProductionQuantityLimits },
    { path: "/community", label: "Community", IconOutline: RiTeamLine, IconFill: RiTeamFill },
  ];

  const { user, handleLogout, setIsAddressModalOpen, setIsReferAndEarnOpen } = useCont();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
      className="-mb-2 md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow z-50"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <nav className="flex justify-between items-center px-0 py-1">
        {navItems.map(({ path, label, IconOutline, IconFill, iconImage }, index) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                "flex flex-col items-center justify-center flex-1 py-2 min-h-[56px] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
                isActive ? "text-emerald-800 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <motion.div whileTap={{ scale: 0.94 }} className="flex flex-col items-center gap-1">
                {iconImage && index === 0 ? (
                  <img
                    src={iconImage}
                    alt="" // no duplicate text for screen readers
                    aria-hidden="true" // hide from assistive tech
                    className="w-9 h-9 object-contain"
                  />
                ) : isActive ? (
                  <IconFill className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <IconOutline className="w-6 h-6" aria-hidden="true" />
                )}
                <span className="text-[12px] md:text-[13px] font-medium leading-none">{label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}

        {user?.length !== 0 && (
          <div className="relative flex flex-col items-center justify-center flex-1 py-2 min-h-[56px] text-gray-700 dark:text-gray-300">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="flex flex-col items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
              aria-haspopup="menu"
              aria-expanded={isLoginOpen}
              aria-label="Account menu"
            >
              <FaUser className="w-6 h-6" aria-hidden="true" />
              <span className="text-[12px] md:text-[13px] font-medium leading-none">Account</span>
            </button>

            {isLoginOpen && (
              <div
                ref={loginDropdownRef}
                className="absolute bottom-14 right-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700"
                role="menu"
                aria-label="Account options"
              >
                <NavLink
                  to="/add-to-cart"
                  className="block px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  onClick={() => setIsLoginOpen(false)}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <IoCartOutline className="mr-2 text-emerald-700 dark:text-emerald-400" />
                    My Cart
                  </div>
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className="block px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  onClick={() => setIsLoginOpen(false)}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <MdEmail className="mr-2 text-emerald-700 dark:text-emerald-400" />
                    My Bookings
                  </div>
                </NavLink>
                <NavLink
                  to="/edit-profile"
                  className="block px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  onClick={() => setIsLoginOpen(false)}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-emerald-700 dark:text-emerald-400" />
                    Edit Profile
                  </div>
                </NavLink>
                <NavLink
                  to="/my-wallet"
                  className="block px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  onClick={() => setIsLoginOpen(false)}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <FaWallet className="mr-2 text-emerald-700 dark:text-emerald-400" />
                    My Wallet
                  </div>
                </NavLink>
                <button
                  onClick={() => {
                    setIsAddressModalOpen(true);
                    setIsLoginOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <MdLocationOn className="mr-2 text-emerald-700 dark:text-emerald-400" />
                    Your Addresses
                  </div>
                </button>
                <button
                  onClick={() => {
                    setIsReferAndEarnOpen(true);
                    setIsLoginOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <FaGift className="mr-2 text-emerald-700 dark:text-emerald-400" />
                    Refer & Earn
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" />
                    Log out
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </motion.div>
  );
};

export default MobileNavigation;
