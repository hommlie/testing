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

  useEffect(() => {
    window.scrollTo(0, 0);
    getCart();
    getAddresses();
    // getCoupons();
    getPaymentList();

    getProductDetails();
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
    const id = cart[0]?.product_id;
    try {
      const response = await axios.post(
        `${config.API_URL}/api/productdetails`,
        { product_id: id }
      );
      setProdRelatedProds(response.data.related_products);
    } catch (err) {
      console.log("error: " + err);
    }
  }

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
        setIsLoading(true);
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
            const user = jwtDecode(jwtToken);
            const payment_id = Math.random().toString(36).substring(2, 12);

            if (paymentType?.payment_name === "Online") {
                try {
                    const orderResponse = await axios.post(`${config.API_URL}/api/initiatePayment`, {
                        amount: totalAmount - couponDiscount,
                        currency: "INR",
                        user_id: user.id,
                    }, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });                    

                    const options = {
                        key: config.RAZORPAY_KEY_ID,
                        amount: orderResponse.data.data.amount,
                        currency: orderResponse.data.data.currency,
                        name: "Hommlie",
                        description: "Order Payment",
                        order_id: orderResponse.data.data.id,
                        handler: async function (response) {
                            console.log("Payment Response:", response);
                            try {
                                const verifyResponse = await axios.post(`${config.API_URL}/api/verifyPayment`, {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${jwtToken}`,
                                    },
                                });
                                
                                if (verifyResponse.data.status === 1) {
                                    await placeOrder(user, payment_id, response.razorpay_payment_id);
                                } else {
                                    errorNotify("Payment verification failed. Please try again.");
                                }
                            } catch (error) {
                                console.error("Error verifying payment:", error);
                                errorNotify("Error verifying payment. Please contact support.");
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
                    errorNotify("Error processing payment. Please try again.");
                } finally {
                    setIsLoading(false);
                }
            } else {
                await placeOrder(user, payment_id);
            }
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
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("HommlieUserjwtToken")}`,
                    },
                }
            );            

            if (response.data.status === 1) {
                console.log(response.data.message);
                successNotify("Successfully placed your order");
                localStorage.removeItem("cart");
                setCart([]);
                localStorage.removeItem("HommlieselectedAddrs");
                localStorage.removeItem("HommlieselectedDayTime");
                localStorage.removeItem("HommlieselectedCoupon");
                localStorage.removeItem("HommliepaymentType");
                getBookings();
                getCart();
                navigate(`${config.VITE_BASE_URL}/booking-success/${response.data.order_number}`);
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
  const totalAmount = totalItemPrice + tax - couponDiscount;

  const handleProductClick = (item) => {
    const slug = item.product_name.toLowerCase().replace(/ /g, "-");
    navigate(`${config.VITE_BASE_URL}/product/${slug}`);
  };

  const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

  return (
    <div className=""  style={{
            background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Progress Tracker */}
        {/* <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-sm mb-4">
          <div className="w-full lg:w-[80%] p-4 relative">
            <div className="flex flex-row justify-between my-8">
              {topTracker.map((tracker, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col justify-center items-center gap-4"
                    style={{
                      color: `${
                        tracker === "Booking Confirmed" ? "#E5E7EB" : ""
                      }`,
                    }}
                  >
                    <span
                      className={`text-[9px] md:text-xs md:text-base font-semibold`}
                    >
                      {tracker}
                    </span>
                    <div
                      className={`${
                        tracker === "Booking Confirmed"
                          ? "border-[#E5E7EB]"
                          : "border-[#249370]"
                      } w-2 h-2 lg:w-5 lg:h-5 border-4 bg-white rounded-full`}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="flex absolute inset-0 top-[35px] md:top-[40px] justify-center items-center px-24 md:px-32 lg:px-32 gap-9">
              <div
                className="w-[255px]"
                style={{ border: "1px solid #249370" }}
              ></div>
              <div
                className="w-[255px]"
                style={{ border: "1px solid #E5E7EB" }}
              ></div>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Cart Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-10 w-100px">
              {/* Account Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-l font-semibold flex items-center gap-2">
                    <MdOutlineSendToMobile className="text-xl text-[#249370]" />
                    Send Your Booking Details To
                  </h2>

                  {/* 
                  <NavLink
                    to={`${config.VITE_BASE_URL}/edit-profile`}
                    className="px-4 py-2 text-[#249370] border-2 border-[#249370] rounded-lg hover:bg-[#249370] hover:text-white transition-colors"
                  >
                    Edit
                  </NavLink> 
                  */}
                </div>

                <div className="-mt-3">
                  <div className="space-y-2 text-gray-600">
                    <p className="text-gray-500 mb-3">
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
                    <HiOutlineLocationMarker className="text-2xl text-[#249370]" />
                    <h2 className="text-xl font-semibold">Delivery Address</h2>
                  </div>
                  <button
                    onClick={openAddressModal}
                    className="px-4 py-2 text-[#249370] border-2 border-[#249370] rounded-lg hover:bg-[#249370] hover:text-white transition-colors"
                  >
                    {selectedAddrs ? "Edit" : "Add"}
                  </button>
                </div>
                <div className="">
                  {selectedAddrs ? (
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p className="font-medium text-black">{selectedAddrs.name}</p>
                      <p>{selectedAddrs.address}</p>
                      <p>{selectedAddrs.landmark}</p>
                      <p>{selectedAddrs.pincode}</p>
                      <p>Mobile: {selectedAddrs.mobile}</p>
                    </div>
                  ) : (
                    <p className=" text-gray-500 -mt-5">Please select a delivery address</p>
                  )}
                </div>
                <div className="border-t border-gray-100"></div>
              </div>

              {/* Delivery Time Section - only visible after address is selected */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="-mt-6 w-full">
                    <div className="flex items-center gap-3">
                      <RiTimerLine className="text-2xl text-[#249370]" />
                      <h2 className="text-xl font-semibold">Select Your Slot</h2>
                    </div>

                    <div className="mt-3 flex justify-between items-center gap-3 sm:w-[580px] w-full">
                      {!selectedDayTime?.date?.day || !selectedDayTime?.time ? (
                        // Show full-width button if not selected
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
                          Select Time
                        </button>
                      ) : (
                        // Show Edit button on right
                        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:w-[560px] gap-2 sm:gap-0 relative mb-4">
                          <div className="w-full sm:w-auto">
                            <p className="text-gray-600 text-sm">
                              {selectedDayTime?.date?.day} - {selectedDayTime?.date?.date} @ {selectedDayTime?.time}
                            </p>
                          </div>

                          {/* Mobile: normal flow | Desktop: absolute positioned button */}
                          <div className="w-full sm:w-[70px] sm:absolute l:right:[-50px] sm:right-[-130px] sm:top-1.5 sm:-mt-10">
                            <button
                              onClick={() => {
                                if (selectedAddrs) openDateTimeModal();
                              }}
                              className="w-full px-4 py-2 text-[#249370] border-2 border-[#249370] rounded-lg hover:bg-[#249370] hover:text-white transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      {!selectedAddrs ? (
                        <p className="text-red-400">Please select a delivery address first</p>
                      ) : !selectedDayTime?.date?.day || !selectedDayTime?.time ? (
                        <p className="text-gray-500">Please select delivery date and time</p>
                      ) : null}
                    </div>
                  </div>
                </div>
                
                  {/* Payment Options */}
                  <h3 className="font-semibold">Payment Method</h3>
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
                  <div className={`space-y-3 ${(!selectedAddrs || !selectedDayTime?.date?.day || !selectedDayTime?.time) ? 'opacity-50 pointer-events-none' : ''}`}>
                    {paymentList?.map((payment) => (
                      <label
                        key={payment.id}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          paymentType?.id === payment.id
                            ? "border-[#249370] bg-green-50"
                            : "border-gray-200 hover:border-[#249370]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={payment.id}
                          checked={paymentType?.id === payment.id}
                          onChange={handlePaymentChange}
                          disabled={!selectedAddrs || !selectedDayTime?.date?.day || !selectedDayTime?.time}
                          className="mr-3 text-[#249370] focus:ring-[#249370]"
                        />
                        <span className="font-medium">
                          {payment.payment_name}
                        </span>
                      </label>
                    ))}
                      <button 
                           className="w-full py-4 bg-[#035240] text-white font-medium rounded-lg hover:bg-[#024535] transition-colors mt-6"
                           disabled={isLoading}
                           onClick={handleProceed}
                       >
                           {isLoading ? (
                               <div className="flex items-center justify-center gap-2">
                                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                  {/* <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-gray-200">
                    <img
                      src={secureIcon}
                      alt="Secure Payment"
                      className="w-8 h-8"
                    />
                    <p className="text-sm text-gray-500">
                      Safe and Secure Payments
                    </p>
                  </div> */}
                
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
          <div className="lg:col-span-1 space-y-6">
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
              <div className="bg-white rounded-xl shadow-sm p-3 md:p-6 space-y-6">
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

                      {/* Price & Qty control */}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-[#249370]">₹{pd.price * pd.qty}</span>

                        {/* Qty controller */}
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
            {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all">
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
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
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
            <div className="bg-white rounded-xl shadow-sm p-6 sticky sticky-header-offset transition-all">
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
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-[#249370]">
                      ₹{totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
