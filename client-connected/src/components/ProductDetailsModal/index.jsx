import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';
import config from '../../config/config';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useCont } from '../../context/MyContext';
import { useToast } from '../../context/ToastProvider';
import LoginSignup from '../LoginModal';

const ProductDetailModal = ({ 
  isOpen, 
  onClose, 
  product,
  selectedAttributeId = null 
}) => {
    const { cart, getCart } = useCont();
    const [selectedTab, setSelectedTab] = useState('details');
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [displayedAttributes, setDisplayedAttributes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const variationRefs = useRef({});

    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');

    useEffect(() => {
      if (isOpen) {
          document.body.style.overflow = 'hidden';
          calculateCartTotal();      

          if (selectedAttributeId && product?.attributes) {
              const selectedAttribute = product.attributes.find(
                  attr => attr.attribute_id === selectedAttributeId
              );
              setDisplayedAttributes(selectedAttribute ? [selectedAttribute] : product.attributes);
          } else {
              setDisplayedAttributes(product?.attributes || []);
          }
      } else {
          document.body.style.overflow = 'unset';
      }
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, [isOpen, cart, selectedAttributeId, product]);

  const scroll = (attributeId, direction) => {
    const container = variationRefs.current[attributeId];
    if (!container) return;

    const scrollAmount = 288; // width of each card (w-72) + gap (space-x-4)
    const newScrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
    });
  };

  const calculateCartTotal = () => {
    const total = cart
      .filter(item => item.product_id === product?.id)
      .reduce((sum, item) => sum + (item.price * item.qty), 0);
    setCartTotal(total);
  };

  const handleAddToCart = async (variation) => {
    setIsAddingToCart(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    
    if (!jwtToken) {
      setIsModalOpen(true);
      setIsAddingToCart(false);
      return;
    }

    const user = jwtDecode(jwtToken);

    const productImagesArray = product?.productimages?.filter(item => {
      if (item.media == "Image") {
        return item;
      }
    });
    
    const cartItem = {
      user_id: user.id,
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: productImagesArray[0]?.image_url,
      qty: 1,
      price: variation.discounted_variation_price,
      attribute: displayedAttributes[0].attribute_id,
      variation: variation.id,
      tax: product.tax || 0,
      shipping_cost: product.shipping_cost || 0
    };

    try {
      const response = await axios.post(
        `${config.API_URL}/api/addtocart`,
        cartItem,
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      
      if (response.data.status === 1) {
        successNotify("Successfully added to Cart");
        await getCart();
        calculateCartTotal();
      }
    } catch (error) {
      errorNotify(error.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQtyUpdate = async (cartId, qty) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    
    if (qty === 0) {
      await handleRemoveFromCart(cartId);
      return;
    }

    try {
      setIsAddingToCart(true);
      const response = await axios.post(
        `${config.API_URL}/api/qtyUpdate`,
        { qty, cart_id: cartId },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      
      if (response.data.status === 1) {
        await getCart();
        calculateCartTotal();
      }
    } catch (error) {
      errorNotify(error.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    const user = jwtDecode(jwtToken);

    try {
      const response = await axios.post(
        `${config.API_URL}/api/deleteProduct`,
        { user_id: user.id, cart_id: cartId },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      
      if (response.data.status === 1) {
        await getCart();
        calculateCartTotal();
      }
    } catch (error) {
      errorNotify(error.message);
    }
  };

  const AddButton = ({ variation }) => {    
    
    const totalCart = cart.filter(ct => ct.product_id === product.id);
    const specificCart = totalCart?.filter(ct => ct?.variation == variation.id);
        
    if (isAddingToCart) {
      return (
        <div className="w-28 h-9 flex items-center justify-center rounded-lg border border-emerald-600">
          <span className="loader"></span>
        </div>
      );
    }
    
    if (specificCart.length !== 0) {
      return (
        <div className="w-28 h-9 flex justify-around items-center text-2xl font-semibold rounded-lg border border-emerald-600">
          <button 
            onClick={() => handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty - 1)}
            className="text-emerald-600"
          >
            -
          </button>
          <span className="text-emerald-600">{specificCart[0]?.qty}</span>
          <button 
            onClick={() => handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty + 1)}
            className="text-emerald-600"
          >
            +
          </button>
        </div>
      );
    }
    
    return (
      <button
        className="text-emerald-600 rounded-lg px-4 py-2 border border-emerald-600 hover:bg-emerald-50"
        onClick={() => handleAddToCart(variation)}
      >
        Add
      </button>
    );
  };

  if (!isOpen) return null;

  const tabs = [
    // { id: 'variations', label: 'Variations' },
    { id: 'details', label: 'Details' },
    // { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            {/* Header Section */}
            <div className="sticky top-0 bg-white p-4 border-b z-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{product?.product_name}</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-lg font-semibold">4.77</span>
                    <span className="ml-1 text-gray-500">(176K reviews)</span>
                </div>
                <div className="w-full flex space-x-4 mt-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`w-full px-4 py-2 font-medium ${
                                selectedTab === tab.id
                                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setSelectedTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                {selectedTab === 'details' && (
                    <section className="space-y-5 my-0">
                        {/* Carousel Section */}
                        {displayedAttributes?.map(attribute => (
                            <div key={attribute.attribute_id} className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                    {attribute.attribute_name}
                                </h3>
                                <div className="relative">
                                    <button 
                                        onClick={() => scroll(attribute.attribute_id, 'left')}
                                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50"
                                        aria-label="Scroll left"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button 
                                        onClick={() => scroll(attribute.attribute_id, 'right')}
                                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50"
                                        aria-label="Scroll right"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                    <div 
                                        ref={el => variationRefs.current[attribute.attribute_id] = el}
                                        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x"
                                        style={{ scrollBehavior: 'smooth' }}
                                    >
                                        {attribute?.variations?.map(variation => (
                                            <div 
                                                key={variation.id}
                                                className="flex-none w-72 snap-start"
                                            >
                                                <div className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {variation.variation}
                                                        </h4>
                                                        <div className="mt-1 space-x-2">
                                                            <span className="text-emerald-600 font-medium">
                                                                ₹{variation.discounted_variation_price}
                                                            </span>
                                                            {variation.price !== variation.discounted_variation_price && (
                                                                <span className="text-gray-500 line-through">
                                                                    ₹{variation.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <AddButton variation={variation} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Description Section */}
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: product?.description }}
                        />

                        {/* Image Gallery */}
                        <div className="space-y-4">
                            {product?.productimages?.map(image => (
                                <img
                                    key={image.id}
                                    src={image.image_url}
                                    alt={product.product_name}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                {selectedTab === 'reviews' && (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <Star className="w-8 h-8 text-yellow-400 fill-current" />
                                <span className="ml-2 text-3xl font-bold">4.77</span>
                            </div>
                            <div className="text-gray-500">
                                <p>176K reviews</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {product?.rattings?.length > 0 ? (
                                product.rattings.map(review => (
                                    <div key={review.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${
                                                            i < review.ratting 
                                                                ? 'text-yellow-400 fill-current' 
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-600">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-gray-700">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No reviews yet</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Cart Total Section */}
            {cartTotal > 0 && (
                <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Cart Total</p>
                            <p className="text-emerald-600">₹{cartTotal.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={() => navigate(`${config.VITE_BASE_URL}add-to-cart`)}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                        >
                            Checkout Now
                        </button>
                    </div>
                </div>
            )}
        </div>

        <LoginSignup 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
    </div>
);
};

export default ProductDetailModal;