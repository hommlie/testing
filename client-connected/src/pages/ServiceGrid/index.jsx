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
import { ChevronRight, Zap, ShoppingBag, Building2 } from "lucide-react";

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
    { name: "Full Home Cleaning \u2013 Apartment", image: "/images/apartmenticon.png", url: "/subcategory/home-cleaning-services-in-bangalore" },
    { name: "Full Home Cleaning \u2013 Bungalow/Duplex", image: "/images/bunglowicon.png", url: "/subcategory/top-home-cleaning-services-in-bangalore" },
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
    items = [];
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
            <h2 className="text-xl font-semibold text-[#033053] tracking-tight">
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
              <div className="relative mb-3 w-full aspect-square bg-[#F3E8D0] border border-[#eee4c5] rounded-2xl flex items-center justify-center p-1 shadow-sm transition-all duration-500 group-hover:border-[#035240] group-hover:shadow-md">
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
                <p className="text-[11px] text-[#0463ac] font-semibold mt-1">
                  {typeof sub.price === "number" || !isNaN(Number(sub.price))
                    ? `\u20b9${Number(sub.price).toFixed(0)}`
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

const ServiceGrid = ({ categories: propCategories, mobileAfterTabs = null }) => {
  const [showModal, setShowModal] = useState(null);           // category drilldown modal (e.g., Pest Control)
  const [showComingSoon, setShowComingSoon] = useState(false); // "Coming Soon" modal for placeholder services
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const navigate = useNavigate();
  const { categoryData } = useCont();

  // Use derived categories from context or props to avoid redundant state/fetches
  const categoriesList = (categoryData?.data && categoryData.data.length > 0) ? categoryData.data : (propCategories || []);
  const fullCategories = categoriesList;

  const locationSearch = useLocation();

  // Close modal on route change and keep tab in sync
  useEffect(() => {
    setShowModal(null);
    setShowComingSoon(false);

    if (locationSearch.pathname.startsWith("/product")) {
      setActiveTab("products");
    } else {
      setActiveTab("services");
    }
  }, [locationSearch.pathname]);

  // Track mobile viewport
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock body scroll when any modal is open on mobile
  useEffect(() => {
    const isMobileView = typeof window !== "undefined" ? window.innerWidth < 640 : false;
    if ((showModal || showComingSoon) && isMobileView) {
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

  // Extract Pest Control subcategories directly
  // Uses the same `all_categories` data from /api/homepage that ServiceSection uses
  // Try to align with the same Pest category used in the mobile booking form
  const pestControlCategory = categoriesList.find(c => {
    const label = (c.category_name || c.name || '').toLowerCase();
    return label === 'pest control' || label === 'home pest control' || label.includes('pest');
  });
  const pestSubcats = pestControlCategory
    ? (pestControlCategory.subcategories || pestControlCategory.Subcategories || [])
    : [];

  const pestControlItems = pestSubcats.map(sub => {
    const rawImage = sub.app_icon || sub.subcategory_icon || sub.icon_url || sub.image_url || sub.image || sub.subcategory_icon_url;
    let finalImage = null;
    if (rawImage) {
      if (typeof rawImage === 'string' && (rawImage.startsWith('http') || rawImage.startsWith('data:'))) {
        finalImage = rawImage;
      } else {
        const baseUrl = config.API_URL.replace(/\/hommlieserver\/?$/, '');
        finalImage = `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`;
      }
    } else if (sub.slug) {
      finalImage = `https://www.hommlie.com/storage/app/public/images/subcategory/${sub.slug}.png`;
    }
    const isPage = sub.is_page ?? (sub.category?.is_page) ?? (pestControlCategory?.is_page) ?? 1;
    const routePrefix = isPage === 1 ? '/subcategory' : '/products';
    return {
      name: sub.subcategory_name || sub.name,
      image: finalImage || '/assets/images/placeholder.png',
      slug: sub.slug,
      url: sub.slug ? `${config.VITE_BASE_URL}${routePrefix}/${sub.slug}` : sub.url,
    };
  }).sort((a, b) => (a.name || '').toLowerCase().localeCompare((b.name || '').toLowerCase()));

  const displayPestItems = pestControlItems;

  if (displayPestItems.length === 0) return null;

  return (
    <div className="w-full sm:w-fit ml-0 sm:ml-4 px-0 py-0 sm:px-0 sm:py-4 sm:-mt-3 bg-cover bg-center bg-no-repeat">
      {/* Mobile Alerts - Only show if provided */}
      {isMobile && mobileAfterTabs && (
        <div className="w-full px-4 mb-4 sm:hidden">
          {mobileAfterTabs}
        </div>
      )}

      <div className="flex justify-center mb-4 relative z-10 sm:-mt-6">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-[18px] sm:text-[24px] font-semibold text-[#033053] tracking-tight whitespace-nowrap"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            What pest problem are you facing?
          </motion.h1>
          <motion.p
            className="mt-1 text-[11px] sm:text-sm text-gray-500"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 }
              }
            }}
          >
            Select a pest to see instant pricing &amp; plans.
          </motion.p>
        </motion.div>
      </div>

      <div className="bg-transparent sm:bg-white border-0 sm:border border-gray-100 rounded-none sm:rounded-3xl p-0.5 sm:p-2 shadow-none sm:shadow-sm mb-0 w-full sm:w-full">
        {/* Pest Control Subcategory Grid - consistently 3 per row */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mb-0">
          {displayPestItems.map((sub, index) => (
            <motion.div
              key={sub.slug || sub.name}
              onClick={() => {
                if (sub.url) {
                  if (sub.url.startsWith('http')) {
                    window.open(sub.url, '_blank');
                  } else {
                    navigate(sub.url.startsWith('/') ? sub.url : `/${sub.url}`);
                  }
                }
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="relative flex flex-col items-center py-2 px-1 sm:py-1 sm:px-1 cursor-pointer group transition-all duration-300"
            >
              <div className="relative mb-2 z-10 w-full px-1 sm:px-1.5">
                <motion.div
                  className="w-full h-16 sm:h-20 md:h-20 lg:h-20 bg-[#f5f5f5] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-[#ebebeb]"
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col items-center text-center z-10 w-full px-0.5">
                <div className="relative group/text">
                  <span className="text-[11px] sm:text-[13px] font-normal text-gray-700 group-hover:text-black transition-all duration-300 leading-tight text-center block w-full">
                    {sub.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile-only full-height image below Premium Pest Control Services */}
      <div className="block sm:hidden w-full h-[464px] mt-4">
        <img
          src="/images/homebg.jpeg"
          alt="Premium Pest Control Services"
          className="w-full h-[464px] object-cover"
        />
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
    </div>
  );
};

export default ServiceGrid;