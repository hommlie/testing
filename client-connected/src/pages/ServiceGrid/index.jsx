import { useState } from 'react';
import { FaEllipsisH, FaTimes } from 'react-icons/fa';

const ServiceGrid = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showPestModal, setShowPestModal] = useState(false);
  const [showDeepCleanModal, setShowDeepCleanModal] = useState(false);
  const [showScrapModal, setShowScrapModal] = useState(false);
  const [showMosquitoNetModal, setShowMosquitoNetModal] = useState(false);
  const [showDisinfectionModal, setShowDisinfectionModal] = useState(false);
  const [showACModal, setShowACModal] = useState(false);
  const [showPlumbingModal, setShowPlumbingModal] = useState(false);
  const [showPaintingModal, setShowPaintingModal] = useState(false);

  const pestSubServices = [
    { name: "Cockroach Control", image: "/images/cockicon.png", url: "/subcategory/cockroach-control-services-in-bangalore" },
    { name: "Rodent Control", image: "/images/rodenticon.png", url: "/subcategory/rodent-control-in-bangalore" },
    { name: "Mosquito Control", image: "/images/mosquitoicon.png", url: "/subcategory/mosquito-control-in-bangalore" },
    { name: "Flies Management", image: "/images/fliesicon.png", url: "/subcategory/flies-pest-control-in-bangalore" },
    { name: "Weed Management", image: "/images/weedicon.png", url: "/subcategory/pest-control-weed-management" },
    { name: "Wood Borer", image: "/images/woodborericon.png", url: "/subcategory/wood-borer-control-in-bangalore" },
    { name: "Bedbugs Control", image: "/images/bedbugicon.png", url: "/subcategory/bed-bug-control-services-in-bangalore" },
    { name: "Honey Bee Removal", image: "/images/beeicon.png", url: "/subcategory/honey-bee-removal-services-in-bangalore" },
    { name: "Termite Treatment", image: "/images/termiteicon.png", url: "/subcategory/termite-control-services-in-bangalore" },
  ];

  const deepCleanSubServices = [
    { name: "Sofa Cleaning", image: "/images/sofaicon.png", url: "/subcategory/top-sofa-cleaning-services-in-bangalore" },
    { name: "Bathroom Cleaning", image: "/images/bathroomicon.png", url: "/subcategory/professional-bathroom-cleaning-services-in-bangalore" },
    { name: "Kitchen Cleaning", image: "/images/kitchenicon.png", url: "/subcategory/top-kitchen-cleaning-services-in-bangalore" },
    { name: "Full Home Cleaning – Apartment", image: "/images/apartmenticon.png", url: "/subcategory/home-cleaning-services-in-bangalore" },
    { name: "Full Home Cleaning – Bungalow/Duplex", image: "/images/bunglowicon.png", url: "/subcategory/top-home-cleaning-services-in-bangalore" },
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
    // { 
    //   name: "Aluminum", 
    //   image: "/images/aluminum-icon.png", 
    //   price: "₹2/KG" 
    // },
    // { 
    //   name: "Brass", 
    //   image: "/images/brass-icon.png", 
    //   price: "₹305/KG" 
    // },
    // { 
    //   name: "Copper", 
    //   image: "/images/copper-icon.png", 
    //   price: "₹425/KG" 
    // },
    // { 
    //   name: "Split AC Copper Coil 1.5 Ton", 
    //   image: "/images/ac-icon.png", 
    //   price: "₹4150/Piece" 
    // },
    // { 
    //   name: "Window AC 1.5 Ton (Copper Coil)", 
    //   image: "/images/ac-icon.png", 
    //   price: "₹3000/Piece" 
    // },
    // { 
    //   name: "Split/Window AC 1 Ton (Copper Coil)", 
    //   image: "/images/ac-icon.png", 
    //   price: "₹1350/Piece" 
    // },
    // { 
    //   name: "Front Load Fully Automatic Washing Machine", 
    //   image: "/images/washing-machine-icon.png", 
    //   price: "₹4050/Piece" 
    // },
  ];

  const mosquitoNetSubServices = [
    { 
      category: "Mosquito Net", 
      services: [
        { name: "Mosquito Mesh - Balcony", image: "/images/balconyicon.png", url: "#" },
        { name: "Mosquito Mesh Doors", image: "/images/dooricon.png", url: "#" },
        { name: "Mosquito Net - Windows", image: "/images/windowicon.png", url: "#" }
      ]
    },
    { 
      category: "Bird Netting", 
      services: [
        { name: "Anti Bird Spikes", image: "/images/bird-spike-icon.png", url: "#" },
        { name: "Bird Netting", image: "/images/nettingicon.png", url: "#" }
      ]
    },
    { 
      category: "Safety Nets", 
      services: [
        { name: "Balcony Safety Net", image: "/images/balconyneticon.png", url: "#" }
      ]
    }
  ];

  const services = [
    {
      id: 1,
      name: "Pest Control",
      image: "/images/pestcontrol1.png",
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
      image: "/images/deepcleaning1.png",
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
      image: "/images/scrap1.png",
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
      image: "/images/disinfection1.png",
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
      image: "/images/mosquito1.png",
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
      image: "/images/ac1.png",
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
      image: "/images/plumbing1.png",
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
      image: "/images/painting1.png",
      description: "Professional painting services for interiors and exteriors. We use high-quality paints and provide flawless finishes.",
      details: [
        "Wall painting",
        "Woodwork painting",
        "Texture finishes",
        "Waterproofing"
      ]
    }
  ];
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="p-4">
      <div className="border border-gray-300 rounded-xl p-4 bg-white shadow-md ml-1">
        <div className="grid grid-cols-3 mt-4 mb-4 gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center group transition-all cursor-pointer"
              onClick={() => {
                if (service.name === "Pest Control") setShowPestModal(true);
                else if (service.name === "Deep Cleaning") setShowDeepCleanModal(true);
                else if (service.name === "Scrap") setShowScrapModal(true);
                else if (service.name === "Mosquito & Safety Net") setShowMosquitoNetModal(true);
                else if (service.name === "Disinfection") setShowDisinfectionModal(true);
                else if (service.name === "AC Services") setShowACModal(true);
                else if (service.name === "Plumbing") setShowPlumbingModal(true);
                else if (service.name === "Painting") setShowPaintingModal(true);
                else setSelectedService(service);
              }}
            >
              {/* Box - mobile optimized but same on desktop */}
              <div className="w-20 h-20 sm:w-32 sm:h-24 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center group-hover:shadow-md transition">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>

              {/* Label - mobile optimized but same on desktop */}
              <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-800 text-center leading-tight relative group-hover:after:w-full after:transition-all after:duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] sm:after:h-[2px] after:w-0 after:bg-[#92B775]">
                {service.name}
              </span>
            </div>
          ))}

          {/* See All Card - mobile optimized but same on desktop */}
          <div
            className="flex flex-col items-center group transition-all cursor-pointer"
            onClick={() => setShowComingSoon(true)}
          >
            <div className="w-20 h-20 sm:w-32 sm:h-24 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center group-hover:shadow-md transition">
              <FaEllipsisH className="text-gray-500 text-xl sm:text-2xl" />
            </div>
            <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-800 text-center leading-tight relative group-hover:after:w-full after:transition-all after:duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] sm:after:h-[2px] after:w-0 after:bg-[#92B775]">
              See All
            </span>
          </div>
        </div>
      </div>
      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 text-center relative">
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon!</h3>
            <p className="text-sm text-gray-600">
              We will be available soon in all services across Bangalore.
            </p>
          </div>
        </div>
      )}
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
                  className="w-48 h-48 object-contain rounded-lg"
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
                    className="inline-block w-full sm:w-auto text-center bg-[#fdd420] hover:bg-[#453b9e] hover:text-white text-black font-semibold text-sm sm:text-base px-6 py-3 rounded-lg shadow-sm transition-all duration-200"
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
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[90vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Pest Control Services</h2>
              <button onClick={() => setShowPestModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pestSubServices.map((sub, index) => (
                <a key={index} href={sub.url} className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg">
                  <div className="w-32 h-24 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                    <img src={sub.image} alt={sub.name} className="w-36 h-36 object-contain" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-lg p-6 h-[60vh] sm:h-auto overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Deep Cleaning Services</h2>
              <button onClick={() => setShowDeepCleanModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {deepCleanSubServices.map((sub, index) => (
                <a key={index} href={sub.url} className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg">
                  <div className="w-32 h-24 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                    <img src={sub.image} alt={sub.name} className="w-44 h-44 scale-110 object-contain" />
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
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Scrap Collection Services</h2>
              <button onClick={() => setShowScrapModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">We offer competitive rates for various types of scrap materials.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {scrapSubServices.map((sub, index) => (
                <div key={index} className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg border border-gray-100">
                  <div className="w-32 h-24 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                    <img src={sub.image} alt={sub.name} className="w-20 h-20 object-contain" />
                  </div>
                  <h3 className="text-sm font-semibold mt-2">{sub.name}</h3>
                  <p className="text-sm font-bold text-[#52852d] mt-1">{sub.price}</p>
                  {sub.note && <p className="text-xs text-gray-500 mt-1">{sub.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mosquito & Safety Net Modal */}
      {showMosquitoNetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Mosquito & Safety Net Services</h2>
              <button onClick={() => setShowMosquitoNetModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Professional installation of mosquito nets and safety nets.</p>
            {mosquitoNetSubServices.map((category, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">{category.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.services.map((sub, subIndex) => (
                    <a key={subIndex} href={sub.url} className="flex flex-col items-center text-center p-3 hover:shadow-md transition rounded-lg">
                      <div className="w-32 h-24 bg-[#f5f5f5] rounded-xl shadow flex items-center justify-center">
                        <img src={sub.image} alt={sub.name} className="w-32 h-32 object-contain" />
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

      {showDisinfectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Disinfection Services</h2>
              <button onClick={() => setShowDisinfectionModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              We use hospital-grade disinfectants to sanitize your home or workspace safely.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Surface disinfection</li>
              <li>Air purification</li>
              <li>COVID-19 sanitation</li>
              <li>Weekly/Monthly plans</li>
            </ul>
            <div className="mt-6 flex justify-center">
              <a
                href="/subcategory/disinfection-services-near-you-in-bangalore"
                className="inline-block w-full sm:w-auto text-center bg-[#92b876] hover:bg-[#453b9e] hover:text-white text-black font-semibold text-sm sm:text-base px-6 py-3 rounded-lg shadow-sm transition-all duration-200"
              >
                Book Disinfection
              </a>
            </div>
          </div>
        </div>
      )}
      {showACModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">AC Services</h2>
              <button onClick={() => setShowACModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Expert air conditioning solutions to keep your home cool and efficient.</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>AC installation (Split & Window)</li>
              <li>Gas refilling</li>
              <li>Annual maintenance</li>
              <li>AC servicing & repair</li>
            </ul>
          </div>
        </div>
      )}

      {showPlumbingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Plumbing Services</h2>
              <button onClick={() => setShowPlumbingModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Comprehensive plumbing repair and installation for homes and businesses.</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Tap & pipe leak repairs</li>
              <li>Drain clog removal</li>
              <li>Bathroom fitting installations</li>
              <li>Water tank & geyser services</li>
            </ul>
          </div>
        </div>
      )}

      {showPaintingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[91vh] overflow-y-auto transform animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Painting Services</h2>
              <button onClick={() => setShowPaintingModal(false)} className="text-gray-500 hover:text-black">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Professional interior and exterior painting with flawless finishes.</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Interior wall painting</li>
              <li>Texture and stencil designs</li>
              <li>Waterproofing and damp-proofing</li>
              <li>Woodwork and door painting</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;