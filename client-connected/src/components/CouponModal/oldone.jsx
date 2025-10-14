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
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [enableLottie, setEnableLottie] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // derive user id from stored decoded token
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("HommlieUser") || "null"); }
    catch { return null; }
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
      return clampDiscount(Number(coupon.amount)); // flat ₹ (HOMMLIEFIRST uses this)
    } else if (coupon?.percentage != null && coupon.percentage !== "") {
      return clampDiscount((Number(totalAmount) * Number(coupon.percentage)) / 100);
    }
    return 0;
  };

  async function getCoupons() {
    setCoupons([]);
    try {
      const response = await axios.post(`${config.API_URL}/api/coupons`, {
        cat_id,
        user_id: userId, // let backend hide HOMMLIEFIRST for old users
      });
      if (response.data.status === 1) {
        setCoupons(response.data.data);
      } else {
        setCoupons([]);
      }
    } catch (error) {
      console.log("error getting coupons:", error);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    getCoupons();
  }, [isOpen]);

  useEffect(() => {
    handleSearch(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupons]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const v = (value || "").toLowerCase();
    const newCoupons = (coupons || []).filter(
      (cp) =>
        (cp.coupon_name || "").toLowerCase().includes(v) ||
        (cp.subTitle || "").toLowerCase().includes(v)
    );
    setFilteredCoupons(newCoupons);
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

        // If backend sent a value (flat amount), use it; else compute here
        let base = srv.calculatedDiscount;
        if (base == null || base === 0) {
          if (srv.amount != null && srv.amount !== "") {
            base = Number(srv.amount);
          } else if (srv.percentage != null && srv.percentage !== "") {
            base = (Number(totalAmount) * Number(srv.percentage)) / 100;
          } else {
            base = 0;
          }
        }
        const discount = clampDiscount(base);

        applySelectedCoupon({ ...srv, calculatedDiscount: discount });
      } else {
        console.log(resp.data.message || "Invalid or ineligible coupon");
      }
    } catch (err) {
      console.log("applycoupons error:", err);
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

    setEnableLottie(true);
    setTimeout(() => {
      setEnableLottie(false);
      onClose();
    }, 3000);
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

        {/* Enter code */}
        <div className="flex flex-row gap-2 items-center justify-center w-full px-4 my-4">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* List of coupons */}
        <div className="flex flex-col gap-4 justify-center w-full px-4 my-2">
          <h3 className="font-bold">Available Coupons</h3>

          {filteredCoupons?.length === 0 && (
            <div className="p-4">
              <img src={NoResultFoundImg} alt="No coupons" />
            </div>
          )}

          {filteredCoupons?.map((cp, index) => (
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
      </div>
    </div>
  );
};

export default CouponModal;
