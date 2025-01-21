import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import config from "../../config/config";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";
import { useToast } from "../../context/ToastProvider";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProductListPage = () => {
  const { subcategoryId, location } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const notify = useToast();

  // State for handling variations and cart
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedVariations, setSelectedVariations] = useState({});
  const [isAddingToCart, setIsAddingToCart] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [subcategoryId, location]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/api/products`, {
        subcategory_id: subcategoryId,
      });
      setProducts(response.data.data);
      setSubcategoryData(response.data.subcategory);

      // Initialize selected attributes and variations
      const initialAttributes = {};
      const initialVariations = {};
      response.data.data.forEach((product) => {
        if (product.variations && product.variations.length > 0) {
          const attributes = [
            ...new Set(product.variations.map((v) => v.attribute_name)),
          ];
          if (attributes.length > 0) {
            initialAttributes[product.id] = attributes[0];
            const firstVariation = product.variations.find(
              (v) => v.attribute_name === attributes[0]
            );
            if (firstVariation) {
              initialVariations[product.id] = firstVariation.data;
            }
          }
        }
      });
      setSelectedAttributes(initialAttributes);
      setSelectedVariations(initialVariations);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify("Error fetching products", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getAttributesForProduct = (product) => {
    if (!product.variations) return [];
    return [...new Set(product.variations.map((v) => v.attribute_name))];
  };

  const getVariationsForAttribute = (product, attribute) => {
    if (!product.variations) return [];
    return product.variations.filter((v) => v.attribute_name === attribute);
  };

  const handleAttributeSelect = (productId, attribute) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [productId]: attribute,
    }));

    // Find and set the first variation for this attribute
    const product = products.find((p) => p.id === productId);
    const firstVariation = product.variations.find(
      (v) => v.attribute_name === attribute
    );
    if (firstVariation) {
      setSelectedVariations((prev) => ({
        ...prev,
        [productId]: firstVariation.data,
      }));
    } else {
      setSelectedVariations((prev) => ({
        ...prev,
        [productId]: null,
      }));
    }
  };

  const handleVariationSelect = (productId, variation) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [productId]: variation,
    }));
  };

  const calculateTaxAmount = (product, price) => {
    return product.tax_type === "amount"
      ? Number(product.tax)
      : (Number(product.tax) / 100) * price;
  };

  const handleAddToCart = async (product) => {
    const variation = selectedVariations[product.id];
    if (!variation) {
      notify("Please select all options", "warning");
      return;
    }

    setIsAddingToCart((prev) => ({ ...prev, [product.id]: true }));

    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      if (!jwtToken) {
        navigate("/login"); // Or show login modal
        return;
      }

      const userId = jwtDecode(jwtToken).id;
      const cartItem = {
        user_id: userId,
        product_id: product.id,
        vendor_id: product.vendor_id,
        product_name: product.product_name,
        image: product.productimage?.image_url,
        qty: 1,
        price: variation.discounted_variation_price,
        attribute: variation.attribute_id,
        variation: variation.id,
        tax: calculateTaxAmount(product, variation.discounted_variation_price),
        shipping_cost: product.shipping_cost,
      };

      const response = await axios.post(
        `${config.API_URL}/api/addtocart`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      if (response.data.status === 1) {
        notify("Successfully added to cart", "success");
        // Trigger cart update in your context if needed
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      notify("Error adding to cart", "error");
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  const calculateDiscountPercentage = (variation) => {
    if (!variation) return 0;
    const originalPrice = Number(variation.price);
    const discountedPrice = Number(variation.discounted_variation_price);
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };

  if (isLoading) return <LoadingWrapper />;

  return (
    <>
      <Helmet>
        <title>{subcategoryData?.meta_title || "Product Listing"}</title>
        <meta name="description" content={subcategoryData?.meta_description} />
        <meta property="og:title" content={subcategoryData?.meta_title} />
        <meta
          property="og:description"
          content={subcategoryData?.meta_description}
        />
        <meta property="og:image" content={subcategoryData?.image_url} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* Banner Section */}
        <div className="relative w-full h-[250px] md:h-[300px]">
          <img
            src={subcategoryData?.image_url}
            alt={subcategoryData?.subcategory_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-2">
              {subcategoryData?.subcategory_name}
            </h1>
            <p className="text-lg md:text-xl text-white text-center">
              {subcategoryData?.subcategory_title}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => {
              const attributes = getAttributesForProduct(product);
              const selectedAttribute = selectedAttributes[product.id];
              const variations = selectedAttribute
                ? getVariationsForAttribute(product, selectedAttribute)
                : [];
              const selectedVariation = selectedVariations[product.id];
              const discountPercentage =
                calculateDiscountPercentage(selectedVariation);

              return (
                <motion.div
                  key={product.id}
                  variants={item}
                  className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-video">
                    <img
                      src={product.productimage?.image_url}
                      alt={product.product_name}
                      className="w-full h-full object-cover"
                    />
                    {discountPercentage > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                        {discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-3">
                      {product.product_name}
                    </h2>

                    {/* Description */}
                    <div className="mb-4 h-24 overflow-hidden relative">
                      <div
                        className="text-sm text-gray-600 prose prose-sm"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                      <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
                    </div>

                    {/* Variations Selection */}
                    {attributes.length > 0 && (
                      <div className="space-y-4 mt-auto">
                        {/* Frequency Selection */}
                        <div className="relative">
                          <select
                            value={selectedAttribute || ""}
                            onChange={(e) =>
                              handleAttributeSelect(product.id, e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10"
                          >
                            <option value="">Select Frequency</option>
                            {attributes.map((attr) => (
                              <option key={attr} value={attr}>
                                {attr}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* BHK Selection */}
                        {selectedAttribute && (
                          <div className="relative">
                            <select
                              value={selectedVariation?.id || ""}
                              onChange={(e) => {
                                const variation = variations.find(
                                  (v) => v.data.id === e.target.value
                                );
                                handleVariationSelect(
                                  product.id,
                                  variation?.data
                                );
                              }}
                              className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10"
                            >
                              <option value="">Select BHK</option>
                              {variations.map((v) => (
                                <option key={v.data.id} value={v.data.id}>
                                  {v.data.variation}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price Display */}
                    {selectedVariation && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-[#10847E]">
                            ₹{selectedVariation.discounted_variation_price}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            ₹{selectedVariation.price}
                          </span>
                        </div>
                        {selectedVariation.variation_times && (
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedVariation.variation_times} services every{" "}
                            {selectedVariation.variation_interval} days
                          </p>
                        )}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={
                        !selectedVariation || isAddingToCart[product.id]
                      }
                      className={`w-full py-3 px-4 rounded-md transition-colors duration-300 mt-4 ${
                        selectedVariation && !isAddingToCart[product.id]
                          ? "bg-[#10847E] text-white hover:bg-[#0d6d68]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isAddingToCart[product.id] ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default ProductListPage;
