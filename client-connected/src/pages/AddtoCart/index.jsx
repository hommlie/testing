import React, { useEffect, useState } from "react";
import { RiTimerLine, RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSolidOffer } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCont } from "../../context/MyContext";
import { NavLink, useNavigate } from "react-router-dom";
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
import { FaWallet } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { useRef } from "react";


export default function AddtoCart() {
  const navigate = useNavigate();
  const notify = useToast();
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [prodRelatedProds, setProdRelatedProds] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [callbackMobileNumber, setCallbackMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletApplied, setWalletApplied] = useState(false);
  const [walletUsed, setWalletUsed] = useState(0);

  const {
    user,
    selectedAddrs,
    setSelectedAddrs,
    cart,
    setCart,
    getCart,
    cartLength,
    cartProds,
    selectedDayTime,
    setSelectedDayTime,
    selectedCoupon,
    setSelectedCoupon,
    getAddresses,
    // getCoupons,
    // coupons,
    paymentType,
    setPaymentType,
    paymentList,
    setPaymentList,
    getPaymentList,
  } = useCont();

  const addressNotify = () =>
    notify("Please select your delivery address!", "warning");
  const dateTimeNotify = () =>
    notify("Please select your delivery Date & Time!", "warning");
  const paymentNotify = () =>
    notify("Please select your payment method", "warning");

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);
  const openDateTimeModal = () => setIsDateTimeModalOpen(true);
  const closeDateTimeModal = () => setIsDateTimeModalOpen(false);
  const openCouponModal = () => setIsCouponModalOpen(true);
  const closeCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  const [tempOrderNumber, setTempOrderNumber] = useState(null);
  const [showFullAddress, setShowFullAddress] = useState(false);


  useEffect(() => {
  async function init() {
    await getCart();
    await getAddresses();
    await getPaymentList();
    await getProductDetails();
  }
  init();
}, [cartLength]);

  useEffect(() => {
    setSelectedAddrs(
      localStorage.getItem("HommlieselectedAddrs") == "undefined"
        ? []
        : JSON.parse(localStorage.getItem("HommlieselectedAddrs"))
    );
    setSelectedDayTime(
      localStorage.getItem("HommlieselectedDayTime") == "undefined"
        ? null
        : JSON.parse(localStorage.getItem("HommlieselectedDayTime"))
    );
    setSelectedCoupon(
      localStorage.getItem("HommlieselectedCoupon") == "undefined"
        ? []
        : JSON.parse(localStorage.getItem("HommlieselectedCoupon"))
    );
    setPaymentType(paymentList[0]);
  }, []);

  async function getProductDetails() {
  if (!cart || cart.length === 0 || !cart[0]?.product_id) {
    console.warn("No valid product_id found in cart");
    return;
  }

  const id = cart[0].product_id;
  try {
    const response = await axios.post(
      `${config.API_URL}/api/productdetails`,
      { product_id: id }
    );
    setProdRelatedProds(response.data.related_products);
  } catch (err) {
    console.error("error: " + err);
  }
}


useEffect(() => {
  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch("http://localhost:5000/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch wallet");
      const data = await response.json();
      setWalletBalance(data.balance || 0);
    } catch (err) {
      console.error("Wallet fetch error:", err);
    }
  };
  fetchWallet();
}, []);

