import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { useCont } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import secureIcon from '../../assets/images/secure-icon.png';
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";

export default function ReviewBooking() {

    const { getBookings, cart, setCart, getCart, selectedAddrs, setSelectedAddrs, selectedDayTime, setSelectedDayTime, selectedCoupon, setSelectedCoupon, paymentType, setPaymentType } = useCont();
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);

    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');
    const warningNotify = (warning) => notify(warning, 'warning');

    useEffect(() => {
        window.scrollTo(0, 0);
        loadStoredData();
    }, []);

    const loadStoredData = () => {
        setIsLoading(true);
        try {
            const addrs = getStoredItem('HommlieselectedAddrs');
            const dayTime = getStoredItem('HommlieselectedDayTime');
            const coupon = getStoredItem('HommlieselectedCoupon');
            const payment = getStoredItem('HommliepaymentType');

            setSelectedAddrs(addrs || {});
            setSelectedDayTime(dayTime || {});
            setSelectedCoupon(coupon || {});
            setPaymentType(payment || {});

            setDataLoaded(true);
        } catch (error) {
            console.error('Error loading stored data:', error);
            setSelectedAddrs({});
            setSelectedDayTime({});
            setSelectedCoupon({});
            setPaymentType({});
            setDataLoaded(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getStoredItem = (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error parsing ${key} from localStorage:`, error);
            return null;
        }
    };

    useEffect(() => {
        calculateCouponDiscount();
    }, [selectedCoupon, cart]);

    const calculateCouponDiscount = () => {
        if (selectedCoupon) {
            const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);
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

    const itemCount = cart?.length;
    const totalItemPrice = cart.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.price) * Number(currentValue.qty)), 0);
    const tax = cart.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.tax) * Number(currentValue.qty)), 0);
    const totalAmount = totalItemPrice + tax;

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

            const contractStartDate = selectedDayTime?.date?.formattedDate;
            // For now, let contract end date be null; backend will calculate if not sent
            const contractEndDate = null;
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
                    contract_start_date: contractStartDate,
                    contract_end_date: contractEndDate,
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

    const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Progress Tracker - Keep existing tracker code */}
                <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-sm mb-8">
                    <div className="w-full lg:w-[80%] p-4 relative">
                        <div className="flex flex-row justify-between my-8">
                            {topTracker.map((tracker, index) => (
                                <div key={index} className="w-full flex flex-col justify-center items-center gap-4" style={{color: `${tracker === "Booking Confirmed" ? "#E5E7EB" : ""}`}}>
                                    <span className={`text-xs md:text-base font-semibold`}>{tracker}</span>
                                    <div className={`${tracker === "Booking Confirmed" ? "border-[#E5E7EB]" : "border-[#249370]"} w-2 h-2 lg:w-5 lg:h-5 border-4 bg-white rounded-full`}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex absolute inset-0 top-[35px] md:top-[40px] justify-center items-center px-24 md:px-32 lg:px-32 gap-9">
                            <div className="w-[255px]" style={{border: "1px solid #249370"}}></div>
                            <div className="w-[255px]" style={{border: "1px solid #E5E7EB"}}></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Address Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <HiOutlineLocationMarker className="text-2xl text-[#249370]" />
                                <h2 className="text-xl font-semibold">Delivery Address</h2>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                {dataLoaded && Object.keys(selectedAddrs || {}).length > 0 ? (
                                    <div className="space-y-2 text-gray-600">
                                        <p className="font-medium text-black">{selectedAddrs.name}</p>
                                        <p>{selectedAddrs.address}</p>
                                        <p>{selectedAddrs.landmark}</p>
                                        <p>{selectedAddrs.pincode}</p>
                                        <p>Mobile: {selectedAddrs.mobile}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No address selected</p>
                                )}
                            </div>
                        </div>

                        {/* Day & Time Slot Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Day & Time Slot</h2>
                            <div className="border-t border-gray-100 pt-4">
                                {selectedDayTime?.length !== 0 ? (
                                    <p className="text-gray-600">
                                        {selectedDayTime?.date?.day} - {selectedDayTime?.date?.date} @ {selectedDayTime?.time}
                                    </p>
                                ) : (
                                    <p className="text-gray-500">No time slot selected</p>
                                )}
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <BiSolidOffer className="text-xl text-[#249370]" />
                                <h2 className="text-xl font-semibold">Applied Coupon</h2>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                {selectedCoupon?.coupon_name ? (
                                    <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="font-medium">Coupon Code Applied: "{selectedCoupon?.coupon_name}"</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No coupons added</p>
                                )}
                            </div>
                        </div>

                        {/* Payment Method Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CiCreditCard1 className="text-2xl text-[#249370]" />
                                <h2 className="text-xl font-semibold">Payment Method</h2>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-gray-600">{paymentType?.payment_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky sticky-header-offset transition-all">
                            <h2 className="text-xl font-semibold mb-4">Price Details ({itemCount} items)</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Price ({itemCount} items)</span>
                                    <span>₹{totalItemPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax & Fees</span>
                                    <span>₹{tax}</span>
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
                                        <span className="text-[#249370]">₹{(totalAmount - couponDiscount)?.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleProceed}
                                    className="w-full py-4 bg-[#035240] text-white font-medium rounded-lg hover:bg-[#024535] transition-colors mt-6"
                                    disabled={isLoading}
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

                                <button 
                                    onClick={() => navigate(-1)}
                                    className="w-full py-4 text-[#249370] font-medium hover:underline transition-colors"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CiDeliveryTruck className="text-2xl text-[#249370]" />
                            <h3 className="font-semibold">Return Policy</h3>
                        </div>
                        <a href={`${config.VITE_BASE_URL}/privacy-policy`} className="text-gray-600 hover:underline">
                            Learn More
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <img src={secureIcon} alt="Secure Payment" className="w-9 h-9 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                            Safe and Secure Payments.<br />100% Authentic Products.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}