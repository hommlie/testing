import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

/** Tailwind CSS required */

const SERVICES = [
  {
    id: "scrap",
    title: "Scrap Collection",
    icon: "📦",
    tone: "bg-emerald-100 text-emerald-700",
    points: [
      "When waste is generated in bulk, traditional methods fall short—Hommlie provides end-to-end management across all waste types.",
      "Well-established, customizable procedures tailored to your organization’s waste requirements.",
      "Digital traceability & transparent records to streamline data collection and reporting.",
      "Compliance with CPCB standards and local regulations for safe, responsible bulk scrap collection.",
    ],
  },
  {
    id: "epr",
    title: "EPR Service",
    icon: "📜",
    tone: "bg-sky-100 text-sky-700",
    points: [
      "End-to-end EPR compliance strategy, documentation & submissions.",
      "Reverse logistics and evidence generation mapped to your brand’s targets.",
      "Centralized dashboard for EPR progress and certificates.",
    ],
  },
  {
    id: "shredding",
    title: "Shredding service",
    icon: "🗂️",
    tone: "bg-lime-100 text-lime-700",
    points: [
      "On-site and off-site secure shredding for paper & packaging.",
      "Certificates of destruction and audit trail for compliance.",
      "Confidential handling by trained, verified staff.",
    ],
  },
  {
    id: "circular",
    title: "Circular Economy Services",
    icon: "♻️",
    tone: "bg-emerald-100 text-emerald-700",
    points: [
      "Consulting to close material loops across your supply chain.",
      "Reuse, refurbish and recycle pathways for product lines.",
      "Measurable impact reports aligned with ESG goals.",
    ],
  },
  {
    id: "zerowaste",
    title: "Zero waste services",
    icon: "🧪",
    tone: "bg-amber-100 text-amber-700",
    points: [
      "Waste audits & source-segregation programs for facilities.",
      "On-site infrastructure set-up and staff training.",
      "Milestone tracking to reach near-zero landfill.",
    ],
  },
  {
    id: "dismantling",
    title: "Dismantling service",
    icon: "🛠️",
    tone: "bg-blue-100 text-blue-700",
    points: [
      "Safe dismantling for e-waste, fixtures and fit-outs.",
      "Material recovery with compliance-first disposal.",
      "Detailed reporting with photo & weight logs.",
    ],
  },
  {
    id: "csr",
    title: "CSR Activity",
    icon: "🤝",
    tone: "bg-rose-100 text-rose-700",
    points: [
      "Community clean-ups, awareness drives & school programs.",
      "Impact reporting & media kits for your CSR disclosures.",
      "End-to-end execution by the Hommlie team.",
    ],
  },
  {
    id: "mrf",
    title: "Material Recovery Facility",
    icon: "🏭",
    tone: "bg-yellow-100 text-yellow-700",
    points: [
      "MRF design, setup and operations consulting.",
      "Baler/compactor planning, process SOPs & training.",
      "Yield optimization & quality control frameworks.",
    ],
  },
  {
    id: "iec",
    title: "IEC Activity",
    icon: "📣",
    tone: "bg-green-100 text-green-700",
    points: [
      "Information, Education & Communication campaigns.",
      "Workshops, toolkits and nudge systems for behavior change.",
      "Multi-lingual creatives aligned to your brand.",
    ],
  },
];

