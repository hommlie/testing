import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function Scrap() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonCity, setComingSoonCity] = useState("");

  const categories = [
    { name: "Paper",   desc: "Newspaper, cardboard, office paper, magazines, etc.", icon: "📄", color: "bg-emerald-50 text-emerald-700" },
    { name: "Plastic", desc: "PET bottles, containers, packaging, and other plastics.", icon: "🧴", color: "bg-sky-50 text-sky-700" },
    { name: "E-Waste", desc: "Laptops, mobiles, wires, batteries, and electronics.",   icon: "🔌", color: "bg-amber-50 text-amber-700" },
    { name: "Metal",   desc: "Iron, steel utensils, aluminum cans, and mixed metals.", icon: "🧲", color: "bg-indigo-50 text-indigo-700" },
    { name: "Glass",   desc: "Bottles, jars, and other glass items.",                  icon: "🥛", color: "bg-cyan-50 text-cyan-700" },
    { name: "Clothes", desc: "Old clothes (accepted only with other scrap).",          icon: "👕", color: "bg-rose-50 text-rose-700" },
  ];

  const locations = ["Mumbai","Lucknow","Bangalore","Hyderabad","Pune","Delhi","Gurgaon","Jaipur"];
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

<section
  class="relative w-full h-[72svh] md:h-[520px] overflow-hidden flex items-start md:items-center isolate"
>

  <picture class="absolute inset-0 -z-10">
    <source media="(min-width:768px)" srcset="/images/scrap-bg.png" />
    <img
      src="/images/scrap-desk.jpg"
      alt="Hommlie executive receiving scrap from customer"
      class="w-full h-full object-cover object-center"
      fetchpriority="high"
      decoding="async"
    />
  </picture>


  <div
    class="absolute inset-0 pointer-events-none -z-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent md:from-black/35 md:via-black/10"
  ></div>


  <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-0">
    <div
      class="ml-auto md:max-w-md lg:max-w-lg text-white text-center md:text-right mt-16"
    >
      
      <h1 class="font-extrabold leading-tight tracking-tight">
        <span class="block text-[26px] xs:text-[28px] sm:text-5xl">
          Got
          <span
            class="align-middle inline-block rounded-md px-2 py-0.5 bg-[#15803d] text-black "
          >
            scrap?
          </span>
        </span>
        <span class="block mt-1 text-[24px] xs:text-[26px] sm:text-5xl">
          Sell it to us.
        </span>
      </h1>

    
      <p class="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
        Turn your recyclables into cash and help the circular economy thrive.
      </p>

     
      <div
        class="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4"
      >
        <a
          href="tel:6363865658"
          class="inline-flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-xl font-semibold bg-[#15803d] hover:bg-[#52852d] active:bg-emerald-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Contact me
        </a>

        <a
          href="/business"
          class="inline-flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-xl font-semibold border border-white/80 text-white backdrop-blur-[2px] bg-white/0 hover:bg-white hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          For Business
        </a>
      </div>
    </div>
  </div>
</section>



     {/* CATEGORIES */}
<section className="mx-auto max-w-[1240px] px-4 sm:px-6 py-12 sm:py-14 lg:py-16">
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">
    Scrap Categories We Collect
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {categories.map((cat) => (
      <article
        key={cat.name}
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition duration-300"
      >
        {/* Icon + Name row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-xl text-2xl shadow-sm ${cat.color}`}
            aria-hidden
          >
            <span className="select-none">{cat.icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{cat.desc}</p>

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setSelectedCategory(cat)}
            className="rounded-md bg-[#15803d] px-5 py-2 text-sm font-medium text-white 
                       hover:bg-[#52852d] shadow-md hover:shadow-lg transition 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            More
          </button>
        </div>
      </article>
    ))}
  </div>
</section>


      {/* Individuals & Businesses strips — remove drifting margins */}
      <section className="mx-auto max-w-[1250px] px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
            <div className="md:hidden flex items-center justify-center bg-emerald-50 p-5 border-b">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-emerald-100 text-3xl sm:text-4xl grid place-items-center">🧑</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="hidden md:flex col-span-2 items-center justify-center bg-emerald-50">
                <div className="h-24 w-24 rounded-2xl bg-emerald-100 text-4xl grid place-items-center">🧑</div>
              </div>
              <div className="col-span-3 p-6 md:p-8 text-center md:text-left">
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500">Empowering</div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-700">Individuals</h3>
                <p className="mt-2 text-sm text-gray-600 md:max-w-2xl mx-auto md:mx-0">
                  by providing safe disposal ways to ensure healthy environment &amp; sustainable living.
                </p>
                <button className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline">
                  Learn more <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border shadow-sm overflow-hidden">
            <div className="md:hidden flex items-center justify-center bg-emerald-50 p-5 border-b ">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-emerald-100 text-3xl sm:text-4xl grid place-items-center">🏢</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="col-span-3 order-2 md:order-1 p-6 md:p-8 text-center md:text-left">
                <div className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500">Enabling</div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-emerald-700">Businesses</h3>
                <p className="mt-2 text-sm text-gray-600 md:max-w-2xl mx-auto md:mx-0">
                  to offset their carbon footprint for eco-friendly organizational practices.
                </p>
                <Link to="/business" className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline">
                  Learn more <span aria-hidden>→</span>
                </Link>
              </div>
              <div className="hidden md:flex col-span-2 order-1 md:order-2 items-center justify-center bg-emerald-50">
                <div className="h-24 w-24 rounded-2xl bg-emerald-100 text-4xl grid place-items-center">🏢</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Circular Economy */}
      <section className="mx-auto max-w-[1250px] px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-full border-[14px] border-emerald-300" />
            <div className="absolute inset-10 rounded-full border-[10px] border-emerald-500/60" />
            <div className="absolute inset-0 grid place-items-center text-4xl text-emerald-600">♻️</div>
            <Badge top left icon="🛍️" />
            <Badge top right icon="👤" />
            <Badge bottom left icon="🌿" />
            <Badge bottom right icon="🏙️" />
          </div>

          <div className="mt-5 sm:mt-0">
            <div className="sm:text-xs text-xl uppercase tracking-wide text-gray-500">Our Eco-System Towards</div>
            <h3 className="mt-2 text-[20px] sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Sustainability &amp;<br className="hidden sm:block" />
              Circular Economy
            </h3>
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              The Hommlie with its acute understanding of waste has developed sustainable strategies &amp; techniques to
              manage waste efficiently &amp; cost-effectively—contributing in closing the loop of product life cycle &amp; attain
              circular economy while infusing sustainability into lives.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#15803d] px-5 py-2.5 text-white font-medium hover:bg-[#52852d]">
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
              className="mt-6 w-full rounded-lg bg-[#15803d] py-2.5 text-white hover:bg-[#52852d] transition focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* COMING SOON MODAL */}
      {showComingSoon && (
  <div
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-labelledby="coming-soon-title"
  >
    {/* Enable scrolling on very small devices */}
    <div className="h-full w-full overflow-y-auto">
      {/* Bottom sheet on mobile, centered on ≥sm */}
      <div className="min-h-full flex items-end sm:items-center justify-center p-3 sm:p-4">
        <div className="
          w-full sm:w-auto
          max-w-md sm:max-w-lg
          rounded-t-2xl sm:rounded-2xl
          bg-white shadow-2xl
          p-4 sm:p-6
          mx-auto
          translate-y-0
        ">
          {/* Icon */}
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full bg-amber-100 text-amber-700 text-xl">
            ⏳
          </div>

          {/* Title */}
          <h3 id="coming-soon-title" className="mt-3 text-lg sm:text-xl font-semibold text-gray-900 text-center">
            We’re not here yet
          </h3>

          {/* Message */}
          <p className="text-gray-600 mt-2 text-center text-sm sm:text-base leading-relaxed">
            Sorry! We’re currently serving only <b>Bangalore</b>.<br />
            <span className="text-gray-800">“{comingSoonCity}”</span> is coming soon.
          </p>

          {/* Actions */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full sm:flex-1 rounded-xl border px-4 py-3 text-sm sm:text-base font-medium hover:bg-gray-50 active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Okay
            </button>

            <button
              onClick={() => {
                setShowComingSoon(false);
                navigate("/scrap/bangalore"); // use your BASE_URL if needed
              }}
              className="w-full sm:flex-1 rounded-lg bg-[#15803d] bg-emerald-600 px-4 py-2 text-sm sm:text-base text-white font-medium hover:bg-[#52852d] active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              View Bangalore
            </button>
          </div>

          {/* Safe area padding for devices with home indicator */}
          <div className="pt-[max(env(safe-area-inset-bottom),0px)]" />
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

/* Corner badge helper */
function Badge({ top, right, bottom, left, icon }) {
  const pos = [
    top ? "top-0 -translate-y-1/2" : "",
    right ? "right-0 translate-x-1/2" : "",
    bottom ? "bottom-0 translate-y-1/2" : "",
    left ? "left-0 -translate-x-1/2" : "",
  ].join(" ");
  return (
    <div className={`absolute ${pos} h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-200 grid place-items-center text-lg sm:text-xl text-emerald-800 shadow`} aria-hidden>
      {icon}
    </div>
  );
}
