import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import { LiaShippingFastSolid } from "react-icons/lia";
import emptyBooking from "../../assets/images/illustrator/empty_booking.png";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import ReviewModal from "../../components/ReviewModal";

export default function MyBookings() {
  const getStatusStyles = (status) => {
    const baseStyles = "transition-all duration-200 font-medium";
    switch (status) {
      case 1:
        return `${baseStyles} bg-green-50 text-green-600 border-green-600`;
      case 2:
        return `${baseStyles} bg-yellow-50 text-yellow-700 border-yellow-700`;
      case 3:
        return `${baseStyles} bg-gray-100 text-gray-600 border-gray-600`;
      case 4:
        return `${baseStyles} bg-green-50 text-green-600 border-green-600`;
      case 5:
        return `${baseStyles} bg-green-50 text-green-600 border-green-600`;
      case 6:
        return `${baseStyles} bg-red-50 text-red-700 border-red-700`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-600 border-gray-600`;
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

  const { bookings, getBookings } = useCont();
  const navigate = useNavigate();
  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [groupedBookings, setGroupedBookings] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBookings();
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

  const handleCancelOrder = async (id) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      try {
        const response = await axios.post(`${config.API_URL}/api/cancelorder`, {
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
    }
  };

  const handleProductClick = (item) => {
    const slug = item.product_name.toLowerCase().replace(/ /g, "-");
    navigate(`${config.VITE_BASE_URL}/product/${slug}`);
  };

  const findTotalDiscount = (orders) => {
    return orders.reduce((total, order) => {
      return total + parseFloat(order.discount_amount);
    }, 0);
  };

  return (
    <div className="min-h-screen font-headerFont bg-white py-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-3xl font-bold text-gray-900 mb-12">
          My Bookings
        </h3>

        <div className="space-y-8">
          {Object.keys(groupedBookings).length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-center items-center">
              <img
                src={emptyBooking}
                alt=""
                className="w-96 transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            Object.entries(groupedBookings).map(([orderNumber, orders]) => (
              <div
                key={orderNumber}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Order Placed</p>
                      <p className="font-medium text-gray-900">
                        {orders[0]?.date}
                      </p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-medium text-gray-900">
                        #{orderNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {orders.map((od, index) => (
                    <div key={index} className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div
                          onClick={() => handleProductClick(od)}
                          className="w-full lg:w-1/4 cursor-pointer"
                        >
                          <div className="relative overflow-hidden rounded-lg shadow-md group">
                            <img
                              src={od.image}
                              alt=""
                              className="w-full h-48 transform transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                              <span
                                className={`inline-block px-4 py-1.5 rounded-full text-sm border ${getStatusStyles(
                                  od?.order_status
                                )}`}
                              >
                                {OrderStatuses[od?.order_status]}
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <NavLink
                                to={`${config.VITE_BASE_URL}/track-order/${od.id}`}
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 gap-1.5"
                              >
                                <LiaShippingFastSolid className="text-xl" />
                                <span className="font-medium">Track Order</span>
                              </NavLink>
                              {od?.order_status === 0 && (
                                <button
                                  onClick={() => handleCancelOrder(od.id)}
                                  className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                >
                                  Cancel Order
                                </button>
                              )}
                              {od?.order_status === 4 && (
                                <button
                                  onClick={() => openReviewModal(od)}
                                  className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                                >
                                  Write Review
                                </button>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {od?.product_name}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {od?.attribute}{" "}
                              {od?.variation ? `(${od?.variation})` : null}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Quantity</p>
                              <p className="font-medium text-gray-900">
                                {od?.qty}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">
                                Price (Including tax)
                              </p>
                              <p className="font-medium text-gray-900">
                                ₹{od?.price}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Amount</p>
                              <p className="font-medium text-gray-900">
                                ₹{od?.grand_total}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Scheduled Time</p>
                              <p className="font-medium text-gray-900">
                                {od?.desired_date} at {od?.desired_time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-gray-50 p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Delivery Address</p>
                        <p className="font-medium text-gray-900">
                          {orders[0]?.full_name}
                          <br />
                          {orders[0]?.email}
                          <br />
                          {orders[0]?.mobile}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Payment Method</p>
                        <p className="font-medium text-gray-900">
                          {orders[0]?.payment?.payment_name}
                        </p>
                      </div>
                      {orders[0]?.coupon_name &&
                        orders[0]?.coupon_name != 0 && (
                          <div>
                            <p className="text-gray-500">Applied Coupon</p>
                            <p className="font-medium text-gray-900">
                              {orders[0]?.coupon_name}
                            </p>
                          </div>
                        )}
                      {orders[0]?.discount_amount &&
                        orders[0]?.discount_amount != 0 && (
                          <div>
                            <p className="text-gray-500">Total Discount</p>
                            <p className="font-medium text-gray-900">
                              ₹{findTotalDiscount(orders)}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        orderId={selectedOrder?.id}
        productId={selectedOrder?.product_id}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
