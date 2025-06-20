import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const ServicesNavDropdown = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [leaveTimeout, setLeaveTimeout] = useState(null);

  const handleNavigate = (slug) => {
    navigate(`${config.VITE_BASE_URL}/subcategory/${slug}`);
  };

  const manualCategories = [
    {
      id: 1,
      name: "Pest Control",
      subcategories: [
        { name: "Bedbug Control", slug: "bed-bug-control-services-in-bangalore" },
        { name: "Cockroach Control", slug: "cockroach-control-services-in-bangalore" },
        { name: "Flies Management", slug: "flies-pest-control-in-bangalore" },
        { name: "Mosquito Control", slug: "mosquito-control-in-bangalore" },
        { name: "Rodent Control", slug: "rodent-control-in-bangalore" },
        { name: "Snake Management Services", slug: "best-snake-management-services-in-bangalore" },
        { name: "Termite Control", slug: "termite-control-in-banglore" },
        { name: "Weed Management", slug: "pest-control-weed-management" },
        { name: "Wood Borer Control", slug: "wood-borer-control-in-bangalore" },
      ],
    },
    {
      id: 2,
      name: "Bird Netting",
      subcategories: [
        { name: "Anti Bird Spikes", slug: "anti-bird-spikes" },
        { name: "Bird Netting", slug: "bird-netting-for-balcony-in-bangalore" },
        { name: "Industrial Safety Nets", slug: "industrial-safety-nets-in-bangalore" },
        { name: "Monkey Safety Nets", slug: "anti-monkey-nets-in-bangalore" },
        { name: "Pets Safety Nets", slug: "pets-safety-nets-in-bangalore" },
      ],
    },
    {
      id: 3,
      name: "Cleaning Services",
      subcategories: [
        { name: "Sofa Cleaning", slug: "top-sofa-cleaning-services-in-bangalore" },
        { name: "Full Home Cleaning - Apartment", slug: "home-cleaning-services-in-bangalore" },
        { name: "Bathroom Cleaning", slug: "professional-bathroom-cleaning-services-in-bangalore" },
        { name: "Kitchen Cleaning", slug: "top-kitchen-cleaning-services-in-bangalore" },
        { name: "Full Home Cleaning - Bunglow/Duplex", slug: "top-home-cleaning-services-in-bangalore" },
      ],
    },
    {
      id: 4,
      name: "Disinfection",
      subcategories: [
        { name: "Disinfection Services", slug: "disinfection-services-near-you-in-bangalore" },
      ],
    },
  ];

  const handleMouseEnter = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow for accidental mouse movement
    const timeout = setTimeout(() => {
      setIsHovered(false);
      setActiveCategory(null);
    }, 200);
    setLeaveTimeout(timeout);
  };

  const handleCategoryMouseEnter = (categoryId) => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
    setActiveCategory(categoryId);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center cursor-pointer">
        <span className="text-gray-700 hover:text-green-700 font-medium font-semibold tracking-wide text-[16px] transition-colors duration-150">
          Services
        </span>
      </div>

      {isHovered && (
        <div 
          className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex">
            {/* Main categories */}
            <div className="w-[220px] py-2 bg-gray-50">
              {manualCategories.map((category) => (
                <div
                  key={category.id}
                  onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                  className={`px-4 py-2 cursor-pointer text-[15px] transition-colors duration-150 ${
                    activeCategory === category.id
                      ? "bg-white text-green-700 font-medium border-r-2 border-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </div>
              ))}
            </div>

            {/* Subcategories */}
            {activeCategory && (
              <div 
                className="w-[250px] py-2 bg-white"
                onMouseEnter={() => handleCategoryMouseEnter(activeCategory)}
              >
                {/* <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {manualCategories.find((c) => c.id === activeCategory)?.name}
                </h3> */}
                <div className="max-h-[300px] overflow-y-auto">
                  {manualCategories
                    .find((c) => c.id === activeCategory)
                    ?.subcategories.map((subcat, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        onClick={() => handleNavigate(subcat.slug)}
                      >
                        {subcat.name}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesNavDropdown;