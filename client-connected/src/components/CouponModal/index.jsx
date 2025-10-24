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
    getCoupons(""); // empty query → normal list (defaults only)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
    <div className="fixed inset-0 z-20 flex items-center justify-center">
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
        style={{ backgroundColor: "#F6F1F7" }}
        className="relative w-[80%] md:w-full max-w-[25rem] max-h-[35rem] pb-4 overflow-y-scroll rounded-2xl overflow-hidden z-30 scrollbar-hide"
      >
        <div className="relative flex flex-row gap-2 items-center justify-center w-full bg-white p-4">
          <button onClick={onClose}>
            <IoMdArrowRoundBack className="absolute left-4 w-4 h-4" />
          </button>
          <h2 className="font-bold text-center">Apply Coupon</h2>
        </div>

        {/* If a coupon was just applied, show success card (like the reference UI) */}
        {appliedCoupon ? (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow-xl w-full p-6 text-center" style={{ borderRadius: 16 }}>
              <div className="flex justify-center mb-2">
                {/* simple confetti emoji/icon */}
                <div className="text-4xl" aria-hidden>
                  🎉
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>

              <p className="text-sm text-gray-700 mb-2">
                Your coupon <strong>"{appliedCoupon.coupon_name}"</strong> has been successfully applied.
              </p>

              <p className="text-base font-semibold text-green-700 mb-4 flex items-center justify-center gap-2">
                <span style={{ fontSize: 18 }}>💰</span>
                You saved ₹{Number(appliedCoupon.calculatedDiscount || 0)} on this order!
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-3 rounded-md text-white font-semibold"
                style={{ backgroundColor: "#1E9A56" }}
              >
                Continue
              </button>

              <button
                onClick={handleRemoveCoupon}
                className="mt-3 text-sm text-gray-500"
                style={{ background: "transparent" }}
              >
                Remove Coupon
              </button>
            </div>
          </div>
        ) : (
            <>
            <div className="flex flex-row gap-2 items-center justify-center w-full px-4 my-4">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            className="w-4/5 h-10 rounded-md pl-4"
            placeholder="Enter Coupon Code"
          />
          <button
            onClick={handleApply}
            className="w-1/5 font-bold"
            style={{ color: "#FF3269" }}
          >
            APPLY
          </button>
        </div>

        {errorMsg && (
          <div className="px-4">
            <p className="text-sm text-red-500">{errorMsg}</p>
          </div>
        )}

        {/* List of coupons from server */}
        <div className="flex flex-col gap-4 justify-center w-full px-4 my-2">
          <h3 className="font-bold">Available Coupons</h3>

          {(!coupons || coupons.length === 0) && (
            <div className="p-4">
              <img src={NoResultFoundImg} alt="No coupons" />
            </div>
          )}

      {coupons?.map((cp, index) => (
            <div
              key={index}
              className="relative bg-white rounded-md shadow-md p-2 px-8 space-y-3"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text-xl font-bold">{cp.coupon_name}</span>
                </div>
                <div className="w-1/5">
                  <button
                    onClick={() => validateAndApply(cp.coupon_name)}
                    className="font-bold"
                    style={{ color: "#FF3269" }}
                  >
                    APPLY
                  </button>
                </div>
              </div>

              <div className="" style={{ border: "1px dashed #E5E7EB" }}></div>

              <div>
                {cp?.amount != null && cp.amount !== "" ? (
                  <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
                    ₹{Number(cp.amount)} OFF
                  </p>
                ) : cp?.percentage != null && cp.percentage !== "" ? (
                  <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
                    {cp.percentage}% OFF
                  </p>
                ) : null}
              </div>

              <div
                className="absolute top-4 -left-4 w-3 h-3 md:w-7 md:h-7 rounded-full"
                style={{ backgroundColor: "#F6F1F7" }}
              ></div>
              <div
                className="absolute top-4 -right-4 w-3 h-3 md:w-7 md:h-7 rounded-full"
                style={{ backgroundColor: "#F6F1F7" }}
              ></div>
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
