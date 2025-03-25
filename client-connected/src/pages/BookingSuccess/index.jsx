import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleCheck, FaFileExcel, FaFilePdf } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { useCont } from "../../context/MyContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import config from "../../config/config";
import ReferAndEarn from "../../components/ReferAndEarnModal";
import Loading from "../../components/Loading";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        return {
          backgroundColor: "#DAF5E6",
          color: "#30A666",
          border: "1px solid #30A666",
        };
      case 2:
        return {
          backgroundColor: "#FFF3CD",
          color: "#856404",
          border: "1px solid #856404",
        };
      case 3:
        return {
          backgroundColor: "#E5E7EB",
          color: "#6B7280",
          border: "1px solid #6B7280",
        };
      case 4:
        return {
          backgroundColor: "#E5E7EB",
          color: "#6B7280",
          border: "1px solid #6B7280",
        };
      case 5:
        return {
          backgroundColor: "#DAF5E6",
          color: "#30A666",
          border: "1px solid #30A666",
        };
      case 6:
        return {
          backgroundColor: "#F8D7DA",
          color: "#721C24",
          border: "1px solid #721C24",
        };
      default:
        return {
          backgroundColor: "#E5E7EB",
          color: "#6B7280",
          border: "1px solid #6B7280",
        };
    }
  };

  const OrderStatuses = [
    "Not Scheduled",
    "Scheduled",
    "Dispatched",
    "On Site",
    "Completed",
    "Incomplete",
    "Cancelled",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookingDetails();
    setIsReferAndEarnOpen(true);
  }, [order_number]);

  async function getBookingDetails() {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${config.API_URL}/api/orderdetails`,
          {
            order_number,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.data.status === 1) {
          setOrderInfo(response.data.order_info);
          setOrderData(response.data.order_data);
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("User hasn't logged in");
      navigate("/login");
    }
  }

  const handleDownloadInvoice = () => {
    if (!orderInfo || orderData.length === 0) return;

    const doc = new jsPDF();

    // Invoice header
    doc.setFontSize(20);
    doc.setTextColor(36, 147, 112);
    doc.text("Invoice", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice Number: INV-${orderData[0].id}`, 10, 40);
    doc.text(`Order Number: ${orderInfo.order_number}`, 10, 50);
    doc.text(`Date: ${orderInfo.date}`, 10, 60);

    // Customer details
    doc.setFontSize(14);
    doc.text("Customer Details", 10, 80);
    doc.setFontSize(12);
    doc.text(`Name: ${orderInfo.full_name}`, 10, 90);
    doc.text(`Email: ${orderInfo.email}`, 10, 100);
    doc.text(`Phone: ${orderInfo.mobile}`, 10, 110);
    doc.text(`Address: ${orderInfo.street_address}`, 10, 120);
    doc.text(`${orderInfo.landmark}, ${orderInfo.pincode}`, 10, 130);

    // Invoice items
    doc.autoTable({
      startY: 150,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: orderData.map((item) => [
        item.product_name,
        item.qty,
        `₹${item.price}`,
        `₹${(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}`,
      ]),
      theme: "striped",
      headStyles: { fillColor: [36, 147, 112] },
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
    doc.text("Service Report", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report Number: REP-${orderData[0].id}`, 10, 40);
    doc.text(`Order Number: ${orderInfo.order_number}`, 10, 50);
    doc.text(`Service Date: ${orderInfo.date}`, 10, 60);

    // Customer details
    doc.setFontSize(14);
    doc.text("Customer Information", 10, 80);
    doc.setFontSize(12);
    doc.text(`Name: ${orderInfo.full_name}`, 10, 90);
    doc.text(`Contact: ${orderInfo.mobile}`, 10, 100);
    doc.text(`Address: ${orderInfo.street_address}`, 10, 110);
    doc.text(`${orderInfo.landmark}, ${orderInfo.pincode}`, 10, 120);

    // Service details
    doc.setFontSize(14);
    doc.text("Service Details", 10, 140);
    doc.setFontSize(12);
    orderData.forEach((item, index) => {
      doc.text(
        `Service ${index + 1}: ${item.product_name}`,
        10,
        150 + index * 10
      );
      doc.text(`Quantity: ${item.qty}`, 10, 160 + index * 10);
    });
    doc.text(
      `Total Cost: ₹${orderInfo.grand_total}`,
      10,
      170 + orderData.length * 10
    );

    // Save the PDF
    doc.save(`ServiceReport_${orderInfo.order_number}.pdf`);
  };

  const handleProductClick = (item) => {
    const slug = item.product_name.toLowerCase().replace(/ /g, "-");
    navigate(`${config.VITE_BASE_URL}/product/${item.product_id}/${slug}`);
  };

  const topTracker = ["Add To Cart", "Review Booking", "Booking Confirmed"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {/* Success Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-6 mb-12 text-center"
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="h-20 w-20 rounded-full flex justify-center items-center text-white"
                style={{ backgroundColor: "#14AE5C" }}
              >
                <MdDone className="h-12 w-12" />
              </motion.div>
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900"
              >
                Booking Successful!
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-lg"
              >
                Thank you for your booking. We've sent a confirmation to your
                email.
              </motion.p>
            </motion.div>

            {/* Booking Tracker */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="relative px-4 sm:px-8">
                <div className="flex justify-between mb-8">
                  {topTracker.map((tracker, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex flex-col items-center gap-2 w-1/3 px-2"
                    >
                      <span className="text-xs sm:text-sm font-medium text-center text-gray-700">
                        {tracker}
                      </span>
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 ${
                          index < 2
                            ? "bg-white border-green-600"
                            : "bg-green-600 border-green-600"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute top-7 left-16 right-16 h-1 bg-green-600 z-0"></div>
                <div className="absolute top-7 left-1/2 right-16 h-1 bg-green-600 z-0"></div>
              </div>
            </motion.div> */}

            {/* Order Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            >
              <div className="p-6 sm:p-8">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Order #
                      <span className="text-green-600">
                        {orderInfo?.order_number}
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Booked on {orderInfo?.date}
                    </p>
                  </div>
                  {/* <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadInvoice}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                      <FaFilePdf className="text-white" />
                      Invoice
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadReport}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      <FaFileExcel className="text-green-600" />
                      Report
                    </motion.button>
                  </div> */}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Order Items */}
                <div className="space-y-6">
                  {orderData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-100 last:border-0"
                    >
                      <div
                        onClick={() => handleProductClick(item)}
                        className="cursor-pointer flex-shrink-0 w-full sm:w-32 h-32 overflow-hidden rounded-lg"
                      >
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={item.image_url}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.product_name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.attribute}{" "}
                            {item.variation && `(${item.variation})`}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm">
                            <span>Qty: {item.qty}</span>
                            <span>
                              Price: ₹{parseFloat(item.price).toFixed(2)}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-900 mt-2">
                            ₹
                            {(
                              parseFloat(item.price) * parseInt(item.qty)
                            ).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-col items-start sm:items-end gap-2">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                            style={getStatusStyles(parseInt(item.order_status))}
                          >
                            {OrderStatuses[parseInt(item.order_status)]}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(
                                `${config.VITE_BASE_URL}/track-order/${item?.id}`
                              )
                            }
                            className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition-colors"
                          >
                            Track Order
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Schedule Date:</span>
                        <span className="font-medium">
                          {orderInfo?.desired_date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time Slot:</span>
                        <span className="font-medium">
                          {orderInfo?.desired_time}
                        </span>
                      </div>
                      {orderInfo?.coupon_name && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coupon Applied:</span>
                          <span className="font-medium">
                            {orderInfo.coupon_name}
                          </span>
                        </div>
                      )}
                      {orderInfo?.discount_amount !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-medium text-green-600">
                            -₹{orderInfo?.discount_amount}
                          </span>
                        </div>
                      )}
                      {orderInfo?.tax !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span className="font-medium">₹{orderInfo?.tax}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delivery Address
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p>{orderInfo?.full_name}</p>
                      <p>{orderInfo?.street_address}</p>
                      <p>
                        {orderInfo?.landmark}, {orderInfo?.pincode}
                      </p>
                      <p>Phone: {orderInfo?.mobile}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{orderInfo?.grand_total}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`${config.VITE_BASE_URL}/services`)}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Another Service
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`${config.VITE_BASE_URL}/my-account`)}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View My Bookings
              </motion.button>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>

      <ReferAndEarn
        isOpen={isReferAndEarnOpen}
        onClose={() => setIsReferAndEarnOpen(false)}
      />
    </div>
  );
}
