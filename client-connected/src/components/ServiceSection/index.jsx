import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Star, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import LoginSignup from "../LoginModal";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import Requestacallback from "../../pages/Requestacallback";
import { Suspense } from "react";

const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const { user, getCart } = useCont();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedBhk, setSelectedBhk] = useState("");
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

  // Initialize selection on mount
  useEffect(() => {
    if (categories?.length && !selectedCategory) {
      const cat = categories[0];
      setSelectedCategory(cat.id);
      if (cat.subcategories?.length) {
        const sub = cat.subcategories[0];
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
        const sub = cat.subcategories[0];
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
    const recommended = products.filter((p) => p.is_recommended === 1);
    const regular = products.filter((p) => p.is_recommended !== 1);
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
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
              isOpen ? "rotate-180 text-black" : "text-black"
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
                  className={`cursor-pointer p-3 flex items-start justify-between hover:bg-green-700 transition-colors ${
                    isSelected ? "bg-white text-black" : "text-gray-900"
                  } ${showRecommended && option?.is_recommended === 1 ? "border-l-4 border-emerald-500" : ""}`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-[#493f9e] bg-green-700" : "border-gray-300"
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
    // If the globally selectedAttribute belongs to this product, use it.
    // Otherwise, fall back to this product's first attribute so the card
    // displays its own data even when not selected.
    const selectedAttr = product.attributes?.find((attr) => attr.id === selectedAttribute) || product.attributes?.[0];

    const matchedVariation =
      selectedAttr?.variations?.find((v) => v.variation === selectedBhk) ||
      selectedAttr?.variations?.[0];

    const rating = matchedVariation?.avg_rating || product.avg_rating || 4.9;
    const reviews = matchedVariation?.total_reviews || product.total_reviews || 11540;

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative w-[94vw] sm:max-w-[360px] rounded-xl border border-black transition-all duration-300 overflow-hidden flex flex-col justify-between 
          h-[530px] bg-white hover:shadow-md ${isSelected ? "shadow-lg" : ""}`}
      >

        {product.is_recommended == 1 && (
          <div className="absolute top-2 right-2">
            <div className=" relative bg-[#133215] text-white text-[11px] font-bold py-0 pl-3 pr-6 rounded-r-md shadow-md flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current text-white" />
              RECOMMENDED
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border border-yellow-400 shadow-sm" />
            </div>
          </div>
        )}
        <div className="p-4 flex flex-col justify-between h-full cursor-pointer" onClick={onClick}>
          <div className="flex flex-col items-center text-center mb-4 pt-2">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.product_name}</h3>
            {selectedAttr?.attribute && (
              <span className="px-3 py-1 rounded-md text-sm font-medium border shadow bg-white text-black">
                {selectedAttr.attribute}
              </span>
            )}
          </div>

          {matchedVariation?.description && (
            <ul className="space-y-2 mb-4">
              {formatDescription(matchedVariation.description).map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-black">✓</span>
                  <span className="text-black">{point.trim()}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col items-center mb-4">
            <div className="flex gap-4 justify-center text-2xl font-bold mb-1">
              <span className="text-black">₹{matchedVariation?.discounted_variation_price || matchedVariation?.price}/-</span>
              {matchedVariation?.discounted_variation_price && matchedVariation?.price && (
                <span className="line-through text-gray-500">₹{matchedVariation?.price}/-</span>
              )}
            </div>
            {matchedVariation?.discounted_variation_price && matchedVariation?.price && (
              <span className="text-sm bg-white text-black px-2 py-0.5 rounded-full">
                {Math.round(((matchedVariation.price - matchedVariation.discounted_variation_price) / matchedVariation.price) * 100)}% OFF
              </span>
            )}
          </div>

            <a
            href={`${config.VITE_BASE_URL}/product/${product?.slug}`}
            className="text-left mb-2 text-sm text-green-600 text-bold text-decoration-line: underline"
          >
            View Details
          </a>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center border-b border-dotted border-gray-300 pb-1 w-fit">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#6D4AFF] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>

              <span className="ml-2 text-base font-semibold text-gray-900">
                {rating.toFixed(1)}
              </span>

              <span className="ml-1 text-sm text-gray-500">
                ({reviews >= 1000 ? `${(reviews / 1000).toFixed(0)}K` : reviews} reviews)
              </span>
            </div>
            <div className="text-sm font-medium">
              For:{" "}
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="ml-1 p-1 rounded text-sm bg-white text-black border border-black"
              >
                {getVariationOptions().map((variation) => (
                  <option key={variation} value={variation}>{variation}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                if (matchedVariation) handleAddToCart(matchedVariation, product);
              }}
              className={`w-full py-3 rounded-lg font-bold transition-colors  bg-green-700 text-white hover:bg-[#52852d] hover:text-white 
                ${isAddingToCart ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isAddingToCart ? "Adding..." : "Book Now"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-[Helvetica] bg-white">
        {/* Request a Callback Button (visible on all devices) */}
        <div className="block sm:hidden mb-5 -mt-20 sm:-mt-0 flex justify-center">
          <button
            className="bg-[#15803d] text-white px-6 py-2 rounded-md hover:bg-[#52852d] transition"
            onClick={() => setIsCallbackOpen(true)}
          >
            Request a Callback
          </button>
        </div>
        {/* Modal for callback */}
        <Requestacallback isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} source="homepage" />
        <div className="mb-0 text-center sm:-mt-6">
          <h2 className="hidden sm:block text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Choose Your Service Category</h2>
          <div className="w-full flex justify-center sm:justify-center">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 px-2 sm:overflow-visible">
              {categories?.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCategorySelect(category)}
                  className={`border border-black w-[108px] sm:w-[180px] text-center flex flex-col items-center justify-center px-2 py-3 rounded-md transition-all whitespace-normal
                    ${
                      selectedCategory === category.id && category.slug !== "disinfection-services"
                        ? "bg-green-700 text-white shadow-md "
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

          <div className="pt-2 mb-8 max-w-4xl mx-auto">
          {/* Responsive layout:
              - Desktop (md+): 3 columns: Service Type | Property Size | Service Variant
              - Mobile (sm): 2 columns: Service Type | Property Size (side-by-side)
                Variant will appear as a full-width row below occupying both columns
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <Dropdown label="Select Subcategory" value={selectedSubCategory} options={getCurrentSubcategories()} onChange={setSelectedSubCategory} disabled={!selectedCategory} />
            </div>

            {/* Property Size (BHK) - shown beside Service Type on mobile and in second column on desktop */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Size</label>
              <Dropdown
                label="Select BHK"
                value={selectedBhk}
                options={getVariationOptions().map((variation) => ({ id: variation, attribute: variation, subcategory_name: variation }))}
                onChange={setSelectedBhk}
                disabled={!selectedProduct}
              />
            </div>

            {/* Service Variant - on mobile this will move to the next row and span two columns; on desktop it sits in the third column */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Variant</label>
              <Dropdown label="Select Variant" value={selectedAttribute} options={getCurrentAttributes()} onChange={setSelectedAttribute} disabled={!selectedProduct} showRecommended />
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
                ${
                  (recommended.length + regular.length === 1 && "grid-cols-1 place-items-center max-w-[400px] ") ||
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