export default function Business() {
  const [active, setActive] = useState("scrap");
  const activeService = SERVICES.find((s) => s.id === active) || SERVICES[0];

  // Refs to scroll and focus the form
  const contactSectionRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("Contact form:", data);
    alert("Thanks! Our team will get back to you within 24 hours.");
    e.currentTarget.reset();
  };

  const scrollToForm = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => nameInputRef.current?.focus(), 500);
  };

  return (
    <div className="w-full">
      {/* ======================= Hero ======================= */}

      <section class="relative w-full h-[72svh] md:h-[520px] overflow-hidden isolate">
 
  <div class="absolute inset-0 md:hidden">
    <img
      src="/images/scrap-desk.jpg"
      alt="Business Background (mobile)"
      class="w-full h-full object-cover object-center"
    />
    
    <div class="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/10"></div>
  </div>


  <div class="absolute inset-0 hidden md:flex justify-center">
    <img
      src="/images/scrap-bg.png"
      alt="Business Background (desktop)"
      class="h-full w-[1180px] object-cover opacity-90 mr-6 ml-6"
    />
  </div>

 
  <div class="mt-28 relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
    <div
      class="
        flex
        items-start md:items-center
        justify-center md:justify-end
        h-[72svh] md:h-[520px]
      "
    >
      <div
        class="
          text-center md:text-right
          text-white md:text-black
          max-w-[22rem] sm:max-w-xl
          pt-8 md:pt-0 -mt-4 sm:-mt-48
         "
      >
    
        <h1 class="font-extrabold leading-tight tracking-tight ">
          <span class="block text-[48px] sm:text-5xl">
            <span class="text-white md:text-black md:px-2 md:rounded">Your</span>
            <span class="text-black"> Waste,</span>
          </span>
          <span class="block mt-1 text-[26px] sm:text-5xl">
            <span class="text-black md:text-black md:px-2 md:rounded">Our</span>
            <span class="text-white"> Business.</span>
          </span>
        </h1>

        
        <p class="mt-3 text-[15px] sm:text-lg leading-relaxed text-white/90 md:text-black/80">
          Helping brands go
          <span class="font-semibold text-emerald-300 md:text-emerald-600">Plastic-Neutral</span>
          and offset their
          <span class="font-semibold text-emerald-300 md:text-emerald-600">carbon footprint</span>.
        </p>

   
        <a
          onclick="scrollToForm && scrollToForm()"
          class="inline-block mt-5 px-4 py-2 rounded-lg text-base sm:text-lg font-medium
                 bg-[#15803d]  text-white hover:bg-[#52852d] active:bg-emerald-800
                 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Contact Us
        </a>
      </div>
    </div>
  </div>

  <div class="h-[env(safe-area-inset-bottom)]"></div>
</section>


      {/* ======================= Services / Carbon section ======================= */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <section className="text-center mb-10 sm:mb-12 -mt-4 sm:-mt-0">
          <h2 className="text-[20px] sm:text-4xl font-extrabold">
            Offset your business’s&nbsp;Carbon Footprint with Hommlie!
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Hommlie helps brands comply with EPR 2016 by diverting an equivalent amount of
            post-consumer waste from the environment to certified recycling centers.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: service tiles — full width on mobile; keep your fixed desktop width/margin */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-5 w-full md:w-[470px] md:-ml-10">
            {SERVICES.map((svc) => {
              const isActive = svc.id === active;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActive(svc.id)}
                  className={[
                    "rounded-2xl p-5 text-left transition border shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-500",
                    isActive
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-gray-50 hover:bg-white border-gray-200",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "h-14 w-14 grid place-items-center rounded-full text-2xl mb-4",
                      isActive ? "bg-white/10" : svc.tone,
                    ].join(" ")}
                  >
                    <span className="select-none">{svc.icon}</span>
                  </div>
                  <div className="font-semibold leading-snug">{svc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Right: description panel — remove negative margin only on mobile */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border bg-white shadow-sm p-6 sm:p-8 mr-0 md:-mr-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                {activeService.title}
              </h3>

              <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
                {activeService.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  to="/help"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#15803d] px-4 py-2 text-white font-semibold hover:bg-[#52852d] transition"
                >
                  Know More <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Presence (Bengaluru map + chips) ======================= */}
      <section className="mx-auto max-w-[1220px] px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left - text + chips */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-center md:text-left">
              Our <span className="text-emerald-600">Presence</span>
              <br /> Across Bengaluru
            </h2>

            <p className="mt-4 text-gray-700 text-center md:text-left">
              Hommlie has established active operations in key Bengaluru neighborhoods and is
              expanding to other metros soon.
            </p>

            {/* Active offices */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              {["Ramamurthy Nagar", "Hoskote", "Banashankari", "Vidyaranyapura"].map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-lg bg-[#15803d] text-white px-5 py-2 font-semibold"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Coming soon */}
            <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
              {["Hyderabad", "Chennai"].map((c) => (
                <div
                  key={c}
                  className="rounded-2xl bg-amber-50 px-5 py-2 text-center leading-tight border border-amber-100"
                >
                  <div className="font-semibold text-gray-800">{c}</div>
                  <div className="text-xs text-amber-700">coming soon</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - map panel */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-3xl overflow-hidden shadow-sm border aspect-[4/3]"
              style={{
                backgroundImage: "url('/images/banglore.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </section>

      {/* ======================= “We assist you…” (image split) ======================= */}
      <section className="mx-auto max-w-[1220px] px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="rounded-3xl border bg-white shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14 text-center md:text-left">
            <h3 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              We assist you in enabling
              <br /> your business’s sustainable
              <br /> growth
            </h3>
            <p className="mt-6 text-gray-600 text-lg">
              Let's join hands to redefine the waste management sector of India by formally
              organizing it.
            </p>
            <button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center rounded-lg bg-[#15803d] px-4 py-2 text-white font-medium hover:bg-black"
            >
              Schedule a consultation call today
            </button>
          </div>

          <div className="h-56 sm:h-[28rem] lg:h-auto">
            <img
              src="/images/BusinessProf.png"
              alt="Partnership handshake"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ======================= Get in touch ======================= */}
      <section
        ref={contactSectionRef}
        id="contact"
        className="mx-auto max-w-[1220px] px-4 sm:px-6 pb-16"
      >
        <section className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Get in touch with us</h2>
          <p className="mt-2 text-gray-600">
            Any question or remarks? Just write us a{" "}
            <span className="text-emerald-600 font-semibold">message!</span>
          </p>
        </section>

        <div className="rounded-3xl border bg-white shadow-sm p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: contact info card */}
            <div className="rounded-2xl bg-emerald-700 text-white p-6 sm:p-7 md:p-8">
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              <p className="mt-2 text-emerald-100">
                Fill up the form and our team will get back to you within 24 hours
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10">📞</div>
                  <a href="tel:+916363865658" className="underline-offset-2 hover:underline">
                    +91-6363865658
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10">✉️</div>
                  <a
                    href="mailto:contact@hommlie.com"
                    className="underline-offset-2 hover:underline"
                  >
                    contact@hommlie.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10 mt-0.5">
                    📍
                  </div>
                  <div>
                    Hommlie, Bengaluru, Karnataka
                    <br />
                    57 2nd floor, Place building, 6th Main Rd, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Name</label>
                <input
                  ref={nameInputRef}
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Phone Number</label>
                  <input
                    name="phone"
                    required
                    className="mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Subject</label>
                <input
                  name="subject"
                  className="mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Message"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-[#15803d] px-4 py-2 text-white font-medium hover:bg-[#52852d]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- (Unused) helper kept intact if you need it later ---------- */
function MapPin({ x, y, label }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: x, top: y }}
      title={label}
    >
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full bg-white text-emerald-700 shadow ring-2 ring-emerald-700 grid place-items-center">
          <span>📍</span>
        </div>
        <div className="mt-1 rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-xs font-medium text-emerald-800 shadow">
          {label}
        </div>
      </div>
    </div>
  );
}
