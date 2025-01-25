import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { motion } from "framer-motion";
import config from "../../config/config";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";

const ProductListPage = () => {
  const { subcategoryId, location } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [subcategoryId, location]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/api/products`, {
        subcategory_id: subcategoryId,
      });
      setProducts(response.data.data);
      setSubcategoryData(response.data.subcategory);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDiscountPercentage = (product) => {
    const originalPrice = Number(product.price);
    const discountedPrice = Number(product.discounted_price);
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };

  if (isLoading) return <LoadingWrapper />;

  return (
    <>
      <Helmet>
        <title>{subcategoryData?.meta_title || "Product Listing"}</title>
        <meta name="description" content={subcategoryData?.meta_description} />
        <meta property="og:title" content={subcategoryData?.meta_title} />
        <meta
          property="og:description"
          content={subcategoryData?.meta_description}
        />
        <meta property="og:image" content={subcategoryData?.image_url} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* Banner Section */}
        <div className="relative w-full h-[250px] md:h-[300px]">
          <img
            src={subcategoryData?.image_url}
            alt={subcategoryData?.subcategory_name}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-2">
              {subcategoryData?.subcategory_name}
            </h1>
            <p className="text-lg md:text-xl text-white text-center">
              {subcategoryData?.subcategory_title}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products?.map((product) => {
              const discountPercentage = calculateDiscountPercentage(product);

              return (
                <motion.div
                  key={product.id}
                  variants={item}
                  className="group"
                  whileHover={{ scale: 1.05 }}
                  onClick={() =>
                    navigate(
                      `${config.VITE_BASE_URL}/product/${product.id}/${product.slug}`
                    )
                  }
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xl cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={product.productimage?.image_url}
                        alt={product.product_name}
                        className="w-full h-full transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                      {discountPercentage > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                          {discountPercentage}% OFF
                        </div>
                      )}
                    </div>

                    <div className="p-4 text-center">
                      <h2 className="text-base md:text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#10847E] transition-colors duration-300">
                        {product.product_name}
                      </h2>

                      <div className="mb-4 h-20 overflow-hidden relative">
                        <div
                          className="text-sm text-gray-600 prose prose-sm"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="text-sm text-gray-500 group-hover:text-[#10847E] transition-colors duration-300">
                          Explore Details
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
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default ProductListPage;
