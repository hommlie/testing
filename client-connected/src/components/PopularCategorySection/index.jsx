import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import config from "../../config/config";

const PopularCategorySection = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.length > 0) {
      setActiveCategory(null); // Keep initial state collapsed
    }
  }, [data]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleServiceClick = (slug, id) => {
    navigate(`${config.VITE_BASE_URL}/subcategory/${slug}`);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Popular Service Categories
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Click a category to expand and view its services
        </p>

        {/* Category Tabs */}
        <div className="mb-0 border-b border-gray-200">
          <div className="flex overflow-x-auto space-x-4 justify-center pb-2">
            {data?.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                  activeCategory === category.id
                    ? "border-hommlie text-hommlie"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {category.category_name}
                {activeCategory === category.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories Dropdown */}
        {data?.map((category) => (
          <div key={category.id} className="mb-4 transition-all duration-300">
            {activeCategory === category.id && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                  {category.category_name} Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.subcategories?.map((subcat) => (
                    <button
                      key={subcat.id}
                      onClick={() =>
                        handleServiceClick(subcat.slug, subcat.id)
                      }
                      className="p-4 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-hommlie"
                    >
                      <h4 className="text-md font-medium text-gray-900 mb-1">
                        {subcat.subcategory_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Click to view service details
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategorySection;
