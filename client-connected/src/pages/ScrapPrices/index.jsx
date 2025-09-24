import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";

/* -------------------- helpers -------------------- */
const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const ACTIVE_CITY = "bangalore";
const CITY_LABEL = "Bangalore";

const CATEGORIES = ["All", "Paper", "Plastic", "Metal", "E-waste", "Other"];

/** Demo data – replace with API response if needed */
const ALL_ITEMS = [
  { name: "Newspaper", price: 8, unit: "/Weight", category: "Paper" },
  { name: "Carton", price: 6, unit: "/Weight", category: "Paper" },
  { name: "Books", price: 7, unit: "/Weight", category: "Paper" },
  { name: "Magazines", price: 7, unit: "/Weight", category: "Paper" },
  { name: "Mix Plastic", price: 10, unit: "/Piece", category: "Plastic" },
  { name: "Soft Plastic", price: 7, unit: "/Weight", category: "Plastic" },
  { name: "Hard Plastic", price: 2, unit: "/Weight", category: "Plastic" },
  { name: "Iron", price: 22, unit: "/Weight", category: "Metal" },
  { name: "Tin", price: 15, unit: "/Weight", category: "Metal" },
  { name: "Aluminium", price: 95, unit: "/Weight", category: "Metal" },
  { name: "Steel", price: 25, unit: "/Weight", category: "Metal" },
  { name: "E-waste Mix", price: 12, unit: "/Weight", category: "E-waste" },
  { name: "Laptop (Dead)", price: 250, unit: "/Piece", category: "E-waste" },
  { name: "Glass Bottles", price: 2, unit: "/Weight", category: "Other" },
];

const unitIsPiece = (unit) => unit?.toLowerCase().includes("piece");
const unitLabel = (unit) => (unitIsPiece(unit) ? "piece(s)" : "kg");

