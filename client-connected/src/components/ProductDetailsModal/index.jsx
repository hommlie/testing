import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Clock,
} from "lucide-react";
import axios from "axios";
import config from "../../config/config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import LoginSignup from "../LoginModal";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const starValue = star;
        const fillPercentage = Math.max(
          0,
          Math.min(
            100,
            Math.round(Math.max(0, Math.min(1, rating - starValue + 1)) * 100)
          )
        );

        return (
          <div key={star} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current absolute top-0 left-0" />
            </div>
          </div>
        );
      })}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const InspectionModal = ({
  setIsInspectionModalOpen,
  setIsModalOpen,
  product,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    mobile: "",
    email: "",
    date: new Date(),
    time: "",
    width: "",
    length: "",
    sqft: "",
    total_amount: 0,
  });

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Calculate sqft if both width and length are present
      if (name === "width" || name === "length") {
        if (newData.width && newData.length) {
          newData.sqft = (
            parseFloat(newData.width) * parseFloat(newData.length)
          ).toFixed(2);
          // Calculate total amount based on sqft
          newData.total_amount = (parseFloat(newData.sqft) * 100).toFixed(2); // Example calculation
        }
      }

      return newData;
    });
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleInspectionSubmit = async (e) => {
    e.preventDefault();

    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        `${config.API_URL}/api/createInspection`,
        {
          ...formData,
          product_id: product.id,
          vendor_id: product.vendor_id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        successNotify("Inspection request submitted successfully!");
        setIsInspectionModalOpen(false);
        onClose();
      } else {
        errorNotify("Failed to submit inspection request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      errorNotify("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-modal-slide-up">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Book an Inspection</h3>
          <button
            onClick={() => setIsInspectionModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleInspectionSubmit} className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  minLength={10}
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleFormChange}
                  pattern="[0-9]{10}"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Width (ft)
                </label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleFormChange}
                  min="1"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Length (ft)
                </label>
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleFormChange}
                  min="1"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Sqft
                </label>
                <input
                  type="text"
                  value={formData.sqft ? `${formData.sqft} sqft` : ""}
                  className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Approx. Amount
              </label>
              <div className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md">
                ₹{formData.total_amount}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition-colors font-medium mt-6"
          >
            Schedule Inspection
          </button>
        </form>
      </div>
    </div>
  );
};

