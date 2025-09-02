import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import config from "../../config/config";

const BlogForm = () => {
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
        service: formData.interest || "BlogForm Lead",
      });

      // ✅ Show success popup
      setShowPopup(true);

      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Reset form
      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        interest: "",
      });
    } catch (err) {
      console.error("BlogForm submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0 bg-white shadow-lg rounded-2xl p-4 md:p-2"
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
            className="w-full px-3 py-2 rounded-lg md:rounded-none border border-gray-300 md:border-0 focus:outline-none text-gray-700"
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
            className="w-full px-3 py-2 rounded-lg md:rounded-none border border-gray-300 md:border-0 focus:outline-none text-gray-700"
          />
        </div>

        {/* Pincode */}
        <div className="flex-1 md:border-r md:border-gray-300 md:px-3">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode *"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg md:rounded-none border border-gray-300 md:border-0 focus:outline-none text-gray-700"
          />
        </div>

        {/* Interest Dropdown */}
        <div className="flex-1 md:border-r md:border-gray-300 md:px-3">
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg md:rounded-none border border-gray-300 md:border-0 focus:outline-none text-gray-700"
          >
            <option value="">Interested in ? *</option>
            <option value="Cockroach Control">Cockroach Control</option>
            <option value="Termite Control">Termite Control</option>
            <option value="Bedbug Treatment">Bedbug Treatment</option>
            <option value="General Pest Control">General Pest Control</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center md:px-3">
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg md:rounded-md transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 animate-fadeIn">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <h2 className="text-xl font-semibold text-gray-800">Submitted!</h2>
            <p className="text-gray-600">Your details have been recorded.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogForm;
