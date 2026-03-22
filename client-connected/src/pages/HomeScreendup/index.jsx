import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import cartIcon from "../../assets/images/cart-icon.svg";
import config from "../../config/config";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdPlay,
} from "react-icons/io";
import LocationModal from "../../components/LocationModal";
import { useCont } from "../../context/MyContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Star, Users } from "lucide-react";
import DownloadAppImg from "/assets/bg/download-app.png";
import Playstore from "/assets/icons/playstore.svg";
import Appstore from "/assets/icons/appstore.svg";
import ReferEarnImg from "/assets/bg/refer-earn.svg";
// import discoverImg1 from "../../assets/images/discover-1.png";
// import discoverImg3 from "../../assets/images/discover-3.png";
// import discoverImg4 from "../../assets/images/discover-4.png";
import {
  FaBug,
  FaBroom,
  FaSprayCan,
  FaShieldAlt,
  FaFan,
  FaTools,
  FaPaintRoller,
  FaEllipsisH
} from 'react-icons/fa';
import { FaHammer } from 'react-icons/fa';
import photo1 from '../../assets/images/photo1.webp';
import ServiceSection from "../../components/ServiceSection";
import BannerDatalider from "../../components/BannerSection";
import TestimonialCarousel from "../../components/TestimonialCarousel";
import ThoughtfulSlider from "../../components/ThoughtfulSlider";
import ProductSlider from "../../components/ProductSlider";
import StatsSection from "../../components/StatsSection";
import PopularCategorySection from "../../components/PopularCategorySection";
import InspectionFormSection from "../../components/InspectionFormSection";
import ReferAndEarn from "../../components/ReferAndEarnModal";
import InspectionModal from "../../components/InspectionModal";
import MobileNavigation from "../../components/MobileNavigation";
import LoginSignup from "../../components/LoginModal";
import { Helmet } from "react-helmet";
import { Typewriter } from 'react-simple-typewriter';
import SchemaMarkup from "../../components/SchemaMarkup";
// import FormSection from "../FormSection/index"
import SnabbitTasksUI from '../../components/SnabbitTasksUI';
import HowItWorks from "../../components/HowItWorks";
import Testimonials from "../../components/Testimonials";
import QuickHero from "../../components/QuickHero";
import DownloadHommlieApp from "../../components/DownloadHommlieApp";
import WhyChooseHommlie from "../../components/WhyChooseHommlie";
import ServiceGrid from "../ServiceGrid";
import BannerImage from "../BannerImage";
import { BsMicFill } from "react-icons/bs";
import BannerImageMobile from "../BannerImageMobile";
import Offermobile from '../Offermobile'
import Scrapbanner from '../Scrapbanner'
import Scrapmobile from '../Scrapmobile'
import Refermobile from '../Refermobile'
import Roadmap from "../../components/Roadmap";
import CityServiceLinks from "../CityServiceLinks";


