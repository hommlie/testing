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
    <div className="sticky top-4 space-y-4">
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
            onClick={() => window.location.href = '/cart'}
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

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  if (!innerSubCategoryData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loading />
      </div>
    );
  }

  const AddButton = ({ product }) => {
    return (
      <button
        className="text-[#249370] rounded-lg px-4 py-1 bg-white glow-border"
        onClick={() => handleViewDetails(product)}
      >
        Add
      </button>
    );
  };

  return (
    <main className="main-div flex flex-col md:p-4 mb-2 scroll-smooth bg-white mx-2 lg:mx-20">
      <nav className="flex space-x-1 lg:space-x-2 text-gray-500 text-xs lg:text-base mt-4 md:mt-0">
        <a href="/" className="text-blue-500">
          Home
        </a>
        <span>/</span>
        <span>Sub Category</span>
        <span>/</span>
        <span>{innerSubCategoryData.subcategory_name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-4 mt-4 overflow-hidden">
        
        {/* Left Sidebar - Sticky */}
        <div className="lg:w-1/4 lg:sticky lg:top-0 lg:self-start z-10">
          <section className="bg-white rounded-lg p-4 space-y-4 glow-border">
            <h2 className="text-base lg:text-2xl font-semibold">
              {innerSubCategoryData?.innersubcategory_name}
            </h2>
            <p className="text-sm">Select a service</p>
            <div className="grid grid-cols-3 gap-4">
              {innerSubCategoryData?.products?.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex flex-col items-center p-2 rounded-md cursor-pointer ${
                    index === currentProductIndex ? "glow-border px-0" : "hover:bg-gray-100 border-gray-100"
                  }`}
                  onClick={() => handleProductClick(index)}
                >
                  {product.productimages && product.productimages?.length > 0 ? (
                    <img
                      src={product.productimages[0]?.image_url}
                      alt={product.product_name}
                      className="w-20 h-20 rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                  )}
                  <div>
                    <h3 className="text-sm line-clamp-2 text-center font-medium">{product.product_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Center Section - Scrollable */}
        <div className="lg:w-3/4">
          <section className="bg-white rounded-lg py-0 px-4 space-y-4">
            <img
              src={innerSubCategoryData?.subcategory_banner}
              alt={innerSubCategoryData?.innersubcategory_name}
              className="w-full h-[200px] md:h-[500px] rounded-md"
            />
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="md:overflow-y-auto custom-scrollbar scrollbar-hide w-full md:w-2/3 flex flex-col gap-4">
                {innerSubCategoryData?.products.map((product, index) => (
                  <section
                    key={product.id}
                    className="bg-white rounded-lg p-4 space-y-4 glow-border"
                    ref={(el) => (productRefs.current[index] = el)}
                  >
                    <h3 className="text-base lg:text-2xl font-semibold">
                      {product.product_name}
                    </h3>
                    {product?.attributes?.map((attribute, index) => (
                      <div
                        key={index}
                        className={`flex justify-between p-4 rounded-md cursor-pointer ${
                          attribute.id === currentVariationIndex
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="">
                          <h3 className="text-base font-medium">
                            {attribute.attribute_name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {attribute.variations?.length > 0 && attribute.variations[0]?.discounted_variation_price ? (
                              <>
                                <span className="flex gap-2 font-medium">
                                  Starts from 
                                  <span className="text-blue-500">
                                    ₹{attribute.variations[0]?.discounted_variation_price}
                                  </span>
                                </span>
                              </>
                            ) : (
                              <span className="font-medium text-blue-500">
                                ₹{attribute.variations[0]?.discounted_variation_price}
                              </span>
                            )}
                          </p>
                          <div className="space-y-4">
                            <p className="text-gray-500">
                              {attribute.description}
                            </p>
                            <button
                              className="underline text-blue-500 hover:underline"
                              onClick={() => handleViewDetails(product)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                        <div className="relative flex justify-center items-center">
                          <img 
                            src={product?.productimages && product?.productimages[0]?.image_url} 
                            alt="" 
                            className="w-32 h-32 rounded-lg"
                          />
                          <div
                            className="absolute inset-x-0 -bottom-3 flex justify-center items-center"
                          >
                            <AddButton />
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>
                ))}
              </div>
              <div className="sticky w-full md:w-1/3 z-10">
                <CartSection cart={cart} />
              </div>
            </div>
          </section>
        </div>  

        {/* Optional: Custom Scrollbar CSS */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
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
      />

    </main>
  );
};

export default CleaningProductPage;