import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, ChevronRight, Check, Phone, MapPin, Home, Building2, ArrowUp, X } from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { FaBug, FaShieldAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import BannerImage from "../../pages/BannerImage";
import BannerImageMobile from "../../pages/BannerImageMobile";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import LoginSignup from "../LoginModal";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import Requestacallback from "../../pages/Requestacallback";
import { Suspense } from "react";
import PopularCategorySection from "../PopularCategorySection";
import fetchSettings from "../../config/settings";
import InspectionModal from "../InspectionModal";
import DateTimeModal from "../DateTimeModal";
import AddressModal from "../AddressModal";
import CheckoutSummaryModal from "../CheckoutSummaryModal";

const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const {
    user,
    getCart,
    selectedAddrs,
    selectedDayTime,
    getAddresses,
    getPaymentList,
    pincode,
    setPincode
  } = useCont();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedBhk, setSelectedBhk] = useState("1 BHK");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await fetchSettings();
      if (settings?.logo) {
        setLogo(settings.logo);
      }
    };
    getSettings();
  }, []);

  // Set default variation (property size) when attribute changes
  useEffect(() => {
    const options = getVariationOptions();
    if (options.length > 0) {
      setSelectedBhk(options[0]);
    }
  }, [selectedAttribute, selectedProduct]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAdd, setPendingAdd] = useState(null);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  // remove local pincode state since we use global
  const [premiseType, setPremiseType] = useState("Residential");
  const [squareFeet, setSquareFeet] = useState(0);
  const [mbIsInBangalore, setMbIsInBangalore] = useState(true);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [activeFlow, setActiveFlow] = useState(false);
  const [selectionModal, setSelectionModal] = useState({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null });

  const checkIsBangaloreMb = (pc) => {
    if (!pc) return true;
    return pc.startsWith("560");
  };

  useEffect(() => {
    setMbIsInBangalore(checkIsBangaloreMb(pincode));
  }, [pincode]);

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  // Orchestrate Quick Checkout Flow
  useEffect(() => {
    if (!activeFlow) return;

    // Small delay to allow state to settle
    const timer = setTimeout(() => {
      if (!isDateTimeModalOpen && !isAddressModalOpen && !isCheckoutModalOpen) {
        if (!selectedDayTime?.date) {
          // They might have just started, or cancelled. 
          // If no slot chosen, we can't move forward.
          // But if they just clicked Book Now, we want to open DateTime
          if (!isAddingToCart) {
            // If they aren't adding, and no modals are open, and no slot chosen...
            // This case happens if they close the DateTime modal without choosing.
            setActiveFlow(false);
          }
        } else if (!selectedAddrs?.id) {
          setIsAddressModalOpen(true);
        } else {
          setIsCheckoutModalOpen(true);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeFlow, isDateTimeModalOpen, isAddressModalOpen, isCheckoutModalOpen, selectedDayTime, selectedAddrs]);

  // Dynamically get property size (variation) options from selected attribute
  const getVariationOptions = () => {
    const attr = getCurrentAttributes().find((a) => a.id === selectedAttribute);
    if (!attr || !attr.variations) return [];

    // Remove duplicates by using Set
    const variations = attr.variations.map((v) => v.variation);
    const uniqueVariations = Array.from(new Set(variations));

    // Sort in ascending order based on numeric value (e.g., "1 BHK", "2 BHK")
    return uniqueVariations.sort((a, b) => {
      const numA = parseInt(a) || 0;
      const numB = parseInt(b) || 0;
      return numA - numB;
    });
  };

  // Prefer a cockroach subcategory when available
  const findPreferredSubcategory = (cat) => {
    if (!cat?.subcategories?.length) return null;
    const cock = cat.subcategories.find((s) => /cockroach/i.test(s.subcategory_name || "") || /cockroach/i.test(s.slug || ""));
    return cock || cat.subcategories[0];
  };

  // Initialize selection on mount (prefer Cockroach subcategory if present)
  useEffect(() => {
    if (categories?.length && !selectedCategory) {
      const cat = categories[0];
      setSelectedCategory(cat.id);
      const sub = findPreferredSubcategory(cat);
      if (sub) {
        setSelectedSubCategory(sub.id);
        if (sub.products?.length) {
          const prod = sub.products[0];
          setSelectedProduct(prod.id);
          if (prod.attributes?.length) {
            setSelectedAttribute(prod.attributes[0].id);
          }
        }
      }
    }
  }, [categories, selectedCategory]);

  const currentCategoryData = categories?.find(c => c.id === selectedCategory) || (categories?.length ? categories[0] : null);

  useEffect(() => {
    if (selectedCategory) {
      const cat = categories.find((c) => c.id === selectedCategory);
      if (cat?.subcategories?.length) {
        const sub = findPreferredSubcategory(cat);
        if (sub) {
          setSelectedSubCategory(sub.id);
          if (sub?.products?.length) {
            const prod = sub.products[0];
            setSelectedProduct(prod.id);
            if (prod.attributes?.length) {
              setSelectedAttribute(prod.attributes[0].id);
            }
          }
        }
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory) {
      const cat = categories.find((c) => c.id === selectedCategory);
      const sub = cat?.subcategories.find((s) => s.id === selectedSubCategory);
      if (sub?.products?.length) {
        const prod = sub.products[0];
        setSelectedProduct(prod.id);
        if (prod.attributes?.length) {
          setSelectedAttribute(prod.attributes[0].id);
        }
      }
    }
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedProduct) {
      const cat = categories.find((c) => c.id === selectedCategory);
      const sub = cat?.subcategories.find((s) => s.id === selectedSubCategory);
      const prod = sub?.products.find((p) => p.id === selectedProduct);
      if (prod?.attributes?.length) {
        setSelectedAttribute(prod.attributes[0].id);
      }
    }
  }, [selectedProduct]);


  const handleCategorySelect = (category) => {
    // Keep the special redirect for disinfection-services only
    if (category.slug === "disinfection-services") {
      window.location.href = `${config.VITE_BASE_URL}/subcategory/disinfection-services-near-you-in-bangalore`;
      return;
    }

    // For categories like bird-control do not navigate away even if is_form is set.
    // Instead, show the category in-page by updating local state.
    setSelectedCategory(category.id);
  };

  const handleAddToCart = async (variation, product) => {
    if (!user || user.length === 0) {
      // store the intended add-to-cart action and open login modal
      setPendingAdd({ variation, product });
      setIsModalOpen(true);
      return;
    }

    setIsAddingToCart(true);
    const tax_amount =
      product.tax_type === "amount"
        ? Number(product.tax)
        : (Number(product.tax) / 100) * variation.discounted_variation_price;

    const cartItem = {
      user_id: user.id,
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: product?.productimage?.image_url,
      qty: 1,
      price: variation.discounted_variation_price || variation.price,
      attribute: selectedAttribute,
      variation: variation.id,
      tax: tax_amount?.toFixed(2) || 0,
      shipping_cost: product.shipping_cost || 0,
      bhk: selectedBhk,
    };

    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
      const response = await axios.post(`${config.API_URL}/api/addtocart`, cartItem, { headers });
      if (response.data.status === 1) {
        successNotify("Successfully added to Cart");
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        existingCart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        await getCart();

        // Start quick checkout flow
        setActiveFlow(true);
        setIsDateTimeModalOpen(true);
      }
    } catch (error) {
      errorNotify(error.message || "Error adding to cart");
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Called after successful login when user had attempted to add an item
  const handlePostLoginAdd = async () => {
    if (!pendingAdd) return;
    // Close the modal first (LoginSignup calls onClose before this callback)
    setIsModalOpen(false);
    // Small delay to ensure auth state is populated
    await new Promise((res) => setTimeout(res, 300));
    const { variation, product } = pendingAdd;
    setPendingAdd(null);

    // Use JWT directly to perform the add-to-cart so we don't depend on context update timing
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      console.error("No JWT token available after login");
      return;
    }

    const decoded = jwtDecode(jwtToken);
    const tax_amount =
      product.tax_type === "amount"
        ? Number(product.tax)
        : (Number(product.tax) / 100) * (variation.discounted_variation_price || variation.price);

    const cartItem = {
      user_id: decoded.id,
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: product?.productimage?.image_url,
      qty: 1,
      price: variation.discounted_variation_price || variation.price,
      attribute: selectedAttribute,
      variation: variation.id,
      tax: tax_amount?.toFixed(2) || 0,
      shipping_cost: product.shipping_cost || 0,
      bhk: selectedBhk,
    };

    try {
      setIsAddingToCart(true);
      const response = await axios.post(`${config.API_URL}/api/addtocart`, cartItem, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.data.status === 1) {
        successNotify("Successfully added to Cart");
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        existingCart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        await getCart();
        // Start quick checkout flow
        setActiveFlow(true);
        setIsDateTimeModalOpen(true);
      } else {
        errorNotify(response.data.message || "Failed to add to cart after login");
      }
    } catch (err) {
      console.error("Post-login add to cart failed:", err);
      errorNotify(err.message || "Error adding to cart after login");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Direct inspection booking without form popup
  const handleDirectInspectionBooking = async () => {
    if (!user || !user.name || !user.mobile) {
      errorNotify("Please login to book an inspection");
      return;
    }

    try {
      // Create professional service description
      const categoryName = categories?.find(c => c.id === selectedCategory)?.category_name || "Service";
      const serviceDescription = `Book Inspection - ${premiseType} - ${categoryName}`;
      const addressDescription = `${serviceDescription} request from homepage`;

      const inspectionData = {
        fullName: user.name,
        mobile: user.mobile,
        email: user.email || "",
        address: addressDescription,
        date: new Date().toISOString(),
        time: "N/A",
        service: serviceDescription,
      };

      const response = await axios.post(`${config.API_URL}/api/createInspection`, inspectionData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === 1) {
        successNotify("Inspection request submitted successfully! Our team will contact you soon.");
      } else {
        errorNotify("Failed to submit inspection request. Please try again.");
      }
    } catch (error) {
      console.error("Error booking inspection:", error);
      errorNotify("An error occurred while booking inspection.");
    }
  };

  const getCurrentSubcategories = () => {
    return categories?.find((c) => c.id === selectedCategory)?.subcategories || [];
  };

  const getCurrentProducts = () => {
    const cat = categories?.find((c) => c.id === selectedCategory);
    const sub = cat?.subcategories?.find((s) => s.id === selectedSubCategory);
    return sub?.products || [];
  };

  const getCurrentAttributes = () => {
    const cat = categories?.find((c) => c.id === selectedCategory);
    const sub = cat?.subcategories?.find((s) => s.id === selectedSubCategory);
    const prod = sub?.products?.find((p) => p.id === selectedProduct);
    return prod?.attributes || [];
  };

  const getCurrentProduct = () => {
    const cat = categories?.find((c) => c.id === selectedCategory);
    const sub = cat?.subcategories?.find((s) => s.id === selectedSubCategory);
    return sub?.products?.find((p) => p.id === selectedProduct);
  };

  const getCurrentVariation = () => {
    const attr = getCurrentAttributes().find((a) => a.id === selectedAttribute);
    if (!attr) return null;
    return (
      attr.variations.find((v) => v.variation === selectedBhk) ||
      attr.variations?.[0]
    );
  };

  const groupProducts = () => {
    const products = getCurrentProducts();

    if (!selectedAttribute) {
      const recommended = products.filter((p) => p.is_recommended === 1);
      const regular = products.filter((p) => p.is_recommended !== 1);
      return { recommended, regular };
    }

    const currentAttrObj = getCurrentAttributes().find(a => a.id === selectedAttribute);
    const attrName = currentAttrObj ? currentAttrObj.attribute_name : "";

    // Check keyword
    const isAMC = /AMC/i.test(attrName);
    const isOneTime = /One Time/i.test(attrName);

    // Filter products
    const filtered = products.filter(p => {
      // A product matches if it has at least one attribute containing the keyword 
      // corresponding to the user's selection
      return p.attributes?.some(a => {
        if (isAMC) return /AMC/i.test(a.attribute_name);
        if (isOneTime) return /One Time/i.test(a.attribute_name);
        return true;
      });
    });

    const recommended = filtered.filter((p) => p.is_recommended === 1);
    const regular = filtered.filter((p) => p.is_recommended !== 1);
    return { recommended, regular };
  };

  const { recommended, regular } = groupProducts();

  // Sticky Header Scroll Logic


  return (
    <>


      <section className="w-full pt-0 pb-5 md:py-8">

        {/* Modal for callback */}
        <Requestacallback isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="homepage" />

        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>


        {/* Mobile Header - Hidden on md+ */}
        <div className="md:hidden w-full overflow-x-hidden">
          {/* Modal for callback triggers here if needed, but keeping original request flow */}
          {/* Request a Callback Button - Top Centered */}


          {/* Mobile Booking Form Section */}
          {/* Premium Mobile Booking Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="px-0 py-0 mt-2 relative"
          >
            <div className="space-y-6 relative z-10 pl-2 pr-4 w-full min-w-0 font-sans">
              {/* Pest Type / Subcategory */}
              <div>
                <label className="block text-[15px] font-bold text-[#033053] mb-2">Select Pest</label>
                <div className="flex w-full justify-start items-center overflow-x-auto gap-2.5 pb-1 no-scrollbar">
                  {getCurrentSubcategories().map((sub) => {
                    const isSelected = selectedSubCategory === sub.id;
                    let displayIcon = "🛡️";
                    const subNameLower = (sub.subcategory_name || "").toLowerCase();
                    if (subNameLower.includes("cockroach")) displayIcon = "🪳";
                    else if (subNameLower.includes("ant")) displayIcon = "🐜";
                    else if (subNameLower.includes("rodent")) displayIcon = "🐀";
                    else if (subNameLower.includes("mosquito")) displayIcon = "🦟";
                    else if (subNameLower.includes("termite")) displayIcon = "🪵";
                    else if (subNameLower.includes("bed bug") || subNameLower.includes("bedbug")) displayIcon = "🐞";
                    else if (subNameLower.includes("flies") || subNameLower.includes("fly")) displayIcon = "🪰";
                    else if (subNameLower.includes("general pest")) displayIcon = "🕷️";
                    else if (subNameLower.includes("weed")) displayIcon = "🌿";
                    else if (subNameLower.includes("wood borer")) displayIcon = "🪱";

                    let displayName = sub.subcategory_name || "";
                    displayName = displayName.replace(/\s*Control\s*$/i, "");

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSelectedSubCategory(sub.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] whitespace-nowrap transition-all duration-300 border ${isSelected
                          ? "bg-[#0463ac] text-white border-[#0463ac] shadow-md"
                          : "bg-white text-gray-700 border-gray-200"
                          }`}
                      >
                        <span className="text-lg leading-none">{displayIcon}</span>
                        <span>{displayName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Size */}
              <div>
                <label className="block text-[15px] font-bold text-[#033053] mb-2">Select Home Size</label>
                <div className="flex w-full justify-start items-center overflow-x-auto gap-2.5 pb-1 no-scrollbar">
                  {getVariationOptions().map((variation, index) => {
                    const isSelected = selectedBhk === variation;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedBhk(variation)}
                        className={`px-6 py-3 rounded-xl font-bold text-[14px] whitespace-nowrap transition-all duration-300 border ${isSelected
                          ? "bg-[#0463ac] text-white border-[#0463ac] shadow-md"
                          : "bg-white text-gray-700 border-gray-200"
                          }`}
                      >
                        {variation}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-[15px] font-bold text-[#033053] mb-2">Select Service</label>
                <div className="flex w-full justify-start items-center overflow-x-auto gap-2.5 pb-1 no-scrollbar">
                  {getCurrentProducts()?.map((prod) => {
                    const isSelected = selectedProduct === prod.id;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setSelectedProduct(prod.id)}
                        className={`w-[75%] flex-shrink-0 px-4 py-3 rounded-xl font-bold text-[14px] transition-all duration-300 border text-left ${isSelected
                          ? "bg-[#0463ac] text-white border-[#0463ac] shadow-md"
                          : "bg-white text-gray-700 border-gray-200"
                          }`}
                      >
                        <span className="block truncate">{prod.product_name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Variant */}
              <div>
                <label className="block text-[15px] font-bold text-[#033053] mb-2">Select Service Type</label>
                <div className="flex w-full justify-start items-center overflow-x-auto gap-2.5 pb-1 no-scrollbar">
                  {getCurrentAttributes()?.map((attr) => {
                    const isSelected = selectedAttribute === attr.id;
                    const attrName = attr.attribute_name || attr.attribute;
                    return (
                      <button
                        key={attr.id}
                        type="button"
                        onClick={() => setSelectedAttribute(attr.id)}
                        className={`w-[75%] flex-shrink-0 px-4 py-3 rounded-xl font-bold text-[14px] transition-all duration-300 border text-left ${isSelected
                          ? "bg-[#0463ac] text-white border-[#0463ac] shadow-md"
                          : "bg-white text-gray-700 border-gray-200"
                          }`}
                      >
                        <span className="block truncate">{attrName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Optimized Price Display & Book Now Button (Transparent & Full Width) */}
              <div className="flex flex-col gap-6 -mx-4 px-4 py-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Total Estimate</span>
                  {getCurrentProduct()?.slug && (
                    <button
                      onClick={() => navigate(`${config.VITE_BASE_URL}/product/${getCurrentProduct().slug}`)}
                      className="text-[12px] font-black text-[#0463ac] uppercase tracking-widest flex items-center gap-1 group/link"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-[48px] leading-none font-black text-[#033053]">
                    ₹{getCurrentVariation()?.discounted_variation_price || getCurrentVariation()?.price || "0.00"}
                  </span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">+ GST</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const variation = getCurrentVariation();
                    const product = getCurrentProduct();
                    if (variation && product) {
                      handleAddToCart(variation, product);
                    }
                  }}
                  disabled={!getCurrentVariation() || isAddingToCart}
                  className={`w-full py-4 text-white font-bold text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2
                    ${(!getCurrentVariation() || isAddingToCart)
                      ? "bg-gray-200 cursor-not-allowed text-gray-400 shadow-none"
                      : "bg-[#0463ac] hover:bg-[#03528b]"}`}
                >
                  {isAddingToCart ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>BOOK NOW</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Request a Callback Button - Mobile View Bottom */}
          {/* Request a Callback Button - Mobile View Bottom */}
          <div className="flex justify-center my-4">
            <motion.a
              href="tel:6363865658"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#0463ac] to-[#034d85] text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-white/20 skew-x-12"
                style={{
                  animation: 'shimmer 2.5s infinite linear'
                }}
              />
              <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-150%) skewX(-12deg); }
                  50% { transform: translateX(150%) skewX(-12deg); }
                  100% { transform: translateX(150%) skewX(-12deg); }
                }
              `}</style>

              <Phone className="w-6 h-6 animate-pulse" />
              <div className="flex flex-col items-start leading-tight z-10">
                <span className="text-sm font-medium opacity-90">Talk with an Agent</span>
                <span className="text-lg font-extrabold tracking-wide">6363865658</span>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Modal for Commercial Inspection */}
        <InspectionModal
          isOpen={isInspectionOpen}
          onClose={() => setIsInspectionOpen(false)}
          source="homepage"
          premiseType={premiseType}
          categoryName={categories?.find(c => c.id === selectedCategory)?.category_name || ""}
        />

        {/* Quick Checkout Flow Modals */}
        <DateTimeModal
          isOpen={isDateTimeModalOpen}
          onClose={() => setIsDateTimeModalOpen(false)}
        />
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
        />
        <CheckoutSummaryModal
          isOpen={isCheckoutModalOpen}
          onClose={() => {
            setIsCheckoutModalOpen(false);
            setActiveFlow(false);
          }}
          onOrderSuccess={(orderNum) => {
            setOrderNumber(orderNum);
            setActiveFlow(false);
            navigate(`${config.VITE_BASE_URL}/booking-success/${orderNum}`);
          }}
        />

        {/* New Mobile Flow - Banners */}
        <div className="block md:hidden">
          <section className="px-0 py-0">
            <BannerImageMobile />
            <BannerImage />
          </section>
        </div>

        {/* Redesigned Desktop View (Image 3) */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[1000px] flex flex-col gap-6"
          >
            {/* Desktop Header */}
            <div>
              <span className="text-[11px] -mt-10 font-semibold text-gray-400 uppercase tracking-[0.2em] mb-1.5 block">EXPERT SOLUTIONS</span>
              <h2 className="text-3xl font-semibold text-[#033053] flex items-center gap-3">
                Quick Booking - Pest Control
                <span className="text-teal-400 text-2xl animate-pulse">⚡</span>
              </h2>
            </div>

            {/* Selection Bar Row */}
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
              <div className="w-[27%] px-1">
                <CompactDropdown
                  value={selectedSubCategory}
                  options={getCurrentSubcategories()}
                  onChange={setSelectedSubCategory}
                  disabled={!selectedCategory}
                  placeholder="Select Service"
                />
              </div>

              <div className="w-[17%] px-1">
                <CompactDropdown
                  value={selectedBhk}
                  options={getVariationOptions().map((v) => ({ id: v, name: v }))}
                  onChange={setSelectedBhk}
                  disabled={!selectedProduct}
                  placeholder="Home Size"
                />
              </div>

              <div className="w-[32%] px-1">
                <CompactDropdown
                  value={selectedAttribute}
                  options={(() => {
                    const attrs = getCurrentAttributes();
                    const source = attrs.length > 0 ? attrs : ([...recommended, ...regular][0]?.attributes || []);
                    return source.map(a => ({
                      id: a.id,
                      name: a.attribute_name || a.attribute || "Service Option",
                      is_recommended: a.is_recommended
                    }));
                  })()}
                  onChange={setSelectedAttribute}
                  disabled={!selectedSubCategory}
                  placeholder="Service Type"
                  showRecommended
                />
              </div>

              <div className="flex-1 flex items-center justify-end px-3">
                {getCurrentProduct()?.slug ? (
                  <a
                    href={`${config.VITE_BASE_URL}/product/${getCurrentProduct().slug}`}
                    className="flex items-center gap-2 text-[13px] font-semibold text-[#0463ac] hover:text-[#03528b] transition-colors group/vd"
                  >
                    View Details
                    <ChevronRight size={15} className="group-hover/vd:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-[13px] text-gray-300 font-semibold">Select a service</span>
                )}
              </div>
            </div>

            {/* Available Service Packages Section */}
            <div className="mt-1">
              <div className="flex flex-col gap-2">
                {[...recommended, ...regular].map((product) => (
                  <CompactProductRow
                    key={product.id}
                    product={product}
                    selectedAttribute={selectedAttribute}
                    selectedBhk={selectedBhk}
                    handleAddToCart={handleAddToCart}
                    isAddingToCart={isAddingToCart}
                  />
                ))}
              </div>
            </div>

            {/* Stepper Guide */}
            <div className="-mt-8 border-t border-gray-50 pt-8 flex items-center justify-center gap-10 text-[13px] font-black text-[#033053]/30 uppercase tracking-[0.15em]">
              <div className="flex items-center gap-3">
                <span className="text-[#0463ac]">1. Select Pest Problem </span>
                <IoIosArrowForward />
              </div>
              <div className="flex items-center gap-3">
                <span>2. Select Home Size </span>
                <IoIosArrowForward />
              </div>
              <div className="flex items-center gap-3">
                <span>3. See Plans & Book</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* Premium Selection Modal */}
      <AnimatePresence>
        {selectionModal.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null })}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full sm:max-w-lg rounded-t-[40px] sm:rounded-[32px] relative z-10 overflow-hidden shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.2)]"
              style={{ maxHeight: "85vh" }}
            >
              {/* Decorative Header Background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#0463ac]/10 to-transparent pointer-events-none" />

              {/* Header */}
              <div className="relative px-6 pt-8 pb-4 flex items-center justify-between z-20">
                <div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    className="h-1 bg-[#0463ac] rounded-full mb-2"
                  />
                  <h3 className="text-2xl font-bold text-[#033053] tracking-tight">
                    {selectionModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null })}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm"
                >
                  <RxCross1 className="w-5 h-5 font-bold" />
                </button>
              </div>

              {/* Scrollable list */}
              <div className="px-6 pb-8 overflow-y-auto max-h-[60vh] sm:max-h-[50vh] space-y-3 custom-scrollbar">
                {selectionModal.options.map((option, idx) => {
                  const isStringOption = typeof option === 'string';
                  const optionValue = isStringOption ? option : option.id;
                  const optionLabel = isStringOption ? option : option.name;
                  const isSelected = isStringOption
                    ? selectionModal.selectedValue === option
                    : selectionModal.selectedValue?.id === option.id;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => selectionModal.onSelect && selectionModal.onSelect(option)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer group transition-all duration-300 flex items-center justify-between
                        ${isSelected
                          ? 'bg-[#eff6ff] border-[#0463ac] shadow-md scale-[1.01]'
                          : 'bg-white border-gray-100 hover:border-[#0463ac]/30 hover:shadow-lg hover:scale-[1.01]'
                        }`}
                    >
                      {/* Selection Glow Effect */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#0463ac]/5 rounded-2xl blur-sm" />
                      )}

                      <div className="flex items-center gap-4 relative z-10">
                        {/* Radio Circle */}
                        <div className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300
                          ${isSelected ? 'border-[#0463ac] bg-[#0463ac]' : 'border-gray-300 group-hover:border-[#0463ac]'}`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2.5 h-2.5 bg-white rounded-full shadow-sm"
                            />
                          )}
                        </div>

                        <span className={`text-base font-semibold tracking-wide ${isSelected ? 'text-[#033053]' : 'text-gray-600'}`}>
                          {optionLabel}
                        </span>
                      </div>

                      {/* Check Icon for Selected */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0463ac] relative z-10"
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLoginSuccess={handlePostLoginAdd} />
    </>
  );
};

// Helper Components
const formatDescription = (desc) =>
  desc?.split("|").filter((pt) => pt.trim());

const Dropdown = ({
  label,
  value,
  options,
  onChange,
  disabled,
  showRecommended,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (optionId) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full group/drop" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 pr-12 bg-white border rounded-2xl text-left truncate transition-all duration-300
          ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-400 border-gray-100" : "cursor-pointer text-[#033053] border-gray-100 hover:border-[#0463ac]/30 hover:shadow-lg hover:shadow-[#0463ac]/5"}
          ${isOpen ? "border-[#0463ac] ring-4 ring-[#0463ac]/5 shadow-xl" : ""}`}
        disabled={disabled}
      >
        <span className="truncate text-sm font-bold tracking-tight">
          {value
            ? options.find((opt) => opt.id === value)?.subcategory_name ||
            options.find((opt) => opt.id === value)?.product_name ||
            options.find((opt) => opt.id === value)?.attribute
            : label}
        </span>
        <ChevronDown
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-500 ${isOpen ? "rotate-180 text-[#0463ac]" : "text-[#033053]/30 group-hover/drop:text-[#0463ac]"
            }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[10] mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 max-h-64 overflow-y-auto custom-scrollbar"
          >
            {options.map((option) => {
              const isSelected = value === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`cursor-pointer p-3 rounded-xl flex items-start justify-between transition-all duration-300 mb-1 last:mb-0
                    ${isSelected ? "bg-[#0463ac]/5 text-[#0463ac]" : "text-gray-600 hover:bg-gray-50 hover:text-[#033053]"
                    } ${showRecommended && option?.is_recommended === 1 ? "relative" : ""}`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "border-[#0463ac] bg-[#0463ac]" : "border-gray-200 group-hover:border-gray-300"
                          }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                      </div>
                    </div>

                    <div className="flex flex-col w-full">
                      {showRecommended && option?.is_recommended === 1 && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[8px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            Recommended
                          </span>
                        </div>
                      )}
                      <span className="truncate text-sm font-bold">
                        {option.subcategory_name || option.product_name || option.attribute}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard = ({ product, isSelected, onClick, currentAttributes, selectedAttribute, selectedBhk, handleAddToCart, isAddingToCart, categoryName }) => {
  // 1. Identify the global selection type (AMC vs One Time)
  const globalSelectedAttrObj = (currentAttributes || []).find(a => a.id === selectedAttribute);
  const globalAttrName = globalSelectedAttrObj ? globalSelectedAttrObj.attribute_name : "";
  const isGlobalAMC = /AMC/i.test(globalAttrName);
  const isGlobalOneTime = /One Time/i.test(globalAttrName);

  // 2. Find the best attribute to display for THIS product
  let displayAttr = product.attributes?.find(attr => attr.id === selectedAttribute);

  if (!displayAttr) {
    if (isGlobalAMC) {
      displayAttr = product.attributes?.find(attr => /AMC/i.test(attr.attribute_name));
    } else if (isGlobalOneTime) {
      displayAttr = product.attributes?.find(attr => /One Time/i.test(attr.attribute_name));
    }

    if (!displayAttr) {
      displayAttr = product.attributes?.[0];
    }
  }

  const matchedVariation =
    displayAttr?.variations?.find((v) => v.variation === selectedBhk) ||
    displayAttr?.variations?.[0];

  const currentPrice = matchedVariation?.discounted_variation_price || matchedVariation?.price || product.discounted_price || product.price || 0;
  const originalPrice = matchedVariation?.price || product.price || 0;

  const descriptionText = matchedVariation?.description || product.description || "";
  const isPremium = product.is_recommended === 1;

  return (
    <motion.div
      whileHover={{ y: -8, shadow: "0 30px 60px -12px rgba(3,48,83,0.12)" }}
      className={`relative w-full max-w-2xl rounded-[2.5rem] border transition-all duration-500 overflow-hidden bg-white flex flex-col sm:flex-row h-full group/card
        ${isSelected ? "border-[#0463ac]/30 shadow-2xl ring-1 ring-[#0463ac]/10 scale-[1.01]" : "border-gray-100 shadow-md hover:border-[#0463ac]/20"}`}
      onClick={onClick}
    >
      {/* Premium Highlight Bar for Selected */}
      {isSelected && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0463ac] to-green-400" />}

      <div className="flex-1 p-6 flex flex-col justify-between relative">
        <div>
          <div className="flex flex-col items-start gap-1 mb-3">
            {isPremium && (
              <span className="bg-gradient-to-r from-[#0463ac] to-[#03528b] text-white text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 mb-2 tracking-widest uppercase shadow-sm">
                <Star size={10} className="fill-current" /> Most Booked
              </span>
            )}
            <h3 className="text-2xl font-bold text-[#033053] leading-tight tracking-tight group-hover/card:text-[#0463ac] transition-colors duration-300">
              {product.product_name}
            </h3>
          </div>

          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-3xl font-black text-[#033053]">₹{currentPrice || "N/A"}</span>
            {originalPrice > currentPrice && (
              <span className="text-gray-300 line-through text-lg font-bold">₹{originalPrice}</span>
            )}
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">+ GST</span>
          </div>
        </div>

        <div className="text-left w-full space-y-3">
          <a
            href={`${config.VITE_BASE_URL}/product/${product?.slug}`}
            className="flex items-center gap-2 text-xs font-black text-[#0463ac] uppercase tracking-widest group/link hover:gap-3 transition-all duration-300"
          >
            View Service Details <ChevronRight size={14} className="group-hover/link:text-[#03528b]" />
          </a>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-center">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="w-full sm:w-[280px] bg-gray-50/30 p-6 flex flex-col items-center justify-between relative">
        <div className="flex flex-col items-center w-full">
          <div className="relative mb-5">
            <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl bg-white ring-1 ring-gray-100 group-hover/card:scale-105 transition-transform duration-500">
              <img
                src={product?.productimage?.image_url || "/images/tech-placeholder.png"}
                alt="Professional"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3237/3237472.png" }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-50 flex items-center gap-1">
              <Star size={10} className="text-yellow-400 fill-current" />
              <span className="text-[10px] font-black text-[#033053]">4.9</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-700 text-[10px] font-black bg-white px-3 py-1.5 rounded-full border border-green-100 shadow-sm mb-5">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-inner">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
            </div>
            ID VERIFIED EXPERT
          </div>
        </div>

        <div className="w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              if (matchedVariation) handleAddToCart(matchedVariation, product);
            }}
            disabled={!matchedVariation || isAddingToCart}
            className={`w-full flex items-center justify-center gap-2 px-6 py-2.5 font-bold text-[13px] uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn
                ${(isAddingToCart || !matchedVariation) ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500" : "bg-gradient-to-r from-[#0463ac] to-[#0580ca] hover:from-[#0580ca] hover:to-[#0463ac] text-white shadow-md hover:shadow-lg"}
              `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isAddingToCart ? "Adding..." : (matchedVariation ? (isPremium ? "Book 6D Prime" : "Book Service") : "Unavailable")}
              {!isAddingToCart && matchedVariation && <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CompactDropdown = ({ value, options, onChange, disabled, placeholder, showRecommended }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.id === value || opt.name === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        type="button"
        className={`w-full flex items-center justify-between px-4 py-2 bg-white border rounded-xl text-left transition-all duration-300
          ${disabled ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed" : "border-gray-100 hover:border-blue-200 hover:bg-white cursor-pointer"}`}
      >
        <span className="text-[12px] font-semibold truncate">
          {selectedOption ? (selectedOption.subcategory_name || selectedOption.product_name || selectedOption.name || selectedOption.attribute) : placeholder}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-xl p-1 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.id || option.name}
                type="button"
                onClick={() => { onChange(option.id || option.name); setIsOpen(false); }}
                className="w-full text-left px-3 py-2 text-[11px] font-bold text-[#033053] hover:bg-blue-50 rounded-lg transition-colors flex flex-col gap-0.5"
              >
                {showRecommended && option.is_recommended === 1 && (
                  <span className="text-[7px] text-green-600 font-black uppercase tracking-widest">Recommended</span>
                )}
                {option.subcategory_name || option.product_name || option.name || option.attribute}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CompactProductRow = ({ product, selectedAttribute, selectedBhk, handleAddToCart, isAddingToCart }) => {
  const displayAttr = product.attributes?.find(a => a.id === selectedAttribute) || product.attributes?.[0];
  const matchedVar = displayAttr?.variations?.find(v => v.variation === selectedBhk) || displayAttr?.variations?.[0];
  const cPrice = matchedVar?.discounted_variation_price || matchedVar?.price || product.discounted_price || product.price;
  const oPrice = matchedVar?.price || product.price;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 flex flex-row items-center justify-between gap-3 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 group">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0463ac] transition-colors">
          <FaShieldAlt className="text-[#0463ac] group-hover:text-white transition-colors text-sm" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[14px] font-semibold text-[#033053] group-hover:text-[#0463ac] transition-colors">{product.product_name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-100">
              {product.is_recommended === 1 ? "30-365 Days Warranty" : "30 Days Warranty"}
            </span>
          </div>
        </div>
      </div>

      {product?.slug && (
        <a
          href={`${config.VITE_BASE_URL}/product/${product.slug}`}
          className="text-[11px] font-black text-[#0463ac] hover:text-[#03528b] transition-colors flex items-center gap-1 group/vd whitespace-nowrap"
        >
          View Details <ChevronRight size={14} className="group-hover/vd:translate-x-0.5 transition-transform" />
        </a>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[18px] font-semibold text-[#033053]">₹{cPrice}</span>
          {oPrice > cPrice && (
            <span className="text-gray-300 line-through text-xs">₹{oPrice}</span>
          )}
        </div>
        <button
          onClick={() => matchedVar && handleAddToCart(matchedVar, product)}
          className="bg-[#0463ac] hover:bg-[#03528b] text-white px-5 py-2 rounded-xl font-semibold text-[12px] transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          {isAddingToCart ? "..." : "Book Now"} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ServiceSection;