/* -------------------- main component -------------------- */
export default function ScrapPrices() {
  const { city } = useParams();
  const navigate = useNavigate();
  const citySlug = slugify(city || "");

  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  /** browse | checkout */
  const [mode, setMode] = useState("browse");
  const [step, setStep] = useState(1);

  /** selectedItems: array of {name, price, unit, category, qty, measure} */
  const [selected, setSelected] = useState([]);

  /* ---- pickup form state ---- */
  const [pickup, setPickup] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    const byCat =
      activeCat === "All"
        ? ALL_ITEMS
        : ALL_ITEMS.filter((i) => i.category === activeCat);
    if (!query.trim()) return byCat;
    const q = query.toLowerCase();
    return byCat.filter((i) => i.name.toLowerCase().includes(q));
  }, [activeCat, query]);

  const totalPrice = useMemo(
    () =>
      selected.reduce((sum, it) => sum + (Number(it.qty) || 0) * it.price, 0),
    [selected]
  );

  const itemInSelected = (name) => selected.find((s) => s.name === name);

  const addItem = (item) => {
    if (itemInSelected(item.name)) return;
    setSelected((prev) => [
      ...prev,
      {
        ...item,
        qty: 1,
        measure: unitIsPiece(item.unit) ? "piece(s)" : "kg",
      },
    ]);
  };

  const updateQty = (name, nextQty) => {
    setSelected((prev) =>
      prev
        .map((s) => (s.name === name ? { ...s, qty: Math.max(0, nextQty) } : s))
        .filter((s) => s.qty > 0)
    );
  };

  const clearAll = () => setSelected([]);

  // keep minimal + safe formatting so server doesn't 500 on validation
  const formatPhone = (raw) => {
    // keep only 10 digits to match common backend validations
    const onlyDigits = String(raw || "").replace(/\D/g, "").slice(0, 10);
    return onlyDigits;
  };

  // kept, but no longer used in payload (to avoid very long address strings)
  const buildItemsSummary = () => {
    if (!selected.length) return "No items";
    return selected
      .map((it) => `${it.qty} ${it.measure} ${it.name} (₹${it.price}/unit)`)
      .join(", ");
  };

  const submitPickup = async () => {
    if (
      !pickup.name ||
      !pickup.phone ||
      !pickup.address ||
      !pickup.agree
    ) {
      alert("Please fill name, phone, address and agree to terms before confirming.");
      return;
    }

    const fullPhone = formatPhone(pickup.phone);

    // Minimal payload: name, mobile, address + safe defaults (email/date/time/service)
    const payload = {
      fullName: pickup.name,
      address: `Scrap pickup address: ${pickup.address}`,
      mobile: fullPhone,
      email: "",
      date: new Date().toISOString(), // safe default (like ContactForm)
      time: "N/A",                     // safe default (like ContactForm)
      service: "Scrap Pickup",         // helps you filter these in admin
    };

    try {
      setSubmitting(true);
      await axios.post(`${config.API_URL}/api/createInspection`, payload);
      setSubmitting(false);
      setStep(5);
    } catch (err) {
      console.error("Scrap pickup submission failed:", err);
      setSubmitting(false);
      // show any server message if present
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong while booking your pickup. Please try again.";
      alert(msg);
    }
  };

  /* -------------- city not served -------------- */
  if (citySlug !== ACTIVE_CITY) {
    return (
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl py-16">
        <h1 className="text-3xl sm:4xl font-extrabold mb-4 text-center">
          Scrap Prices
        </h1>
        <div className="rounded-2xl border border-gray-200 p-6 sm:p-8 text-center bg-white shadow-sm">
          <p className="text-base sm:text-lg">
            We’re currently serving only <b>Bangalore</b>.
          </p>
          <p className="text-gray-600 mt-2">“{city}” is coming soon. Stay tuned!</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/scrap")}
              className="px-5 py-2 rounded-xl border hover:bg-gray-50 transition"
            >
              Back to Scrap
            </button>
            <button
              onClick={() => navigate(`/scrap/${ACTIVE_CITY}`)}
              className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
            >
              View Bangalore
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------------- browse (select items) -------------- */
  if (mode === "browse") {
    return (
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl py-8 sm:py-10">
        {/* Page header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center">
            Scrap Prices
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
            Search and add items. Adjust quantities later during checkout.
          </p>
        </div>

        {/* Top controls: city + search */}
       <div className="ml-0 mr-0 sm:ml-2 sm:mr-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-6">
          <button
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl border bg-white text-sm sm:text-base hover:bg-gray-50 transition"
            onClick={() => navigate("/scrap")}
            title="Change city"
          >
            <span className="i-lucide-map-pin" />
            {CITY_LABEL}
            <span className="i-lucide-chevron-down" />
          </button>

          <div className="flex-1">
            <label className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border bg-white focus-within:ring-2 focus-within:ring-green-500">
              <span className="i-lucide-search" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-sm sm:text-base"
                placeholder="Search any materials..."
              />
            </label>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto flex-nowrap scrollbar-hide snap-x">
            {CATEGORIES.map((c) => {
              const active = c === activeCat;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-2xl border text-sm sm:text-base transition snap-start ${
                    active
                      ? "bg-green-700 text-white border-green-700 shadow-sm"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item) => {
            const sel = itemInSelected(item.name);
            return (
              <div
                key={item.name}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-semibold truncate">
                      {item.name}
                    </div>
                    <div className="mt-1 text-green-700 font-semibold text-sm">
                      ₹{item.price}{" "}
                      <span className="font-medium text-gray-600">{item.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.category}</div>
                  </div>

                  {/* controls */}
                  {!sel ? (
                    <button
                      onClick={() => addItem(item)}
                      className="px-4 py-2 rounded-lg bg-[#15803d] text-white hover:bg-[#52852d] text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.name, sel.qty - 1)}
                        className="w-9 h-9 rounded-xl border hover:bg-gray-50 text-lg leading-none focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={sel.qty}
                        onChange={(e) =>
                          updateQty(item.name, Number(e.target.value) || 0)
                        }
                        className="w-16 h-9 rounded-xl border text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-xs text-gray-600">{sel.measure}</span>
                      <button
                        onClick={() => updateQty(item.name, sel.qty + 1)}
                        className="w-9 h-9 rounded-xl border hover:bg-gray-50 text-lg leading-none focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Spacer for sticky */}
        <div className="h-20 sm:h-16" />

        {/* Sticky selection footer */}
        {selected.length > 0 && (
          <div className="fixed left-0 right-0 bottom-0 z-40">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl pb-4">
              <div
                className="
                  rounded-t-2xl sm:rounded-2xl
                  border border-gray-200 bg-white/95 backdrop-blur shadow-lg
                  p-3 sm:p-4
                  flex flex-col sm:flex-row
                  items-stretch sm:items-center
                  gap-2 sm:gap-3
                  pb-[max(env(safe-area-inset-bottom),0px)]
                "
              >
                <div className="text-sm sm:text-base">
                  <b>{selected.length}</b> item(s) selected ·{" "}
                  <span className="text-green-700 font-semibold">₹{totalPrice}</span>{" "}
                  <span className="text-gray-500 text-xs">(est.)</span>
                </div>

                <button
                  onClick={clearAll}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-black hover:bg-red-600 text-sm transition"
                >
                  Clear
                </button>

                <button
                  onClick={() => {
                    setMode("checkout");
                    setStep(1);
                  }}
                  className="w-full sm:w-auto sm:ml-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-[#52852d]  transition"
                >
                  Continue to place order
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Footer nav */}
        <div className="text-center text-xs sm:text-sm text-gray-600">
          Not in {CITY_LABEL}?{" "}
          <Link to="/scrap" className="text-green-700 underline">
            Check other cities
          </Link>
        </div>
        </div>
      </div>
    );
  }
  

  /* -------------- checkout (5-step flow) -------------- */
  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-screen-lg py-8 sm:py-10">
      {/* Header & rate */}
      <div className="flex items-start justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          E-Waste Pickup — Preview Flow
        </h1>
      </div>

      {/* Stepper */}
      <div className="mt-5 mb-6">
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#15803d]  rounded-full transition-all"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
          <div className="relative flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition
                ${n <= step ? "bg-green-600 text-white border-green-600 shadow" : "bg-white text-gray-600 border-gray-300"}`}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6">
        {step === 1 && (
          <Step1Intro
            items={selected}
            onCancel={() => setMode("browse")}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2Quantities
            items={selected}
            setItems={setSelected}
            total={totalPrice}
            onBack={() => setStep(1)}
            onSkip={() => setStep(3)}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Step3Pickup
            pickup={pickup}
            setPickup={setPickup}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <Step4Review
            items={selected}
            pickup={pickup}
            total={totalPrice}
            onEdit={() => setStep(3)}
            onConfirm={submitPickup}
            submitting={submitting}
          />
        )}

        {step === 5 && (
          <Step5Success
            items={selected}
            total={totalPrice}
            pickup={pickup}
            onBookAnother={() => {
              setMode("browse");
              setSelected([]);
              setPickup({ name: "", phone: "", address: "", date: "", time: "", agree: false });
              setStep(1);
            }}
            onTrack={() => alert("Tracking link placeholder")}
          />
        )}
      </div>
    </div>
  );
}

/* -------------------- subcomponents (UI-polished) -------------------- */
function rateSummary(items) {
  if (!items || items.length === 0) return "—";

  // Map to price + normalized unit label ("kg" or "piece(s)")
  const mapped = items.map((it) => ({
    price: Number(it.price) || 0,
    unit: unitLabel(it.unit),
  }));

  const allSameUnit = mapped.every((m) => m.unit === mapped[0].unit);
  const avg = Math.round(
    mapped.reduce((sum, m) => sum + m.price, 0) / mapped.length
  );

  return allSameUnit ? `₹${avg}/${mapped[0].unit}` : `Varies (avg ₹${avg})`;
}

function KeyValue({ label, value }) {
  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Step1Intro({ items, onCancel, onContinue }) {
  return (
    <>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="text-xl font-semibold">Selected Items</div>
          <div className="text-gray-600 mt-1">
            {items.length === 0 ? "No items yet." : "You can adjust quantities next."}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <KeyValue label="Rate" value={rateSummary(items)} />
        <KeyValue label="Pickup type" value="Doorstep" />
      </div>


      <p className="text-gray-600 mt-6">
        Tap continue to start a short, 3-step booking for your pickup.
      </p>

      <div className="mt-6 flex gap-3 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-black hover:bg-gray-50 transition">
          Cancel
        </button>
        <button
          onClick={onContinue}
          className="px-4 py-2 rounded-lg bg-[#15803d]  text-white hover:bg-[#52852d] transition"
        >
          Continue
        </button>
      </div>
    </>
  );
}

function Step2Quantities({ items, setItems, total, onBack, onSkip, onContinue }) {
  const update = (name, nextQty) => {
    setItems((prev) =>
      prev
        .map((s) => (s.name === name ? { ...s, qty: Math.max(0, nextQty) } : s))
        .filter((s) => s.qty > 0)
    );
  };

  const changeMeasure = (name, val) => {
    setItems((prev) => prev.map((s) => (s.name === name ? { ...s, measure: val } : s)));
  };

  return (
    <>
      {/* header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div className="text-xl font-semibold">Quantity</div>
        <div className="text-gray-500 text-sm">Est. price appears live</div>
      </div>

      <div className="mt-3 text-gray-600">
        Enter weight/pieces for each item you want to hand over.
      </div>

      {/* item cards */}
      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-xl border border-gray-200 p-3 sm:p-4">
            <div className="font-medium">{it.name}</div>

            {/* controls: stack on mobile, row on desktop */}
            <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => update(it.name, Number(e.target.value) || 0)}
                className="h-11 rounded-xl border px-3 w-full sm:w-28 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={it.measure}
                onChange={(e) => changeMeasure(it.name, e.target.value)}
                className="h-11 rounded-xl border px-3 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="kg">kg</option>
                <option value="piece(s)">piece(s)</option>
              </select>

              <div className="sm:ml-auto rounded-xl border bg-gray-50 px-4 py-2 text-center w-full sm:w-auto">
                <div className="text-xs text-gray-500">Estimated</div>
                <div className="text-lg font-bold">₹{it.qty * it.price}</div>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Tip: For electronic devices, remove batteries if possible and keep cords bundled.
            </div>
          </div>
        ))}
      </div>

      {/* footer actions: stack on mobile, align like before on desktop */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="rounded-xl border bg-gray-50 px-4 py-2 w-full sm:w-auto text-center sm:text-left">
          <span className="text-xs text-gray-500 mr-2">Total</span>
          <span className="text-lg font-bold">₹{total}</span>
        </div>

        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            onClick={onSkip}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            Skip
          </button>
          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#15803d] text-white hover:bg-[#52852d] transition"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}


function Step3Pickup({ pickup, setPickup, onBack, onContinue }) {
  const set = (k, v) => setPickup((p) => ({ ...p, [k]: v }));

  return (
    <>
      <div className="text-xl font-semibold">Pickup Details</div>
      <div className="text-gray-600">Where and when should we pick up your items?</div>

      <div className="mt-4 space-y-3">
        <input
          value={pickup.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Full name"
          className="w-full rounded-xl border px-4 py-3 bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          value={pickup.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="Phone"
          className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          value={pickup.address}
          onChange={(e) => set("address", e.target.value)}
          rows={3}
          placeholder="Address"
          className="w-full rounded-xl border px-4 py-3 bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="date"
            value={pickup.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={pickup.time}
            onChange={(e) => set("time", e.target.value)}
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a slot</option>
            <option>09:00 - 11:00</option>
            <option>11:00 - 13:00</option>
            <option>13:00 - 15:00</option>
            <option>15:00 - 17:00</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={pickup.agree}
            onChange={(e) => set("agree", e.target.checked)}
          />
          I confirm the items do not contain hazardous liquids and I agree to the pickup terms.
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={onBack} className="px-5 py-2 rounded-xl border hover:bg-gray-50 transition">
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!pickup.name || !pickup.phone || !pickup.address || !pickup.date || !pickup.time || !pickup.agree}
          className="px-4 py-2 rounded-lg bg-[#15803d] hover:bg-[#52852d] text-white disabled:opacity-50 transition"
        >
          Next: Review
        </button>
      </div>
    </>
  );
}

function Line() {
  return <div className="border-t my-4" />;
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function Step4Review({ items, pickup, total, onEdit, onConfirm, submitting = false }) {
  return (
    <>
      <div className="text-xl font-semibold">Confirm Pickup</div>

      <div className="rounded-xl border border-gray-200 p-4 sm:p-5 mt-4">
        <div className="text-gray-600 text-sm">Items</div>
        <Line />
        {items.map((it) => (
          <Row
            key={it.name}
            label={`${it.name} • ${it.qty} ${it.measure}`}
            value={`₹${it.qty * it.price}`}
          />
        ))}
        <Line />
        <Row label={<b>Total</b>} value={<b>₹{total}</b>} />
      </div>

      <div className="rounded-xl border border-gray-200 p-4 sm:p-5 mt-4">
        <div className="text-gray-600 text-sm">Pickup Info</div>
        <Line />
        <div className="font-semibold">
          {pickup.name} • {pickup.phone}
        </div>
        <div className="text-gray-700 mt-1">{pickup.address}</div>
        <div className="text-gray-700 mt-1">
          {pickup.date || "—"} • {pickup.time || "—"}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onEdit} className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
          Edit
        </button>
        <button
          onClick={onConfirm}
          disabled={submitting}
          className={`px-4 py-2 rounded-lg text-white transition ${
            submitting ? "bg-green-900/60 cursor-not-allowed" : "bg-[#15803d] hover:bg-[#52852d]"
          }`}
        >
          {submitting ? "Confirming..." : "Confirm Pickup"}
        </button>
      </div>
    </>
  );
}

function Step5Success({ items, total, pickup, onBookAnother, onTrack }) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-semibold">Pickup Booked!</h2>
        <p className="text-gray-600 mt-2">
          Thanks {pickup.name || "there"}. Your pickup is confirmed for{" "}
          <b>{pickup.date || "—"}</b> at <b>{pickup.time || "—"}</b>. Our team will
          contact you on <b>{pickup.phone || "—"}</b> if needed.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 p-4 sm:p-5 mt-6">
        <div className="flex items-center justify-between">
          <div className="text-gray-600">Item</div>
          <div className="text-gray-600">Est. Price</div>
        </div>
        <div className="border-t my-3" />
        {items.map((it) => (
          <div key={it.name} className="flex items-center justify-between">
            <div className="font-medium">
              {it.qty} {it.measure} {it.name}
            </div>
            <div className="font-semibold">₹{it.qty * it.price}</div>
          </div>
        ))}
        <div className="border-t my-3" />
        <div className="flex items-center justify-between font-semibold">
          <div>Total</div>
          <div>₹{total}</div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onBookAnother} className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
          Book Another
        </button>
        <button
          onClick={onTrack}
          className="px-4 py-2 rounded-lg bg-[#15803d] hover:bg-[#52852d] text-white transition"
        >
          Track Pickup
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs mt-6">
        This preview is a static UI demo. Integrate backend endpoints to persist bookings,
        and replace address with a maps/autocomplete input for a production experience.
      </p>
    </>
  );
}
