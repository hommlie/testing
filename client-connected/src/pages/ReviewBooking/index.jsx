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
            const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) + Number(item.tax) * item.qty), 0);
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
            const payment_id = Math.random().toString(36).substring(10);

            if (paymentType?.payment_name === "Online") {
                try {
                    const orderResponse = await axios.post(`${config.API_URL}/api/initiatePayment`, {
                        amount: totalAmount,
                        currency: "INR",
                        user_id: user.id,
                        coupon_id: selectedCoupon ? selectedCoupon.id : null,
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

            console.log({
                user_id: user.id, 
                payment_type: paymentType?.id, 
                payment_id: razorpay_payment_id || payment_id, 
                grand_total: totalAmount,
                discount_amount: couponDiscount,
                coupon_name: selectedCoupon ? selectedCoupon.coupon_name : null, 
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
            });
            
            
            const response = await axios.post(`${config.API_URL}/api/order`, 
                {
                    user_id: user.id, 
                    payment_type: paymentType?.id, 
                    payment_id: razorpay_payment_id || payment_id, 
                    grand_total: totalAmount,
                    discount_amount: couponDiscount,
                    coupon_name: selectedCoupon ? selectedCoupon.coupon_name : null, 
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

    const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

    return (
        <main className="flex justify-center">
            <div className="w-[90%] md:w-[75%] my-6 md:my-16 space-y-4">
                
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full lg:w-[80%] p-4 relative">
                        <div className="flex flex-row justify-between my-8">
                            {
                                topTracker.map((tracker, index) => {
                                    return (
                                        <div key={index} className="w-full flex flex-col justify-center items-center gap-4" style={{color: `${tracker === "Booking Confirmed" ? "#E5E7EB" : ""}`}}>
                                            <span className={`text-xs md:text-base font-semibold`}>{tracker}</span>
                                            <div className={`${tracker === "Booking Confirmed" ? "border-[#E5E7EB]" : "border-[#249370]"} w-2 h-2 lg:w-5 lg:h-5 border-4 bg-white rounded-full`}></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex absolute inset-0 top-[35px] md:top-[40px] justify-center items-center px-24 md:px-32 lg:px-32 gap-9">
                            <div className="w-[255px]" style={{border: "1px solid #249370"}}></div>
                            <div className="w-[255px]" style={{border: "1px solid #E5E7EB"}}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 flex flex-col justify-between gap-4 pb-8 shadow">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <HiOutlineLocationMarker />
                            <span className="text-lg">Your Address</span>
                        </div>
                    </div>
                    <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div style={{color: "rgba(0,0,0,0.4)"}} className="">
                        <div className="flex flex-col">
                        {
                            dataLoaded && Object.keys(selectedAddrs || {}).length > 0 
                            ? <div className="flex flex-col">
                                <span className="font-bold flex flex-row items-center gap-2">{selectedAddrs.name}</span>
                                <span className="">{selectedAddrs.address}</span>
                                <span className="">{selectedAddrs.landmark}</span>
                                <span className="">{selectedAddrs.pincode}</span>
                                <span className="flex flex-row items-center gap-2">
                                    {selectedAddrs.mobile}
                                </span>
                                </div>
                            : <span>No address selected</span>
                        }
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 flex flex-col justify-between gap-4 pb-8 shadow">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg">Day & Time Slot</p>
                    </div>
                    <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div>
                        <div style={{color: "rgba(0,0,0,0.4)"}}>
                            {
                                selectedDayTime?.length != 0 
                                ? <div className="flex flex-col mt-2">
                                        {selectedDayTime?.date?.day} - {selectedDayTime?.date?.date} @ {selectedDayTime?.time}
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 flex flex-col justify-between gap-4 pb-8 shadow">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <BiSolidOffer color="#4ECB71" className="w-[25px] h-[25px]" />
                            <span className="text-lg">Extra Discount</span>
                        </div>
                        {
                            selectedCoupon?.coupon_name
                            ?<div className="flex flex-row items-center gap-2">
                                <span className="font-bold" style={{color: "#249370"}}>COUPON CODE APPLIED "{selectedCoupon?.coupon_name}"</span>
                            </div>
                            :<span className="font-bold">No coupons added</span>
                        }
                    </div>
                </div>

                <div className="bg-white p-4 flex flex-col justify-between gap-4 pb-8 shadow">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <CiCreditCard1 />
                            <span className="text-lg">Payment</span>
                        </div>
                    </div>
                    <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div className="w-1/2 flex flex-row items-center gap-3">
                        <p>{paymentType?.payment_name}</p>
                    </div>
                </div>

                <div className="bg-white p-4 space-y-4 shadow">
                    <p className="text-lg">Price Details (<span>{itemCount}</span> items)</p>
                    <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div className="space-y-2">
                        <div className="text-sm flex flex-row justify-between" style={{color: "#606571"}}>
                            <p>Price (<span>{itemCount}</span> items)</p>
                            <p>₹<span>{totalItemPrice}</span></p>
                        </div>
                        <div className="text-sm flex flex-row justify-between" style={{color: "#606571"}}>
                            <p>Tax & Fees</p>
                            <p>₹<span>{tax}</span></p>
                        </div>
                        {couponDiscount > 0 && (
                            <div className="text-sm flex justify-between text-green-600">
                                <span>Coupon Discount</span>
                                <span>-₹{couponDiscount.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                    <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div className="text-xl flex flex-row justify-between mt-2" style={{color: "#606571"}}>
                        <p>Total</p>
                        <p>₹<span>{totalAmount - couponDiscount}</span></p>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-4 pt-8">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-3">
                            {/* <div className="flex flex-row gap-2">
                                <CiDeliveryTruck className="w-[24px] h-[24px]" color="#249370" />
                                <div>
                                    <p className="font-medium">Free Shipping</p>
                                    <p style={{color: "#6B7280"}}>Free standard shipping on orders over Rs 300</p>
                                    <p style={{color: "#6B7280"}}>Estimated to be delivered on <span>28/02/2022</span> - <span>03/03/2022</span></p>
                                </div>
                            </div> */}
                            <div className="flex flex-row items-center gap-2">
                                <CiDeliveryTruck className="w-[24px] h-[24px]" color="#249370" />
                                <div>
                                    <p className="font-medium">Return Policy</p>
                                    <a href={`${config.VITE_BASE_URL}/privacy-policy`} className="underline" style={{color: "#6B7280"}}>Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-3">
                            <img src={secureIcon} className="w-[36px] h-[36px]" alt="" />
                            <p className="text-xs text-center" style={{color: "#B2B2B2"}}>Safe and Secure Payments Easy Returns.<br />100% Authentic Products.</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleProceed} 
                        className="w-[354px] h-[48px] flex text-white items-center justify-center" 
                        style={{backgroundColor: "#249370"}}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                    </button>
                    <button onClick={() => navigate(-1)} className="w-[354px] h-[48px] underline">Go Back</button>
                </div>

            </div>
        </main>
    );
}