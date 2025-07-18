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
import photo1 from '../../assets/images/photo1.jpg';
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
  const FaqSection = () => (
  <div className="w-full mx-auto">
    <h2 className="text-2xl font-bold mb-8 text-center">
      Frequently Asked Questions
    </h2>
    <div className="space-y-4 mr-3">
      {data?.faqs?.map((faq, index) => (
        <motion.div
          key={index}
          className="border rounded-lg overflow-hidden"
          initial={false}
        >
          <button
            className="w-full flex justify-between items-center p-4 text-left"
            onClick={() =>
              setOpenFaqIndex(openFaqIndex === index ? null : index)
            }
          >
            <span className="font-medium">{faq.question}</span>
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
                <p className="p-4 bg-gray-50">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
);


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
    const baseUrl = config.VITE_BASE_URL || "https://hommlie.com";

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
  "Cockroach control service",
  "Bed bug control",
  "Termite treatment",
  "Pest control services",
  "Disinfection service",
  "Rodent control",
  "Home Deep Cleaning",
  "6D Prime Services",
  "Pest Control Near Me",
  "Cockroach & Ant Control",
];

const [isSearchFocused, setIsSearchFocused] = useState(false);


  return (
    <div className="min-h-screen font-headerFont">
      <SchemaMarkup />
      <Helmet>
        <link rel="canonical" href={generateCanonicalUrl()} />
      </Helmet>
      {/* Typewriter Hero Headline - Desktop Only */}
      <section className="hidden md:block w-full px-5 md:px-10 pt-6 pb-0 text-center md:text-left">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl ml-1 font-bold text-gray-800">
            <span className="text-black inline-block">
              <Typewriter
                words={[
                  "Trained & Verified Professionals",
                  "Available All 365 Days",
                  "Warranty-Backed Services",
                  "Easy to Book, Easy to Use",
                  "Friendly Customer Support",
                  "Rated by People Like You",
                  "India’s Most Trusted Home Service App",
                  "Transparent Prices. No Surprises."
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-5 bg-white">
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
                  className="w-full pl-4 pr-20 py-3 text-base border border-gray-200 bg-[#f7f7f7] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
              {isSearchFocused && searchTerm.length === 0 && (
                <div className="mt-3 bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-h-80 overflow-y-auto z-50">
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
                        onMouseDown={() => setSearchTerm(item)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-emerald-100 transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Always show on both desktop and mobile */}
            <ServiceGrid />

            {/* Stats Section - Desktop only */}
            {/* <div className="hidden md:block">
              <StatsSection />
            </div> */}
          </div>



    {/* Right Container - Images */}
    
    <div className="hidden md:block w-[554px] -mt-10">
      <div className="h-[630px] rounded-lg overflow-hidden bg-gray-200">
        <img 
          src={photo1} // Replace with your single image
          alt="Home Service Full View" 
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>


  </div>
</section>
      {/* Services Section */}
      <ServiceSection categories={data.all_categories} />

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
      <div className="block md:hidden h-2 bg-gray-200"></div>

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
      {/* <section className="px-10 py-5 md:py-10">
        <StatsSection />
      </section> */}
        <section className="px-2 sm:px-12">
          <BannerImageMobile />
          <BannerImage />
        </section>
          <div className="block md:hidden h-2 bg-gray-200"></div>
        <section className=" px-10 py-5 md:py-10">
          <SnabbitTasksUI />
        </section>

        {/* <section className="px-10 py-20">
          <HowItWorks />
        </section> */}
        
        {/* <section className="px-10">
          <WhyChooseHommlie />
        </section> */}

      <section className="px-11 sm:px-12">
          <Testimonials />
        </section>

      <div className="block md:hidden h-2 bg-gray-200"></div>
        
        <section className="px-2 sm:px-12">
          <Scrapbanner />
          <Scrapmobile />
        </section>

      {/* inspection form section */}
      <section id="inspection-section" className="px-4 py-5 md:py-10">
        <InspectionFormSection />
      </section>

      {/* <section className="px-2 sm:px-12">
          <Offermobile />
          <Refermobile />
        </section> */}
      {/* <section className="hidden sm:hidden px-10 py-5 md:py-10">
        <FaqSection />
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
