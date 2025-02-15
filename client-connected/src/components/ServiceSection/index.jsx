import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ServiceSection = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [currentVariations, setCurrentVariations] = useState([]);

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
    const category = categories.find((c) => c.id === selectedCategory);
    return category?.subcategories || [];
  };

  // Get current products
  const getCurrentProducts = () => {
    const category = categories.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories.find(
      (s) => s.id === selectedSubCategory
    );
    return subcategory?.products || [];
  };

  // Get current attributes
  const getCurrentAttributes = () => {
    const category = categories.find((c) => c.id === selectedCategory);
    const subcategory = category?.subcategories.find(
      (s) => s.id === selectedSubCategory
    );
    const product = subcategory?.products.find((p) => p.id === selectedProduct);
    return product?.attributes || [];
  };

  // Variation Card Component
  const VariationCard = ({ variation, isRecommended }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg overflow-hidden ${
        isRecommended ? "bg-emerald-800" : "bg-white border border-gray-200"
      }`}
    >
      <div className="p-6">
        {isRecommended && (
          <div className="mb-4">
            <span className="text-white text-sm font-medium">RECOMMENDED</span>
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

        {variation.description && (
          <div
            className={`mb-6 ${isRecommended ? "text-white" : "text-gray-600"}`}
          >
            <p>{variation.description}</p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg font-medium transition-colors
            ${
              isRecommended
                ? "bg-white text-emerald-800 hover:bg-gray-100"
                : "bg-emerald-800 text-white hover:bg-emerald-900"
            }`}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );

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

  const handleAddToCart = async () => {
    if (user.length === 0) {
      openModal();
    } else {
      setIsAddingToCart(true);
      const product = {
        user_id: user.id,
        product_id: prod_id,
        vendor_id: prodData.vendor_id,
        product_name: prodData.product_name,
        image: imageItems[0]?.image_url,
        qty: 1,
        price: totalAmount,
        attribute: selectedVariation && selectedVariation.attribute_id,
        variation: selectedVariation && selectedVariation.id,
        tax: taxAmount,
        shipping_cost: prodData.shipping_cost,
      };

      try {
        const response = await axios.post(
          `${config.API_URL}/api/addtocart`,
          product
        );
        if (response.data.status === 1) {
          console.log(response.data);
          successNotify("Successfully added to Cart");
          getCart();
        }
      } catch (error) {
        errorNotify(error);
        console.log("error adding to cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
      setCart(product);
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      existingCart.push(product);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      getCart();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Category Cards */}
      <div className="flex overflow-x-auto gap-4 pb-6 hide-scrollbar">
        {categories.map((category) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentVariations.map((variation, index) => (
            <VariationCard
              key={variation.id}
              variation={variation}
              isRecommended={index === 0} // First variation is recommended
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ServiceSection;
