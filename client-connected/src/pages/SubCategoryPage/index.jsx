import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
      setCategoryData(subCatResponse.data.data.categoryData);
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

  const locations = categoryData?.location.split("|") || [];
  const currentLocation = location.charAt(0).toUpperCase() + location.slice(1);

  if (isLoading) return <LoadingWrapper />;

  return (
    <>
      <Helmet>
        <title>{categoryData?.meta_title}</title>
        <meta name="description" content={categoryData?.meta_description} />
        <meta property="og:title" content={categoryData?.meta_title} />
        <meta
          property="og:description"
          content={categoryData?.meta_description}
        />
        <meta property="og:image" content={categoryData?.image_url} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* Banner Section */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src={categoryData?.image_url}
            alt={categoryData?.alt_tag}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
              {categoryData?.category_name} in {currentLocation}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow container mx-auto px-4 lg:px-8 py-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          >
            {subCategories.map((subCategory) => (
              <motion.div
                key={subCategory.subcat_id}
                variants={item}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={subCategory.subcategory_icon}
                    alt={subCategory.subcategory_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm md:text-base font-semibold mb-3 line-clamp-2">
                    {subCategory.subcategory_name}
                  </h3>

                  <button
                    onClick={() => {
                      const path =
                        subCategory.category.is_page === 1
                          ? `/subcategory/${subCategory.slug}/${subCategory.subcat_id}/${location}`
                          : `/products/${subCategory.subcat_id}/${location}`;
                      navigate(path);
                    }}
                    className="w-full py-2 text-sm px-4 bg-[#10847E] text-white rounded-md hover:bg-[#0d6d68] transition-colors duration-300"
                  >
                    {subCategory.category.is_page === 1
                      ? "View Details"
                      : "View Products"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Locations Section */}
          <div className="mt-16 bg-gray-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Available Locations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {locations.map((loc) => {
                const formattedLoc = loc.trim();
                const capitalizedLoc =
                  formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);
                return (
                  <Link
                    key={formattedLoc}
                    to={`/${categoryData.slug}/${
                      categoryData.id
                    }/${formattedLoc.toLowerCase()}`}
                    className="text-[#10847E] hover:text-[#0d6d68] transition-colors duration-300"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <span className="text-lg">
                        {categoryData.category_name} in {capitalizedLoc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategoryPage;
