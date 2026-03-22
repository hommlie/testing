import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ChevronDown, Star, CheckCircle2, ShoppingBag, Info, ArrowRight, Tag, Search, Zap, Plus } from "lucide-react";
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
import { useToast } from "../../context/ToastProvider";

const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-2 group/rating">
      <div className="flex items-center bg-[#fff8e6] px-2 py-1 rounded-lg border border-[#f59e0b]/10 shadow-sm transition-all">
        <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b] mr-1" />
        <span className="text-sm font-extrabold text-black leading-none">{rating.toFixed(1)}</span>
      </div>
      {reviews && (
        <span className="text-[11px] md:text-xs font-semibold text-gray-400">
          ({reviews >= 1000 ? `${(reviews / 1000).toFixed(1)}K` : reviews} reviews)
        </span>
      )}
    </div>
  );
};

const CollapsibleSection = ({ title, content, isHtml = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 first:border-t-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 px-4 md:px-6 flex justify-between items-center transition-all hover:bg-gray-50/50 group"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-left group-hover:text-[#0463ac] transition-colors tracking-tight">{title}</h2>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#0463ac]/10 transition-colors">
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
            <div className="px-4 md:px-6 pb-8">
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
        className="w-full py-6 px-4 md:px-6 flex justify-between items-center hover:bg-gray-50/50 transition-all group"
      >
        <span className="text-lg font-bold text-gray-900 group-hover:text-[#0463ac] transition-colors tracking-tight">{title}</span>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#0463ac]/10 transition-colors">
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VariationScroller = ({ attribute, product, cart, onUpdateQty, onAddToCart, onViewDetails, isQtyLoading, loadingItemId }) => {
  const containerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 152; // card width (140) + gap (12)
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (e) => {
    const element = e.target;
    const scrollLeft = element.scrollLeft;
    const itemWidth = 152; // 140 width + 12 gap
    const index = Math.round(scrollLeft / itemWidth);
    setActiveDot(index);
  };

  const sortedVariations = [...(attribute?.variations || [])].sort((a, b) => {
    const aVal = parseInt(a.variation) || 0;
    const bVal = parseInt(b.variation) || 0;
    return aVal - bVal;
  });

  return (
    <div className="relative group/scroller w-full mt-6 pb-2">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-[#0463ac] uppercase tracking-widest mb-1">
            Choose Option
          </span>
          <span className="text-[11px] font-bold text-gray-400">
            {attribute.variations.length} {attribute.variations.length > 1 ? "variations" : "variation"} available
          </span>
        </div>
      </div>

      <div className="relative overflow-visible">
        {/* Left Scroll Button - Desktop Only */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#0463ac] hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 hidden md:flex active:scale-95"
          aria-label="Scroll left"
        >
          <IoIosArrowBack className="w-5 h-5" />
        </button>

        {/* Right Scroll Button - Desktop Only */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#0463ac] hover:scale-110 transition-all opacity-0 group-hover/scroller:opacity-100 hidden md:flex active:scale-95"
          aria-label="Scroll right"
        >
          <IoIosArrowForward className="w-5 h-5" />
        </button>

        {/* Right Fade Effect */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-0 group-hover/scroller:opacity-100 transition-opacity duration-300 hidden md:block" />

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-3 snap-x scroll-smooth relative px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedVariations.map((variation) => {
            const cartItem = cart?.find(c => c.variation == variation.id && c.product_id === product.id);
            const inCart = !!cartItem;

            return (
              <motion.div
                key={variation.id}
                viewport={{ once: true }}
                className={`flex-shrink-0 w-[140px] flex flex-col justify-between bg-white border rounded-2xl p-3 snap-start transition-all duration-300 ${inCart ? 'border-[#0463ac] ring-1 ring-[#0463ac]/10 shadow-[0_8px_20px_rgba(4,99,172,0.15)]' : 'border-gray-100 hover:border-[#0463ac]/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]'}`}
              >
                <h4 className="text-[15px] font-bold text-gray-900 mb-2 truncate leading-tight tracking-tight">{variation.variation}</h4>

                <div className="flex flex-col mb-4 bg-gray-50/50 p-2 rounded-xl border border-gray-100/50">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-lg font-black text-gray-900 leading-none">₹{variation.discounted_variation_price}</span>
                    {variation.price !== variation.discounted_variation_price && (
                      <span className="text-[11px] text-gray-400 line-through font-medium">₹{variation.price}</span>
                    )}
                  </div>
                </div>

                {inCart ? (
                  <div className="flex items-center justify-between bg-gray-50/80 rounded-xl p-1 shadow-inner border border-gray-100">
                    <button
                      onClick={() => onUpdateQty(cartItem.id, cartItem.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#0463ac] font-black hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      disabled={isQtyLoading && loadingItemId === cartItem.id}
                    >
                      -
                    </button>
                    <span className="text-[14px] font-black text-[#0463ac] tabular-nums">{cartItem.qty}</span>
                    <button
                      onClick={() => onUpdateQty(cartItem.id, cartItem.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#0463ac] font-black hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      disabled={isQtyLoading && loadingItemId === cartItem.id}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAddToCart(variation, attribute, product)}
                    className="w-full py-2.5 bg-[#0463ac] text-white text-[13px] font-bold rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(4,99,172,0.15)] hover:shadow-[0_8px_20px_rgba(4,99,172,0.25)] hover:bg-[#03528b] flex items-center justify-center gap-2 group/addbtn relative overflow-hidden"
                  >
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      <span>Add</span>
                      <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-hover/addbtn:rotate-90" />
                    </motion.div>

                    {/* Subtle shine animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/addbtn:animate-[shimmer_1.5s_infinite]" />
                  </motion.button>
                )}
              </motion.div>
            );
          })}
          {/* Invisible spacer at the end for padding */}
          <div className="flex-shrink-0 w-2" />
        </div>
      </div>

      {/* Dots Indicator - Mobile Only */}
      <div className="flex justify-center gap-1.5 mt-2 md:hidden">
        {sortedVariations.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeDot === idx 
                ? "w-4 bg-[#0463ac]" 
                : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
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
                  <div className="flex flex-col flex-1 pr-2 min-w-0">
                    <span className="text-[15px] font-bold text-gray-900 uppercase tracking-tight leading-snug">
                      {item.product_name}
                    </span>
                    {item.variation_name && (
                      <span className="text-[12px] font-bold text-[#0463ac] mt-1.5 uppercase tracking-wider">
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

        <section className="bg-white md:bg-white rounded-none md:rounded-2xl p-6 space-y-5 shadow-none md:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-t md:border border-gray-100 mt-0 md:mt-4 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#0463ac]/5 rounded-full blur-3xl group-hover:bg-[#0463ac]/10 transition-colors"></div>

          <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
            <div className="bg-[#4ade80]/10 p-1.5 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-[#05a357]" />
            </div>
            Hommlie Promise
          </h2>

          <ul className="grid grid-cols-1 gap-3.5">
            {[
              "Verified Professionals",
              "Safe & Non-Toxic Chemicals",
              "Fast Service in 4 Hours",
              "Premium Quality Guarantee"
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-3 group/item">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0463ac] group-hover/item:scale-125 transition-transform shrink-0"></div>
                <span className="text-xs md:text-[13px] font-semibold text-gray-600 group-hover/item:text-gray-900 transition-colors">
                  {text}
                </span>
              </li>
            ))}
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
  const [isCartExpanded, setIsCartExpanded] = useState(false);

  const productRefs = useRef([]);

  const [isQtyLoading, setIsQtyLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [pendingVariation, setPendingVariation] = useState(null);

  const notify = useToast();
  const successNotify = (msg) => notify(msg, "success");
  const errorNotify = (msg) => notify(msg, "error");

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
        const cleaningData = response.data.data;
        if (cleaningData?.faqs && typeof cleaningData.faqs === "string") {
          const trimmedFaqs = cleaningData.faqs.trim();
          if (trimmedFaqs.startsWith("[") || trimmedFaqs.startsWith("{")) {
            try {
              cleaningData.faqs = JSON.parse(trimmedFaqs);
            } catch (e) {
              console.error("Error parsing FAQs:", e);
            }
          }
        }
        setInnerSubCategoryData(cleaningData);

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

  const handleAddToCart = async (variation, attribute, product) => {
    setIsAddingToCart(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");

    if (!jwtToken) {
      setPendingVariation({ variation, attribute, product });
      setIsModalOpen(true);
      setIsAddingToCart(false);
      return;
    }

    const user = jwtDecode(jwtToken);
    const productImagesArray = product?.productimages?.filter((item) => item.media === "Image") || [];

    const taxAmount =
      innerSubCategoryData.tax_type === "amount"
        ? Number(innerSubCategoryData.tax)
        : (Number(innerSubCategoryData.tax) / 100) * variation.discounted_variation_price;

    const cartItem = {
      user_id: user.id,
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: productImagesArray?.[0]?.image_url,
      qty: 1,
      price: variation.discounted_variation_price,
      attribute: attribute.attribute_id,
      variation: variation.id,
      tax: taxAmount,
      shipping_cost: product.shipping_cost || 0,
      wallet_amount: variation.wallet_amount || product.wallet_amount || 0,
    };

    try {
      const response = await axios.post(
        `${config.API_URL}/api/addtocart`,
        cartItem,
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      if (response.data.status === 1) {
        successNotify("Successfully added to Cart");
        await getCart();
      }
    } catch (error) {
      errorNotify(error.message || "Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handlePostLoginAdd = async () => {
    if (!pendingVariation) return;
    const { variation, attribute, product } = pendingVariation;
    await handleAddToCart(variation, attribute, product);
    setPendingVariation(null);
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
          <div className="px-4 md:px-6">
            <Breadcrumb
              items={[
                {
                  label: innerSubCategoryData?.category?.category_name,
                  link: innerSubCategoryData?.category?.category_name?.toLowerCase() === "home pest control"
                    ? `${config.VITE_BASE_URL}/category/pest-control-services`
                    : `${config.VITE_BASE_URL}/category/${innerSubCategoryData?.category?.slug || innerSubCategoryData?.category?.category_name?.toLowerCase().replace(/\s+/g, '-')}`
                },
                { label: innerSubCategoryData?.subcategory_name }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 gap-y-2 lg:gap-8 overflow-visible">
            <div className="lg:col-start-4 lg:col-span-9 lg:row-start-1 space-y-4">
              {/* Header Card (Internalized for Desktop) */}
              <div className="px-4 md:px-6 mt-1 md:mt-2 mb-2 md:mb-0 md:bg-white md:border md:border-gray-100 md:rounded-2xl md:shadow-sm py-2 md:py-5">
                <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-4 md:gap-5">
                  <div className="space-y-2 md:space-y-4 flex-1 w-full">
                    <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                      {location ? location : innerSubCategoryData?.subcategory_name}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                      <div className="flex items-center">
                        {(innerSubCategoryData.avg_rating || innerSubCategoryData.total_reviews) && (
                          <StarRating
                            rating={innerSubCategoryData.avg_rating}
                            reviews={innerSubCategoryData.total_reviews}
                          />
                        )}
                      </div>

                      {/* Desktop Only Actions Row (Reviews + Instant + Share) */}
                      <div className="hidden md:flex items-center gap-6">
                        <div className="w-px h-5 bg-gray-100"></div>

                        {/* New Separated Instant Design */}
                        <div className="flex items-center gap-3 group/instant">
                          <div className="flex items-center gap-1.5 bg-[#05a357] text-white px-2.5 py-1.5 rounded-lg shadow-sm">
                            <Zap className="w-3.5 h-3.5 fill-white" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Instant</span>
                          </div>
                          <span className="text-[13px] font-bold text-gray-500">In 4 hrs</span>
                        </div>

                        <div className="w-px h-5 bg-gray-100"></div>

                        <div className="transition-transform hover:scale-110">
                          <ShareButton className="md:w-9 md:h-9" />
                        </div>
                      </div>
                    </div>

                    {/* Desktop Promotional Offers - Grid Layout (No Scrolling) */}
                    <div className="hidden md:block pt-3 border-t border-gray-100/50">
                      <div className="grid grid-cols-4 gap-3 md:gap-4">
                        {[
                          { title: "Up to ₹150 cashback", subtitle: "Via Paytm UPI only" },
                          { title: "Up to ₹100 cashback", subtitle: "Valid for BHIM app only" },
                          { title: "Up to ₹100 cashback", subtitle: "Via POP UPI" },
                          { title: "Amazon cashback upto ₹100", subtitle: "Via Amazon Pay balance" },
                        ].map((offer, idx) => (
                          <div
                            key={idx}
                            className="w-full border border-gray-100/50 rounded-xl p-2.5 bg-gray-50/30 flex items-start gap-2.5 transition-all hover:bg-gray-50/80 hover:shadow-sm cursor-default"
                          >
                            <div className="bg-[#05a357]/10 rounded-lg p-1.5 shrink-0">
                              <Tag className="w-3.5 h-3.5 text-[#05a357]" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[11px] lg:text-[12px] font-bold text-gray-900 leading-tight">
                                {offer.title}
                              </span>
                              <span className="text-[9px] lg:text-[10px] font-medium text-gray-500 mt-0.5">
                                {offer.subtitle}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Only Actions (Next to Title) stays untouched */}
                  <div className="flex flex-row items-center gap-2 shrink-0 md:hidden">
                    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col items-center w-20 shrink-0 border-b-2 border-b-[#05a357]/10">
                      <div className="bg-[#05a357] w-full py-0.5 flex items-center justify-center gap-1">
                        <Zap className="w-2 text-white fill-white" />
                        <span className="text-[8px] font-black text-white uppercase tracking-tighter">Instant</span>
                      </div>
                      <div className="py-1 px-2">
                        <span className="text-[9px] font-bold text-gray-700 whitespace-nowrap">In 4 hrs</span>
                      </div>
                    </div>

                    <div className="transition-all hover:opacity-80">
                      <ShareButton className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner (Moved below internalized header) */}
              {/* <div className="hidden sm:block">
                {innerSubCategoryData?.subcategory_banner ? (
                  <div className="w-full h-[180px] md:h-[320px] rounded-2xl md:-mt-2 shadow-sm border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
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
              </div> */}
            </div>
            {/* Left Sidebar */}
            <div className="lg:col-span-3 lg:row-span-2">
              <div className="sticky top-16 transition-all duration-300 ease-in-out">

                {/* Promotional Offers Section */}
                <div className="mt-1 md:hidden border-b border-gray-200 pb-2">
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

                <section className="bg-white md:bg-white rounded-none md:rounded-2xl p-4 md:p-6 space-y-4 shadow-none md:shadow-[0_4px_20px_rgba(0,0,0,0.03)] mt-0 md:mt-0 border-none md:border md:border-gray-100 mx-0 md:mx-0 border-b border-gray-200 pb-2 md:pb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-gray-900">Services</span>
                    <span className="text-[9px] md:text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">
                      {innerSubCategoryData?.products?.length} Items
                    </span>
                  </div>

                  <div className="flex md:grid md:grid-cols-1 gap-3 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden no-scrollbar pb-4 md:pb-0 snap-x scroll-smooth max-h-[calc(100vh-22rem)] custom-scrollbar pr-1.5">
                    {innerSubCategoryData?.products?.map((product, index) => (
                      <motion.div
                        key={product.id}
                        whileHover={{
                          x: index === currentProductIndex ? 0 : 4,
                        }}
                        className={`group flex-shrink-0 w-[140px] md:w-full flex flex-col md:flex-row items-center gap-2.5 md:gap-3 p-1.5 md:p-2 rounded-xl cursor-pointer transition-all duration-300 border snap-start ${index === currentProductIndex
                          ? "bg-white border-[#0463ac]/30 shadow-sm"
                          : "border-transparent hover:bg-gray-50/50"
                          }`}
                        onClick={() => handleProductClick(index)}
                      >
                        <div className={`w-full md:w-24 md:h-24 aspect-square rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 bg-gray-50 ${index === currentProductIndex ? "shadow-sm" : ""}`}>
                          {product.productimages && product.productimages.length > 0 ? (
                            <img
                              src={product.productimages[0]?.image_url}
                              alt={product.product_name}
                              className="w-full h-full object-contain p-1 md:p-1.5 transition-transform duration-500 md:group-hover:scale-110"
                            />
                          ) : (
                            <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-gray-200" />
                          )}
                        </div>
                        <p className={`flex-1 min-w-0 text-[12px] md:text-[13px] font-semibold text-center md:text-left px-1 mt-1 md:mt-0 leading-snug transition-all duration-300 ${index === currentProductIndex ? "text-black" : "text-gray-600 group-hover:text-black group-hover:translate-x-1"}`}>
                          {product.product_name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </div>


            {/* Main Content */}
            <div className="lg:col-start-4 lg:col-span-5 lg:row-start-2 mt-1 md:mt-0">
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
                    <div className="flex items-start gap-4 mb-5 px-4 md:px-6 border-t border-gray-100 pt-6 md:border-none md:pt-0">
                      <div className="h-7 w-1.5 bg-[#0463ac] rounded-full mt-1 shrink-0"></div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight flex flex-wrap items-center gap-x-3 gap-y-2">
                        {product.product_name}

                        {/* Animated Best Seller Tag beside End Text */}
                        {product.attributes?.some(attr => attr.attribute_name.toLowerCase().includes("one time")) && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0463ac]/10 to-[#0463ac]/5 px-2.5 py-0.5 rounded-full border border-[#0463ac]/20 shadow-sm"
                          >
                            <motion.span
                              className="flex items-center"
                              animate={{
                                rotate: [0, 20, -20, 0],
                                scale: [1, 1.25, 1.25, 1]
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Star className="w-3 h-3 fill-[#0463ac] text-[#0463ac]" />
                            </motion.span>
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#0463ac]">
                              Best Seller
                            </span>
                          </motion.span>
                        )}
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
                            <div className="md:flex md:flex-col">
                              {/* IMAGE SECTION */}
                              <div className="md:w-full w-full md:shrink-0 relative overflow-hidden bg-white/50 flex items-center justify-center border-r-0 md:border-b border-gray-100">
                                <img
                                  src={attribute.image || product?.productimages?.[0]?.image_url || NoImage}
                                  alt={product.product_name}
                                  className="w-full h-auto min-h-[220px] object-cover transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 md:opacity-100 transition-opacity duration-300"></div>


                              </div>

                              {/* CONTENT SECTION */}
                              <div className="flex-1 p-5 md:p-6 flex flex-col min-w-0">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 min-w-0">
                                  <div className="flex-1 flex flex-col space-y-3 md:space-y-4 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <h3 className="text-xl md:text-xl font-bold text-gray-900 group-hover:text-black transition-colors leading-tight">
                                        {attribute.attribute_name}
                                      </h3>
                                    </div>

                                    <div className="mt-1 flex items-center gap-3">
                                      {(attribute?.avg_rating || attribute?.total_reviews) && (
                                        <div className="flex items-center gap-2">
                                          <StarRating
                                            rating={Number(attribute?.avg_rating) || 0}
                                            reviews={attribute?.total_reviews}
                                          />
                                          <div className="w-[1.5px] h-3 bg-gray-300 mx-1"></div>
                                        </div>
                                      )}
                                      <button
                                        className="flex items-center gap-1 text-[#0463ac] font-bold text-sm hover:underline transition-all group/det"
                                        onClick={() => handleViewDetails(product, attribute.attribute_id, "view")}
                                      >
                                        View details
                                        <ArrowRight className="w-4 h-4" />
                                      </button>
                                    </div>

                                    {/* Variation Scroller (Inline BHK Selection) */}
                                    {attribute.variations?.length > 0 && (
                                      <VariationScroller
                                        attribute={attribute}
                                        product={product}
                                        cart={cart}
                                        onUpdateQty={handleQtyUpdate}
                                        onAddToCart={handleAddToCart}
                                        onViewDetails={handleViewDetails}
                                        isQtyLoading={isQtyLoading}
                                        loadingItemId={loadingItemId}
                                      />
                                    )}
                                  </div>


                                </div>

                                {/* Desktop Specifications - Horizontal scroll style for more premium feel */}
                                {attribute.specifications && (
                                  <div className="mt-5 md:mt-6 mb-4 md:mb-6 p-4 md:p-0 bg-gray-50/50 md:bg-transparent rounded-xl md:rounded-none border border-gray-100 md:border-none">
                                    <div className="flex items-center gap-2 mb-3 text-[#0463ac]">
                                      <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                      <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest">Included in this service:</span>
                                    </div>
                                    <div className="space-y-2 md:space-y-2.5">
                                      {attribute.specifications
                                        .split("|")
                                        .map((s) => s.trim())
                                        .filter(Boolean)
                                        .slice(0, 3)
                                        .map((spec, i) => (
                                          <div key={i} className="flex items-start gap-2.5">
                                            <div className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#0463ac]/10 flex items-center justify-center">
                                              <CheckCircle2 className="w-2.5 h-2.5 text-[#0463ac]" />
                                            </div>
                                            <span className="text-xs md:text-sm text-gray-600 leading-tight">
                                              {spec.replace(/^"|"$/g, "")}
                                            </span>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                )}


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
            <div className="lg:col-start-9 lg:col-span-4 lg:row-start-2 px-0 md:px-0">
              <div className="sticky h-fit top-16 transition-all duration-300 ease-in-out mt-1 lg:mt-0">
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

        {/* Unified Bottom Info Card */}
        {(innerSubCategoryData?.about || innerSubCategoryData?.faqs || innerSubCategoryData?.other_services?.length > 0) && (
          <section className="mt-12 mb-12 bg-white md:bg-white rounded-none md:rounded-2xl shadow-none md:shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-y md:border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="py-6 px-4 md:px-6 border-b border-gray-100 bg-gray-50/30">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Information & More
              </h2>
            </div>

            {/* About Section */}
            {innerSubCategoryData?.about && (
              <CollapsibleSection
                title={`About ${innerSubCategoryData?.subcategory_name}`}
                content={innerSubCategoryData.about}
                isHtml={true}
              />
            )}

            {/* FAQs Section */}
            {innerSubCategoryData?.faqs && (
              <div className="space-y-4">
                {Array.isArray(innerSubCategoryData.faqs) ? (
                  <>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight px-4 mt-8 mb-4">
                      Frequently Asked Questions
                    </h2>
                    <div className="grid gap-4">
                      {innerSubCategoryData.faqs.map((faq, index) => (
                        <CollapsibleSection
                          key={index}
                          title={faq.question}
                          content={faq.answer}
                          isHtml={true}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <CollapsibleSection
                    title="Frequently Asked Questions"
                    content={innerSubCategoryData.faqs}
                    isHtml={true}
                  />
                )}
              </div>
            )}

            {/* Quick Links Header */}
            <div className="py-6 px-4 md:px-6 border-t border-gray-100 bg-gray-50/30">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
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
              <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm md:text-base">
                {getLocations()?.map((location, index) => (
                  <div key={index} className="flex items-center group/link">
                    <a
                      href={`${config.VITE_BASE_URL}/subcategory/${location?.slug?.trim()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(
                          `${config.VITE_BASE_URL}/subcategory/${location?.slug?.trim()}`,
                          { state: { location: location?.title?.trim() } }
                        );
                      }}
                      className="text-gray-900 hover:text-black font-semibold transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-[#0463ac] transition-colors"></span>
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
              <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm md:text-base">
                {innerSubCategoryData?.other_services?.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="flex items-center group/link"
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={`/subcategory/${service.slug}`}
                      className="text-gray-900 hover:text-black font-semibold transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-[#0463ac] transition-colors"></span>
                      {service.subcategory_name}
                    </a>
                  </motion.div>
                ))}
              </div>
            </QuickLinkSection>
          </section>
        )}

        <LoginSignup
          isOpen={isModalOpen}
          onClose={closeModal}
          onLoginSuccess={handlePostLoginAdd}
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

        {/* Mobile Floating Cart Summary */}
        <AnimatePresence>
          {cart?.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="lg:hidden fixed bottom-6 left-0 right-0 z-[40] flex justify-center px-4"
            >
              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/add-to-cart')}
                className="bg-[#008000] rounded-full shadow-[0_12px_30px_rgba(0,128,0,0.4)] overflow-hidden flex items-center gap-[10px] p-1.5 pl-1.5 pr-3.5 cursor-pointer border border-white/10 max-w-max"
              >
                {/* Left: Thumbnail Circle */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/15 shadow-sm">
                  {cart[cart.length - 1]?.product_image ? (
                    <img
                      src={`${config.API_URL}/public/product_images/${cart[cart.length - 1].product_image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-[#008000]" />
                  )}
                </div>

                {/* Center: Info */}
                <div className="text-left py-0.5">
                  <h4 className="text-[14px] font-extrabold text-white leading-tight">View cart</h4>
                  <p className="text-[11px] font-medium text-white/80 leading-none">
                    {cart.length} {cart.length > 1 ? 'items' : 'item'}
                  </p>
                </div>

                {/* Right: Price & Arrow */}
                <div className="flex items-center gap-2 pl-2 border-l border-white/15">
                  <span className="text-[15px] font-black text-white">₹{cart.reduce((acc, curr) => acc + (Number(curr.price) * curr.qty), 0)}</span>
                  <div className="bg-white/20 p-1 rounded-full">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main >
  );
};

export default CleaningProductPage;
