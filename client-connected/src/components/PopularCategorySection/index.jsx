import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const PopularCategorySection = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.length > 0) {
      setActiveCategory(data[0].id);
    }
  }, [data]);

  const activeTabContent = data?.find(
    (category) => category.id === activeCategory
  );

  const handleServiceClick = (slug, id) => {
    navigate(`${config.VITE_BASE_URL}/subcategory/${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Popular Service Categories</h2>

      {/* Category Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex overflow-x-auto space-x-4">
          {data?.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeCategory === category.id
                  ? "border-b-2 border-hommlie text-hommlie"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTabContent?.subcategories?.map((subcat) => (
          <button
            key={subcat.id}
            onClick={() => handleServiceClick(subcat.slug, subcat.id)}
            className="p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {subcat.subcategory_name}
            </h3>
            <p className="text-sm text-gray-500">
              Click to view service details
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularCategorySection;
