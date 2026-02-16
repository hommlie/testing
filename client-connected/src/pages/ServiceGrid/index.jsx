import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonModal from "../ComingSoonPage";
import { useNavigate, useLocation } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import config from "../../config/config";
import axios from "axios";
import Requestacallback from "../Requestacallback";
import { ChevronRight, Zap } from "lucide-react";

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

    if (serviceName === "Scrap") {
      navigate(`${config.VITE_BASE_URL}/scrap`);
      return;
    }

    if (serviceName === "Waste Management") {
      window.open("https://www.ecospherewm.com/", "_blank");
      return;
    }

    if (serviceName.toLowerCase() === "commercial pest control") {
      window.open("https://b2b.hommlie.com/", "_blank");
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
      id: "commercial-static",
      category_name: "Commercial Pest Control",
      image_url: "/images/wastemanagement1nn.png",
      isLocal: true
    },
    {
      id: "waste-mgmt-static",
      category_name: "Waste Management",
      image_url: "/images/wastemanagement1nn.png",
      isLocal: true
    },
    {
      id: "store-static",
      category_name: "Hommlie Store",
      image_url: "/images/wastemanagement1nn.png",
      isLocal: true
    },
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

        const isPage = sub.is_page ?? (sub.category?.is_page) ?? (sourceCategory?.is_page) ?? 1;
        const routePrefix = isPage === 1 ? "/subcategory" : "/products";

        return {
          name: sub.subcategory_name || sub.name,
          image: finalImage || "/assets/images/placeholder.png",
          slug: sub.slug,
          is_page: isPage,
          // Prioritize dynamic slug path over any weird API url
          url: sub.slug ? `${config.VITE_BASE_URL}${routePrefix}/${sub.slug}` : sub.url
        };
      });
    } else {
      items = serviceData[categoryName] || [];
    }

    // Alphabetical Sorting A to Z
    items.sort((a, b) => {
      const nameA = (a.name || "").toLowerCase();
      const nameB = (b.name || "").toLowerCase();
      return nameA.localeCompare(nameB);
    });

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
          className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 h-[65vh] sm:h-[74vh] overflow-y-auto shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-6 px-2">
            <div>
              <h2 id="service-modal-title" className="text-xl font-black text-[#033053] tracking-tight">
                {categoryName}
              </h2>
              <div className="h-1 w-8 bg-[#0463ac] rounded-full mt-1" />
            </div>
            <button
              onClick={() => setShowModal(null)}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => {
                  setShowModal(null);
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
                <div className="relative mb-1 w-full aspect-square flex items-center justify-center p-0 transition-all duration-500">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                  />
                </div>

                <div className="flex flex-col items-center text-center px-0.5">
                  <h3 className="text-[11px] sm:text-[14px] font-semibold text-[#033053] group-hover:text-[#0463ac] transition-colors leading-tight uppercase tracking-tight">
                    {sub.name}
                  </h3>
                  <div className="h-0.5 w-0 group-hover:w-6 bg-[#0463ac]/40 rounded-full mt-1.5 transition-all duration-500" />
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

  return (
    <div className="px-2 sm:px-4 py-0 sm:py-4 mt-0 sm:mt-0 bg-cover bg-center bg-no-repeat">
      <motion.h1
        className="text-lg sm:text-2xl mb-3 sm:mb-0 font-medium text-black sm:mb-6 sm:ml-2 flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {"Home services at your doorstep - ".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        <motion.span
          className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#035240] via-[#25D366] to-[#035240] bg-[length:200%_auto] inline-block"
          variants={{
            hidden: { clipPath: "inset(0 100% 0 0)", backgroundPosition: "0% 50%" },
            visible: {
              clipPath: "inset(0 0 0 0)",
              backgroundPosition: ["0% 50%", "200% 50%"],
              transition: {
                clipPath: { duration: 0.8, ease: "linear" },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear", repeatType: "loop" },
              },
            },
          }}
        >
          Hommlie
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[20px] sm:h-[28px] bg-[#035240] ml-1 align-middle"
        />
      </motion.h1>

      <div className="sm:border sm:border-gray-300 sm:rounded-xl sm:p-4 sm:shadow-md sm:mx-0 sm:w-full mb-0">
        {/* Premium Super-Compact Grid */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-4 mb-0">
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
                className="relative flex flex-col items-center py-4 px-2 sm:p-5 cursor-pointer group transition-all duration-300"
              >
                {/* Minimalist Hover Background */}
                <div className="absolute inset-0 bg-gray-50/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative mb-3 z-10">
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
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50/50 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-[#0463ac]/5 border border-transparent group-hover:border-gray-100"
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
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col items-center text-center z-10 w-full px-1">
                  <span className="text-[12px] sm:text-[15px] font-semibold text-[#033053] group-hover:text-[#0463ac] transition-colors leading-[1.2] uppercase tracking-normal">
                    {name}
                  </span>

                  {name.toLowerCase().includes("home pest control") && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 mt-1 bg-blue-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-blue-100"
                    >
                      <Zap size={10} className="text-[#0463ac] fill-[#0463ac]" />
                      <span className="text-[9px] font-black text-[#0463ac] uppercase tracking-tighter">Insta Service</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
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
    </div >
  );
};

export default ServiceGrid;