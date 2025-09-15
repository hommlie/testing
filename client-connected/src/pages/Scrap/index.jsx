import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// make URL slugs
const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function Scrap() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonCity, setComingSoonCity] = useState("");

  // Image-less category cards (emoji + color accents)
  const categories = [
    { name: "Paper",   desc: "Newspaper, cardboard, office paper, magazines, etc.", icon: "📄", color: "bg-emerald-50 text-emerald-700" },
    { name: "Plastic", desc: "PET bottles, containers, packaging, and other plastics.", icon: "🧴", color: "bg-sky-50 text-sky-700" },
    { name: "E-Waste", desc: "Laptops, mobiles, wires, batteries, and electronics.",   icon: "🔌", color: "bg-amber-50 text-amber-700" },
    { name: "Metal",   desc: "Iron, steel utensils, aluminum cans, and mixed metals.", icon: "🧲", color: "bg-indigo-50 text-indigo-700" },
    { name: "Glass",   desc: "Bottles, jars, and other glass items.",                  icon: "🥛", color: "bg-cyan-50 text-cyan-700" },
    { name: "Clothes", desc: "Old clothes (accepted only with other scrap).",          icon: "👕", color: "bg-rose-50 text-rose-700" },
  ];

  const locations = [
    "Mumbai",
    "Lucknow",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Delhi",
    "Gurgaon",
    "Jaipur",
  ];

  // Only Bangalore active
  const ACTIVE_CITY_SLUGS = new Set(["bangalore"]);

  const handleLocationClick = (city) => {
    const slug = slugify(city);
    if (ACTIVE_CITY_SLUGS.has(slug)) {
      setSelectedCategory(null);
      navigate(`/scrap/${slug}`);
    } else {
      setComingSoonCity(city);
      setShowComingSoon(true);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* HERO — banner image kept */}
     <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center">
  {/* MOBILE image & overlay (visible < md) */}
  <div className="absolute inset-0 md:hidden">
    <img
      src="/images/scrap-desk.jpg"  /* mobile hero */
      alt="Scrap pickup banner (mobile)"
      className="w-full h-full object-cover"
    />
    {/* stronger overlay for readability on varied photos */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
  </div>

  {/* DESKTOP image & overlay (≥ md) — EXACTLY as before */}
  <div className="absolute inset-0 hidden md:block">
    <img
      src="/images/scrap-bg.png"         /* desktop hero */
      alt="Scrap pickup banner (desktop)"
      className="
        w-full h-full object-cover
        md:w-[199vh] md:ml-11            /* keep your desktop sizing */
      "
    />
    <div
      className="
        absolute inset-0 bg-black/40
        md:w-[199vh] md:ml-11            /* keep overlay aligned on desktop */
      "
    />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6
                  flex justify-center md:justify-end">
    <div className="text-white max-w-xl text-center md:text-right
                    pt-10 pb-8 md:pt-0 md:pb-0">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
        Got{" "}
        <span className="bg-emerald-600 px-2 py-1 rounded-xl">
          scrap?
        </span>
        <br />
        Sell it to us.
      </h1>

      {/* Mobile keeps white, desktop stays as before */}
      <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-white/90 md:text-white/90">
        Turn your recyclables into cash and help the circular economy thrive.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end items-stretch sm:items-end gap-3 sm:gap-4">
        {/* Mobile: full-width buttons for easy tapping; desktop unchanged */}
        <a
          href="tel:6363865658"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
        >
          Contact me
        </a>
        <Link
          to="/business"
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white text-white font-medium hover:bg-white hover:text-black transition"
        >
          For Business
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1240px] px-4 sm:px-6 py-12 sm:py-14 lg:py-16 md:mr-8 md:ml-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
          Scrap Categories We Collect
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((cat) => (
            <article
              key={cat.name}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              {/* stack on mobile, original row layout from sm+ */}
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div
                  className={`h-12 w-12 shrink-0 grid place-items-center rounded-xl text-xl ${cat.color}`}
                  aria-hidden
                >
                  <span className="select-none">{cat.icon}</span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{cat.desc}</p>
                </div>

                {/* mobile: full width below; desktop: your original small button on right */}
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  More
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* ======= NEW: Individuals & Businesses Strips (no photos) ======= */}
      <section className="mx-auto sm:max-w-[1250px] px-4 sm:px-6 pb-12 sm:pb-16 mr-8 ml-5">
        <div className="space-y-6">

          {/* Individuals */}
          <div className="rounded-2xl bg-white border shadow-sm overflow-hidden sm:w-full w-[350px] sm:-ml-0 -ml-5 -mt-5 sm:-mt-0">
            {/* Mobile icon header */}
            <div className="md:hidden flex items-center justify-center bg-emerald-50 p-5 border-b">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-emerald-100 text-3xl sm:text-4xl grid place-items-center">
                🧑
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Desktop icon (left) */}
              <div className="hidden md:flex col-span-2 items-center justify-center bg-emerald-50">
                <div className="h-24 w-24 rounded-2xl bg-emerald-100 text-4xl grid place-items-center">
                  🧑
                </div>
              </div>

              {/* Content */}
              <div className="col-span-3 p-6 md:p-8 text-center md:text-left">
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500">
                  Empowering
                </div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  Individuals
                </h3>
                <p className="mt-2 text-sm text-gray-600 md:max-w-2xl mx-auto md:mx-0">
                  by providing safe disposal ways to ensure healthy environment &amp; sustainable living.
                </p>
                <button className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline">
                  Learn more <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Businesses */}
          <div className="rounded-2xl bg-white border shadow-sm overflow-hidden sm:w-full w-[350px] sm:-ml-0 -ml-5">
            {/* Mobile icon header */}
            <div className="md:hidden flex items-center justify-center bg-emerald-50 p-5 border-b ">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-emerald-100 text-3xl sm:text-4xl grid place-items-center">
                🏢
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Content */}
              <div className="col-span-3 order-2 md:order-1 p-6 md:p-8 text-center md:text-left">
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500">
                  Enabling
                </div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  Businesses
                </h3>
                <p className="mt-2 text-sm text-gray-600 md:max-w-2xl mx-auto md:mx-0">
                  to offset their carbon footprint for eco-friendly organizational practices.
                </p>
                <Link
                  to="/business"
                  className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline"
                >
                  Learn more <span aria-hidden>→</span>
                </Link>
              </div>

              {/* Desktop icon (right) */}
              <div className="hidden md:flex col-span-2 order-1 md:order-2 items-center justify-center bg-emerald-50">
                <div className="h-24 w-24 rounded-2xl bg-emerald-100 text-4xl grid place-items-center">
                  🏢
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ======= NEW: Sustainability & Circular Economy ======= */}
      <section className="mx-auto max-w-[1250px] px-4 sm:px-6 pb-16 ml-2 sm:ml-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
          {/* Graphic substitute (no photo) */}
          <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
            {/* big green ring */}
            <div className="absolute inset-0 rounded-full border-[14px] border-emerald-300" />
            <div className="absolute inset-10 rounded-full border-[10px] border-emerald-500/60" />
            {/* center mark */}
            <div className="absolute inset-0 grid place-items-center text-4xl text-emerald-600">
              ♻️
            </div>
            {/* corner badges */}
            <Badge top left icon="🛍️" />
            <Badge top right icon="👤" />
            <Badge bottom left icon="🌿" />
            <Badge bottom right icon="🏙️" />
          </div>

          {/* Text block */}
          <div className="mt-5 sm:mt-0">
            <div className="sm:text-xs text-xl uppercase tracking-wide text-gray-500 ml-12 sm:ml-0">
              Our Eco-System Towards
            </div>
            <h3 className="mt-2 text-[20px] sm:text-4xl font-extrabold text-gray-900 leading-tight ml-2 sm:ml-0">
              Sustainability &amp;<br className="hidden sm:block" />
              Circular Economy
            </h3>
            <p className="mt-4 text-sm sm:text-base text-gray-600 ml-2 sm:ml-0 ">
              The Hommlie with its acute understanding of waste has developed
              sustainable strategies &amp; techniques to manage waste efficiently &amp; cost-
              effectively—contributing in closing the loop of product life cycle &amp; attain
              circular economy while infusing sustainability into lives.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-700 ml-0 sm:ml-0">
              Learn More <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* LOCATION PICKER MODAL */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6">
            <div className="text-center">
              <h2 className="text-xl font-bold">{selectedCategory.name}</h2>
              <p className="text-gray-600 mt-1">Where do you reside?</p>
            </div>

            <div className="mt-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationClick(loc)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-medium hover:border-emerald-600 hover:bg-emerald-50 hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory(null)}
              className="mt-6 w-full rounded-xl bg-gray-900 py-2.5 text-white hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* COMING SOON MODAL */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 text-center">
            <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-amber-100 text-amber-700 text-xl">
              ⏳
            </div>
            <h3 className="mt-3 text-xl font-semibold">We’re not here yet</h3>
            <p className="text-gray-600 mt-2">
              Sorry! We’re currently serving only <b>Bangalore</b>.<br />
              <span className="text-gray-800">“{comingSoonCity}”</span> is coming soon.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowComingSoon(false)}
                className="flex-1 rounded-xl border px-4 py-2.5 font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Okay
              </button>
              <button
                onClick={() => {
                  setShowComingSoon(false);
                  navigate("/scrap/bangalore");
                }}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-white font-medium hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                View Bangalore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Small helper for the eco graphic corner badges */
function Badge({ top, right, bottom, left, icon }) {
  const pos = [
    top ? "top-0 -translate-y-1/2" : "",
    right ? "right-0 translate-x-1/2" : "",
    bottom ? "bottom-0 translate-y-1/2" : "",
    left ? "left-0 -translate-x-1/2" : "",
  ].join(" ");
  return (
    <div
      className={`absolute ${pos} h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-200 grid place-items-center text-lg sm:text-xl text-emerald-800 shadow`}
      aria-hidden
    >
      {icon}
    </div>
  );
}
