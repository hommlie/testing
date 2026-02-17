import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, ChevronRight, Check, Phone, MapPin, Home, Building2, ArrowUp, X } from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { FaBug, FaShieldAlt } from "react-icons/fa";
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
  const [selectedBhk, setSelectedBhk] = useState("");
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
    const attr = getCurrentAttributes().find((a) => a.id === selectedAttribute);
    if (attr && attr.variations && attr.variations.length > 0) {
      setSelectedBhk(attr.variations[0].variation);
    }
  }, [selectedAttribute]);
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
    return Array.from(new Set(variations));
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


      <section className="w-full pt-0 pb-5 md:py-8 font-[Helvetica]">

        {/* Modal for callback */}
        <Requestacallback isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="homepage" />

        {/* Desktop Header - Only visible on md+ */}
        <div className="hidden md:block mb-8">
          <h2 className="text-2xl font-bold text-[#033053] text-center mb-6">
            Quick Booking Pest Control
          </h2>

          {/* Desktop Pincode Check - Mandatory (Hidden on Desktop UI as per request) */}
          <div className="max-w-md mx-auto mb-8 hidden">
            {/* ... pincode input ... */}
          </div>

          {/* Hidden category selection buttons on desktop as requested */}
          <div className="hidden">
            <div className="flex flex-wrap justify-center gap-4">
              {categories?.filter(c => c.category_name !== "Waste Management" && c.category_name !== "Product").map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-40 h-16 flex items-center justify-center gap-2 rounded-lg transition-all border font-bold text-sm
                    ${selectedCategory === category.id
                      ? "bg-[#0463ac] text-white border-[#0463ac] shadow-md"
                      : "bg-white text-[#033053] border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {category.icon_url && (
                    <img
                      loading="lazy"
                      src={category.icon_url}
                      alt=""
                      className={`w-5 h-5 object-contain ${selectedCategory === category.id ? "brightness-0 invert" : ""}`}
                    />
                  )}
                  <span>{category.category_name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Header - Hidden on md+ */}
        <div className="md:hidden">
          {/* Modal for callback triggers here if needed, but keeping original request flow */}
          {/* Request a Callback Button - Top Centered */}


          {/* Mobile Booking Form Section */}
          {/* Premium Mobile Booking Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl px-0 py-2 mt-2 relative overflow-hidden"
          >

            <div className="flex justify-center mb-6 relative z-10">
              <motion.h3
                className="text-2xl font-bold text-center relative inline-block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#033053] via-[#0463ac] to-[#033053] bg-[length:200%_auto] block pb-1"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      backgroundPosition: ["0% 50%", "200% 50%"],
                      transition: {
                        opacity: { duration: 0.5 },
                        y: { duration: 0.5 },
                        backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }
                      }
                    }
                  }}
                >
                  Book a Service
                </motion.span>
                <motion.div
                  className="h-1 w-16 bg-gradient-to-r from-[#0463ac] to-[#034d85] mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.h3>
            </div>

            {/* Check Serviceability */}
            <div className={`mb-4 relative transition-all duration-300 z-10 ${!mbIsInBangalore && pincode.length >= 3 ? 'mb-8' : ''}`}>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-[#0463ac]" />
                Check Serviceability
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0463ac]/20 focus:border-[#0463ac] transition-all shadow-sm group-hover:shadow-md"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {pincode.length === 6 ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <MapPin className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {!mbIsInBangalore && pincode.length >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 flex items-center gap-1"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-xs text-red-500 font-bold uppercase tracking-wide">
                      Sorry, we are coming soon here!
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {pincode.length === 6 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 relative z-10"
              >
                {/* Premise Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 text-[#0463ac]" />
                    Premise Type *
                  </label>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setPremiseType("Residential")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all shadow-sm
                        ${premiseType === "Residential" ? "bg-white text-[#0463ac] shadow-md ring-1 ring-black/5" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <Home className="w-4 h-4" />
                      Residential
                    </button>
                    <button
                      onClick={() => setPremiseType("Commercial")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all shadow-sm
                        ${premiseType === "Commercial" ? "bg-white text-[#0463ac] shadow-md ring-1 ring-black/5" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <Building2 className="w-4 h-4" />
                      Commercial
                    </button>
                  </div>
                </div>

                {/* Conditional Fields based on Premise Type */}
                {premiseType === "Residential" ? (
                  <>
                    {/* Category Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <RxCross1 className="w-4 h-4 text-[#0463ac] rotate-45" /> {/* Using generic icon representation */}
                        Service Category *
                      </label>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => {
                          if (categories && categories.length > 0) {
                            setSelectionModal({
                              isOpen: true,
                              title: "Select Service Category",
                              options: categories.map(cat => ({ id: cat.id, name: cat.category_name })),
                              onSelect: (value) => {
                                setSelectedCategory(value.id);
                                setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null });
                              },
                              selectedValue: categories.find(c => c.id === selectedCategory)
                            });
                          }
                        }}
                      >
                        <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 flex justify-between items-center group-hover:bg-white group-hover:shadow-md transition-all">
                          <span className="truncate">{categories?.find(c => c.id === selectedCategory)?.category_name || "Select Category"}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#0463ac] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Pest Type / Subcategory */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaBug className="w-4 h-4 text-[#0463ac]" />
                        Pest Type *
                      </label>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => {
                          const subs = getCurrentSubcategories();
                          if (subs && subs.length > 0) {
                            setSelectionModal({
                              isOpen: true,
                              title: "Select Pest Type",
                              options: subs.map(sub => ({ id: sub.id, name: sub.subcategory_name })),
                              onSelect: (value) => {
                                setSelectedSubCategory(value.id);
                                setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null });
                              },
                              selectedValue: subs.find(s => s.id === selectedSubCategory)
                            });
                          }
                        }}
                      >
                        <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 flex justify-between items-center group-hover:bg-white group-hover:shadow-md transition-all">
                          <span className="truncate">{getCurrentSubcategories().find(s => s.id === selectedSubCategory)?.subcategory_name || "Select Pest Type"}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#0463ac] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Product Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Star className="w-4 h-4 text-[#0463ac]" />
                        Select Your Services *
                      </label>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => {
                          const prods = getCurrentProducts();
                          if (prods && prods.length > 0) {
                            setSelectionModal({
                              isOpen: true,
                              title: "Select Product",
                              options: prods.map(prod => ({ id: prod.id, name: prod.product_name })),
                              onSelect: (value) => {
                                setSelectedProduct(value.id);
                                setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null });
                              },
                              selectedValue: prods.find(p => p.id === selectedProduct)
                            });
                          }
                        }}
                      >
                        <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 flex justify-between items-center group-hover:bg-white group-hover:shadow-md transition-all">
                          <span className="truncate">{getCurrentProducts().find(p => p.id === selectedProduct)?.product_name || "Select Product"}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#0463ac] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Property Size */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <Home className="w-4 h-4 text-[#0463ac]" />
                        Select Your BHK *
                      </label>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => {
                          const options = getVariationOptions();
                          if (options.length > 0) {
                            setSelectionModal({
                              isOpen: true,
                              title: "Select Property Size",
                              options: options,
                              onSelect: (value) => {
                                setSelectedBhk(value);
                                setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null });
                              },
                              selectedValue: selectedBhk
                            });
                          }
                        }}
                      >
                        <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 flex justify-between items-center group-hover:bg-white group-hover:shadow-md transition-all">
                          <span className="truncate">{selectedBhk || "Select Property Size"}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#0463ac] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Service Variant */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        <FaShieldAlt className="w-4 h-4 text-[#0463ac]" />
                        Service Variant *
                      </label>
                      <div
                        className="relative cursor-pointer group"
                        onClick={() => {
                          const attrs = getCurrentAttributes();
                          if (attrs && attrs.length > 0) {
                            setSelectionModal({
                              isOpen: true,
                              title: "Select Service Variant",
                              options: attrs.map(attr => ({ id: attr.id, name: attr.attribute_name || attr.attribute })),
                              onSelect: (value) => {
                                setSelectedAttribute(value.id);
                                setSelectionModal({ isOpen: false, title: "", options: [], onSelect: null, selectedValue: null });
                              },
                              selectedValue: attrs.find(a => a.id === selectedAttribute)
                            });
                          }
                        }}
                      >
                        <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 flex justify-between items-center group-hover:bg-white group-hover:shadow-md transition-all">
                          <span className="truncate">
                            {getCurrentAttributes().find(a => a.id === selectedAttribute)?.attribute_name ||
                              getCurrentAttributes().find(a => a.id === selectedAttribute)?.attribute ||
                              "Select Service Variant"}
                          </span>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#0463ac] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Optimized Price Display */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100/50 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Estimate</span>
                        {getCurrentProduct()?.slug && (
                          <button
                            onClick={() => navigate(`${config.VITE_BASE_URL}/product/${getCurrentProduct().slug}`)}
                            className="text-xs font-bold text-[#0463ac] hover:text-[#034d85] flex items-center gap-1 group/link"
                          >
                            View Details <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                      <div className="text-3xl font-extrabold text-[#033053]">
                        ₹ {getCurrentVariation()?.discounted_variation_price || getCurrentVariation()?.price || "0.00"}<span className="text-lg text-gray-400 font-medium ml-1">+ GST</span>
                      </div>
                    </div>

                    {/* BOOK NOW Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const variation = getCurrentVariation();
                        const product = getCurrentProduct();
                        if (variation && product) {
                          handleAddToCart(variation, product);
                        }
                      }}
                      disabled={!getCurrentVariation() || isAddingToCart}
                      className={`w-full py-4 relative overflow-hidden text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group
                        ${(!getCurrentVariation() || isAddingToCart)
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#0463ac] to-[#034d85]"}`}
                    >
                      {(!getCurrentVariation() || isAddingToCart) ? null : (
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                      )}

                      {isAddingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide z-10">BOOK NOW</span>
                          <ChevronRight className="w-5 h-5 z-10" />
                        </>
                      )}
                    </motion.button>
                  </>
                ) : (
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDirectInspectionBooking}
                      className="w-full py-4 bg-[#0463ac] text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-[#034d85] transition-all flex items-center justify-center gap-2"
                    >
                      BOOK INSPECTION <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 py-8 px-6 bg-gray-50/80 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
                  <MapPin className="w-7 h-7 text-gray-300" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-600">Enter Pincode</h4>
                  <p className="text-xs text-gray-400 font-medium">Please enter your 6-digit pincode above to unlock customized services for your location.</p>
                </div>
              </motion.div>
            )}
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

        {/* Dropdowns Container - Hidden on Mobile */}
        <div className="hidden md:block">
          {pincode.length === 6 && (
            <div className="max-w-3xl mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Service Type */}
                <div className="col-span-1">
                  <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Service Type</label>
                  <Dropdown
                    label="Select Subcategory"
                    value={selectedSubCategory}
                    options={getCurrentSubcategories()}
                    onChange={setSelectedSubCategory}
                    disabled={!selectedCategory}
                  />
                </div>

                {/* Property Size */}
                <div className="col-span-1">
                  <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Property Size</label>
                  <Dropdown
                    label="Select BHK"
                    value={selectedBhk}
                    options={getVariationOptions().map((variation) => ({ id: variation, attribute: variation, subcategory_name: variation }))}
                    onChange={setSelectedBhk}
                    disabled={!selectedProduct}
                  />
                </div>

                {/* Service Variant */}
                <div className="col-span-1">
                  <label className="block text-[12px] font-medium text-gray-500 mb-1.5">Service Variant</label>
                  <Dropdown
                    label="Select Variant"
                    value={selectedAttribute}
                    options={getCurrentAttributes()}
                    onChange={setSelectedAttribute}
                    disabled={!selectedProduct}
                    showRecommended
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mb-0">
            {pincode.length === 6 ? (
              <>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {recommended.length + regular.length === 0
                    ? "Loading Services..."
                    : "Available Service Packages"}
                </h3>

                <div className="flex justify-start">
                  {recommended.length + regular.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Loading service packages...</div>
                  ) : (
                    <div className={`grid gap-6 px-0 max-w-3xl grid-cols-1 place-items-stretch`}>
                      {[...recommended, ...regular].map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={selectedProduct === product.id}
                          onClick={() => setSelectedProduct(product.id)}
                          currentAttributes={getCurrentAttributes()}
                          selectedAttribute={selectedAttribute}
                          selectedBhk={selectedBhk}
                          handleAddToCart={handleAddToCart}
                          isAddingToCart={isAddingToCart}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // This is already handles by the desktop header above, but in case we want a placeholder here
              null
            )}
          </div>
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
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 pr-10 bg-white border rounded-lg text-left truncate transition-all
          ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-400" : "cursor-pointer text-gray-900"}
          ${isOpen ? "border-black ring-2 ring-black" : "border-black hover:border-black"}`}
        disabled={disabled}
      >
        <span className="truncate">
          {value
            ? options.find((opt) => opt.id === value)?.subcategory_name ||
            options.find((opt) => opt.id === value)?.product_name ||
            options.find((opt) => opt.id === value)?.attribute
            : label}
        </span>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${isOpen ? "rotate-180 text-black" : "text-black"
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-black rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = value === option.id;
            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`cursor-pointer p-3 flex items-start justify-between hover:bg-green-700 transition-colors ${isSelected ? "bg-white text-black" : "text-gray-900"
                  } ${showRecommended && option?.is_recommended === 1 ? "border-l-4 border-emerald-500" : ""}`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#493f9e] bg-green-700" : "border-gray-300"
                        }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    {showRecommended && option?.is_recommended === 1 && (
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full self-start mb-1">
                        Recommended
                      </span>
                    )}
                    <span className="truncate">
                      {option.subcategory_name || option.product_name || option.attribute}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, isSelected, onClick, currentAttributes, selectedAttribute, selectedBhk, handleAddToCart, isAddingToCart }) => {
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
      whileHover={{ y: -5 }}
      className={`relative w-full max-w-3xl rounded-3xl border transition-all duration-300 overflow-hidden bg-[#faf9f6] flex flex-col sm:flex-row h-full
        ${isSelected ? "border-[#0463ac] shadow-lg ring-1 ring-[#0463ac]" : "border-gray-200 shadow hover:shadow-lg"}`}
      onClick={onClick}
    >
      <div className="flex-1 p-5 flex flex-col justify-between relative">
        <div>
          <div className="flex flex-col items-start gap-1 mb-2">
            {isPremium && (
              <span className="bg-[#fadbac] text-[#9c6f2d] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 mb-1">
                ✓ Most Booked
              </span>
            )}
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {product.product_name}
            </h3>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-extrabold text-[#1a1a1a]">₹{currentPrice || "N/A"}</span>
            {originalPrice > currentPrice && (
              <span className="text-gray-400 line-through text-md font-medium">₹{originalPrice}</span>
            )}
          </div>

          {descriptionText && (
            <ul className="mb-3 space-y-1.5">
              {formatDescription(descriptionText).slice(0, 4).map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                  <div className="mt-0.5 min-w-[14px]">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span>{point.trim()}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mt-1">
            <span className="text-green-700 text-[10px] font-bold flex items-center gap-1">
              ✓ 90-Day Warranty
            </span>
            {isPremium && (
              <span className="text-[#5a5a5a] text-[10px] font-bold flex items-center gap-1">
                ✓ Good for Families
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 pt-2">
          <a
            href={`${config.VITE_BASE_URL}/product/${product?.slug}`}
            className="text-xs font-bold text-[#0463ac] underline cursor-pointer hover:text-[#034d85]"
          >
            View Details
          </a>
        </div>
      </div>

      <div className="w-full sm:w-[35%] bg-white p-4 flex flex-col items-center justify-between border-l border-gray-100 relative">
        <div className="flex flex-col items-center mt-1">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm mb-2 bg-gray-100 ring-1 ring-gray-100">
            <img
              src={product?.productimage?.image_url || "/images/tech-placeholder.png"}
              alt="Pro"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3237/3237472.png" }}
            />
          </div>
          <div className="flex items-center gap-1 text-green-700 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100 mb-2">
            <div className="w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-2 h-2 text-white" />
            </div>
            ID Verified
          </div>
          <div className="text-center px-1">
            <p className="text-[9px] text-gray-400 leading-tight italic">
              "Amit, vaccinated & trained for pest control"
            </p>
          </div>
        </div>

        <div className="w-full mt-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              if (matchedVariation) handleAddToCart(matchedVariation, product);
            }}
            disabled={!matchedVariation || isAddingToCart}
            className={`w-full py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-all text-center border
                ${(isAddingToCart || !matchedVariation) ? "opacity-75 cursor-not-allowed" : ""}
                ${isPremium
                ? "bg-[#eebf5e] hover:bg-[#dca63a] text-white border-[#eebf5e]"
                : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100"
              }
              `}
          >
            {isAddingToCart ? "Adding..." : (!matchedVariation ? "Unavailable" : (isPremium ? "Book 6D Prime" : "Book Standard >"))}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceSection;
