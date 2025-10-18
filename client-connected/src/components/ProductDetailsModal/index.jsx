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
      {[1].map((star) => {
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
           <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6C43F3]">
              <Star className="w-3 h-3 text-white" fill="currentColor" />
            </span>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
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
  mode = "view", // mode: 'view' (default) shows details+reviews; 'add' shows only variations/BHK cards
}) => {
  const { cart, getCart } = useCont();

  const [addingVariationId, setAddingVariationId] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [displayedAttributes, setDisplayedAttributes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [pendingVariation, setPendingVariation] = useState(null);

  const variationRefs = useRef({});
  const navigate = useNavigate();

  // Local mode allows switching inside the modal from 'view' -> 'add'
  const [localMode, setLocalMode] = useState(mode);

  // Keep localMode in sync when parent changes the mode prop
  useEffect(() => {
    setLocalMode(mode);
  }, [mode]);

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
  setAddingVariationId(variation.id);
  const jwtToken = Cookies.get("HommlieUserjwtToken");

  if (!jwtToken) {
    // Store the variation the user attempted to add and open login modal.
    setPendingVariation(variation);
    setIsModalOpen(true);
    setAddingVariationId(null);
    return;
  }

  const user = jwtDecode(jwtToken);

  const productImagesArray = product?.productimages?.filter((item) => item.media === "Image");

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
      // after successful add, navigate to add-to-cart page (BHKs)
      navigate(`${config.VITE_BASE_URL}/add-to-cart`);
    }
  } catch (error) {
    errorNotify(error.message);
  } finally {
    setAddingVariationId(null);
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

  // Called after a successful login when user had attempted to add a variation
  const handlePostLoginAdd = async () => {
    if (!pendingVariation) return;
    // close the modal first
    setIsModalOpen(false);
    // small delay to ensure auth state is ready
    await new Promise((res) => setTimeout(res, 200));
    // attempt to add the stored variation
    try {
      await handleAddToCart(pendingVariation);
    } catch (e) {
      // errors are already notified inside handleAddToCart
      console.error(e);
    } finally {
      setPendingVariation(null);
    }
  };

  // Helper: wrap iframes/videos in a responsive container to avoid overflow on mobile
  const prepareServiceDetailsHtml = (html) => {
    if (!html) return "";
    try {
      // Wrap iframes and video tags with a div.responsive-embed
      let transformed = html
        .replace(/<iframe/gi, '<div class="responsive-embed"><iframe')
        .replace(/<\/iframe>/gi, '</iframe></div>')
        .replace(/<video/gi, '<div class="responsive-embed"><video')
        .replace(/<\/video>/gi, '</video></div>');

      // Also ensure images don't have fixed widths that overflow
      transformed = transformed.replace(/width=\"?\d+\"?/gi, '');

      return transformed;
    } catch (e) {
      console.error('Error preparing service details html', e);
      return html;
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
        className="text-white bg-emerald-600 rounded-lg px-4 py-2 hover:bg-emerald-700 transition-colors shadow-lg"
        onClick={() => setIsInspectionModalOpen(true)}
      >
        Book Inspection
      </button>
    );
  }

  const totalCart = cart.filter((ct) => ct.product_id === product.id);
  const specificCart = totalCart?.filter((ct) => ct?.variation == variation.id);

  const isLoading = addingVariationId === variation.id;

  return (
    <div className="mt-3 w-max">
      {isLoading ? (
        <div className="w-28 h-9 flex items-center justify-center rounded-lg bg-white shadow-lg">
          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : specificCart.length !== 0 ? (
        <div className="flex items-center gap-3 bg-white shadow rounded-lg px-3 py-1">
          <button
            onClick={() =>
              handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty - 1)
            }
            className="text-emerald-600 text-lg font-bold"
          >
            −
          </button>
          <span className="text-emerald-600 font-medium text-base">
            {specificCart[0]?.qty}
          </span>
          <button
            onClick={() =>
              handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty + 1)
            }
            className="text-emerald-600 text-lg font-bold"
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="text-emerald-600 rounded-lg px-4 py-2 bg-white shadow hover:bg-emerald-50"
          onClick={() => handleAddToCart(variation)}
        >
          Add
        </button>
      )}
    </div>
  );
};

  if (!isOpen) return null;

  const tabs =
    localMode === "add"
      ? [
          // In 'add' mode we only need the variations/options (kept under 'details')
          { id: "details", label: "Options" },
        ]
      : [
          { id: "details", label: "Details" },
          { id: "reviews", label: "Reviews" },
        ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 relative">
          {/* Scoped styles for modal content: keep videos/iframes responsive on small screens */}
          <style>{`
            /* Ensure embedded media fits inside the modal on small screens */
            .service-details-html { width: 100%; }
            .service-details-html iframe,
            .service-details-html video,
            .service-details-html img { max-width: 100% !important; height: auto !important; }

            /* For iframes (youtube etc) maintain aspect ratio and avoid overflow */
            .service-details-html .responsive-embed { position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; }
            .service-details-html .responsive-embed iframe,
            .service-details-html .responsive-embed video { position: absolute; top: 0; left: 0; width: 100% !important; height: 100% !important; }

            /* Reduce vertical spacing slightly on small screens */
            @media (max-width: 640px) {
              .space-y-5 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(1rem * 0.6); margin-bottom: 0; }
              .prose { font-size: 0.95rem; }
            }
          `}</style>
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
              {displayedAttributes?.length === 1 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mt-3">
                    {displayedAttributes[0].attribute_name}
                  </h3>

                  {displayedAttributes[0]?.variations?.[0]?.description && (
                    <div className="mt-2">
                      <ul className="space-y-1">
                        {displayedAttributes[0].variations[0].description
                          .split("|")
                          .map((desc) => desc.trim())
                          .filter((desc) => desc)
                          .map((desc, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2 text-sm text-gray-600"
                            >
                              <span className="text-black">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            
          </div>

          {/* Main Content */}
          
          <div className="p-6">
            {/* ADD MODE: show ONLY the options (variations/BHK cards) */}
            {localMode === "add" && (
              <section className="space-y-5 my-0">
                {displayedAttributes?.map((attribute) => (
                  <div key={attribute.attribute_id} className="space-y-4">
                    <div
                      className="relative overflow-x-auto hide-scrollbar"
                      ref={(el) => (variationRefs.current[attribute.attribute_id] = el)}
                    >
                      <div className="flex gap-3 min-w-max py-0 px-1">
                        {attribute?.variations?.map((variation) => (
                          <div
                            key={variation.id}
                            className="w-[180px] flex-shrink-0 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="p-3 space-y-2">
                              <h4 className="font-medium text-sm">{variation.variation}</h4>

                              {(variation.avg_rating || variation.total_reviews) && (
                                <div className="flex items-center space-x-1">
                                  {variation.avg_rating && <StarRating rating={variation.avg_rating} />}
                                  {variation.total_reviews && (
                                    <span className="text-xs text-gray-500">
                                      ({variation.total_reviews >= 1000
                                        ? `${(variation.total_reviews / 1000).toFixed(1)}K`
                                        : variation.total_reviews})
                                    </span>
                                  )}
                                </div>
                              )}

                              <div className="space-x-1 text-sm">
                                <span className="text-emerald-600 font-semibold">
                                  ₹{variation.discounted_variation_price}
                                </span>
                                {variation.price !== variation.discounted_variation_price && (
                                  <span className="text-gray-500 line-through text-xs">₹{variation.price}</span>
                                )}
                              </div>

                              <AddButton variation={variation} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* VIEW MODE: show Details FIRST, then Reviews BELOW (no tabs) */}
            {localMode !== "add" && (
              <>
                {/*
                  Wrap the service details in a responsive container. We add a small
                  mobile-specific override: reduce vertical spacing (space-y-5 -> space-y-3 on sm)
                  and ensure any embedded <iframe>, <video>, or <img> inside the HTML
                  scales to the container using max-width and aspect-ratio handling.
                */}
                <section className="space-y-5 sm:space-y-4">
                  {/* Description / Details */}
                  <div className="prose max-w-none">
                    <div className="service-details-html">
                      <div
                        className="service-details-content"
                        dangerouslySetInnerHTML={{ __html: prepareServiceDetailsHtml(product?.service_details) }}
                      />
                    </div>
                  </div>
                </section>

                {/* Reviews moved here, directly below details */}
                <section className="space-y-6 mt-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>

                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Overall Rating (use your dynamic product rating if available) */}
                      <div className="flex flex-col items-center md:items-start space-y-2 min-w-[120px]">
                        <span className="text-5xl font-bold text-gray-900">
                          {product?.rating ? Number(product.rating).toFixed(1) : "4.9"}
                        </span>
                        <div className="flex items-center">
                          {[1].map((star) => {
                            const score = product?.rating ? Number(product.rating) : 4.9;
                            const isFilled = star <= Math.floor(score);
                            const isPartial = star === Math.ceil(score) && !isFilled;
                            const partialFill = isPartial ? Math.round((score % 1) * 100) : 0;

                            return (
                              <div key={star} className="relative">
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6C43F3]">
                                    <Star className="w-3 h-3 text-white" fill="currentColor" />
                                  </span>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-sm text-gray-500">
                          {product?.total_reviews ? product.total_reviews : 128} reviews
                        </p>
                      </div>

                      {/* Rating breakdown (keep your static version or wire to backend later) */}
                      <div className="flex-1 space-y-3">
                        {[
                          { star: 5, percent: 90, count: 115 },
                          { star: 4, percent: 7, count: 9 },
                          { star: 3, percent: 2, count: 3 },
                          { star: 2, percent: 1, count: 1 },
                          { star: 1, percent: 0, count: 0 },
                        ].map(({ star, percent, count }) => (
                          <div key={star} className="flex items-center gap-3">
                            <div className="flex items-center w-10">
                              <span className="text-sm font-medium text-gray-700">★{star}</span>
                            </div>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                            <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* If you later list individual reviews, render them here */}
                  {/* <div className="space-y-4"> ... </div> */}
                </section>
              </>
            )}
          </div>

          {/* Cart Total Section removed per requirement: modal should not show checkout CTA */}
          {/* Sticky bottom section inside the white card to attach Add to cart */}
          {localMode === "view" && displayedAttributes?.length === 1 && (
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
              <div className="max-w-7xl mx-auto flex justify-end">
                <button
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 shadow-lg"
                  onClick={() => {
                    // switch modal to add mode to reveal BHK cards inside the same card
                    setLocalMode("add");
                    const attrId = displayedAttributes[0].attribute_id;
                    const container = variationRefs.current[attrId];
                    if (container) {
                      setTimeout(() => {
                        container.scrollTo({ left: 0, behavior: "smooth" });
                      }, 120);
                    }
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom-right Add to cart button shown only when modal opened in 'view' and a single attribute is displayed */}
      {isInspectionModalOpen && (
        <InspectionModal
          setIsInspectionModalOpen={setIsInspectionModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={product}
          onClose={onClose}
        />
      )}
      <LoginSignup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handlePostLoginAdd}
      />
    </>
  );
};

export default ProductDetailModal;