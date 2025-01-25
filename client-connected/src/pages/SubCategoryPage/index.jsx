import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../config/config";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";
import Loading from "../../components/Loading";

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

  const handleSubCategoryClick = (subCategory) => {
    const path =
      subCategory.category.is_page === 1
        ? `/subcategory/${subCategory.slug}/${subCategory.subcat_id}`
        : `/products/${subCategory.slug}/${subCategory.subcat_id}`;
    navigate(path);
  };

  const locations = categoryData?.location?.split("|") || [];
  const currentLocation =
    location?.charAt(0)?.toUpperCase() + location?.slice(1);
  const currentLocationTitle =
    location && currentLocation ? ` in ${currentLocation}` : "";

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loading />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{categoryData?.meta_title}</title>
        <meta name="description" content={categoryData?.meta_description} />
        <meta
          property="og:title"
          content={
            currentLocation
              ? categoryData?.meta_title + currentLocationTitle
              : categoryData?.meta_title
          }
        />
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
            src={categoryData?.motion_graphics}
            alt={categoryData?.alt_tag}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4">
              {categoryData?.category_name}
              {currentLocationTitle}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow container mx-auto px-4 lg:px-10 py-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {subCategories.map((subCategory) => (
              <motion.div
                key={subCategory.subcat_id}
                variants={item}
                className="group"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                <div className="bg-white shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={subCategory.subcategory_icon}
                      alt={subCategory.subcategory_name}
                      className="w-full h-full transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#10847E] transition-colors duration-300">
                      {subCategory.subcategory_name}
                    </h3>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-gray-500 group-hover:text-[#10847E] transition-colors duration-300">
                        Explore Services
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2 inline-block transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Locations Section */}
          {locations && locations.length ? (
            <div className="mt-16 bg-gray-50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Available Locations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {locations?.map((loc) => {
                  const formattedLoc = loc.trim();
                  const capitalizedLoc =
                    formattedLoc.charAt(0).toUpperCase() +
                    formattedLoc.slice(1);
                  return (
                    <a
                      key={formattedLoc}
                      href={`/${
                        categoryData.slug
                      }-in-${formattedLoc.toLowerCase()}/${
                        categoryData.id
                      }/${formattedLoc.toLowerCase()}`}
                      className="text-[#10847E] hover:text-[#0d6d68] transition-colors duration-300"
                    >
                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <span className="text-lg">
                          {categoryData.category_name} in {capitalizedLoc}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SubCategoryPage;
