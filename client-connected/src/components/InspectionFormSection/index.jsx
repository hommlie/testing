import React, { useState, useEffect } from "react";
import { IoBusiness, IoCallOutline, IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import LocationSuggestion from "../../components/LocationSuggestion";
import DatePicker from "react-datepicker";

const InspectionFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    latitude: "",
    longitude: "",
    date: new Date(),
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.time) newErrors.time = "Time slot is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const dataToSend = {
        fullName: formData.name,
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        mobile: formData.phone,
        email: formData.email,
        date: formData.date.toISOString(),
        time: formData.time,
        message: formData.message,
      };

      const response = await axios.post(
        `${config.API_URL}/api/createInspection`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
          latitude: "",
          longitude: "",
          date: new Date(),
          time: "",
        });
      } else {
        setErrors({
          submit: "Failed to submit inspection request. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrors({ submit: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8">We're here to help you!</p>
          <div className="space-y-10">
            <div className="flex items-start">
              <div className="w-12 h-12 text-2xl rounded-full text-hommlie flex items-center justify-center mr-4">
                <MdOutlineLocalPostOffice />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">reach@hommlie.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 text-2xl rounded-full text-hommlie flex items-center justify-center mr-4">
                <IoCallOutline />
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer Care</p>
                <p className="font-medium">+91-6363865658</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 text-2xl rounded-full text-hommlie flex items-center justify-center mr-4">
                <IoBusiness />
              </div>
              <div className="max-w-sm">
                <p className="text-sm text-gray-600">Offices</p>
                <p className="font-medium">Bangalore</p>
                <p className="font-medium">Hyderabad</p>
                <p className="font-medium">Chennai</p>
                <p className="font-medium">Delhi</p>
                <p className="font-medium">Kolkata</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border glow-border rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Book an Inspection</h2>
          <p className="text-gray-600 mb-8">
            Our friendly team would love to hear from you.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <LocationSuggestion
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                name="address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date) => setFormData({ ...formData, date: date })}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  minDate={new Date()}
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-400 text-red-700 rounded-md">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-hommlie text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Inspection Request"
              )}
            </button>
          </form>

          {submitted && (
            <div className="mt-6 p-4 bg-green-50 border border-green-400 text-green-700 rounded-md">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>
                  Thank you for your inspection request! We'll get back to you
                  soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionFormSection;
