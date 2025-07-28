import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiHome5Line,
  RiHome5Fill,
  RiBuilding2Line,
  RiBuilding2Fill,
  RiGlobalLine,
  RiGlobalFill,
  RiTeamLine,
  RiTeamFill,
} from "react-icons/ri";
import {
  FaUser,
  FaWallet,
  FaGift,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useCont } from "../../context/MyContext";
import { MdProductionQuantityLimits } from "react-icons/md";


const MobileNavigation = () => {
  const navItems = [
    {
    path: "/",
    label: "Home",
    iconImage: "/images/logoH.svg", 
  },
    {
      path: "https://b2b.hommlie.com/",
      label: "B2B",
      IconOutline: RiBuilding2Line,
      IconFill: RiBuilding2Fill,
    },
    // {
    //   path: "/konnect",
    //   label: "Konnect",
    //   IconOutline: RiGlobalLine,
    //   IconFill: RiGlobalFill,
    // },
    {
  path: "/product", // update later if needed
  label: "Product",
  IconOutline: MdProductionQuantityLimits,
  IconFill: MdProductionQuantityLimits, // same for now
},

    {
      path: "/community",
      label: "Community",
      IconOutline: RiTeamLine,
      IconFill: RiTeamFill,
    },
  ];

  const {
    user,
    setUser,
    handleLogout,
    setIsAddressModalOpen,
    setIsReferAndEarnOpen,
  } = useCont();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(e.target)
      ) {
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
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
    >
      <nav className="flex justify-between px-4 py-2 relative">
        {navItems.map(({ path, label, IconOutline, IconFill, iconImage }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive ? "text-gray-600" : "text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                {iconImage ? (
                  <img
                    src={iconImage}
                    alt={label}
                    className="w-6 h-6 mb-1 object-contain"
                  />
                ) : isActive ? (
                  <IconFill className="text-2xl mb-1" />
                ) : (
                  <IconOutline className="text-2xl mb-1" />
                )}
                <span className="text-xs font-medium">{label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}

        {user?.length !== 0 && (
          <div className="relative">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${
                isLoginOpen ? "text-green-600" : "text-gray-500"
              }`}
            >
              <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
                <FaUser className="text-2xl mb-1" />
                <span className="text-xs font-medium">Account</span>
              </motion.div>
            </button>

            {isLoginOpen && (
              <div
                ref={loginDropdownRef}
                className="absolute bottom-12 right-0 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100"
              >
                <NavLink
                  to="/add-to-cart"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b"
                  onClick={() => setIsLoginOpen(false)}
                >
                  <div className="flex items-center">
                    <IoCartOutline className="mr-2 text-emerald-600" />
                    My Cart
                  </div>
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b"
                  onClick={() => setIsLoginOpen(false)}
                >
                  <div className="flex items-center">
                    <MdEmail className="mr-2 text-emerald-600" />
                    My Bookings
                  </div>
                </NavLink>
                <NavLink
                  to="/edit-profile"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b"
                  onClick={() => setIsLoginOpen(false)}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-emerald-600" />
                    Edit Profile
                  </div>
                </NavLink>
                <NavLink
                  to="/my-wallet"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b"
                  onClick={() => setIsLoginOpen(false)}
                >
                  <div className="flex items-center">
                    <FaWallet className="mr-2 text-emerald-600" />
                    My Wallet
                  </div>
                </NavLink>
                <button
                  onClick={() => {
                    setIsAddressModalOpen(true);
                    setIsLoginOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b"
                >
                  <div className="flex items-center">
                    <MdLocationOn className="mr-2 text-emerald-600" />
                    Your Addresses
                  </div>
                </button>
                <button
                  onClick={() => {
                    setIsReferAndEarnOpen(true);
                    setIsLoginOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b"
                >
                  <div className="flex items-center">
                    <FaGift className="mr-2 text-emerald-600" />
                    Refer & Earn
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
