import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../config/config";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";

const SubCategoryPage = () => {
  const { categoryId, categorySlug, location } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [categoryId, location]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const subCatResponse = await axios.post(
        `${config.API_URL}/api/subcategory`,
        { cat_id: categoryId }
      );

      setSubCategories(subCatResponse.data.data.subcategory);
      setCategoryData(subCatResponse.data.data.subcategory[0]?.category);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (isLoading) return <LoadingWrapper />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {categoryData?.category_name} in{" "}
        {location.charAt(0).toUpperCase() + location.slice(1)}
      </h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {subCategories.map((subCategory) => (
          <motion.div
            key={subCategory.subcat_id}
            variants={item}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={subCategory.subcategory_icon}
                alt={subCategory.subcategory_name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                {subCategory.subcategory_name}
              </h3>

              {subCategory.category.is_page === 1 ? (
                <button
                  onClick={() =>
                    navigate(
                      `/subcategory/${subCategory.slug}/${subCategory.subcat_id}/${location}`
                    )
                  }
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  View Details
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/products/${subCategory.subcat_id}/${location}`)
                  }
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  View Products
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SubCategoryPage;
