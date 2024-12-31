import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import config from '../../config/config';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useCont } from '../../context/MyContext';
import { useToast } from '../../context/ToastProvider';

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

    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      calculateCartTotal();      

      // Set displayed attributes based on selection
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
      errorNotify("Please login to continue");
      setIsAddingToCart(false);
      return;
    }

    const user = jwtDecode(jwtToken);
    const cartItem = {
      user_id: user.id,
      product_id: product.id,
      vendor_id: product.vendor_id,
      product_name: product.product_name,
      image: product?.productimages[0]?.image_url,
      qty: 1,
      price: variation.discounted_variation_price,
      attribute: variation.attribute_id,
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
    setIsAddingToCart(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    
    if (qty === 0) {
      await handleRemoveFromCart(cartId);
      return;
    }

    try {
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
    const specificCart = totalCart?.filter(ct => ct?.variation === variation.id);
    
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
        <div className="sticky top-0 bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{product?.product_name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
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

        <div className="p-6">
          
          {/* {selectedTab === 'variations' && (
            <div className="space-y-4">
              {product?.attributes?.map(attribute => (
                <div key={attribute.attribute_id} className="space-y-4">
                  <h3 className="text-lg font-semibold">{attribute.attribute_name}</h3>
                  {attribute.variations?.map(variation => (
                    <div
                      key={variation.id}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{variation.variation}</h4>
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
                  ))}
                </div>
              ))}
            </div>
          )} */}

          {selectedTab === 'details' && (
            <section className='space-y-5 my-0'>
              
              <div className="space-y-4">
                {displayedAttributes?.map(attribute => (
                  <div key={attribute.attribute_id} className="space-y-4">
                    <h3 className="text-lg font-semibold">{attribute.attribute_name}</h3>
                    {attribute.variations?.map(variation => (
                      <div
                        key={variation.id}
                        className="flex justify-between items-center p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{variation.variation}</h4>
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
                    ))}
                  </div>
                ))}
              </div>

              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />

              <div className="space-y-4">
                {product?.productimages?.map(image => (
                  <img
                    key={image.id}
                    src={image.image_url}
                    alt={product.product_name}
                    className="w-full h-64"
                  />
                ))}
              </div>

            </section>
          )}

          {/* {selectedTab === 'gallery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product?.productimages?.map(image => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt={product.product_name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          )} */}

          {selectedTab === 'reviews' && (
            <div className="space-y-4">
              {product?.rattings?.length > 0 ? (
                product.rattings.map(review => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.ratting ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
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
          )}
        </div>

        {/* Floating Cart Total Section */}
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
    </div>
  );
};

export default ProductDetailModal;