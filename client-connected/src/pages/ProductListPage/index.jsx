import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import config from "../../config/config";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";

const ProductListPage = () => {
  const { subcategoryId, location } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Store selected variations for each product
  const [selectedVariations, setSelectedVariations] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});

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
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAttributesForProduct = (product) => {
    console.log(product.variations);

    if (product.is_variation === 0 || !product.variations) return [];
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

    // Reset the selected variation when attribute changes
    setSelectedVariations((prev) => ({
      ...prev,
      [productId]: null,
    }));
  };

  const handleVariationSelect = (productId, variation) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [productId]: variation,
    }));
  };

  const handleAddToCart = async (product) => {
    const variation = selectedVariations[product.id];
    if (!variation) return;

    const cartItem = {
      user_id: "user_id", // Replace with actual user ID
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: product.productimage?.image_url,
      qty: 1,
      price: variation.discounted_variation_price,
      attribute: variation.attribute_id,
      variation: variation.id,
      tax:
        product.tax_type === "amount"
          ? Number(product.tax)
          : (Number(product.tax) / 100) * variation.discounted_variation_price,
      shipping_cost: product.shipping_cost,
    };

    try {
      const response = await axios.post(
        `${config.API_URL}/api/addtocart`,
        cartItem
      );
      if (response.data.status === 1) {
        // Update local cart state
        setCart((prev) => [...prev, cartItem]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-3">
                      {product.product_name}
                    </h2>

                    {/* Description with height limit */}
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
                    {attributes?.length > 0 && (
                      <div className="space-y-4 mt-auto">
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
                              {variations?.map((v) => (
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
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-3 px-4 rounded-md transition-colors duration-300 mt-4 ${
                        selectedVariation
                          ? "bg-[#10847E] text-white hover:bg-[#0d6d68]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!selectedVariation}
                    >
                      Add to Cart
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

export default ProductListPage;
