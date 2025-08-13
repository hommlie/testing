import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import womenEmp1 from "../../assets/images/women-emp-1.png";
import womenEmp2 from "../../assets/images/women-emp-2.png";
import womenEmp3 from "../../assets/images/women-emp-3.png";
import womenEmp4 from "../../assets/images/women-emp-4.png";
import womenEmpBg1 from "../../assets/images/women-emp-bg-1.png";
import womenEmpBg2 from "../../assets/images/women-emp-bg-2.png";
import { useToast } from "../../context/ToastProvider";

export default function WomenEmpowerment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = useToast();
  const successNotify = (msg) => notify(msg, "success");
  const errorNotify = (msg) => notify(msg, "error");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  // lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    // keep only digits for mobile
    if (id === "mobile") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, mobile: digits }));
      return;
    }
    setFormData((p) => ({ ...p, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${config.API_URL}/api/createpartnerform`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        successNotify("Thank you! Our team will contact you soon!");
        setFormData({ name: "", mobile: "", message: "" });
        setIsModalOpen(false);
      } else {
        errorNotify("Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      errorNotify("An error occurred. Please try again later.");
    }
  };

  return (
    <main className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-20 py-8 sm:py-10 lg:py-12 flex flex-col gap-10 sm:gap-12 lg:gap-16 overflow-x-hidden">
      {/* floating bg art (hidden on small) */}
      <img
        className="hidden xl:block pointer-events-none select-none absolute -left-2 top-[280px] max-w-none"
        src={womenEmpBg1}
        alt=""
        loading="lazy"
      />
      <img
        className="hidden xl:block pointer-events-none select-none absolute -right-2 top-[240px] max-w-none"
        src={womenEmpBg2}
        alt=""
        loading="lazy"
      />

      {/* HERO */}
      <section className="text-center flex flex-col gap-6 sm:gap-8 lg:gap-10">
        <h1 className="flex flex-col gap-2 sm:gap-3">
          <span
            className="text-2xl sm:text-3xl lg:text-5xl font-bold"
            style={{ color: "#035240", fontFamily: "Lobster" }}
          >
            Welcome to Hommlie
          </span>
          <span
            className="text-xl sm:text-2xl lg:text-4xl font-bold"
            style={{ color: "#ECB3A9", fontFamily: "Lobster" }}
          >
            Empowering Women, One Home at a Time
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-xl font-medium leading-relaxed text-gray-700">
          At Hommlie, we're committed to empowering women in every aspect of our
          business. From leadership opportunities to entrepreneurship, we
          provide women with the tools and support they need to thrive.
        </p>

        <div className="flex justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-40 px-5 py-2.5 rounded-3xl text-white font-semibold shadow-sm active:scale-[0.98]"
            style={{ backgroundColor: "#035240" }}
          >
            Join Now
          </button>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="flex flex-col gap-10 sm:gap-14 lg:gap-20">
        {/* Block title */}
        <div className="w-full py-2 sm:py-4">
          <div className="w-full sm:w-11/12 md:w-4/5 lg:w-1/2 space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl font-bold">
              <span style={{ color: "#035240" }}>Our Commitment to </span>
              <span style={{ color: "#ECB3A9" }}>Women</span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              We're dedicated to fostering an environment where women feel
              valued, respected, and empowered to succeed. From our management
              team to our service providers, women are at the heart of
              everything we do.
            </p>
          </div>
        </div>

        <div className="border-t border-dotted border-gray-200 md:hidden" />

        {/* 1 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="md:w-1/2 w-full">
            <img
              src={womenEmp1}
              alt="Empowering Women Through Entrepreneurship"
              className="w-full h-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 w-full space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl font-bold">
              <span style={{ color: "#035240" }}>Empowering Women Through </span>
              <span style={{ color: "#ECB3A9" }}>Entrepreneurship</span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              We’re building pathways for women to lead and grow. From
              micro-entrepreneur programs to partner networks, we help transform
              skill into sustainable income.
            </p>
          </div>
        </div>

        <div className="border-t border-dotted border-gray-200 md:hidden" />

        {/* 2 */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center gap-4 sm:gap-6">
          <div className="md:w-1/2 w-full">
            <img
              src={womenEmp2}
              alt="Supporting Women-Owned Businesses"
              className="w-full h-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 w-full space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl font-bold">
              <span style={{ color: "#035240" }}>Supporting Women-Owned </span>
              <span style={{ color: "#ECB3A9" }}>Businesses</span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              We prioritize sourcing from women-led companies. Partnering with
              us means you’re also uplifting women in business across Bangalore.
            </p>
          </div>
        </div>

        <div className="border-t border-dotted border-gray-200 md:hidden" />

        {/* 3 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="md:w-1/2 w-full">
            <img
              src={womenEmp3}
              alt="Education and Training"
              className="w-full h-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 w-full space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl font-bold">
              <span style={{ color: "#035240" }}>Empowering Women Through </span>
              <span style={{ color: "#ECB3A9" }}>Education & Training</span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Our training programs build confidence and capability—covering
              safety, customer experience, business skills, and service
              excellence.
            </p>
          </div>
        </div>

        <div className="border-t border-dotted border-gray-200 md:hidden" />

        {/* 4 */}
        <div className="w-full flex flex-col md:flex-row-reverse items-center gap-4 sm:gap-6">
          <div className="md:w-1/2 w-full">
            <img
              src={womenEmp4}
              alt="Work-Life Balance"
              className="w-full h-auto rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2 w-full space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl font-bold">
              <span style={{ color: "#035240" }}>Promoting Work‑Life </span>
              <span style={{ color: "#ECB3A9" }}>Balance</span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              Flexible schedules and supportive policies help women thrive at
              work and at home—without compromise.
            </p>
          </div>
        </div>

        <div className="border-t border-dotted border-gray-200 md:hidden" />

        {/* Celebrating */}
        <div className="w-full py-2 sm:py-4 flex justify-center items-center">
          <div className="w-full md:w-4/5 lg:w-1/2 space-y-3 sm:space-y-4 text-center">
            <p className="text-xl sm:text-2xl font-bold">
              <span style={{ color: "#035240" }}>Celebrating Women’s </span>
              <span style={{ color: "#ECB3A9" }}>Achievements</span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              From small victories to major milestones, we proudly recognize the
              contributions of women to our organization and communities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section
        className="relative w-full overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-12 flex items-center justify-center"
        style={{ backgroundColor: "#B8DCD4" }}
      >
        {/* Decorative SVGs: large only */}
        <svg
          className="hidden xl:block absolute left-0"
          width="111"
          height="204"
          viewBox="0 0 111 204"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* …paths unchanged for brevity… */}
        </svg>

        <div className="w-full max-w-3xl text-center space-y-4 sm:space-y-6 z-10">
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-bold"
            style={{ color: "#035240" }}
          >
            Join Us in Empowering Women
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed">
            Join Hommlie and be part of our mission. Whether starting your own
            business, supporting women‑owned enterprises, or using our services,
            your partnership helps create a more inclusive world.
          </p>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 sm:px-10 py-2.5 rounded-xl font-semibold text-white shadow-sm active:scale-[0.98]"
              style={{ backgroundColor: "#035240" }}
            >
              Join the Hommlie Community
            </button>
          </div>
        </div>

        {/* Right/top SVGs */}
        <svg
          className="hidden xl:block absolute right-0 top-0"
          width="165"
          height="222"
          viewBox="0 0 165 222"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* …paths unchanged for brevity… */}
        </svg>
        <svg
          className="hidden xl:block absolute right-52 bottom-0"
          width="154"
          height="109"
          viewBox="0 0 154 109"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* …paths unchanged for brevity… */}
        </svg>
      </section>

      {/* MODAL */}
      {isModalOpen && <JoinModal onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} formData={formData} handleChange={handleChange} />}
    </main>
  );
}

/** Accessible modal extracted for clarity */
function JoinModal({ onClose, onSubmit, formData, handleChange }) {
  const dialogRef = useRef(null);
  const backdropRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus first input on open
  useEffect(() => {
    const first = dialogRef.current?.querySelector("input,textarea,button");
    first?.focus();
  }, []);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-title"
    >
      <div
        ref={dialogRef}
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <h2
            id="join-title"
            className="text-lg sm:text-2xl font-bold"
            style={{ color: "#035240" }}
          >
            Join Hommlie Community
          </h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm border border-gray-300 hover:bg-gray-50"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              inputMode="numeric"
              pattern="[0-9]{10}"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
              required
              placeholder="10-digit mobile number"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a 10‑digit Indian mobile number.
            </p>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:ring-green-500"
              required
              placeholder="Tell us a bit about you"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: "#035240" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
