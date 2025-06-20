import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import LoginSignup from "../LoginModal";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import FormSection from "../../pages/FormSection"
const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const { user, getCart } = useCont();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedBhk, setSelectedBhk] = useState("1 BHK");
  const [currentVariations, setCurrentVariations] = useState([]);
  const [showAllVariations, setShowAllVariations] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  // BHK options
  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"];

  // Initialize selections when component mounts
  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      const firstCategory = categories[0];
      setSelectedCategory(firstCategory.id);

      if (firstCategory.subcategories?.length > 0) {
        const firstSubcategory = firstCategory.subcategories[0];
        setSelectedSubCategory(firstSubcategory.id);

        if (firstSubcategory.products?.length > 0) {
          const firstProduct = firstSubcategory.products[0];
          setSelectedProduct(firstProduct.id);

          if (firstProduct.attributes?.length > 0) {
            setSelectedAttribute(firstProduct.attributes[0].id);
          }
        }
      }
    }
  }, [categories]);

  // Reset dependent selections when category changes
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((c) => c.id === selectedCategory);
      if (category?.subcategories?.length > 0) {
        setSelectedSubCategory(category.subcategories[0].id);
        const firstSubcategory = category.subcategories[0];

        if (firstSubcategory.products?.length > 0) {
          setSelectedProduct(firstSubcategory.products[0].id);
          const firstProduct = firstSubcategory.products[0];

          if (firstProduct.attributes?.length > 0) {
            setSelectedAttribute(firstProduct.attributes[0].id);
          }
        }
      }
      setShowAllVariations(false);
    }
  }, [selectedCategory, categories]);

  // Reset dependent selections when subcategory changes
  useEffect(() => {
    if (selectedSubCategory) {
      const category = categories.find((c) => c.id === selectedCategory);
      const subcategory = category?.subcategories.find(
        (s) => s.id === selectedSubCategory
      );

      if (subcategory?.products?.length > 0) {
        setSelectedProduct(subcategory.products[0].id);
        const firstProduct = subcategory.products[0];

        if (firstProduct.attributes?.length > 0) {
          setSelectedAttribute(firstProduct.attributes[0].id);
        }
      }
      setShowAllVariations(false);
    }
  }, [selectedSubCategory, selectedCategory, categories]);

  // Reset dependent selections when product changes
  useEffect(() => {
    if (selectedProduct) {
      const category = categories.find((c) => c.id === selectedCategory);
      const subcategory = category?.subcategories.find(
        (s) => s.id === selectedSubCategory
      );
      const product = subcategory?.products.find(
        (p) => p.id === selectedProduct
      );

      if (product?.attributes?.length > 0 && !selectedAttribute) {
        setSelectedAttribute(product.attributes[0].id);
      }
      setShowAllVariations(false);
    }
  }, [selectedProduct, selectedCategory, selectedSubCategory, categories]);

  // Update variations when attribute changes
  useEffect(() => {
    if (selectedAttribute) {
      const category = categories.find((c) => c.id === selectedCategory);
      const subcategory = category?.subcategories.find(
        (s) => s.id === selectedSubCategory
      );
      const product = subcategory?.products.find(
        (p) => p.id === selectedProduct
      );
      const attribute = product?.attributes.find(
        (a) => a.id === selectedAttribute
      );

      if (attribute?.variations) {
        setCurrentVariations(attribute.variations);
        setShowAllVariations(false);
      }
    }
  }, [
    selectedAttribute,
    categories,
    selectedCategory,
    selectedSubCategory,
    selectedProduct,
  ]);

  // Get visible variations based on showAllVariations state
  const getVisibleVariations = () => {
    if (showAllVariations || currentVariations.length <= 3) {
      return currentVariations;
    }
    return currentVariations.slice(0, 3);
  };

  // Get current subcategories
  const getCurrentSubcategories = () => {
    const category = categories?.find((c) => c.id === selectedCategory);
    return category?.subcategories || [];
  };

  // Get current products
  const getCurrentProducts = () => {
    const category = categories?.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories?.find(
      (s) => s.id === selectedSubCategory
    );
    return subcategory?.products || [];
  };

  // Get current attributes
  const getCurrentAttributes = () => {
    const category = categories?.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories?.find(
      (s) => s.id === selectedSubCategory
    );
    const product = subcategory?.products?.find(
      (p) => p.id === selectedProduct
    );
    return product?.attributes || [];
  };

  // Handle category selection with dynamic navigation
  const handleCategorySelect = (category) => {
    if (category.is_form === 1) {
      navigate(`${config.VITE_BASE_URL}/${category.slug}`);
      return;
    }
    setSelectedCategory(category.id);
  };

  // Format description points
  const formatDescription = (description) => {
    return description?.split("|").filter((point) => point.trim());
  };

  const handleAddToCart = async (variation, product) => {
    if (!user || user.length === 0) {
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
      const response = await axios.post(
        `${config.API_URL}/api/addtocart`,
        cartItem
      );
      if (response.data.status === 1) {
        successNotify("Successfully added to Cart");
        // Update local storage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        existingCart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        // Refresh cart data
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

  // Variation Card Component
  const VariationCard = ({ variation, isRecommended, product }) => {
    const descriptionPoints = formatDescription(variation.description);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full"
      >
        <div
          className={`rounded-lg overflow-hidden h-full ${
            isRecommended
              ? "bg-emerald-800"
              : "bg-white border border-emerald-800"
          }`}
        >
          <div className="p-4 md:p-6 flex flex-col h-full">
            {isRecommended && (
              <div className="flex justify-center mb-4">
                <span className="bg-white rounded-full py-1 px-4 text-emerald-800 text-sm font-medium">
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className="w-80 md:w-auto mb-6 text-center">
              <div
                className={`${
                  isRecommended ? "border border-white" : ""
                } mb-4 text-2xl md:text-3xl font-bold text-center rounded-lg py-2 px-4`}
              >
                <h3 className={`${isRecommended ? "text-white" : ""}`}>
                  {variation.variation}
                </h3>
              </div>
              <div
                className={`flex gap-4 justify-center text-2xl md:text-3xl font-bold mb-2 ${
                  isRecommended ? "text-white" : "text-gray-900"
                }`}
              >
                <span>₹{variation.discounted_variation_price}/-</span>
                <span className="line-through text-gray-600">
                  ₹{variation.price}/-
                </span>
              </div>
              {variation?.avg_rating && (
                <div className="flex justify-center py-2">
                  <StarRating
                    rating={variation?.avg_rating}
                    reviews={variation?.total_reviews}
                  />
                </div>
              )}
              <h3
                className={`text-lg ${
                  isRecommended ? "text-white" : "text-gray-700"
                }`}
              >
                {product?.product_name}
              </h3>
            </div>

            {descriptionPoints && (
              <div
                className={`mb-6 flex-grow ${
                  isRecommended ? "text-white" : "text-gray-600"
                }`}
              >
                <ul className="space-y-2">
                  {descriptionPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">✓</span>
                      {point.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <a
                href={`${config.VITE_BASE_URL}/product/${product?.slug}`}
                className={`${
                  isRecommended ? "text-white" : "text-emerald-800"
                } text-left underline underline-offset-4 hover:no-underline flex items-center`}
              >
                View Details <ChevronRight className="ml-1 w-4 h-4" />
              </a>
              
              <div className="text-sm font-medium">
                <span className={isRecommended ? "text-white" : "text-gray-600"}>
                  For:{" "}
                </span>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className={`ml-1 p-1 rounded ${
                    isRecommended
                      ? "bg-emerald-700 text-white border-white"
                      : "bg-white text-gray-800 border-gray-300"
                  } border focus:outline-none focus:ring-1 focus:ring-emerald-500`}
                >
                  {bhkOptions.map((bhk) => (
                    <option key={bhk} value={bhk}>
                      {bhk}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddToCart(variation, product)}
                disabled={isAddingToCart}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isRecommended
                    ? "bg-white text-emerald-800 hover:bg-gray-100"
                    : "bg-emerald-800 text-white hover:bg-emerald-900"
                } ${isAddingToCart ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isAddingToCart ? "Adding..." : "Order Now"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

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
        <div className="text-md md:text-sm">
          {rating} (
          {reviews > 1000 ? `${(reviews / 1000).toFixed(1)}K` : reviews}{" "}
          reviews)
        </div>
      </div>
    );
  };

  // Dropdown
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionId) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full p-3 pr-10 bg-white border border-gray-300 rounded-lg text-left truncate
        ${disabled ? "cursor-not-allowed bg-gray-50" : "cursor-pointer"}
        focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
          !value ? "text-gray-400" : "text-gray-900"
        }`}
      >
        {value
          ? options.find((option) => option.id === value)?.subcategory_name ||
            options.find((option) => option.id === value)?.product_name ||
            options.find((option) => option.id === value)?.attribute
          : label}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`cursor-pointer select-none p-3 hover:bg-emerald-50 hover:text-emerald-800 ${
                value === option.id ? "bg-emerald-100 text-emerald-800" : "text-gray-900"
              }`}
            >
              {showRecommended && option?.is_recommended === 1 ? (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-emerald-600">
                    ✓ Recommended
                  </span>
                  <span className="text-base font-semibold">
                    {option.subcategory_name ||
                      option.product_name ||
                      option.attribute}
                  </span>
                </div>
              ) : (
                <span>
                  {option.subcategory_name ||
                    option.product_name ||
                    option.attribute}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
  // Get current product for navigation
  const getCurrentProduct = () => {
    const category = categories?.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories?.find(
      (s) => s.id === selectedSubCategory
    );
    return subcategory?.products?.find((p) => p.id === selectedProduct);
  };

  return (
    <>
    <FormSection />
    <section className="max-w-8xl mx-auto px-4 md:px-9 py-5 md:py-10">
      {/* Category Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 p-2">
          {categories?.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(category)}
              className={`flex flex-col md:flex-row items-center gap-3 px-3 md:px-6 py-2 md:py-4 rounded-lg whitespace-nowrap md:min-w-[200px]
                ${
                  selectedCategory === category.id
                    ? "bg-emerald-800 text-white"
                    : "bg-white text-gray-800 border border-emerald-600"
                }`}
            >
              {category.icon_url && (
                <img src={category.icon_url} alt="" className="w-6 h-6" />
              )}
              {category.category_name}
            </motion.button>
          ))}
        </div>
      </div>
      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Dropdown
          label="Select Subcategory"
          value={selectedSubCategory}
          options={getCurrentSubcategories()}
          onChange={setSelectedSubCategory}
          disabled={!selectedCategory}
        />
        <Dropdown
          label="Select the Room Type"
          value={selectedBhk}
          options={bhkOptions.map(bhk => ({
            id: bhk,
            attribute: bhk
          }))}
          onChange={setSelectedBhk}
          disabled={!selectedProduct}
        />
        <Dropdown
          label="Select Room Type"
          value={selectedAttribute}
          options={getCurrentAttributes()}
          onChange={setSelectedAttribute}
          disabled={!selectedProduct}
          showRecommended
        />
      </div>

      {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getCurrentProducts()?.map((product) => {
             const selectedAttr = selectedAttribute
            ? product.attributes?.find(attr => attr.id === selectedAttribute)
            : product.attributes?.[0];
            const matchedVariation = selectedAttr?.variations?.find(v => v.variation === selectedBhk)
              || selectedAttr?.variations?.[0];

              const isRecommended = product.is_recommended === 1;

              const basePrice = matchedVariation?.price || product.price || 0;
              const discountedPrice = matchedVariation?.discounted_variation_price || product.discounted_price || basePrice;

              const discountPercentage = basePrice > 0
                ? Math.round(((basePrice - discountedPrice) / basePrice) * 100)
                : 0;

              const getBhkMultiplier = () => {
                if (!selectedBhk) return 1;
                const bhkNumber = parseInt(selectedBhk);
                return isNaN(bhkNumber) ? 1 : bhkNumber;
              };

              const multiplier = getBhkMultiplier();
              const finalPrice = Math.round(discountedPrice * multiplier);
              const originalPrice = Math.round(basePrice * multiplier);

              const rating = product.avg_rating || 4.9;
              const reviews = product.total_reviews || 11540;

              return (
                <motion.button
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`flex flex-col text-left p-5 rounded-xl border-2 transition-all duration-200 gap-3
                    ${
                      selectedProduct === product.id
                        ? "bg-emerald-800 text-white border-emerald-800"
                        : isRecommended
                          ? "border-emerald-800 text-gray-900"
                          : "bg-white border-gray-200 text-gray-900"
                    }`}
                >
                  {isRecommended && (
                    <div className="relative -mt-6">
                      <div className=" h-10 w-full">
                        {/* Green background base absolute */}
                      <div className="top-0 left-0 -ml-5 w-[112%] h-[2.6rem] bg-emerald-800 rounded-t-xl z-0" />
                        {/* White clipped "RECOMMENDED" banner */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0">
                          <div
                            className="h-10 px-6 flex items-center justify-center font-bold text-base text-emerald-800 bg-white shadow-md"
                            style={{
                              clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 20px 100%)"
                            }}
                          >
                            RECOMMENDED
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Product Name */}
                  <span className={`pt-3 text-xl font-bold text-center ${
                    selectedProduct === product.id ? "text-white" : "text-gray-900"
                  }`}>
                    {product.product_name}
                  </span>
                  {/* Description as bullet points */}
                  {matchedVariation?.description && (
                    <ul className="space-y-2 pl-5 mt-2">
                      {matchedVariation.description.split("|").map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span className={selectedProduct === product.id ? "text-white" : "text-gray-700"}>
                            {point.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                    {selectedAttr?.attribute && (
                      <div className="w-full text-center">
                        <p
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                            ${selectedProduct === product.id 
                              ? "bg-white text-emerald-800" 
                              : "bg-emerald-100 text-emerald-800"
                            }`}
                        >
                          {selectedAttr.attribute}
                        </p>
                      </div>
                    )}
                  {/* Price Section */}
                  <div className="text-center mt-2">
                    <div className="flex justify-center items-baseline gap-2 mt-1">
                      <span className={`text-2xl font-bold ${
                        selectedProduct === product.id ? "text-white" : "text-emerald-800"
                      }`}>
                        ₹{finalPrice.toLocaleString('en-IN')}/-
                      </span>
                      {finalPrice !== originalPrice && (
                        <span className={`text-sm line-through ${
                          selectedProduct === product.id ? "text-gray-300" : "text-gray-500"
                        }`}>
                          ₹{originalPrice.toLocaleString('en-IN')}/-
                        </span>
                      )}
                    </div>
                  </div>
                    
                  {/* Read More Link */}
                  <div className="text-center">
                    <a 
                      href={`${config.VITE_BASE_URL}/product/${product.slug}`}
                      className={`text-sm underline ${
                        selectedProduct === product.id ? "text-white" : "text-emerald-800"
                      }`}
                    >
                      Click Here To Read More
                    </a>
                  </div>

                  {/* Book Now Button */}
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="mt-2"
                  >
                    <button
                      onClick={() => {
                        const attribute = product.attributes?.find(attr => attr.id === selectedAttribute);
                        const variation = attribute?.variations?.find(v => v.variation === selectedBhk);
                        if (variation) handleAddToCart(variation, product);
                      }}
                      className={`w-full py-2 rounded-lg font-bold ${
                        selectedProduct === product.id
                          ? "bg-white text-emerald-800"
                          : isRecommended
                            ? "bg-emerald-800 text-white"
                            : "bg-white text-emerald-800 border-2 border-emerald-800"
                      }`}
                    >
                      Book Now
                    </button>
                  </motion.div>
                  {/* Rating Section */}
                  <div className="flex justify-center items-center gap-1 text-sm mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`font-medium ${selectedProduct === product.id ? "text-white" : "text-gray-800"}`}>
                      {rating.toFixed(1)} (
                      {reviews > 1000 ? `${(reviews / 1000).toFixed(1)}k+` : `${reviews}+`}
                      )
                    </span>
                  </div>
                  {/* Selected Marker - Hidden in this design but keeping functionality */}
                  {selectedProduct === product.id && (
                    <span className="hidden text-xs mt-2 font-semibold bg-white text-emerald-700 px-3 py-1 rounded-full border border-emerald-600">
                      Selected
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
      <LoginSignup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
    </>
  );
};

export default ServiceSection;
