import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCreditCard, FaWallet } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiTimerLine } from 'react-icons/ri';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';
import CouponModal from '../CouponModal';
import { BiSolidOffer } from 'react-icons/bi';

const CheckoutSummaryModal = ({ isOpen, onClose, onOrderSuccess }) => {
    const {
        user,
        cart,
        getCart,
        selectedAddrs,
        selectedDayTime,
        paymentList,
        getPaymentList,
        totalPrice,
        getBookings
    } = useCont();

    const [paymentType, setPaymentType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const notify = useToast();

    const { selectedCoupon, setSelectedCoupon } = useCont();
    const [couponDiscount, setCouponDiscount] = useState(0);

    // Initialize payment list if empty
    React.useEffect(() => {
        if (isOpen && (!paymentList || paymentList.length === 0)) {
            getPaymentList();
        }
        if (isOpen && paymentList?.length > 0 && !paymentType) {
            setPaymentType(paymentList[0]);
        }
    }, [isOpen, paymentList]);

    const subtotal = cart.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
    const tax = cart.reduce((acc, item) => acc + Number(item.tax) * item.qty, 0);

    // Calculate coupon discount
    React.useEffect(() => {
        if (selectedCoupon) {
            if (selectedCoupon.calculatedDiscount) {
                setCouponDiscount(Number(selectedCoupon.calculatedDiscount));
            } else if (selectedCoupon.amount) {
                setCouponDiscount(Number(selectedCoupon.amount));
            } else if (selectedCoupon.percentage) {
                setCouponDiscount((subtotal * Number(selectedCoupon.percentage)) / 100);
            }
        } else {
            setCouponDiscount(0);
        }
    }, [selectedCoupon, subtotal]);

    if (!isOpen) return null;

    const totalAmount = Math.max(0, subtotal + tax - couponDiscount);

    const handlePlaceOrder = async () => {
        if (!paymentType) {
            notify("Please select a payment method", "warning");
            return;
        }

        setIsLoading(true);
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        const u = jwtDecode(jwtToken);
        const clientPaymentId = Math.random().toString(36).substring(2, 12);

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
                                await finalizeOrder(u, clientPaymentId, response.razorpay_payment_id);
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
            await finalizeOrder(u, clientPaymentId);
        }
    };

    const finalizeOrder = async (user, clientPaymentId, razorpayPaymentId = null) => {
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        try {
            const response = await axios.post(
                `${config.API_URL}/api/order`,
                {
                    user_id: user.id,
                    payment_type: paymentType?.id,
                    payment_id: razorpayPaymentId || clientPaymentId,
                    grand_total: totalAmount,
                    discount_amount: couponDiscount,
                    coupon_name: selectedCoupon?.coupon_name || null,
                    coupon_id: selectedCoupon?.id || null,
                    order_notes: "Mobile Quick Booking",
                    full_name: selectedAddrs?.name,
                    email: selectedAddrs?.email,
                    mobile: selectedAddrs?.mobile,
                    landmark: selectedAddrs?.landmark,
                    street_address: selectedAddrs?.address,
                    pincode: selectedAddrs?.pincode,
                    latitude: selectedAddrs?.latitude,
                    longitude: selectedAddrs?.longitude,
                    desired_date: selectedDayTime?.date?.formattedDate,
                    desired_time: selectedDayTime?.time,
                    wallet_used: 0,
                    tip_amount: 0,
                    wallet_amount: cart.reduce((acc, item) => acc + Number(item.wallet_amount || 0) * Number(item.qty || 1), 0),
                },
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            );

            if (response.data.status === 1) {
                notify("Successfully placed your order", "success");
                localStorage.removeItem("cart");
                localStorage.removeItem("HommlieselectedCoupon");
                setSelectedCoupon(null);
                await getCart();
                await getBookings();
                onOrderSuccess(response.data.order_number);
                onClose();
            } else {
                notify(response.data.message || "Unable to place order", "error");
            }
        } catch (error) {
            console.error("Order error:", error);
            notify("Error placing order. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Review & Place Order</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .overflow-y-auto::-webkit-scrollbar {
                            width: 6px;
                            display: block !important;
                        }
                        .overflow-y-auto::-webkit-scrollbar-thumb {
                            background-color: #cbd5e1;
                            border-radius: 10px;
                        }
                    `}} />
                    {/* Booking Details Summary */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <RiTimerLine className="text-xl text-[#0463ac] mt-1" />
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Slot Selected</p>
                                <p className="text-sm font-medium">
                                    {selectedDayTime?.date?.day}, {selectedDayTime?.date?.date} {selectedDayTime?.date?.month} @ {selectedDayTime?.time}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <HiOutlineLocationMarker className="text-xl text-[#0463ac] mt-1" />
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Service Address</p>
                                <p className="text-sm font-medium line-clamp-2">
                                    {selectedAddrs?.name} - {selectedAddrs?.address}
                                </p>
                                <p className="text-[10px] text-[#0463ac] mt-1.5 font-bold italic">
                                    * To change address, please go to the cart section.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Services</h3>
                        <div className="space-y-2">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm py-1">
                                    <span className="text-gray-700 font-medium">{item.product_name} x {item.qty}</span>
                                    <span className="font-bold">₹{item.price * item.qty}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="border-t pt-4 space-y-2">
                        {/* Coupon Section */}
                        <div className="mb-4">
                            {(!selectedCoupon || !selectedCoupon.coupon_name) ? (
                                <button
                                    onClick={() => setIsCouponModalOpen(true)}
                                    className="w-full flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl text-green-700 font-bold text-sm hover:bg-green-100 transition-all"
                                >
                                    <div className="flex items-center gap-2">
                                        <BiSolidOffer className="text-xl" />
                                        <span>Apply Coupon</span>
                                    </div>
                                    <span className="text-xs uppercase">View Offers</span>
                                </button>
                            ) : (
                                <div className="flex items-center justify-between p-3 bg-[#fdf2f8] border border-pink-100 rounded-xl text-pink-600 font-bold text-sm">
                                    <div className="flex items-center gap-2">
                                        <BiSolidOffer className="text-xl" />
                                        <span>{selectedCoupon.coupon_name} Applied</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedCoupon(null);
                                            localStorage.removeItem("HommlieselectedCoupon");
                                        }}
                                        className="text-xs text-gray-500 underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                        </div>
                        {couponDiscount > 0 && (
                            <div className="flex justify-between text-sm text-[#249370]">
                                <span>Coupon Discount</span>
                                <span className="font-medium">- ₹{couponDiscount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax & Fee</span>
                            <span className="font-medium">₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t mt-2">
                            <span>Amount Payable</span>
                            <span className="text-[#249370]">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Selection */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {paymentList?.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setPaymentType(p)}
                                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left
                                        ${paymentType?.id === p.id
                                            ? "border-[#249370] bg-green-50 text-[#249370]"
                                            : "border-gray-100 hover:border-gray-200"}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                                        ${paymentType?.id === p.id ? "border-[#249370]" : "border-gray-300"}`}>
                                        {paymentType?.id === p.id && <div className="w-2 h-2 rounded-full bg-[#249370]"></div>}
                                    </div>
                                    <span className="text-xs font-bold">{p.payment_name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Hint for Mobile */}
                    <div className="text-center pb-2 md:hidden">
                        <p className="text-[9px] text-gray-400 animate-pulse uppercase tracking-widest font-bold">
                            ↓ Scroll for payment options ↓
                        </p>
                    </div>
                </div>

                {/* Footer Button */}
                <div className="p-6 border-t bg-gray-50">
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className="w-full py-4 bg-[#0463ac] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-[#034d85] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                <span>PLACING ORDER...</span>
                            </>
                        ) : (
                            "PLACE ORDER"
                        )}
                    </button>
                    <p className="text-[10px] text-gray-500 text-center mt-3 uppercase tracking-tighter">
                        Safe and Secure 256-bit SSL encrypted checkout
                    </p>
                </div>
            </div>

            <CouponModal
                isOpen={isCouponModalOpen}
                onClose={() => setIsCouponModalOpen(false)}
                totalAmount={subtotal}
            />
        </div>
    );
};

export default CheckoutSummaryModal;
