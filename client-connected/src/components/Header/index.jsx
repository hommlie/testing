import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin5Line, RiRobot2Line } from "react-icons/ri";
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
  FaBars,
  FaGooglePlay,
  FaAppStore,
  FaHeadset,
  FaInfoCircle,
  FaTools,
  FaHandshake,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdKeyboardArrowDown, MdMyLocation, MdMap } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import userIcon from "../../assets/images/user-icon.svg";
import cartIcon from "../../assets/images/cart-icon.svg";
import { jwtDecode } from "jwt-decode";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../LoginModal";
import WalletBonusModal from "../WalletBonusModal";

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
import hommlieLogo from '../../assets/images/hommlie-logo.png';
import ondc from '../../assets/images/ondc.png';
import { BsMicFill } from "react-icons/bs";
import HelpModal from "../HelpModal";
import { FaTag, FaFire } from 'react-icons/fa';
import { HiFire, HiBadgeCheck, HiLightningBolt } from "react-icons/hi";
import ComingSoonModal from "../../pages/ComingSoonPage";
import { Zap, ShoppingBag, Building2 } from "lucide-react";



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isGetAppOpen, setIsGetAppOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const searchInputRef = useRef(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonSource, setComingSoonSource] = useState("Product");

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
    currentLocation,
    setCurrentLocation,
    pincode,
    prodData,
    selectedAddrs,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isAddressModalOpen,
    setIsAddressModalOpen,
    isReferAndEarnOpen,
    setIsReferAndEarnOpen,
    isWalletBonusModalOpen,
    setIsWalletBonusModalOpen,
    handleLogout: contextLogout,
  } = useCont();

  const [showReferralInWallet, setShowReferralInWallet] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  // Sync activeTab with path
  useEffect(() => {
    if (location.pathname.startsWith("/product")) {
      setActiveTab("products");
    } else if (location.pathname.startsWith("/b2b")) {
      setActiveTab("commercial");
    } else {
      setActiveTab("services");
    }
  }, [location.pathname]);

  const [referralCode, setReferralCode] = useState("");
  useEffect(() => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        setReferralCode(decoded.referral_code || "");
      } catch (err) {
        console.error("Error decoding JWT:", err);
      }
    }
  }, [user]);

  const handleMobileMicClick = () => {
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMobileSearchTerm(transcript);
    };
    recognition.onerror = () => alert("Error occurred during speech recognition.");
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };
  const headerRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const getAppDropdownRef = useRef(null);
  const offerDropdownRef = useRef(null);
  const helpDropdownRef = useRef(null);
  const aiChatDropdownRef = useRef(null);
  const referAndEarnDropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const isHomePage = ["/", "/home"].includes(location.pathname);

  const handleLogout = () => {
    contextLogout();
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
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

  const scrollToBooking = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetId = "book-service";
    // If we're on the home page already, smooth scroll
    const homePaths = [
      `${config.VITE_BASE_URL}/`,
      `${config.VITE_BASE_URL}/home`,
    ];
    if (homePaths.includes(location.pathname) || location.pathname === `${config.VITE_BASE_URL}`) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // small offset if header is sticky
        window.setTimeout(() => window.scrollBy(0, -80), 300);
      }
    } else {
      // navigate to home with hash (fallback to full-load anchor)
      window.location.href = `${config.VITE_BASE_URL}/#${targetId}`;
    }
    setIsMobileMenuOpen(false);
  };

  const [isInBangalore, setIsInBangalore] = useState(true);

  const checkIsBangalore = (address) => {
    if (!address || address === "Get Current Location") return true;

    const addrLower = address.toLowerCase();
    // direct city match
    if (addrLower.includes("bangalore") || addrLower.includes("bengaluru") || addrLower.includes("blr")) return true;

    // If a 6-digit pincode exists in the string, treat it as Bangalore when it starts with '56'
    const pincodeMatch = address.match(/\b(\d{6})\b/);
    if (pincodeMatch) {
      const pin = pincodeMatch[1];
      return pin.startsWith("56");
    }

    // If address explicitly mentions another state/city, return false
    return false;
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      const defaultLoc = "Bannerghatta, Bangalore";
      setCurrentLocation(defaultLoc);
      setIsInBangalore(checkIsBangalore(defaultLoc));
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
            const fullAddress = data.results[0]?.formatted_address;
            const locationStings = fullAddress.split(",");
            let newLocation = "";
            if (locationStings.length > 2) {
              newLocation = locationStings?.slice(0, 3)?.join(",");
            } else {
              newLocation = fullAddress;
            }
            setCurrentLocation(newLocation);
            setIsInBangalore(checkIsBangalore(fullAddress));
          } else {
            setCurrentLocation("Location could not be fetched");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          setCurrentLocation("Bannerghatta, Bangalore");
          setIsInBangalore(true);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setCurrentLocation("Bannerghatta, Bangalore");
        setIsInBangalore(true);
      }
    );
  };


  useEffect(() => {
    // Consider explicit pincode prefix as a reliable indicator too (many Bangalore pincodes start with 56)
    const byPincode = pincode && String(pincode).startsWith("56");
    setIsInBangalore(checkIsBangalore(currentLocation) || !!byPincode);
  }, [currentLocation, pincode]);

  useEffect(() => {
    getCurrentLocation();
    getSearchProdData();
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
      // Close search if clicking outside header
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }

      // Close account dropdown if clicking outside
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }

      // Close cart dropdown if clicking outside
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }

      // Close other dropdowns
      if (getAppDropdownRef.current && !getAppDropdownRef.current.contains(event.target)) {
        setIsGetAppOpen(false);
      }
      if (offerDropdownRef.current && !offerDropdownRef.current.contains(event.target)) {
        setIsOfferOpen(false);
      }
      if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target)) {
        setIsHelpOpen(false);
      }
      if (aiChatDropdownRef.current && !aiChatDropdownRef.current.contains(event.target)) {
        setIsAiChatOpen(false);
      }
      if (referAndEarnDropdownRef.current && !referAndEarnDropdownRef.current.contains(event.target)) {
        setIsReferAndEarnOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear overlays and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsLoginOpen(false);
    setIsCartOpen(false);
    setIsGetAppOpen(false);
    setIsOfferOpen(false);
    setIsHelpOpen(false);
    setIsLocationOpen(false);
    setIsAiChatOpen(false);
  }, [location.pathname]);

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
  const [searchPanelStyle, setSearchPanelStyle] = useState(null);

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

  // compute and track search dropdown position when input focused
  const updateSearchPanelPos = () => {
    const el = searchInputRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Use viewport coordinates so the dropdown stays visually
    // attached to the search bar even when the header is sticky/fixed.
    setSearchPanelStyle({
      left: rect.left,
      top: rect.bottom + 8,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (isSearchFocused) updateSearchPanelPos();
    const handler = () => {
      if (isSearchFocused) updateSearchPanelPos();
    };
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [isSearchFocused]);

  const offers = useMemo(() => {
    const staticOffers = [
      {
        name: "RoachX Gel Treatment",
        link: "/product/roachx-gel-treatment",
        defaultPrice: 399,
        slug: "roachx-gel-treatment"
      },
      {
        name: "General Pest Control",
        link: "/subcategory/general-pest-control",
        defaultPrice: 899,
        slug: "general-pest-control"
      },
      {
        name: "Standard Cockroach Control",
        link: "/subcategory/cockroach-control-services-in-bangalore",
        defaultPrice: 999,
        slug: "cockroach-control-services-in-bangalore"
      },
      {
        name: "6D Prime Cockroach",
        link: "/product/cockroach-control-services-in-bangalore",
        defaultPrice: 1199,
        slug: "cockroach-control-services-in-bangalore"
      },
      {
        name: "Bedbugs Standard",
        link: "/subcategory/bed-bug-control-services-in-bangalore",
        defaultPrice: 2499,
        slug: "bed-bug-control-services-in-bangalore"
      }
    ];

    return staticOffers.map(offer => {
      const match = prodData?.find(p => p.slug === offer.slug);
      let price = offer.defaultPrice;
      if (match) {
        price = match.discounted_price || match.product_price || offer.defaultPrice;
      }
      return {
        label: `${offer.name} – ₹${price}*`,
        link: offer.link
      };
    });
  }, [prodData]);


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



  // Wallet pill styled like the screenshot (Vertical Layout: Icon top, Amount bottom)
  const WalletPill = ({ amount = 0, onClick, className = "" }) => {
    const fmt = new Intl.NumberFormat("en-IN").format(
      Math.max(0, Math.floor(Number(amount) || 0))
    );

    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 ${className}`}
        type="button"
      >
        <div className="w-11 h-11 rounded-full border border-gray-100 bg-white flex items-center justify-center shadow-sm mb-0.5">
          <FaWallet className="text-xl text-gray-700" />
        </div>
        <span className="text-[10px] font-bold text-gray-800 leading-none tracking-tight">
          ₹{fmt}
        </span>
      </button>
    );
  };
  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 font-sans bg-white border-b border-gray-100 transition-all duration-300"
    >




      {/* Top Header hidden to merge into single line */}
      {/* 
      <div className="">
        <div className="hidden lg:block max-w-7xl mx-auto w-full relative">
          ... Top Header Content ...
        </div>
      </div>
      */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Consolidated Header Row */}
        <div className="flex items-center justify-between h-auto lg:h-[80px] gap-2 lg:gap-4">

          {/* Left: Logo & Mobile Container */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Desktop Logo */}
            <div className="hidden sm:flex flex-shrink-0">
              <NavLink to="/" className="group" onClick={() => window.scrollTo(0, 0)}>
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-9 xl:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </NavLink>
            </div>

            {/* Desktop NavLinks - Left Aligned */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8">
              <NavLink
                to="/"
                className={({ isActive }) => `text-[14px] font-medium transition-all duration-300 ${isActive ? 'text-[#0463ac]' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                Residential
              </NavLink>
              <a
                href="https://b2b.hommlie.com"
                target="_blank"
                rel="noreferrer"
                className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-all duration-300"
              >
                Commercial
              </a>
              <a
                href="https://hommlie.shop"
                target="_blank"
                rel="noreferrer"
                className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-all duration-300"
              >
                Product
              </a>
            </div>

            {/* Mobile View: Redesigned Header matching Image 2 */}
            <div className="flex lg:hidden flex-col w-screen -mx-4">

              {/* ── Rows 1 & 2: collapse when scrolled ── */}
              <motion.div
                animate={{
                  height: isScrolled ? 0 : "auto",
                  opacity: isScrolled ? 0 : 1,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Row 1: Logo | Location  ←→  Cart + User */}
                <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                  {/* Left: Logo + divider + Location */}
                  <div className="flex items-center gap-3">
                    <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                      <img src="/images/logoh.png" alt="Hommlie" className="h-[52px] w-auto object-contain rounded-md" />
                    </NavLink>
                    <div className="w-px h-8 bg-gray-200" />
                    <button
                      onClick={() => setIsLocationModalOpen(true)}
                      className="flex flex-col items-start leading-tight"
                    >
                      <div className="flex items-center gap-1 text-[13px] font-bold text-gray-900">
                        <MdLocationOn className="text-[#0463ac] text-base flex-shrink-0" />
                        Location
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                        <span className="truncate max-w-[140px]">
                          {currentLocation && currentLocation !== "Get Current Location"
                            ? currentLocation
                            : "Get Current Location"}
                        </span>
                        <MdKeyboardArrowDown className="text-base flex-shrink-0" />
                      </div>
                    </button>
                  </div>

                  {/* Right: Cart + User */}
                  <div className="flex items-center gap-3">
                    <NavLink to="/add-to-cart" className="relative">
                      <IoCartOutline className="text-[28px] text-gray-800" />
                      {cart?.length > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-[#f5b800] text-gray-900 text-[10px] font-black w-[18px] h-[18px] rounded-full flex items-center justify-center ring-2 ring-white antialiased">
                          {cart.length}
                        </span>
                      )}
                    </NavLink>
                    {user?.length === 0 ? (
                      <button onClick={() => setIsLoginModalOpen(true)}>
                        <FaUser className="text-[24px] text-gray-800" />
                      </button>
                    ) : (
                      <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
                        <FaUser className="text-[24px] text-[#0463ac]" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Row 2: Dark navy info bar */}
                <div className="flex items-stretch bg-[#0f2d4e] text-white divide-x divide-white/10">
                  <a href="tel:6363865658" className="flex items-center gap-2 flex-1 justify-center py-2.5 px-2 hover:bg-white/5 transition-colors">
                    <FaPhoneAlt className="text-[11px] flex-shrink-0" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-medium text-white/70">Call us</span>
                      <span className="text-[11px] font-bold tracking-wide">6363865658</span>
                    </div>
                  </a>
                  <button
                    onClick={() => setIsComingSoonOpen(true)}
                    className="flex items-center gap-2 flex-1 justify-center py-2.5 px-2 hover:bg-white/5 transition-colors"
                  >
                    <RiRobot2Line className="text-[13px] flex-shrink-0" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-medium text-white/70">Hommlie Chat</span>
                      <span className="text-[11px] font-bold">With Us</span>
                    </div>
                  </button>
                  <button
                    onClick={scrollToBooking}
                    className="flex items-center gap-2 flex-1 justify-center py-2.5 px-2 hover:bg-white/5 transition-colors"
                  >
                    <MdEmail className="text-[13px] flex-shrink-0" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-medium text-white/70">Schedule Service</span>
                      <span className="text-[11px] font-bold">Book Online</span>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* ── Row 3: Search bar — always visible, full width ── */}
              <div className={`px-4 py-3 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${services[placeholderIndex]}...`}
                    className="w-full font-semibold pl-11 pr-12 py-3.5 text-sm bg-white rounded-2xl border border-gray-200 focus:border-[#0463ac] focus:ring-2 focus:ring-[#0463ac]/10 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                    value={mobileSearchTerm}
                    onChange={(e) => setMobileSearchTerm(e.target.value)}
                  />
                  <BiSearchAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0463ac] text-xl" />
                  <BsMicFill
                    onClick={handleMobileMicClick}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 text-xl ${isListening ? "text-[#0463ac] animate-pulse" : "text-[#0463ac] opacity-70 hover:opacity-100 transition-opacity"}`}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Center: Search & Location - Unified Bar Style */}
          <div className="hidden lg:flex items-center flex-1 justify-center max-w-2xl mx-auto px-4">
            <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors shadow-sm overflow-hidden h-[46px]">
              {/* Location Selector */}
              <div className="relative flex-shrink-0">
                <button 
                  onClick={() => setIsLocationModalOpen(true)} 
                  className="flex items-center gap-2 px-4 h-full hover:bg-gray-50 transition-all group min-w-[160px]"
                >
                  <MdLocationOn className="text-lg text-gray-400 group-hover:text-blue-500" />
                  <div className="flex items-center text-[13px] font-medium text-gray-700 truncate max-w-[150px]">
                    {currentLocation}
                    <MdKeyboardArrowDown className={`ml-1 transition-transform duration-200 ${isLocationModalOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-6 bg-gray-200 flex-shrink-0"></div>

              {/* Search Bar */}
              <div className="relative flex-1 group h-full">
                <BiSearchAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-hover:text-blue-500 transition-colors" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Search for '${services[placeholderIndex]}'`}
                  className="w-full h-full pl-10 pr-10 text-[13px] bg-transparent outline-none font-medium text-gray-700 placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <BsMicFill className={`cursor-pointer text-lg transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-300 hover:text-blue-500'}`} onClick={handleMicClick} />
                </div>
              </div>
            </div>

            {/* Trending Searches Portal Placeholder - Keeping logic available */}
            {isSearchFocused && searchTerm.length === 0 && createPortal(
              <div style={{ position: 'fixed', left: searchPanelStyle?.left ?? 0, top: searchPanelStyle?.top ?? 0, width: searchPanelStyle?.width ?? 'auto', zIndex: 9999 }} className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 mt-2 transition-all">
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">Trending Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((item, idx) => (
                    <button key={idx} onMouseDown={() => { setSearchTerm(item); fetchSearchResults(item); setIsSearchOpen(true); }} className="px-3 py-1.5 bg-gray-50 text-xs text-gray-600 rounded-full hover:bg-blue-50 transition-colors border border-gray-100">{item}</button>
                  ))}
                </div>
              </div>, document.body
            )}
          </div>

          {/* Right Icons: Account, Wallet, Cart */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 flex-shrink-0">
            <div className="relative" ref={loginDropdownRef}>
              {user?.length === 0 ? (
                <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2 text-[13px] font-semibold text-gray-800 hover:text-[#0463ac] transition-colors"><FaSignInAlt className="text-gray-400" /> LOGIN</button>
              ) : (
                <>
                  <button onClick={() => setIsLoginOpen(!isLoginOpen)} className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-800 hover:text-[#0463ac] transition-colors uppercase">
                    <FaUser className="text-gray-400" /> {user?.name || user?.[0]?.name || "Account"} <MdKeyboardArrowDown className={`transition-transform duration-200 ${isLoginOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isLoginOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-[100] overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                          <p className="text-sm font-bold text-[#0463ac] truncate">{user?.name || user?.[0]?.name || "User"}</p>
                        </div>

                        <div className="py-2">
                          <div onClick={() => { navigate("/edit-profile"); setIsLoginOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0463ac] transition-colors cursor-pointer">
                            <FaUser className="text-gray-400 w-4" /> Edit Profile
                          </div>
                          <div onClick={() => { navigate("/my-bookings"); setIsLoginOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0463ac] transition-colors cursor-pointer">
                            <MdEmail className="text-gray-400 w-4 text-base" /> My Bookings
                          </div>
                          <div onClick={() => { navigate("/my-wallet"); setIsLoginOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0463ac] transition-colors cursor-pointer">
                            <FaWallet className="text-gray-400 w-4" /> My Wallet
                          </div>
                          <button onClick={() => { setIsAddressModalOpen(true); setIsLoginOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0463ac] transition-colors">
                            <MdLocationOn className="text-gray-400 w-4 text-base" /> Your Addresses
                          </button>
                          <button
                            onClick={() => {
                              setIsReferAndEarnOpen(true);
                              setIsLoginOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0463ac] transition-colors"
                          >
                            <FaGift className="text-[#0463ac] w-4" /> Refer a Friend
                          </button>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 m-2 rounded-xl border border-blue-100/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest">Your Code</span>
                            <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-[9px] font-bold antialiased shadow-sm uppercase tracking-tighter">Copy</span>
                          </div>
                          <div className="flex items-center gap-2 group/code bg-white border border-blue-100 p-2 rounded-lg cursor-pointer hover:border-blue-300 transition-colors shadow-sm" onClick={() => {
                            navigator.clipboard.writeText(referralCode || user?.referral_code || user?.[0]?.referral_code || "");
                          }}>
                            <span className="text-sm font-black text-[#0463ac] truncate font-mono tracking-wider">{referralCode || user?.referral_code || user?.[0]?.referral_code || "CODE"}</span>
                          </div>
                          <p className="text-[9px] text-gray-400 font-bold mt-2 leading-tight">Share this code with your friends to earn rewards on every signup! 🎁</p>
                        </div>

                        <div className="border-t border-gray-50 py-2">
                          <div onClick={() => { navigate("/help-us"); setIsLoginOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#0463ac] transition-colors cursor-pointer">
                            <FaHeadset className="text-gray-400 w-4" /> Help & Support
                          </div>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors mt-1">
                            <FaSignOutAlt className="w-4" /> Log out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {user?.length !== 0 && (
              <WalletPill amount={walletBalance} onClick={() => setIsWalletModalOpen(true)} className="scale-90" />
            )}

            <div className="relative" ref={cartDropdownRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="flex items-center group"
              >
                <div className="relative w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center transition-all group-hover:border-blue-300 shadow-sm">
                  <IoCartOutline className="text-xl text-gray-700 group-hover:text-[#0463ac]" />
                  {cart?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#e11d48] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white antialiased">
                      {cart.length}
                    </span>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-blue-50/50 overflow-hidden z-[100]"
                  >
                    <div className="bg-gradient-to-r from-blue-50/50 to-white px-5 py-4 border-b border-gray-50">
                      <h3 className="text-sm font-black text-[#0463ac] uppercase tracking-wider flex items-center gap-2">
                        <FaShoppingCart className="text-xs" /> My Shopping Cart
                      </h3>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100">
                      {cart?.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                          {cart.map((item, index) => (
                            <motion.div
                              key={item.id || index}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-5 py-4 flex gap-4 hover:bg-gray-50/50 transition-colors group/item"
                            >
                              <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 group-hover/item:border-blue-200 transition-colors">
                                {item.image_url ? (
                                  <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <FaShoppingCart />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="text-[13px] font-bold text-gray-800 truncate mb-0.5">{item.product_name}</h4>
                                <p className="text-[11px] font-semibold text-gray-400 mb-2">Qty: {item.qty}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-black text-[#0463ac]">₹{item.price * item.qty}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // handleRemoveFromCart(item.id); 
                                      // Note: handleRemoveFromCart might need to be passed or accessed via context
                                    }}
                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                  >
                                    <FaTimes className="text-[10px]" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 px-5 text-center">
                          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaShoppingCart className="text-blue-300 text-2xl" />
                          </div>
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Your cart is empty</h4>
                          <p className="text-xs text-gray-400 font-medium">Add some services to get started!</p>
                        </div>
                      )}
                    </div>

                    {cart?.length > 0 && (
                      <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subtotal</span>
                          <span className="text-lg font-black text-gray-800">
                            ₹{cart.reduce((sum, item) => sum + (item.price * item.qty), 0)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              navigate("/add-to-cart");
                              setIsCartOpen(false);
                            }}
                            className="py-2.5 rounded-xl border border-blue-200 text-[#0463ac] text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-all"
                          >
                            View Cart
                          </button>
                          <button
                            onClick={() => {
                              navigate("/add-to-cart");
                              setIsCartOpen(false);
                            }}
                            className="py-2.5 rounded-xl bg-gradient-to-r from-[#0463ac] to-[#0580ca] text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="relative">

          {/* Account Dropdown for Mobile */}
          <div className="md:hidden">
            {/* Mobile Drawer Portal */}
            {createPortal(
              <AnimatePresence>
                {isLoginOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsLoginOpen(false)}
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                      ref={loginDropdownRef}
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="fixed top-0 left-0 h-full w-[75%] max-w-sm bg-white z-[9999] shadow-2xl overflow-hidden flex flex-col md:hidden"
                    >
                      {/* Close Button */}
                      <div className="absolute top-4 right-4 z-20">
                        <button
                          onClick={() => setIsLoginOpen(false)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      {/* Premium Header */}
                      <div className="relative bg-gradient-to-br from-[#0463ac] to-[#0580ca] px-6 py-8 flex-shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-5 blur-xl"></div>

                        <div className="relative flex flex-col gap-4">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ring-4 ring-white/10 shadow-lg">
                            <FaUser className="text-white text-2xl" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-xl tracking-tight">Hello, {user?.name || user?.[0]?.name || "User"}!</h3>
                            <p className="text-blue-100 text-sm font-medium opacity-90">Welcome back to Hommlie</p>
                          </div>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 py-2">
                        <div className="grid grid-cols-1 gap-1 p-2">
                          <NavLink
                            to="/edit-profile"
                            className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                              <FaUser className="text-[#0463ac] group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-semibold text-sm">Edit Profile</span>
                          </NavLink>

                          <NavLink
                            to="/my-bookings"
                            className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                              <MdEmail className="text-[#0463ac] group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-semibold text-sm">My Bookings</span>
                          </NavLink>

                          <NavLink
                            to="/my-wallet"
                            className="flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
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
                          >
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                              <FaHeadset className="text-[#0463ac] group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-semibold text-sm">Help & Support</span>
                          </NavLink>

                          <button
                            onClick={() => {
                              setIsReferAndEarnOpen(true);
                              setIsLoginOpen(false);
                            }}
                            className="flex w-full text-left items-center gap-4 px-4 py-3.5 text-gray-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0463ac] group-hover:shadow-md transition-all duration-200">
                              <FaGift className="text-[#0463ac] group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-semibold text-sm">Refer & Earn</span>
                          </button>
                        </div>

                        <div className="p-4 mt-2">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-3 px-4 py-3.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/30 transition-all duration-200"
                          >
                            <FaSignOutAlt className="text-lg" />
                            <span className="font-bold">Log out</span>
                          </button>
                          <p className="text-center text-[10px] text-gray-400 mt-4">v1.2.0 • Made with ❤️ in India</p>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )}
          </div>
        </div>
      </div>

      {/* Mobile Contact Info Bar */}
      <div className="w-full py-1 hidden sm:hidden shadow-sm border-b border-white/10 bg-gradient-to-r from-[#041228] to-[#074b82]">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-0 px-1">
          <a href="tel:6363865658" className="flex items-center justify-center gap-2 py-1 px-1 border-r border-white/10 w-full">
            <FaPhoneAlt className="text-white text-sm flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/80 leading-tight">Call us</span>
              <span className="text-[11px] font-bold text-white leading-none">6363865658</span>
            </div>
          </a>
          <button onClick={() => { setComingSoonSource("Hommlie Chat"); setIsComingSoonOpen(true); }} className="flex items-center justify-center gap-2 py-1 px-1 border-r border-white/10 w-full">
            <RiRobot2Line className="text-white text-sm flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/80 leading-tight">Hommlie Chat</span>
              <span className="text-[11px] font-bold text-white leading-none">With Us</span>
            </div>
          </button>
          <button onClick={() => navigate(`${config.VITE_BASE_URL}/quickservice`)} className="flex items-center justify-center gap-2 py-1 px-1 w-full">
            <MdEmail className="text-white text-sm flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/80 leading-tight">Schedule Service</span>
              <span className="text-[11px] font-bold text-white leading-none">Book Online</span>
            </div>
          </button>
        </div>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-xl z-20 max-h-96 overflow-y-auto mx-4 md:mx-8 border border-gray-200">
            {isLoading ? (
              <div className="flex justify-center items-center py-6"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-600"></div></div>
            ) : searchResults.length > 0 ? (
              searchResults?.map((result, index) => (
                <motion.div key={result.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <div className="flex items-center p-3 hover:bg-emerald-50 border-b border-gray-100 cursor-pointer transition-colors" onClick={() => { setIsSearchOpen(false); setSearchTerm(""); navigate(`${config.VITE_BASE_URL}/product/${result.slug}`); }}>
                    {result.productimage && <img src={result.productimage.image_url} alt={result.product_name} className="w-14 h-14 object-cover rounded mr-3 border border-gray-200" />}
                    <div className="flex-1">
                      <h4 className="text-gray-800 font-medium">{result.product_name}</h4>
                      <p className="flex gap-2 text-gray-600">
                        <span className="font-semibold text-emerald-700">₹{Number(result.discounted_price ?? 0).toFixed(2)}</span>
                        <span className="line-through text-gray-400">₹{Number(result.product_price ?? 0).toFixed(2)}</span>
                      </p>
                    </div>
                    <IoIosArrowForward className="text-gray-400 text-lg" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-4 px-6 text-center text-gray-500">No products found for "{searchTerm}"</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {
        isGetAppModalOpen && (
          typeof document !== 'undefined' && createPortal(
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full relative shadow-lg animate-fadeIn scale-100">
                <button
                  onClick={() => setIsGetAppModalOpen(false)}
                  className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-center text-emerald-700">Download the Hommlie App</h2>
                <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
                  Book services faster, track orders, and earn rewards – all from your phone.
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hommlie.user&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <img src="/assets/icons/playstore.svg" alt="Google Play Badge" className="h-10" />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/hommile/id6744694127 "
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90 transition-opacity"
                  >
                    <img src="/assets/icons/appstore.svg" alt="App Store Badge" className="h-10" />
                  </a>
                </div>
              </div>
            </div>,
            document.body
          )
        )
      }
      {/* Mobile Menu */}
      {
        isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 border-t shadow-inner">
            <nav className="space-y-4">
              {/* Mobile 'Coming Soon' banner removed */}
              <div className="relative mb-4 max-w-[264px] mx-auto w-full">
                <BiSearchAlt className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
                <input
                  type="text"
                  placeholder="What Service do you Need?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
              >
                Services
              </NavLink>
              <NavLink
                to="/help"
                className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                Help
              </NavLink>
              <NavLink
                to="/register-free-listing"
                className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                Join ONDC
              </NavLink>

              <div className="pt-4 border-t border-gray-200">
                {user?.length === 0 ? (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
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
        )
      }



      {
        isOfferModalOpen && (
          typeof document !== 'undefined' && createPortal(
            <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4 py-6 sm:px-6">
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
            </div>,
            document.body
          )
        )
      }


      {/* Modals */}
      <LoginSignup isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <WalletBonusModal isOpen={isWalletBonusModalOpen} onClose={() => setIsWalletBonusModalOpen(false)} />


      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />

      {/* Mobile only global rendering for Refer & Earn */}
      <div className="md:hidden">
        <ReferAndEarn
          isOpen={isReferAndEarnOpen}
          onClose={() => setIsReferAndEarnOpen(false)}
        />
      </div>



      {
        isLocationModalOpen && (
          typeof document !== 'undefined' && createPortal(
            <LocationModal
              onClose={() => setIsLocationModalOpen(false)}
              setCurrentLocation={setCurrentLocation}
            />,
            document.body
          )
        )
      }
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />

      {
        createPortal(
          <ComingSoonModal
            isOpen={isComingSoonOpen}
            onClose={() => setIsComingSoonOpen(false)}
            source={comingSoonSource}
          />,
          document.body
        )
      }

      {
        isWalletModalOpen && (
          typeof document !== 'undefined' && createPortal(
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
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
                        onClick={() => {
                          setIsWalletModalOpen(false);
                          setShowReferralInWallet(false);
                        }}
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
                        {walletBalance > 0 && (
                          <button
                            onClick={() => {
                              setIsWalletModalOpen(false);
                              navigate("/quickservice");
                            }}
                            className="w-full rounded-xl bg-white text-emerald-700 py-3.5 font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 uppercase tracking-tight"
                          >
                            Book a Service
                          </button>
                        )}

                        {showReferralInWallet ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full space-y-4"
                          >
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
                              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2 text-center">Share this code to earn</p>
                              <div className="flex items-center gap-2">
                                <div
                                  className="flex-1 bg-white/10 border border-white/20 p-3 rounded-xl cursor-pointer hover:bg-white/20 transition-all flex items-center justify-between"
                                  onClick={() => {
                                    navigator.clipboard.writeText(referralCode || "CODE");
                                  }}
                                >
                                  <span className="text-xl font-black text-white font-mono tracking-widest">{referralCode || "CODE"}</span>
                                  <span className="text-[10px] font-bold bg-white text-[#0CA87B] px-2 py-1 rounded-lg uppercase shadow-sm">Copy</span>
                                </div>
                                <button
                                  onClick={() => {
                                    const message = encodeURIComponent(`Hey! 👋 Use my referral code ${referralCode || "CODE"} to sign up on Hommlie and get rewards! 🎉`);
                                    window.open(`https://wa.me/?text=${message}`, "_blank");
                                  }}
                                  className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shadow-lg text-[#25D366] hover:scale-105 active:scale-95 transition-transform"
                                >
                                  <FaWhatsapp className="text-2xl" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => setShowReferralInWallet(false)}
                              className="w-full py-2 text-white/70 text-sm font-bold hover:text-white transition-colors"
                            >
                              ← Back to Balance
                            </button>
                          </motion.div>
                        ) : (
                          <>
                            <button
                              onClick={() => setShowReferralInWallet(true)}
                              className="w-full rounded-xl bg-white text-[#0A6FA1] py-3.5 font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 uppercase tracking-tight"
                            >
                              Refer a Friend & Earn
                            </button>

                            <button
                              onClick={() => {
                                setIsWalletModalOpen(false);
                                navigate("/my-wallet");
                              }}
                              className="w-full rounded-xl bg-white/20 text-white py-3.5 font-bold shadow-md hover:bg-white/30 transition-all uppercase tracking-tight"
                            >
                              {walletBalance > 0 ? "View Transactions" : "Add Money"}
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
            </div>,
            document.body
          )
        )
      }

    </header >
  );
};

export default Header;
