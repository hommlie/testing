import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import cartIcon from "../../assets/images/cart-icon.svg";
import config from "../../config/config";
import { IoIosArrowForward, IoMdPlay } from "react-icons/io";
import LocationModal from "../../components/LocationModal";
import { useCont } from "../../context/MyContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceSection from "../../components/ServiceSection";
import BannerDatalider from "../../components/BannerSection";

import DownloadAppImg from "/assets/bg/download-app.svg";
import Playstore from "/assets/icons/playstore.svg";
import Appstore from "/assets/icons/appstore.svg";
import ReferEarnImg from "/assets/bg/refer-earn.svg";
import TestimonialCarousel from "../../components/TestimonialCarousel";

const HomePage = () => {
  const [location, setLocation] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    "Get Current Location"
  );
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { cartLength, prodData } = useCont();

  // States for services section
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [variations, setVariations] = useState([]);

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

  // States for carousel sections
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    // Set initial category when data loads
    if (data.all_categories?.length > 0) {
      setSelectedCategory(data.all_categories[0]);
    }
  }, [data.all_categories]);

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
            if (locationStings.length > 3) {
              setCurrentLocation(locationStings?.slice(0, 4)?.join(","));
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

  // Carousel Navigation Buttons
  const CarouselButtons = ({ currentIndex, setCurrentIndex, length }) => (
    <div className="absolute bottom-4 right-4 flex space-x-2">
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1))
        }
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1))
        }
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // FAQ Section
  const FaqSection = () => (
    <div className="max-w-3xl mx-auto">
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
      <div>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 pt-8"
        >
          <div className="flex justify-center py-2">
            <h1 className="hidden md:block max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
              Explore Top Rated Certified experts nearby
            </h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8 py-2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Mobile Cart Button */}
              <div className="flex md:hidden justify-between items-center mb-4">
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
                <div
                  onClick={() =>
                    navigate(`${config.VITE_BASE_URL}/add-to-cart`)
                  }
                  className="ml-4 relative cursor-pointer"
                >
                  <img src={cartIcon} alt="cart icon" className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartLength || 0}
                  </span>
                </div>
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
                </button>
              </div>

              {/* Search Input */}
              <div className="hidden md:block relative flex-1">
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
                        <span className="text-gray-800 group-hover:text-blue-600">
                          {result.product_name}
                        </span>
                        <IoIosArrowForward className="text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform" />
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
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.5 }}
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
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4">
              {heroSections?.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white rounded-xl shadow-sm"
                >
                  <img
                    src={feature.image}
                    alt={feature.alt_tag}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/60 flex flex-col justify-center">
                    <div className="p-4">
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white mb-4">{feature.sub_title}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => (window.location.href = feature.btn_link)}
                      className="w-fit flex justify-between gap-2 px-4 items-center bg-white text-[#107CD7] py-2 rounded-r-lg"
                    >
                      <span>{feature.btn_text}</span>
                      <IoIosArrowForward />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <ServiceSection categories={data.all_categories} />

      {/* Banner Section */}
      <section className="py-12">
        {data?.banners?.length ? (
          <BannerDatalider bannerData={data?.banners} />
        ) : null}
      </section>

      {/* Offers Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Today's Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers?.slice(0, 2).map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ scale: 1.02 }}
                className="h-80 rounded-xl overflow-hidden"
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 mb-2">
          <p className="text-hommlie font-semibold">Services</p>
          <h2 className="text-2xl font-bold mb-8">Most Booked Services</h2>
          <div className="relative">
            <div className="flex gap-6 p-2 overflow-x-auto scrollbar-hide pb-4">
              {mostBooked?.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[300px] bg-white rounded-xl shadow-sm border border-hommlie overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={service.productimage?.image_url}
                      alt={service.productimage?.alt_tag}
                      title={service.productimage?.image_title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold h-14 mb-2">
                      {service.product_name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span>{service.rating}</span>
                        <span className="text-gray-500">
                          ({service.total_reviews})
                        </span>
                      </div>
                      <span>From ₹{service.discounted_price}/service</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-fit px-4 mt-4 bg-white text-hommlie border border-hommlie py-2 rounded-lg"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Thoughtful Curations */}
      <section className="px-10 py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Thoughtful Curations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {thoughtfulContent?.map((content, index) => (
              <motion.div
                key={content.id}
                whileHover={{ scale: 1.05 }}
                className="relative w-full max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setCurrentVideoIndex(index)}
              >
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#FFFFFF4D] rounded-full flex items-center justify-center">
                    <span className="text-2xl text-[#FFFFFF4D]">
                      <IoMdPlay />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refer & Earn */}
      <section className="px-10 py-12">
        <div className="bg-[#D8EEDD] p-6 rounded-lg">
          <div className="flex items-center space-x-4">
            <img src={ReferEarnImg} alt="Refer Icon" className="w-fit h-28" />
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
      <section className="px-10 py-12">
        <TestimonialCarousel testimonials={data.testimonials} />
      </section>

      {/* App Download Section */}
      <section className="px-10 py-12 bg-[#F8F8F8]">
        <AppDownloadSection />
      </section>

      {/* FAQ Section */}
      <section className="px-10 py-12">
        <FaqSection />
      </section>

      {/* Video Modal */}
      {currentVideoIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-lg mx-4">
            <button
              className="absolute -top-10 right-0 text-white text-xl"
              onClick={() => setCurrentVideoIndex(null)}
            >
              ✕
            </button>
            <div className="aspect-video">
              <iframe
                src={thoughtfulContent[currentVideoIndex].videoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {isLocationModalOpen && (
        <LocationModal
          onClose={() => setIsLocationModalOpen(false)}
          setCurrentLocation={setCurrentLocation}
        />
      )}
    </div>
  );
};

export default HomePage;
