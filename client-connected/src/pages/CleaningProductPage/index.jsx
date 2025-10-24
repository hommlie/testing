import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ChevronDown, Star } from "lucide-react";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";
import ProductDetailModal from "../../components/ProductDetailsModal";
import NoImage from "../../assets/bg/no-image.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ShareButton from "../ShareButtonsubcat.jsx";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1].map((star) => {
        const starValue = star;
        const fillPercentage = Math.max(
          0,
          Math.min(
            100,
            Math.round(Math.max(0, Math.min(1, rating - starValue + 1)) * 100)
          )
        );

        return (
          <div key={star} className="relative">
           <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6C43F3]">
             <Star className="w-3 h-3 text-white" fill="currentColor" />
           </span>
           <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              
            </div>
          </div>
        );
      })}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
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

const CartSection = ({ cart, onUpdateQty, isQtyLoading, loadingItemId }) => {
  const calculateCartTotal = () => {
    return cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  };

  return (
    <div className="overflow-y-auto">
      <div className="space-y-4">
        <section className="bg-white rounded-lg p-4 space-y-4 border border-black">
          <h2 className="text-base md:text-xl font-semibold">Cart Summary</h2>

          {cart?.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b"
                >
                  {/* Product info */}
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium">
                      {item.product_name}
                    </span>
                    {item.variation_name && (
                      <span className="text-sm text-gray-500">
                        {item.variation_name}
                      </span>
                    )}
                  </div>

                  {/* Line total + qty controls */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-medium">
                      ₹{(Number(item.price) * item.qty).toFixed(2)}
                    </span>

                    {/* Qty control */}
                    <div className="flex items-center border border-[#249370] rounded-lg">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="px-2 py-1 text-[#249370] hover:bg-[#249370] hover:text-white"
                        disabled={isQtyLoading && loadingItemId === item.id}
                      >
                        -
                      </button>
                      <span className="px-3">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="px-2 py-1 text-[#249370] hover:bg-[#249370] hover:text-white"
                        disabled={isQtyLoading && loadingItemId === item.id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{calculateCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>₹{calculateCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                className="bg-emerald-700 hover:bg-[#52852d] w-full text-white py-2 rounded-md transition"
                onClick={() => (window.location.href = "/add-to-cart")}
              >
                Checkout Now
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-600 py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16 mb-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18M3 7h18M3 7v14h18V7M8 11v6m4-6v6m4-6v6"
                />
              </svg>
              <p className="text-lg font-semibold">Your cart is empty</p>
              <p className="text-sm text-gray-500">
                Looks like you haven’t added anything to your cart yet.
              </p>
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg p-4 space-y-4 border border-black">
          <h2 className="text-base md:text-xl font-semibold">
            Hommlie Features
          </h2>
          <ul className="text-sm md:text-base space-y-2 text-gray-600">
            <li>✓ Verified Professionals</li>
            <li>✓ Safe Chemicals</li>
            <li>✓ Service in 4hr</li>
            <li>✓ Superior Stain Removal</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const CleaningProductPage = () => {
  const locationState = useLocation().state;
  const location = locationState?.location;
  const { slug, tag } = useParams();
  const navigate = useNavigate();
  const { cart, user, checkoutPd, getCart } = useCont();

  const [isLoading, setIsLoading] = useState(false);
  const [innerSubCategoryData, setInnerSubCategoryData] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [showVariationDetails, setShowVariationDetails] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'add'
  const [activeImage, setActiveImage] = useState();
  const [selectedAttributeId, setSelectedAttributeId] = useState();
  const [openSection, setOpenSection] = useState("");

  const productRefs = useRef([]);

  const [isQtyLoading, setIsQtyLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    fetchSubCategoryData();
  }, [slug]);

  const fetchSubCategoryData = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}/api/cleaningsubcategory`,
        { slug }
      );
      if (response.data.status === 1) {
        setInnerSubCategoryData(response.data.data);

        // Update meta tags
        document.title = response.data.data?.meta_title;
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            response.data.data?.meta_description
          );
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching inner sub-category data:", error);
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    const proceedBtn = document.getElementById("proceed-btn")?.onClick;
    if (typeof proceedBtn == undefined) {
      navigate(`${config.VITE_BASE_URL}/add-to-cart`);
    }
  };

  const handleProductClick = (index) => {
    setCurrentProductIndex(index);

    const element = productRefs.current[index];
    const offset = 175;

    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  };

  const handleProductNavigate = (product) => {
    const slug = product.product_name.toLowerCase().replace(/ /g, "-");
    navigate(`${config.VITE_BASE_URL}/product/${slug}/tag/${tag}`);
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? innerSubCategoryData.products.length - 1 : prevIndex - 1
    );
    productRefs.current[
      prevIndex === 0 ? innerSubCategoryData.products.length - 1 : prevIndex - 1
    ].scrollIntoView({ behavior: "smooth" });
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === innerSubCategoryData.products.length - 1 ? 0 : prevIndex + 1
    );
    productRefs.current[
      prevIndex === innerSubCategoryData.products.length - 1 ? 0 : prevIndex + 1
    ].scrollIntoView({ behavior: "smooth" });
  };

  const handleViewDetails = (product, attributeId = null, mode = "view") => {
    setSelectedProduct(product);
    setSelectedAttributeId(attributeId);
    setModalMode(mode);
    setIsDetailModalOpen(true);
  };

  if (!innerSubCategoryData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loading />
      </div>
    );
  }

  const getLocations = () => {
    const locations = innerSubCategoryData?.location?.split("|") || [];

    const locationObjects = locations.map((location) => {
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

    return locationObjects;
  };

  const generateCanonicalUrl = () => {
    const baseUrl = config.VITE_BASE_URL || "https://www.hommlie.com";
    let path = `/subcategory/${slug}`;
    return `${baseUrl}${path}`;
  };

  const handleRemoveFromCart = async (cartId) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      setIsModalOpen(true);
      return;
    }
    const decoded = jwtDecode(jwtToken);

    try {
      await axios.post(
        `${config.API_URL}/api/deleteproduct`,
        { user_id: decoded.id, cart_id: cartId },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      await getCart();
    } catch (err) {
      console.error("error removing from cart:", err);
    }
  };

  const handleQtyUpdate = async (cartId, newQty) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      setIsModalOpen(true);
      return;
    }

    setIsQtyLoading(true);
    setLoadingItemId(cartId);

    try {
      if (newQty <= 0) {
        await handleRemoveFromCart(cartId);
      } else {
        const res = await axios.post(
          `${config.API_URL}/api/qtyUpdate`,
          { qty: newQty, cart_id: cartId },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        await getCart();
      }
    } catch (err) {
      console.error("error updating cart:", err);
    } finally {
      setIsQtyLoading(false);
      setLoadingItemId(null);
    }
  };

  return (
    <main className="md:max-w-7xl w-full bg-white">
      <Helmet>
        <title>{innerSubCategoryData?.meta_title || "Category Page"}</title>
        <meta
          name="description"
          content={innerSubCategoryData?.meta_description || ""}
        />
        <link rel="canonical" href={generateCanonicalUrl()} />
      </Helmet>
      <div className="container px-4 mt-5">
        <div className="mt-5">
          <nav className="hidden sm:block flex space-x-1 text-gray-500 text-xs">
            <a href="/" className="text-blue-500">
              Home
            </a>
            <span>/</span>
            <a
              href={`${config.VITE_BASE_URL}/category/${innerSubCategoryData?.category?.slug}`}
              className="text-blue-500"
            >
              {innerSubCategoryData?.category?.category_name}
            </a>
            <span>/</span>
            {/* <span>{innerSubCategoryData?.subcategory_name}</span> */}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 lg:row-span-2">
              <div className="sticky top-44 transition-all duration-300 ease-in-out">
                <div className="space-y-1">
                  <h1 className="text-2xl font-semibold">
                    {location ? location : innerSubCategoryData?.subcategory_name}
                  </h1>
                  {(innerSubCategoryData.avg_rating || innerSubCategoryData.total_reviews) && (
                    <div className="flex items-center space-x-2">
                      <StarRating rating={innerSubCategoryData.avg_rating} />
                      {innerSubCategoryData.total_reviews && (
                        <span className="text-sm text-gray-500">
                          (
                          {innerSubCategoryData.total_reviews >= 1000
                            ? `${(innerSubCategoryData.total_reviews / 1000).toFixed(1)}K`
                            : innerSubCategoryData.total_reviews}{" "}
                          reviews)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <section className="bg-white rounded-lg p-4 space-y-4 shadow mt-2 border border-black">
                  <div className="flex justify-start items-center">
                    <span className="text-sm font-medium text-gray-600">Select a service</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-2 max-h-[calc(100vh-16rem)] overflow-y-auto">
                    {innerSubCategoryData?.products?.map((product, index) => (
                      <div
                        key={product.id}
                        className={`flex flex-col items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                          index === currentProductIndex
                            ? "glow-border bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleProductClick(index)}
                      >
                        {product.productimages && product.productimages.length > 0 ? (
                          <img
                            src={product.productimages[0]?.image_url}
                            alt={product.product_name}
                            className="w-26 h-26 rounded-md object-cover"
                          />
                        ) : (
                          <img
                            src={NoImage}
                            alt=""
                            className="w-20 h-20 rounded-md object-cover opacity-40"
                          />
                        )}
                        <p className="text-xs text-center font-medium mt-2 line-clamp-2 w-full">
                          {product.product_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Banner */}
            <div className="hidden sm:block lg:col-start-2 lg:col-span-3 lg:row-start-1">
              {innerSubCategoryData?.subcategory_banner ? (
                <img
                  src={innerSubCategoryData?.subcategory_banner}
                  alt={innerSubCategoryData?.innersubcategory_name}
                  className="w-full h-[160px] md:h-[295px] rounded-lg -mt-4 border border-black"
                />
              ) : (
                <img
                  src={NoImage}
                  alt=""
                  className="w-full h-[150px] md:h-[300px] rounded-lg opacity-40"
                />
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2">
              <div className="space-y-6">
                {innerSubCategoryData?.products?.map((product, index) => (
                  <section
                    key={product.id}
                    ref={(el) => (productRefs.current[index] = el)}
                    className="bg-white rounded-lg p-4 shadow scroll-mt-2 border border-black"
                  >
                    <h3 className="text-base md:text-2xl font-semibold">
                      {product.product_name}
                    </h3>
                    <div className="divide-y">
                      {[...(product?.attributes || [])]
                        .sort((a, b) => {
                          const aName = a.attribute_name?.toLowerCase() || "";
                          const bName = b.attribute_name?.toLowerCase() || "";
                          if (aName.includes("one time")) return -1;
                          if (bName.includes("one time")) return 1;
                          return 0;
                        })
                        .map((attribute, attrIndex) => (
                        <div
                          key={attrIndex}
                          className={`py-4 md:py-6 ${
                            attrIndex === product.attributes.length - 1
                              ? ""
                              : "border-gray-200"
                          }`}
                        >
                          <div className="md:flex md:items-start md:gap-10">
                            {/* LEFT */}
                            <div className="md:w-72 w-full md:shrink-0">
                              <div className="relative w-full h-46 md:h-48 sm:-mt-2">
                                <img
                                  src={attribute.image || product?.productimages?.[0]?.image_url || NoImage}
                                  alt={product.product_name}
                                  className="w-full h-full rounded-lg object-cover border"
                                />
                              </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1 mt-4 md:mt-0">
                              <div className="space-y-3">
                                <h3 className="text-l sm:text-xs md:text-base flex gap-2 items-center font-semibold">
                                  {attribute.attribute_name}
                                </h3>

                                {(attribute?.avg_rating || attribute?.total_reviews) && (
                                  <div className="flex items-center gap-2 border-b border-dotted border-gray-400 w-fit pb-[2px]">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6C43F3]">
                                      <Star className="w-3 h-3 text-white" fill="currentColor" />
                                    </span>
                                    <span className="text-sm md:text-base font-semibold text-gray-800">
                                      {(Number(attribute?.avg_rating) || 0).toFixed(1)}
                                    </span>
                                    {attribute?.total_reviews && (
                                      <span className="text-xs md:text-sm text-gray-500">
                                        (
                                        {attribute.total_reviews >= 1000
                                          ? `${(attribute.total_reviews / 1000).toFixed(0)}K`
                                          : attribute.total_reviews}{" "}
                                        reviews)
                                      </span>
                                    )}
                                  </div>
                                )}
                                {attribute.variations?.length > 0 && (
                                  <p className="text-l sm:text-xs md:text-base flex gap-2 items-center">
                                    Starts from
                                    <span className="text-black-600 font-medium">
                                      ₹{attribute?.starting_price}
                                    </span>
                                  </p>
                                )}
                              </div>

                              {/* MOBILE specs */}
                              {attribute.specifications && (
                                <div className="space-y-2 mt-4 md:hidden">
                                  <h4 className="text-sm md:text-base font-semibold text-gray-700">
                                    Specifications:
                                  </h4>
                                  <ul className="space-y-2 md:space-y-2">
                                    {attribute.specifications
                                      .split("|")
                                      .map((s) => s.trim())
                                      .filter(Boolean)
                                      .map((spec, i) => (
                                        <li key={i} className="text-base">
                                          <div className="flex items-start gap-2">
                                            <span className="mt-1 leading-6 text-black">•</span>
                                            <span className="text-gray-700 leading-6 whitespace-normal break-words">
                                              {spec.replace(/^"|"$/g, "")}
                                            </span>
                                          </div>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              )}

                              <div className="flex items-start justify-between mt-4 md:hidden">
                                <button
                                  className="text-sm text-[#6c43f3]  hover:text-blue-700 font-semibold mt-4"
                                  onClick={() => handleViewDetails(product, attribute.attribute_id, "view")}
                                >
                                  View Service Details
                                </button>

                                <div className="flex flex-col items-center">
                                  <button
                                    className="bg-white text-[#6c43f3]  px-5 py-2 rounded-lg shadow-md border hover:bg-emerald-50 transition-colors"
                                    onClick={() => handleViewDetails(product, attribute.attribute_id, "add")}
                                  >
                                    Add to cart
                                  </button>

                                  {attribute?.variations?.length > 0 && (
                                    <p className="mt-1 text-center text-xs text-gray-600">
                                      {attribute.variations.length} option{attribute.variations.length > 1 ? "s" : ""}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DESKTOP specs */}
                          {attribute.specifications && (
                            <div className="hidden md:block mt-4">
                              <h4 className="text-base font-semibold text-gray-700 mb-2">Specifications:</h4>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                {attribute.specifications
                                  .split("|")
                                  .map((s) => s.trim())
                                  .filter(Boolean)
                                  .map((spec, i) => (
                                    <div key={i} className="flex items-center">
                                      <span className="text-black mr-2">•</span>
                                      <span className="text-gray-700 text-base whitespace-normal break-words">
                                        {spec.replace(/^"|"$/g, "")}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                          <div className="hidden md:flex items-start justify-between mt-4">
                            <button
                              className="text-base text-[#6c43f3]  hover:text-blue-700 font-semibold mt-2"
                              onClick={() => handleViewDetails(product, attribute.attribute_id, "view")}
                            >
                              View Services Details
                            </button>

                            <div className="flex flex-col items-start">
                              <button
                                className="bg-white text-[#6c43f3] font-semibold px-6 py-2 rounded-lg shadow-md border hover:bg-emerald-50 transition-colors"
                                onClick={() => handleViewDetails(product, attribute.attribute_id, "add")}
                              >
                                Add to cart
                              </button>

                              {attribute?.variations?.length > 0 && (
                                <p className="mt-1 text-xs text-gray-600 ml-10">
                                  {attribute.variations.length} option{attribute.variations.length > 1 ? "s" : ""}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* Right Cart */}
            <div className="lg:col-start-4 lg:col-span-1 lg:row-start-2">
              <div className="sticky h-fit top-8 transition-all duration-300 ease-in-out">
                <CartSection
                  cart={cart}
                  onUpdateQty={handleQtyUpdate}
                  isQtyLoading={isQtyLoading}
                  loadingItemId={loadingItemId}
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        {innerSubCategoryData?.about && (
          <div className="mt-4 md:mt-12">
            <CollapsibleSection
              title={`About ${innerSubCategoryData?.subcategory_name}`}
              content={innerSubCategoryData.about}
              isHtml={true}
            />
          </div>
        )}

        {/* FAQs Section */}
        {innerSubCategoryData?.faqs && (
          <div className="mt-4 md:mt-8">
            <CollapsibleSection
              title="Frequently Asked Questions"
              content={innerSubCategoryData.faqs}
              isHtml={true}
            />
          </div>
        )}

        {/* Quick Links */}
        <section className="mt-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-base md:text-2xl font-semibold p-6">
            Quick Links
          </h2>

          <QuickLinkSection
            title="Also available in"
            isOpen={openSection === "locations"}
            onToggle={() =>
              setOpenSection(openSection === "locations" ? "" : "locations")
            }
          >
            <div className="flex flex-col space-y-2 text-sm md:text-base leading-relaxed">
              {getLocations()?.map((location, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="text-gray-400 mr-2">•</span>}
                  <a
                    href={`${config.VITE_BASE_URL}/subcategory/${location?.slug?.trim()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `${config.VITE_BASE_URL}/subcategory/${location?.slug?.trim()}`,
                        { state: { location: location?.title?.trim() } }
                      );
                    }}
                    className="text-grey hover:text-blue-400 transition-colors duration-200"
                  >
                    {location?.title?.trim()}
                  </a>
                </div>
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
              {innerSubCategoryData?.other_services?.map((service, index) => (
                <React.Fragment key={service.id}>
                  {index > 0 && <span className="mx-2 text-gray-400">•</span>}
                  <a
                    href={`/subcategory/${service.slug}`}
                    className="text-gray-500 hover:text-blue-600 hover:underline inline-block transition-colors duration-200"
                  >
                    {service.subcategory_name}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </QuickLinkSection>
        </section>

        <LoginSignup
          isOpen={isModalOpen}
          onClose={closeModal}
          checkoutPd={checkoutPd}
        />

        {/* Render the modal always and let the modal's internal AnimatePresence
            control entry/exit based on the `isOpen` prop. Passing the real
            `isDetailModalOpen` value lets the modal play its exit animation
            (slide down) when the parent toggles the flag. */}
        <ProductDetailModal
          key={`pdm-${selectedProduct?.id || "x"}`}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          product={selectedProduct}
          selectedAttributeId={selectedAttributeId}
          mode={modalMode}
        />
      </div>

      <ShareButton />
    </main>
  );
};

export default CleaningProductPage;
