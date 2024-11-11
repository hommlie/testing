import React, { useEffect, useState } from "react";
import { RiTimerLine, RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSolidOffer } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCont } from "../../context/MyContext";
import { NavLink, useNavigate } from "react-router-dom";
import secureIcon from '../../assets/images/secure-icon.png';
import AddressModal from "../../components/AddressModal";
import DateTimeModal from "../../components/DateTimeModal";
import CouponModal from "../../components/CouponModal";
import PaymentModal from "../../components/PaymentModal";
import { useToast } from "../../context/ToastProvider";
import emptyCart from '../../assets/images/illustrator/empty_cart.png';
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import ProdSection from "../../components/ProdSection";

export default function AddtoCart() {
    const navigate = useNavigate();
    const notify = useToast();
    const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
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
        getCoupons,
        coupons,
        paymentType, 
        setPaymentType,
        paymentList, 
        setPaymentList,
        getPaymentList,
    } = useCont();

    const addressNotify = () => notify("Please select your delivery address!", 'warning');
    const dateTimeNotify = () => notify("Please select your delivery Date & Time!", 'warning');
    const paymentNotify = () => notify("Please select your payment method", 'warning');

    const openAddressModal = () => setIsAddressModalOpen(true);
    const closeAddressModal = () => setIsAddressModalOpen(false);
    const openDateTimeModal = () => setIsDateTimeModalOpen(true);
    const closeDateTimeModal = () => setIsDateTimeModalOpen(false);
    const openPaymentModal = () => setIsPaymentOpen(true);
    const closePaymentModal = () => setIsPaymentOpen(false);
    const openCouponModal = () => setIsCouponModalOpen(true);
    const closeCouponModal = () => {        
        setIsCouponModalOpen(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        // getCart();
        // getAddresses();
        // getCoupons();

        getProductDetails();
        
    }, [cartLength]);

    useEffect(() => {
        setSelectedAddrs(localStorage.getItem('HommlieselectedAddrs') == "undefined" ? [] : JSON.parse(localStorage.getItem('HommlieselectedAddrs')));
        setSelectedDayTime(localStorage.getItem('HommlieselectedDayTime') == "undefined" ? [] : JSON.parse(localStorage.getItem('HommlieselectedDayTime')));
        setSelectedCoupon(localStorage.getItem('HommlieselectedCoupon') == "undefined" ? [] : JSON.parse(localStorage.getItem('HommlieselectedCoupon')));
        setPaymentType(paymentList[0]);
    }, []);

    async function getProductDetails() {        
        const id = cart[0]?.product_id;
        try {
            const response = await axios.post(`${config.API_URL}/api/productdetails`, { product_id: id });            
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

    const handleRemoveFromCart = async(id) => {
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
            const user_id = jwtDecode(jwtToken);
            try {
                const response = await axios.post(`${config.API_URL}/api/deleteproduct`, 
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
                if(response.data.status === 1) {
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
                    const response = await axios.post(`${config.API_URL}/api/qtyUpdate`,
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
                    if(response.data.status === 1) {
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
        const selected = paymentList.find(payment => payment.id == value);
        setPaymentType(selected);
    };

    const handleEmptyCartClick = () => {
        notify("Your cart is empty. Add items to proceed.", 'warning');
    };

    const handleProceed = () => {
        if (user) {
            if(!selectedAddrs) {
                addressNotify();
                openAddressModal();
            } else if(!selectedDayTime) {
                dateTimeNotify();
                openDateTimeModal();
            } else if(!paymentType) {
                paymentNotify();
            } else {
                if (selectedAddrs) localStorage.setItem('HommlieselectedAddrs', JSON.stringify(selectedAddrs));
                if (selectedDayTime) localStorage.setItem('HommlieselectedDayTime', JSON.stringify(selectedDayTime));
                if (selectedCoupon) localStorage.setItem('HommlieselectedCoupon', JSON.stringify(selectedCoupon));
                if (paymentType) localStorage.setItem('HommliepaymentType', JSON.stringify(paymentType));
                navigate(`${config.VITE_BASE_URL}/review-booking`);
            }
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
            const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
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
        localStorage.removeItem('HommlieselectedCoupon');
        setCouponDiscount(0);
    };

    const visibleItems = prodRelatedProds?.slice(currentIndex, currentIndex + visibleItemsCount);

    const itemCount = cart?.length;
    const totalItemPrice = cart.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.price) * Number(currentValue.qty)), 0);
    const tax = cart.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.tax) * Number(currentValue.qty)), 0);
    const totalAmount = totalItemPrice + tax - couponDiscount;

    const handleProductClick = (item) => {        
        const slug = item.product_name.toLowerCase().replace(/ /g, '-');
        navigate(`${config.VITE_BASE_URL}/product/${item.product_id}/${slug}`);
    };

    const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

    return (
        <main className="flex justify-center bg-gray-100">
            <div className="relative w-full max-w-5xl my-6 md:my-16 space-y-6 px-4">
                <DateTimeModal isOpen={isDateTimeModalOpen} onClose={closeDateTimeModal} order_type="AMC" />
                <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} />
                <CouponModal isOpen={isCouponModalOpen} onClose={closeCouponModal} totalAmount={totalItemPrice + tax} />
                <PaymentModal isOpen={isPaymentOpen} onClose={closePaymentModal} />
                
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full p-4 relative">
                        <div className="flex flex-row justify-between my-8">
                            {
                                topTracker?.map((tracker, index) => {
                                    return (
                                        <div key={index} className="w-full flex flex-col justify-center items-center gap-4" style={{color: `${tracker === "Booking Confirmed" ? "#E5E7EB" : ""}`}}>
                                            <span className="text-xs md:text-base font-semibold">{tracker}</span>
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

                {isLoading && cart.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col items-center justify-center">
                        <p className="text-lg text-gray-600 mb-4">Loading...</p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col items-center justify-center">
                        <img src={emptyCart} className="w-64" alt="" />
                        <button 
                            onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
                            className="px-6 py-1 bg-[#249370] text-white font-semibold hover:bg-green-700 transition duration-300"
                            style={{backgroundColor: "#035240"}}
                        >
                            Add Item
                        </button>
                    </div>
                ) : ( 
                    cart?.map((pd, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center">
                                {/* {pd.image_url &&
                                    <div onClick={() => handleProductClick(pd)}>
                                        <img src={pd.image_url} alt="" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mr-4" />
                                    </div>
                                } */}
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg md:text-xl mb-2">{pd.product_name}</h3>
                                    <p className="text-gray-600 mb-2">{pd?.attribute_name}</p>
                                    <p className="text-gray-600 mb-2">{pd?.variation_name}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg">₹{pd.price * pd.qty}</span>
                                    </div>
                                </div>                            <div className="h-32 flex flex-col justify-between items-end">
                                <div className="flex items-center rounded-xl" style={{border: "1px solid #249370", color: "#249370"}}>
                                    <button 
                                        onClick={() => handleQtyUpdate(pd?.id, pd?.qty - 1)} 
                                        className="w-8 h-8 rounded-l-lg"
                                        disabled={isLoading && loadingItemId === pd?.id}
                                    >
                                        {isLoading && loadingItemId === pd?.id ? (
                                            <span className="loader"></span>
                                        ) : (
                                            "-"
                                        )}
                                    </button>
                                    <span className="text-center w-8 h-8 leading-8">{pd?.qty}</span>
                                    <button 
                                        onClick={() => handleQtyUpdate(pd?.id, pd?.qty + 1)} 
                                        className="w-8 h-8 rounded-r-lg"
                                        disabled={isLoading && loadingItemId === pd?.id}
                                    >
                                        {isLoading && loadingItemId === pd?.id ? (
                                            <span className="loader"></span>
                                        ) : (
                                            "+"
                                        )}
                                    </button>
                                </div>
                                <button onClick={() => handleRemoveFromCart(pd?.id)} className="ml-4 flex">
                                    <RiDeleteBin5Line size={20} color="#374151"  />
                                </button>
                            </div>
                        </div>
                    ))      
                )}

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Price Details ({itemCount} items)</h2>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div className="space-y-2 mb-4" style={{color: "rgba(0,0,0,0.4)"}}>
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
                    </div>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div className="flex justify-between text-xl font-semibold">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Account</h2>
                        <NavLink to={`${config.VITE_BASE_URL}/edit-profile`} style={{border: "1px solid #249370", color: "#249370"}} className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Edit</NavLink>
                    </div>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div style={{color: "rgba(0,0,0,0.4)"}}>
                        <p>{user?.name}</p>
                        <p>Mob: {user?.mobile}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <HiOutlineLocationMarker className="text-2xl text-[#249370] mr-2" />
                            <h2 className="text-lg font-semibold">Address</h2>
                        </div>
                        <button onClick={openAddressModal} style={{border: "1px solid #249370", color: "#249370"}} className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            {selectedAddrs ? "Change Address" : "Choose Address"}
                        </button>
                    </div>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div style={{color: "rgba(0,0,0,0.4)"}}>
                        {selectedAddrs ? (
                            <div>
                                <p className="font-semibold">{selectedAddrs.name}</p>
                                <p>{selectedAddrs.address}</p>
                                <p>{selectedAddrs.landmark}</p>
                                <p>{selectedAddrs.pincode}</p>
                                <p>{selectedAddrs.mobile}</p>
                            </div>
                        ) : (
                            "Choose your delivery address"
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Select Day & Time Slot</h2>
                        <button onClick={openDateTimeModal} style={{border: "1px solid #249370", color: "#249370"}} className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            {selectedDayTime ? "Edit" : "Choose"}
                        </button>
                    </div>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div style={{color: "rgba(0,0,0,0.4)"}}>
                        {selectedDayTime ? (
                            <p>{selectedDayTime?.date?.day} - {selectedDayTime?.date?.date} @ {selectedDayTime?.time}</p>
                        ) : (
                            "Choose your delivery Date & Time"
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold mb-4">Payment options</h2>
                        {/* <button onClick={openPaymentModal} style={{border: "1px solid #249370", color: "#249370"}} className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            {selectedDayTime ? "Edit" : "Choose"}
                        </button> */}
                    </div>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div className="space-y-4" style={{color: "rgba(0,0,0,0.4)"}}>
                        {paymentList?.map((payment) => (
                            <div key={payment.id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`payment-${payment.id}`}
                                    name="paymentMethod"
                                    value={payment.id}
                                    checked={paymentType?.id === payment.id}
                                    onChange={handlePaymentChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`payment-${payment.id}`}>{payment.payment_name}</label>
                            </div>
                        ))}
                    </div>
                    {paymentType?.payment_name === 'Card' && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Enter your Card details</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <input type="text" id="cardNumber" name="cardNumber" placeholder="Enter Your Card Number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                </div>
                                <div>
                                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on the card</label>
                                    <input type="text" id="cardName" name="cardName" placeholder="Name on the card" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry</label>
                                        <div className="flex space-x-2">
                                            <input type="text" id="expiryMonth" name="expiryMonth" placeholder="MM" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                            <input type="text" id="expiryYear" name="expiryYear" placeholder="YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                        <input type="text" id="cvv" name="cvv" placeholder="CVV" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="saveCard" name="saveCard" className="h-4 w-4 text-[#249370] focus:ring-green-500 border-gray-300 rounded" />
                                    <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                                        Save this card information to my account and make faster payments.
                                    </label>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <BiSolidOffer className="text-2xl text-[#249370] mr-2" />
                            <h2 className="text-lg font-semibold">Coupons</h2>
                        </div>
                        <button onClick={openCouponModal} style={{border: "1px solid #249370", color: "#249370"}} className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            Explore Now
                        </button>
                    </div>
                    <div className="mb-2" style={{border: "1px dotted #E5E7EB"}}></div>
                    <div style={{color: "rgba(0,0,0,0.4)"}}>
                        {selectedCoupon ? (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <IoCheckmarkCircle className="text-[#249370] mr-2" />
                                    <span className="font-semibold">{selectedCoupon?.coupon_name}</span>
                                </div>
                                <button onClick={handleRemoveCoupon} className="text-red-500">Remove</button>
                            </div>
                        ) : (
                            coupons?.length ? (
                                <p className="font-semibold">You have unlocked <span className="text-[#249370]">{coupons?.length} new coupons</span></p>
                            ) : null
                        )}
                    </div>
                </div>

                <section className="container mx-auto section p-4">
                    <ProdSection
                        title = "Similar Services"
                        items = {visibleItems ? visibleItems : []}
                        btnHidden
                    />
                </section>

                <section className="bg-white rounded-lg shadow p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0 md:mr-4">
                            <h2 className="text-2xl font-semibold mb-2">Need help finding the right plan?</h2>
                            <p className="text-gray-600">Our team will get in touch to answer your questions and help you get started</p>
                            <button className="text-[#249370] text-semibold" onClick={() => navigate(`${config.VITE_BASE_URL}/contact-us`)}>
                                Contact us now
                            </button>
                        </div>
                    </div>
                    {/* <div className="mt-4 flex flex-col sm:flex-row">
                        <input
                            type="tel"
                            placeholder="Enter your Mobile No"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={callbackMobileNumber}
                            onChange={(e) => setCallbackMobileNumber(e.target.value)}
                        />
                        <button
                            onClick={handleCallbackRequest}
                            className="mt-2 sm:mt-0 px-6 py-2 bg-[#249370] text-white font-semibold rounded-r-lg transition duration-300"
                        >
                            CALLBACK
                        </button>
                    </div> */}
                </section>

                <div className="flex flex-col items-center gap-4 mt-8">
                    <img src={secureIcon} alt="Secure payment" className="w-12 h-12" />
                    <p className="text-sm text-center text-gray-500">
                        Safe and Secure Payments. Easy Returns.<br />100% Authentic Products.
                    </p>
                    {/* <button 
                        onClick={cart.length === 0 ? handleEmptyCartClick : handleProceed} 
                        className={`w-full max-w-md py-3 text-white font-semibold transition duration-300 ${
                            cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#249370] hover:bg-green-700'
                        }`}
                        style={{backgroundColor: cart.length === 0 ? "#cccccc" : "#035240"}}
                        // disabled={cart.length === 0}
                    >
                        PROCEED TO PAYMENT
                    </button> */}
                </div>

                <div className="sticky bottom-2 z-20 transition-transform duration-300 flex justify-center">
                    <button 
                        onClick={cart.length === 0 ? handleEmptyCartClick : handleProceed} 
                        className={`w-full max-w-md py-3 text-white font-semibold transition duration-300 ${
                            cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#249370] hover:bg-green-700'
                        }`}
                        style={{backgroundColor: cart.length === 0 ? "#cccccc" : "#035240"}}
                        // disabled={cart.length === 0}
                    >
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </main>
    );
}