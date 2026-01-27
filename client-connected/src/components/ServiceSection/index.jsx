import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Star, ChevronRight, Check, Phone } from "lucide-react";
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
import fetchSettings from "../../config/settings";

const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const { user, getCart } = useCont();
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

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  // Dynamically get property size (variation) options from selected attribute
  const getVariationOptions = () => {
    const attr = getCurrentAttributes().find((a) => a.id === selectedAttribute);
    if (!attr || !attr.variations) return [];
    return attr.variations.map((v) => v.variation);
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
  }, [categories]);

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


  const formatDescription = (desc) =>
    desc?.split("|").filter((pt) => pt.trim());

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
        getCart();
        navigate(`${config.VITE_BASE_URL}/add-to-cart`);
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
        navigate(`${config.VITE_BASE_URL}/add-to-cart`);
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

  // Dropdown Component
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

  // ProductCard
  const ProductCard = ({ product, isSelected, onClick }) => {
    // 1. Identify the global selection type (AMC vs One Time)
    const globalSelectedAttrObj = getCurrentAttributes().find(a => a.id === selectedAttribute);
    const globalAttrName = globalSelectedAttrObj ? globalSelectedAttrObj.attribute_name : "";
    const isGlobalAMC = /AMC/i.test(globalAttrName);
    const isGlobalOneTime = /One Time/i.test(globalAttrName);

    // 2. Find the best attribute to display for THIS product
    let displayAttr = product.attributes?.find(attr => attr.id === selectedAttribute);

    if (!displayAttr) {
      // If the specific selectedAttribute ID isn't in this product (which is expected if it's a different product),
      // try to find a "matching type" attribute (AMC vs One Time)
      if (isGlobalAMC) {
        displayAttr = product.attributes?.find(attr => /AMC/i.test(attr.attribute_name));
      } else if (isGlobalOneTime) {
        displayAttr = product.attributes?.find(attr => /One Time/i.test(attr.attribute_name));
      }

      // Fallback: If still no match (or no global selection type), just take the first one
      if (!displayAttr) {
        displayAttr = product.attributes?.[0];
      }
    }

    const matchedVariation =
      displayAttr?.variations?.find((v) => v.variation === selectedBhk) ||
      displayAttr?.variations?.[0];

    // --- Rest of the card logic ---
    const rating = matchedVariation?.avg_rating || product.avg_rating || 4.9;
    const reviews = matchedVariation?.total_reviews || product.total_reviews || 11540;

    // determine price
    // determine price with fallbacks
    const currentPrice = matchedVariation?.discounted_variation_price || matchedVariation?.price || product.discounted_price || product.price || 0;
    const originalPrice = matchedVariation?.price || product.price || 0;
    // const savings = currentPrice && originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

    // Description fallback
    const descriptionText = matchedVariation?.description || product.description || "";

    // Check if recommended/premium
    const isPremium = product.is_recommended === 1;

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative w-full max-w-4xl mx-auto rounded-3xl border transition-all duration-300 overflow-hidden bg-[#faf9f6] flex flex-col sm:flex-row h-full
          ${isSelected ? "border-[#0463ac] shadow-lg ring-1 ring-[#0463ac]" : "border-gray-200 shadow hover:shadow-lg"}`}
        onClick={onClick}
      >
        {/* LEFT SECTION (65%) */}
        <div className="flex-1 p-5 flex flex-col justify-between relative">

          <div>
            {/* Title & Badge */}
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

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-extrabold text-[#1a1a1a]">₹{currentPrice || "N/A"}</span>
              {originalPrice > currentPrice && (
                <span className="text-gray-400 line-through text-md font-medium">₹{originalPrice}</span>
              )}
            </div>

            {/* Features List */}
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

            {/* Extra Badges */}
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

          {/* Footer Link */}
          <div className="mt-3 pt-2">
            <a
              href={`${config.VITE_BASE_URL}/product/${product?.slug}`}
              className="text-xs font-bold text-[#0463ac] underline cursor-pointer hover:text-[#034d85]"
            >
              View Details
            </a>
          </div>
        </div>

        {/* RIGHT SECTION (35%) */}
        <div className="w-full sm:w-[35%] bg-white p-4 flex flex-col items-center justify-between border-l border-gray-100 relative">

          {/* Technician Section */}
          <div className="flex flex-col items-center mt-1">
            {/* Image Circle */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm mb-2 bg-gray-100 ring-1 ring-gray-100">
              <img
                src={product?.productimage?.image_url || "/images/tech-placeholder.png"}
                alt="Pro"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3237/3237472.png" }}
              />
            </div>
            {/* ID Verified */}
            <div className="flex items-center gap-1 text-green-700 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100 mb-2">
              <div className="w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
                <Check className="w-2 h-2 text-white" />
              </div>
              ID Verified
            </div>
            {/* Quote */}
            <div className="text-center px-1">
              <p className="text-[9px] text-gray-400 leading-tight italic">
                "Amit, vaccinated & trained for pest control"
              </p>
            </div>
          </div>

          {/* Button Section */}
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

  // Sticky Header Scroll Logic
  // Sticky Header Scroll Logic
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header after scrolling past the banner area (approx 400px)
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium Sticky Header */}
      <div
        className={`fixed top-0 left-0 w-full bg-white z-[999] shadow-lg transition-transform duration-500 ease-in-out transform ${isSticky ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={logo || "/images/logoh.png"} alt="Hommlie" className="h-10 w-auto object-contain" />
          </div>

          {/* Center: Categories Pills */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-8 overflow-x-auto scrollbar-hide items-center justify-center">
            <div className="flex gap-6">
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  className={`relative pb-1 text-sm font-semibold transition-colors duration-200
                        ${selectedCategory === cat.id
                      ? "text-[#0463ac]"
                      : "text-gray-600 hover:text-[#0463ac]"}`}
                >
                  {cat.category_name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#0463ac] transform transition-transform duration-300 origin-left
                    ${selectedCategory === cat.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Contact & CTA */}
          <div className="flex items-center gap-6">
            <a href="tel:919999999999" className="hidden lg:flex items-center gap-2 text-[#071c1f] font-bold text-lg hover:text-[#0463ac] transition-colors">
              <Phone className="w-5 h-5 text-[#0463ac]" />
              <span className="tracking-wide">91 63638 65658</span>
            </a>
            <button
              onClick={() => setIsCallbackOpen(true)}
              className="bg-[#0463ac] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:bg-[#034d85] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-[Helvetica] bg-white">

        {/* Banners Moved Up */}
        <div className="mb-10 text-center">
          <BannerImageMobile />
          <BannerImage />
        </div>

        {/* Request a Callback Button (visible on all devices) */}
        <div className="block sm:hidden mb-5 -mt-4 flex justify-center">
          <button
            className="bg-[#0463ac] text-white px-6 py-2 rounded-md hover:bg-[#52852d] transition"
            onClick={() => setIsCallbackOpen(true)}
          >
            Request a Callback
          </button>
        </div>
        {/* Modal for callback */}
        <Requestacallback isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="homepage" />

        {/* Category Filters - COMMENTED OUT AS PER REQUEST
        <div className="mb-0 text-center sm:-mt-6">
          <h2 className="hidden sm:block text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Choose Your Service Category</h2>
          <div className="w-full flex justify-center sm:justify-center">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 px-2 sm:overflow-visible">
              {categories?.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                      handleCategorySelect(category);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className={`border border-black w-[108px] sm:w-[180px] text-center flex flex-col items-center justify-center px-2 py-3 rounded-md transition-all whitespace-normal
                    ${
                      selectedCategory === category.id && category.slug !== "disinfection-services"
                        ? "bg-[#0463ac] text-white shadow-md "
                        : "bg-white text-gray-800 border border-black hover:border-black"
                    }`}
                >
                  {category.icon_url && <img loading="lazy" src={category.icon_url} alt="" className="w-6 h-6 mb-1 flex-shrink-0" />}
                  <span className="text-xs font-medium sm:text-sm text-center leading-tight break-words">
                    {category.category_name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        */}

        {/* Overlapping Card for Dropdowns */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 -mt-8 sm:-mt-20 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Service Category (New) */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-600 mb-2">Service Category</label>
                <Dropdown
                  label="Select Category"
                  value={selectedCategory}
                  options={categories?.map(c => ({ ...c, subcategory_name: c.category_name })) || []}
                  onChange={(id) => {
                    const cat = categories?.find((c) => c.id === id);
                    if (cat) handleCategorySelect(cat);
                  }}
                />
              </div>

              {/* Service Type */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-600 mb-2">Service Type</label>
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
                <label className="block text-sm font-semibold text-gray-600 mb-2">Property Size</label>
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
                <label className="block text-sm font-semibold text-gray-600 mb-2">Service Variant</label>
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
        </div>
        <div className="mb-0">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            {recommended.length + regular.length === 0
              ? "Loading Services..."
              : "Available Service Packages"}
          </h3>

          <div className="flex justify-center">
            {recommended.length + regular.length === 0 ? (
              <div className="text-center text-gray-500 py-10">Loading service packages...</div>
            ) : (
              <div className={`grid gap-4 sm:gap-6 px-4 w-full 
                ${(recommended.length + regular.length === 1 && "grid-cols-1 place-items-center max-w-[400px] ") ||
                (recommended.length + regular.length === 2 && "grid-cols-1 sm:grid-cols-2 place-items-center max-w-[800px]") ||
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch max-w-7xl"
                }`}>
                {[...recommended, ...regular].map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct === product.id}
                    onClick={() => setSelectedProduct(product.id)}
                  />
                ))}

              </div>
            )}
          </div>
        </div>
      </section>
      <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLoginSuccess={handlePostLoginAdd} />
    </>
  );
};

export default ServiceSection;
