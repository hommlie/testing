import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ComingSoonModal from "../ComingSoonPage";
import { FaEllipsisH } from "react-icons/fa";

const ServiceGrid = () => {
  const [showModal, setShowModal] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

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
  const comingSoonServices = ["Scrap", "AC Services", "Plumbing", "Painting"];

  const handleServiceClick = (serviceName) => {
  if (comingSoonServices.includes(serviceName) || serviceName === "See More") {
    setShowModal(null); // ensure standard modal is closed
    setShowComingSoon(serviceName); // pass the triggering service name
  } else {
    setShowModal(serviceName);
  }
};


  const serviceData = {
    "Pest Control": [
      { name: "Cockroach Control", image: "/images/cockicon.png", url: "/subcategory/cockroach-control-services-in-bangalore" },
      { name: "Rodent Control", image: "/images/rodenticon.png", url: "/subcategory/rodent-control-in-bangalore" },
      { name: "Mosquito Control", image: "/images/mosquitoicon.png", url: "/subcategory/mosquito-control-in-bangalore" },
      { name: "Flies Management", image: "/images/fliesicon.png", url: "/subcategory/flies-pest-control-in-bangalore" },
      { name: "Weed Management", image: "/images/weedicon.png", url: "/subcategory/pest-control-weed-management" },
      { name: "Wood Borer", image: "/images/woodborericon.png", url: "/subcategory/wood-borer-control-in-bangalore" },
      { name: "Bedbugs Control", image: "/images/bedbugicon.png", url: "/subcategory/bed-bug-control-services-in-bangalore" },
      { name: "Honey Bee Removal", image: "/images/beeicon.png", url: "/subcategory/honey-bee-removal-services-in-bangalore" },
      { name: "Termite Treatment", image: "/images/termiteicon.png", url: "/subcategory/termite-control-services-in-bangalore" },
    ],
    "Deep Cleaning": [
      // { name: "Sofa Cleaning", image: "/images/sofaicon.png", url: "/subcategory/top-sofa-cleaning-services-in-bangalore" },
      // { name: "Bathroom Cleaning", image: "/images/bathroomicon.png", url: "/subcategory/professional-bathroom-cleaning-services-in-bangalore" },
      // { name: "Kitchen Cleaning", image: "/images/kitchenicon.png", url: "/subcategory/top-kitchen-cleaning-services-in-bangalore" },
      { name: "Full Home Cleaning – Apartment", image: "/images/apartmenticon.png", url: "/subcategory/home-cleaning-services-in-bangalore" },
      { name: "Full Home Cleaning – Bungalow/Duplex", image: "/images/bunglowicon.png", url: "/subcategory/top-home-cleaning-services-in-bangalore" },
    ],
    "Mosquito & Safety Net": [
      { name: "Mosquito Mesh - Balcony", image: "/images/balconyicon.png", url: "/subcategory/mosquito-mesh-services-in-bangalore" },
      { name: "Mosquito Mesh Doors", image: "/images/dooricon.png", url: "/subcategory/mosquito-mesh-door-services-in-bangalore" },
      { name: "Mosquito Net - Windows", image: "/images/windowicon.png", url: "/subcategory/mosquito-net-for-windows-in-bangalore" },
      { name: "Anti Bird Spikes", image: "/images/antibridicon.png", url: "/subcategory/anti-bird-spikes" },
      { name: "Bird Netting", image: "/images/nettingicon.png", url: "/subcategory/bird-netting-for-balcony-in-bangalore" },
      // { name: "Balcony Safety Net", image: "/images/balconyneticon.png", url: "#" },
    ],
    "Disinfection": [
      { name: "Disinfection", image: "/images/disinfection.png", url: "/subcategory/disinfection-services-near-you-in-bangalore" },
    ],
    "Scrap": [
      { name: "Newspaper", image: "/images/newspaper-icon.png", price: "₹14/KG", note: "Market rates dropped recently", isComingSoon: true },
      { name: "Cardboard", image: "/images/cardboard-icon.png", price: "₹8/KG", note: "Call for bulk quantity quote" },
      { name: "Office Paper (A3/A4)", image: "/images/paper-icon.png", price: "₹8/KG" },
      { name: "Copies/Books", image: "/images/book-icon.png", price: "₹24/KG" },
      { name: "Clothes", image: "/images/clothes-icon.png", price: "₹40/KG", note: "Accepted only with other scrap items (No undergarments)" },
      { name: "Glass Bottles", image: "/images/glass-icon.png", price: "₹105/KG", note: "Accepted only with other scrap items" },
      { name: "PET Bottles/Other Plastic", image: "/images/plastic-icon.png", price: "₹14/KG" },
      { name: "Iron", image: "/images/iron-icon.png", price: "₹12/KG", note: "Call for bulk quantity quote" },
      { name: "Steel Utensils", image: "/images/utensils-icon.png", price: "₹2/KG" },
    ],
    "AC Services": [
      { name: "AC Installation", image: "/images/ac-install.png", url: "#" },
      { name: "Gas Refill", image: "/images/ac-gas.png", url: "#" },
      { name: "AC Servicing", image: "/images/ac-service.png", url: "#" },
      { name: "AC Repair", image: "/images/ac-repair.png", url: "#" },
    ],
    "Plumbing": [
      { name: "Leak Repair", image: "/images/leak.png", url: "#" },
      { name: "Drain Cleaning", image: "/images/drain.png", url: "#" },
      { name: "Fitting Installation", image: "/images/fitting.png", url: "#" },
      { name: "Water Heater", image: "/images/geyser.png", url: "#" },
    ],
    "Painting": [
      { name: "Interior Painting", image: "/images/wallpaint.png", url: "#" },
      { name: "Texture Finish", image: "/images/texture.png", url: "#" },
      { name: "Waterproofing", image: "/images/waterproof.png", url: "#" },
      { name: "Wood Paint", image: "/images/woodpaint.png", url: "#" },
    ],
  };

  const services = [
    { id: 1, name: "Pest Control", image: "/images/pestcontrol1.png" },
    { id: 2, name: "Deep Cleaning", image: "/images/deepcleaning1.png" },
    { id: 3, name: "Scrap", image: "/images/scrap1.png" },
    { id: 4, name: "Mosquito & Safety Net", image: "/images/mosquito1.png" },
    { id: 5, name: "Disinfection", image: "/images/disinfection1.png" },
    // { id: 6, name: "AC Services", image: "/images/ac1.png" },
    // { id: 7, name: "Plumbing", image: "/images/plumbing1.png" },
    // { id: 8, name: "Painting", image: "/images/painting1.png" },
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
          className="bg-white w-full max-w-lg rounded-t-2xl  sm:rounded-lg p-4 sm:p-6 sm:mb-0 mb-0 h-[60vh] sm:h-[80vh] overflow-y-auto"
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
                <h3 className="text-xs sm:text-sm font-semibold mt-2">{sub.name}</h3>
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
    <div className="p-4 mb-0 bg-cover bg-center bg-no-repeat mt-4">
      <h2 className="text-lg sm:text-xl font-medium text-black sm:ml-7 -ml-4 sm:mb-6 -mt-2 mb-2 sm:mb-0 sm:-mt-4">
        On-demand Home Services In Bangalore
      </h2>
      <div className="sm:border sm:border-gray-300 sm:rounded-xl sm:p-4 sm:shadow-md ml-1">
        <div className="grid grid-cols-3 gap-x-16 gap-y-3 sm:gap-x-5 sm:gap-y-3 mb-2">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.name)}
              className="flex flex-col items-center group transition-all cursor-pointer"
            >
              <div className="mt-4 w-[110px] h-[80px] sm:w-[128px] sm:h-[96px] bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center group-hover:shadow-md transition border border-black">
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
              <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-800 text-center">
                {service.name}
              </span>
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
            source={showComingSoon} // pass which service triggered this
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceGrid;