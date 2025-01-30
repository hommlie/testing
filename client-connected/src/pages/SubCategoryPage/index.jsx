import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";
import axios from "axios";
import config from "../../config/config";

const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviews > 1000 ? `${(reviews / 1000).toFixed(1)}K` : reviews}{" "}
        reviews)
      </span>
    </div>
  );
};

const CartSection = ({ cart }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white glow-border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
        {cart?.length > 0 ? (
          <div className="space-y-4">
            {/* Cart items would go here */}
            <div className="pt-4 border-t">
              <button className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition">
                Checkout Now
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm">Add some services to get started</p>
          </div>
        )}
      </div>

      <div className="bg-white glow-border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <span className="text-emerald-600">✓</span>
            <span>Verified Professionals</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-emerald-600">✓</span>
            <span>100% Satisfaction</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-emerald-600">✓</span>
            <span>Expert Service</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SubCategoryPage = () => {
  const { categoryId, categorySlug, location } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    subcategory: [],
    categoryData: null,
  });
  const [isLoading, setIsLoading] = useState(true);

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

      setData(subCatResponse.data.data);
      console.log("Sub categories:", subCatResponse.data.data.subcategory);
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

  const locations = data?.categoryData?.location?.split("|") || [];
  const currentLocation =
    location?.charAt(0)?.toUpperCase() + location?.slice(1);
  const currentLocationTitle =
    location && currentLocation ? ` in ${currentLocation}` : "";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <main className="max-w-7xl w-full">
      <div className="container px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <a href="/" className="text-emerald-600 hover:text-emerald-700">
            Home
          </a>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500">
            {data?.categoryData?.category_name}
          </span>
        </nav>

        {/* Banner Section */}
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
          <img
            src={data?.categoryData?.motion_graphics}
            alt={data?.categoryData?.category_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">
                {data?.categoryData?.category_name}
              </h1>
              {data?.categoryData?.avg_rating && (
                <StarRating
                  rating={data?.categoryData.avg_rating}
                  reviews={data?.categoryData.total_reviews}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Category Details */}
          <div className="lg:w-3/4">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6"
            >
              {data?.subcategory?.map((cat) => (
                <motion.div
                  key={cat.subcat_id}
                  variants={item}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">
                        {cat.subcategory_name}
                      </h2>
                      {cat.avg_rating && (
                        <StarRating
                          rating={cat.avg_rating}
                          reviews={cat.total_reviews}
                        />
                      )}

                      {cat.specifications && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">Specifications:</h3>
                          <ul className="space-y-1">
                            {cat.specifications
                              .split("|")
                              .map((spec, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2 text-gray-600"
                                >
                                  <span className="text-black">•</span>
                                  <span>{spec.trim()}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      <button
                        onClick={() => handleSubCategoryClick(cat)}
                        className="mt-4 flex items-center text-emerald-600 hover:text-emerald-700 font-medium group"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={cat.subcategory_icon}
                        alt={cat.subcategory_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Section - Cart */}
          <div className="lg:w-1/4">
            <div className="sticky top-44 space-y-6">
              <CartSection cart={[]} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubCategoryPage;
