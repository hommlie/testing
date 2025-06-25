import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Star, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import LoginSignup from "../LoginModal";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import FormSection from "../../pages/FormSection";

const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const { user, getCart } = useCont();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedBhk, setSelectedBhk] = useState("1 BHK");
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
    }
  }, [selectedProduct, selectedCategory, selectedSubCategory, categories]);

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

  // Handle adding product to cart
  const handleAddToCart = async (variation, product) => {
    if (!user) {
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

  // Get current variations for selected attribute
  const getCurrentVariations = () => {
    const category = categories?.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories?.find(
      (s) => s.id === selectedSubCategory
    );
    const product = subcategory?.products?.find(
      (p) => p.id === selectedProduct
    );
    const attribute = product?.attributes?.find(
      (a) => a.id === selectedAttribute
    );
    return attribute?.variations || [];
  };

  // Dropdown component
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
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-3 pr-10 bg-white border rounded-lg text-left truncate transition-all
            ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-400" : "cursor-pointer text-gray-900"}
            ${isOpen ? "border-emerald-500 ring-2 ring-emerald-100" : "border-gray-300 hover:border-emerald-400"}`}
          disabled={disabled}
        >
          <span className="truncate">
            {value
              ? options.find((option) => option.id === value)?.subcategory_name ||
                options.find((option) => option.id === value)?.product_name ||
                options.find((option) => option.id === value)?.attribute
              : label}
          </span>
          <ChevronDown
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform ${
              isOpen ? "rotate-180 text-emerald-600" : "text-gray-500"
            }`}
          />
        </button>

        {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = value === option.id;
            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`cursor-pointer p-3 flex items-start justify-between hover:bg-emerald-50 transition-colors ${
                  isSelected ? "bg-emerald-100 text-emerald-800" : "text-gray-900"
                } ${showRecommended && option?.is_recommended === 1 ? "border-l-4 border-emerald-500" : ""}`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-gray-300"
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

  // Product Card component
  const ProductCard = ({ product, isSelected, onClick }) => {
    const selectedAttr = selectedAttribute
      ? product.attributes?.find((attr) => attr.id === selectedAttribute)
      : product.attributes?.[0];
      
    // Find variation that matches selected BHK or use first variation
    const matchedVariation = selectedAttr?.variations?.find(
      (v) => v.variation === selectedBhk
    ) || selectedAttr?.variations?.[0];

    // Rating and reviews
    const rating = matchedVariation?.avg_rating || product.avg_rating || 4.9;
    const reviews = matchedVariation?.total_reviews || product.total_reviews || 11540;

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
          isSelected
            ? "border-emerald-500 bg-emerald-50 shadow-lg"
            : "border-gray-200 bg-white hover:shadow-md"
        }`}
      >
        {/* Recommended badge - Improved UI */}
        {product.is_recommended == 1 && (
          <div className="absolute top-2 right-2 z-10">
            <div className="relative bg-yellow-400 text-black text-[11px] font-bold py-1 pl-3 pr-6 rounded-r-full shadow-md flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current text-black" />
              RECOMMENDED
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border border-yellow-400 shadow-sm" />
            </div>
          </div>
        )}
          <div className="p-6 pt-10 cursor-pointer" onClick={onClick}>
          {/* Product name and attribute */}
          <div className="flex flex-col items-center text-center mb-4 pt-2">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {product.product_name}
            </h3>
            {selectedAttr?.attribute && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isSelected
                    ? "bg-white text-emerald-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {selectedAttr.attribute}
              </span>
            )}
          </div>

          {/* Description points */}
          {matchedVariation?.description && (
            <ul className="space-y-2 mb-4">
              {formatDescription(matchedVariation.description).map(
                (point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-emerald-500">✓</span>
                    <span className={isSelected ? "text-gray-800" : "text-gray-700"}>
                      {point.trim()}
                    </span>
                  </li>
                )
              )}
            </ul>
          )}

          {/* Price section */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 justify-center text-2xl md:text-3xl font-bold mb-1">
                <span className="text-emerald-600">
                  ₹{matchedVariation?.discounted_variation_price || matchedVariation?.price}/-
                </span>
                {matchedVariation?.discounted_variation_price && matchedVariation?.price && (
                  <span className="line-through text-gray-500">
                    ₹{matchedVariation?.price}/-
                  </span>
                )}
              </div>
              {matchedVariation?.discounted_variation_price && matchedVariation?.price && (
                <span className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  {Math.round(((matchedVariation.price - matchedVariation.discounted_variation_price) / matchedVariation.price) * 100)}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Rating and BHK selector */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
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
              <span
                className={`ml-1 text-sm font-medium ${
                  isSelected ? "text-gray-700" : "text-gray-600"
                }`}
              >
                {rating.toFixed(1)} (
                {reviews > 1000 ? `${(reviews / 1000).toFixed(1)}k+` : `${reviews}+`}
                )
              </span>
            </div>
            <div className="text-sm font-medium">
              <span className={isSelected ? "text-gray-700" : "text-gray-600"}>
                For:{" "}
              </span>
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className={`ml-1 p-1 rounded text-sm ${
                  isSelected
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
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

          {/* Book Now button */}
          <div className="mt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                if (matchedVariation) handleAddToCart(matchedVariation, product);
              }}
              className={`w-full py-3 rounded-lg font-bold transition-colors ${
                isSelected
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              } ${isAddingToCart ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isAddingToCart ? "Adding..." : "Book Now"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Group products by recommended status
  const groupProducts = () => {
    const products = getCurrentProducts();
    const recommended = products.filter(p => p.is_recommended === 1);
    const regular = products.filter(p => p.is_recommended !== 1);
    
    return { recommended, regular };
  };

  const { recommended, regular } = groupProducts();

  return (
    <>
      <FormSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category tabs */}
        <div className="mb-0 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose Your Service Category
          </h2>
          <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-2">
              {categories?.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategorySelect(category)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white text-gray-800 border border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  {category.icon_url && (
                    <img
                      src={category.icon_url}
                      alt=""
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  <span className="text-sm font-medium">
                    {category.category_name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <Dropdown
                label="Select Subcategory"
                value={selectedSubCategory}
                options={getCurrentSubcategories()}
                onChange={setSelectedSubCategory}
                disabled={!selectedCategory}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Size
              </label>
              <Dropdown
                label="Select BHK"
                value={selectedBhk}
                options={bhkOptions.map((bhk) => ({
                  id: bhk,
                  attribute: bhk,
                  subcategory_name: bhk,
                }))}
                onChange={setSelectedBhk}
                disabled={!selectedProduct}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Variant
              </label>
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
      {/* Product cards */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Available Service Packages
            </h3>

            {/* All products in a single grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 justify-items-center">
              {/* Recommended products first */}
              {recommended.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct === product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className="w-full max-w-[350px]"
                />
              ))}
              
              {/* Regular products next */}
              {regular.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct === product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className="w-full max-w-[350px]"
                />
              ))}
            </div>
          </div>
      </section>
      <LoginSignup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ServiceSection;