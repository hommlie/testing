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
  const [isLoading, setIsLoading] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("services");

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
  const locationDropdownRef = useRef(null);
  const aiChatDropdownRef = useRef(null);
  const referAndEarnDropdownRef = useRef(null);
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
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
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
        className={`flex flex-col items-center justify-center bg-transparent transition-all ${className}`}
        type="button"
      >
        <img
          src="/wallet-luxe.png"
          alt="Wallet"
          className="w-11 h-11 object-contain mb-0"
          draggable="false"
        />
        <span className="text-[12px] font-extrabold text-[#212121] leading-none -mt-1">
          ₹{fmt}
        </span>
      </button>
    );
  };
  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 font-sans bg-transparent sm:bg-white lg:bg-gradient-to-b lg:from-white lg:to-gray-50/30 lg:backdrop-blur-sm lg:shadow-lg lg:border-b lg:border-gray-100/50 transition-all duration-300"
    >




      {/* Top Header with contact and social info */}
      <div className="">
        <div className="hidden lg:block max-w-7xl mx-auto w-full relative">
          <div
            className="text-gray-700 text-sm w-full px-2 lg:px-10 py-2.5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 relative"
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
            <span className="font-normal text-gray-800 z-20">
              <div className="inline-flex rounded-full bg-gray-100/50 p-1 text-xs font-semibold relative shadow-inner">
                {/* Residential */}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className={`relative group inline-flex items-center px-5 py-2 rounded-full transition-all duration-300 ${isHomePage ? 'bg-[#0463ac] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-[#0463ac]'}`}
                >
                  Residential
                </button>

                {/* Commercial (external) */}
                <a
                  href="https://b2b.hommlie.com"
                  target="_blank" rel="noopener noreferrer"
                  className="relative group inline-flex items-center px-5 py-2 rounded-full text-gray-600 hover:bg-white hover:text-[#0463ac] transition-all duration-300"
                >
                  Commercial
                </a>

                {/* Removed: Waste Management & Product links per request */}

              </div>
            </span>


            <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 text-[13px] text-gray-600 font-medium z-20">
              <div className="relative" ref={getAppDropdownRef}>
                <button
                  onClick={() => setIsGetAppOpen(!isGetAppOpen)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 group text-black ${isGetAppOpen ? 'text-[#0463ac]' : 'hover:text-[#0463ac]'}`}
                >
                  <FaMobileAlt className={`text-lg transition-colors duration-300 ${isGetAppOpen ? 'text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                  Get App
                  <MdKeyboardArrowDown className={`text-lg transition-transform duration-300 ${isGetAppOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                </button>

                <AnimatePresence>
                  {isGetAppOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -left-5 top-full mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 border border-gray-100/80 overflow-hidden"
                    >
                      <div className="absolute -top-2 left-10 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45 z-10" />
                      <div className="relative bg-gradient-to-r from-[#0463ac] to-[#0580ca] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                            <FaMobileAlt className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">Download App</p>
                            <p className="text-white/70 text-xs">For faster booking</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <a href="https://play.google.com/store/apps/details?id=com.hommlie.user&pcampaignid=web_share" target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          onClick={() => setIsGetAppOpen(false)}>
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                            <FaGooglePlay className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                          </div>
                          <span className="font-medium">Google Play</span>
                        </a>
                        <a href="https://apps.apple.com/in/app/hommile/id6744694127" target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          onClick={() => setIsGetAppOpen(false)}>
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                            <FaAppStore className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                          </div>
                          <span className="font-medium">App Store</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-4 w-px bg-gray-200 hidden md:block"></div>

              <div className="relative" ref={offerDropdownRef}>
                <motion.button
                  onClick={() => setIsOfferOpen(!isOfferOpen)}
                  animate={!isOfferOpen ? {
                    backgroundColor: ["rgba(255, 255, 255, 0)", "rgba(239, 68, 68, 0.05)", "rgba(255, 255, 255, 0)"],
                    scale: [1, 1.02, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`flex items-center gap-2 transition-all duration-300 px-3 py-1.5 rounded-full relative text-black ${isOfferOpen ? 'text-[#0463ac] bg-blue-50/50' : 'hover:text-[#0463ac] hover:bg-gray-50'}`}
                >
                  <div className="relative">
                    <FaTag className={`text-lg transition-colors duration-300 ${isOfferOpen ? 'text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                    {!isOfferOpen && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5">
                    Offer
                    {!isOfferOpen && (
                      <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-extrabold uppercase animate-bounce tracking-tighter">Hot</span>
                    )}
                  </span>
                  <MdKeyboardArrowDown className={`text-lg transition-transform duration-300 ${isOfferOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                </motion.button>

                <AnimatePresence>
                  {isOfferOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -left-10 top-full mt-3 w-80 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 border border-gray-100/80 overflow-hidden"
                    >
                      <div className="absolute -top-2 left-14 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45 z-10" />
                      <div className="relative bg-gradient-to-r from-[#0463ac] to-[#0580ca] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                            <FaGift className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">Special Offers</p>
                            <p className="text-white/70 text-xs">Grab them before they expire</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                        {offers.map((offer, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2"
                          >
                            <button
                              onClick={() => {
                                setIsOfferOpen(false);
                                navigate(offer.link);
                              }}
                              className="w-full text-left flex flex-col gap-2 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-white border border-transparent hover:border-blue-100 transition-all duration-300 group/item relative overflow-hidden"
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300 shadow-sm font-bold text-orange-600">
                                    {index === 0 || index === 3 ? <HiFire className="text-xl" /> : <FaTag className="text-lg" />}
                                  </div>
                                  <div>
                                    <span className="font-bold text-gray-800 block text-[13px] leading-tight group-hover/item:text-[#0463ac] transition-colors">{offer.label.split('–')[0]}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[10px] items-center gap-1 flex px-2 py-0.5 rounded-full bg-blue-50 text-[#0463ac] font-bold uppercase tracking-tighter border border-blue-100/50 whitespace-nowrap">
                                        <HiBadgeCheck className="text-xs" /> Verified Deal
                                      </span>
                                      {(index === 0 || index === 2) && (
                                        <span className="text-[10px] items-center gap-1 flex px-2 py-0.5 rounded-full bg-red-50 text-red-500 font-bold uppercase tracking-tighter border border-red-100/50 animate-pulse">
                                          <HiFire className="text-xs" /> Hot
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-extrabold text-[#0463ac] block">
                                    {offer.label.split('–')[1] || 'T&C Apply'}
                                  </span>
                                  <span className="text-[9px] text-gray-400 line-through">₹{(parseInt(offer.label.split('–')[1]?.replace(/[^\d]/g, '') || '0') * 1.5).toFixed(0)}*</span>
                                </div>
                              </div>

                              <div className="mt-2 w-full flex items-center justify-between">
                                <div className="flex-1 mr-4">
                                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: index % 2 === 0 ? "85%" : "60%" }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                      className={`h-full rounded-full ${index % 2 === 0 ? 'bg-orange-500' : 'bg-blue-500'}`}
                                    />
                                  </div>
                                  <span className="text-[8px] text-gray-500 mt-1 block uppercase tracking-wide font-medium">Limited Time Offer • {index % 2 === 0 ? '85%' : '60%'} Claimed</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#0463ac] font-bold text-[11px] group-hover/item:translate-x-1 transition-transform">
                                  Book <IoIosArrowForward />
                                </div>
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-4 w-px bg-gray-200 hidden md:block"></div>

              {user?.length === 0 ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 hover:text-[#0463ac] transition-all duration-300 hover:scale-105 group text-black"
                >
                  <FaSignInAlt className="text-gray-400 group-hover:text-[#0463ac] text-lg" />
                  <span className="text-black">Login</span>
                </button>
              ) : (
                <div className="relative" ref={loginDropdownRef}>
                  <button
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 group text-black ${isLoginOpen ? 'text-[#0463ac]' : 'hover:text-[#0463ac]'}`}
                  >
                    <FaUser className={`text-lg transition-colors duration-300 ${isLoginOpen ? 'text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                    <span className="whitespace-nowrap text-black">Account</span>
                    <MdKeyboardArrowDown className={`text-lg transition-transform duration-300 ${isLoginOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                  </button>

                  {/* Premium Account Dropdown */}
                  <AnimatePresence>
                    {isLoginOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 border border-gray-100/80 overflow-hidden"
                      >
                        {/* Top arrow */}
                        <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45 z-10" />

                        {/* User greeting header */}
                        <div className="relative bg-gradient-to-r from-[#0463ac] to-[#0580ca] px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                              <FaUser className="text-white text-sm" />
                            </div>
                            <div>
                              <p className="text-white font-semibold text-sm">Welcome back!</p>
                              <p className="text-white/70 text-xs">Manage your account</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-2">

                          <button
                            onClick={() => {
                              setIsAddressModalOpen(true);
                              setIsLoginOpen(false);
                            }}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 w-full group/item text-left"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <MdLocationOn className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">My Address</span>
                          </button>

                          <NavLink
                            to="/my-bookings"
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                            onClick={() => setIsLoginOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <MdEmail className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">My Bookings</span>
                          </NavLink>

                          <NavLink
                            to="/edit-profile"
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                            onClick={() => setIsLoginOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <FaUser className="text-[#0463ac] text-xs group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">Edit Profile</span>
                          </NavLink>

                          <NavLink
                            to="/my-wallet"
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                            onClick={() => setIsLoginOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <FaWallet className="text-[#0463ac] text-xs group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">My Wallet</span>
                          </NavLink>


                          <NavLink
                            to="/services"
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                            onClick={() => setIsLoginOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <FaTools className="text-[#0463ac] text-xs group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">Services</span>
                          </NavLink>



                          <button
                            onClick={() => {
                              setIsReferAndEarnOpen(true);
                              setIsLoginOpen(false);
                            }}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 w-full group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <FaGift className="text-[#0463ac] text-xs group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">Refer & Earn</span>
                          </button>
                        </div>

                        {/* Logout section */}
                        <div className="border-t border-gray-100 py-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50/60 transition-all duration-200 w-full group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover/item:bg-red-500 transition-colors duration-200">
                              <FaSignOutAlt className="text-red-500 text-xs group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <span className="font-medium">Log out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={referAndEarnDropdownRef} className="hidden md:block">
                    <ReferAndEarn
                      isOpen={isReferAndEarnOpen}
                      onClose={() => setIsReferAndEarnOpen(false)}
                    />
                  </div>
                </div>
              )}
              <div className="h-4 w-px bg-gray-200 hidden md:block"></div>

              <div className="relative" ref={cartDropdownRef}>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 group text-black ${isCartOpen ? 'text-[#0463ac]' : 'hover:text-[#0463ac]'}`}
                >
                  <div className="relative">
                    <FaShoppingCart className={`text-lg transition-colors duration-300 ${isCartOpen ? 'text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                    {cart?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#0463ac] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                        {cart?.length}
                      </span>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-black">Cart</span>
                  <MdKeyboardArrowDown className={`text-lg transition-transform duration-300 ${isCartOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                </button>

                {/* Premium Cart Dropdown */}
                <AnimatePresence>
                  {isCartOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 border border-gray-100/80 overflow-hidden"
                    >
                      {/* Top arrow */}
                      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45 z-10" />

                      {/* Cart header */}
                      <div className="relative bg-gradient-to-r from-[#0463ac] to-[#0580ca] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                            <FaShoppingCart className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">
                              {cart?.length > 0 ? `${cart.length} Service${cart.length > 1 ? 's' : ''} Added` : 'Your Cart'}
                            </p>
                            <p className="text-white/70 text-xs">
                              {cart?.length > 0 ? `Total: ₹${totalPrice?.toFixed(2)}` : 'No items yet'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cart items */}
                      {cart?.length > 0 ? (
                        <>
                          <div className="max-h-[280px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200">
                            {cart.map((item, index) => (
                              <div
                                key={item.id}
                                className={`flex items-center gap-3 px-5 py-3 hover:bg-blue-50/40 transition-all duration-200 ${index !== cart.length - 1 ? 'border-b border-gray-50' : ''}`}
                              >
                                {/* Service icon */}
                                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                  <IoCartOutline className="text-[#0463ac] text-lg" />
                                </div>

                                {/* Service details */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">{item.product_name}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-500">Qty: {item.qty}</span>
                                    <span className="text-xs text-gray-300">•</span>
                                    <span className="text-xs font-semibold text-[#0463ac]">₹{(item.price * item.qty).toFixed(2)}</span>
                                  </div>
                                </div>

                                {/* Remove button */}
                                <button
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const jwtToken = Cookies.get("HommlieUserjwtToken");
                                    if (!jwtToken) return;
                                    const user_id = jwtDecode(jwtToken);
                                    try {
                                      const response = await axios.post(
                                        `${config.API_URL}/api/deleteproduct`,
                                        { user_id: user_id.id, cart_id: item.id },
                                        { headers: { Authorization: `Bearer ${jwtToken}` } }
                                      );
                                      if (response.data.status === 1) {
                                        await getCart();
                                      }
                                    } catch (error) {
                                      console.log("error removing from cart:", error);
                                    }
                                  }}
                                  className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-500 transition-colors duration-200 group/del flex-shrink-0"
                                  title="Remove item"
                                >
                                  <RiDeleteBin5Line className="text-red-500 text-xs group-hover/del:text-white transition-colors duration-200" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Total & Go to Cart */}
                          <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm text-gray-600 font-medium">Subtotal</span>
                              <span className="text-base font-bold text-gray-900">₹{totalPrice?.toFixed(2)}</span>
                            </div>
                            <button
                              onClick={() => {
                                setIsCartOpen(false);
                                navigate(`${config.VITE_BASE_URL}/add-to-cart`);
                              }}
                              className="w-full py-2.5 bg-gradient-to-r from-[#0463ac] to-[#0580ca] hover:from-[#0580ca] hover:to-[#0463ac] text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                            >
                              Go to Cart →
                            </button>
                          </div>
                        </>
                      ) : (
                        /* Empty cart state */
                        <div className="px-5 py-8 text-center">
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                            <FaShoppingCart className="text-[#0463ac] text-xl" />
                          </div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Your cart is empty</p>
                          <p className="text-xs text-gray-400 mb-4">Browse services and add them to your cart</p>
                          <button
                            onClick={() => {
                              setIsCartOpen(false);
                              navigate(`${config.VITE_BASE_URL}/`);
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-[#0463ac] to-[#0580ca] text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Browse Services
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-4 w-px bg-gray-200 hidden md:block"></div>

              <div className="relative" ref={helpDropdownRef}>
                <button
                  onClick={() => setIsHelpOpen(!isHelpOpen)}
                  className={`flex items-center gap-2 transition-all duration-300 hover:scale-105 group text-black ${isHelpOpen ? 'text-[#0463ac]' : 'hover:text-[#0463ac]'}`}
                >
                  <FaQuestionCircle className={`text-lg transition-colors duration-300 ${isHelpOpen ? 'text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                  <span className="whitespace-nowrap text-black">Help</span>
                  <MdKeyboardArrowDown className={`text-lg transition-transform duration-300 ${isHelpOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400 group-hover:text-[#0463ac]'}`} />
                </button>

                <AnimatePresence>
                  {isHelpOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 border border-gray-100/80 overflow-hidden"
                    >
                      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45 z-10" />
                      <div className="relative bg-gradient-to-r from-[#0463ac] to-[#0580ca] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                            <FaHeadset className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm">Help & Support</p>
                            <p className="text-white/70 text-xs">We are here to help</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <a href="https://wa.me/917483860408" target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          onClick={() => setIsHelpOpen(false)}>
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200 flex-shrink-0">
                            <FaWhatsapp className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800">WhatsApp Us</span>
                            <span className="text-[11px] text-[#0463ac] font-bold">+91 74838 60408</span>
                          </div>
                        </a>
                        <a href="tel:6363865658"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          onClick={() => setIsHelpOpen(false)}>
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200 flex-shrink-0">
                            <FaPhoneAlt className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800">Call Us</span>
                            <span className="text-[11px] text-[#0463ac] font-bold">63638 65658</span>
                          </div>
                        </a>
                        <NavLink to="/contact-us"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          onClick={() => setIsHelpOpen(false)}>
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                            <MdEmail className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                          </div>
                          <span className="font-medium">Contact Form</span>
                        </NavLink>
                        <button
                          onClick={() => {
                            setIsHelpOpen(false);
                            setIsHelpModalOpen(true);
                          }}
                          className="w-full text-left flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item border-t border-gray-50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                            <FaInfoCircle className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                          </div>
                          <span className="font-medium">More Help Options</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-4 w-px bg-gray-200 hidden md:block"></div>

              {user?.length === 0 ? (
                // Not signed in: show normal button that opens login
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 hover:text-[#0463ac] transition-all duration-300 hover:scale-105 group"
                >
                  <FaWallet className="text-gray-400 group-hover:text-[#0463ac] text-lg" />
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
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        {/* Main Header */}
        <div className="flex items-center justify-between h-auto sm:h-[74px]">
          <div className="flex items-center gap-3">
            {/* Logo Section */}
            <div className="hidden sm:flex flex-shrink-0">
              <NavLink to="/" className="group">
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </NavLink>
            </div>
            {/* Mobile View: Blinkit Style Unified Header */}
            <div className={`flex sm:hidden flex-col w-screen -mx-4 px-4 pt-4 pb-1 bg-gradient-to-b from-[#81D4FA] via-[#B3E5FC] to-white transition-all duration-300 ${isHomePage ? 'h-auto' : 'pb-4'}`}>
              {/* Top Row: Time, Location, Stats, Profile */}
              <div className="flex justify-between items-start w-full mb-4">
                <div className="flex flex-col">
                  {/* Delivery Info */}
                  <h1 className="text-lg font-extrabold text-[#212121] leading-none mb-0.5">Hommlie in</h1>
                  <h2 className="text-3xl font-extrabold text-[#212121] leading-none mb-2.5">15 minutes</h2>

                  {/* Location Dropdown */}
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex items-center text-xs font-bold text-[#212121] leading-none"
                  >
                    <span className="uppercase opacity-70">HOME</span>
                    <span className="mx-1">-</span>
                    <span className="max-w-[160px] truncate">{currentLocation}</span>
                    <MdKeyboardArrowDown className="ml-0.5 text-lg" />
                  </button>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-4 pt-1">
                  <WalletPill
                    amount={walletBalance}
                    onClick={() => setIsWalletModalOpen(true)}
                    className="!bg-white shadow-sm"
                  />
                  <NavLink to="/edit-profile">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                      <FaUser className="text-[#212121] text-base" />
                    </div>
                  </NavLink>
                </div>
              </div>

              {isHomePage && (
                <>
                  {/* Search Bar Row */}
                  <div className="w-full mb-2">
                    <div className="relative w-full group">
                      <input
                        type="text"
                        placeholder={`Search ${services[placeholderIndex]}...`}
                        className="w-full pl-12 pr-12 py-3.5 text-base bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0463ac]/10 focus:border-[#0463ac]/20 transition-all duration-300 font-medium placeholder:text-gray-400"
                        value={mobileSearchTerm}
                        onChange={(e) => setMobileSearchTerm(e.target.value)}
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">
                        <BiSearchAlt />
                      </div>
                      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-px h-6 bg-gray-200" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                        <BsMicFill onClick={handleMobileMicClick} className={isListening ? "text-[#0463ac] animate-pulse" : ""} />
                      </div>
                    </div>
                  </div>

                  {/* Category Tabs Row */}
                  <div className="w-full flex items-center justify-around pb-2 px-1 relative">
                    {[
                      { id: "services", label: "Services", Icon: Zap, active: activeTab === "services" },
                      { id: "products", label: "Products", Icon: ShoppingBag, active: activeTab === "products" },
                      { id: "commercial", label: "Commercial use", Icon: Building2, active: activeTab === "commercial" }
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        className={`relative flex items-center gap-1.5 py-2.5 transition-all ${tab.active
                          ? "text-[#0463ac]"
                          : "text-gray-500 hover:text-[#0463ac]"
                          }`}
                        onClick={() => {
                          setActiveTab(tab.id);
                          if (tab.id === "products") navigate("/product");
                          if (tab.id === "commercial") window.open("https://b2b.hommlie.com/", "_blank");
                        }}
                      >
                        <tab.Icon className={`w-[18px] h-[18px] ${tab.active ? "text-[#0463ac]" : "text-gray-400"}`} />
                        <span className="text-[13px] font-bold whitespace-nowrap">
                          {tab.label}
                        </span>

                        {tab.active && (
                          <motion.div
                            layoutId="mobileActiveTabLine"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0463ac] rounded-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="hidden sm:block h-8 w-px bg-gray-200 mx-1"></div>

            {/* Location and Search Section */}
            <div className="hidden sm:flex items-center w-full gap-3">
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
                      <span className="truncate text-black">{currentLocation}</span>
                      <MdKeyboardArrowDown className="ml-1 text-gray-500 text-lg" />
                    </div>
                  </div>
                </button>
              </div> */}
              <div className="flex-shrink-0" ref={locationDropdownRef}>
                <div className="relative">
                  <button
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className={`flex items-center gap-3 rounded-full hover:bg-gray-50 px-2 py-1.5 pr-4 transition-all duration-300 group border ${isLocationOpen ? 'border-blue-200 bg-blue-50/50' : 'border-transparent hover:border-gray-100'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors shadow-sm ${isLocationOpen ? 'bg-[#0463ac] text-white' : 'bg-blue-50 text-[#0463ac] group-hover:bg-[#0463ac] group-hover:text-white'}`}>
                      <MdLocationOn />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5 ml-0.5">Location</span>
                      <div className="flex items-center text-sm font-bold text-gray-800">
                        <span className="max-w-[140px] truncate leading-none text-black">{currentLocation}</span>
                        <MdKeyboardArrowDown className={`transition-transform duration-300 ${isLocationOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isLocationOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 border border-gray-100/80 overflow-hidden"
                      >
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45 z-10" />
                        <div className="relative bg-gradient-to-r from-[#0463ac] to-[#0580ca] px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                              <MdLocationOn className="text-white text-sm" />
                            </div>
                            <div>
                              <p className="text-white font-semibold text-sm">Location Settings</p>
                              <p className="text-white/70 text-xs text-ellipsis overflow-hidden whitespace-nowrap max-w-[180px]">{currentLocation}</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setIsLocationOpen(false);
                              getCurrentLocation();
                            }}
                            className="w-full text-left flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <MdMyLocation className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <div>
                              <span className="font-medium block">Use Current Location</span>
                              <span className="text-xs text-gray-500">Using GPS</span>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setIsLocationOpen(false);
                              setIsLocationModalOpen(true);
                            }}
                            className="w-full text-left flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                              <MdMap className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                            </div>
                            <div>
                              <span className="font-medium block">Change Location</span>
                              <span className="text-xs text-gray-500">Select on Map</span>
                            </div>
                          </button>

                          {user?.length !== 0 && (
                            <button
                              onClick={() => {
                                setIsLocationOpen(false);
                                setIsAddressModalOpen(true);
                              }}
                              className="w-full text-left flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50/60 transition-all duration-200 group/item border-t border-gray-50"
                            >
                              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover/item:bg-[#0463ac] transition-colors duration-200">
                                <MdLocationOn className="text-[#0463ac] group-hover/item:text-white transition-colors duration-200" />
                              </div>
                              <span className="font-medium">Manage Addresses</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="hidden lg:block h-8 w-px bg-gray-200 mx-1"></div>

              {/* Search Bar */}
              <div className="w-[480px] hidden lg:block">
                <div className="relative group">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={`Search ${services[placeholderIndex]}...`}
                    className="w-full pl-6 pr-24 py-3 text-sm border border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white rounded-full shadow-sm hover:shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0463ac]/20 focus:border-[#0463ac] transition-all duration-300 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-3 text-gray-400 text-xl">
                    <BiSearchAlt
                      className="cursor-pointer hover:text-[#0463ac] transition-all duration-300 hover:scale-110"
                      onClick={() => {
                        setIsSearchFocused(true);
                        searchInputRef.current?.focus();
                      }}
                    />
                    <BsMicFill
                      className={`cursor-pointer transition-all duration-300 ${isListening ? 'text-red-500 animate-pulse' : !isSupported ? 'text-gray-400 cursor-not-allowed' : 'hover:text-[#0463ac] hover:scale-110'
                        }`}
                      onClick={isSupported ? handleMicClick : () => alert("Voice search is not supported in this browser.")}
                    />
                  </div>
                  {!isSupported && (
                    <p className="text-sm text-red-600 mt-2">
                      Your browser does not support voice search. Please try using Chrome on desktop or Android.
                    </p>
                  )}
                  {isSearchFocused && searchTerm.length === 0 && createPortal(
                    <div
                      style={{
                        position: 'fixed',
                        left: searchPanelStyle?.left ?? 0,
                        top: searchPanelStyle?.top ?? 0,
                        width: searchPanelStyle?.width ?? 'auto',
                        zIndex: 2147483647,
                        pointerEvents: 'auto',
                      }}
                      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 max-h-96 overflow-y-auto transition-all duration-200"
                    >
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
                              setSearchTerm(item);
                              fetchSearchResults(item);
                              setIsSearchOpen(true);
                              searchInputRef.current?.focus();
                            }}
                            className="px-4 py-2 bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-sm"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}

                </div>
              </div>

              {/* Actions Group: AI Bot & Partner */}
              <div className="flex-1 flex items-center justify-end gap-6">
                <div className="relative hidden md:block" ref={aiChatDropdownRef}>
                  <button
                    onClick={() => setIsAiChatOpen(!isAiChatOpen)}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#0463ac] to-[#0693e3] text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110"
                  >
                    <RiRobot2Line className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                  </button>

                  <AnimatePresence>
                    {isAiChatOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-50 border border-gray-100 overflow-hidden"
                      >
                        <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45 z-10" />

                        <div className="p-6 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-inner">
                            <RiRobot2Line className="text-3xl text-[#0463ac]" />
                          </div>

                          <h3 className="text-lg font-bold text-gray-800 mb-2">AI Assistant</h3>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            Our intelligent AI support is currently under development. Stay tuned for a smarter experience!
                          </p>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#0463ac] text-xs font-bold uppercase tracking-wider border border-blue-100">
                            Coming Soon 🚀
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <NavLink
                  to="/register-free-listing"
                  className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#0463ac] to-[#0580ca] hover:from-[#0580ca] hover:to-[#0463ac] text-white rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap text-[13px] tracking-wider"
                >
                  <span>PARTNER WITH US</span>
                </NavLink>
              </div>
            </div>




          </div><div className="md:hidden flex items-center gap-4">
            {/* Cart Button - Uniform Color */}
            <button
              onClick={() => navigate(`${config.VITE_BASE_URL}/add-to-cart`)}
              className="relative text-2xl text-[#033053] hover:text-[#0463ac] transition-colors"
              aria-label="Go to cart"
            >
              <FaShoppingCart size={22} />
              {cart?.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-300 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-sm">
                  {cart?.length}
                </span>
              )}
            </button>

            {/* Account/Profile Button - Uniform Color */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user?.length === 0) {
                    setIsModalOpen(true);
                  } else {
                    setIsLoginOpen(!isLoginOpen);
                  }
                }}
                className={`text-2xl transition-colors ${isLoginOpen ? 'text-[#0463ac]' : 'text-[#033053] hover:text-[#0463ac]'}`}
                aria-label="Account profile"
              >
                <FaUser size={22} />
              </button>

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
        </div>
      </div>

      {/* Mobile Contact Info Bar - updated for premium look */}
      <div
        className="w-full py-1 hidden sm:hidden shadow-sm border-b border-white/10"
        style={{ backgroundImage: 'linear-gradient(90deg, #041228 0%, #074b82 100%)' }}
      >
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-0 px-1">
          <a href="tel:6363865658" className="flex items-center justify-center gap-2 py-1 px-1 border-r border-white/10 w-full">
            <FaPhoneAlt className="text-white text-sm flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/80 leading-tight">Call us</span>
              <span className="text-[11px] font-bold text-white leading-none">6363865658</span>
            </div>
          </a>

          <button
            onClick={() => {
              setComingSoonSource("Hommlie Chat");
              setIsComingSoonOpen(true);
            }}
            className="flex items-center justify-center gap-2 py-1 px-1 border-r border-white/10 w-full"
          >
            <RiRobot2Line className="text-white text-sm flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/80 leading-tight">Hommlie Chat</span>
              <span className="text-[11px] font-bold text-white leading-none">With Us</span>
            </div>
          </button>

          <button
            onClick={() => navigate(`${config.VITE_BASE_URL}/quickservice`)}
            className="flex items-center justify-center gap-2 py-1 px-1 w-full"
          >
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
      <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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

      {/* Location Modal */}
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

      {createPortal(
        <ComingSoonModal
          isOpen={isComingSoonOpen}
          onClose={() => setIsComingSoonOpen(false)}
          source={comingSoonSource}
        />,
        document.body
      )}

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
            </div>,
            document.body
          )
        )
      }

    </header>
  );
};

export default Header;
