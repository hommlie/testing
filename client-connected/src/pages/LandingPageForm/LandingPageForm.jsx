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
          flex flex-col gap-5
          bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]
          rounded-[2.5rem] p-8 lg:p-10
          border border-gray-100/50
          relative z-10
        "
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[#02513E] mb-2">
            Book Inspection
          </h2>
          <p className="text-gray-500 text-sm font-medium">Get a quote in minutes</p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10
                focus:border-[#02513E] transition-all duration-300
                placeholder-gray-400 text-gray-700 font-medium
              "
            />
          </div>

          {/* Mobile */}
          <div className="relative group">
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number *"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="
                w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10
                focus:border-[#02513E] transition-all duration-300
                placeholder-gray-400 text-gray-700 font-medium
              "
            />
          </div>

          {/* Pincode */}
          <div className="relative group">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode *"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="
                w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10
                focus:border-[#02513E] transition-all duration-300
                placeholder-gray-400 text-gray-700 font-medium
              "
            />
          </div>

          {/* Interest Dropdown */}
          <div className="relative group">
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              className="
                w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10
                focus:border-[#02513E] transition-all duration-300
                placeholder-gray-400 text-gray-700 font-medium appearance-none
              "
            >
              <option value="">Select Service *</option>
              <option value="Cockroach Control">Cockroach Control</option>
              <option value="Termite Control">Termite Control</option>
              <option value="Bedbug Treatment">Bedbug Treatment</option>
              <option value="General Pest Control">General Pest Control</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            group relative w-full py-4 mt-4 rounded-2xl
            bg-[#02513E] text-white font-bold text-lg
            hover:shadow-2xl hover:shadow-green-900/40
            transform active:scale-[0.98]
            transition-all duration-300 overflow-hidden
          "
        >
          <span className="relative z-10">Get Expert Visit</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
