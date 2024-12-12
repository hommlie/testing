import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { FaCircleCheck, FaFileExcel, FaFilePdf } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { useCont } from "../../context/MyContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import config from "../../config/config";
import ReferAndEarn from "../../components/ReferAndEarnModal";
import Loading from "../../components/Loading";
import axios from "axios";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function BookingSuccess() {

    const { selectedDayTime, bookings } = useCont();
    const navigate = useNavigate();
    const order_number = useParams().id;
    const [orderInfo, setOrderInfo] = useState(null);
    const [orderData, setOrderData] = useState([]);
    const [isReferAndEarnOpen, setIsReferAndEarnOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getStatusStyles = (status) => {
        switch (status) {
            case 1:
                return { backgroundColor: "#DAF5E6", color: "#30A666", border: "1px solid #30A666" };
            case 2:
                return { backgroundColor: "#FFF3CD", color: "#856404", border: "1px solid #856404" };
            case 3:
                return { backgroundColor: "#E5E7EB", color: "#6B7280", border: "1px solid #6B7280" };
            case 4:
                return { backgroundColor: "#E5E7EB", color: "#6B7280", border: "1px solid #6B7280" };
            case 5:
                return { backgroundColor: "#DAF5E6", color: "#30A666", border: "1px solid #30A666" };
            case 6:
                return { backgroundColor: "#F8D7DA", color: "#721C24", border: "1px solid #721C24" };
            default:
                return { backgroundColor: "#E5E7EB", color: "#6B7280", border: "1px solid #6B7280" };
        }
    };
    const OrderStatuses = ["Not Scheduled", "Scheduled", "Dispatched", "On Site", "Completed", "Incomplete", "Cancelled"]

    useEffect(() => {
        window.scrollTo(0, 0);
        getBookingDetails();

        setIsReferAndEarnOpen(true);
    }, [order_number])

    async function getBookingDetails() {
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
            setIsLoading(true);
            await axios.post(`${config.API_URL}/api/orderdetails`, 
            { 
                order_number,
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 1) {
                    setOrderInfo(response.data.order_info);
                    setOrderData(response.data.order_data);
                    console.log(response.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log("error: " + err);
            })
        } else {
            console.log("User hasn't logged in");
        }
    }

    const handleDownloadInvoice = () => {
        if (!orderInfo || orderData.length === 0) return;

        const doc = new jsPDF();
        
        // Invoice header
        doc.setFontSize(20);
        doc.setTextColor(36, 147, 112);
        doc.text('Invoice', 105, 20, null, null, 'center');
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Invoice Number: INV-${orderData[0].id}`, 10, 40);
        doc.text(`Order Number: ${orderInfo.order_number}`, 10, 50);
        doc.text(`Date: ${orderInfo.date}`, 10, 60);

        // Customer details
        doc.setFontSize(14);
        doc.text('Customer Details', 10, 80);
        doc.setFontSize(12);
        doc.text(`Name: ${orderInfo.full_name}`, 10, 90);
        doc.text(`Email: ${orderInfo.email}`, 10, 100);
        doc.text(`Phone: ${orderInfo.mobile}`, 10, 110);
        doc.text(`Address: ${orderInfo.street_address}`, 10, 120);
        doc.text(`${orderInfo.landmark}, ${orderInfo.pincode}`, 10, 130);

        // Invoice items
        doc.autoTable({
            startY: 150,
            head: [['Item', 'Quantity', 'Price', 'Total']],
            body: orderData.map(item => [
                item.product_name,
                item.qty,
                `₹${item.price}`,
                `₹${(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}`
            ]),
            theme: 'striped',
            headStyles: { fillColor: [36, 147, 112] }
        });

        // Total
        const finalY = doc.lastAutoTable.finalY || 150;
        doc.text(`Subtotal: ₹${orderInfo.subtotal}`, 150, finalY + 20);
        doc.text(`Tax: ₹${orderInfo.tax}`, 150, finalY + 30);
        doc.text(`Shipping: ₹${orderInfo.shipping_cost}`, 150, finalY + 40);
        doc.text(`Discount: ₹${orderInfo.discount_amount}`, 150, finalY + 50);
        doc.text(`Grand Total: ₹${orderInfo.grand_total}`, 150, finalY + 60);

        // Save the PDF
        doc.save(`Invoice_${orderInfo.order_number}.pdf`);
    };
    
    const handleDownloadReport = () => {
        if (!orderInfo || orderData.length === 0) return;

        const doc = new jsPDF();

        // Report header
        doc.setFontSize(20);
        doc.setTextColor(36, 147, 112);
        doc.text('Service Report', 105, 20, null, null, 'center');

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Report Number: REP-${orderData[0].id}`, 10, 40);
        doc.text(`Order Number: ${orderInfo.order_number}`, 10, 50);
        doc.text(`Service Date: ${orderInfo.date}`, 10, 60);

        // Customer details
        doc.setFontSize(14);
        doc.text('Customer Information', 10, 80);
        doc.setFontSize(12);
        doc.text(`Name: ${orderInfo.full_name}`, 10, 90);
        doc.text(`Contact: ${orderInfo.mobile}`, 10, 100);
        doc.text(`Address: ${orderInfo.street_address}`, 10, 110);
        doc.text(`${orderInfo.landmark}, ${orderInfo.pincode}`, 10, 120);

        // Service details
        doc.setFontSize(14);
        doc.text('Service Details', 10, 140);
        doc.setFontSize(12);
        orderData.forEach((item, index) => {
            doc.text(`Service ${index + 1}: ${item.product_name}`, 10, 150 + (index * 10));
            doc.text(`Quantity: ${item.qty}`, 10, 160 + (index * 10));
        });
        doc.text(`Total Cost: ₹${orderInfo.grand_total}`, 10, 170 + (orderData.length * 10));

        // Save the PDF
        doc.save(`ServiceReport_${orderInfo.order_number}.pdf`);
    };

    const handleProductClick = (item) => {        
        const slug = item.product_name.toLowerCase().replace(/ /g, '-');
        navigate(`${config.VITE_BASE_URL}/product/${item.product_id}/${slug}`);
    };

    const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

    return (
        <>
        {
            isLoading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <Loading />
                </div>
            ) : (
                <main className="flex justify-center">
                    <div className="w-[90%] md:w-[75%] my-6 md:my-16 space-y-4">

                        <div className="flex flex-col justify-center items-center gap-8">
                            <div className="h-[80px] w-[80px] rounded-full flex justify-center items-center text-white p-2" style={{backgroundColor: "#14AE5C"}}>
                                <MdDone className="h-full w-full" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-semibold">Booking successful</h2>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="w-full lg:w-[80%] p-4 relative">
                                <div className="flex flex-row justify-between my-8">
                                    {
                                        topTracker.map((tracker, index) => {
                                            return (
                                                <div key={index} className="w-full flex flex-col justify-center items-center gap-4">
                                                    <span className="text-xs md:text-base font-semibold">{tracker}</span>
                                                    <div className="w-2 h-2 lg:w-5 lg:h-5 border-4 bg-white rounded-full" style={{border: "4px solid #249370"}}></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex absolute inset-0 top-[35px] md:top-[40px] justify-center items-center px-24 md:px-32 lg:px-32 gap-9">
                                    <div className="w-[255px]" style={{border: "1px solid #249370"}}></div>
                                    <div className="w-[255px]" style={{border: "1px solid #249370"}}></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 flex flex-col justify-between gap-4 pb-8 glow-border shadow">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col gap-2 w-3/4">
                                    <span className="text-xl font-bold">Order Number: <span style={{color: "#249370"}}>{orderInfo?.order_number}</span></span>
                                    <span style={{color: "rgba(0, 0, 0, 0.4)"}}>Dear customer, thank you so much for your order, Very soon our professional will contact you</span>
                                    <span style={{color: "rgba(0, 0, 0, 0.4)"}}>Booked at: {orderInfo?.date}</span>
                                </div>
                            </div>
                            <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                            {orderData.map((item, index) => (
                                <div key={index} className="flex justify-center flex-col md:flex-row gap-10 my-2">
                                    <div className="flex items-center" onClick={() => handleProductClick(item)}>
                                        <img src={item.image_url} alt="" className="w-40 h-40 object-cover" />
                                    </div>
                                    <div className="w-3/5 space-y-4" style={{color: "#605A65"}}>
                                        {/* <p className="font-medium text-sm">{orderInfo?.date}</p> */}
                                        <p className="font-bold">{item.product_name}</p>
                                        <p className="font-bold">{item.attribute} {item.variation ? `(${item.variation})` : null}</p>
                                        <p className="flex flex-row gap-2">
                                            <span>Quantity: {item.qty}</span>
                                            <span className="">Price: ₹{parseFloat(item.price).toFixed(2)}</span>
                                        </p>
                                        <p className="font-semibold">Total: ₹{(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}</p>
                                        {/* <div className="flex flex-row items-center gap-2">
                                            <p>Schedule Date and Time:</p>
                                            <p style={{color: "rgba(0, 0, 0, 0.4)"}}>{item?.desired_date} @ {item?.desired_time}</p>
                                        </div> */}
                                    </div>
                                    <div className="">
                                        <span className="w-[80px] h-[21px] px-3 py-1 rounded font-medium text-xs" style={getStatusStyles(parseInt(item.status))}>{OrderStatuses[parseInt(item.status)]}</span>
                                    </div>
                                    <button 
                                        onClick={() => navigate(`${config.VITE_BASE_URL}/track-order/${item?.id}`)} 
                                        className="text-xs w-[88px] h-[25px] font-medium rounded text-white" 
                                        style={{backgroundColor: "#249370"}}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            ))}
                            <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-row justify-between items-center">
                                            <p>Schedule Date and Time:</p>
                                            <p style={{color: "rgba(0, 0, 0, 0.4)"}}>{orderInfo?.desired_date} @ {orderInfo?.desired_time}</p>
                                </div>
                                {orderInfo?.coupon_name ?
                                    <div className="flex flex-row justify-between text-md">
                                        <p>Applied Coupon:</p>
                                        <p>{orderInfo?.coupon_name}</p>
                                    </div>
                                    : null
                                }
                                {orderInfo?.discount_amount != 0 ?
                                    <div className="flex flex-row justify-between text-md">
                                        <p>Discount:</p>
                                        <p>₹{orderInfo?.discount_amount}</p>
                                    </div>
                                    : null
                                }
                                {orderInfo?.tax != 0 ?
                                    <div className="flex flex-row justify-between text-md">
                                        <p>Tax:</p>
                                        <p>₹{orderInfo?.tax}</p>
                                    </div>
                                    : null
                                }
                                <div className="flex flex-row justify-between text-xl font-bold">
                                    <p>Total cost:</p>
                                    <p>₹{orderInfo?.grand_total}</p>
                                </div>
                                {/* <div className="flex flex-row justify-center items-center gap-10">
                                    <button
                                        onClick={handleDownloadInvoice}
                                        className="text-white px-4 py-2 rounded-md text-sm flex items-center"
                                        style={{backgroundColor: "#249370"}}
                                    >
                                        <FaFileExcel className="mr-2" /> Download Invoice
                                    </button>
                                    <button
                                        onClick={handleDownloadReport}
                                        className="text-white px-4 py-2 rounded-md text-sm flex items-center"
                                        style={{backgroundColor: "#249370"}}
                                    >
                                        <FaFilePdf className="mr-2" /> Download Report
                                    </button>
                                </div> */}
                            </div>
                            <div className="" style={{border: "1px dotted #E5E7EB"}}></div>
                            <div className="flex flex-col gap-2">
                                <p>Delivery Address:</p>
                                <p className="flex flex-col" style={{color: "rgba(0, 0, 0, 0.4)"}}>
                                    <span>{orderInfo?.full_name}</span>
                                    <span>{orderInfo?.street_address}</span>
                                    <span>{orderInfo?.landmark} - {orderInfo?.pincode} </span>
                                    <span>{orderInfo?.mobile} </span>
                                </p>
                            </div>
                        </div>

                    </div>

                    <ReferAndEarn isOpen={isReferAndEarnOpen} onClose={() => setIsReferAndEarnOpen(false)} />
                </main>
            )
        }
        </>
    );
}