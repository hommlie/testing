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
  FaTimes,
  FaGift,
  FaSignOutAlt,
  FaMoneyBillWave,
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
import bannerBg from '../../assets/images/navbarimage4.png';
import ondc from '../../assets/images/ondc.png';
import { BsMicFill } from "react-icons/bs";
import HelpModal from "../HelpModal";
import { FaTag } from 'react-icons/fa';
import ComingSoonModal from "../../pages/ComingSoonPage";



const Header = ({
  logo,
  logoAlt,
  facebook,
  instagram,
  linkedin,
  twitter,
  youtube,
}) => {
  const [isGetAppModalOpen, setIsGetAppModalOpen] = useState(false);
  const [showMobileBanner, setShowMobileBanner] = useState(true);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const searchInputRef = useRef(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

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

  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
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

  const handleMicClick = () => {
    if (!SpeechRecognition) {
      setIsSupported(false);
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // stop after one phrase
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error occurred during speech recognition.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
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
            const locationStings = data.results[0]?.formatted_address.split(",");
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
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
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

  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Premium Home Services at Your Doorstep";
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const trendingSearches = [
    "Standard Cockroach Control",
    "Bedbugs",
    "Termite Control",
    "Car disinfection",
    "Rodent Management Service",
    "Home Disinfection",
    "6D Prime -Cockroach Control And Ant Control",
  ];

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 80); // typing speed

    return () => clearInterval(interval);
  }, []);

  const offers = [
    {
      label: "RoachX Gel Treatment – ₹399*",
      link: "/product/roachx-gel-treatment"
    },
    {
      label: "General Pest Control – ₹899*",
      link: "/subcategory/general-pest-control"
    },
    {
      label: "Standard Cockroach Control – ₹999*",
      link: "/subcategory/cockroach-control-services-in-bangalore"
    },
    {
      label: "6D Prime Cockroach – ₹1199*",
      link: "/product/cockroach-control-services-in-bangalore"
    },
    {
      label: "Bedbugs Standard – ₹2499*",
      link: "/subcategory/bed-bug-control-services-in-bangalore"
    }
  ];


  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 4000); // show each offer for 4 seconds
    return () => clearInterval(interval);
  }, []);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const fetchWalletBalance = async () => {
    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      if (!jwtToken) {
        setWalletBalance(0);
        return;
      }
      const user = jwtDecode(jwtToken);
      const res = await axios.post(
        `${config.API_URL}/api/wallet/balance`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      const bal =
        (res.data.status === 1 || res.data.status === 0) && res.data.balance !== undefined
          ? Number(res.data.balance) || 0
          : 0;
      setWalletBalance(bal);
    } catch {
      setWalletBalance(0);
    }
  };
  // Listen for wallet updates from other parts of the app
  useEffect(() => {
    const handler = () => fetchWalletBalance();
    window.addEventListener("hommlie-wallet-updated", handler);
    return () => window.removeEventListener("hommlie-wallet-updated", handler);
  }, []);

  // Fetch once when user logs in / changes
  useEffect(() => {
    if (user && user.length !== 0) fetchWalletBalance();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Also refresh whenever the wallet modal opens
  useEffect(() => {
    if (isWalletModalOpen) fetchWalletBalance();
  }, [isWalletModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps


  // Little SVG that looks like your money note
  const MoneyNoteIcon = ({ className = "w-8 h-8" }) => (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="noteGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />   {/* light green */}
          <stop offset="100%" stopColor="#16a34a" /> {/* darker green */}
        </linearGradient>
      </defs>
      {/* slight tilt like the mock */}
      <g transform="rotate(8 18 18)">
        {/* outer card */}
        <rect x="6" y="7" width="24" height="22" rx="7" fill="url(#noteGrad)" />
        {/* inner inset */}
        <rect x="9" y="10" width="18" height="16" rx="6" fill="#19b874" />
        {/* rupee mark in white (simple text works fine at this size) */}
        <text
          x="18"
          y="22"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill="#fff"
        >
          ₹
        </text>
      </g>
    </svg>
  );

  // Animated underline used under header tabs
  // Animated underline used under header tabs
  const TabUnderline = ({ active = false }) => (
    <span
      className={[
        "pointer-events-none absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#035240]",
        "origin-center transform transition-transform duration-300",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
      ].join(" ")}
    />
  );



  // Wallet pill styled like the screenshot (amount + overlapping money.png on the right)
  const WalletPill = ({ amount = 0, onClick, size = "md", className = "" }) => {
    // format & safe number
    const fmt = new Intl.NumberFormat("en-IN").format(
      Math.max(0, Math.floor(Number(amount) || 0))
    );

    // size tokens so text/img/padding stay proportionate
    const S = {
      sm: { h: "h-8", text: "text-sm", pad: "pl-3 pr-10", img: "w-5 h-5", shift: "-right-2" },
      md: { h: "h-8", text: "text-base", pad: "pl-3 pr-7", img: "w-7 h-7", shift: "-right-2.5" },
      lg: { h: "h-12", text: "text-lg", pad: "pl-4 pr-8", img: "w-8 h-8", shift: "-right-3" },
    }[size] || {};


    return (
      <button
        onClick={onClick}
        className={[
          "relative inline-flex items-center rounded-full bg-white",
          "border border-gray-200 shadow-sm hover:shadow-md transition-all",
          "whitespace-nowrap",
          S.h,
          S.pad,
          className,
        ].join(" ")}
        aria-label={`Wallet balance ${fmt}`}
        type="button"
      >
        {/* amount (no ₹) */}
        <span className={`text-[#0B1727] font-semibold tracking-tight leading-none tabular-nums ${S.text}`}>
          ₹{fmt}
        </span>

        {/* money.png badge overlapping the right edge */}
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute top-1/2 -translate-y-1/2",
            S.shift,
            "rounded-xl ring-2 ring-white shadow-md rotate-6",
          ].join(" ")}
        >
          <img
            src="/money.png"  // from public/
            alt=""
            className={`${S.img} object-contain`}
            draggable="false"
          />
        </span>
      </button>
    );
  };
  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-20 shadow-sm font-sans  sm:max-w-7xl sm:mx-auto sm:px-1"
    >
      {showMobileBanner && (
        <div className="w-full top-0 left-0 z-50 bg-[#0463ac] text-white text-sm px-4 py-2 flex justify-between items-center sm:hidden">
          <a
            href="https://play.google.com/store/apps/details?id=com.hommlie.user&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            📲 Download the Hommlie App for faster booking!
          </a>
          <button
            onClick={() => setShowMobileBanner(false)}
            className="text-white text-xl hover:text-amber-200 transition-colors"
            aria-label="Close mobile banner"
          >
            <RxCross1 />
          </button>
        </div>
      )}

      {/* Top Header with contact and social info */}
      <div className="">
        <div className="hidden lg:block max-w-7xl mx-auto w-full relative">
          <div
            className="text-black text-sm w-full px-4 md:px-10 py-3 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 relative"
          // style={{
          //   backgroundImage: `url(${bannerBg})`,
          //   backgroundSize: 'cover',
          //   backgroundRepeat: 'no-repeat',
          //   backgroundPosition: 'center',
          // }}
          >
            {/* Centered Offer Line */}

            {/* <div className="absolute left-[48%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4 text-center pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={offers[current].label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-[#035240] font-semibold text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis mr-72"
                  >
                    <NavLink to={offers[current].link} className=" pointer-events-auto">
                      🛡️ {offers[current].label}
                    </NavLink>
                  </motion.p>
                </AnimatePresence>
              </div> */}
            {/* Left: Brand + Message */}
            <span className="font-normal text-black z-20">
              <div className="inline-flex rounded text-sm font-semibold relative">
                {/* Residential */}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="relative group inline-flex items-center px-3 pt-1 pb-2 bg-[#0463ac] text-white"
                >
                  Residential
                  <TabUnderline active={location.pathname === "/" || location.pathname === "/home"} />
                </button>

                {/* Commercial (external) */}
                <a
                  href="https://b2b.hommlie.com"
                  target="_blank" rel="noopener noreferrer"
                  className="relative group inline-flex items-center px-3 pt-1 pb-2 bg-white text-black transition-colors duration-200 "
                >
                  Commercial
                  <TabUnderline />
                </a>

                <a
                  href="https://www.ecospherewm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center px-3 pt-1 pb-2 bg-white text-black transition-colors duration-200"
                >
                  Waste Management
                  <TabUnderline active={false} />
                </a>

                {/* Product */}
                <button
                  type="button"
                  onClick={() => setIsComingSoonOpen(true)}
                  className="relative group inline-flex items-center px-3 pt-1 pb-2 bg-white text-black transition-colors duration-200"
                >
                  Product
                  <TabUnderline active={false} />
                </button>

              </div>
            </span>


            {/* Right: Action Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 text-sm text-black mr-3 font-semibold z-20">
              <button
                onClick={() => setIsGetAppModalOpen(true)}
                className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
              >
                <FaMobileAlt className="text-inherit" />
                Get App
              </button>
              <span className="hidden md:inline-block text-black">|</span>

              <button
                onClick={() => setIsOfferModalOpen(true)}
                className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
              >
                <FaTag className="text-inherit" />
                Offer
              </button>
              <span className="hidden md:inline-block text-black">|</span>
              {/* <button
                onClick={() => navigate("/product")}
                className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
              >
                <FaShoppingCart className="text-inherit" />
                Product
              </button>
              <span className="hidden md:inline-block text-black">|</span> */}
              {user?.length === 0 ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
                >
                  <FaSignInAlt className="text-inherit" />
                  Login
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
                >
                  <FaUser className="text-black text-base" />
                  <span className="text-black">Account</span>
                </button>
              )}
              <span className="hidden md:inline-block text-black">|</span>

              <button
                onClick={() => navigate(`${config.VITE_BASE_URL}/add-to-cart`)}
                className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
              >
                <FaShoppingCart className="text-inherit" />
                Cart
                {cart?.length > 0 && (
                  <span className="ml-1 bg-amber-200 text-emerald-800 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {cart?.length}
                  </span>
                )}
              </button>
              <span className="hidden md:inline-block text-black">|</span>

              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
              >
                <FaQuestionCircle className="text-inherit" />
                Help
              </button>
              <span className="hidden md:inline-block text-black">|</span>
              {user?.length === 0 ? (
                // Not signed in: show normal button that opens login
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1 hover:text-[#52852d] transition-colors"
                >
                  <FaWallet className="text-inherit" />
                  Wallet
                </button>
              ) : (
                // Signed in: show pill with amount and money note icon
                <WalletPill amount={walletBalance} onClick={() => setIsWalletModalOpen(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            {/* Logo Section */}
            <div className="hidden sm:flex flex-shrink-0">
              <NavLink to="/">
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-10 w-auto object-contain"
                />
              </NavLink>
            </div>
            <div className="flex sm:hidden w-full items-center justify-between px-2">
              {/* Logo aligned left */}
              <div className="flex items-center flex-shrink-0 -ml-8">
                <NavLink to="/">
                  <img
                    src="/images/logoh.png"
                    alt="Hommlie Logo"
                    className="h-14 w-auto object-contain"
                  />
                </NavLink>
              </div>

              {/* Divider and Location grouped together */}
              <div className="flex items-center space-x-3">
                {/* Vertical Line */}
                <div className="h-8 w-px bg-gray-300" />

                {/* Location aligned right */}
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-start rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col text-left">
                    <div className="text-sm font-medium text-black flex items-center">
                      <MdLocationOn className="text-white mr-1 text-lg" />
                      Delivery in 60 min
                    </div>
                    <div className="flex items-center text-xs text-gray-700 max-w-[170px] truncate">
                      <span className="truncate">{currentLocation}</span>
                      <MdKeyboardArrowDown className="ml-1 text-gray-500 text-lg" />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="hidden sm:block h-10 w-px bg-gray-200 mx-3"></div>

            {/* Location and Search Section */}
            <div className="hidden sm:flex pl-2 items-center gap-6 w-full justify-between">
              {/* Location Button */}
              {/* <div className="flex-1 max-w-md">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors w-full group"
                >
                  <div className="flex flex-col text-left">
                    <div className="text-sm font-medium text-black flex items-center">
                      <MdLocationOn className="text-black mr-1 text-lg" />
                      Delivery in 60 min
                    </div>
                    <div className="flex items-center text-xs text-gray-700 max-w-[170px] truncate">
                      <span className="truncate">{currentLocation}</span>
                      <MdKeyboardArrowDown className="ml-1 text-gray-500 text-lg" />
                    </div>
                  </div>
                </button>
              </div> */}
              <div className="flex-1 max-w-md">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-start rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col text-left">
                    <div className="text-sm font-medium text-black flex items-center">
                      <MdLocationOn className="text-red mr-1 text-lg" />
                      Delivery in 60 min
                    </div>
                    <div className="flex items-center text-xs text-gray-700 max-w-[170px] truncate">
                      <span className="truncate">{currentLocation}</span>
                      <MdKeyboardArrowDown className="ml-1 text-gray-500 text-lg" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Search Bar */}
              <div className="w-[590px] hidden lg:block">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={`Search ${services[placeholderIndex]}...`}
                    className="w-full pl-4 pr-20 py-3 text-base border border-gray-200 bg-[#f7f7f7] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3 text-black text-xl">
                    <BiSearchAlt
                      className="cursor-pointer hover:text-emerald-900 transition-colors"
                      onClick={() => {
                        setIsSearchFocused(true);
                        searchInputRef.current?.focus();
                      }}
                    />
                    <BsMicFill
                      className={`cursor-pointer transition-colors ${isListening ? 'text-red-500 animate-pulse' : !isSupported ? 'text-gray-400 cursor-not-allowed' : 'hover:text-emerald-900'
                        }`}
                      onClick={isSupported ? handleMicClick : () => alert("Voice search is not supported in this browser.")}
                    />
                  </div>
                  {!isSupported && (
                    <p className="text-sm text-red-600 mt-2">
                      Your browser does not support voice search. Please try using Chrome on desktop or Android.
                    </p>
                  )}
                  {isSearchFocused && searchTerm.length === 0 && (
                    <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-2xl shadow-xl border border-gray-200 z-50 p-5 max-h-96 overflow-y-auto transition-all duration-200">
                      <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 7H7v6h6V7z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a5 5 0 1110 0A5 5 0 015 10z" clipRule="evenodd" />
                        </svg>
                        Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {trendingSearches.map((item, idx) => (
                          <button
                            key={idx}
                            onMouseDown={() => {
                              setSearchTerm(item); // Show in search bar
                              fetchSearchResults(item); // Optional: Show matching products
                              setIsSearchOpen(true); // Show dropdown
                              searchInputRef.current?.focus(); // Refocus input
                            }}
                            className="px-4 py-2 bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-sm"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* {isSearchFocused && searchTerm.length === 0 && (
                    <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 px-5 py-4 max-h-96 overflow-y-auto transition-all duration-300 ease-in-out">
                      
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[15px] font-semibold text-gray-800 tracking-wide flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-emerald-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 7H7v6h6V7z" />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a5 5 0 1110 0A5 5 0 015 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Trending Searches
                        </h3>
                      </div>

                      <ul className="space-y-2">
                        {trendingSearches.map((item, idx) => (
                          <li key={idx}>
                            <button
                              onMouseDown={() => setSearchTerm(item)}
                              className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-emerald-50 text-sm text-gray-700 rounded-lg border border-transparent hover:border-emerald-200 transition-all duration-200 group"
                            >
                              <span className="group-hover:text-emerald-700 transition">{item}</span>
                              <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink
              to="/register-free-listing"
              className="hidden md:flex items-center gap-2 px-5 py-3 bg-[#0463ac] hover:bg-[#52852d] text-white rounded-lg hover:from-emerald-800 hover:to-emerald-900 transition-all shadow-md hover:shadow-lg"
            >
              <span className="font-medium">PARTNER WITH US</span>
              {/* <img src={ondc} alt="ONDC Logo" className="h-7 w-7 object-contain" /> */}
            </NavLink>

            <div className="relative">
              {user?.length !== 0 ? (
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center space-x-2"
                >
                  {/* <div className="block md:hidden relative">
                    <img
                      src={user?.profileImage || userIcon}
                      alt="Profile"
                      className="h-9 w-9"
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
                  className="absolute right-0 -mt-10 w-56 bg-white rounded-lg shadow-xl py-1 z-30 border border-gray-100 overflow-hidden"
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

            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => navigate(`${config.VITE_BASE_URL}/add-to-cart`)}
                className="relative text-2xl text-[#0463ac] hover:text-emerald-600 transition-colors"
                aria-label="Go to cart"
              >
                <FaShoppingCart />
                {cart?.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-300 text-emerald-900 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart?.length}
                  </span>
                )}
              </button>
              <button
                className="text-2xl text-emerald-800 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <RxCross1 /> : <AiOutlineMenu />}
              </button>
            </div>

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
                          ₹{Number(result.discounted_price ?? 0).toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400">
                          ₹{Number(result.product_price ?? 0).toFixed(2)}
                        </span>
                      </p>

                      {result.rating && (
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3 h-3 ${star <= Math.round(result.rating)
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

      {isGetAppModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full relative shadow-lg">
            <button
              onClick={() => setIsGetAppModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-700">Download the Hommlie App</h2>
            <p className="text-gray-700 text-sm text-center mb-5">
              Book services faster, track orders, and earn rewards – all from your phone.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.hommlie.user&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/icons/playstore.svg" alt="Google Play Badge" className="h-10" />
              </a>
              <a
                href="https://apps.apple.com/in/app/hommile/id6744694127 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/icons/appstore.svg" alt="App Store Badge" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      )}
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

            {/* <NavLink
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
             */}
            <NavLink
              to="/services"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/help"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Help
            </NavLink>
            <NavLink
              to="/register-free-listing"
              className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
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



      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4 py-6 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-xl rounded-xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOfferModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
              aria-label="Close offer modal"
            >
              &times;
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-2 border-b border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 text-center">
                🎉 Limited-Time Offers Just for You!
              </h2>
              <p className="text-center text-sm text-gray-500 mt-1">
                Book now before they expire!
              </p>
            </div>

            {/* Offer List */}
            <ul className="px-6 py-4 max-h-[60vh] overflow-y-auto divide-y divide-gray-100 scrollbar-hide">
              {offers.map((offer, index) => (
                <li key={index} className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">LIMITED</span>
                      <p className="text-sm text-gray-800 font-medium">🛡️ {offer.label}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsOfferModalOpen(false);
                        navigate(offer.link); // now it redirects to specific offer link
                      }}
                      className="mt-1 sm:mt-0 text-sm font-semibold text-white bg-[#52852d] hover:bg-[#406a23] px-4 py-1.5 rounded transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
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
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />

      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        source="Product"
      />

      {isWalletModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <AnimatePresence>
            <motion.div
              key="wallet-modal"
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                {/* Minimal header accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-lime-300 to-sky-400" />

                {/* Card body */}
                <div className="relative bg-gradient-to-br from-[#0CA87B] to-[#0A6FA1] p-7 sm:p-8">
                  {/* Close */}
                  <button
                    onClick={() => setIsWalletModalOpen(false)}
                    className="absolute top-4 right-4 text-white/85 hover:text-white text-xl"
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>

                  {/* Animated Wallet Icon */}
                  <div className="relative flex items-center justify-center mb-4">
                    {/* Soft pulsing ring */}
                    <motion.span
                      className="absolute h-20 w-20 rounded-full"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(255,255,255,0.22), rgba(255,255,255,0) 70%)",
                        filter: "blur(2px)",
                      }}
                      initial={{ scale: 0.9, opacity: 0.5 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.8, ease: "easeInOut" }}
                    />
                    {/* Icon wrapper with subtle bob + glow */}
                    <motion.div
                      className="relative h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-[1.5px] shadow-inner flex items-center justify-center"
                      initial={{ y: 0, boxShadow: "0 10px 24px rgba(0,0,0,0.15)" }}
                      animate={{ y: [-2, 2, -2], boxShadow: "0 12px 28px rgba(0,0,0,0.18)" }}
                      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                    >
                      {/* Gentle inner glow */}
                      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-white/10" />
                      {/* Wallet icon with soft gradient stroke */}
                      <FaWallet
                        className="text-white drop-shadow-sm"
                        style={{
                          fontSize: "28px",
                          WebkitTextStroke: "0.5px rgba(255,255,255,0.35)",
                        }}
                      />
                      {/* Quick shimmer sweep */}
                      <motion.span
                        className="absolute -inset-1 rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                          mixBlendMode: "screen",
                        }}
                        initial={{ x: "-120%" }}
                        animate={{ x: "120%" }}
                        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-2xl sm:text-3xl font-bold text-center">
                    Your Wallet
                  </h3>

                  {/* Balance label */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-white/90 text-xs font-medium tracking-wide">
                      Available Balance
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/80 text-[11px] font-medium">
                      Secured by Razorpay
                    </span>
                  </div>

                  {/* Amount */}
                  <motion.p
                    key={walletBalance}
                    className="text-white text-5xl sm:text-6xl font-extrabold mt-3 text-center leading-none"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  >
                    ₹{walletBalance}
                  </motion.p>

                  {/* Micro copy */}
                  <p className="mt-3 text-white/90 text-center text-sm">
                    {walletBalance > 0
                      ? "Use your wallet amount instantly at checkout."
                      : "Your wallet is empty. Invite friends to earn or add money to start."}
                  </p>

                  {/* CTAs */}
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    {walletBalance > 0 ? (
                      <>
                        <button
                          onClick={() => {
                            setIsWalletModalOpen(false);
                            navigate("/quickservice");
                          }}
                          className="w-full rounded-xl bg-white text-emerald-700 py-3 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                          Book a Service
                        </button>

                        <button
                          onClick={() => {
                            setIsWalletModalOpen(false);
                            navigate("/my-wallet");
                          }}
                          className="w-full rounded-xl bg-white/15 text-white py-3 font-semibold shadow-md hover:bg-white/20 transition"
                        >
                          View Transactions
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsWalletModalOpen(false);
                            setIsReferAndEarnOpen(true);
                          }}
                          className="w-full rounded-xl bg-white text-emerald-700 py-3 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                          Refer a Friend & Earn
                        </button>

                        <button
                          onClick={() => {
                            setIsWalletModalOpen(false);
                            navigate("/my-wallet");
                          }}
                          className="w-full rounded-xl bg-white/15 text-white py-3 font-semibold shadow-md hover:bg-white/20 transition"
                        >
                          Add Money
                        </button>
                      </>
                    )}
                  </div>

                  {/* Subtle trust row */}
                  <div className="mt-5 flex items-center justify-center gap-2 text-white/80 text-xs">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                    <span>Instant apply at checkout</span>
                    <span className="mx-1">•</span>
                    <span>No extra fees</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

    </header>
  );

};

export default Header;
