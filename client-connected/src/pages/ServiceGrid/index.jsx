import { useState } from 'react';
import { FaEllipsisH, FaTimes } from 'react-icons/fa';

const ServiceGrid = () => {
  const [selectedService, setSelectedService] = useState(null);

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
      ]
    },
    {
      id: 5,
      name: "Mosquito Net",
      image: "/images/pestcontrol.jpg",
      description: "Custom mosquito net installation to protect your home from insects while allowing fresh air to circulate. Available in various styles and sizes.",
      details: [
        "Window nets",
        "Door nets",
        "Bed canopies",
        "Retractable systems"
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
            className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-black hover:shadow-sm transition-all cursor-pointer"
            onClick={() => setSelectedService(service)}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="text-xs font-medium text-gray-700 text-center mt-2">{service.name}</span>
          </div>
        ))}

        {/* See All */}
        <div className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-black hover:shadow-sm transition-all cursor-pointer">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            <FaEllipsisH className="text-gray-500 text-xl" />
          </div>
          <span className="text-xs font-medium text-gray-700 text-center mt-2">See All</span>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedService.name}</h3>
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
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;