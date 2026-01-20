import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import { useCont } from "../../context/MyContext";

const ServicesNavDropdown = () => {
  const navigate = useNavigate();
  const { categoryData } = useCont();
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [leaveTimeout, setLeaveTimeout] = useState(null);

  const handleNavigate = (slug) => {
    navigate(`${config.VITE_BASE_URL}/subcategory/${slug}`);
  };

  // Use dynamic data from context
  const dynamicCategories = categoryData?.data || [];

  // Format categories for easier consumption
  const formattedCategories = dynamicCategories.map(cat => ({
    id: cat.id,
    name: cat.category_name,
    subcategories: (cat.subcategories || cat.Subcategories || []).map(sub => ({
      name: sub.subcategory_name,
      slug: sub.slug
    }))
  }));

  const handleMouseEnter = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
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
          Home Demand Services
        </span>
      </div>

      {isHovered && formattedCategories.length > 0 && (
        <div
          className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex">
            {/* Main categories */}
            <div className="w-[220px] py-2 bg-gray-50">
              {formattedCategories.map((category) => (
                <div
                  key={category.id}
                  onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                  className={`px-4 py-2 cursor-pointer text-[15px] transition-colors duration-150 ${activeCategory === category.id
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
                <div className="max-h-[300px] overflow-y-auto">
                  {formattedCategories
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
