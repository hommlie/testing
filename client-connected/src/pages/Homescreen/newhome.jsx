import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate } from "react-router-dom";
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

import DownloadAppImg from "/assets/bg/download-app.svg";
import Playstore from "/assets/icons/playstore.svg";
import Appstore from "/assets/icons/appstore.svg";
import ReferEarnImg from "/assets/bg/refer-earn.svg";
import discoverImg1 from "../../assets/images/discover-1.png";
import discoverImg3 from "../../assets/images/discover-3.png";
import discoverImg4 from "../../assets/images/discover-4.png";

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

const HomePage = () => {
  const { user } = useCont();
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
      <div className="space-y-4">
        {data.faqs.map((faq, index) => (
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
              <ChevronRight
                className={`w-5 h-5 transform transition-transform ${
                  openFaqIndex === index ? "rotate-90" : ""
                }`}
              />
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

  return (
    <div className="min-h-screen  font-headerFont">
      {/* Hero Section */}
      <section className="relative bg-white py-5 md:py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 md:pt-8"
        >
          <div className="w-full hidden md:block flex justify-center py-2 text-center">
            <h1 className="max-w-2xl mx-auto text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
              Explore Top Rated Certified Experts Nearby
            </h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-4 md:mb-8 py-2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Mobile Cart Button */}
              <div className="flex md:hidden justify-between items-center md:mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <BiSearchAlt className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What Service do you Need?"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                {/* <div
                  onClick={() =>
                    navigate(`${config.VITE_BASE_URL}/add-to-cart`)
                  }
                  className="ml-4 relative cursor-pointer"
                >
                  <img src={cartIcon} alt="cart icon" className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartLength || 0}
                  </span>
                </div> */}
              </div>

              {/* Location Input - Hidden on Mobile */}
              <div className="hidden md:block relative flex-1">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg border hover:border-blue-500 transition-colors"
                >
                  <MdLocationOn className="text-xl text-green-600" />
                  <span className="flex-1 text-left truncate">
                    {currentLocation}
                  </span>
                  <IoIosArrowDown />
                </button>
              </div>

              {/* Search Input */}
              <div className="hidden md:block relative flex-1">
                <BiSearchAlt className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="What Service do you Need?"
                  className="w-full pl-10 pr-4 py-3 border hover:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() =>
                          navigate(
                            `${config.VITE_BASE_URL}/product/${result.id}/${result.slug}`
                          )
                        }
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

          {/* Hero Slider and Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Slider */}
            <div className="relative h-40 md:h-80 rounded-xl overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="flex h-full"
              >
                {heroSlides?.map((slide, index) => (
                  <a
                    key={index}
                    href={slide.link}
                    className="min-w-full h-full relative"
                  >
                    <img
                      src={slide.image_url}
                      alt={slide.alt_tag}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ))}
              </motion.div>

              {/* Slider Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroSlides?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "w-4 bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? heroSlides.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <IoIosArrowBack className="text-gray-800 text-xl" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === heroSlides.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <IoIosArrowForward className="text-gray-800 text-xl" />
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4">
              {heroSections?.map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-white md:rounded-xl shadow-sm overflow-hidden"
                >
                  <img
                    src={feature.image}
                    alt={feature.alt_tag}
                    className="w-full h-full object-cover md:rounded-xl"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/60 flex flex-col justify-around">
                    <div className="p-2 md:p-4">
                      <h3 className="text-white text-sm md:text-2xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-white mb-4">
                        {feature.sub_title}
                      </p>
                    </div>
                    <div className="relative overflow-hidden">
                      {isMobile ? (
                        <a
                          href={feature.btn_link}
                          className="w-fit flex items-center bg-white text-[#107CD7] py-2 rounded-r-lg"
                        >
                          <span className="text-sm px-2 whitespace-nowrap">
                            {feature.btn_text}
                          </span>
                          <div className="w-5 flex justify-center">
                            <IoIosArrowForward />
                          </div>
                        </a>
                      ) : (
                        <motion.div
                          whileHover={{ x: 0 }}
                          initial={{ x: "calc(100% - 220px)" }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="w-fit flex items-center bg-white text-[#107CD7] py-2 rounded-r-lg"
                        >
                          <a href={feature.btn_link}>
                            <span className="px-4 whitespace-nowrap">
                              {feature.btn_text}
                            </span>
                          </a>
                          <div className="w-10 flex justify-center">
                            <IoIosArrowForward />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <ServiceSection categories={data.all_categories} />

      <div className="block md:hidden h-2 bg-gray-200"></div>

      {/* Discover Section */}
      <section className="px-4 md:px-10 py-5 md:py-10">
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
      </section>

      <div className="block md:hidden h-2 bg-gray-200"></div>

      {/* Banner Section */}
      <section className="py-5 md:py-10">
        {data?.banners?.length ? (
          <BannerDatalider bannerData={data?.banners} />
        ) : null}
      </section>

      <div className="block md:hidden h-2 bg-gray-200"></div>

      {/* Offers Section */}
      <section className="py-5 md:py-10 bg-gray-50">
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
      </section>

      {/* Most Booked Services */}
      <section className="py-5 md:py-10 bg-white">
        <ProductSlider
          title={"Most Booked Services"}
          services={data?.most_booked_services}
        />
      </section>

      {/* Thoughtful Curations */}
      <section className="px-10 py-5 md:py-10 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <ThoughtfulSlider
            videos={thoughtfulContent}
            // onVideoClick={setCurrentVideoIndex}
          />
        </div>
      </section>

      {/* Refer & Earn */}
      <section className="px-10 py-5 md:py-10">
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
                Invite Your Friends and Family and get instant 45% off on your
                next Booking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-10 py-5 md:py-10">
        <TestimonialCarousel testimonials={data.testimonials} />
      </section>

      {/* App Download Section */}
      <section className="px-10 py-5 md:py-10 bg-[#F8F8F8]">
        <AppDownloadSection />
      </section>

      {/* FAQ Section */}
      <section className="px-10 py-5 md:py-10">
        <FaqSection />
      </section>

      {/* Stats Section */}
      <section className="px-10 py-5 md:py-10">
        <StatsSection />
      </section>

      {/* inspection form section */}
      <section id="inspection-section" className="px-10 py-5 md:py-10">
        <InspectionFormSection />
      </section>

      {/* Popular Categories Section with Tabs */}
      <section className="px-10 py-5 md:py-10">
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
