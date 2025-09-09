// FloatingPromoDrawer.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCont } from "../../context/MyContext"; // same context as LoginSignup
import LoginSignup from "../../components/LoginModal";

export default function FloatingPromoDrawer() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // controls LoginSignup modal
  const copyTimer = useRef(null);

  // get user from context (primary) or localStorage (fallback)
  const { user } = useCont?.() || {};
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("HommlieUser") || "null");
    } catch {
      return null;
    }
  })();

  const getUserName = () => {
    const u = user && Object.keys(user).length ? user : storedUser || {};
    return (
      u?.user_name ||
      u?.name ||
      u?.username ||
      u?.fullName ||
      u?.given_name ||
      u?.displayName ||
      ""
    );
  };
  const userName = getUserName();
  const isSignedIn = Boolean(userName);

  // restore state
  useEffect(() => {
    const saved = sessionStorage.getItem("hommliePromoOpen");
    if (saved) setOpen(saved === "true");
  }, []);
  useEffect(() => {
    sessionStorage.setItem("hommliePromoOpen", String(open));
  }, [open]);

  // cleanup
  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const handleCopy = async () => {
    const code = "HOMMLIEFIRST";
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  // NEW: close drawer, then open Login modal after animation (matches spring ~250-300ms)
  const openLoginModal = () => {
    setOpen(false);
    window.setTimeout(() => setShowLogin(true), 300);
  };

 const VerticalHandle = ({
  direction = "left",
  onClick,
  ariaLabel,
  variant = "brand",          // 👈 pick: brand | slate | emerald | rose | glass
  text = "UPTO ₹200 OFF",
}) => {
  const isLeft = direction === "left";

  // Theme tokens
  const VARIANTS = {
    brand: {
      bg: "linear-gradient(180deg, #16a085 0%, #0f8a6f 45%, #035240 100%)",
      shard: "#035240",
      label: "#ffffff",
      sheen: "rgba(255,255,255,0.18)",
      ring: "rgba(255,255,255,0.18)",
      backdrop: "",
    },
    slate: {
      bg: "linear-gradient(180deg, #64748b 0%, #475569 50%, #374151 100%)",
      shard: "#475569",
      label: "#ffffff",
      sheen: "rgba(255,255,255,0.15)",
      ring: "rgba(255,255,255,0.10)",
      backdrop: "",
    },
    emerald: {
      bg: "linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)",
      shard: "#059669",
      label: "#042f2e",
      sheen: "rgba(255,255,255,0.20)",
      ring: "rgba(255,255,255,0.16)",
      backdrop: "",
    },
    rose: {
      bg: "linear-gradient(180deg, #fb7185 0%, #f43f5e 50%, #e11d48 100%)",
      shard: "#e11d48",
      label: "#ffffff",
      sheen: "rgba(255,255,255,0.15)",
      ring: "rgba(255,255,255,0.12)",
      backdrop: "",
    },
    glass: {
      bg: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.12))",
      shard: "#94a3b8",
      label: "#0f172a",
      sheen: "rgba(255,255,255,0.35)",
      ring: "rgba(255,255,255,0.30)",
      backdrop: "blur(8px) saturate(120%)", // frosted
    },
  };
  const V = VARIANTS[variant] || VARIANTS.brand;

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="group"
      initial={false}
      whileHover={{ x: isLeft ? -4 : 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative h-56 w-16 rounded-l-3xl overflow-hidden flex items-center justify-center shadow-[0_16px_40px_-12px_rgba(2,6,23,0.45)]"
        style={{ background: V.bg, backdropFilter: V.backdrop }}
      >
        {/* glossy edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-l-3xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
          }}
        />
        {/* inner ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-l-3xl"
          style={{ boxShadow: `inset 0 0 0 1px ${V.ring}` }}
        />

        {/* moving sheen */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-y-1 -left-14 w-12 rotate-12 blur-md"
          style={{ background: V.sheen }}
          animate={{ x: isLeft ? [0, 96, 0] : [96, 0, 96] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* directional shard */}
        {isLeft ? (
          <span
            aria-hidden
            className="absolute -left-2 top-1/2 -translate-y-1/2 border-y-8 border-y-transparent border-r-8 drop-shadow-[0_2px_6px_rgba(2,6,23,0.35)]"
            style={{ borderRightColor: V.shard }}
          />
        ) : (
          <span
            aria-hidden
            className="absolute -right-2 top-1/2 -translate-y-1/2 border-y-8 border-y-transparent border-l-8 drop-shadow-[0_2px_6px_rgba(2,6,23,0.35)]"
            style={{ borderLeftColor: V.shard }}
          />
        )}

        {/* label */}
        <span
          className="block rotate-90 origin-center whitespace-nowrap tracking-[0.35em] font-black text-[12.5px] leading-tight drop-shadow-[0_1px_0_rgba(0,0,0,0.25)] transition-colors duration-200 group-hover:brightness-110"
          style={{ color: V.label, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          {text}
        </span>

        {/* hover accent glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(120px 60px at 80% 20%, rgba(255,255,255,0.10), transparent 60%)",
          }}
        />
      </div>
    </motion.button>
  );
};


  return (
    <>
      
{!open && (
  <div className="fixed right-0 top-1/3 z-[60]">
    <VerticalHandle
      direction="left"
      ariaLabel="Show Hommlie offer"
      onClick={() => setOpen(true)}
      variant="brand"       
      text="UPTO ₹200 OFF"
    />
  </div>
)}

{/* attached handle on the drawer */}
<div className="absolute -left-16 top-1/3 z-[71] hidden md:block">
  <VerticalHandle
    direction="right"
    ariaLabel="Hide Hommlie offer"
    onClick={() => setOpen(false)}
    variant="brand"
    text="UPTO ₹200 OFF"
  />
</div>


      <AnimatePresence>
        {open && (
          <motion.aside
            key="promo"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed right-0 top-0 h-full w-[360px] max-w-[92vw] z-[70] shadow-2xl"
            role="dialog"
            aria-modal="true"
            style={{
              background:
                "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)"
            }}
          >
            {/* ATTACHED HANDLE: hidden on mobile, visible on md+ */}
            <div className="absolute -left-16 top-1/3 z-[71] hidden md:block">
              <VerticalHandle
                direction="right"
                ariaLabel="Hide Hommlie offer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* content */}
            <div className="h-full flex flex-col">
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-sky-400" />

              {/* Close button (needed on mobile since handle is hidden) */}
              <button
                onClick={() => setOpen(false)}
                className="ml-auto m-3 rounded-full p-2 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Close offer"
                title="Close"
                type="button"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="px-6 pb-7 -mt-2">
                <p className="text-sm font-semibold text-slate-700">Avail Upto</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-5xl font-black text-slate-900 leading-none">₹200</span>
                  <span className="text-2xl font-extrabold text-slate-900 leading-none">OFF</span>
                </div>

                {/* Greeting / welcome card */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-md px-4 py-5 text-center">
                  <div className="text-xl font-bold">
                    {isSignedIn ? `Hello, ${userName} 👋` : "Welcome to Hommlie 👋"}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {isSignedIn
                      ? "Grab your welcome offer on the first booking."
                      : "Sign in to unlock your welcome offer."}
                  </div>

                  {/* Sign-in CTA (only when NOT signed in) */}
                  {!isSignedIn && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={openLoginModal}  // ← CLOSE DRAWER, THEN OPEN MODAL
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white bg-[#035240] hover:bg-[#024235] shadow"
                      >
                        Sign in to unlock
                      </button>
                    </div>
                  )}
                </div>

                {/* Coupon block */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700 ml-28">Coupon Code</p>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="ml-16 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-extrabold tracking-widest text-slate-900">
                      HOMMLIEFIRST
                    </code>
                    <button
                      onClick={handleCopy}
                      type="button"
                      className={`text-xs px-2 py-1 rounded-lg border bg-slate-50 hover:bg-slate-100 ${
                        copied
                          ? "border-emerald-400 text-emerald-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                      aria-live="polite"
                      aria-label={copied ? "Coupon code copied" : "Copy coupon code"}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">
                    Applicable on your first service booking.Limited time offer.
                  </p>
                </div>

                <a
                  href="/quickservice"
                  className="mt-6 inline-flex items-center justify-center w-full py-3 rounded-2xl font-bold text-white bg-[#035240] hover:bg-[#024235] shadow"
                >
                  BOOK NOW
                </a>

                {/* <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-semibold text-slate-900">Genuine</div>
                    <div className="text-slate-600">Products</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-semibold text-slate-900">Try &amp; Buy</div>
                    <div className="text-slate-600">Eligible*</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-semibold text-slate-900">Easy</div>
                    <div className="text-slate-600">Rescheduling</div>
                  </div>
                </div> */}

                <div className="mt-5 text-[11px] text-slate-600">
                  By Hommlie Pest Control • Safe chemicals • Trained technicians • Service warranty available.
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Login modal mount (only when needed) */}
      {showLogin && (
        <LoginSignup
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
}
