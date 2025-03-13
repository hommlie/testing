import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState({});
  const navigate = useNavigate();
  const scrollContainerRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.API_URL}/api/category`);
      const categoriesData = response.data.data;

      // Initialize active location state
      const initialActiveLocations = {};
      categoriesData.forEach((category) => {
        initialActiveLocations[category.id] =
          getLocationsFromCategory(category)[0]?.title || "";
      });

      setActiveLocation(initialActiveLocations);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationsFromCategory = (category) => {
    if (!category.location) return [];

    const locations = category.location.split("|") || [];

    return locations.map((location) => {
      const trimmedLocation = location.trim();
      const slug = trimmedLocation
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      return {
        title: trimmedLocation,
        slug: slug,
      };
    });
  };

  const handleArrowClick = (categoryId, direction) => {
    const container = scrollContainerRefs.current[categoryId];
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (categoryId, e) => {
    const container = e.target;
    const leftArrow = document.getElementById(`left-arrow-${categoryId}`);
    const rightArrow = document.getElementById(`right-arrow-${categoryId}`);

    if (leftArrow && rightArrow) {
      // Show/hide arrows based on scroll position
      leftArrow.style.display = container.scrollLeft > 0 ? "block" : "none";
      rightArrow.style.display =
        container.scrollLeft < container.scrollWidth - container.clientWidth
          ? "block"
          : "none";
    }
  };

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
    <main className="md:max-w-7xl w-full mx-auto">
      <div className="container px-4 mt-5">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <a href="/" className="text-emerald-600 hover:text-emerald-700">
            Home
          </a>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">Categories</span>
        </nav>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {categories?.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Banner Section */}
              <div className="relative w-full h-[150px] md:h-[250px] overflow-hidden">
                <img
                  src={category.motion_graphics || category.image_url}
                  alt={category.alt_tag}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center text-white">
                    <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-4 uppercase">
                      {category.category_name}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Locations Quick Nav */}
              <div className="flex items-center bg-white rounded-lg mb-4 relative p-4">
                <h2 className="text-lg md:text-xl font-semibold mr-4 md:mr-6 whitespace-nowrap">
                  Available in:
                </h2>

                {/* Left Arrow */}
                <div
                  id={`left-arrow-${category.id}`}
                  className="absolute left-24 md:left-36 z-10 p-1 md:p-2 cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
                  onClick={() => handleArrowClick(category.id, "left")}
                  style={{ display: "none" }} // Initially hidden
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 md:h-6 w-3 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>

                {/* Scrollable Locations */}
                <div
                  ref={(el) => (scrollContainerRefs.current[category.id] = el)}
                  className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide flex-1"
                  onScroll={(e) => handleScroll(category.id, e)}
                >
                  {getLocationsFromCategory(category).map((location, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveLocation({
                          ...activeLocation,
                          [category.id]: location.title,
                        });
                      }}
                      className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-200 whitespace-nowrap ${
                        activeLocation[category.id] === location.title
                          ? "bg-emerald-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <p className="text-xs md:text-sm font-medium">
                        {location.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <div
                  id={`right-arrow-${category.id}`}
                  className="absolute right-4 z-10 p-1 md:p-2 cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
                  onClick={() => handleArrowClick(category.id, "right")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 md:h-6 w-3 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Details */}
              <div className="p-4 md:p-6">
                <div className="flex gap-4 md:gap-8">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-semibold mb-3">
                      {`${category.category_name} in ${
                        activeLocation[category.id] || "Your Area"
                      }`}
                    </h2>

                    <p className="text-sm md:text-base text-gray-600 mb-4">
                      {category.meta_description ||
                        `Professional ${category.category_name.toLowerCase()} services providing reliable and high-quality solutions for your needs.`}
                    </p>

                    <div className="mt-2 md:mt-4">
                      <h3 className="text-sm md:text-base font-medium mb-2">
                        Why Choose Our Services:
                      </h3>
                      <ul className="text-xs md:text-base space-y-1">
                        <li className="flex items-start space-x-2 text-gray-600">
                          <span className="text-emerald-500">✓</span>
                          <span>Highly-rated professional service</span>
                        </li>
                        <li className="flex items-start space-x-2 text-gray-600">
                          <span className="text-emerald-500">✓</span>
                          <span>Comprehensive solutions for your needs</span>
                        </li>
                        <li className="flex items-start space-x-2 text-gray-600">
                          <span className="text-emerald-500">✓</span>
                          <span>Fast and reliable service delivery</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        const activeLocationObj = getLocationsFromCategory(
                          category
                        ).find(
                          (loc) => loc.title === activeLocation[category.id]
                        ) || { slug: "" };

                        navigate(
                          `/${category.slug}/${category.id}${
                            activeLocationObj.slug
                              ? `/${activeLocationObj.slug}`
                              : ""
                          }`,
                          {
                            state: { location: activeLocation[category.id] },
                          }
                        );
                      }}
                      className="mt-4 md:mt-6 flex items-center text-emerald-600 hover:text-emerald-700 font-medium group"
                    >
                      View Services
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="w-24 md:w-32 h-24 md:h-32 flex-shrink-0 self-center">
                    <img
                      src={category.app_icon || category.image_url}
                      alt={category.category_name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Other Locations Quick Links */}
              <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-100">
                <h3 className="text-sm md:text-base font-medium mb-2">
                  Popular Areas:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getLocationsFromCategory(category)
                    .slice(0, 8) // Limit to 8 locations for cleaner display
                    .map((location, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          navigate(
                            `/${category.slug}/${category.id}/${location.slug}`,
                            {
                              state: { location: location.title },
                            }
                          );
                        }}
                        className="text-xs md:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {location.title}
                      </button>
                    ))}

                  {getLocationsFromCategory(category).length > 8 && (
                    <span className="text-xs md:text-sm text-gray-500">
                      + {getLocationsFromCategory(category).length - 8} more
                      areas
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default CategoryPage;
