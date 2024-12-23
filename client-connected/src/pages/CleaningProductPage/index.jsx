import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";
import Banner from '../../assets/images/innersubcat-banner.webp';
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";

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

    const productRefs = useRef([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        fetchSubCategoryData();
    }, [id]);

    const fetchSubCategoryData = async () => {
        try {
        // const response = await axios.post(`${config.API_URL}/api/innersubcategory`, { inner_subcat_id: id });
        const statData = {
            "innersubcat_id": 71,
            "innersubcategory_name": "Sofa Cleaning",
            "slug": "sofa-cleaning-sofa-cleaning",
            "banner": "https://www.hommlie.com/panel/public/storage/app/public/images/banner/img1.png",
            "products": [
                {
                    "id": 830,
                    "product_name": "Basic Sofa Cleaning",
                    "product_price": 349,
                    "discounted_price": "249",
                    "is_variation": 1,
                    "sku": "NA",
                    "slug": "basic-sofa-cleaning",
                    "product_image": 'https://www.hommlie.com/panel/public/storage/app/public/images/products/product-672cfbf1bd8f5.png',
                    "variations": [
                        {
                            "id": 3584,
                            "product_id": 830,
                            "attribute_id": 28,
                            "price": "349",
                            "discounted_variation_price": "249",
                            "variation": "2 Seater Sofa",
                            "variation_interval": "1",
                            "variation_times": 1,
                            "description": 'Hand Scrubbing of floor & tiles and cleaning hard to reach areas',
                            "qty": "100",
                            "created_at": "2024-11-07T13:57:59.000Z",
                            "updated_at": "2024-11-07T13:57:59.000Z"
                        },
                        {
                            "id": 3585,
                            "product_id": 830,
                            "attribute_id": 28,
                            "price": "349",
                            "discounted_variation_price": "249",
                            "variation": "3 Seater Sofa",
                            "variation_interval": "1",
                            "variation_times": 1,
                            "description": 'Drying up the bathroom with multi-fiber cloth & spraying scented freshner',
                            "qty": "100",
                            "created_at": "2024-11-07T13:57:59.000Z",
                            "updated_at": "2024-11-07T13:57:59.000Z"
                        }
                    ],
                    "ratings": []
                },
                {
                    "id": 828,
                    "product_name": "Leather Sofa Cleaning",
                    "product_price": 1999,
                    "discounted_price": "1499.00",
                    "is_variation": 0,
                    "sku": null,
                    "slug": "leather-sofa-cleaning",
                    "product_image": 'https://www.hommlie.com/panel/public/storage/app/public/images/products/product-67482cc361242.png',
                    "variations": [
                        {
                            "id": 3586,
                            "product_id": 830,
                            "attribute_id": 28,
                            "price": "349",
                            "discounted_variation_price": "249",
                            "variation": "1 Seater",
                            "variation_interval": "1",
                            "variation_times": 1,
                            "description": 'Object removal. Removing bathroom toiletries and objects before cleaning, then replacing them afterwards',
                            "qty": "100",
                            "created_at": "2024-11-07T13:57:59.000Z",
                            "updated_at": "2024-11-07T13:57:59.000Z"
                        },
                        {
                            "id": 3587,
                            "product_id": 830,
                            "attribute_id": 28,
                            "price": "349",
                            "discounted_variation_price": "249",
                            "variation": "2 Seater",
                            "variation_interval": "1",
                            "variation_times": 1,
                            "description": 'Removal of dirt, black and yellow brown spots from all corners & fittings',
                            "qty": "100",
                            "created_at": "2024-11-07T13:57:59.000Z",
                            "updated_at": "2024-11-07T13:57:59.000Z"
                        },
                        {
                            "id": 3588,
                            "product_id": 830,
                            "attribute_id": 28,
                            "price": "349",
                            "discounted_variation_price": "249",
                            "variation": "3 Seater",
                            "variation_interval": "1",
                            "variation_times": 1,
                            "description": null,
                            "qty": "100",
                            "created_at": "2024-11-07T13:57:59.000Z",
                            "updated_at": "2024-11-07T13:57:59.000Z"
                        }
                    ],
                    "ratings": []
                }
            ]
        };
        // setInnerSubCategoryData(response.data.data);
        setInnerSubCategoryData(statData);
        setIsLoading(false);
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

    const handleVariationClick = (variation) => {
        setShowVariationDetails(true);
        setCurrentVariationIndex(variation.id);
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

  const handleViewDetails = () => {
    // Implement view details functionality
  };

  if (!innerSubCategoryData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loading />
      </div>
    );
  }

  const AddButton = () => {
      const totalCart = cart.filter(ct => ct.product_id === prodData.id);                
      const specificCart = totalCart?.filter(ct => ct?.variation == selectedVariation?.id);
      
      if (isAddingToCart) {
          return (
              <div className="w-[109px] h-[35px] flex items-center justify-center rounded-lg" style={{border: "1px solid #249370"}}>
                  <span className="loader"></span>
              </div>
          );
      }
      
      if (specificCart.length !== 0) {
          return (
              <div className="w-[109px] h-[35px] flex flex-row justify-around items-center text-2xl font-semibold rounded-lg" style={{border: "1px solid #249370"}}>
                  <button onClick={() => handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty - 1)} style={{color: "#249370"}}>-</button>
                  <span style={{color: "#249370"}}>{specificCart[0]?.qty}</span>
                  <button onClick={() => handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty + 1)} style={{color: "#249370"}}>+</button>
              </div>
          );
      } else if(totalCart.length !== 0) {
          return (
              <div className="w-[109px] h-[35px] flex flex-row justify-around items-center text-2xl font-semibold rounded-lg" style={{border: "1px solid #249370"}}>
                  <button onClick={() => handleQtyUpdate(totalCart[0]?.id, totalCart[0]?.qty - 1)} style={{color: "#249370"}}>-</button>
                  <span style={{color: "#249370"}}>{totalCart[0]?.qty}</span>
                  <button onClick={() => handleQtyUpdate(totalCart[0]?.id, totalCart[0]?.qty + 1)} style={{color: "#249370"}}>+</button>
              </div>
          );
      } else {
          return (
              <button
                  className="text-[#249370] rounded-lg px-4 py-1 bg-white glow-border" 
                  onClick={handleAddToCart}
              >
                  Add
              </button>
          );
      }
  };

  return (
    <main className="main-div flex flex-col md:p-4 lg:space-x-4 mb-2 scroll-smooth bg-white mx-20">
      <nav className="flex space-x-1 lg:space-x-2 text-gray-500 text-xs lg:text-base mt-4 md:mt-0">
        <a href="/" className="text-blue-500">
          Home
        </a>
        <span>/</span>
        <span>Product</span>
        {tag ? (
          <>
            <span>/</span>
            <span>{tag}</span>
          </>
        ) : (
          <>
            <span>/</span>
            <span>{innerSubCategoryData.innersubcategory_name}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col-reverse lg:flex-row gap-4 mt-4 h-screen overflow-hidden">
        {/* Left Sidebar - Sticky */}
        <div className="lg:w-1/4 lg:sticky lg:top-0 lg:self-start lg:max-h-screen z-10">
          <section className="bg-white rounded-lg p-4 space-y-4 glow-border">
            <h2 className="text-base lg:text-2xl font-semibold">
              {innerSubCategoryData?.innersubcategory_name}
            </h2>
            <p className="text-sm">Select a service</p>
            <div className="grid grid-cols-3 gap-4">
              {innerSubCategoryData.products.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex flex-col items-center p-2 rounded-md cursor-pointer ${
                    index === currentProductIndex ? "glow-border" : "hover:bg-gray-100 border-gray-100"
                  }`}
                  onClick={() => handleProductClick(index)}
                >
                  {product.product_image ? (
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                  )}
                  <div>
                    <h3 className="text-sm text-center font-medium">{product.product_name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Center Section - Scrollable */}
        <div className="lg:w-3/4 overflow-y-auto h-screen custom-scrollbar scrollbar-hide">
          <section className="bg-white rounded-lg p-4 space-y-4">
            <img
              src={Banner}
              alt={innerSubCategoryData.innersubcategory_name}
              className="w-full h-[500px] object-cover rounded-md"
            />
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {innerSubCategoryData?.products.map((product, index) => (
                  <section
                    key={product.id}
                    className="bg-white rounded-lg p-4 space-y-4 glow-border"
                    ref={(el) => (productRefs.current[index] = el)}
                  >
                    <h3 className="text-base lg:text-2xl font-semibold">
                      {product.product_name}
                    </h3>
                    {product?.variations?.map((variation) => (
                      <div
                        key={variation.id}
                        className={`flex justify-between p-4 rounded-md cursor-pointer ${
                          variation.id === currentVariationIndex
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="">
                          <h3 className="text-base font-medium">
                            {variation.variation}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {variation.discounted_variation_price ? (
                              <>
                                <span className="font-medium text-blue-500">
                                  ₹{variation.discounted_variation_price}
                                </span>
                                <span className="line-through text-gray-400 ml-2">
                                  ₹{variation.price}
                                </span>
                              </>
                            ) : (
                              <span className="font-medium text-blue-500">
                                ₹{variation.price}
                              </span>
                            )}
                          </p>
                          <div className="space-y-4">
                            <p className="text-gray-500">
                              {variation.description}
                            </p>
                            <button
                              className="underline text-blue-500 hover:underline"
                              onClick={handleViewDetails}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                        <div className="relative flex justify-center items-center">
                          <img 
                            src={product?.product_image} 
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
              <div className="lg:w-1/4 lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto z-10">
                <section className="bg-white rounded-lg p-4 space-y-4 glow-border">
                  <h2 className="text-base lg:text-2xl font-semibold">Cart</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Intense cleaning</span>
                      <span className="font-medium text-blue-500">₹960</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Congratulations! ₹78 saved so far!</span>
                      <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
                        View Cart
                      </button>
                    </div>
                  </div>
                </section>
                <section className="bg-white rounded-lg p-4 space-y-4 glow-border mt-4">
                  <h2 className="text-base lg:text-2xl font-semibold">Hommlie Features</h2>
                  <ul className="space-y-2">
                    <li>Verified Professionals</li>
                    <li>Safe Chemicals</li>
                    <li>Service in 4hr</li>
                    <li>Superior Stain Removal</li>
                  </ul>
                </section>
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

      <LoginSignup isOpen={isModalOpen} onClose={closeModal} checkoutPd={checkoutPd} />

    </main>
  );
};

export default CleaningProductPage;