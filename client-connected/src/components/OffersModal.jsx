import React from "react";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    label: "RoachX Gel Treatment – ₹399*",
    link: "/product/roachx-gel-treatment"
  },
  {
    label: "General Pest Control – ₹899*",
    link: "/subcategory/general-pest-control"
  },
  {
    label: "Standard Cockroach Control – ₹999*",
    link: "/subcategory/cockroach-control-services-in-bangalore"
  },
  {
    label: "6D Prime Cockroach – ₹1199*",
    link: "/product/cockroach-control-services-in-bangalore"
  },
  {
    label: "Bedbugs Standard – ₹2499*",
    link: "/subcategory/bed-bug-control-services-in-bangalore"
  }
];

const OffersModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="relative bg-white w-full max-w-xl rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          aria-label="Close offer modal"
        >
          &times;
        </button>
        {/* Header */}
        <div className="px-6 pt-6 pb-2 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 text-center">
            🎉 Limited-Time Offers Just for You!
          </h2>
          <p className="text-center text-sm text-gray-500 mt-1">
            Book now before they expire!
          </p>
        </div>
        {/* Offer List */}
        <ul className="px-6 py-4 max-h-[60vh] overflow-y-auto divide-y divide-gray-100 scrollbar-hide">
          {offers.map((offer, index) => (
            <li key={index} className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">LIMITED</span>
                  <p className="text-sm text-gray-800 font-medium">🛡️ {offer.label}</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate(offer.link);
                  }}
                  className="mt-1 sm:mt-0 text-sm font-semibold text-white bg-[#52852d] hover:bg-[#406a23] px-4 py-1.5 rounded transition-all"
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OffersModal;