// Toggle wallet usage
const handleWalletToggle = () => {
  if (walletApplied) {
    // remove wallet usage
    setWalletApplied(false);
    setWalletUsed(0);
  } else {
    // apply wallet usage
    const usable = Math.min(walletBalance, totalAmount);
    setWalletApplied(true);
    setWalletUsed(usable);
  }
};

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItemsCount(5);
      } else if (window.innerWidth >= 640) {
        setVisibleItemsCount(4);
      } else {
        setVisibleItemsCount(3);
      }
    };

    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);
    return () => window.removeEventListener("resize", updateVisibleItemsCount);
  }, []);

  const handleRemoveFromCart = async (id) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const user_id = jwtDecode(jwtToken);
      try {
        const response = await axios.post(
          `${config.API_URL}/api/deleteproduct`,
          {
            user_id: user_id.id,
            cart_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.data.status === 1) {
          console.log(response.data.message);
          getCart();
        }
      } catch (error) {
        console.log("error removing from cart:", error);
      }
    } else {
      console.log("User hasn't logged in");
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
            {
              qty,
              cart_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
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

  const handlePaymentChange = (e) => {
    const { value } = e.target;
    const selected = paymentList.find((payment) => payment.id == value);
    setPaymentType(selected);
  };

  const handleEmptyCartClick = () => {
    notify("Your cart is empty. Add items to proceed.", "warning");
  };

  const handleProceed = async () => {
  if (cart.length === 0) {
    notify("Your cart is empty. Please add items before placing the order.", "warning");
    return;
  }

  if (!selectedAddrs) {
    addressNotify();
    return;
  }

  if (!selectedDayTime?.date?.day || !selectedDayTime?.time) {
    dateTimeNotify();
    return;
  }

  if (!paymentType) {
    paymentNotify();
    return;
  }

  setIsLoading(true);
  const jwtToken = Cookies.get("HommlieUserjwtToken");

  if (jwtToken) {
    const user = jwtDecode(jwtToken);
    const payment_id = Math.random().toString(36).substring(2, 12);

    if (paymentType?.payment_name === "Online") {
      try {
        const orderResponse = await axios.post(
          `${config.API_URL}/api/initiatePayment`,
          {
            amount: totalAmount,
            currency: "INR",
            user_id: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const options = {
          key: config.RAZORPAY_KEY_ID,
          amount: orderResponse.data.data.amount,
          currency: orderResponse.data.data.currency,
          name: "Hommlie",
          description: "Order Payment",
          order_id: orderResponse.data.data.id,
          handler: async function (response) {
            try {
              const verifyResponse = await axios.post(
                `${config.API_URL}/api/verifyPayment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                }
              );

              if (verifyResponse.data.status === 1) {
                await placeOrder(user, payment_id, response.razorpay_payment_id);
              } else {
                notify("Payment verification failed. Please try again.", "error");
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              notify("Error verifying payment. Please contact support.", "error");
            }
          },
          prefill: {
            name: selectedAddrs?.name,
            email: selectedAddrs?.email,
            contact: selectedAddrs?.mobile,
          },
          theme: {
            color: "#249370",
          },
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
      await placeOrder(user, payment_id);
    }
  } else {
    notify("Please login before proceeding to checkout.", "warning");
    setIsLoading(false);
  }
};


    const placeOrder = async (user, payment_id, razorpay_payment_id = null) => {
        try {

            const response = await axios.post(`${config.API_URL}/api/order`, 
                {
                    user_id: user.id, 
                    payment_type: paymentType?.id, 
                    payment_id: razorpay_payment_id || payment_id, 
                    grand_total: totalAmount - couponDiscount,
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
                    tip_amount: tipAmount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("HommlieUserjwtToken")}`,
                    },
                }
            );            

            if (response.data.status === 1) {
                console.log(response.data.message);
                notify("Successfully placed your order", "success");
                localStorage.removeItem("cart");
                setCart([]);
                localStorage.removeItem("HommlieselectedAddrs");
                localStorage.removeItem("HommlieselectedDayTime");
                localStorage.removeItem("HommlieselectedCoupon");
                localStorage.removeItem("HommliepaymentType");
                getBookings();
                placeOrder();
                getCart();
                setIsOrderConfirmed(true); // ✅ Always show confirmation
                setTempOrderNumber(response.data.order_number);
            } else {
                errorNotify(response.data.message);
                console.log("error placing order:",response.data);
            }
        } catch (error) {
            console.log("error placing order:", error);
            errorNotify(error.response?.data?.message || "Error placing order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

  // const handleCallbackRequest = async () => {
  //     try {
  //         const response = await axios.post(`${config.API_URL}/callback`, { mobile: callbackMobileNumber });
  //         if (response.data.status === 1) {
  //             notify("Callback request sent successfully!", 'success');
  //             setMobileNumber('');
  //         } else {
  //             notify("Failed to send callback request. Please try again.", 'error');
  //         }
  //     } catch (error) {
  //         console.error("Error sending callback request:", error);
  //         notify("An error occurred. Please try again later.", 'error');
  //     }
  // };

  useEffect(() => {
    calculateCouponDiscount();
  }, [selectedCoupon, cart]);

  const calculateCouponDiscount = () => {
    if (selectedCoupon) {
      const subtotal = cart.reduce(
        (acc, item) => acc + Number(item.price) * item.qty,
        0
      );
      if (selectedCoupon.amount) {
        setCouponDiscount(Number(selectedCoupon.amount));
      } else if (selectedCoupon.percentage) {
        const discount = (subtotal * Number(selectedCoupon.percentage)) / 100;
        setCouponDiscount(discount);
      }
    } else {
      setCouponDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    localStorage.removeItem("HommlieselectedCoupon");
    setCouponDiscount(0);
  };

  const visibleItems = prodRelatedProds?.slice(
    currentIndex,
    currentIndex + visibleItemsCount
  );

  const itemCount = cart?.length;
  const totalItemPrice = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.price) * Number(currentValue.qty),
    0
  );
  const tax = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.tax) * Number(currentValue.qty),
    0
  );

  const [customTipActive, setCustomTipActive] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
 const totalAmount = Math.max(
  0,
  totalItemPrice + tax - couponDiscount + tipAmount - (walletApplied ? walletUsed : 0)
);

  const handleProductClick = (item) => {
    const slug = item.product_name.toLowerCase().replace(/ /g, "-");
    navigate(`${config.VITE_BASE_URL}/product/${slug}`);
  };

  const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
  if (
    selectedAddrs &&
    typeof selectedAddrs === "object" &&
    Object.keys(selectedAddrs).length > 0 && // Ensure it's a valid object
    selectedAddrs?.address && // Validate essential address fields
    selectedAddrs?.pincode &&
    (!selectedDayTime?.date?.day || !selectedDayTime?.time)
  ) {
    setTimeout(() => {
      setIsDateTimeModalOpen(true);
    }, 300);
  }
}, [selectedAddrs]);


useEffect(() => {
  if (selectedDayTime?.date?.day && selectedDayTime?.time) {
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500); // Delay ensures DateTimeModal closes first
  }
}, [selectedDayTime]);


const paymentRef = useRef(null);

  return (
    <div className=""  style={{
            background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            {cart.length === 0 ? (
            // 🛒 Show ONLY empty cart message centered
            <div className="flex justify-center items-center min-h-[50vh] -mt-5">
              <div className="p-8 flex flex-col items-center">
                <BsFillCartXFill className="text-6xl text-[#035240] mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-4">Add items to start a purchase</p>
                <button
                  onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
                  className="px-8 py-3 bg-[#035240] text-white font-medium rounded-lg hover:bg-[#024535] transition duration-300"
                >
                  Browse Services
                </button>
              </div>
            </div>
          ) : (
          <>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Content */}
          <div   className="w-full lg:w-[800px] order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-sm p-6  order-3 lg:order-none space-y-10 w-100px border border-black">
              {/* Account Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-l font-semibold flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-medium inline-block -ml-2">
                      <MdOutlineSendToMobile className="text-xl text-[#249370]" />
                    </div>
                    Send Your Booking Details To
                  </h2>
                </div>

                <div className="-mt-3 ml-7">
                  <div className="space-y-2 text-gray-600">
                    <p className="text-gray-500 mb-3 ml-2">
                      {user?.name}{" ( "}{user?.mobile}{" ) "}, {user?.email}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-100"></div>
              </div>
              {/* Address Section */}
              <div>
                <div className="flex justify-between items-center mb-4 -mt-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-medium inline-block -ml-2">
                      <HiOutlineLocationMarker className="text-2xl text-[#249370]" />
                    </div>
                    <h2 className="text-xl font-semibold -ml-2">Delivery Address</h2>
                  </div>
                  <button
                    onClick={openAddressModal}
                    className="px-4 py-2 text-[#249370] border-2 border-[#249370] rounded-lg hover:bg-[#249370] hover:text-white transition-colors"
                  >
                    {selectedAddrs ? "Edit" : "Add"}
                  </button>
                </div>
                <div className="ml-7">
                  {/* One-line address with "View More" toggle */}
                  {selectedAddrs ? (
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p className="font-medium text-black">{selectedAddrs.name}</p>
                      
                      <p className="text-gray-700">
                        {showFullAddress
                          ? `${selectedAddrs.address}, ${selectedAddrs.landmark}, ${selectedAddrs.pincode}`
                          : `${selectedAddrs.address}, ${selectedAddrs.landmark}, ${selectedAddrs.pincode}`.slice(0, 60) + '...'}
                        {`${selectedAddrs.address}, ${selectedAddrs.landmark}, ${selectedAddrs.pincode}`.length > 60 && (
                          <button
                            onClick={() => setShowFullAddress(!showFullAddress)}
                            className="text-[#249370] font-medium ml-2 underline"
                          >
                            {showFullAddress ? "View Less" : "View More"}
                          </button>
                        )}
                      </p>
                      {/* <p>Mobile: {selectedAddrs.mobile}</p> */}
                    </div>
                  ) : (
                    <p className="text-gray-500 -mt-4 mb-3 ml-2">Please select a delivery address</p>
                  )}
                </div>
                <div className="border-t border-gray-100"></div>
              </div>

              {/* Delivery Time Section - only visible after address is selected */}
              <div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-full">
                      <div className="flex items-center gap-3 -mt-5">
                        <div className="bg-gray-100 p-2 rounded-medium inline-block -ml-2">
                          <RiTimerLine className="text-2xl text-[#249370]" />
                        </div>
                        <h2 className="text-xl font-semibold -ml-1">Select Your Slot</h2>
                      </div>
                      <div className="mt-4 ml-7">
                        {!selectedDayTime?.date?.day || !selectedDayTime?.time ? (
                          <button
                            onClick={() => {
                              if (selectedAddrs) openDateTimeModal();
                            }}
                            disabled={!selectedAddrs}
                            className={`w-full px-4 py-2 border-2 rounded-lg transition-colors
                              ${
                                selectedAddrs
                                  ? "text-[#249370] border-[#249370] hover:bg-[#249370] hover:text-white"
                                  : "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                              }
                            `}
                          >
                            Select Date and Time
                          </button>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 px-4 py-3 rounded-lg mt-2 mb-4">
                            <p className="text-gray-700">
                              {selectedDayTime?.date?.day} - {selectedDayTime?.date?.date} {selectedDayTime?.date?.month} @ {selectedDayTime?.time}
                            </p>
                            <button
                              onClick={() => {
                                if (selectedAddrs) openDateTimeModal();
                              }}
                              className="mt-2 sm:mt-0 px-4 py-2 text-[#249370] border-2 border-[#249370] rounded-lg hover:bg-[#249370] hover:text-white transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                      {!selectedAddrs ? (
                            <p className="text-red-400 ml-8 mt-3">Please select a delivery address first</p>
                          ) : !selectedDayTime?.date?.day || !selectedDayTime?.time ? (
                            <p className="text-red-500">Please select delivery date and time</p>
                          ) : null}
                        <div className="border-t border-gray-100 pt-4"></div>
                    </div>
                  </div>
                </div>
                  {/* Payment Options */}
                  <h3
                    ref={paymentRef}
                    className="text-xl -mt-3 mb-3 font-semibold flex items-center gap-2"
                  >
                    <div className="bg-gray-100 p-2 rounded-medium inline-block -ml-2">
                      <FaCreditCard className="text-[#249370]" />
                    </div>
                    Payment Method
                  </h3>
                  {/* <button
                        onClick={
                          cart.length === 0 ? handleEmptyCartClick : handleProceed
                        }
                        className={`w-full py-4 rounded-lg font-medium mt-6 transition-colors ${
                          cart.length === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#035240] text-white hover:bg-[#024535]"
                        }`}
                      >
                        {cart.length === 0 ? "Cart is Empty" : "Proceed to Payment"}
                    </button> */}
                    <div className={`flex flex-col sm:grid sm:grid-cols-2 gap-3 px-4 sm:ml-7 ${(!selectedAddrs || !selectedDayTime?.date?.day || !selectedDayTime?.time) ? 'opacity-50 pointer-events-none' : ''}`}>
                    {paymentList?.map((payment) => (
                      <label
                        key={payment.id}
                        // style={{ width: "256px" }}
                        className={`w-full flex items-center px-3 py-2 rounded-lg border-2 cursor-pointer text-sm transition-colors
                          ${paymentType?.id === payment.id ? "border-[#249370] bg-green-50" : "border-gray-200 hover:border-[#249370]"}
                        `}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={payment.id}
                          checked={paymentType?.id === payment.id}
                          onChange={handlePaymentChange}
                          disabled={!selectedAddrs || !selectedDayTime?.date?.day || !selectedDayTime?.time}
                          className="mr-2 text-[#249370] focus:ring-[#249370]"
                        />
                        {payment.payment_name}
                      </label>
                    ))}
                      <button
                        className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[520px] py-4 bg-[#035240] text-white font-medium rounded-lg hover:bg-[#024535] transition-colors mx-auto sm:col-span-2"
                        disabled={isLoading}
                        onClick={handleProceed}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>PLACING ORDER...</span>
                          </div>
                        ) : (
                          'PLACE ORDER'
                        )}
                      </button>
                  </div>
                  {/* Proceed Button */}
                  {/* <button
                    onClick={
                      cart.length === 0 ? handleEmptyCartClick : handleProceed
                    }
                    className={`w-full py-4 rounded-lg font-medium mt-6 transition-colors ${
                      cart.length === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#035240] text-white hover:bg-[#024535]"
                    }`}
                  >
                    {cart.length === 0 ? "Cart is Empty" : "Proceed to Payment"}
                  </button> */}

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-gray-200">
                    <img
                      src={secureIcon}
                      alt="Secure Payment"
                      className="w-8 h-8"
                    />
                    <p className="text-sm text-gray-500">
                      Safe and Secure Payments
                    </p>
                  </div>
                </div>
              {/* Need Help Section */}
              {/* <section className="mt-12 bg-white rounded-xl shadow-sm p-8">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-semibold mb-4">
                    Need help finding the right plan?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our team will get in touch to answer your questions and help you
                    get started
                  </p>
                  <button
                    onClick={() => navigate(`${config.VITE_BASE_URL}/contact-us`)}
                    className="inline-block px-8 py-3 text-[#249370] border-2 border-[#249370] rounded-lg hover:bg-[#249370] hover:text-white transition-colors"
                  >
                    Contact Us Now
                  </button>
                </div>
              </section> */}
            </div>
          </div>
          {/* Order Summary */}
          <div className="-mr-7 w-full lg:w-[600px] space-y-6 order-1 lg:order-2">
            {isLoading && cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-6 flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#249370] border-t-transparent"></div>
              </div>
            ) : cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center">
                <img src={emptyCart} alt="Empty Cart" className="w-64 mb-6" />
                <h2 className="text-2xl font-semibold mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Add items to start a purchase
                </p>
                <button
                  onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
                  className="px-8 py-3 bg-[#035240] text-white font-medium rounded-lg hover:bg-[#024535] transition duration-300"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-3 md:p-6 space-y-6 border border-black">
                {cart?.map((pd, index) => (
                  <div key={pd.id} className="flex gap-4 md:gap-6 items-start border-b pb-4 last:border-b-0">
                    {/* Image */}
                    {/* <img
                      src={pd.image_url}
                      alt={pd?.alt_tag}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    /> */}
                    {/* Content beside image */}
                    <div className="flex-1 flex flex-col justify-between">
                      {/* Product details */}
                      <div className="flex flex-col-3 justify-between">
                        <h3 className="text-base md:text-sm font-semibold">{pd.product_name}</h3>
                        {pd?.attribute_name && (
                          <p className="text-sm text-gray-600">{pd.attribute_name}</p>
                        )}
                        {pd?.variation_name && (
                          <p className="text-sm text-gray-600">{pd.variation_name}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-[#249370]">₹{pd.price * pd.qty}</span>

                        <div className="flex items-center border border-[#249370] rounded-lg">
                          <button
                            onClick={() => handleQtyUpdate(pd?.id, pd?.qty - 1)}
                            className="px-2 py-1 text-[#249370] hover:bg-[#249370] hover:text-white"
                            disabled={isLoading && loadingItemId === pd?.id}
                          >
                            -
                          </button>
                          <span className="px-3">{pd?.qty}</span>
                          <button
                            onClick={() => handleQtyUpdate(pd?.id, pd?.qty + 1)}
                            className="px-2 py-1 text-[#249370] hover:bg-[#249370] hover:text-white"
                            disabled={isLoading && loadingItemId === pd?.id}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="lg:col-span-1">
              <div className="sticky top-[100px] space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-sm p-6 transition-all border border-black">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Items ({itemCount})</span>
                      <span>₹{totalItemPrice?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Platform Fee</span>
                      <span>₹{tax?.toFixed(2)}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-₹{couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    {tipAmount > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Tip</span>
                        <span>+₹{tipAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all border border-black">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BiSolidOffer className="text-xl text-[#249370]" />
                    <span className="font-medium">Apply Coupon</span>
                  </div>
                  <button
                    onClick={openCouponModal}
                    className="text-[#249370] hover:underline"
                  >
                    View Coupons
                  </button>
                </div>
                {selectedCoupon && (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg mt-4">
                    <div className="flex items-center gap-2">
                      <IoCheckmarkCircle className="text-[#249370]" />
                      <span className="font-medium">
                        {selectedCoupon?.coupon_name}
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-500 text-sm hover:underline" 
                    >
                      Remove
                    </button>
                  </div>
                )}
            </div>

                     {/* Wallet Balance Section */}

  <div className="flex justify-between items-center text-gray-700 mt-3">
    <span className="flex items-center">
      <FaWallet className="mr-2 text-[#249370]" />
      Wallet Balance: ₹{walletBalance.toFixed(2)}
    </span>
    <button
      className={`px-3 py-1 rounded-lg text-sm font-medium ${
        walletApplied ? "bg-red-500 text-white" : "bg-green-500 text-white"
      } ${walletBalance === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleWalletToggle}
      disabled={walletBalance === 0}
    >
      {walletApplied ? "Remove" : "Apply"}
    </button>
  </div>

  {/* Show deduction if applied */}
  {walletApplied && (
    <div className="flex justify-between text-green-600">
      <span>Wallet Applied</span>
      <span>-₹{walletUsed.toFixed(2)}</span>
    </div>
  )}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Amount</span>
                        <span className="text-[#249370]">₹{totalAmount?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-black">
                  <h3 className="text-base font-semibold mb-3">Add a tip to thank the Professional</h3>

                  <div className="flex items-center gap-3 flex-wrap">
                    {[50, 75, 100].map((amount) => (
                      <div key={amount} className="relative">
                        <button
                          onClick={() => {
                            setTipAmount(amount);
                            setCustomTipActive(false);
                            setCustomInput("");
                          }}
                          className={`border px-4 py-2 rounded-lg font-medium text-sm min-w-[60px] ${
                            tipAmount === amount
                              ? "bg-[#249370] text-white border-[#249370]"
                              : "border-gray-300 text-black"
                          }`}
                        >
                          ₹{amount}
                        </button>

                        {amount === 75 && (
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                            POPULAR
                          </span>
                        )}
                      </div>
                    ))}

                    {/* ✅ Custom Tip Button with Inline Input */}
                    <div
                      className={`flex items-center border rounded-lg px-3 py-2 min-w-[70px] ${
                        tipAmount !== 50 && tipAmount !== 75 && tipAmount !== 100 && tipAmount > 0
                          ? "border-[#249370] bg-[#2493701a]"
                          : "border-gray-300"
                      }`}
                    >
                      <span className="text-sm mr-1">₹</span>
                      {customTipActive ? (
                        <input
                          type="number"
                          className="w-12 text-sm outline-none bg-transparent"
                          value={customInput}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setCustomInput(e.target.value);
                            if (!isNaN(val) && val >= 0) {
                              setTipAmount(val);
                            }
                          }}
                          onBlur={() => {
                            if (!customInput || parseInt(customInput) === 0) {
                              setTipAmount(0);
                              setCustomTipActive(false);
                              setCustomInput("");
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <button
                          className="text-sm text-gray-600"
                          onClick={() => {
                            setCustomTipActive(true);
                            setTipAmount(0);
                            setCustomInput("");
                          }}
                        >
                          Custom
                        </button>
                      )}
                    </div>
                    {tipAmount > 0 && (
                      <button
                        onClick={() => {
                          setTipAmount(0);
                          setCustomTipActive(false);
                          setCustomInput("");
                        }}
                        className="border border-red-400 text-red-500 px-3 py-2 rounded-lg font-medium text-sm hover:bg-red-50"
                      >
                        Clear Tip
                      </button>
                    )}
                  </div>
                  {/* ✅ Tip Footer */}
                  <p className="text-xs text-gray-500 mt-6">
                    100% of the tip goes to the professional.
                  </p>
                </div>
                {/* Return Policy */}
                <div className="hidden lg:block">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-black">
                    <div className="flex items-center gap-3 mb-4">
                      <CiDeliveryTruck className="text-2xl text-[#249370]" />
                      <h3 className="font-semibold">Refund Policy</h3>
                    </div>
                    <a
                      href={`${config.VITE_BASE_URL}/privacy-policy`}
                      className="text-gray-600 hover:underline"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOrderConfirmed && (
          <div className="bg-white min-h-screen py-10 px-4 md:px-0">
            <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
              <div className="text-center">
                <IoCheckmarkCircle className="text-green-500 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#035240] mb-2">Booking Confirmed!</h2>
                <p className="text-gray-700 mb-4">
                  Thank you for booking with Hommlie. Your order has been placed successfully.
                </p>

                {tempOrderNumber && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 text-left">
                    <p className="font-semibold text-gray-600 mb-1">Order ID:</p>
                    <p className="text-lg text-[#035240] font-bold">{tempOrderNumber}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setIsOrderConfirmed(false);
                    navigate(`${config.VITE_BASE_URL}/`);
                  }}
                  className="inline-block px-6 py-2 bg-[#035240] text-white rounded-lg hover:bg-[#024535] mb-6"
                >
                  Go to Homepage
                </button>
              </div>

              {/* Recently Booked Items */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Recently Booked Services</h3>
                <div className="space-y-4">
                  {cart?.map((pd) => (
                    <div key={pd.id} className="border p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{pd.product_name}</p>
                        {pd.attribute_name && (
                          <p className="text-sm text-gray-600">{pd.attribute_name}</p>
                        )}
                        {pd.variation_name && (
                          <p className="text-sm text-gray-600">{pd.variation_name}</p>
                        )}
                      </div>
                      <div className="text-[#249370] font-bold">₹{pd.price * pd.qty}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products Section */}
        {prodRelatedProds?.length > 0 && (
          <section className="mt-12 p-4">
            <ProdSection
              title="Similar Services"
              items={visibleItems || []}
              btnHidden
            />
          </section>
        )}
        </>
        )}
        <div className="block lg:hidden mt-6 px-4">
          <div className="-ml-4 bg-white rounded-xl shadow-sm p-6 p-6 w-[110%] mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <CiDeliveryTruck className="text-2xl text-[#249370]" />
              <h3 className="font-semibold">Return Policy</h3>
            </div>
            <a
              href={`${config.VITE_BASE_URL}/privacy-policy`}
              className="text-gray-600 hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      {/* Modals */}
      <DateTimeModal
        isOpen={isDateTimeModalOpen}
        onClose={closeDateTimeModal}
        order_type="AMC"
      />
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} />
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={closeCouponModal}
        totalAmount={totalItemPrice + tax}
      />
    </div>

  );
}
