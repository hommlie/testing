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
  FaUser,
  FaWallet,
  FaGift,
  FaSignOutAlt,
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
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import ServicesNavDropdown from "../ServicesNavDropdown";
import { FaMobileAlt, FaSignInAlt, FaShoppingCart, FaQuestionCircle } from 'react-icons/fa';
import bannerBg from '../../assets/images/navbarbgimage2.png';
import ondc from '../../assets/images/ondc.png';
import { BsMicFill } from "react-icons/bs";


const Header = ({
  logo,
  logoAlt,
  facebook,
  instagram,
  linkedin,
  twitter,
  youtube,
}) => {
  const [showMobileBanner, setShowMobileBanner] = useState(true);
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
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

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

  const fetchSearchResults = async (term) => {
    if (!term || term.trim() === "") {
      setIsSearchOpen(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${config.API_URL}/api/search?keyword=${term}`
      );

      if (response.data.status === 1) {
        setSearchResults(response.data.data);
        setIsSearchOpen(true);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerRef]);

  const services = [
    "Pest Control",
    "Home Cleaning",
    "Sofa Shampooing",
    "Kitchen Deep Cleaning",
    "Mosquito Net Installation",
    "Sanitization Services"
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-20 bg-white shadow-sm font-sans"
    >
      {showMobileBanner && (
        <div className="block sm:hidden bg-gradient-to-r from-emerald-700 to-emerald-900 text-white text-sm px-4 py-2 flex justify-between items-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.hommlie.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            📲 Download the Hommlie App for faster booking!
          </a>
          <button 
            onClick={() => setShowMobileBanner(false)} 
            className="text-white text-xl hover:text-amber-200 transition-colors"
          >
            <RxCross1 />
          </button>
        </div>
      )}
      
      {/* Top Header with contact and social info */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-green-900 border-b border-emerald-700">
        <div className="hidden sm:block max-w-7xl mx-auto w-full">
          <div
            className="text-white text-sm w-full px-4 md:px-10 py-3 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0"
            style={{
              backgroundImage: `url(${bannerBg})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            {/* Left: Brand + Message */}
            <motion.div
              className="flex items-center font-semibold text-center md:text-left"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="ml-2 font-normal text-amber-100">
                Premium Home Services at Your Doorstep
              </span>
            </motion.div>

            {/* Right: Action Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-sm text-amber-50">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-amber-200 transition-colors"
              >
                <FaMobileAlt className="text-inherit" />
                Get App
              </a>
              <span className="hidden md:inline-block text-emerald-300">|</span>

              {user?.length === 0 ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1 hover:text-amber-200 transition-colors"
                >
                  <FaSignInAlt className="text-inherit" />
                  Login
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center gap-2 hover:text-amber-200 transition-colors"
                >
                  <FaUser className="text-white text-base" />
                  <span className="text-white font-medium">My Account</span>
                </button>
              )}
              <span className="hidden md:inline-block text-emerald-300">|</span>

              <button
                onClick={() => navigate(`${config.VITE_BASE_URL}/add-to-cart`)}
                className="flex items-center gap-1 hover:text-amber-200 transition-colors"
              >
                <FaShoppingCart className="text-inherit" />
                Cart
                {cart?.length > 0 && (
                  <span className="ml-1 bg-amber-200 text-emerald-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {cart?.length}
                  </span>
                )}
              </button>
              <span className="hidden md:inline-block text-emerald-300">|</span>

              <a
                href="#"
                className="flex items-center gap-1 hover:text-amber-200 transition-colors"
              >
                <FaQuestionCircle className="text-inherit" />
                Help
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <NavLink to="/">
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-10 w-auto object-contain"
                />
              </NavLink>
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-200 mx-3"></div>

            {/* Location and Search Section */}
            <div className="hidden sm:flex pl-2 items-center gap-6 w-full justify-between">
              {/* Location Button */}
              <div className="flex-1 max-w-md">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors w-full group"
                >
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-emerald-800 flex items-center">
                      <MdLocationOn className="text-emerald-600 mr-1 text-lg" />
                      Delivery in 40 minutes
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="truncate max-w-[200px]">
                        No 347, 6th Main Rd, Nagendra Block, Bangalore
                      </span>
                      <MdKeyboardArrowDown className="ml-1 text-gray-500 text-lg group-hover:text-emerald-600 transition-colors" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Search Bar */}
              <div className="w-[550px]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${services[placeholderIndex]}...`}
                    className="w-full pl-4 pr-20 py-3 text-base border border-gray-200 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3 text-emerald-700 text-xl">
                    <BiSearchAlt className="cursor-pointer hover:text-emerald-900 transition-colors" />
                    <BsMicFill className="cursor-pointer hover:text-emerald-900 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NavLink
              to="/register-free-listing"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-lg hover:from-emerald-800 hover:to-emerald-900 transition-all shadow-md hover:shadow-lg"
            >
               <span className="font-medium">Join ONDC</span>
               <img src={ondc} alt="ONDC Logo" className="h-9 w-9 object-contain" />
            </NavLink>
           
            <div className="relative">
              {user?.length !== 0 ? (
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center space-x-2"
                >
                  {/* <div className="relative">
                    <img
                      src={user?.profileImage || userIcon}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover border-2 border-emerald-600"
                    />
                    {isLoginOpen && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                  </div> */}
                </button>
              ) : null}

              {isLoginOpen && (
                <div
                  ref={loginDropdownRef}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-30 border border-gray-100 overflow-hidden"
                >
                  <NavLink
                    to="/add-to-cart"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b border-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    <div className="flex items-center">
                      <IoCartOutline className="mr-2 text-emerald-600" />
                      My Cart
                    </div>
                  </NavLink>
                  <NavLink
                    to="/my-bookings"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b border-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    <div className="flex items-center">
                      <MdEmail className="mr-2 text-emerald-600" />
                      My Bookings
                    </div>
                  </NavLink>
                  <NavLink
                    to="/edit-profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b border-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-emerald-600" />
                      Edit Profile
                    </div>
                  </NavLink>
                  <NavLink
                    to="/my-wallet"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b border-gray-100"
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
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b border-gray-100"
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
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors border-b border-gray-100"
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

            <button
              className="md:hidden text-2xl text-emerald-800 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <RxCross1 /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-20 max-h-96 overflow-y-auto mx-4 md:mx-8 border border-gray-200"
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults?.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className="flex items-center p-3 hover:bg-emerald-50 border-b border-gray-100 cursor-pointer transition-colors"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm("");
                      navigate(
                        `${config.VITE_BASE_URL}/product/${result.slug}`
                      );
                    }}
                  >
                    {result.productimage && result.productimage && (
                      <img
                        src={result.productimage.image_url}
                        alt={result.product_name}
                        className="w-14 h-14 object-cover rounded mr-3 border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-gray-800 font-medium">
                        {result.product_name}
                      </h4>
                      <p className="flex gap-2 text-gray-600">
                        <span className="font-semibold text-emerald-700">
                          ₹{result.discounted_price}
                        </span>
                        <span className="line-through text-gray-400">
                          ₹{result.product_price}
                        </span>
                      </p>

                      {result.rating && (
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= Math.round(result.rating)
                                    ? "text-amber-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            ({result.total_reviews})
                          </span>
                        </div>
                      )}
                    </div>
                    <IoIosArrowForward className="text-gray-400 text-lg" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-4 px-6 text-center text-gray-500">
                No products found for "{searchTerm}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t shadow-inner">
          <nav className="space-y-4">
            <div className="relative mb-4">
              <BiSearchAlt className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
              <input
                type="text"
                placeholder="What Service do you Need?"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <NavLink
              to="https://b2b.hommlie.com/"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              B2B Pest Management
            </NavLink>
            <NavLink
              to="/services"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/register-free-listing"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Service Hub
            </NavLink>
            <NavLink
              to="/community"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </NavLink>
            
            <NavLink
              to="/register-free-listing"
              className="block py-2 px-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg text-center font-medium shadow hover:from-emerald-700 hover:to-emerald-800 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join ONDC
            </NavLink>

            <div className="pt-4 border-t border-gray-200">
              {user?.length === 0 ? (
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 bg-amber-100 text-emerald-800 rounded-lg text-center font-medium hover:bg-amber-200 transition-colors"
                >
                  Login / Register
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-3 bg-red-50 text-red-600 rounded-lg text-center font-medium hover:bg-red-100 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
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