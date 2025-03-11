import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
            className={`w-2 md:w-4 h-2 md:h-4 ${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-sm">
        {rating} ({reviews > 1000 ? `${(reviews / 1000).toFixed(1)}K` : reviews}{" "}
        reviews)
      </div>
    </div>
  );
};

const CollapsibleSection = ({ title, content, isHtml = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-lg md:text-2xl font-semibold text-left">{title}</h2>
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6">
              {isHtml ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="prose max-w-none">{content}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="border-t border-gray-100 first:border-t-0">
      <button
        onClick={onToggle}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
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
            transition={{ duration: 0.3 }}
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
  const locationState = useLocation().state;
  const location = locationState?.location;
  const { categoryId, categorySlug } = useParams();
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
    window.scrollTo(0, 0);

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
    console.log(subCategory);

    const path =
      subCategory.category.is_page === 1
        ? `/subcategory/${subCategory.slug}/${subCategory.subcat_id}`
        : `/products/${subCategory.slug}/${subCategory.subcat_id}`;
    navigate(path);
  };

  const getLocations = () => {
    const locations = data?.categoryData?.location?.split("|") || [];

    const locationObjects = locations.map((location) => {
      // Trim any extra spaces
      const trimmedLocation = location.trim();

      // Convert the title to a slug
      const slug = trimmedLocation
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ""); // Remove any non-alphanumeric characters except hyphens

      return {
        title: trimmedLocation,
        slug: slug,
      };
    });

    return locationObjects;
  };

  return (
    <main className="md:max-w-7xl w-full">
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
        <div className="relative w-full h-[150px] md:h-[300px] rounded-xl overflow-hidden mb-8">
          <img
            src={data?.categoryData?.motion_graphics}
            alt={data?.categoryData?.category_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-4 uppercase">
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
        <div className="flex items-center bg-white rounded-lg glow-border mb-8 relative">
          {/* Left Arrow */}
          <div
            className="absolute left-0 z-10 p-1 md:p-2 cursor-pointer bg-white glow-border rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            onClick={() => {
              const container = document.getElementById("scroll-container");
              container.scrollBy({ left: -200, behavior: "smooth" });
            }}
            style={{ display: "none" }} // Initially hidden
            id="left-arrow"
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

          {/* Scrollable Content */}
          <div
            id="scroll-container"
            className="flex gap-2 md:gap-4 p-4 overflow-x-auto scrollbar-hide"
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
                <p className="w-32 text-xs text-center font-medium mt-2 line-clamp-2">
                  {cat.subcategory_name}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div
            className="absolute right-0 z-10 p-1 md:p-2 cursor-pointer bg-white glow-border rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
            onClick={() => {
              const container = document.getElementById("scroll-container");
              container.scrollBy({ left: 200, behavior: "smooth" });
            }}
            style={{ display: "none" }} // Initially hidden
            id="right-arrow"
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Category Details */}
          <div className="w-full lg:w-3/4">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-3 lg:gap-6"
            >
              {data?.subcategory?.map((cat) => (
                <motion.div
                  key={cat.subcat_id}
                  variants={item}
                  ref={(el) => (sectionRefs.current[cat.subcat_id] = el)}
                  onClick={() => handleSubCategoryClick(cat)}
                  className="bg-white rounded-xl p-2 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex gap-1 md:gap-6">
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-semibold mb-2">
                        {cat.subcategory_name}
                      </h2>
                      {cat.avg_rating && (
                        <StarRating
                          rating={cat.avg_rating}
                          reviews={cat.total_reviews}
                        />
                      )}

                      {cat.specifications && (
                        <div className="mt-2 md:mt-4">
                          <h3 className="text-sm md:text-base font-medium mb-2">
                            Specifications:
                          </h3>
                          <ul className="text-xs md:text-base space-y-1">
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
                        className="mt-3 md:mt-4 flex items-center text-xs md:text-base text-emerald-600 hover:text-emerald-700 font-medium group"
                      >
                        View Details
                        <ArrowRight className="w-2 md:w-4 h-2 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="w-24 md:w-32 h-24 md:h-32 flex-shrink-0">
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
              <div className="mt-4 md:mt-12">
                <CollapsibleSection
                  title={`About ${data?.categoryData?.category_name}`}
                  content={data.categoryData.about}
                  isHtml={true}
                />
              </div>
            )}

            {/* FAQs Section */}
            {data?.categoryData?.faqs && (
              <div className="mt-4 md:mt-8">
                <CollapsibleSection
                  title="Frequently Asked Questions"
                  content={data.categoryData.faqs}
                  isHtml={true}
                />
              </div>
            )}

            {/* Quick Links Section */}
            <section className="mt-4 md:mt-8 bg-white rounded-xl shadow-lg">
              <h2 className="text-lg md:text-2xl font-semibold p-6">
                Quick Links
              </h2>

              <QuickLinkSection
                title="Also available in"
                isOpen={openSection === "locations"}
                onToggle={() =>
                  setOpenSection(openSection === "locations" ? "" : "locations")
                }
              >
                <div className="text-sm md:text-base leading-relaxed">
                  {getLocations()?.map((location, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <span className="mx-2 text-gray-400">•</span>
                      )}
                      <a
                        href={`${
                          config.VITE_BASE_URL
                        }/${location?.slug?.trim()}/${categoryId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(
                            `${
                              config.VITE_BASE_URL
                            }/${location?.slug?.trim()}/${categoryId}`,
                            {
                              state: { location: location?.title?.trim() },
                            }
                          );
                        }}
                        className="text-blue-600 hover:underline inline-block"
                      >
                        {location?.title?.trim()}
                      </a>
                    </React.Fragment>
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
                <div className="text-sm md:text-base leading-relaxed">
                  {data?.categoryData?.other_services?.map((service, index) => (
                    <React.Fragment key={service.id}>
                      {index > 0 && (
                        <span className="mx-2 text-gray-400">•</span>
                      )}
                      <a
                        href={`/${service.slug}/${service.id}`}
                        className="text-blue-600 hover:underline inline-block"
                      >
                        {service.category_name}
                      </a>
                    </React.Fragment>
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
