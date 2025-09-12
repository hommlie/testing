import React from "react";
import { Link } from "react-router-dom";

export default function Scrap() {
  const categories = [
    {
      name: "Paper",
      desc: "Newspaper, cardboard, office paper, magazines, etc.",
      image: "/images/scrap-paper.jpg",
    },
    {
      name: "Plastic",
      desc: "PET bottles, containers, packaging, and other plastics.",
      image: "/images/scrap-plastic.jpg",
    },
    {
      name: "E-Waste",
      desc: "Laptops, mobiles, wires, batteries, and electronics.",
      image: "/images/scrap-ewaste.jpg",
    },
    {
      name: "Metal",
      desc: "Iron, steel utensils, aluminum cans, and mixed metals.",
      image: "/images/scrap-metal.jpg",
    },
    {
      name: "Glass",
      desc: "Bottles, jars, and other glass items.",
      image: "/images/scrap-glass.jpg",
    },
    {
      name: "Clothes",
      desc: "Old clothes (accepted only with other scrap).",
      image: "/images/scrap-clothes.jpg",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center bg-black">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/scrap-bg.png"
            alt="Scrap Background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        {/* Content Overlay (Always right side) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex justify-end">
          <div className="text-white text-right max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
              Got <span className="bg-green-600 px-2 rounded">scrap?</span>
              <br />
              Sell it to us.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-200">
              Sell us your recyclable wastes and help contribute to the circular economy.
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-end items-end gap-3 sm:gap-4">
              <a
                href="tel:6363865658"
                className="w-auto sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base sm:text-lg font-medium transition"
              >
                Contact me
              </a>
              <Link
                to="/business"
                className="w-auto sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border border-white text-white rounded-lg text-base sm:text-lg font-medium hover:bg-white hover:text-black transition"
              >
                For Business
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-8 sm:mb-10">
          Scrap Categories We Collect
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="w-full h-40 sm:h-48 lg:h-56 bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{cat.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">{cat.desc}</p>
                <button className="mt-4 w-full sm:w-auto px-4 sm:px-5 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base hover:bg-green-700 transition">
                  more 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
