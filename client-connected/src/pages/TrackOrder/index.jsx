import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { useCont } from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { RiTimerLine } from "react-icons/ri";
import axios from "axios";
import DateTimeModal from "../../components/DateTimeModal";
import { useToast } from "../../context/ToastProvider";
import config from "../../config/config";
import Loading from "../../components/Loading";

export default function TrackOrder() {
    const { cart, user, rescheduleDayTime, setRescheduleDayTime } = useCont();
    const navigate = useNavigate();
    const order_id = useParams().id;
    const [trackingDetails, setTrackingDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!trackingDetails?.length) getTrackingDetails();
    }, [rescheduleDayTime])

    const openDateTimeModal = () => {
        setIsDateTimeModalOpen(true);
    };

    const closeDateTimeModal = () => {
        setIsDateTimeModalOpen(false);
    };

    const openCancelModal = () => {
        setIsCancelModalOpen(true);
    };

    const closeCancelModal = () => {
        setIsCancelModalOpen(false);
    };

    async function getTrackingDetails() {
        setIsLoading(true);
        setTrackingDetails([]);
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
          try {
            const response = await axios.post(`${config.API_URL}/api/trackorder`, { 
              id: order_id,
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            });
            if (response.data.status === 1) {
                setTrackingDetails(response.data.data);
                setIsLoading(false);
            } else if (response.data.status === 0) {
                navigate(-1);
            }
          } catch (err) {
              console.log("error: " + err);
              errorNotify("Failed to fetch tracking details");
          }
        } else {
          console.log("User hasn't logged in");
          errorNotify("Please log in to track your order");
        }
    }

    const handleCancel = async () => {
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
            try {
                const response = await axios.post(`${config.API_URL}/api/cancelorder`, 
                { 
                    id: order_id,
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                if (response.data.status === 1) {
                    successNotify(response.data.message);
                    getTrackingDetails();
                } else if (response.data.status === 0) {
                    errorNotify(response.data.message);
                }
            } catch (err) {
                console.log("error: " + err);
                errorNotify("Failed to cancel order");
            }
        } else {
            console.log("User hasn't logged in");
            errorNotify("Please log in to cancel your order");
        }
        closeCancelModal();
    }

    const topTracker = ["Order Placed", "Scheduled", "Dispatched", "On Site", "Completed", "", "Cancelled"];
    const statusIndex = trackingDetails?.order_status;

    return (
        <>
        {isLoading ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <Loading />
            </div>
        ) : (
            <main className="flex justify-center bg-gray-100 min-h-screen">
                <div className="w-full max-w-3xl my-8 space-y-6">
                    <DateTimeModal 
                        isOpen={isDateTimeModalOpen} 
                        startDate={trackingDetails?.desired_date} 
                        startTime={trackingDetails?.desired_time} 
                        reSchedule={true} 
                        order_id={order_id} 
                        onClose={closeDateTimeModal} 
                    />

                    {/* Cancel Confirmation Modal */}
                    {isCancelModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
                                <p className="mb-6">Are you sure you want to cancel this order?</p>
                                <div className="flex justify-end space-x-4">
                                    <button 
                                        onClick={closeCancelModal}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
                                    >
                                        No, Keep Order
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                    >
                                        Yes, Cancel Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-lg font-semibold">Order Number: <span className="text-[#249370]">{trackingDetails?.order_number}</span></p>
                                <p className="text-sm text-gray-600">Order Date: {trackingDetails?.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold">Status: <span className="text-blue-600">{topTracker[statusIndex]}</span></p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="flex justify-between mb-2">
                                {topTracker.map((status, index) => {
                                if (statusIndex < 4 && index < 5) {
                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= statusIndex ? 'bg-[#249370]' : 'bg-gray-300'}`}>
                                                {index <= statusIndex ? (
                                                    <FaCircleCheck className="text-white" />
                                                ) : (
                                                    <FaCircleXmark className="text-white" />
                                                )}
                                            </div>
                                            <span className="text-xs mt-1">{status}</span>
                                        </div>
                                    )
                                }
                                })}
                            </div>
                            <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-300 -z-10"></div>
                            <div className="absolute top-4 left-0 h-0.5 bg-[#249370] -z-10" style={{width: `${(statusIndex / (topTracker.length - 1)) * 100}%`}}></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                        <div className="flex items-start space-x-4 mb-4">
                            <img src={trackingDetails?.image} alt="" className="w-20 lg:w-32 h-20 lg:h-32 object-cover rounded-md" />
                            <div className="flex-1 space-y-1">
                                <h3 className="text-sm lg:text-lg font-semibold">{trackingDetails?.product_name}</h3>
                                <p className="text-xs lg:text-base text-gray-600">{trackingDetails?.attribute}</p>
                                <p className="text-xs lg:text-base text-gray-600">{trackingDetails?.variation}</p>
                                <p className="text-xs lg:text-base">Quantity: {trackingDetails?.qty}</p>
                                <p className="text-xs lg:text-base">Price: ₹{trackingDetails?.price}</p>
                                {trackingDetails?.discount_amount !== 0 &&
                                    <p className="text-xs lg:text-base">Discount: ₹{trackingDetails?.discount_amount}</p>
                                }
                            </div>
                            <div className="lg:text-right">
                                <p className="text-sm lg:text-xl font-bold">₹{trackingDetails?.grand_total}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between mb-2">
                                <span>Payment Method</span>
                                <span className="font-medium">{trackingDetails?.payment?.payment_name}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Schedule Date and Time</span>
                                <span>{trackingDetails?.desired_date} @ {trackingDetails?.desired_time}</span>
                            </div>
                        </div>
                    </div>

                    {trackingDetails?.order_status < 2 ? (
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={openCancelModal} 
                                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Cancel Order
                            </button>
                            <button 
                                onClick={openDateTimeModal} 
                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Reschedule Order
                            </button>
                        </div>
                    ) : null}
                </div>
            </main>
        )}
        </>
    );
}