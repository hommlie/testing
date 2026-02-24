import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonModal from "../ComingSoonPage";
import { useNavigate, useLocation } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import config from "../../config/config";
import axios from "axios";
import Requestacallback from "../Requestacallback";
import { ChevronRight, Zap } from "lucide-react";

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

const ServiceModal = ({ data, onClose, fullCategories }) => {
  const navigate = useNavigate();
  const categoryName = data.category_name || data;
  let items = [];

  // Find the rich category data
  const richCategory = fullCategories.find(c =>
    c.category_name === (data.category_name || data) ||
    c.id === data.id
  );

  const sourceCategory = richCategory || data;

  // Prioritize Subcategories
  const subcats = sourceCategory.Subcategories || sourceCategory.subcategories;
  if (subcats && subcats.length > 0) {
    items = subcats.map(sub => {
      const rawImage = sub.app_icon || sub.subcategory_icon || sub.icon_url || sub.image_url || sub.image || sub.subcategory_icon_url;
      let finalImage = null;

      if (rawImage) {
        if (typeof rawImage === 'string' && (rawImage.startsWith('http') || rawImage.startsWith('data:'))) {
          finalImage = rawImage;
        } else {
          const baseUrl = config.API_URL.replace(/\/hommlieserver\/?$/, '');
          finalImage = `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;
        }
      } else {
        if (sub.slug) {
          const prodStorageBase = "https://www.hommlie.com/storage/app/public/images/subcategory/";
          finalImage = `${prodStorageBase}${sub.slug}.png`;
        }
      }

      const isPage = sub.is_page ?? (sub.category?.is_page) ?? (sourceCategory?.is_page) ?? 1;
      const routePrefix = isPage === 1 ? "/subcategory" : "/products";

      return {
        name: sub.subcategory_name || sub.name,
        image: finalImage || "/assets/images/placeholder.png",
        slug: sub.slug,
        is_page: isPage,
        url: sub.slug ? `${config.VITE_BASE_URL}${routePrefix}/${sub.slug}` : sub.url
      };
    });
  } else {
    items = serviceData[categoryName] || [];
  }

  // Alphabetical Sorting
  items.sort((a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (items.length === 0) return null;

  return (
    <motion.div
      key="modal-backdrop"
      className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        key="modal-content"
        className="bg-white w-full max-w-lg rounded-t-[2rem] rounded-b-none sm:rounded-2xl p-4 sm:p-6 h-[70vh] sm:h-[74vh] overflow-y-auto shadow-2xl flex flex-col relative"
        initial={isMobile ? { y: "100%" } : { y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={isMobile ? { y: "100%" } : { y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        <div className="flex justify-between items-center mb-6 px-2">
          <div>
            <h2 className="text-xl font-black text-[#033053] tracking-tight">
              {categoryName}
            </h2>
            <div className="h-1 w-8 bg-[#0463ac] rounded-full mt-1" />
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#0463ac] hover:bg-blue-50 transition-all shadow-sm"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {items.map((sub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => {
                onClose();
                if (sub.url) {
                  if (sub.url.startsWith('http')) {
                    window.open(sub.url, "_blank");
                  } else {
                    const target = sub.url.startsWith('/') ? sub.url : `/${sub.url}`;
                    navigate(target);
                  }
                }
              }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative mb-3 w-full aspect-square bg-[#FCF6E0] border border-[#eee4c5] rounded-2xl flex items-center justify-center p-1 shadow-sm transition-all duration-500 group-hover:border-[#035240] group-hover:shadow-md">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-[95%] h-[95%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                />
              </div>

              <div className="flex flex-col items-center text-center px-0.5 relative group/text">
                <h3 className="text-[11px] sm:text-[14px] font-semibold text-[#033053]/90 group-hover:text-[#035240] transition-all duration-300 leading-tight uppercase tracking-tight">
                  {sub.name}
                </h3>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#035240] transition-all duration-300 group-hover:w-[90%] opacity-0 group-hover:opacity-100" />
              </div>

              {sub.price && (
                <p className="text-[11px] text-[#0463ac] font-bold mt-1">
                  {typeof sub.price === "number" || !isNaN(Number(sub.price))
                    ? `₹${Number(sub.price).toFixed(0)}`
                    : sub.price}
                </p>
              )}

              {sub.note && (
                <p className="text-[9px] text-gray-400 leading-tight text-center mt-1 scale-90 opacity-80">{sub.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

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

  const locationSearch = useLocation();

  // Close modal on route change
  useEffect(() => {
    setShowModal(null);
    setShowComingSoon(false);
  }, [locationSearch.pathname]);

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

    if (serviceName.toLowerCase() === "scrap") {
      navigate(`${config.VITE_BASE_URL}/scrap`);
      return;
    }

    if (serviceName.toLowerCase() === "waste management") {
      window.open("https://www.ecospherewm.com/", "_blank");
      return;
    }

    if (serviceName.toLowerCase() === "commercial pest control") {
      window.open("https://b2b.hommlie.com/", "_blank");
      return;
    }

    if (serviceName.toLowerCase() === "product" || serviceName.toLowerCase() === "hommlie store" || serviceName.toLowerCase() === "hommlie shop" || serviceName.toLowerCase() === "hommlie.shop") {
      window.open("https://hommlie.shop/", "_blank");
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

  const fallbackServices = [
    { id: 1, category_name: "Pest Control", image_url: "/images/pestcontrol1nn.png" },
    { id: 2, category_name: "Deep Cleaning", image_url: "/images/deepcleaning1nn.png" },
    { id: 3, category_name: "Waste Management", image_url: "/images/wastemanagement1nn.png" }, // now redirects
    { id: 4, category_name: "Bird Control", image_url: "/images/mosquito1nn.png" },
    { id: 5, category_name: "Disinfection", image_url: "/images/disinfection1nn.png" },
    { id: 6, category_name: "Scrap", image_url: "/images/scrap1nn.png" },
  ];

  // Create a single list of services to display
  // We want to combine dynamic services with our static ones
  const displayServices = categoriesList;

  // If the list is empty (loading), show fallback services
  const finalServices = categoriesList.length > 0 ? displayServices : fallbackServices;




  return (
    <div className="w-full sm:w-fit ml-0 sm:ml-4 px-0 py-0 sm:px-0 sm:py-4 sm:-mt-3 bg-cover bg-center bg-no-repeat">
      <div className="flex justify-center mb-4 relative z-10 sm:-mt-6">
        <motion.h1
          className="text-[17px] sm:text-xl font-bold text-center relative inline-block whitespace-nowrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="mt-2 sm:mt-0 bg-clip-text text-transparent bg-gradient-to-r from-[#033053] via-[#0463ac] to-[#033053] bg-[length:200%_auto] block pb-1"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                backgroundPosition: ["0% 50%", "200% 50%"],
                transition: {
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }
                }
              }
            }}
          >
            Premium Home PestControl Services
          </motion.span>
          <motion.div
            className="h-1 w-16 bg-gradient-to-r from-[#0463ac] to-[#034d85] mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h1>
      </div>

      <div className="bg-transparent sm:bg-white border-0 sm:border border-gray-100 rounded-none sm:rounded-3xl p-0.5 sm:p-4 shadow-none sm:shadow-sm mb-0 w-full sm:w-full">
        {/* Premium Super-Compact Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-0">
          {finalServices.map((service, index) => {
            const name = service.category_name || service.name;

            return (
              <motion.div
                key={service.id || service.name}
                onClick={() => handleServiceClick(service)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="relative flex flex-col items-center py-2 px-0.5 sm:py-5 sm:px-1 cursor-pointer group transition-all duration-300"
              >


                <div className="relative mb-2 z-10 w-full px-1 sm:px-2">
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                    className="w-full h-28 sm:h-36 bg-[#FCF6E0] border border-[#eee4c5] shadow-sm rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:border-[#035240] group-hover:shadow-md"
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
                      alt={name}
                      className="w-[90%] h-[90%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col items-center text-center z-10 w-full px-1">
                  <div className="relative group/text">
                    <span className="text-[10px] sm:text-[13px] font-bold text-[#033053]/90 group-hover:text-[#035240] transition-all duration-300 leading-tight uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {name}
                    </span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#035240] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </div>


                </div>
              </motion.div>
            );
          })}
        </div>



      </div>

      {/* Category modal - PORTAL */}
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <ServiceModal data={showModal} onClose={() => setShowModal(null)} fullCategories={fullCategories} />
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Coming soon modal */}
      {createPortal(
        <AnimatePresence>
          {showComingSoon && (
            <ComingSoonModal
              isOpen={!!showComingSoon}
              onClose={() => setShowComingSoon(false)}
              source={showComingSoon}
            />
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Callback Modal */}
      <Requestacallback
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        source="homepage_grid"
      />
    </div >
  );
};

export default ServiceGrid;