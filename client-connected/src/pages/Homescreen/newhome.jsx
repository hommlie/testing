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
import photo1 from '../../assets/images/photo1.png';
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
import Refermobile  from '../Refermobile'
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
        const {
          sliders,
          heroSections,
          banners,
          offerBanners,
          most_booked_services,
          thoughtfulVideos,
          testimonials,
          faqs,
          all_categories,
        } = response.data.data;
        setData(response.data.data);

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

  let displayedFaqs = isMobile
    ? data?.faqs?.slice(0, Math.ceil(data?.faqs?.length / 2))
    : data?.faqs;

  // Ensure displayedFaqs is always an array
  displayedFaqs = Array.isArray(displayedFaqs) ? displayedFaqs : [];

   return (
    <div className="w-[115%] sm:w-full mx-auto sm:-ml-0 -ml-6">
      <h2 className="text-1xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Frequently Asked Questions
      </h2>
        <div className="space-y-4">
          {displayedFaqs?.map((faq, index) => (
            <motion.div
              key={index}
              className="border rounded-lg overflow-hidden"
              initial={false}
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-white"
                onClick={() =>
                  setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
              >
                <span className="font-medium text-sm sm:text-base">
                  {faq.question}
                </span>
                <span className="text-xl font-bold">
                  {openFaqIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 bg-gray-50 text-sm sm:text-base">
                      {faq.answer}
                    </p>
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
      className="sm:max-w-7xl sm:mx-auto bg-cover bg-center bg-no-repeat font-headerFont"
     
    >
      <SchemaMarkup />
      <Helmet>
        <link rel="canonical" href={generateCanonicalUrl()} />
      </Helmet>
      {/* Typewriter Hero Headline - Desktop Only */}
      
        <section
          className="max-w-7xl mx-auto px-5 py-5 bg-cover bg-white bg-center bg-no-repeat h-[450px] md:h-auto"
          // style={{
          //   background:
          //     "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          // }}
        >
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left Container - Services */}
          <div className="w-full md:w-1/2">
            {/* Search Bar - Mobile only */}
            <div className="sm:block md:hidden">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={`Search ${services[placeholderIndex]}...`}
                  className="w-full pl-4 pr-20 py-3 text-base border border-black bg-[#f7f7f7] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3 text-gray-700 text-xl">
                  <BiSearchAlt
                    className="cursor-pointer hover:text-emerald-900 transition-colors"
                    onClick={() => {
                      setIsSearchFocused(true);
                      searchInputRef.current?.focus();
                    }}
                  />
                  <BsMicFill
                    className={`cursor-pointer hover:text-emerald-900 transition-colors ${
                      isListening ? 'text-red-500 animate-pulse' : ''
                    }`}
                    onClick={handleMicClick}
                  />
                </div>
              </div>
              {!isSupported && (
                <p className="text-red-600 mt-2 text-sm">
                  Your browser does not support voice search. Please try using Chrome on desktop or Android.
                </p>
              )}
              {/* Trending Search Dropdown */}
              <div className="relative w-full">
              {isSearchFocused && searchTerm.length === 0 && (
                <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-h-80 overflow-y-auto z-0">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
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
              </div>
            </div>
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-20 max-h-96 overflow-y-auto mx-4 border border-gray-200"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
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
                            navigate(`${config.VITE_BASE_URL}/product/${result.slug}`);
                          }}
                        >
                          {result.productimage && (
                            <img
                              src={result.productimage.image_url}
                              alt={result.product_name}
                              className="w-14 h-14 object-cover rounded mr-3 border border-gray-200"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-medium">{result.product_name}</h4>
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


            {/* Always show on both desktop and mobile */}
            <ServiceGrid />
            <div className="hidden md:flex max-w-7xl ml-14 mt-10 mx-auto">
            <h2 className="text-2xl font-medium text-black -ml-8">
              <span
              // style={{
              //   background: "linear-gradient(135deg, #36859bff 0%, #92b876 15%, #48841cff 50%, #23400eff 75%, #92b876 100%)",
              //   WebkitBackgroundClip: "text",
              //   WebkitTextFillColor: "transparent",
              //   display: "inline-block"
              // }}
            >
              <Typewriter
                words={[
                  "Trained & Verified Professionals..",
                  "Available All 365 Days..",
                  "Warranty-Backed Services..",
                  "Easy to Book, Easy to Use..",
                  "Friendly Customer Support..",
                  "Rated by People Like You (4.9 +)..",
                  "India’s Most Trusted Home Service App..",
                  "Transparent Prices. No Surprises.."
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
            </h2>
          </div>
             
            
          </div>
    
          <div className="hidden md:block w-[552px]">
            <div className="h-[525px] rounded-lg overflow-hidden">
              <img 
                src={photo1} // Replace with your single image
                alt="Home Service Full View" 
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        
        {/* <ServiceSection categories={data.all_categories} />
        <Roadmap />   
        <section className="px-2 sm:px-7">
          <BannerImageMobile />
          <BannerImage />
        </section>
        
        <section className=" px-6 py-5 md:py-10">
          <SnabbitTasksUI />
        </section> 
        <section className="px-6 sm:px-7">
          <Testimonials />
        </section>
        <section className="px-2 sm:px-7">
          <Scrapbanner />
          <Scrapmobile />
        </section>
        <section id="inspection-section" className="px-0 py-0 md:py-10">
          <InspectionFormSection />
        </section> */}
    </section>
    <ServiceSection categories={data.all_categories} />
        {/* <Roadmap />    */}
        <section className="px-2 sm:px-12" style={{
            // background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
          <BannerImageMobile />
          <BannerImage />
        </section>
        
        <section className="px-10 py-5" style={{
            // background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
          <SnabbitTasksUI />
        </section> 
        {/* <section className="px-6 sm:px-10 -mt-10 sm:-mt-0" style={{
            background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
          <Testimonials />
        </section> */}
        <section className="block md:hidden px-2 sm:px-11">
          <TestimonialCarousel />
        </section>
        <section className="px-2 sm:px-11" style={{
            // background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
          <Scrapbanner />
          <Scrapmobile />
        </section>
        <section
          id="inspection-section"
          className="px-4 sm:px-10 py-0s sm:py-10"
          // style={{
          //   background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          // }}
        >
          <div className="max-w-7xl mx-auto mt-7 sm:mt-0">
            <InspectionFormSection />
          </div>
        </section>

      {/* Services Section */}
      {/* <ServiceSection categories={data.all_categories} /> */}

      {/* <div className="block md:hidden h-2 bg-gray-200"></div> */}

      {/* Discover Section */}
      {/* <section className="px-4 md:px-10 py-5 md:py-10">
        <h2 className="text-2xl font-bold mb-4 md:mb-8">Discover</h2>
        <div className="w-full flex flex-wrap justify-around rounded-2xl border border-hommlie py-3">
          <NavLink
            to={`${config.VITE_BASE_URL}/my-bookings`}
            className="flex flex-col gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg1}
                className="h-full w-full"
                alt="Discover our services"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              My Orders
            </span>
          </NavLink>
          <NavLink
            to={`${config.VITE_BASE_URL}/contact-us`}
            className="flex flex-col gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg3}
                className="h-full w-full"
                alt="Discover"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              Complaints
            </span>
          </NavLink>
          <button
            onClick={scrollToInspection}
            className="flex flex-col it gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg4}
                className="h-full w-full"
                alt="Discover"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              Book an Inspection
            </span>
          </button>
        </div>
      </section> */}

      {/* form section */}
      
          {/* <FormSection /> */}

      {/* <div className="block md:hidden h-2 bg-gray-200"></div> */}

      {/* Banner Section */}
      {/* <section className="py-5 md:py-10">
        {data?.banners?.length ? (
          <BannerDatalider bannerData={data?.banners} />
        ) : null}
      </section> */}
      {/* <div className="block md:hidden h-2 bg-gray-200"></div> */}

      {/* Offers Section */}
      {/* <section className="max-w-7xl mx-auto md:px-4 py-5 md:py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Today's Offers</h2>
          <div
            className="flex overflow-x-auto space-x-4 gap-4 
      md:grid md:grid-cols-2 md:gap-6 
      md:overflow-visible 
      scrollbar-hide"
          >
            {offers?.slice(0, 2).map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ scale: 1.02 }}
                className="h-52 md:h-80 
            rounded-xl 
            overflow-hidden 
            flex-shrink-0 
            w-[calc(100vw-4rem)] 
            md:w-auto 
            max-w-full 
            first:ml-4 last:mr-4 
            md:first:ml-0 md:last:mr-0"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Most Booked Services */}
      {/* <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-10 bg-white">
        <ProductSlider
          title="Most Booked Services"
          services={data?.most_booked_services}
        />
      </section> */}


      {/* Thoughtful Curations */}
      {/* <section className="px-7 py-5 md:py-10 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <ThoughtfulSlider
            videos={thoughtfulContent}
            // onVideoClick={setCurrentVideoIndex}
          />
        </div>
      </section> */}

      {/* Refer & Earn */}
      {/* <section className="px-10 py-5 md:py-10">
        <div
          onClick={() => {
            if (!user || user.length === 0) {
              setIsLoginModalOpen(true);
              return;
            }
            setIsReferModalOpen(true);
          }}
          className="bg-[#D8EEDD] p-6 rounded-lg hover:scale-105 cursor-pointer transition-transform duration-300"
        >
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4">
            <img src={ReferEarnImg} alt="Refer Icon" className="w-fit h-32" />
            <div>
              <h3 className="font-bold">Refer & Get Free Services</h3>
              <p className="text-gray-600">
                Invite Your Friends and Family and get instant 15% off on your
                next Booking
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonial Section */}
      {/* <section className="px-7 py-5 md:py-10">
        <TestimonialCarousel testimonials={data.testimonials} />
      </section> */}

      {/* App Download Section */}
      {/* <section className="px-10 py-5 md:py-10 bg-[#F8F8F8]">
        <AppDownloadSection />
      </section> */}
      {/* <QuickHero /> */}


      {/* Stats Section */}
      <section className="px-10 py-5 md:py-10"  style={{
        // background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
      }}>
        <StatsSection />
      </section>
        {/* <section className="px-2 sm:px-12">
          <BannerImageMobile />
          <BannerImage />
        </section> */}
          {/* <div className="block md:hidden h-2 bg-gray-200"></div> */}
        {/* <section className=" px-10 py-5 md:py-10">
          <SnabbitTasksUI />
        </section> */}

        {/* <section className="px-10 py-20">
          <HowItWorks />
        </section> */}
        
        {/* <section className="px-10">
          <WhyChooseHommlie />
        </section> */}

      {/* <section className="px-11 sm:px-12">
          <Testimonials />
        </section> */}

      {/* <div className="block md:hidden h-2 bg-gray-200"></div> */}
        
        {/* <section className="px-2 sm:px-12">
          <Scrapbanner />
          <Scrapmobile />
        </section> */}

      {/* inspection form section */}
      {/* <section id="inspection-section" className="px-4 py-5 md:py-10">
        <InspectionFormSection />
      </section> */}

      {/* <section className="px-2 sm:px-12">
          <Offermobile />
          <Refermobile />
        </section> */}
      <section className="px-10 py-5 md:py-10 -mt-6 sm:-mt-0" style={{
            // background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
        <FaqSection />
      </section>

      {/* <section className="px-10 py-5 md:py-10" style={{
            background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
        <CityServiceLinks />
      </section> */}

      {/* Popular Categories Section with Tabs */}
      <section className="hidden sm:hidden px-10 py-5 md:py-10">
        <PopularCategorySection data={data?.all_categories} />
      </section>

      <MobileNavigation />

      {/* Location Modal */}
      {isLocationModalOpen && (
        <LocationModal
          onClose={() => setIsLocationModalOpen(false)}
          setCurrentLocation={setCurrentLocation}
        />
      )}

      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
      />
      <ReferAndEarn
        isOpen={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />
      <LoginSignup
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        // checkoutPd={checkoutPd}
      />
    </div>
  );
};

export default HomePage;
