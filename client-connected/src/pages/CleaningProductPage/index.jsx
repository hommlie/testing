import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ChevronDown, Star, CheckCircle2, ShoppingBag, Info, ArrowRight, Tag, Search, Zap } from "lucide-react";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";
import ProductDetailModal from "../../components/ProductDetailsModal";
import NoImage from "../../assets/bg/no-image.svg";
import Breadcrumb from "../../components/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ShareButton from "../ShareButtonsubcat.jsx";

const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <div className="flex items-center bg-[#fef3c7] px-2 py-0.5 rounded-md border border-[#f59e0b]/20">
        <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b] mr-1" />
        <span className="text-sm font-bold text-[#b45309]">{rating.toFixed(1)}</span>
      </div>
      {reviews && (
        <span className="text-xs font-medium text-gray-500">
          ({reviews >= 1000 ? `${(reviews / 1000).toFixed(1)}K` : reviews} reviews)
        </span>
      )}
    </div>
  );
};

const CollapsibleSection = ({ title, content, isHtml = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-4 md:px-0 flex justify-between items-center transition-colors group"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-left group-hover:text-[#0463ac] transition-colors">{title}</h2>
        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <ChevronDown
            className={`w-6 h-6 text-gray-400 group-hover:text-[#0463ac] transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""
              }`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-4 md:px-0 pb-6">
              {isHtml ? (
                <div
                  className="prose max-w-none text-gray-600"
                  translate="no"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="prose max-w-none text-gray-600">{content}</div>
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
    <div className="border-t border-gray-100">
      <button
        onClick={onToggle}
        className="w-full py-5 px-4 md:px-0 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""
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
            <div className="px-4 md:px-0 pb-6">{children}</div>
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
    <div className="overflow-y-auto custom-scrollbar no-scrollbar">
      <div className="space-y-0">
        <section className="bg-white md:bg-white rounded-none md:rounded-2xl pt-2 px-4 pb-4 md:p-6 space-y-2 shadow-none md:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-none md:border md:border-gray-100">
          <h2 className="text-xl md:text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Cart Summary</h2>

          {cart?.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                >
                  {/* Product info */}
                  <div className="flex flex-col flex-1 pr-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {item.product_name}
                    </span>
                    {item.variation_name && (
                      <span className="text-xs text-gray-500 mt-0.5">
                        {item.variation_name}
                      </span>
                    )}
                  </div>

                  {/* Line total + qty controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-semibold text-gray-900 tabular-nums">
                      ₹{(Number(item.price) * item.qty).toFixed(2)}
                    </span>

                    {/* Qty control */}
                    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#0463ac] hover:bg-white hover:shadow-sm rounded transition-all font-semibold"
                        disabled={isQtyLoading && loadingItemId === item.id}
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-semibold tabular-nums text-gray-900">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#0463ac] hover:bg-white hover:shadow-sm rounded transition-all font-semibold"
                        disabled={isQtyLoading && loadingItemId === item.id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div className="pt-6 space-y-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold tabular-nums text-gray-900">₹{calculateCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-4 border-t border-gray-200 text-xl tracking-tight">
                  <span>Total Amount</span>
                  <span className="tabular-nums">₹{calculateCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0463ac] hover:bg-[#03528b] w-full text-white py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(4,99,172,0.2)] transition-all flex items-center justify-center gap-2"
                onClick={() => (window.location.href = "/add-to-cart")}
              >
                Checkout Now
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-400 py-12">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 opacity-20" />
              </div>
              <p className="text-lg font-bold text-gray-800">Your cart is empty</p>
              <p className="text-xs text-gray-400 max-w-[200px] mt-1">
                Add services to see them here and proceed to booking
              </p>
            </div>
          )}
        </section>

        <section className="bg-gradient-to-br from-[#0463ac] to-[#03528b] rounded-2xl p-6 space-y-4 shadow-lg text-white relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
            Hommlie Promise
          </h2>
          <ul className="text-xs space-y-3 font-medium opacity-90">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></div>
              Verified Professionals
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></div>
              Safe & Non-Toxic Chemicals
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></div>
              Fast Service in 4 Hours
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></div>
              Premium Quality Guarantee
            </li>
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

        // Meta tags are handled by <Helmet> component automatically
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
    <main className="w-full md:max-w-7xl mx-auto bg-white min-h-screen">
      <Helmet>
        <title>{innerSubCategoryData?.meta_title || "Category Page"}</title>
        <meta
          name="description"
          content={innerSubCategoryData?.meta_description || ""}
        />
        <link rel="canonical" href={generateCanonicalUrl()} />
      </Helmet>
      <div className="w-full md:container md:px-4 mt-0 md:mt-5 bg-white">
        <div className="mt-0 md:mt-5">
          <div className="px-4 md:px-0">
            <Breadcrumb
              items={[
                {
                  label: innerSubCategoryData?.category?.category_name,
                  link: `${config.VITE_BASE_URL}/category/${innerSubCategoryData?.category?.slug}`
                },
                { label: innerSubCategoryData?.subcategory_name }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-2 md:gap-y-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 lg:row-span-2">
              <div className="sticky top-44 transition-all duration-300 ease-in-out">
                <div className="px-4 md:px-0 mt-0 md:mt-0 flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 tracking-tight leading-tight">
                      {location ? location : innerSubCategoryData?.subcategory_name}
                    </h1>
                    {(innerSubCategoryData.avg_rating || innerSubCategoryData.total_reviews) && (
                      <div className="flex items-center space-x-2">
                        <StarRating
                          rating={innerSubCategoryData.avg_rating}
                          reviews={innerSubCategoryData.total_reviews}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 shrink-0">
                    <div className="mt-1">
                      <ShareButton />
                    </div>

                    {/* Instant Badge */}
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col items-center w-24 shrink-0 transition-transform hover:scale-[1.02]">
                      <div className="bg-[#05a357] w-full py-1 flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-white fill-white" />
                        <span className="text-[10px] font-black text-white uppercase tracking-tighter">Instant</span>
                      </div>
                      <div className="py-1 px-2 pb-1.5">
                        <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">In 4 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promotional Offers Section */}
                <div className="mt-6 md:hidden border-b border-gray-200 pb-2">
                  <div className="flex overflow-x-auto pb-4 px-4 gap-3 no-scrollbar snap-x snap-mandatory">
                    {[
                      { title: "Up to ₹150 cashback", subtitle: "Via Paytm UPI only" },
                      { title: "Up to ₹100 cashback", subtitle: "Valid for BHIM app only" },
                      { title: "Up to ₹100 cashback", subtitle: "Via POP UPI" },
                      { title: "Amazon cashback upto ₹100", subtitle: "Via Amazon Pay balance" },
                    ].map((offer, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-64 border border-gray-100 rounded-xl p-3 bg-white shadow-sm flex items-start gap-3 snap-start"
                      >
                        <div className="bg-green-500 rounded-lg p-1.5 shrink-0 mt-0.5">
                          <Tag className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 leading-tight">
                            {offer.title}
                          </span>
                          <span className="text-[11px] font-medium text-gray-400 mt-0.5">
                            {offer.subtitle}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <section className="bg-white md:bg-white rounded-none md:rounded-2xl p-4 md:p-4 space-y-4 shadow-none md:shadow-md mt-0 md:mt-4 border-none md:border md:border-gray-100 mx-0 md:mx-0 border-b border-gray-200 pb-2 md:pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Services</span>
                    <span className="text-[10px] bg-[#0463ac]/10 text-[#0463ac] px-2 py-0.5 rounded-full font-bold">
                      {innerSubCategoryData?.products?.length} Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[calc(100vh-18.5rem)] overflow-y-auto custom-scrollbar pr-1">
                    {innerSubCategoryData?.products?.map((product, index) => (
                      <motion.div
                        key={product.id}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col md:flex-row items-center gap-2 p-1.5 rounded-xl cursor-pointer transition-all duration-300 ${index === currentProductIndex
                          ? "md:bg-white md:shadow-[0_4px_12px_rgba(4,99,172,0.15)] md:ring-1 md:ring-[#0463ac]/20 bg-white shadow-md"
                          : "hover:bg-white/50"
                          }`}
                        onClick={() => handleProductClick(index)}
                      >
                        <div className={`w-full md:w-16 md:h-16 aspect-square rounded-xl flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 bg-gray-50 md:bg-gray-50 ${index === currentProductIndex ? "scale-105" : "border border-gray-100"}`}>
                          {product.productimages && product.productimages.length > 0 ? (
                            <img
                              src={product.productimages[0]?.image_url}
                              alt={product.product_name}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <ShoppingBag className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                        <p className={`w-full text-[13px] md:text-xs font-medium md:font-bold text-center md:text-left break-words px-1 ${index === currentProductIndex ? "text-[#0463ac] md:text-[#0463ac]" : "text-black md:text-gray-600"}`}>
                          {product.product_name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Banner */}
            <div className="hidden sm:block lg:col-start-2 lg:col-span-3 lg:row-start-1">
              {innerSubCategoryData?.subcategory_banner ? (
                <div className="w-full h-[180px] md:h-[320px] rounded-2xl -mt-4 shadow-lg border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={innerSubCategoryData?.subcategory_banner}
                    alt={innerSubCategoryData?.innersubcategory_name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={NoImage}
                  alt=""
                  className="w-full h-[150px] md:h-[300px] rounded-lg opacity-40"
                />
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2 mt-1 md:mt-0">
              <div className="space-y-8 md:space-y-12">
                {innerSubCategoryData?.products?.map((product, productIndex) => (
                  <motion.section
                    key={product.id}
                    ref={(el) => (productRefs.current[productIndex] = el)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                    className="scroll-mt-44"
                  >
                    <div className="flex items-center gap-3 mb-4 px-4 md:px-0 border-t border-gray-200 pt-4 md:border-none md:pt-0">
                      <div className="h-8 w-1.5 bg-[#0463ac] rounded-full"></div>
                      <h3 className="text-xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                        {product.product_name}
                      </h3>
                    </div>

                    <div className="space-y-6 md:space-y-8 px-0 md:px-0">
                      {[...(product?.attributes || [])]
                        .sort((a, b) => {
                          const aName = a.attribute_name?.toLowerCase() || "";
                          const bName = b.attribute_name?.toLowerCase() || "";
                          if (aName.includes("one time")) return -1;
                          if (bName.includes("one time")) return 1;
                          return 0;
                        })
                        .map((attribute, attrIndex) => (
                          <motion.div
                            key={attrIndex}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-none md:rounded-2xl p-0 shadow-sm md:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border-y md:border border-gray-100 overflow-hidden group mb-4 md:mb-0"
                          >
                            <div className="md:flex md:items-stretch">
                              {/* IMAGE SECTION */}
                              <div className="md:w-[280px] w-full md:shrink-0 relative overflow-hidden bg-gray-50 flex items-center justify-center min-h-[192px] md:min-h-0">
                                <img
                                  src={attribute.image || product?.productimages?.[0]?.image_url || NoImage}
                                  alt={product.product_name}
                                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Popular Tag for first attribute if it's 'one time' */}
                                {attribute.attribute_name.toLowerCase().includes("one time") && (
                                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0463ac] shadow-sm z-10 border border-[#0463ac]/10">
                                    Best Seller
                                  </div>
                                )}
                              </div>

                              {/* CONTENT SECTION */}
                              <div className="flex-1 p-5 md:p-6 flex flex-col">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                  <div className="space-y-2">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#0463ac] transition-colors">
                                      {attribute.attribute_name}
                                    </h3>

                                    {(attribute?.avg_rating || attribute?.total_reviews) && (
                                      <StarRating
                                        rating={Number(attribute?.avg_rating) || 0}
                                        reviews={attribute?.total_reviews}
                                      />
                                    )}
                                  </div>

                                  {attribute.variations?.length > 0 && (
                                    <div className="flex flex-col items-start md:items-end">
                                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Starts from
                                      </span>
                                      <span className="text-2xl font-black text-gray-900">
                                        ₹{attribute?.starting_price}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Desktop Specifications - Horizontal scroll style for more premium feel */}
                                {attribute.specifications && (
                                  <div className="mt-6 mb-6">
                                    <div className="flex items-center gap-2 mb-3 text-[#0463ac]">
                                      <Info className="w-4 h-4" />
                                      <span className="text-sm font-bold uppercase tracking-wide">Included in this service:</span>
                                    </div>
                                    <div className="space-y-2.5">
                                      {attribute.specifications
                                        .split("|")
                                        .map((s) => s.trim())
                                        .filter(Boolean)
                                        .slice(0, 3) // Show first 3 for cleanliness
                                        .map((spec, i) => (
                                          <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#0463ac]/10 flex items-center justify-center">
                                              <CheckCircle2 className="w-3 h-3 text-[#0463ac]" />
                                            </div>
                                            <span className="text-sm text-gray-600 leading-tight">
                                              {spec.replace(/^"|"$/g, "")}
                                            </span>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                )}

                                <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-50">
                                  <button
                                    className="flex items-center gap-2 text-[#0463ac] font-bold text-sm hover:translate-x-1 transition-transform group/btn"
                                    onClick={() => handleViewDetails(product, attribute.attribute_id, "view")}
                                  >
                                    View Details
                                    <ArrowRight className="w-4 h-4" />
                                  </button>

                                  <div className="flex flex-col items-center">
                                    <motion.button
                                      whileTap={{ scale: 0.95 }}
                                      animate={{
                                        scale: [1, 1.02, 1],
                                        boxShadow: [
                                          "0 4px 15px rgba(4,99,172,0.2)",
                                          "0 4px 25px rgba(4,99,172,0.4)",
                                          "0 4px 15px rgba(4,99,172,0.2)"
                                        ]
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                      className="relative overflow-hidden bg-[#0463ac] hover:bg-[#03528b] text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all group/atc"
                                      onClick={() => handleViewDetails(product, attribute.attribute_id, "add")}
                                    >
                                      <ShoppingBag className="w-4 h-4" />
                                      Add to cart
                                      {/* Shine effect */}
                                      <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/atc:animate-shine transition-transform duration-700"></div>
                                    </motion.button>
                                    {attribute?.variations?.length > 0 && (
                                      <span className="mt-1.5 text-xs font-black text-[#0463ac] uppercase tracking-wider">
                                        {attribute.variations.length} option{attribute.variations.length > 1 ? "s" : ""}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>

            {/* Right Cart */}
            <div className="lg:col-start-4 lg:col-span-1 lg:row-start-2 px-0 md:px-0">
              <div className="sticky h-fit top-8 transition-all duration-300 ease-in-out mt-1 lg:mt-0">
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
          <div className="mt-12 px-0 md:px-0">
            <CollapsibleSection
              title={`About ${innerSubCategoryData?.subcategory_name}`}
              content={innerSubCategoryData.about}
              isHtml={true}
            />
          </div>
        )}

        {/* FAQs Section */}
        {innerSubCategoryData?.faqs && (
          <div className="px-0 md:px-0">
            <CollapsibleSection
              title="Frequently Asked Questions"
              content={innerSubCategoryData.faqs}
              isHtml={true}
            />
          </div>
        )}

        {/* Quick Links */}
        <section className="mt-4 bg-transparent md:bg-white rounded-none md:rounded-2xl shadow-none md:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-t md:border border-gray-200 overflow-hidden">

          <div className="py-5 px-4 md:p-6 md:border-b md:border-gray-50">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Quick Links
            </h2>
          </div>

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

    </main>
  );
};

export default CleaningProductPage;