const ProductDetailModal = ({
  isOpen,
  onClose,
  product,
  selectedAttributeId = null,
}) => {
  const { cart, getCart } = useCont();
  const [selectedTab, setSelectedTab] = useState("details");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [displayedAttributes, setDisplayedAttributes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);

  const variationRefs = useRef({});
  const navigate = useNavigate();

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      calculateCartTotal();

      if (selectedAttributeId && product?.attributes) {
        const selectedAttribute = product.attributes.find(
          (attr) => attr.attribute_id === selectedAttributeId
        );

        setDisplayedAttributes(
          selectedAttribute ? [selectedAttribute] : product.attributes
        );
      } else {
        setDisplayedAttributes(product?.attributes || []);
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, cart, selectedAttributeId, product]);

  const scroll = (attributeId, direction) => {
    const container = variationRefs.current[attributeId];
    if (!container) return;

    const scrollAmount = 288; // width of each card (w-72) + gap (space-x-4)
    const newScrollPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  const calculateCartTotal = () => {
    const total = cart
      .filter((item) => item.product_id === product?.id)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
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

    const productImagesArray = product?.productimages?.filter((item) => {
      if (item.media == "Image") {
        return item;
      }
    });

    const taxAmount =
      product.tax_type === "amount"
        ? Number(product.tax)
        : (Number(product.tax) / 100) * variation.discounted_variation_price;

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
      tax: taxAmount,
      shipping_cost: product.shipping_cost || 0,
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
    if (product?.category?.is_form === 1) {
      return (
        <button
          className="absolute bottom-4 right-5 text-white bg-emerald-600 rounded-lg px-4 py-2 hover:bg-emerald-700 transition-colors shadow-lg flex items-center space-x-2"
          onClick={() => setIsInspectionModalOpen(true)}
        >
          {/* <Calendar className="w-4 h-4" /> */}
          <span>Book Inspection</span>
        </button>
      );
    }

    const totalCart = cart.filter((ct) => ct.product_id === product.id);
    const specificCart = totalCart?.filter(
      (ct) => ct?.variation == variation.id
    );

    if (isAddingToCart) {
      return (
        <div className="absolute bottom-0 right-12 w-28 h-9 flex items-center justify-center rounded-lg bg-white shadow-lg">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (specificCart.length !== 0) {
      return (
        <div className="absolute bottom-0 right-6 w-28 h-9 flex justify-around items-center text-2xl font-semibold rounded-lg bg-white shadow-lg">
          <button
            onClick={() =>
              handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty - 1)
            }
            className="text-emerald-600"
          >
            -
          </button>
          <span className="text-emerald-600">{specificCart[0]?.qty}</span>
          <button
            onClick={() =>
              handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty + 1)
            }
            className="text-emerald-600"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        className="absolute bottom-0 right-12 text-emerald-600 rounded-lg px-4 py-2 bg-white shadow-lg hover:bg-emerald-50"
        onClick={() => handleAddToCart(variation)}
      >
        Add
      </button>
    );
  };

  if (!isOpen) return null;

  const tabs = [
    // { id: 'variations', label: 'Variations' },
    { id: "details", label: "Details" },
    // { id: 'gallery', label: 'Gallery' },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <>
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
            {(product?.rating || product.total_reviews) && (
              <div className="flex items-center space-x-2">
                {product.rating && <StarRating rating={product.rating} />}
                {product.total_reviews && (
                  <span className="text-sm text-gray-500">
                    (
                    {product.total_reviews >= 1000
                      ? `${(product.total_reviews / 1000).toFixed(1)}K`
                      : product.total_reviews}{" "}
                    reviews)
                  </span>
                )}
              </div>
            )}
            <div className="w-full flex space-x-4 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full px-4 py-2 font-medium ${
                    selectedTab === tab.id
                      ? "text-emerald-600 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-700"
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
            {selectedTab === "details" && (
              <section className="space-y-5 my-0">
                {/* Carousel Section */}
                {displayedAttributes?.map((attribute) => (
                  <div key={attribute.attribute_id} className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {attribute.attribute_name}
                    </h3>
                    <div className="space-y-4">
                      {attribute?.variations?.map((variation) => (
                        <div
                          key={variation.id}
                          className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          {/* Content Section */}
                          <div className="flex-1 p-4">
                            <div className="space-y-3">
                              <h4 className="font-medium">
                                {variation.variation}
                              </h4>

                              {/* Rating and Reviews */}
                              {(variation.avg_rating ||
                                variation.total_reviews) && (
                                <div className="flex items-center space-x-2">
                                  {variation.avg_rating && (
                                    <StarRating rating={variation.avg_rating} />
                                  )}
                                  {variation.total_reviews && (
                                    <span className="text-sm text-gray-500">
                                      (
                                      {variation.total_reviews >= 1000
                                        ? `${(
                                            variation.total_reviews / 1000
                                          ).toFixed(1)}K`
                                        : variation.total_reviews}{" "}
                                      reviews)
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Price */}
                              <div className="space-x-2">
                                <span className="text-emerald-600 font-medium">
                                  ₹{variation.discounted_variation_price}
                                </span>
                                {variation.price !==
                                  variation.discounted_variation_price && (
                                  <span className="text-gray-500 line-through">
                                    ₹{variation.price}
                                  </span>
                                )}
                              </div>

                              {/* Description */}
                              {variation.description && (
                                <div className="space-y-2">
                                  <ul className="space-y-1">
                                    {variation.description
                                      .split("|")
                                      .map((desc) => desc.trim())
                                      .filter((desc) => desc)
                                      .map((desc, index) => (
                                        <li
                                          key={index}
                                          className="flex items-start space-x-2"
                                        >
                                          <span className="text-black">•</span>
                                          <span className="text-gray-600 text-sm">
                                            {desc}
                                          </span>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Image Section with Overlapped Add Button */}
                          <div className="relative w-40 h-40 flex items-center p-4">
                            {variation.image && (
                              <img
                                src={variation.image}
                                alt={variation.variation}
                                className="w-full h-full rounded-lg object-cover"
                              />
                            )}
                            <AddButton variation={variation} />
                          </div>
                        </div>
                      ))}
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
                  {product?.productimages?.map((image) => (
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
            {selectedTab === "reviews" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {product?.rattings?.length > 0 ? (
                    product.rattings.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-4 bg-white shadow-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < review.ratting
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
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
                  onClick={() =>
                    navigate(`${config.VITE_BASE_URL}/add-to-cart`)
                  }
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isInspectionModalOpen && (
        <InspectionModal
          setIsInspectionModalOpen={setIsInspectionModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={product}
          onClose={onClose}
        />
      )}
      <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ProductDetailModal;
