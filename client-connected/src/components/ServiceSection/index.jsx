import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import LoginSignup from "../LoginModal";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import { Listbox } from "@headlessui/react";

const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const { user } = useCont();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [currentVariations, setCurrentVariations] = useState([]);
  const [showAllVariations, setShowAllVariations] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

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

      if (product?.attributes?.length > 0) {
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

    const cartItem = {
      user_id: user.id,
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: product.image_url, // Assuming the first image from product
      qty: 1,
      price: variation.discounted_variation_price || variation.price,
      attribute: selectedAttribute,
      variation: variation.id,
      tax: product.tax_amount || 0,
      shipping_cost: product.shipping_cost || 0,
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
          <div className="p-6 flex flex-col h-full">
            {isRecommended && (
              <div className="flex justify-center mb-4">
                <span className="bg-white rounded-full py-1 px-4 text-hommlie text-sm font-medium">
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className="mb-6 text-center">
              <div
                className={`text-3xl font-bold mb-2 ${
                  isRecommended ? "text-white" : "text-gray-900"
                }`}
              >
                ₹{variation.discounted_variation_price || variation.price}/-
              </div>
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
            <div
              className={`${
                isRecommended ? "border border-white" : "border border-hommlie"
              } mb-6 text-center rounded-lg py-2 px-4`}
            >
              <h3
                className={`text-lg ${
                  isRecommended ? "text-white" : "text-gray-700"
                }`}
              >
                {variation.variation}
              </h3>
            </div>

            <a
              href={`${config.VITE_BASE_URL}/product/${product?.id}/${product?.slug}`}
              className={`${
                isRecommended ? "text-white" : "text-hommlie"
              } text-left underline underline-offset-4 hover:no-underline mb-4`}
            >
              Learn More
            </a>

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
                {isAddingToCart ? "Adding..." : "Book Now"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Dropdown Component
  const Dropdown = ({
    label,
    value,
    options,
    onChange,
    disabled,
    showRecommended,
  }) => (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button
          className={`w-full p-3 pr-10 bg-white border border-gray-300 rounded-lg text-left
          ${disabled ? "cursor-not-allowed bg-gray-50" : "cursor-pointer"}
          focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        >
          {value
            ? options.find((option) => option.id === value)?.subcategory_name ||
              options.find((option) => option.id === value)?.product_name ||
              options.find((option) => option.id === value)?.attribute
            : label}
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <Listbox.Option
              key={option.id}
              value={option.id}
              className={({ active }) =>
                `cursor-pointer select-none p-3 ${
                  active ? "bg-emerald-50 text-emerald-800" : "text-gray-900"
                }`
              }
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
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );

  // Get current product for navigation
  const getCurrentProduct = () => {
    const category = categories?.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories?.find(
      (s) => s.id === selectedSubCategory
    );
    return subcategory?.products?.find((p) => p.id === selectedProduct);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Category Cards */}
      <div className="flex justify-center overflow-x-auto gap-4 pb-6 hide-scrollbar p-2 scrollbar-hide">
        {categories?.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-lg whitespace-nowrap min-w-[200px]
              ${
                selectedCategory === category.id
                  ? "bg-emerald-800 text-white"
                  : "bg-white text-gray-800 border border-hommlie"
              }`}
          >
            {category.icon_url && (
              <img src={category.icon_url} alt="" className="w-6 h-6" />
            )}
            {category.category_name}
          </motion.button>
        ))}
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Dropdown
          label="Select Subcategory"
          value={selectedSubCategory}
          options={getCurrentSubcategories()}
          onChange={setSelectedSubCategory}
          disabled={!selectedCategory}
        />
        <Dropdown
          label="Select Product"
          value={selectedProduct}
          options={getCurrentProducts()}
          onChange={setSelectedProduct}
          disabled={!selectedSubCategory}
          showRecommended
        />
        <Dropdown
          label="Select Attribute"
          value={selectedAttribute}
          options={getCurrentAttributes()}
          onChange={setSelectedAttribute}
          disabled={!selectedProduct}
        />
      </div>

      {/* Variation Cards */}
      {currentVariations.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleVariations().map((variation, index) => (
              <VariationCard
                key={variation.id}
                variation={variation}
                isRecommended={index === 0}
                product={getCurrentProduct()}
              />
            ))}
          </div>

          {/* View All Button */}
          {currentVariations.length > 3 && (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllVariations(!showAllVariations)}
                className="px-6 py-3 bg-emerald-800 text-white rounded-lg font-medium hover:bg-emerald-900 transition-colors"
              >
                {showAllVariations ? "Show Less" : "View All"}
              </motion.button>
            </div>
          )}
        </div>
      )}

      <LoginSignup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // checkoutPd={checkoutPd}
      />
    </section>
  );
};

export default ServiceSection;
