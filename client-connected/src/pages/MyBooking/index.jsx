import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import { LiaShippingFastSolid } from "react-icons/lia";
import emptyBooking from '../../assets/images/illustrator/empty_booking.png';
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import ReviewModal from "../../components/ReviewModal";

export default function MyBookings() {
    const getStatusStyles = (status) => {
        switch (status) {
            case 1:
                return { backgroundColor: "#DAF5E6", color: "#30A666", border: "1px solid #30A666" };
            case 2:
                return { backgroundColor: "#FFF3CD", color: "#856404", border: "1px solid #856404" };
            case 3:
                return { backgroundColor: "#E5E7EB", color: "#6B7280", border: "1px solid #6B7280" };
            case 4:
                return { backgroundColor: "#DAF5E6", color: "#30A666", border: "1px solid #30A666" };
            case 5:
                return { backgroundColor: "#DAF5E6", color: "#30A666", border: "1px solid #30A666" };
            case 6:
                return { backgroundColor: "#F8D7DA", color: "#721C24", border: "1px solid #721C24" };
            default:
                return { backgroundColor: "#E5E7EB", color: "#6B7280", border: "1px solid #6B7280" };
        }
    };

    const OrderStatuses = ["Not Scheduled", "Scheduled", "Dispatched", "On Site", "Completed", "Incomplete", "Cancelled"];

    const { bookings, getBookings } = useCont();
    const navigate = useNavigate();
    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [groupedBookings, setGroupedBookings] = useState({});
    const [detailsVisible, setDetailsVisible] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        // getBookings();        
    }, []);

    useEffect(() => {        
        const grouped = bookings.reduce((acc, booking) => {
            if (!acc[booking.order_number]) {
                acc[booking.order_number] = [];
            }
            acc[booking.order_number].push(booking);
            return acc;
        }, {});
        
        setGroupedBookings(grouped);
        
        if (Object.keys(grouped).length > 0) {
            setDetailsVisible({ [Object.keys(grouped)[0]]: true });
        }
    }, [bookings]);

    const openReviewModal = (order) => {
        setSelectedOrder(order);
        setIsReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        setSelectedOrder(null);
    };

    const handleReviewSubmitted = () => {
        successNotify("Review submitted successfully");
        getBookings();
    };

    const toggleDetails = (orderNumber) => {
        setDetailsVisible((prevState) => ({
            ...prevState,
            [orderNumber]: !prevState[orderNumber],
        }));
    };

    const handleCancelOrder = async (id) => {
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
            try {
                const response = await axios.post(`${config.API_URL}/api/cancelorder`, 
                { 
                    id,
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                if (response.data.status === 1) {
                    successNotify(response.data.message);
                    getBookings();
                } else if (response.data.status === 0) {
                    errorNotify(response.data.message);
                }
            } catch (err) {
                console.log("error: " + err);
                errorNotify(err.message);
            }
        } else {
            console.log("User hasn't logged in");
        }
    };

    const handleProductClick = (item) => {        
        const slug = item.product_name.toLowerCase().replace(/ /g, '-');
        navigate(`${config.VITE_BASE_URL}/product/${item.product_id}/${slug}`);
    };

    return (
        <main className="flex justify-center bg-gray-100 min-h-screen py-8">
            <section className="w-[90%] md:w-[70%] space-y-6">
                <h3 className="text-center text-3xl font-bold text-gray-800">My Bookings</h3>
                {groupedBookings.length === 0 &&
                    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden flex justify-center">
                        <img src={emptyBooking} alt="" className="w-96" />
                    </div>
                }
                {Object.entries(groupedBookings).map(([orderNumber, orders]) => (
                    <div key={orderNumber} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div 
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => toggleDetails(orderNumber)}
                        >
                            <h4 className="text-xl font-semibold text-gray-800">Order #{orderNumber} <span className="text-base">({orders[0]?.date})</span></h4>
                            <button className="text-gray-600">
                                {detailsVisible[orderNumber] ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                            </button>
                        </div>
                        {detailsVisible[orderNumber] && (
                            <div className="p-4 space-y-4">
                                {orders.map((od, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                                        <div onClick={() => handleProductClick(od)} className="w-full md:w-1/4">
                                            <img src={od.image} alt="" className="w-full h-48 object-cover rounded" />
                                        </div>
                                        <div className="w-full md:w-1/2 space-y-2" style={{ color: "#605A65" }}>
                                            <span className="inline-block px-3 py-1 rounded font-medium text-xs" style={getStatusStyles(od?.order_status)}>{OrderStatuses[od?.order_status]}</span>
                                            <p className="font-bold">{od?.product_name}</p>
                                            <p className="font-bold">{od?.attribute} {od?.variation ? `(${od?.variation})` : null}</p>
                                            <p>Quantity: {od?.qty} - Price: ₹{od?.price}</p>
                                            <p className="font-semibold">Total: ₹{od?.order_total}</p>
                                            <p className="text-sm">Scheduled: {od?.desired_date} at {od?.desired_time}</p>
                                        </div>
                                        <div className="w-full md:w-1/4 flex flex-col justify-between gap-2">
                                            <NavLink 
                                                to={`${config.VITE_BASE_URL}/track-order/${od.id}`}
                                                className="flex items-center text-sm justify-end text-blue-600 hover:text-blue-800" 
                                            >
                                                <LiaShippingFastSolid className="mr-1" /> Track
                                            </NavLink>
                                            {od?.order_status === 0 && (
                                                <button 
                                                    onClick={() => handleCancelOrder(od.id)}
                                                    className="flex items-center text-sm justify-end text-red-500 hover:text-red-700"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {od?.order_status === 4 && (
                                                <button 
                                                    onClick={() => openReviewModal(od)}
                                                    className="flex items-center text-sm justify-end text-green-600 hover:text-green-800"
                                                >
                                                    Review Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 p-4 bg-gray-50 rounded" style={{ color: "#605A65" }}>
                                    <h5 className="font-semibold mb-2">Order Details</h5>
                                    <p className="text-sm mb-1">
                                        <span className="font-medium">Address:</span> {orders[0]?.full_name}, {orders[0]?.email}, {orders[0]?.mobile}
                                    </p>
                                    {orders[0]?.coupon_name && orders[0]?.coupon_name != 0 ?
                                        <p className="text-sm mb-1">
                                            <span className="font-medium">Coupon:</span> {orders[0]?.coupon_name}
                                        </p>
                                        : null
                                    }
                                    {orders[0]?.discount_amount && orders[0]?.discount_amount != 0 ?
                                        <p className="text-sm mb-1">
                                            <span className="font-medium">Discount:</span> ₹{orders[0]?.discount_amount}
                                        </p>
                                        : null
                                    }
                                    <p className="text-sm">
                                        <span className="font-medium">Payment Type:</span> {orders[0]?.payment?.payment_name}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={closeReviewModal}
                orderId={selectedOrder?.id}
                productId={selectedOrder?.product_id}
                onReviewSubmitted={handleReviewSubmitted}
            />
        </main>
    );
}