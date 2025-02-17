import React from "react";
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
import { FaHubspot } from "react-icons/fa";

const MobileNavigation = () => {
  const navItems = [
    {
      path: "/",
      label: "Home",
      IconOutline: RiHome5Line,
      IconFill: RiHome5Fill,
    },
    {
      path: "https://b2b.hommlie.com/",
      label: "B2B",
      IconOutline: RiBuilding2Line,
      IconFill: RiBuilding2Fill,
    },
    {
      path: "/hub",
      label: "HUB",
      IconOutline: FaHubspot,
      IconFill: FaHubspot,
    },
    {
      path: "/konnect",
      label: "Konnect",
      IconOutline: RiGlobalLine,
      IconFill: RiGlobalFill,
    },
    {
      path: "/community",
      label: "Community",
      IconOutline: RiTeamLine,
      IconFill: RiTeamFill,
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
    >
      <nav className="flex justify-between px-4 py-2">
        {navItems.map(({ path, label, IconOutline, IconFill }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive ? "text-green-600" : "text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                {isActive ? (
                  <IconFill className="text-2xl mb-1" />
                ) : (
                  <IconOutline className="text-2xl mb-1" />
                )}
                <span className="text-xs font-medium">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 w-1 h-1 bg-green-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default MobileNavigation;
