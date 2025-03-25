import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate();
  const categoryRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.API_URL}/api/category`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      // Scroll to the category if it's not already visible
      setTimeout(() => {
        const element = categoryRefs.current[categoryId];
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleSubCategoryClick = (category, subcategory) => {
    navigate(`/subcategory/${subcategory.slug}/${subcategory.id}`);
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
      },
    },
  };

  const subcategoryItem = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <main className="md:max-w-7xl mx-auto w-full">
      <div className="container px-4 pt-6 md:pt-10">
        {/* Banner Section */}
        <div className="relative bg-hommlie w-full h-[150px] md:h-[300px] rounded-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase">
              Our Services
            </h1>

            {/* Search Bar */}
            <div className="relative w-full max-w-md px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pr-10 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 mb-10"
        >
          {filteredCategories?.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              className="bg-white rounded-xl shadow-md overflow-hidden glow-border transition-all duration-300"
            >
              {/* Category Header */}
              <div
                className="cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="relative h-[150px] md:h-[300px] overflow-hidden">
                  <img
                    src={category.motion_graphics || category.image_url}
                    alt={category.alt_tag}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 md:p-6 w-full flex justify-between items-center">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        {category.category_name}
                      </h2>
                      <ChevronDown
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                          expandedCategory === category.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              <AnimatePresence>
                {expandedCategory === category.id &&
                  category.Subcategories &&
                  category.Subcategories.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {category.Subcategories.map((subcategory) => (
                          <motion.div
                            key={subcategory.id}
                            variants={subcategoryItem}
                            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() =>
                              handleSubCategoryClick(category, subcategory)
                            }
                          >
                            <div className="flex gap-3 items-center">
                              <div className="w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={subcategory.app_icon}
                                  alt={subcategory.subcategory_name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-sm md:text-base font-medium line-clamp-2">
                                  {subcategory.subcategory_name}
                                </h3>
                                <div className="flex items-center mt-1 text-xs md:text-sm text-emerald-600 group">
                                  <span>View Details</span>
                                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg text-gray-500">
                No services found matching "{searchTerm}"
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default CategoryPage;
