import React, { useEffect, useState, useRef } from "react";
import { RiTimerLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSolidOffer } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useCont } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import secureIcon from "../../assets/images/secure-icon.png";
import AddressModal from "../../components/AddressModal";
import DateTimeModal from "../../components/DateTimeModal";
import CouponModal from "../../components/CouponModal";
import { useToast } from "../../context/ToastProvider";
import emptyCart from "../../assets/images/illustrator/empty_cart.png";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import ProdSection from "../../components/ProdSection";
import { MdOutlineSendToMobile } from "react-icons/md";
import { BsFillCartXFill } from "react-icons/bs";
import { FaWallet, FaCreditCard } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import LoginSignup from "../../components/LoginModal";

export default function AddtoCart() {
  const navigate = useNavigate();
  const notify = useToast();

  // UI state
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [prodRelatedProds, setProdRelatedProds] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Wallet state
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletApplied, setWalletApplied] = useState(() => {
    const stored = localStorage.getItem("HommlieWalletApplied");
    return stored === "true";
  });
  const [walletUsed, setWalletUsed] = useState(() => {
    const stored = localStorage.getItem("HommlieWalletUsed");
    return stored ? Number(stored) : 0;
  });

  // Context
  const {
    user,
    selectedAddrs,
    setSelectedAddrs,
    cart,
    setCart,
    getCart,
    cartLength,
    selectedDayTime,
    setSelectedDayTime,
    selectedCoupon,
    setSelectedCoupon,
    getAddresses,
    paymentType,
    setPaymentType,
    paymentList,
    getPaymentList,
    getBookings,
    addresses,
  } = useCont();

  // Helpers
  const addressNotify = () => notify("Please select your delivery address!", "warning");
  const dateTimeNotify = () => notify("Please select your delivery Date & Time!", "warning");
  const paymentNotify = () => notify("Please select your payment method", "warning");

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  // UPDATED: only open slot modal when there are cart items AND an address
  const openDateTimeModal = () => {
    const itemCount = cart?.length || 0;
    if (itemCount > 0 && selectedAddrs) {
      setIsDateTimeModalOpen(true);
    } else {
      notify("Add at least one item and select an address first.", "warning");
    }
  };
  const closeDateTimeModal = () => setIsDateTimeModalOpen(false);

  const openCouponModal = () => setIsCouponModalOpen(true);
  const closeCouponModal = () => setIsCouponModalOpen(false);

  const [tempOrderNumber, setTempOrderNumber] = useState(null);
  const [showFullAddress, setShowFullAddress] = useState(false);

  // Initial fetches
  useEffect(() => {
    async function init() {
      await getCart();
      await getAddresses();
      await getPaymentList();
      await getProductDetails();
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartLength]);

  useEffect(() => {
    // Try to get selected address from localStorage
    let storedSelected = localStorage.getItem("HommlieselectedAddrs");
    let selected = (storedSelected && storedSelected !== "undefined") ? JSON.parse(storedSelected) : null;

    // If not selected, but addresses exist, auto-select the first one
    if ((!selected || Object.keys(selected).length === 0) && Array.isArray(addresses) && addresses.length > 0) {
      selected = addresses[0];
      setSelectedAddrs(selected);
      localStorage.setItem("HommlieselectedAddrs", JSON.stringify(selected));
    } else {
      setSelectedAddrs(selected || null);
    }

    setSelectedDayTime(
      localStorage.getItem("HommlieselectedDayTime") == "undefined"
        ? null
        : JSON.parse(localStorage.getItem("HommlieselectedDayTime"))
    );
    setSelectedCoupon(
      localStorage.getItem("HommlieselectedCoupon") == "undefined"
        ? null
        : JSON.parse(localStorage.getItem("HommlieselectedCoupon"))
    );
    setPaymentType(paymentList?.[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  async function getProductDetails() {
    if (!cart || cart.length === 0) return;
    const firstItem = cart[0];
    const id = firstItem?.product_id;

    // Safety check: don't send malformed IDs
    if (!id || id === "undefined") {
      console.warn("Skipping product details fetch: Invalid product_id", id);
      return;
    }

    try {
      const response = await axios.post(`${config.API_URL}/api/productdetails`, { product_id: id });
      setProdRelatedProds(response.data.related_products || []);
    } catch (err) {
      console.error("error fetching product details: ", err);
    }
  }

  // Fetch wallet & hard-reset UI if needed
  const fetchWallet = async () => {
    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      if (!jwtToken) return;
      const u = jwtDecode(jwtToken);
      const response = await axios.post(
        `${config.API_URL}/api/wallet/balance`,
        { userId: u.id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      const bal =
        (response.data.status === 1 || response.data.status === 0) && response.data.balance !== undefined
          ? Number(response.data.balance) || 0
          : 0;

      setWalletBalance(bal);
      // Notify header to refresh wallet
      window.dispatchEvent(new Event("hommlie-wallet-updated"));

      // If balance is 0, force-clear any stale localStorage toggle
      if (bal <= 0) {
        setWalletApplied(false);
        setWalletUsed(0);
        localStorage.setItem("HommlieWalletApplied", "false");
        localStorage.setItem("HommlieWalletUsed", "0");
      }
    } catch (err) {
      console.error("Wallet fetch error:", err);
      setWalletBalance(0);
      window.dispatchEvent(new Event("hommlie-wallet-updated"));
      // Defensive: also clear UI if fetch fails
      setWalletApplied(false);
      setWalletUsed(0);
      localStorage.setItem("HommlieWalletApplied", "false");
      localStorage.setItem("HommlieWalletUsed", "0");
    }
  };

  useEffect(() => {
    fetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Cart math
  const itemCount = cart?.length || 0;
  const totalItemPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );
  const tax = cart.reduce(
    (acc, item) => acc + Number(item.tax) * Number(item.qty),
    0
  );

  const [customTipActive, setCustomTipActive] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [tipAmount, setTipAmount] = useState(0);

  const payableBeforeWallet = Math.max(0, totalItemPrice + tax - couponDiscount + tipAmount);

  // Always clamp what can be used effectively
  const effectiveWalletUse = walletApplied
    ? Math.max(0, Math.min(Number(walletUsed) || 0, walletBalance, payableBeforeWallet))
    : 0;

  const totalAmount = Math.max(
    0,
    totalItemPrice + tax - couponDiscount + tipAmount - effectiveWalletUse
  );

  // Keep coupon discount up to date
  useEffect(() => {
    if (selectedCoupon) {
      const subtotal = cart.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
      if (selectedCoupon.amount) {
        setCouponDiscount(Number(selectedCoupon.amount));
      } else if (selectedCoupon.percentage) {
        setCouponDiscount((subtotal * Number(selectedCoupon.percentage)) / 100);
      }
    } else {
      setCouponDiscount(0);
    }
  }, [selectedCoupon, cart]);

  // Auto-clamp / auto-reset when dependencies change
  useEffect(() => {
    if (!walletApplied) return;
    const usable = Math.max(0, Math.min(walletBalance, payableBeforeWallet));
    if (usable <= 0) {
      // nothing can be applied → reset
      setWalletApplied(false);
      setWalletUsed(0);
      localStorage.setItem("HommlieWalletApplied", "false");
      localStorage.setItem("HommlieWalletUsed", "0");
    } else if (usable !== walletUsed) {
      setWalletUsed(usable);
      localStorage.setItem("HommlieWalletUsed", String(usable));
    }
  }, [walletBalance, payableBeforeWallet, walletApplied, walletUsed]);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("HommlieWalletApplied", walletApplied ? "true" : "false");
    localStorage.setItem("HommlieWalletUsed", String(walletUsed));
  }, [walletApplied, walletUsed]);

  // Toggle wallet with guards
  const handleWalletToggle = () => {
    if (walletApplied) {
      setWalletApplied(false);
      setWalletUsed(0);
      localStorage.setItem("HommlieWalletApplied", "false");
      localStorage.setItem("HommlieWalletUsed", "0");
      return;
    }
    const usable = Math.max(0, Math.min(walletBalance, payableBeforeWallet));
    if (usable <= 0) {
      notify("No wallet amount can be applied.", "warning");
      return;
    }
    setWalletApplied(true);
    setWalletUsed(usable);
    localStorage.setItem("HommlieWalletApplied", "true");
    localStorage.setItem("HommlieWalletUsed", String(usable));
  };

  // Cart ops
  const handleRemoveFromCart = async (id) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) return;
    const user_id = jwtDecode(jwtToken);
    try {
      const response = await axios.post(
        `${config.API_URL}/api/deleteproduct`,
        { user_id: user_id.id, cart_id: id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      if (response.data.status === 1) {
        await getCart();
      }
    } catch (error) {
      console.log("error removing from cart:", error);
    }
  };

  const handleQtyUpdate = async (id, qty) => {
    setLoadingItemId(id);
    setIsLoading(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      if (qty === 0) {
        await handleRemoveFromCart(id);
      } else {
        try {
          const response = await axios.post(
            `${config.API_URL}/api/qtyUpdate`,
            { qty, cart_id: id },
            { headers: { Authorization: `Bearer ${jwtToken}` } }
          );
          if (response.data.status === 1) {
            await getCart();
          }
        } catch (error) {
          console.log("error updating cart:", error);
        }
      }
    }
    setIsLoading(false);
    setLoadingItemId(null);
  };

  // const handlePaymentChange = (e) => {
  //   const { value } = e.target;
  //   const selected = paymentList.find((payment) => payment.id == value);
  //   setPaymentType(selected);
  // };

  const isZeroOrLess = totalAmount <= 0;
  const isOnline = (p) => (p?.payment_name || "").toLowerCase().includes("online");

  const handlePaymentChange = (e) => {
    const { value } = e.target;
    const selected = (paymentList || []).find((p) => String(p.id) === String(value));

    // BLOCK ONLINE when total is 0 or less
    if (selected && isZeroOrLess && isOnline(selected)) {
      notify("Online payment isn’t allowed for zero-amount orders.", "warning");
      return; // do nothing, keep current paymentType
    }

    if (selected) setPaymentType(selected);
  };


  // Proceed
  const handleProceed = async () => {
    if (cart.length === 0) {
      notify("Your cart is empty. Please add items before placing the order.", "warning");
      return;
    }
    if (!selectedAddrs) {
      addressNotify(); return;
    }
    if (!selectedDayTime?.date?.day || !selectedDayTime?.time) {
      dateTimeNotify(); return;
    }
    if (!paymentType) {
      paymentNotify(); return;
    }

    setIsLoading(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      setIsLoginModalOpen(true);
      notify("Please login before proceeding to checkout.", "warning");
      setIsLoading(false);
      return;
    }

    const u = jwtDecode(jwtToken);
    const clientPaymentId = Math.random().toString(36).substring(2, 12);
    const walletToUse = effectiveWalletUse; // ← use clamped value

    if (paymentType?.payment_name === "Online") {
      try {
        const orderResponse = await axios.post(
          `${config.API_URL}/api/initiatePayment`,
          { amount: totalAmount, currency: "INR", user_id: u.id },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );

        const options = {
          key: config.RAZORPAY_KEY_ID,
          amount: orderResponse.data.data.amount,
          currency: orderResponse.data.data.currency,
          name: "Hommlie",
          description: "Order Payment",
          order_id: orderResponse.data.data.id,
          handler: async (response) => {
            try {
              const verify = await axios.post(
                `${config.API_URL}/api/verifyPayment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                { headers: { Authorization: `Bearer ${jwtToken}` } }
              );
              if (verify.data.status === 1) {
                await placeOrder(u, clientPaymentId, response.razorpay_payment_id, walletToUse);
              } else {
                notify("Payment verification failed. Please try again.", "error");
              }
            } catch (err) {
              console.error("Error verifying payment:", err);
              notify("Error verifying payment. Please contact support.", "error");
            }
          },
          prefill: { name: selectedAddrs?.name, email: selectedAddrs?.email, contact: selectedAddrs?.mobile },
          theme: { color: "#249370" },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        notify("Error processing payment. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      await placeOrder(u, clientPaymentId, null, Number(walletToUse || 0));
    }
  };

  const placeOrder = async (user, clientPaymentId, razorpayPaymentId = null, walletDeducted = 0) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/api/order`,
        {
          user_id: user.id,
          payment_type: paymentType?.id,
          payment_id: razorpayPaymentId || clientPaymentId,
          grand_total: totalAmount,
          discount_amount: couponDiscount,
          coupon_name: selectedCoupon ? selectedCoupon.coupon_name : null,
          coupon_id: selectedCoupon ? selectedCoupon.id : null,
          order_notes: null,
          full_name: selectedAddrs?.name,
          email: selectedAddrs?.email,
          mobile: selectedAddrs?.mobile,
          landmark: selectedAddrs?.landmark,
          street_address: selectedAddrs?.address,
          pincode: selectedAddrs.pincode,
          latitude: selectedAddrs.latitude,
          longitude: selectedAddrs.longitude,
          desired_date: selectedDayTime?.date?.formattedDate,
          desired_time: selectedDayTime?.time,
          wallet_used: Number(walletDeducted || 0),
          tip_amount: Number(tipAmount || 0),
          wallet_amount: cart.reduce((acc, item) => acc + Number(item.wallet_amount || 0) * Number(item.qty || 1), 0),
        },
        { headers: { Authorization: `Bearer ${Cookies.get("HommlieUserjwtToken")}` } }
      );

      if (response.data.status === 1) {
        notify("Successfully placed your order", "success");
        localStorage.removeItem("cart");
        setCart([]);
        localStorage.removeItem("HommlieselectedAddrs");
        localStorage.removeItem("HommlieselectedDayTime");
        localStorage.removeItem("HommlieselectedCoupon");
        localStorage.removeItem("HommliepaymentType");

        // reset wallet toggle UI, then fetch fresh balance (server already deducted)
        setWalletApplied(false);
        setWalletUsed(0);
        localStorage.setItem("HommlieWalletApplied", "false");
        localStorage.setItem("HommlieWalletUsed", "0");
        await fetchWallet();

        getBookings();
        getCart();
        setIsOrderConfirmed(true);
        setTempOrderNumber(response.data.order_number);
      } else {
        notify(response.data.message || "Unable to place order", "error");
      }
    } catch (error) {
      console.log("error placing order:", error);
      notify(error.response?.data?.message || "Error placing order. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // UI helpers
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  // UPDATED: guard auto-open of slot modal (no first render, require items)
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false; // don't run on hydration/refresh
      return;
    }

    const hasAddr = selectedAddrs && typeof selectedAddrs === "object" &&
      Object.keys(selectedAddrs).length > 0 &&
      selectedAddrs?.address && selectedAddrs?.pincode;

    const noSlotChosen = !selectedDayTime?.date?.day || !selectedDayTime?.time;

    // Prevent repeatedly auto-opening the slot modal on refresh — only auto-open once per session
    const hasAutoPrompted = localStorage.getItem('HommlieSlotAutoPrompted') === 'true';

    if ((cart?.length || 0) > 0 && hasAddr && noSlotChosen && !hasAutoPrompted) {
      setTimeout(() => {
        setIsDateTimeModalOpen(true);
        try { localStorage.setItem('HommlieSlotAutoPrompted', 'true'); } catch (e) { }
      }, 300);
    }
  }, [selectedAddrs, cart?.length]); // include itemCount via cart.length

  // (Old scroll-to-payment effect removed)
  // Keep responsive visible items
  useEffect(() => {
    const updateVisibleItemsCount = () => {
      if (window.innerWidth >= 1024) setVisibleItemsCount(5);
      else if (window.innerWidth >= 640) setVisibleItemsCount(4);
      else setVisibleItemsCount(3);
    };
    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);
    return () => window.removeEventListener("resize", updateVisibleItemsCount);
  }, []);

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    localStorage.removeItem("HommlieselectedCoupon");
    setCouponDiscount(0);
  };

  const paymentRef = useRef(null);

  const visibleItems = prodRelatedProds?.slice(currentIndex, currentIndex + visibleItemsCount);

  // Keep page at top on refresh; disable scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // UPDATED: only scroll to payment after first render and when slot chosen
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true; // skip first run (hydration from localStorage)
      return;
    }
    if ((cart?.length || 0) > 0 && selectedDayTime?.date?.day && selectedDayTime?.time) {
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [selectedDayTime, cart?.length]);

  // OPTIONAL: if cart becomes empty, clear any persisted slot so UI doesn't nag later
  useEffect(() => {
    if ((cart?.length || 0) === 0) {
      setSelectedDayTime(null);
      localStorage.removeItem("HommlieselectedDayTime");
    }
  }, [cart?.length, setSelectedDayTime]);

  return (
    <div className="bg-white min-h-screen font-sans text-[#212121]">

      <div className="max-w-[1100px] mx-auto px-4 py-8 pb-32 lg:pb-8">
        <LoginSignup isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
            <BsFillCartXFill className="text-6xl text-gray-200 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Cart is empty</h2>
            <p className="text-gray-500 mb-6">Add services to checkout</p>
            <button
              onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
              className="px-8 py-3 bg-[#6759ff] text-white font-bold rounded-lg hover:bg-[#5446e5] transition-all"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Progress Steps */}
            <div className="flex-1 space-y-6">
              {couponDiscount > 0 && (
                <div className="bg-[#e7f9f3] p-4 rounded-xl flex items-center gap-3 border border-[#c3f2e3]">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <BiSolidOffer className="text-[#00a871] text-xl" />
                  </div>
                  <span className="text-[#00a871] font-bold text-sm">Saving ₹{couponDiscount?.toFixed(0)} on this order</span>
                </div>
              )}

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Step 1: Booking Details */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                      <MdOutlineSendToMobile className="text-gray-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-1">Send booking details to</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm text-gray-500 font-medium">{user?.mobile}</p>
                        {String(user?.email || selectedAddrs?.email || "").trim() !== "" && (
                          <>
                            <span className="text-gray-300">•</span>
                            <p className="text-sm text-gray-500 font-medium">
                              {String(user?.email || selectedAddrs?.email || "").trim()}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Address */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                      <HiOutlineLocationMarker className="text-gray-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-4">Address</h3>
                      {selectedAddrs ? (
                        <div className="relative group">
                          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 group-hover:border-[#6759ff]/30 transition-all">
                            <p className="font-bold text-sm mb-1">{selectedAddrs.name}</p>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                              {selectedAddrs.address}, {selectedAddrs.landmark}, {selectedAddrs.pincode}
                            </p>
                          </div>
                          <button onClick={openAddressModal} className="mt-3 text-[#6759ff] text-sm font-bold uppercase tracking-wider hover:underline">
                            Change Address
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={openAddressModal}
                          className="w-full py-4 bg-[#6759ff] text-white font-bold rounded-lg hover:bg-[#5446e5] shadow-md shadow-[#6759ff]/20 transition-all active:scale-[0.98]"
                        >
                          Select address
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3: Slot */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                      <RiTimerLine className="text-gray-400 text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-bold ${!selectedDayTime?.date?.day ? 'text-gray-300' : 'text-[#212121]'}`}>Slot</h3>
                      {selectedDayTime?.date?.day ? (
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-sm">{selectedDayTime.date.day}, {selectedDayTime.date.month} {selectedDayTime.date.date}</p>
                            <p className="text-xs text-[#6759ff] font-bold mt-1">{selectedDayTime.time}</p>
                          </div>
                          <button onClick={openDateTimeModal} className="text-[#6759ff] text-sm font-bold uppercase tracking-wider hover:underline">
                            Reschedule
                          </button>
                        </div>
                      ) : (
                        selectedAddrs && (
                          <button onClick={openDateTimeModal} className="mt-4 text-[#6759ff] text-sm font-bold uppercase tracking-wider hover:underline">
                            Select date & time
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 4: Payment Method */}
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center shrink-0">
                      <FaCreditCard className="text-gray-400 text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-bold ${!paymentType ? 'text-gray-300' : 'text-[#212121]'}`}>Payment Method</h3>
                      {paymentType && selectedDayTime?.date?.day ? (
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-sm">{paymentType.payment_name}</p>
                            <p className="text-[10px] text-gray-400 font-medium">Secure Transaction</p>
                          </div>
                          <button onClick={() => setPaymentType(null)} className="text-[#6759ff] text-sm font-bold uppercase tracking-wider hover:underline">
                            Change
                          </button>
                        </div>
                      ) : (
                        !paymentType && selectedDayTime?.date?.day && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {paymentList?.map((pm) => (
                              <button
                                key={pm.id}
                                onClick={() => handlePaymentChange({ target: { value: pm.id } })}
                                className="p-4 border rounded-xl text-left hover:border-[#6759ff] transition-all group"
                              >
                                <span className="block font-bold text-sm group-hover:text-[#6759ff]">{pm.payment_name}</span>
                                <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Secure Payment</span>
                              </button>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Book Now Action */}
                {paymentType && (
                  <div className="p-6 bg-gray-50 border-t border-gray-100 uppercase">
                    <button
                      onClick={handleProceed}
                      disabled={isLoading}
                      className="w-full py-4 bg-[#6759ff] text-white font-bold rounded-xl shadow-lg shadow-[#6759ff]/20 hover:bg-[#5446e5] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:grayscale disabled:hover:translate-y-0"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="uppercase tracking-widest text-sm">Book and pay</span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-4">
                      Secure encrypted transaction
                    </p>
                  </div>
                )}
              </div>

              {/* Cancellation Policy */}
              <div className="pt-4">
                <h4 className="text-lg font-bold mb-2">Cancellation policy</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-lg">
                  Free cancellations if done more than 12 hrs before the service. A fee will be charged otherwise.
                </p>
                <button
                  onClick={() => navigate(`${config.VITE_BASE_URL}/privacy-policy`)}
                  className="text-xs font-bold underline mt-2 hover:text-[#6759ff] transition-colors"
                >
                  Read full policy
                </button>
              </div>
            </div>

            {/* Right Column: Review Pane */}
            <div className="w-full lg:w-[380px] space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                  {cart.map((pd) => (
                    <div key={pd.id} className="flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-gray-900 leading-tight">{pd.product_name}</h4>
                          <div className="mt-1">
                            {pd.variation_name && <p className="text-xs text-gray-500 font-medium">{pd.variation_name}</p>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center bg-[#f2f4f6] rounded px-1 py-1 h-8 border border-gray-100 shadow-inner">
                            <button
                              onClick={() => handleQtyUpdate(pd.id, pd.qty - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#6759ff] text-lg font-bold hover:bg-white rounded transition-colors"
                            >–</button>
                            <span className="w-6 text-center text-xs font-bold">{pd.qty}</span>
                            <button
                              onClick={() => handleQtyUpdate(pd.id, pd.qty + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#6759ff] text-lg font-bold hover:bg-white rounded transition-colors"
                            >+</button>
                          </div>
                          <p className="text-sm font-bold">₹{pd.price * pd.qty}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              <button
                onClick={openCouponModal}
                className="w-full bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#eef5ff] rounded flex items-center justify-center">
                    <BiSolidOffer className="text-[#6759ff] text-xl" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{selectedCoupon ? selectedCoupon.coupon_name : "Coupons and offers"}</p>
                    <p className="text-[10px] text-[#00a871] font-bold">Offer available</p>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>

              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-50 pb-3">Payment summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>Item total</span>
                    <span className="text-[#212121] font-bold">₹{totalItemPrice?.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                    <span className="border-b border-dashed border-gray-300">Taxes and Fee</span>
                    <span className="text-[#212121] font-bold">₹{tax?.toFixed(0)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-[#00a871]">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount.toFixed(0)}</span>
                    </div>
                  )}
                  {walletApplied && effectiveWalletUse > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-[#6759ff]">
                      <span>Wallet Credit</span>
                      <span>-₹{effectiveWalletUse.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total amount</span>
                    <span className="text-lg font-black text-gray-900">₹{totalAmount?.toFixed(0)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                  <div>
                    <p className="text-lg font-bold text-gray-900 leading-none">₹{totalAmount?.toFixed(0)}</p>

                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">Amount to pay</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-6">Add a tip to thank the Professional</h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[50, 75, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setTipAmount(amount); setCustomTipActive(false); setCustomInput(""); }}
                      className={`relative flex flex-col items-center justify-center py-2.5 px-1 rounded border transition-all
                        ${tipAmount === amount ? "bg-[#fff2f2] border-[#ff5a5a] text-[#ff5a5a]" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}`}
                    >
                      <span className="text-xs font-bold">₹{amount}</span>
                      {amount === 75 && (
                        <span className="absolute -bottom-2 text-[8px] font-black uppercase tracking-tighter bg-[#e7f9f3] text-[#00a871] border border-[#c3f2e3] px-1 rounded">POPULAR</span>
                      )}
                    </button>
                  ))}
                  <button onClick={() => { setCustomTipActive(true); setTipAmount(0); }} className="flex items-center justify-center py-2.5 rounded border border-gray-200 text-gray-500 text-xs font-bold">Custom</button>
                </div>
                {customTipActive && (
                  <div className="mb-4">
                    <input type="number" placeholder="Enter amount" className="w-full text-center py-2 text-sm border-b-2 border-[#6759ff] outline-none" onChange={(e) => setTipAmount(Number(e.target.value))} />
                  </div>
                )}
                <p className="text-[10px] text-gray-400 font-medium text-center">100% of the tip goes to the professional.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Proceed Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-[90] flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-xl font-bold text-gray-900">₹{totalAmount?.toFixed(0)}</p>

        </div>
        <button
          onClick={handleProceed}
          disabled={!selectedAddrs || !selectedDayTime || !paymentType}
          className="bg-[#6759ff] text-white px-8 py-3 rounded-lg font-bold text-sm shadow-lg shadow-[#6759ff]/20 disabled:bg-gray-300 disabled:shadow-none"
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>

      <AnimatePresence>
        {isOrderConfirmed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-[#e7f9f3] rounded-full flex items-center justify-center mb-6">
              <IoCheckmarkCircle className="text-6xl text-[#00a871]" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 font-medium mb-8">Professional will be assigned shortly.</p>
            <button onClick={() => { setIsOrderConfirmed(false); navigate(`${config.VITE_BASE_URL}/`); }} className="bg-[#6759ff] text-white px-10 py-4 rounded-lg font-bold">GO TO HOME</button>
          </motion.div>
        )}
      </AnimatePresence>

      <DateTimeModal isOpen={isDateTimeModalOpen} onClose={closeDateTimeModal} order_type="AMC" />
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} />
      <CouponModal isOpen={isCouponModalOpen} onClose={closeCouponModal} totalAmount={totalItemPrice} />
    </div>
  );
}
