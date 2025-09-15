import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCont } from "../../context/MyContext"; // same context used by LoginSignup

export default function MobileBottomLeftCTA({ imgSrc = "/hommlie-thumb.png" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState("");
  const panelRef = useRef(null);

  const sheetTransition = { duration: 0.4, ease: "easeInOut" };

  // Read user from Context first, then localStorage as a fallback
  const { user } = (typeof useCont === "function" ? useCont() : {}) || {};

  const extractName = (u) =>
    u?.user_name ||
    u?.name ||
    u?.username ||
    u?.fullName ||
    u?.given_name ||
    u?.displayName ||
    "";

  // Initialize name from context/localStorage
  useEffect(() => {
    const fromCtx = extractName(user || {});
    if (fromCtx) {
      setUserName(fromCtx);
      return;
    }
    try {
      const ls = JSON.parse(localStorage.getItem("HommlieUser") || "null");
      setUserName(extractName(ls || {}));
    } catch {
      setUserName("");
    }
  }, [user]);

  // Also react to cross-tab/local changes of localStorage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "HommlieUser") {
        try {
          const ls = JSON.parse(e.newValue || "null");
          setUserName(extractName(ls || {}));
        } catch {
          setUserName("");
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isSignedIn = Boolean(userName);

  // Prevent background scroll when open (mobile only)
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="md:hidden">
      {/* Trigger: small image button at bottom-left */}
      <button
        aria-label={open ? "Close Hommlie info" : "Open Hommlie info"}
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-16 left-6 z-[60] rounded-2xl shadow-lg bg-white/90 backdrop-blur border border-slate-200 p-1 active:scale-95 transition"
      >
        <img
          src={imgSrc}
          alt="Open Hommlie details"
          className="h-14 w-14 object-cover rounded-xl"
          loading="eager"
          decoding="async"
        />
      </button>

      {/* Overlay (matches ServiceGrid: fade in/out with same timing) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[70] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={sheetTransition}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Bottom Sheet (matches ServiceGrid mobile modal animation) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            className="fixed inset-0 z-[80] flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={sheetTransition}
            aria-modal="true"
            role="dialog"
            onClick={() => setOpen(false)}
          >
            <motion.div
              ref={panelRef}
              className="bg-white w-full max-w-lg rounded-t-2xl p-4 h-[60vh] overflow-y-auto"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={sheetTransition}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <div className="h-1.5 w-16 mx-auto mb-3 rounded-full bg-slate-200" />
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-300 to-sky-500 rounded-full mb-3" />

              {/* Content */}
              <div
                className="px-1 pt-1 pb-2"
                style={{
                  background:
                    "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
                }}
              >
                <p className="text-sm font-semibold text-slate-700">Avail Upto</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-[42px] leading-none font-black text-slate-900">
                    ₹200
                  </span>
                  <span className="text-2xl leading-none font-extrabold text-slate-900">
                    OFF
                  </span>
                </div>

                {/* Greeting card */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow px-4 py-4">
                  <div className="text-lg font-extrabold text-slate-900">
                    {isSignedIn ? `Hello, ${userName} 👋` : "Welcome to Hommlie 👋"}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {isSignedIn
                      ? "Grab your welcome offer on the first booking."
                      : "Sign in to unlock your welcome offer."}
                  </div>

                  {!isSignedIn && (
                    <div className="mt-4 flex justify-center">
                      <a
                        href="/login"
                        className="inline-flex items-center justify-center px-5 py-2 rounded-2xl font-semibold text-white bg-emerald-900 hover:bg-emerald-800 shadow"
                      >
                        Sign in to unlock
                      </a>
                    </div>
                  )}
                </div>

                {/* Coupon */}
                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-700 text-center">
                    Coupon Code
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <code className="px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 font-extrabold tracking-[0.25em] text-slate-900">
                      HOMMLIEFIRST
                    </code>
                    <button
                      onClick={handleCopy}
                      className={`text-xs px-3 py-2 rounded-xl border bg-white ${
                        copied
                          ? "border-emerald-400 text-emerald-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 text-center">
                    Applicable on your first service booking. Limited time offer.
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="/quickservice"
                  className="mt-5 inline-flex items-center justify-center w-full py-3 rounded-2xl font-bold text-white bg-emerald-900 hover:bg-emerald-800 shadow"
                >
                  BOOK NOW
                </a>

                <p className="mt-4 text-[11px] text-slate-600">
                  By Hommlie Pest Control • Safe chemicals • Trained technicians • Service warranty available.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
