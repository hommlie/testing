import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

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

  /* -------------- city not served -------------- */
  if (citySlug !== ACTIVE_CITY) {
    return (
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-4 xl:px-0 max-w-[1200px] xl:max-w-[1280px] 2xl:max-w-[1360px] py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center">
          Scrap Prices
        </h1>
        <div className="rounded-2xl border p-6 sm:p-8 text-center bg-white shadow-sm">
          <p className="text-base sm:text-lg">
            We’re currently serving only <b>Bangalore</b>.
          </p>
          <p className="text-gray-600 mt-2">“{city}” is coming soon. Stay tuned!</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/scrap")}
              className="px-5 py-2 rounded-xl border hover:bg-gray-50"
            >
              Back to Scrap
            </button>
            <button
              onClick={() => navigate(`/scrap/${ACTIVE_CITY}`)}
              className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
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
      <div
        className="
        mx-auto w-full
        px-4 sm:px-6 lg:px-4 xl:px-0
        max-w-[1200px] xl:max-w-[1180px] 2xl:max-w-[1360px]
        py-8 sm:py-10
      "
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8">
          Scrap Prices
        </h1>

        {/* Top controls: city + search */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-6">
          <div>
            <button
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl border text-sm sm:text-base"
              onClick={() => navigate("/scrap")}
              title="Change city"
            >
              <span className="i-lucide-map-pin" />
              {CITY_LABEL}
              <span className="i-lucide-chevron-down" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border bg-white">
              <span className="i-lucide-search" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-sm sm:text-base"
                placeholder="Search any materials..."
              />
            </div>
          </div>
        </div>

        {/* Category tabs (single-line scroll on mobile) */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto flex-nowrap scrollbar-hide">
          {CATEGORIES.map((c) => {
            const active = c === activeCat;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-2xl border text-sm sm:text-base transition ${
                  active
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item) => {
            const sel = itemInSelected(item.name);
            return (
              <div
                key={item.name}
                className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition"
              >
                {/* header row: info left, controls right */}
                <div className="flex items-start gap-3">
                  {/* left info */}
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

                  {/* right controls */}
                  {!sel ? (
                    <button
                      onClick={() => addItem(item)}
                      className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 text-sm"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.name, sel.qty - 1)}
                        className="w-9 h-9 rounded-xl border hover:bg-gray-50 text-lg leading-none"
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
                        className="w-14 h-9 rounded-xl border text-center text-sm"
                      />
                      <span className="text-xs text-gray-600">{sel.measure}</span>
                      <button
                        onClick={() => updateQty(item.name, sel.qty + 1)}
                        className="w-9 h-9 rounded-xl border hover:bg-gray-50 text-lg leading-none"
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

        {/* Sticky footer for selection */}
        <div className="h-16" />
        {selected.length > 0 && (
          <div className="fixed left-0 right-0 bottom-0 z-40">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-4 xl:px-0 max-w-[1200px] xl:max-w-[1180px] 2xl:max-w-[1360px] pb-4">
              <div className="rounded-2xl border bg-white shadow-lg p-3 sm:p-4 flex items-center gap-3">
                <div className="text-sm sm:text-base">
                  <b>{selected.length}</b> item(s) selected ·{" "}
                  <span className="text-green-700 font-semibold">₹{totalPrice}</span>{" "}
                  <span className="text-gray-500 text-xs"> (est.)</span>
                </div>
                <button
                  onClick={clearAll}
                  className="ml-2 px-3 py-2 rounded-xl border hover:bg-gray-50 text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={() => {
                    setMode("checkout");
                    setStep(1);
                  }}
                  className="ml-auto px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  Continue to place order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-gray-600">
          Not in {CITY_LABEL}?{" "}
          <Link to="/scrap" className="text-green-700 underline">
            Check other cities
          </Link>
        </div>
      </div>
    );
  }

  /* -------------- checkout (5-step flow) -------------- */
  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-4 xl:px-0 max-w-[900px] py-8 sm:py-10">
      {/* Header & rate */}
      <div className="flex items-start justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          E-Waste Pickup — Preview Flow
        </h1>
        <div className="text-sm text-gray-600">Rate: ₹120/kg</div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-3 mt-4 mb-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`w-9 h-9 rounded-full flex items-center justify-center border ${
              n <= step
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600"
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="rounded-2xl border bg-white shadow-sm p-5 sm:p-6">
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
            onConfirm={() => setStep(5)}
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

/* -------------------- steps -------------------- */

function KeyValue({ label, value }) {
  return (
    <div className="flex-1 rounded-xl border bg-gray-50 px-4 py-3">
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
        <KeyValue label="Rate" value="₹120/kg" />
        <KeyValue label="Pickup type" value="Doorstep" />
      </div>

      <p className="text-gray-600 mt-6">
        Tap continue to start a short, 3-step booking for your pickup.
      </p>

      <div className="mt-6 flex gap-3 justify-end">
        <button onClick={onCancel} className="px-5 py-2 rounded-xl border hover:bg-gray-50">
          Cancel
        </button>
        <button
          onClick={onContinue}
          className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
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
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Quantity</div>
        <div className="text-gray-500 text-sm">Est. price appears live</div>
      </div>

      <div className="mt-3 text-gray-600">
        Enter weight/pieces for each item you want to hand over.
      </div>

      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-xl border p-3 sm:p-4">
            <div className="font-medium">{it.name}</div>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => update(it.name, Number(e.target.value) || 0)}
                className="w-28 h-11 rounded-xl border px-3 focus:outline-none"
              />
              <select
                value={it.measure}
                onChange={(e) => changeMeasure(it.name, e.target.value)}
                className="h-11 rounded-xl border px-3"
              >
                <option value="kg">kg</option>
                <option value="piece(s)">piece(s)</option>
              </select>

              <div className="ml-auto rounded-xl border bg-gray-50 px-4 py-2 text-center">
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

      <div className="mt-4 flex items-center justify-between">
        <div className="rounded-xl border bg-gray-50 px-4 py-2">
          <span className="text-xs text-gray-500 mr-2">Total</span>
          <span className="text-lg font-bold">₹{total}</span>
        </div>

        <div className="flex gap-3">
          <button onClick={onBack} className="px-5 py-2 rounded-xl border hover:bg-gray-50">
            Back
          </button>
          <button onClick={onSkip} className="px-5 py-2 rounded-xl border hover:bg-gray-50">
            Skip
          </button>
          <button
            onClick={onContinue}
            className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
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
          className="w-full rounded-xl border px-4 py-3 bg-blue-50/40"
        />
        <input
          value={pickup.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="Phone"
          className="w-full rounded-xl border px-4 py-3"
        />
        <textarea
          value={pickup.address}
          onChange={(e) => set("address", e.target.value)}
          rows={3}
          placeholder="Address"
          className="w-full rounded-xl border px-4 py-3 bg-blue-50/40"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="date"
            value={pickup.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
          <select
            value={pickup.time}
            onChange={(e) => set("time", e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
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
        <button onClick={onBack} className="px-5 py-2 rounded-xl border hover:bg-gray-50">
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!pickup.name || !pickup.phone || !pickup.address || !pickup.date || !pickup.time || !pickup.agree}
          className="px-5 py-2 rounded-xl bg-green-600 text-white disabled:opacity-50 hover:bg-green-700"
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

function Step4Review({ items, pickup, total, onEdit, onConfirm }) {
  return (
    <>
      <div className="text-xl font-semibold">Confirm Pickup</div>

      <div className="rounded-xl border p-4 sm:p-5 mt-4">
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

      <div className="rounded-xl border p-4 sm:p-5 mt-4">
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
        <button onClick={onEdit} className="px-5 py-2 rounded-xl border hover:bg-gray-50">
          Edit
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
        >
          Confirm Pickup
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

      <div className="rounded-xl border p-4 sm:p-5 mt-6">
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
        <button onClick={onBookAnother} className="px-5 py-2 rounded-xl border hover:bg-gray-50">
          Book Another
        </button>
        <button
          onClick={onTrack}
          className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
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
