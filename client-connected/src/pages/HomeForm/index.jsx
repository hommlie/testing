import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import config from "../../config/config";

const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    interest: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${config.API_URL}/api/createInspection`, {
        fullName: formData.name,
        address: `Pincode: ${formData.pincode}`,
        mobile: formData.mobile,
        email: "",
        date: new Date().toISOString(),
        time: "N/A",
        service: formData.interest || "HomeForm Lead",
      });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        interest: "",
      });
    } catch (err) {
      console.error("HomeForm submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative text-center py-8 -mt-16">
      {/* ✅ Heading */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
       Quick Call Back Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0 bg-white shadow-lg rounded-l p-4 md:p-2 max-w-3xl mx-auto"
      >
        {/* Name */}
        <div className="flex-1 md:border-r md:border-gray-300 md:px-3">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg md:rounded-none border border-gray-300 md:border-0 focus:outline-none text-gray-700 text-[18px]"
          />
        </div>

        {/* Mobile */}
        <div className="flex-1 md:border-r md:border-gray-300 md:px-3">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number *"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg md:rounded-none border border-gray-300 md:border-0 focus:outline-none text-gray-700 text-[18px]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center md:px-3">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#0463ac] hover:bg-[#52852d] text-white font-medium text-sm px-6 py-2 rounded-lg md:rounded-md transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* ✅ Clean & Simple Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-fadeIn">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Thank You!
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Your details have been submitted successfully.
            </p>
            <p className="text-gray-500 text-xs">
              We’ll get back to you shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeForm;
