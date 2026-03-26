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
import { ChevronLeft, ChevronRight, Star, Users, Plus, Minus, HelpCircle } from "lucide-react";
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
import photo1 from '../../assets/images/photo1.jpeg';
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
import { Helmet } from "react-helmet-async";
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
import HomeForm from "../HomeForm";
import PestControlCarousel from "../../components/PestControlCarousel";
import ImpactStats from "../../components/ImpactStats";


const HomePage = () => {
  const { user } = useCont();
  const { location } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const {
    cartLength,
    prodData,
    currentLocation,
    setCurrentLocation,
    pincode,
    setGlobalPincode,
    isLoginModalOpen,
    setIsLoginModalOpen,
  } = useCont();

  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

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

        // Parse FAQs if it's a string
        if (typeof homeData.faqs === "string") {
          try {
            homeData.faqs = JSON.parse(homeData.faqs);
          } catch (e) {
            console.error("Error parsing FAQs:", e);
            homeData.faqs = [];
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

  const [isInBangalore, setIsInBangalore] = useState(true);

  const checkIsBangalore = (address) => {
    if (!address || address === "Get Current Location") return true;

    const addrLower = address.toLowerCase();

    // Explicit positive matches for Bangalore/Bengaluru or its pincodes
    const isBangalore = addrLower.includes("bangalore") ||
      addrLower.includes("bengaluru") ||
      /\b560\d{3}\b/.test(address);

    if (isBangalore) return true;

    // If the address is short (like a street name) and doesn't mention another city, 
    // it's likely a local search in Bangalore. We should only return false if it's 
    // CLEARLY somewhere else.
    const otherCities = ["delhi", "mumbai", "chennai", "hyderabad", "pune", "kolkata", "mysore", "goa"];
    const isExplicitlyOtherCity = otherCities.some(city => addrLower.includes(city));

    // Detect non-Bangalore pincodes (starting with anything other than 560)
    const hasOtherPincode = /\b(?!560)\d{6}\b/.test(address);

    if (isExplicitlyOtherCity || hasOtherPincode) return false;

    // Default to true for local/ambiguous street addresses to avoid annoying false alerts
    return true;
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

            // Extract pincode from fullAddress if possible
            const pincodeMatch = fullAddress.match(/\b\d{6}\b/);
            if (pincodeMatch && typeof setGlobalPincode === 'function') {
              setGlobalPincode(pincodeMatch[0]);
            }

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
    setIsInBangalore(checkIsBangalore(currentLocation));
  }, [currentLocation, pincode]);

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
    "Rodent Management Service",
    "Home Disinfection",
  ];

  const [isSearchFocused, setIsSearchFocused] = useState(false);


  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat font-headerFont bg-white"
    >
      <SchemaMarkup />
      <Helmet>
        <link rel="canonical" href={generateCanonicalUrl()} />
      </Helmet>
      {/* Typewriter Hero Headline - Desktop Only */}

      <section
        className="max-w-[1440px] mx-auto px-1 md:px-6 pt-0 pb-4 md:py-12 bg-transparent sm:bg-[#ffffff] min-h-screen"
      >
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-start">
          {/* Left Container - Services Grid & Form (Sticky) */}
          <div className="w-full md:w-[460px] md:sticky md:top-32 flex-shrink-0 ml-6">
            <ServiceGrid
              categories={categories}
              mobileAfterTabs={
                <div className="relative">
                  <AnimatePresence>
                    {!isInBangalore && currentLocation !== "Get Current Location" && (
                      <motion.div
                        key="bangalore-alert"
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        className="overflow-hidden mb-3"
                      >
                        <div className="bg-gradient-to-r from-[#0463ac] to-[#035240] text-white p-3 rounded-xl shadow-lg flex items-center justify-between gap-2 overflow-hidden relative">
                          <div className="flex items-center gap-2">
                            <span className="text-xl animate-bounce">📍</span>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider font-bold opacity-90 text-white/90 text-left">Coming Soon</p>
                              <p className="text-sm font-bold leading-tight text-white drop-shadow-sm text-left">
                                We're coming soon to {
                                  currentLocation.split(',').find(part => !/^\d+$/.test(part.trim()))?.trim() ||
                                  currentLocation.split(',')[0]
                                }!
                              </p>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-white/30 animate-pulse"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              }
            />

            {/* HomeForm in flow (Desktop Only) */}
            <div className="hidden md:block mt-3">
              <HomeForm />
            </div>
          </div>

          {/* Right Container - Hero Banner Image (Desktop) */}
          <div className="hidden md:block w-[58%] flex-shrink-0 mt-[60px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full rounded-2xl overflow-hidden ml-10"
            >
              <img
                src="/homebanner.jpeg"
                alt="Premium Home Services Banner"
                className="w-full h-auto"
              />
            </motion.div>

            <div className="mt-28">
              <ImpactStats />
            </div>
          </div>
        </div>
      </section>
      {/* <Roadmap />    */}
      {/* Moved to ServiceSection
      <section className="px-2 sm:px-12" style={{
        // background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e8f3fd 75%, #e6faec 100%)",
      }}>
        <BannerImageMobile />
        <BannerImage />
      </section> 
      */}

      <section className="py-2 md:py-4">
        <div style={{ maxWidth: '100%' }} className="w-full px-4 lg:px-8 mx-auto">
          <ServiceSection categories={data.all_categories} />
        </div>
      </section>

      <section className="px-10 py-1">
        <SnabbitTasksUI categories={categories} />
      </section>

      <section className="hidden md:block px-2 sm:px-12 py-1">
        {/* <BannerImage /> */}
      </section>

      {/* Pest Control Carousel */}
      <section className="px-0 py-0 sm:px-11">
        <PestControlCarousel />
      </section>

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
        className="px-4 sm:px-10 py-5 sm:py-8"
      >
        <div className="max-w-7xl mx-auto mt-2 sm:mt-0">
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



      <section className="bg-white py-6 md:py-10 px-0 sm:px-0 -mt-4 sm:-mt-2">
        <FaqSection data={data} />
      </section>


      {/* Location Modal */}
      {
        isLocationModalOpen && (
          <LocationModal
            onClose={() => setIsLocationModalOpen(false)}
            setCurrentLocation={setCurrentLocation}
          />
        )
      }

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
      />
      <MobileNavigation />
    </div >
  );
};

export default HomePage;

// Helper Components
const FaqSection = ({ data }) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  let displayedFaqs = isMobile
    ? data?.faqs?.slice(0, Math.ceil(data?.faqs?.length / 2))
    : data?.faqs;

  displayedFaqs = Array.isArray(displayedFaqs) ? displayedFaqs : [];

  return (
    <div className="max-w-[1370px] mx-auto px-4 sm:px-6 py-2 md:py-4 sm:-mt-28">
      <div className="text-center mb-6 md:mb-8">
        <div className="w-full border-t border-gray-100 mb-6" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-semibold text-[#033053] tracking-tighter leading-tight"
        >
          Frequently Asked <span className="text-[#0463ac]">Questions</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-3 text-sm sm:text-base max-w-2xl mx-auto font-medium"
        >
          Find answers to common questions about our services and booking process.
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {displayedFaqs?.map((faq, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group overflow-hidden rounded-[24px] transition-all duration-500 border ${isOpen
                ? "bg-white border-blue-100 shadow-[0_20px_40px_rgba(3,48,83,0.06)] scale-[1.01]"
                : "bg-white/60 border-gray-100 hover:border-blue-100 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                }`}
            >
              <button
                className="w-full flex justify-between items-center p-6 sm:p-7 text-left transition-colors relative"
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              >
                {/* Left accent bar for active state */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? '100%' : '0%' }}
                  className="absolute left-0 top-0 w-1.5 bg-[#0463ac]"
                />

                <span className={`font-semibold text-base sm:text-lg transition-colors pr-8 ${isOpen ? "text-[#033053]" : "text-[#4A5568] group-hover:text-[#033053]"
                  }`}>
                  {faq.question}
                </span>

                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-[#033053] text-white rotate-180" : "bg-blue-50 text-[#0463ac]"
                  }`}>
                  {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-7 pb-7 -mt-1">
                      <div className="h-[1px] w-full bg-blue-50 mb-6" />
                      <p className="text-[#64748b] text-sm sm:text-base leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

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
