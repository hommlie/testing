import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";
import Banner from '../../assets/images/innersubcat-banner.webp';
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";
import ProductDetailModal from "../../components/ProductDetailsModal";

const CartSection = ({ cart }) => {
  const calculateCartTotal = () => {
    return cart.reduce((sum, item) => sum + (Number(item.price) * item.qty), 0);
  };

  const calculateTaxTotal = () => {
    return cart.reduce((sum, item) => sum + (Number(item.tax) * item.qty), 0);
  };

  const calculateSavings = () => {
    // Assuming original price is stored or calculate savings based on your logic
    return cart.reduce((sum, item) => sum + 78, 0); // Replace with actual savings calculation
  };

  return (
    <div className="h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="space-y-4">
        <section className="bg-white rounded-lg p-4 space-y-4 glow-border">
          <h2 className="text-xl font-semibold">Cart Summary</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex flex-col">
                  <span className="font-medium">{item.product_name}</span>
                  <span className="text-sm text-gray-500">{item.variation_name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">₹{item.price}</span>
                  <span className="text-sm text-gray-500 block">Qty: {item.qty}</span>
                </div>
              </div>
            ))}
            
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{calculateCartTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{calculateTaxTotal()}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>₹{calculateCartTotal() + calculateTaxTotal()}</span>
              </div>
            </div>

            {calculateSavings() > 0 && (
              <div className="flex items-center justify-between text-green-600 pt-2">
                <span>Congratulations!</span>
                <span>₹{calculateSavings()} saved</span>
              </div>
            )}

            <button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition"
              onClick={() => window.location.href = '/add-to-cart'}
            >
              Checkout Now
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg p-4 space-y-4 glow-border">
          <h2 className="text-xl font-semibold">Hommlie Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Verified Professionals</li>
            <li>✓ Safe Chemicals</li>
            <li>✓ Service in 4hr</li>
            <li>✓ Superior Stain Removal</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const CleaningProductPage = () => {
  const location = useLocation();
  const { id, tag } = useParams();
  const navigate = useNavigate();
  const { cart, user, checkoutPd } = useCont();

  const [isLoading, setIsLoading] = useState(false);
  const [innerSubCategoryData, setInnerSubCategoryData] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [showVariationDetails, setShowVariationDetails] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState();
  const [selectedAttributeId, setSelectedAttributeId] = useState();

  const productRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
      setIsLoading(true);
      fetchSubCategoryData();
  }, [id]);

  const fetchSubCategoryData = async () => {
      try {
      const response = await axios.post(`${config.API_URL}/api/cleaningsubcategory`, { subcat_id: id });
      console.log(response.data.data);
      if (response.data.status === 1) {
        setInnerSubCategoryData(response.data.data);
        setIsLoading(false);
      }
      } catch (error) {
      console.error("Error fetching inner sub-category data:", error);
      setIsLoading(false);
      }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
      setIsModalOpen(false);
      const proceedBtn = document.getElementById('proceed-btn')?.onClick;
      if (typeof(proceedBtn) == undefined) {
          navigate(`${config.VITE_BASE_URL}/add-to-cart`);
      }
  };

  const handleProductClick = (index) => {
    setCurrentProductIndex(index);
    productRefs.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const handleProductNavigate = (product) => {
      const slug = product.product_name.toLowerCase().replace(/ /g, "-");
      navigate(`${config.VITE_BASE_URL}/product/${product.id}/${slug}/tag/${tag}`);
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? innerSubCategoryData.products.length - 1 : prevIndex - 1
    );
    productRefs.current[
      prevIndex === 0
        ? innerSubCategoryData.products.length - 1
        : prevIndex - 1
    ].scrollIntoView({ behavior: "smooth" });
  };
  
  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === innerSubCategoryData.products.length - 1 ? 0 : prevIndex + 1
    );
    productRefs.current[
      prevIndex === innerSubCategoryData.products.length - 1 ? 0 : prevIndex + 1
    ].scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = async () => {
      if(user.length === 0) {
          openModal();
      } else {
          setIsAddingToCart(true);
          const product = {
              user_id: user.id,
              product_id: prod_id,
              vendor_id: prodData.vendor_id,
              product_name: prodData.product_name,
              image: prodData?.productimages[0]?.image_url,
              qty: 1,
              price: totalAmount,
              attribute: selectedVariation && selectedVariation.attribute_id,
              variation: selectedVariation && selectedVariation.id,
              tax: taxAmount,
              shipping_cost: prodData.shipping_cost
          };            

          try {
              const response = await axios.post(`${config.API_URL}/api/addtocart`, product);
              if(response.data.status === 1) {
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
          const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
          existingCart.push(product);
          localStorage.setItem('cart', JSON.stringify(existingCart));
          getCart();
      }
  };

  const handleQtyUpdate = async (id, qty) => {
    setIsAddingToCart(true);
    
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
        if (qty === 0) {                
            handleRemoveFromCart(id);
        } else {
            try {
                const response = await axios.post(`${config.API_URL}/api/qtyUpdate`,
                    { qty, cart_id: id },
                    { headers: { Authorization: `Bearer ${jwtToken}` } }
                );
                if(response.data.status === 1) {
                    console.log(response.data.message);
                    getCart();
                }
            } catch (error) {
                console.log("error updating cart:", error);
            } finally {
                setIsAddingToCart(false);
            }
        }
    }
  };

  const handleRemoveFromCart = async(id) => {
    setIsAddingToCart(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
        
        const user_id = jwtDecode(jwtToken).id;
        try {
            const response = await axios.post(`${config.API_URL}/api/deleteProduct`, 
                { user_id, cart_id: id },
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            );
            if(response.data.status === 1) {
                console.log(response.data.message);
                getCart();
            }
        } catch (error) {
            console.log("error removing from cart:", error);
        } finally {
            setIsAddingToCart(false);
        }
    }
  };

  const handleViewDetails = (product, attributeId = null) => {
    setSelectedProduct(product);    
    setSelectedAttributeId(attributeId);
    setIsDetailModalOpen(true);
  };

  if (!innerSubCategoryData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loading />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 py-8">
        <nav className="flex space-x-2 text-gray-500 text-sm mb-8">
          <a href="/" className="text-blue-500">Home</a>
          <span>/</span>
          <span>{innerSubCategoryData?.category?.category_name}</span>
          <span>/</span>
          <span>{innerSubCategoryData?.subcategory_name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky  top-44 transition-all duration-300 ease-in-out">
              <section className="bg-white rounded-lg p-4 space-y-4 glow-border">
                <h2 className="text-lg font-semibold">
                  {innerSubCategoryData?.subcategory_name}
                </h2>
                <div className="text-sm flex items-center">
                  <span className="w-1/3 text-gray-500">Select a service</span>
                  <div className="bg-gray-300 h-0.5 w-2/3"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
                  {innerSubCategoryData?.products?.map((product, index) => (
                    <div
                      key={product.id}
                      className={`flex flex-col items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        index === currentProductIndex 
                          ? "glow-border bg-blue-50" 
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleProductClick(index)}
                    >
                      {product.productimages && product.productimages?.length > 0 ? (
                        <img
                          src={product.productimages[0]?.image_url}
                          alt={product.product_name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                      )}
                      <p className="text-xs text-center font-medium mt-2 truncate w-full">
                        {product.product_name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-1/2">
            <div className="space-y-6">
              <img
                src={innerSubCategoryData?.subcategory_banner}
                alt={innerSubCategoryData?.innersubcategory_name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              
              {innerSubCategoryData?.products?.map((product, index) => (
                <section
                  key={product.id}
                  ref={(el) => (productRefs.current[index] = el)}
                  className="bg-white rounded-lg p-6 space-y-6 glow-border scroll-mt-4"
                >
                  <h3 className="text-2xl font-semibold">{product.product_name}</h3>
                  {product?.attributes?.map((attribute, attrIndex) => (
                    <div
                      key={attrIndex}
                      className={`flex justify-between p-4 rounded-lg transition-all duration-200 ${
                        attribute.id === currentVariationIndex
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                          {attribute.attribute_name}
                        </h3>
                        <p className="text-gray-500">
                          {attribute.variations?.length > 0 && (
                            <span className="flex gap-2 items-center">
                              Starts from
                              <span className="text-blue-500 font-medium">
                                ₹{attribute.variations[0]?.discounted_variation_price}
                              </span>
                            </span>
                          )}
                        </p>
                        <p className="text-gray-600">{attribute.description}</p>
                        <button
                          className="text-blue-500 hover:text-blue-600 underline"
                          onClick={() => handleViewDetails(product, attribute.attribute_id)}
                        >
                          View Details
                        </button>
                      </div>
                      
                      <div className="relative">
                        <img 
                          src={product?.productimages?.[0]?.image_url} 
                          alt="" 
                          className="w-32 h-32 rounded-lg object-cover"
                        />
                        <button
                          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                                   bg-white text-emerald-600 px-6 py-2 rounded-lg glow-border 
                                   hover:bg-emerald-50 transition-all duration-200"
                          onClick={() => handleViewDetails(product, attribute.attribute_id)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>

          {/* Right Cart Section */}
          <div className="lg:w-1/4">
            <div className="sticky sticky-header-offset transition-all duration-300 ease-in-out">
              <CartSection cart={cart} />
            </div>
          </div>
        </div>
      </div>

      <LoginSignup 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        checkoutPd={checkoutPd} 
      />

      <ProductDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
        handleAddToCart={handleAddToCart}
        handleQtyUpdate={handleQtyUpdate}
        isAddingToCart={isAddingToCart}
        selectedAttributeId={selectedAttributeId}
      />
    </main>
  );
};

export default CleaningProductPage;