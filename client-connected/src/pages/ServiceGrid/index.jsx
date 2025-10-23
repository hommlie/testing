import { useState, useEffect } from 'react';
import { FaTimes, FaEllipsisH } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ComingSoonModal from "../ComingSoonPage";
import { useNavigate } from "react-router-dom";

const ServiceGrid = () => {
  const [showModal, setShowModal] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

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

  // ✅ List of services to show "Coming Soon"
  const comingSoonServices = ["AC Services", "Plumbing", "Painting"];

  const handleServiceClick = (serviceName) => {
    // Redirect Scrap to /scrap
    if (serviceName === "Scrap") {
      navigate("/scrap");
      return;
    }
    if (comingSoonServices.includes(serviceName) || serviceName === "See More") {
      setShowModal(null);
      setShowComingSoon(serviceName);
    } else {
      setShowModal(serviceName);
    }
  };

  // Removed "Scrap" details from here
  const serviceData = {
    "Pest Control": [
      { name: "Cockroach & Ant Gel Treatment", image: "/images/genralpestcontrol.png", url: "/subcategory/general-pest-control" },
      { name: "Cockroach control", image: "/images/cockicon.png", url: "/subcategory/cockroach-control-services-in-bangalore" },
      { name: "Bedbugs Treatment", image: "/images/bedbugicon.png", url: "/subcategory/bed-bug-control-services-in-bangalore" },
      { name: "Rodent Control", image: "/images/rodenticon.png", url: "/subcategory/rodent-control-in-bangalore" },
      { name: "Mosquito control", image: "/images/mosquitoicon.png", url: "/subcategory/mosquito-control-in-bangalore" },
      { name: "Termite control", image: "/images/termiteicon.png", url: "/subcategory/termite-control-services-in-bangalore" },
      // { name: "Flies Management", image: "/images/fliesicon.png", url: "/subcategory/flies-pest-control-in-bangalore" },
      // { name: "Weed Management", image: "/images/weedicon.png", url: "/subcategory/pest-control-weed-management" },
      // { name: "Wood Borer", image: "/images/woodborericon.png", url: "/subcategory/wood-borer-control-in-bangalore" },
    ],
    "Deep Cleaning": [
      { name: "Full Home Cleaning – Apartment", image: "/images/apartmenticon.png", url: "/subcategory/home-cleaning-services-in-bangalore" },
      { name: "Full Home Cleaning – Bungalow/Duplex", image: "/images/bunglowicon.png", url: "/subcategory/top-home-cleaning-services-in-bangalore" },
    ],
    "Safety Net": [
      { name: "Mosquito Mesh - Balcony", image: "/images/balconyicon.png", url: "/subcategory/mosquito-mesh-services-in-bangalore" },
      { name: "Mosquito Mesh Doors", image: "/images/dooricon.png", url: "/subcategory/mosquito-mesh-door-services-in-bangalore" },
      { name: "Mosquito Net - Windows", image: "/images/windowicon.png", url: "/subcategory/mosquito-net-for-windows-in-bangalore" },
      { name: "Anti Bird Spikes", image: "/images/antibridicon.png", url: "/subcategory/anti-bird-spikes" },
      { name: "Bird Netting", image: "/images/nettingicon.png", url: "/subcategory/bird-netting-for-balcony-in-bangalore" },
    ],
    "Disinfection": [
      { name: "Disinfection", image: "/images/disinfection.png", url: "/subcategory/disinfection-services-near-you-in-bangalore" },
    ],
    // (No "Scrap" section here anymore)
  };

  const services = [
    { id: 1, name: "Pest Control", image: "/images/pestcontrol1nn.png" },
    { id: 2, name: "Deep Cleaning", image: "/images/deepcleaning1nn.png" },
    { id: 3, name: "Scrap", image: "/images/scrap1nn.png" }, // will redirect
    { id: 4, name: "Safety Net", image: "/images/mosquito1nn.png" },
    { id: 5, name: "Disinfection", image: "/images/disinfection1nn.png" },
    {
      id: 9,
      name: "See More",
      icon: <FaEllipsisH className="text-3xl text-[#035240]" />,
      isIconOnly: true,
    },
  ];

  const renderModal = () => {
    const items = serviceData[showModal] || [];
    return (
      <motion.div
        key="modal"
        className="fixed inset-0 bg-black bg-opacity-50 z-[999] sm:z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.div
          className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-lg p-4 sm:p-6 sm:mb-0 mb-0 h-[60vh] sm:h-[74vh] overflow-y-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg font-bold">{showModal} Services</h2>
            <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-black">
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4">
            {items.map((sub, index) => (
              <a
                key={index}
                href={sub.url || '#'}
                className="flex flex-col items-center text-center p-2 hover:shadow transition rounded-lg"
              >
                <div className="border border-black w-24 h-24 sm:w-28 sm:h-28 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-medium mt-2">{sub.name}</h3>
                {sub.price && <p className="text-xs text-[#52852d] font-bold">{sub.price}</p>}
                {sub.note && <p className="text-[10px] text-gray-500 leading-tight text-center">{sub.note}</p>}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 mb-0 bg-cover bg-center bg-no-repeat">
      <h1 className="text-lg sm:text-2xl font-medium text-black sm:ml-2 -ml-4 sm:mb-6 -mt-2 mb-2 sm:mb-0 sm:-mt-5">
        Home services at your doorstep
      </h1>
      <div className="sm:border sm:border-gray-300 sm:rounded-xl sm:p-4 sm:shadow-md ml-2">
        <div className="grid grid-cols-3 gap-x-16 gap-y-3 sm:gap-x-5 sm:gap-y-3 mb-2">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.name)}
              className="flex flex-col items-center group transition-all cursor-pointer relative" // added 'group' and 'relative'
            >
              <div className="mt-4 w-[110px] h-[80px] sm:w-[128px] sm:h-[96px] bg-[#f8f1dd] rounded-xl shadow-xl flex items-center justify-center group-hover:shadow-md transition border">
                {service.isIconOnly ? (
                  service.icon
                ) : (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] object-contain"
                  />
                )}
              </div>
              <span className="mt-2 mb-2 text-[13px] sm:text-l font-medium text-gray-800 text-center leading-tight truncate sm:whitespace-normal max-w-[90px] group-hover:decoration-[#035240] group-hover:decoration-2">
                {service.name}
              </span>
              
              {/* Add underline on hover */}

              <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-[#035240] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
            </div>
          ))}
        </div>
      </div>

      {/* Standard Modal */}
      <AnimatePresence>{showModal && renderModal()}</AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <ComingSoonModal
            isOpen={!!showComingSoon}
            onClose={() => setShowComingSoon(false)}
            source={showComingSoon}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceGrid;
