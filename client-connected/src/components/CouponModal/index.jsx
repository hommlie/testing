// CouponModal.jsx
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCont } from "../../context/MyContext";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import config from "../../config/config";
import couponSucess from "../Lotties/couponSuccess.json";
import NoResultFoundImg from "../../assets/images/noresultfound.svg";
import { motion } from "framer-motion";

const CouponModal = ({ isOpen, onClose, totalAmount, cat_id }) => {
  const { selectedCoupon, setSelectedCoupon } = useCont();
  const [searchTerm, setSearchTerm] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [enableLottie, setEnableLottie] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // derive user id from stored decoded token
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("HommlieUser") || "null");
    } catch {
      return null;
    }
  })();
  const userId = storedUser?.id || storedUser?.user_id || null;

  // helper: clamp discount to not exceed payable
  const clampDiscount = (raw) => {
    const safeTotal = Number(totalAmount) || 0;
    const d = Number(raw) || 0;
    return Math.max(0, Math.min(d, safeTotal));
  };

  const calculateDiscount = (coupon) => {
    // Prefer server-provided calculatedDiscount when available
    if (coupon?.calculatedDiscount != null) {
      return clampDiscount(coupon.calculatedDiscount);
    }
    // Fallback: compute on FE
    if (coupon?.amount != null && coupon.amount !== "") {
      return clampDiscount(Number(coupon.amount)); // flat ₹
    } else if (coupon?.percentage != null && coupon.percentage !== "") {
      return clampDiscount(
        (Number(totalAmount) * Number(coupon.percentage)) / 100
      );
    }
    return 0;
  };

  // ---- API: fetch coupons (now supports search) ----------------------------
  async function getCoupons(queryText = "") {
    try {
      const response = await axios.post(`${config.API_URL}/api/coupons`, {
        cat_id,
        user_id: userId, // backend may hide first-time coupon for old users on normal list
        query: queryText, // empty => only defaults; non-empty => search (includes non-default)
      });
      const rows = response.data.status === 1 ? response.data.data : [];
      setCoupons(rows);
    } catch (error) {
      console.log("error getting coupons:", error);
      setCoupons([]);
    }
  }

  // open → load default visible coupons (is_default = 1)
  useEffect(() => {
    if (!isOpen) return;
    setSearchTerm("");
    if (selectedCoupon && selectedCoupon.coupon_name) {
      setAppliedCoupon(selectedCoupon);
    } else {
      setAppliedCoupon(null);
    }
    getCoupons(""); // empty query → normal list (defaults only)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedCoupon]);

  // search: ask server so it can include is_default = 0 when name matches
  const handleSearch = (value) => {
    setSearchTerm(value);
    getCoupons(value); // server returns matching coupons (any is_default)
  };

  // Always validate with backend → compute once → clamp → apply
  const validateAndApply = async (code) => {
    const trimmed = (code || "").trim();
    if (!trimmed) return;

    try {
      const resp = await axios.post(`${config.API_URL}/api/applycoupons`, {
        coupon_name: trimmed,
        user_id: userId,
        // optional: total_amount: totalAmount, // if you also clamp at backend
      });

      if (resp.data.status === 1 && resp.data.data) {
        const srv = resp.data.data;
        setErrorMsg(null);

        // If backend sent a value (flat amount), use it; else compute here
        let base = srv.calculatedDiscount;
        if (base == null || base === 0) {
          if (srv.amount != null && srv.amount !== "") {
            base = Number(srv.amount);
          } else if (srv.percentage != null && srv.percentage !== "") {
            base =
              (Number(totalAmount) * Number(srv.percentage)) / 100;
          } else {
            base = 0;
          }
        }
        const discount = clampDiscount(base);
        applySelectedCoupon({ ...srv, calculatedDiscount: discount });
      } else {
        const msg = resp.data.message || "Invalid or ineligible coupon";
        setErrorMsg(msg);
        return; // do not proceed
      }
    } catch (err) {
      console.log("applycoupons error:", err);
      setErrorMsg("Failed to validate coupon. Please try again.");
    }
  };

  const handleApply = async () => {
    await validateAndApply(searchTerm);
  };

  const applySelectedCoupon = (coupon) => {
    const discount = calculateDiscount(coupon);
    const payload = { ...coupon, calculatedDiscount: discount };

    setAppliedCoupon(payload);
    setSelectedCoupon(payload);
    localStorage.setItem("HommlieselectedCoupon", JSON.stringify(payload));

    // show success UI (keep lottie briefly for delight)
    setEnableLottie(true);
    setTimeout(() => {
      setEnableLottie(false);
      // keep modal open so user can see success card and act (Continue / Remove)
    }, 1200);
  };

  const handleContinue = () => {
    // Close the modal but keep the applied coupon in context/localStorage
    onClose();
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setSelectedCoupon(null);
    localStorage.removeItem("HommlieselectedCoupon");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="fixed inset-0 opacity-60"
        style={{ backgroundColor: "black" }}
        onClick={onClose}
      ></div>

      {enableLottie && (
        <Player
          autoplay
          loop
          src={couponSucess}
          className="absolute top-0 left-0 w-full h-full"
        />
      )}

      <div
        className="relative w-[90%] md:w-full max-w-[25rem] max-h-[90vh] pb-4 overflow-y-auto bg-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] z-30 scrollbar-hide"
      >
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-50 p-6 flex items-center">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
          >
            <IoMdArrowRoundBack className="w-5 h-5 text-gray-900" />
          </button>
          <h2 className="flex-1 text-center font-black text-gray-900 mr-10 uppercase tracking-widest text-sm">Apply Coupon</h2>
        </div>

        {/* If a coupon was just applied, show success card (like the reference UI) */}
        {appliedCoupon ? (
          <div className="flex flex-col items-center justify-center p-6 bg-white min-h-[320px]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 shadow-inner border border-green-100">
                <div className="text-3xl animate-bounce" aria-hidden>🎉</div>
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Congratulations!</h2>

              <div className="bg-gray-50 px-3 py-1.5 rounded-full mb-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Coupon <span className="text-[#6759ff]">"{appliedCoupon.coupon_name}"</span> Applied
                </p>
              </div>

              <div className="flex items-center gap-3 bg-green-50/50 px-5 py-3 rounded-2xl border border-green-100 mb-6 w-full justify-center shadow-sm">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg shadow-green-200">
                  ₹
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-tighter leading-none mb-1">Total Savings</p>
                  <p className="text-xl font-black text-green-700 leading-none">
                    Saved ₹{Number(appliedCoupon.calculatedDiscount || 0).toFixed(0)}!
                  </p>
                </div>
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full py-4 rounded-xl text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-green-200 transition-all hover:shadow-green-300 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ backgroundColor: "#1E9A56" }}
                >
                  Continue
                </button>

                <button
                  onClick={handleRemoveCoupon}
                  className="w-full py-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  Remove Coupon
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="px-6 py-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  value={searchTerm}
                  className="w-full h-14 rounded-2xl pl-6 pr-24 border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#6759ff]/20 focus:border-[#6759ff] transition-all outline-none text-sm font-bold placeholder:text-gray-300 shadow-inner"
                  placeholder="Enter Coupon Code"
                />
                <button
                  onClick={handleApply}
                  className="absolute right-2 h-10 px-6 bg-white text-[#6759ff] font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm border border-gray-100 hover:bg-[#6759ff] hover:text-white transition-all active:scale-95"
                >
                  APPLY
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="px-8 mb-2">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errorMsg}</p>
              </div>
            )}

            {/* List of coupons from server */}
            <div className="flex flex-col gap-4 justify-center w-full px-6 my-4">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">Available Coupons</h3>

              {(!coupons || coupons.length === 0) && (
                <div className="p-8 flex flex-col items-center">
                  <img src={NoResultFoundImg} alt="No coupons" className="w-32 h-32 opacity-20 mb-4" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No active offers</p>
                </div>
              )}

              {coupons?.map((cp, index) => (
                <div
                  key={index}
                  className="relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#6759ff]" />
                  <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-gray-900 group-hover:text-[#6759ff] transition-colors">{cp.coupon_name}</span>
                      <div className="mt-1">
                        {cp?.amount != null && cp.amount !== "" ? (
                          <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-tighter">
                            ₹{Number(cp.amount)} FLAT DISCOUNT
                          </span>
                        ) : cp?.percentage != null && cp.percentage !== "" ? (
                          <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-tighter">
                            {cp.percentage}% OFF ON TOTAL
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <button
                      onClick={() => validateAndApply(cp.coupon_name)}
                      className="text-xs font-black text-[#6759ff] uppercase tracking-widest bg-[#eef5ff] px-4 py-2 rounded-lg hover:bg-[#6759ff] hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      APPLY
                    </button>
                  </div>

                  {cp.description && (
                    <p className="mt-3 text-[10px] text-gray-400 font-medium leading-relaxed italic">
                      {cp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CouponModal;
