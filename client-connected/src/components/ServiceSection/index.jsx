import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceSection = ({ categories }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [currentVariations, setCurrentVariations] = useState([]);

  // Initialize first category when component mounts
  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  // Reset dependent selections when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSelectedSubCategory(null);
      setSelectedProduct(null);
      setSelectedAttribute(null);
      setCurrentVariations([]);
    }
  }, [selectedCategory]);

  // Reset dependent selections when subcategory changes
  useEffect(() => {
    if (selectedSubCategory) {
      setSelectedProduct(null);
      setSelectedAttribute(null);
      setCurrentVariations([]);
    }
  }, [selectedSubCategory]);

  // Reset dependent selections when product changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedAttribute(null);
      setCurrentVariations([]);
    }
  }, [selectedProduct]);

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
      }
    }
  }, [
    selectedAttribute,
    categories,
    selectedCategory,
    selectedSubCategory,
    selectedProduct,
  ]);

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
              <div className="mb-4">
                <span className="text-white text-sm font-medium">
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className="mb-6">
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
                {variation.variation}
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

            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  product?.slug &&
                  navigate(`/product/${product.slug}/${product.id}`)
                }
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  isRecommended
                    ? "bg-white text-emerald-800 hover:bg-gray-100"
                    : "bg-emerald-800 text-white hover:bg-emerald-900"
                }`}
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Dropdown Component
  const Dropdown = ({ label, value, options, onChange, disabled }) => (
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className={`w-full p-3 pr-10 bg-white border border-gray-300 rounded-lg appearance-none 
          ${disabled ? "cursor-not-allowed bg-gray-50" : "cursor-pointer"}
          focus:outline-none focus:ring-2 focus:ring-emerald-500`}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.subcategory_name || option.product_name || option.attribute}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
    </div>
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
      <div className="flex justify-center overflow-x-auto gap-4 pb-6 hide-scrollbar">
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
                  : "bg-white text-gray-800 border border-gray-200"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVariations.map((variation, index) => (
            <VariationCard
              key={variation.id}
              variation={variation}
              isRecommended={index === 0}
              product={getCurrentProduct()}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ServiceSection;
