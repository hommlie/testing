import React from "react";
import { Link } from "react-router-dom";

export default function Business() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[90vh] flex items-center bg-black">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/scrap-bg.png"
            alt="Scrap Background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        {/* Content Overlay (Right side) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex justify-end">
          <div className="text-right text-white max-w-xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-black px-2 rounded">Your</span>{" "}
              <span className="text-white-500">Waste.</span>
              <br />
              <span className="text-black  px-2 rounded">Our</span>{" "}
              <span className="text-white-500">Business.</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 text-gray-200">
              Helping brands go{" "}
              <span className="text-green-900">Plastic-Neutral</span> and offset
              their <span className="text-green-900">carbon footprint.</span>
            </p>

            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-medium transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