const HomePage = () => {
  const { user } = useCont();
  const { location } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    "Get Current Location"
  );
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { cartLength, prodData } = useCont();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const searchTimeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
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

  const searchInputRef = useRef(null);

  // Add states for all dynamic data
  const [data, setData] = useState({
    sliders: [],
    heroSections: [],
    banners: [],
    offerBanners: [],
    most_booked_services: [],
    thoughtfulVideos: [],
    all_categories: [],
    testimonials: [],
    faqs: [],
  });
  const [heroSlides, setHeroSlides] = useState([]);
  const [heroSections, setHeroSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [mostBooked, setMostBooked] = useState([]);
  const [thoughtfulContent, setThoughtfulContent] = useState([]);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/homepage`);
      if (response.data.status === 1) {
        const homeData = response.data.data;
        if (homeData?.faqs && typeof homeData.faqs === "string") {
          const trimmedFaqs = homeData.faqs.trim();
          if (trimmedFaqs.startsWith("[") || trimmedFaqs.startsWith("{")) {
            try {
              homeData.faqs = JSON.parse(trimmedFaqs);
            } catch (e) {
              console.error("Error parsing FAQs:", e);
            }
          }
        }
        setData(homeData);

        const {
          sliders,
          heroSections,
          all_categories,
          offerBanners,
          most_booked_services,
          thoughtfulVideos,
        } = homeData;

        setHeroSlides(sliders);
        setHeroSections(heroSections);
        setCategories(all_categories);
        setOffers(offerBanners);
        setMostBooked(most_booked_services);
        setThoughtfulContent(thoughtfulVideos);
      }
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

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

  // useEffect to clean up the timeout
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


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value === "") {
      setIsSearchOpen(false);
      setSearchResults([]);
      return;
    }

    // Set a new timeout for debouncing
    searchTimeoutRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 300); // 300ms debounce
  };

  const scrollToInspection = () => {
    const inspectionSection = document.querySelector("#inspection-section");
    if (inspectionSection) {
      const offset = 130;
      const sectionPosition =
        inspectionSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // FAQ Section
  const FaqSection = () => {
    const [openFaqIndex, setOpenFaqIndex] = React.useState(null);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const displayedFaqs = isMobile
      ? data?.faqs?.slice(0, Math.ceil(data?.faqs?.length / 2))
      : data?.faqs;

    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 md:mb-8 text-center leading-tight">
          Frequently Asked <span className="text-[#0463ac]">Questions</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {displayedFaqs?.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              initial={false}
            >
              <button
                className="w-full flex justify-between items-center p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span className="font-semibold text-base md:text-lg text-[#033053]">
                  {faq.question}
                </span>
                <span className="text-2xl font-extrabold text-[#0463ac]">
                  {openFaqIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-6 bg-gray-50 text-sm md:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };


  // App Download Section
  const AppDownloadSection = () => (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="hidden md:block">
        <h2 className="text-3xl font-bold mb-4">Get Things Done Easily.</h2>
        <h3 className="text-2xl font-bold mb-6">Download The Hommlie App</h3>
        <p className="text-gray-600 mb-8">
          Book Appointments, Manage Projects and stay connected with Service
          Providers - all on the go!
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            Easy Booking and appointment Scheduling
          </div>
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            Secure Online Payments
          </div>
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            Easy Booking Process - Instant online reservations
          </div>
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            Manage Communication with Service Providers
          </div>
        </div>
        <div className="flex space-x-4">
          <motion.button>
            <img src={Playstore} alt="App Store" className="h-12" />
          </motion.button>
          <motion.button>
            <img src={Appstore} alt="Play Store" className="h-12" />
          </motion.button>
        </div>
      </div>
      <div>
        <img src={DownloadAppImg} alt="App Screenshot" className="mx-auto" />
      </div>
      <div className="flex md:hidden space-x-4">
        <motion.button>
          <img src={Playstore} alt="App Store" className="h-12" />
        </motion.button>
        <motion.button>
          <img src={Appstore} alt="Play Store" className="h-12" />
        </motion.button>
      </div>
    </div>
  );

  // Generate canonical URL based on the current location
  const generateCanonicalUrl = () => {
    // Base URL from your config
    const baseUrl = config.VITE_BASE_URL || "https://www.hommlie.com";

    // Determine the path based on current parameters
    let path = `${location}`;

    // Complete canonical URL
    return `${baseUrl}${path}`;
  };

  const services = [
    "Pest Control",
    "Home Cleaning",
    "Sofa Shampooing",
    "Kitchen Deep Cleaning",
    "Mosquito Net Installation",
    "Sanitization Services",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % services.length);
    }, 4000); // rotates every 4 seconds

    return () => clearInterval(interval);
  }, []);


  const trendingSearches = [
    "Standard Cockroach Control",
    "Bedbugs",
    "Termite Control",
    "Car disinfection",
    "Rodent Management Service",
    "Home Disinfection",
    "6D Prime -Cockroach Control And Ant Control",
  ];

  const [isSearchFocused, setIsSearchFocused] = useState(false);


  return (
    <div
      className="bg-white font-headerFont min-h-screen pt-4"
    >

      <ServiceSection categories={data.all_categories} />

    </div>
  );
};

export default HomePage;
