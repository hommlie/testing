import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import userIcon from "../../assets/images/user-icon.svg";
import cartIcon from "../../assets/images/cart-icon.svg";
import { jwtDecode } from "jwt-decode";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../LoginModal";
import AddressModal from "../AddressModal";
import ReferAndEarn from "../ReferAndEarnModal";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config/config";
import LocationModal from "../LocationModal";
import { IoIosArrowForward } from "react-icons/io";

const Header = ({ logo, logoAlt }) => {
  const {
    user,
    getSearchProdData,
    setUser,
    cart,
    getCart,
    setCart,
    setCartLength,
    cartLength,
    getUser,
    totalPrice,
    getAddresses,
    bookings,
    prodData,
  } = useCont();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isReferAndEarnOpen, setIsReferAndEarnOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    "Get Current Location"
  );

  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);

  const isHomePage = ["/", "/home"].includes(location.pathname);

  const handleLogout = () => {
    setUser([]);
    Cookies.remove("HommlieUserjwtToken");
    localStorage.removeItem("Hommlieuser");
    localStorage.removeItem("HommlieselectedAddrs");
    localStorage.removeItem("Hommliecart");
    getUser();
    getCart();
    setCart([]);
    setCartLength(0);
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
    notify("Successfully logged out", "success");
    navigate("/");
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setCurrentLocation("Bannerghatta, Bangalore");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.GMAP_KEY}`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            const locationStings =
              data.results[0]?.formatted_address.split(",");
            if (locationStings.length > 2) {
              setCurrentLocation(locationStings?.slice(0, 3)?.join(","));
            } else {
              setCurrentLocation(data.results[0]?.formatted_address);
            }
          } else {
            setCurrentLocation("Location could not be fetched");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          setCurrentLocation("Bannerghatta, Bangalore");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setCurrentLocation("Bannerghatta, Bangalore");
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setIsSearchOpen(false);
      setSearchResults([]);
    } else {
      setIsSearchOpen(true);
      const results = prodData?.filter((product) =>
        product.product_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-20 bg-white shadow-md font-headerFont"
    >
      {/* Top Header with contact and social info */}
      <div className="bg-gray-100 py-2 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-row items-center justify-center md:justify-between">
            {/* Contact Information */}
            <div className="flex items-center gap-4 sm:mb-0">
              <a
                href="tel:+916363865658"
                className="flex items-center text-hommlie hover:text-green-700 transition-colors text-sm"
              >
                <FaPhoneAlt className="mr-2 text-green-700" />
                <span>+91 6363865658</span>
              </a>
              <a
                href="mailto:reach@hommlie.com"
                className="flex items-center text-hommlie hover:text-green-700 transition-colors text-sm"
              >
                <MdEmail className="mr-2 text-hommlie" />
                <span>reach@hommlie.com</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hommlie hover:text-green-600 transition-all transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hommlie hover:text-green-400 transition-all transform hover:scale-110"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hommlie hover:text-green-600 transition-all transform hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-hommlie hover:text-green-700 transition-all transform hover:scale-110"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLink to="/">
              <img
                src={logo}
                alt={logoAlt}
                className="h-8 w-28 object-contain"
              />
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="text-lg hidden md:flex items-center space-x-6">
              <NavLink
                to="/services"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Services
              </NavLink>
              <NavLink
                to="https://b2b.hommlie.com/"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                B2B
              </NavLink>
              <NavLink
                to="/hub"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Hub
              </NavLink>
              <NavLink
                to="/konnect"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Konnect
              </NavLink>
              <NavLink
                to="/community"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Community
              </NavLink>
            </nav>
            <NavLink
              to="/register-free-listing"
              className="hidden md:block px-4 py-2 text-green-700 border border-green-700 rounded hover:bg-green-50 transition-colors font-medium"
            >
              Free Listing
            </NavLink>

            <div className="relative">
              {user?.length !== 0 ? (
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user?.profileImage || userIcon}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors font-medium"
                >
                  Sign Up
                </button>
              )}

              {isLoginOpen && (
                <div
                  ref={loginDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30"
                >
                  <NavLink
                    to="/my-bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  <NavLink
                    to="/edit-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    Edit Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsAddressModalOpen(true);
                      setIsLoginOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Addresses
                  </button>
                  <button
                    onClick={() => {
                      setIsReferAndEarnOpen(true);
                      setIsLoginOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Refer & Earn
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>

            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <RxCross1 /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>

        {/* Bottom Header - Only show if not on home page */}
        {!isHomePage && (
          <div className="max-w-7xl mx-auto py-2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Input - Hidden on Mobile */}
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg border hover:border-blue-500 transition-colors"
                >
                  <MdLocationOn className="text-xl text-green-600" />
                  <span className="flex-1 text-left truncate">
                    {currentLocation}
                  </span>
                  <MdKeyboardArrowDown className="text-xl" />
                </button>
              </div>

              {/* Search Input */}
              <div className="hidden sm:block relative flex-1">
                <BiSearchAlt className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="text"
                  placeholder="What Service do you Need?"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Search Results */}
            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-lg z-20 max-h-96 overflow-y-auto"
                >
                  {searchResults?.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(
                            `${config.VITE_BASE_URL}/product/${result.id}/${result.slug}`
                          );
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-gray-800 group-hover:text-hommlie">
                          {result.product_name}
                        </span>
                        <IoIosArrowForward className="text-gray-400 group-hover:text-hommlie transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t">
          <nav className="space-y-4">
            <NavLink
              to="https://b2b.hommlie.com/"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              B2B
            </NavLink>
            <NavLink
              to="/services"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/hub"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hub
            </NavLink>
            <NavLink
              to="/konnect"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Konnect
            </NavLink>
            <NavLink
              to="/community"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </NavLink>
            <NavLink
              to="/register-free-listing"
              className="block py-2 text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Free Listing
            </NavLink>
          </nav>
        </div>
      )}

      {/* Modals */}
      <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
      <ReferAndEarn
        isOpen={isReferAndEarnOpen}
        onClose={() => setIsReferAndEarnOpen(false)}
      />
      {/* Location Modal */}
      {isLocationModalOpen && (
        <LocationModal
          onClose={() => setIsLocationModalOpen(false)}
          setCurrentLocation={setCurrentLocation}
        />
      )}
    </header>
  );
};

export default Header;
