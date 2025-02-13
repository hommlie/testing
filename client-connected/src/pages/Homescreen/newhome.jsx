import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrdersIcon from "/assets/icons/orders-icon.svg";
import ComplaintIcon from "/assets/icons/complaint-icon.svg";
import InspectionIcon from "/assets/icons/inspection-icon.svg";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [variations, setVariations] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const navigate = useNavigate();

  // Add states for all dynamic data
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [mostBooked, setMostBooked] = useState([]);
  const [thoughtfulContent, setThoughtfulContent] = useState([]);

  // Fetch initial data
  useEffect(() => {
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

          setHeroSlides(sliders);
          setCategories(all_categories);
          setOffers(offerBanners);
          setMostBooked(most_booked_services);
          setThoughtfulContent(thoughtfulVideos);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchHomeData();
  }, []);

  // Handle search functionality
  const handleSearch = async (term) => {
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`/api/search?term=${term}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Handle category selection and variation fetch
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get("/api/variations", {
        params: {
          categoryId: category,
          subCategoryId: selectedSubCategory,
          productId: selectedProduct,
          attributeId: selectedAttribute,
        },
      });
      setVariations(response.data);
    } catch (error) {
      console.error("Error fetching variations:", error);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (variationId) => {
    try {
      await axios.post("/api/cart/add", {
        variationId,
        quantity: 1,
      });
      // Show success message or update cart count
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 pt-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Explore Top Rated Certified experts nearby
          </h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Location"
                className="w-full p-3 border rounded-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="What Service do you Need?"
                className="w-full p-3 border rounded-lg"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              {searchResults.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchTerm(result.name);
                        setSearchResults([]);
                      }}
                    >
                      {result.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hero Slider and Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main Slider */}
            <div className="md:col-span-2 relative h-64 md:h-80 rounded-xl overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.5 }}
                className="flex h-full"
              >
                {heroSlides?.map((slide, index) => (
                  <div key={index} className="min-w-full h-full relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
                      <h3 className="text-white text-xl font-bold">
                        {slide.title}
                      </h3>
                      <p className="text-white">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Feature Cards */}
            {[1, 2, 3].map((feature) => (
              <motion.div
                key={feature}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <img
                  src={`/feature-${feature}.jpg`}
                  alt={`Feature ${feature}`}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">Feature Title</h3>
                <p className="text-sm text-gray-600 mb-4">Subtitle goes here</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Explore
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto mb-8">
            {categories?.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variations.map((variation) => (
              <motion.div
                key={variation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{variation.title}</h3>
                  <p className="text-2xl font-bold mb-4">
                    ₹{variation.price}/-
                  </p>
                  <ul className="space-y-2 mb-4">
                    {variation.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg"
                    onClick={() => handleAddToCart(variation.id)}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
                className="relative h-48 rounded-xl overflow-hidden"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 p-6 flex flex-col justify-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-white mb-4">{offer.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-fit bg-white text-black px-6 py-2 rounded-lg"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Booked Services */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Most Booked Services</h2>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4">
              {mostBooked?.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.05 }}
                  className="min-w-[300px] bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span>{service.rating}</span>
                        <span className="text-gray-500">
                          ({service.reviews})
                        </span>
                      </div>
                      <span>From ₹{service.price}/service</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
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
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Thoughtful Curations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {thoughtfulContent?.map((content, index) => (
              <motion.div
                key={content.id}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setCurrentVideoIndex(index)}
              >
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">▶️</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
    </div>
  );
};

export default HomePage;
