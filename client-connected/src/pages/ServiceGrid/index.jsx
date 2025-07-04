import { useState } from 'react';
import { FaEllipsisH, FaTimes } from 'react-icons/fa';

const ServiceGrid = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showPestModal, setShowPestModal] = useState(false);
  const [showDeepCleanModal, setShowDeepCleanModal] = useState(false);
  const [showScrapModal, setShowScrapModal] = useState(false);
  const [showMosquitoNetModal, setShowMosquitoNetModal] = useState(false);

  const pestSubServices = [
    { name: "Cockroach Control", image: "/images/cockicon.png", url: "/subcategory/cockroach-control-services-in-bangalore" },
    { name: "Rodent Control", image: "/images/cockicon.png", url: "/subcategory/rodent-control-in-bangalore" },
    { name: "Mosquito Control", image: "/images/cockicon.png", url: "/subcategory/mosquito-control-in-bangalore" },
    { name: "Flies Management", image: "/images/cockicon.png", url: "/subcategory/flies-pest-control-in-bangalore" },
    { name: "Weed Management", image: "/images/cockicon.png", url: "/subcategory/pest-control-weed-management" },
    { name: "Wood Borer", image: "/images/cockicon.png", url: "/subcategory/wood-borer-control-in-bangalore" },
    { name: "Bedbugs Control", image: "/images/cockicon.png", url: "/subcategory/bed-bug-control-services-in-bangalore" },
    { name: "Honey Bee Removal", image: "/images/cockicon.png", url: "/subcategory/honey-bee-removal-services-in-bangalore" },
    { name: "Termite Treatment", image: "/images/cockicon.png", url: "/subcategory/termite-control-services-in-bangalore" },
  ];

  const deepCleanSubServices = [
    { name: "Sofa Cleaning", image: "/images/cockicon.png", url: "/subcategory/top-sofa-cleaning-services-in-bangalore" },
    { name: "Bathroom Cleaning", image: "/images/cockicon.png", url: "/subcategory/professional-bathroom-cleaning-services-in-bangalore" },
    { name: "Kitchen Cleaning", image: "/images/cockicon.png", url: "/subcategory/top-kitchen-cleaning-services-in-bangalore" },
    { name: "Full Home Cleaning – Apartment", image: "/images/cockicon.png", url: "/subcategory/home-cleaning-services-in-bangalore" },
    { name: "Full Home Cleaning – Bungalow/Duplex", image: "/images/cockicon.png", url: "/subcategory/top-home-cleaning-services-in-bangalore" },
  ];

  const scrapSubServices = [
    { 
      name: "Newspaper", 
      image: "/images/newspaper-icon.png", 
      price: "₹14/KG", 
      note: "Market rates dropped recently" 
    },
    { 
      name: "Cardboard", 
      image: "/images/cardboard-icon.png", 
      price: "₹8/KG", 
      note: "Call for bulk quantity quote" 
    },
    { 
      name: "Office Paper (A3/A4)", 
      image: "/images/paper-icon.png", 
      price: "₹8/KG" 
    },
    { 
      name: "Copies/Books", 
      image: "/images/book-icon.png", 
      price: "₹24/KG" 
    },
    { 
      name: "Clothes", 
      image: "/images/clothes-icon.png", 
      price: "₹40/KG", 
      note: "Accepted only with other scrap items (No undergarments)" 
    },
    { 
      name: "Glass Bottles", 
      image: "/images/glass-icon.png", 
      price: "₹105/KG", 
      note: "Accepted only with other scrap items" 
    },
    { 
      name: "PET Bottles/Other Plastic", 
      image: "/images/plastic-icon.png", 
      price: "₹14/KG" 
    },
    { 
      name: "Iron", 
      image: "/images/iron-icon.png", 
      price: "₹12/KG", 
      note: "Call for bulk quantity quote" 
    },
    { 
      name: "Steel Utensils", 
      image: "/images/utensils-icon.png", 
      price: "₹2/KG" 
    },
    { 
      name: "Aluminum", 
      image: "/images/aluminum-icon.png", 
      price: "₹2/KG" 
    },
    { 
      name: "Brass", 
      image: "/images/brass-icon.png", 
      price: "₹305/KG" 
    },
    { 
      name: "Copper", 
      image: "/images/copper-icon.png", 
      price: "₹425/KG" 
    },
    { 
      name: "Split AC Copper Coil 1.5 Ton", 
      image: "/images/ac-icon.png", 
      price: "₹4150/Piece" 
    },
    { 
      name: "Window AC 1.5 Ton (Copper Coil)", 
      image: "/images/ac-icon.png", 
      price: "₹3000/Piece" 
    },
    { 
      name: "Split/Window AC 1 Ton (Copper Coil)", 
      image: "/images/ac-icon.png", 
      price: "₹1350/Piece" 
    },
    { 
      name: "Front Load Fully Automatic Washing Machine", 
      image: "/images/washing-machine-icon.png", 
      price: "₹4050/Piece" 
    },
  ];

  const mosquitoNetSubServices = [
    { 
      category: "Mosquito Net", 
      services: [
        { name: "Mosquito Mesh - Balcony", image: "/images/mosquito-net-icon.png", url: "#" },
        { name: "Mosquito Mesh Doors", image: "/images/mosquito-net-icon.png", url: "#" },
        { name: "Mosquito Net - Windows", image: "/images/mosquito-net-icon.png", url: "#" }
      ]
    },
    { 
      category: "Bird Netting", 
      services: [
        { name: "Anti Bird Spikes", image: "/images/bird-spike-icon.png", url: "#" },
        { name: "Bird Netting", image: "/images/bird-netting-icon.png", url: "#" }
      ]
    },
    { 
      category: "Safety Nets", 
      services: [
        { name: "Industrial Safety Nets", image: "/images/safety-net-icon.png", url: "#" },
        { name: "Monkey Safety Nets", image: "/images/safety-net-icon.png", url: "#" },
        { name: "Pets Safety Nets", image: "/images/pet-net-icon.png", url: "#" }
      ]
    }
  ];

  const services = [
    {
      id: 1,
      name: "Pest Control",
      image: "/images/pestcontrol.jpg",
      description: "Professional pest control services to eliminate rodents, insects, and other pests from your home or business. We use eco-friendly solutions that are safe for your family and pets.",
      details: [
        "General pest control",
        "Termite treatment",
        "Rodent control",
        "Bed bug extermination"
      ]
    },
    {
      id: 2,
      name: "Deep Cleaning",
      image: "/images/deepcleaning.jpg",
      description: "Thorough cleaning service that reaches deep into your home or office, tackling dirt and grime in hard-to-reach areas. Perfect for spring cleaning or post-renovation cleanup.",
      details: [
        "Complete floor scrubbing",
        "Grout cleaning",
        "Appliance deep clean",
        "Window cleaning"
      ]
    },
    {
      id: 3,
      name: "Scrap",
      image: "/images/scrap.jpg",
      description: "Efficient scrap removal service to help you declutter your space. We responsibly dispose of unwanted items, including electronics, furniture, and construction debris.",
      details: [
        "Household scrap removal",
        "Construction debris removal",
        "E-waste recycling",
        "Junk removal"
      ]
    },
    {
      id: 4,
      name: "Disinfection",
      image: "/images/disinfection.jpg",
      description: "Professional disinfection services using hospital-grade disinfectants to eliminate viruses, bacteria, and other pathogens from your environment.",
      details: [
        "Surface disinfection",
        "Air purification",
        "COVID-19 sanitation",
        "Regular maintenance plans"
      ],
      bookingUrl: "/subcategory/disinfection-services-near-you-in-bangalore"
    },
    {
      id: 5,
      name: "Mosquito & Safety Net",
      image: "/images/disinfection.jpg",
      description: "Custom mosquito net and safety net installation to protect your home from insects, birds, and other pests while allowing fresh air to circulate. Available in various styles and sizes.",
      details: [
        "Window nets",
        "Door nets",
        "Balcony nets",
        "Safety nets for birds and pets"
      ]
    },
    {
      id: 6,
      name: "AC Services",
      image: "/images/ac.jpg",
      description: "Comprehensive air conditioning services including installation, maintenance, and repair of all AC types to keep your space cool and comfortable.",
      details: [
        "AC installation",
        "Regular maintenance",
        "Gas refilling",
        "Repair services"
      ]
    },
    {
      id: 7,
      name: "Plumbing",
      image: "/images/plumbing.jpg",
      description: "Expert plumbing solutions for residential and commercial properties. From leak repairs to complete plumbing system overhauls.",
      details: [
        "Pipe repairs",
        "Drain cleaning",
        "Fixture installation",
        "Water heater services"
      ]
    },
    {
      id: 8,
      name: "Painting",
      image: "/images/painting.jpg",
      description: "Professional painting services for interiors and exteriors. We use high-quality paints and provide flawless finishes.",
      details: [
        "Wall painting",
        "Woodwork painting",
        "Texture finishes",
        "Waterproofing"
      ]
    }
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
  {services.map((service) => (
    <div
      key={service.id}
      className="flex flex-col items-center p-3 rounded-xl bg-[#f9f9f9] shadow-sm transition-all cursor-pointer"
      onClick={() => {
        if (service.name === "Pest Control") {
          setShowPestModal(true);
        } else if (service.name === "Deep Cleaning") {
          setShowDeepCleanModal(true);
        } else if (service.name === "Scrap") {
          setShowScrapModal(true);
        } else if (service.name === "Mosquito & Safety Net") {
          setShowMosquitoNetModal(true);
        } else {
          setSelectedService(service);
        }
      }}
    >
      <img
        src={service.image}
        alt={service.name}
        className="w-14 h-14 object-contain"
      />
      <span className="text-xs font-medium text-gray-800 text-center mt-2">
        {service.name}
      </span>
    </div>
  ))}

  {/* See All Card */}
  <div className="flex flex-col items-center p-3 rounded-xl bg-[#f9f9f9] hover:bg-[#f0f0f0] shadow-sm transition-all cursor-pointer">
    <div className="w-12 h-12 flex items-center justify-center">
      <FaEllipsisH className="text-gray-500 text-lg" />
    </div>
    <span className="text-xs font-medium text-gray-800 text-center mt-2">
      See All
    </span>
  </div>
</div>


      {/* Main Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedService.name}
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex justify-center mb-4">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-600 mb-4">{selectedService.description}</p>
              <h4 className="font-semibold text-gray-800 mb-2">Services Include:</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {selectedService.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                {selectedService.bookingUrl && (
                  <a
                    href={selectedService.bookingUrl}
                    className="inline-block w-full sm:w-auto text-center bg-[#fdd420] hover:bg-[#453b9e] hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 text-black font-semibold text-sm sm:text-base px-6 py-3 rounded-lg shadow-sm transition-all duration-200"
                    aria-label={`Book ${selectedService.name} now`}
                  >
                    Book {selectedService.name}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pest Control Modal */}
      {showPestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Pest Control Services</h2>
              <button
                onClick={() => setShowPestModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pestSubServices.map((sub, index) => (
                <a
                  href={sub.url}
                  key={index}
                  className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg"
                >
                  <div className="w-32 h-20 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                    <img src={sub.image} alt={sub.name} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="text-sm font-semibold mt-2">{sub.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deep Cleaning Modal */}
      {showDeepCleanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Deep Cleaning Services</h2>
              <button
                onClick={() => setShowDeepCleanModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {deepCleanSubServices.map((sub, index) => (
                <a
                  href={sub.url}
                  key={index}
                  className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg"
                >
                  <div className="w-32 h-20 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                    <img src={sub.image} alt={sub.name} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="text-sm font-semibold mt-2">{sub.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scrap Modal */}
      {showScrapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Scrap Collection Services</h2>
              <button
                onClick={() => setShowScrapModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                We offer competitive rates for various types of scrap materials. 
                Prices are subject to change based on market rates.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {scrapSubServices.map((sub, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg border border-gray-100"
                >
                  <div className="w-32 h-20 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                    <img src={sub.image} alt={sub.name} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="text-sm font-semibold mt-2">{sub.name}</h3>
                  <p className="text-sm font-bold text-green-600 mt-1">{sub.price}</p>
                  {sub.note && (
                    <p className="text-xs text-gray-500 mt-1">{sub.note}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                For bulk quantities or special items, please call:
              </p>
              <a 
                href="tel:+918595358613" 
                className="inline-block bg-[#fdd420] text-black font-semibold px-6 py-2 rounded-lg shadow-sm"
              >
                +91-6363865658
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mosquito & Safety Net Modal */}
      {showMosquitoNetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Mosquito & Safety Net Services</h2>
              <button
                onClick={() => setShowMosquitoNetModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Professional installation of mosquito nets and safety nets to protect your home from insects, birds, and other pests.
              </p>
            </div>
            
            {mosquitoNetSubServices.map((category, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">{category.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.services.map((sub, subIndex) => (
                    <a
                      href={sub.url}
                      key={subIndex}
                      className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg"
                    >
                      <div className="w-32 h-20 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                        <img src={sub.image} alt={sub.name} className="w-12 h-12 object-contain" />
                      </div>
                      <h3 className="text-sm font-semibold mt-2">{sub.name}</h3>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;