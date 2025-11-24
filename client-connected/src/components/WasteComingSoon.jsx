import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function WasteComingSoon({
  isOpen = true,
  onClose,
  asPage = false,
  leftLogoSrc = "/assets/logo/hommlieloogo.png",
  rightLogoSrc = "/assets/logo/ecospare-logo.png",
  leftAlt = "Hommlie",
  rightAlt = "EcoSphere",
  collabText = "Hommlie × EcoSphere",
}) {
  const Container = ({ children }) =>
    asPage ? (
      <div className="min-h-screen relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
        />
        {children}
      </div>
    ) : (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cs-overlay"
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );

  const ease = { duration: 0.5, ease: "easeOut" };

  const Card = (
    <motion.div
      key="cs-card"
      role="dialog"
      aria-modal={!asPage}
      className={`relative ${
        asPage
          ? "max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
          : "w-full max-w-2xl"
      }`}
      initial={{ y: 28, opacity: 0, scale: asPage ? 1 : 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1, transition: ease }}
      exit={{ y: 24, opacity: 0, transition: ease }}
    >
      <div
        aria-hidden
        className="absolute -inset-2 sm:-inset-3 rounded-[28px] blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(600px 160px at 50% 0%, rgba(3,82,64,0.25), transparent 60%)",
        }}
      />

      {!asPage && (
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-600 hover:text-black p-2 rounded-xl bg-white/80 shadow-sm"
        >
          <FaTimes />
        </button>
      )}

      <section className="relative rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_10px_30px_rgba(3,82,64,0.08)]">
        <div
          className={`${
            asPage
              ? "px-5 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10"
              : "px-5 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-10"
          }`}
        >
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { ...ease, delay: 0.05 } }}
          >
            <img
              src={leftLogoSrc}
              alt={leftAlt}
              className="h-8 sm:h-10 md:h-14 w-auto object-contain"
            />

            <motion.span
              className="relative inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-[#035240] text-white shadow-[0_4px_14px_rgba(3,82,64,0.35)]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: [0.96, 1.02, 1], opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              <span className="relative z-[1]">Collaboration</span>
              <span
                aria-hidden
                className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/15 to-transparent"
              />
              <motion.span
                aria-hidden
                className="absolute top-0 left-0 h-full w-10 bg-white/20 blur-[6px] rounded-full"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "140%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>

            <img
              src={rightLogoSrc}
              alt={rightAlt}
              className="h-12 sm:h-10 md:h-20 w-auto object-contain"
            />
          </motion.div>

          <motion.h1
            className="mt-6 sm:mt-8 text-center text-3xl sm:text-5xl font-extrabold
                       bg-gradient-to-r from-[#013a2e] via-[#0a7c63] to-[#013a2e]
                       bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_0_rgba(0,0,0,0.04)]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { ...ease, delay: 0.2 } }}
          >
            COMING SOON
          </motion.h1>

          <motion.div
            className="mx-auto mt-3 h-1 rounded-full w-28 sm:w-36 origin-center"
            style={{
              background:
                "linear-gradient(90deg, rgba(3,82,64,0.1), #035240 30%, rgba(3,82,64,0.1))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.7, delay: 0.35 } }}
          />

          <motion.p
            className="mt-4 sm:mt-6 text-center text-gray-700 text-sm sm:text-base max-w-2xl mx-auto px-2 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { ...ease, delay: 0.3 } }}
          >
            We’re building a transparent, compliant Waste Management experience for
            homes, communities, and businesses. Stay tuned for launch details.
          </motion.p>

          <motion.div
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...ease, delay: 0.4 } }}
          >
            {["Dry & Wet Waste", "E-Waste", "Bulk Pickup", "Community Drives"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm bg-white/80 backdrop-blur px-3.5 py-1.5 rounded-full text-[#035240] border border-[#035240]/15 shadow-sm"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...ease, delay: 0.5 } }}
          >
            <button
              disabled
              className="cursor-not-allowed inline-flex items-center rounded-xl border border-black/10 bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-gray-700 hover:opacity-90 transition"
            >
              Learn More
            </button>
            <button
              disabled
              className="cursor-not-allowed inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-[#035240] shadow-[0_10px_20px_rgba(3,82,64,0.25)] hover:opacity-90 transition"
            >
              Get a Quote
            </button>
          </motion.div>

          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 pb-1">
            Follow our updates — launch date announced soon.
          </div>
        </div>
      </section>
    </motion.div>
  );

  return (
    <Container>
      {asPage ? (
        <div className="max-w-6xl mx-auto">{Card}</div>
      ) : (
        <AnimatePresence>{isOpen ? Card : null}</AnimatePresence>
      )}
    </Container>
  );
}
