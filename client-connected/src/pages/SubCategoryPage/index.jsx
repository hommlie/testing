import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      <span className="text-sm text-white">
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

const QuickLinkSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="">
      <button
        onClick={onToggle}
        className="w-full py-4 px-6 flex justify-between items-center"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [activeSection, setActiveSection] = useState(null);
  const [openSection, setOpenSection] = useState("");

  const sectionRefs = useRef({});

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

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100;
    let currentSection = null;

    Object.entries(sectionRefs.current).forEach(([key, ref]) => {
      if (ref && ref.offsetTop <= scrollPosition) {
        currentSection = key;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 175;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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

  const handleSubCategoryClick = (subCategory) => {
    const path =
      subCategory.category.is_page === 1
        ? `/subcategory/${subCategory.slug}/${subCategory.subcat_id}`
        : `/products/${subCategory.slug}/${subCategory.subcat_id}`;
    navigate(path);
  };

  const locations = data?.categoryData?.location?.split("|") || [];

  return (
    <main className="max-w-7xl w-full">
      <div className="container px-4 mt-5">
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
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-4xl font-bold mb-4 uppercase">
                {location ? location : data?.categoryData?.category_name}
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

        {/* Services Quick Nav */}
        <div className="flex items-center justify-center bg-white rounded-lg glow-border mb-8 relative">
          {/* Left Arrow */}
          <div
            className="absolute left-0 z-10 p-2 cursor-pointer bg-white glow-border rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            onClick={() => {
              const container = document.getElementById("scroll-container");
              container.scrollBy({ left: -200, behavior: "smooth" });
            }}
            style={{ display: "none" }} // Initially hidden
            id="left-arrow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

          {/* Scrollable Content */}
          <div
            id="scroll-container"
            className="flex gap-4 p-4 overflow-x-auto scrollbar-hide"
            onScroll={(e) => {
              const container = e.target;
              const leftArrow = document.getElementById("left-arrow");
              const rightArrow = document.getElementById("right-arrow");

              // Show/hide arrows based on scroll position
              leftArrow.style.display =
                container.scrollLeft > 0 ? "block" : "none";
              rightArrow.style.display =
                container.scrollLeft <
                container.scrollWidth - container.clientWidth
                  ? "block"
                  : "none";
            }}
          >
            {data?.subcategory?.map((cat) => (
              <div
                key={cat.subcat_id}
                onClick={() => scrollToSection(cat.subcat_id)}
                className={`w-32 flex flex-col items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                  activeSection === cat.subcat_id
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <img
                  src={cat.subcategory_icon}
                  alt=""
                  className="w-20 h-20 rounded-md"
                />
                <p className="text-xs text-center font-medium mt-2 line-clamp-2 w-full">
                  {cat.subcategory_name}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div
            className="absolute right-0 z-10 p-2 cursor-pointer bg-white glow-border rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            onClick={() => {
              const container = document.getElementById("scroll-container");
              container.scrollBy({ left: 200, behavior: "smooth" });
            }}
            style={{ display: "none" }} // Initially hidden
            id="right-arrow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
                  ref={(el) => (sectionRefs.current[cat.subcat_id] = el)}
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

            {/* About Section */}
            {data?.categoryData?.about && (
              <section className="mt-12 bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  About {data?.categoryData?.category_name}
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.categoryData.about }}
                />
              </section>
            )}

            {/* FAQs Section */}
            {data?.categoryData?.faqs && (
              <section className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Frequently Asked Questions
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.categoryData.faqs }}
                />
              </section>
            )}

            {/* Quick Links Section */}
            <section className="mt-8 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold p-6">Quick Links</h2>

              <QuickLinkSection
                title="Also available in"
                isOpen={openSection === "locations"}
                onToggle={() =>
                  setOpenSection(openSection === "locations" ? "" : "locations")
                }
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {locations.map((location, index) => (
                    <a
                      key={index}
                      href={`${
                        config.VITE_BASE_URL
                      }/${categorySlug}-in-${location.trim()}/${categoryId}/${location.trim()}`}
                      className="text-blue-600 hover:underline"
                    >
                      {location.trim()}
                    </a>
                  ))}
                </div>
              </QuickLinkSection>

              <QuickLinkSection
                title="Other services we provide"
                isOpen={openSection === "services"}
                onToggle={() =>
                  setOpenSection(openSection === "services" ? "" : "services")
                }
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.categoryData?.other_services?.map((service) => (
                    <a
                      key={service.id}
                      href={`/${service.slug}/${service.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {service.category_name}
                    </a>
                  ))}
                </div>
              </QuickLinkSection>
            </section>
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
