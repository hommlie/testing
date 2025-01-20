import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../config/config";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) return <LoadingWrapper />;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {categories?.map((category) => {
          const locations = category?.location?.split("|");

          return (
            <motion.div
              key={category.id}
              variants={item}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative group">
                <img
                  src={category.image_url}
                  alt={category.alt_tag}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {category.motion_graphics && (
                  <video
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={category.motion_graphics} type="video/mp4" />
                  </video>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {category.category_name}
                </h2>
                <div className="space-y-2">
                  {locations?.map((location) => (
                    <div key={location} className="text-sm">
                      <button
                        onClick={() =>
                          navigate(
                            `/${category.slug}/${
                              category.id
                            }/${location.toLowerCase()}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {`${category.category_name} in ${location.trim()}`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategoryPage;
