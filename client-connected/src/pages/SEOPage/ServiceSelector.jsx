import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaCartPlus, FaPhone } from "react-icons/fa";
import axios from "axios";
import config from "../../config/config";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../../components/LoginModal";
import { useToast } from "../../context/ToastProvider";

const ServiceSelector = ({ services, onCallClick }) => {
  const { user, getCart, cart } = useCont();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setState] = useState({
    address: "",
    fullName: "",
    email: "",
    mobile: "",
    date: new Date(),
    time: "",
    width: null,
    length: null,
    sqft: null,
    total_amount: 0,
  });

  const timeSlots = [
    "9 to 11 AM",
    "11 to 1 PM",
    "1 to 3 PM",
    "3 to 5 PM",
    "5 to 7 PM",
  ];

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  useEffect(() => {
    if (selectedService) {
      const serviceVariations = selectedService.variations || [];
      const uniqueAttributes = [
        ...new Set(serviceVariations.map((v) => v.attribute?.attribute)),
      ];
      setAttributes(uniqueAttributes.filter(Boolean));
      setVariations(serviceVariations);

      // Reset selections when service changes
      setSelectedAttribute(null);
      setSelectedVariation(null);
    }
  }, [selectedService]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleAttributeSelect = (attr) => {
    setSelectedAttribute(attr);
    setSelectedVariation(null);
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
  };

  const calculateDiscount = (original, discounted) => {
    if (!original || !discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    if (
      !selectedService ||
      (selectedService.is_variation && !selectedVariation)
    ) {
      return;
    }

    setIsLoading(true);

    if (user.length === 0) {
      openModal();
    } else {
      try {
        const cartItem = {
          product_id: selectedService.id,
          vendor_id: selectedService.vendor_id,
          product_name: selectedService.product_name,
          qty: 1,
          price: selectedVariation
            ? selectedVariation.discounted_variation_price
            : selectedService.discounted_price,
          attribute: selectedVariation?.attribute_id,
          variation: selectedVariation?.id,
          tax:
            selectedService.tax_type === "amount"
              ? Number(selectedService.tax)
              : (Number(selectedService.tax) / 100) *
                (selectedVariation
                  ? selectedVariation.discounted_variation_price
                  : selectedService.discounted_price),
        };

        try {
          const response = await axios.post(
            `${config.API_URL}/api/addtocart`,
            cartItem,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.status === 1) {
            console.log(response.data);
            successNotify("Successfully added to Cart");
            getCart();
          }
        } catch (error) {
          errorNotify(error);
          console.log("error adding to cart:", error);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.API_URL}/api/createInspection`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        successNotify("Inspection request submitted successfully!");
        window.location.reload();
      } else {
        errorNotify("Failed to submit inspection request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      errorNotify("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="sticky top-44 bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Book Our Service</h3>

      {/* Service Selection */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">
          Select Service
        </label>
        <div className="grid gap-3">
          {services?.map((service) => (
            <motion.button
              key={service.id}
              className={`p-4 rounded-lg border transition-all ${
                selectedService?.id === service.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 hover:border-emerald-200"
              }`}
              onClick={() => handleServiceSelect(service)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-left">
                    {service.product_name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-emerald-600">
                      ₹{service.discounted_price}
                    </span>
                    {service.product_price > service.discounted_price && (
                      <>
                        <span className="text-sm line-through text-gray-400">
                          ₹{service.product_price}
                        </span>
                        <span className="text-sm text-emerald-600">
                          (
                          {calculateDiscount(
                            service.product_price,
                            service.discounted_price
                          )}
                          % off)
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <IoCheckmarkCircleSharp
                  className={`text-2xl ${
                    selectedService?.id === service.id
                      ? "text-emerald-500"
                      : "text-gray-300"
                  }`}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Attribute Selection */}
      <AnimatePresence>
        {selectedService?.is_variation && attributes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <label className="text-sm font-medium text-gray-700">
              Select Frequency
            </label>
            <div className="grid grid-cols-2 gap-3">
              {attributes?.map((attr) => (
                <motion.button
                  key={attr}
                  className={`p-3 rounded-lg border ${
                    selectedAttribute === attr
                      ? "bg-emerald-500 text-white"
                      : "border-gray-300 hover:border-emerald-200"
                  }`}
                  onClick={() => handleAttributeSelect(attr)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{attr}</span>
                    <IoCheckmarkCircleSharp
                      className={`text-xl ${
                        selectedAttribute === attr
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Variation Selection */}
      <AnimatePresence>
        {selectedAttribute && variations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <label className="text-sm font-medium text-gray-700">
              Select Option
            </label>
            <div className="grid grid-cols-2 gap-3">
              {variations
                ?.filter((v) => v.attribute?.attribute === selectedAttribute)
                ?.map((variation) => (
                  <motion.button
                    key={variation.id}
                    className={`p-3 rounded-lg border ${
                      selectedVariation?.id === variation.id
                        ? "bg-emerald-500 text-white"
                        : "border-gray-300 hover:border-emerald-200"
                    }`}
                    onClick={() => handleVariationSelect(variation)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{variation.variation}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold">
                          ₹{variation.discounted_variation_price}
                        </span>
                        {variation.price >
                          variation.discounted_variation_price && (
                          <>
                            <span className="text-sm line-through opacity-75">
                              ₹{variation.price}
                            </span>
                            <span className="text-sm">
                              (
                              {calculateDiscount(
                                variation.price,
                                variation.discounted_variation_price
                              )}
                              % off)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <motion.button
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white ${
            !selectedService ||
            (selectedService.is_variation && !selectedVariation)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
          onClick={handleAddToCart}
          disabled={
            !selectedService ||
            (selectedService.is_variation && !selectedVariation) ||
            isLoading
          }
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaCartPlus />
          <span>{isLoading ? "Adding..." : "Book Now"}</span>
        </motion.button>

        <motion.button
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-emerald-500 text-emerald-500 rounded-lg font-medium hover:bg-emerald-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCallClick}
        >
          <FaPhone />
          <span>Get A Call</span>
        </motion.button>
      </div>

      <LoginSignup isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ServiceSelector;
