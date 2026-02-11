import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonModal from "../ComingSoonPage";
import { useNavigate } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import config from "../../config/config";
import axios from "axios";
import Requestacallback from "../Requestacallback";

const ServiceGrid = ({ categories: propCategories }) => {
  const [showModal, setShowModal] = useState(null);           // category drilldown modal (e.g., Pest Control)
  const [showComingSoon, setShowComingSoon] = useState(false); // "Coming Soon" modal for placeholder services
  const [fullCategories, setFullCategories] = useState([]);    // Stores rich data from /api/category
  const [isCallbackOpen, setIsCallbackOpen] = useState(false); // Callback modal state

  const navigate = useNavigate();
  const { categoryData } = useCont();

  // Fetch full category data (same source as /services) to ensure we have app_icon and correct image URLs
  useEffect(() => {
    const fetchFullCategories = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/category`);
        if (response.data && response.data.data) {
          setFullCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching full category data in ServiceGrid:", error);
      }
    };
    fetchFullCategories();
  }, []);

  // Use categories from props/context for the GRID display
  const categoriesList = (categoryData?.data && categoryData.data.length > 0) ? categoryData.data : (propCategories || []);

  // Lock body scroll when any modal is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if ((showModal || showComingSoon) && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal, showComingSoon]);

  const comingSoonServices = ["AC Services", "Plumbing", "Painting"];

  const handleServiceClick = (service) => {
    const serviceName = service.category_name || service.name;

    if (serviceName === "Scrap") {
      navigate(`${config.VITE_BASE_URL}/scrap`);
      return;
    }

    if (serviceName === "Waste Management") {
      window.open("https://www.ecospherewm.com/", "_blank");
      return;
    }

    if (serviceName === "Product") {
      navigate(`${config.VITE_BASE_URL}/product`);
      return;
    }

    if (comingSoonServices.includes(serviceName) || serviceName === "See More") {
      setShowModal(null);
      setShowComingSoon(serviceName);
      return;
    }

    // Check if the dynamic category has subcategories
    const subcats = service.subcategories || service.Subcategories || [];
    if (subcats.length > 0) {
      setShowComingSoon(false);
      setShowModal(service);
    } else {
      // Fallback for hardcoded or empty dynamic categories
      const fallbackItems = serviceData[serviceName] || [];
      if (fallbackItems.length > 0) {
        setShowComingSoon(false);
        setShowModal(service);
      } else {
        setShowModal(null);
        setShowComingSoon(serviceName);
      }
    }
  };

  const serviceData = {
    "Pest Control": [
      { name: "General Pest Control", image: "/images/genralpestcontrol.png", url: "/subcategory/general-pest-control" },
      { name: "Cockroach Control", image: "/images/cockicon.png", url: "/subcategory/cockroach-control-services-in-bangalore" },
      { name: "Bedbugs Control", image: "/images/bedbugicon.png", url: "/subcategory/bed-bug-control-services-in-bangalore" },
      { name: "Rodent Control", image: "/images/rodenticon.png", url: "/subcategory/rodent-control-in-bangalore" },
      { name: "Mosquito Control", image: "/images/mosquitoicon.png", url: "/subcategory/mosquito-control-in-bangalore" },
      { name: "Termite Control", image: "/images/termiteicon.png", url: "/subcategory/termite-control-services-in-bangalore" },
    ],
    "Deep Cleaning": [
      { name: "Full Home Cleaning – Apartment", image: "/images/apartmenticon.png", url: "/subcategory/home-cleaning-services-in-bangalore" },
      { name: "Full Home Cleaning – Bungalow/Duplex", image: "/images/bunglowicon.png", url: "/subcategory/top-home-cleaning-services-in-bangalore" },
    ],
    "Bird Control": [
      { name: "Anti Bird Spikes", image: "/images/antibridicon.png", url: "/subcategory/anti-bird-spikes" },
      { name: "Bird Control", image: "/images/nettingicon.png", url: "/subcategory/bird-netting-for-balcony-in-bangalore" },
    ],
    "Disinfection": [
      { name: "Disinfection", image: "/images/disinfection.png", url: "/subcategory/disinfection-services-near-you-in-bangalore" },
    ],
  };

  const fallbackServices = [
    { id: 1, category_name: "Pest Control", image_url: "/images/pestcontrol1nn.png" },
    { id: 2, category_name: "Deep Cleaning", image_url: "/images/deepcleaning1nn.png" },
    { id: 3, category_name: "Waste Management", image_url: "/images/wastemanagement1nn.png" }, // now redirects
    { id: 4, category_name: "Bird Control", image_url: "/images/mosquito1nn.png" },
    { id: 5, category_name: "Disinfection", image_url: "/images/disinfection1nn.png" },
    { id: 6, category_name: "Scrap", image_url: "/images/scrap1nn.png" },
  ];

  const staticServices = [
    {
      id: "waste-mgmt-static",
      category_name: "Waste Management",
      image_url: "/images/wastemanagement1nn.png",
      isLocal: true
    },
    {
      id: "product-static",
      category_name: "Product",
      image_url: "/images/wastemanagement1nn.png",
      isLocal: true
    }
  ];

  // Create a single list of services to display
  // We want to combine dynamic services with our static ones
  const displayServices = [
    ...categoriesList.filter(s => s.category_name !== "Waste Management" && s.category_name !== "Product").slice(0, 4),
    ...staticServices
  ];

  // If the list is empty (loading), show fallback services
  const finalServices = categoriesList.length > 0 ? displayServices : fallbackServices;


  const renderModal = () => {
    const categoryName = showModal.category_name || showModal;
    let items = [];

    // Find the rich category data from our full /api/category fetch
    // This ensures we have the same data as the /services page (which works)
    const richCategory = fullCategories.find(c =>
      c.category_name === (showModal.category_name || showModal) ||
      c.id === showModal.id
    );

    // Use the rich data if found, otherwise fall back to what was passed in
    const sourceCategory = richCategory || showModal;

    // Prioritize Subcategories (Capitalized in /api/category) matches CategoryPage logic
    const subcats = sourceCategory.Subcategories || sourceCategory.subcategories;
    if (subcats && subcats.length > 0) {
      items = subcats.map(sub => {
        // match CategoryPage: prioritize app_icon
        const rawImage = sub.app_icon || sub.subcategory_icon || sub.icon_url || sub.image_url || sub.image || sub.subcategory_icon_url;

        let finalImage = null;

        if (rawImage) {
          if (typeof rawImage === 'string' && (rawImage.startsWith('http') || rawImage.startsWith('data:'))) {
            // Trust the full URL exactly as is, same as CategoryPage
            finalImage = rawImage;
          } else {
            // It's a relative path -> prepend base URL
            const baseUrl = config.API_URL.replace(/\/hommlieserver\/?$/, '');
            finalImage = `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;
          }
        } else {
          // Fallback if no image field is found
          if (sub.slug) {
            const prodStorageBase = "https://www.hommlie.com/storage/app/public/images/subcategory/";
            finalImage = `${prodStorageBase}${sub.slug}.png`;
          }
        }

        return {
          name: sub.subcategory_name || sub.name,
          image: finalImage || "/assets/images/placeholder.png",
          url: sub.url || `${config.VITE_BASE_URL}/subcategory/${sub.slug}`
        };
      });
    } else {
      items = serviceData[categoryName] || [];
    }

    if (items.length === 0) return null;

    return (
      <motion.div
        key="modal"
        className="fixed inset-0 bg-black/50 z-[999] sm:z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseDown={(e) => {
          // close when clicking backdrop
          if (e.target === e.currentTarget) setShowModal(null);
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <motion.div
          className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 h-[60vh] sm:h-[74vh] overflow-y-auto shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 id="service-modal-title" className="text-lg font-bold">
              {categoryName} Services
            </h2>
            <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-black" aria-label="Close">
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4">
            {items.map((sub, index) => (
              <a key={index} href={sub.url || "#"} className="flex flex-col items-center text-center p-2">
                <div className="flex flex-col items-center group transition-all relative cursor-pointer">
                  <div
                    className="border bg-[#f8f1dd] w-24 h-24 sm:w-28 sm:h-28 rounded-xl shadow-xl flex items-center justify-center
                               group-hover:shadow-lg group-hover:border-[#035240] group-hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xs mb-1 sm:text-sm font-medium mt-2 text-center">{sub.name}</h3>
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#035240] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
                {sub.price && (
                  <p className="text-xs text-[#52852d] font-bold">
                    {typeof sub.price === "number" || !isNaN(Number(sub.price))
                      ? `₹${Number(sub.price).toFixed(2)}`
                      : sub.price}
                  </p>
                )}
                {sub.note && (
                  <p className="text-[10px] text-gray-500 leading-tight text-center">{sub.note}</p>
                )}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="px-0 sm:px-4 py-0 sm:py-2 bg-cover bg-center bg-no-repeat">
      <h1 className="text-lg sm:text-2xl font-medium text-black mb-2 sm:mb-6 sm:ml-2">
        Home services at your doorstep
      </h1>

      <div className="sm:border sm:border-gray-300 sm:rounded-xl sm:p-4 sm:shadow-md sm:mx-0 sm:w-full mb-2">
        {/* Unified Grid: 6 Cards in 3 columns */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-0">
          {finalServices.map((service) => (
            <div
              key={service.id || service.name}
              onClick={() => handleServiceClick(service)}
              className="flex flex-col items-center group transition-all cursor-pointer relative"
            >
              <div
                className="w-full h-[80px] sm:h-[96px] bg-[#f8f1dd] rounded-xl shadow-xl flex items-center justify-center border 
                           group-hover:shadow-lg group-hover:border-[#035240] group-hover:scale-105 transition-all duration-300"
              >
                <img
                  src={(() => {
                    const rawImage = service.icon_url || service.image_url || service.image || service.app_icon || service.category_icon;
                    if (rawImage && !rawImage.startsWith('http') && !rawImage.startsWith('data:')) {
                      const baseUrl = config.API_URL.replace(/\/hommlieserver\/?$/, '');
                      return `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;
                    }
                    return rawImage;
                  })()}
                  alt={service.category_name || service.name}
                  className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="mt-3 mb-2 text-[13px] sm:text-l font-medium text-gray-800 text-center leading-tight whitespace-normal">
                {service.category_name || service.name}
              </span>
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#035240] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>



      </div>

      {/* Category modal */}
      <AnimatePresence>{showModal && renderModal()}</AnimatePresence>

      {/* Coming soon modal */}
      <AnimatePresence>
        {showComingSoon && (
          <ComingSoonModal
            isOpen={!!showComingSoon}
            onClose={() => setShowComingSoon(false)}
            source={showComingSoon}
          />
        )}
      </AnimatePresence>

      {/* Callback Modal */}
      <Requestacallback
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        source="homepage_grid"
      />
    </div>
  );
};

export default ServiceGrid;