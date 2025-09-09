import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import config from "../../config/config";

const LandingPageForm = () => {
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

      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);

      setFormData({ name: "", mobile: "", pincode: "", interest: "" });
    } catch (err) {
      console.error("LandingPageForm submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col gap-2
          bg-white/90 backdrop-blur-md shadow-2xl
          rounded-3xl p-6 sm:p-8
          border border-gray-200 sm:-mt-36 -mt-0
          
        "
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Book Your Inspection
        </h2>
        
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-green-400
            focus:border-transparent transition
            placeholder-gray-400 text-gray-700
          "
        />

        {/* Mobile */}
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number *"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-green-400
            focus:border-transparent transition
            placeholder-gray-400 text-gray-700
          "
        />

        {/* Pincode */}
        <input
          type="text"
          name="pincode"
          placeholder="Pincode *"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-green-400
            focus:border-transparent transition
            placeholder-gray-400 text-gray-700
          "
        />

        {/* Interest Dropdown */}
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-green-400
            focus:border-transparent transition
            placeholder-gray-400 text-gray-700
          "
        >
          <option value="">Select Service *</option>
          <option value="Cockroach Control">Cockroach Control</option>
          <option value="Termite Control">Termite Control</option>
          <option value="Bedbug Treatment">Bedbug Treatment</option>
          <option value="General Pest Control">General Pest Control</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r from-green-400 to-green-600
            text-white font-semibold text-lg
            hover:from-green-500 hover:to-green-700
            transition-all duration-300
            shadow-lg
          "
        >
          Submit
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-fadeIn max-w-sm mx-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-gray-800">Submitted!</h2>
            <p className="text-gray-600 text-center">
              Your details have been successfully recorded.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageForm;
