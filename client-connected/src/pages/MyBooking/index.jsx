import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaFileInvoice, FaFilePdf, FaSearch } from "react-icons/fa";
import { FiFilter, FiCalendar, FiClock } from "react-icons/fi";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import emptyBooking from "../../assets/images/illustrator/empty_booking.png";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import ReviewModal from "../../components/ReviewModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const [loadingPdf, setLoadingPdf] = useState(false);

  // New states for filtering and search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: {
      start: "",
      end: "",
    },
    serviceType: "all",
  });
  const [sortOption, setSortOption] = useState("newest"); // newest, oldest, priceHighToLow, priceLowToHigh
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBookings();
  }, []);

  useEffect(() => {
    // Extract unique service types from bookings
    if (bookings.length > 0) {
      const types = [
        ...new Set(bookings.map((booking) => booking.product_name)),
      ];
      setServiceTypes(types);
    }

    // Apply filters and search
    applyFiltersAndSearch();
  }, [bookings, filters, searchQuery, sortOption]);

  const applyFiltersAndSearch = () => {
    let filtered = [...bookings];

    // Apply status filter
    if (filters.status !== "all") {
      const statusIndex = OrderStatuses.findIndex(
        (status) => status === filters.status
      );
      filtered = filtered.filter(
        (booking) => booking.order_status === statusIndex
      );
    }

    // Apply date range filter
    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.desired_date);
        return bookingDate >= startDate;
      });
    }

    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.desired_date);
        return bookingDate <= endDate;
      });
    }

    // Apply service type filter
    if (filters.serviceType !== "all") {
      filtered = filtered.filter(
        (booking) => booking.product_name === filters.serviceType
      );
    }

    // Apply search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.product_name.toLowerCase().includes(query) ||
          booking.order_number.toLowerCase().includes(query) ||
          booking.attribute?.toLowerCase().includes(query) ||
          booking.variation?.toLowerCase().includes(query) ||
          booking.full_name.toLowerCase().includes(query) ||
          booking.email.toLowerCase().includes(query) ||
          booking.mobile.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.date.split("-").reverse().join("-")) -
            new Date(b.date.split("-").reverse().join("-"))
        );
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.date.split("-").reverse().join("-")) -
            new Date(a.date.split("-").reverse().join("-"))
        );
        break;
      case "priceHighToLow":
        filtered.sort(
          (a, b) => parseFloat(b.grand_total) - parseFloat(a.grand_total)
        );
        break;
      case "priceLowToHigh":
        filtered.sort(
          (a, b) => parseFloat(a.grand_total) - parseFloat(b.grand_total)
        );
        break;
      default:
        break;
    }

    // Group the filtered bookings by order number
    const grouped = filtered.reduce((acc, booking) => {
      if (!acc[booking.order_number]) {
        acc[booking.order_number] = [];
      }
      acc[booking.order_number].push(booking);
      return acc;
    }, {});

    setGroupedBookings(grouped);
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      dateRange: {
        start: "",
        end: "",
      },
      serviceType: "all",
    });
    setSearchQuery("");
    setSortOption("newest");
    setFilterOpen(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

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
      return total + parseFloat(order.discount_amount || 0);
    }, 0);
  };

  const generateInvoicePDF = async (order) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      errorNotify("Please login to download invoice");
      return;
    }

    setLoadingInvoice(true);
    try {
      const response = await axios.get(
        `${config.API_URL}/api/downloadOrSendReport/${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          responseType: "blob",
        }
      );

      // Create blob and download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Hommlie_Invoice_${order.order_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      successNotify("Invoice downloaded successfully and sent to your email");
    } catch (error) {
      console.error("Error generating invoice PDF:", error);
      errorNotify("Failed to generate invoice. Please try again.");
    } finally {
      setLoadingInvoice(false);
    }
  };

  const generateServiceReportPDF = async (order) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) {
      errorNotify("Please login to download service report");
      return;
    }

    setLoadingReport(true);
    try {
      const response = await axios.get(
        `${config.API_URL}/api/downloadOrSendInvoice/${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          responseType: "blob",
        }
      );

      // Create blob and download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Hommlie_Service_Report_${order.order_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      successNotify(
        "Service report downloaded successfully and sent to your email"
      );
    } catch (error) {
      console.error("Error generating service report PDF:", error);
      errorNotify("Failed to generate service report. Please try again.");
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div className="min-h-screen font-headerFont bg-white py-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-3xl font-bold text-gray-900 mb-8">
          My Bookings
        </h3>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search orders by service name, order number, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <FiFilter />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Service Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  {OrderStatuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  value={filters.serviceType}
                  onChange={(e) =>
                    handleFilterChange("serviceType", e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Services</option>
                  {serviceTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) =>
                        handleFilterChange("dateRange.start", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative flex-grow">
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) =>
                        handleFilterChange("dateRange.end", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 flex justify-end mt-2">
                <button
                  onClick={resetFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Badges */}
        {(filters.status !== "all" ||
          filters.serviceType !== "all" ||
          filters.dateRange.start ||
          filters.dateRange.end) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.status !== "all" && (
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>Status: {filters.status}</span>
                <button
                  onClick={() => handleFilterChange("status", "all")}
                  className="ml-1 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}
            {filters.serviceType !== "all" && (
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>Service: {filters.serviceType}</span>
                <button
                  onClick={() => handleFilterChange("serviceType", "all")}
                  className="ml-1 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}
            {filters.dateRange.start && (
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>From: {filters.dateRange.start}</span>
                <button
                  onClick={() => handleFilterChange("dateRange.start", "")}
                  className="ml-1 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}
            {filters.dateRange.end && (
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>To: {filters.dateRange.end}</span>
                <button
                  onClick={() => handleFilterChange("dateRange.end", "")}
                  className="ml-1 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        <div className="space-y-8">
          {Object.keys(groupedBookings).length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={emptyBooking}
                  alt="No bookings found"
                  className="w-64 md:w-96 transition-transform duration-300 hover:scale-105 mb-6"
                />
                {searchQuery ||
                filters.status !== "all" ||
                filters.serviceType !== "all" ||
                filters.dateRange.start ||
                filters.dateRange.end ? (
                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold text-gray-800">
                      No results found
                    </h4>
                    <p className="text-gray-600">
                      No bookings match your current filters. Try adjusting your
                      search criteria.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-gray-800">
                      No bookings yet
                    </h4>
                    <p className="text-gray-600">
                      You haven't made any bookings yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            Object.entries(groupedBookings).map(([orderNumber, orders]) => (
              <div
                key={orderNumber}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
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
                              alt={od.product_name}
                              className="w-full h-48 transform transition-transform duration-300 group-hover:scale-110 object-cover"
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
                            <div className="flex gap-4 flex-wrap">
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
                                <>
                                  <button
                                    onClick={() => openReviewModal(od)}
                                    className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                                  >
                                    Write Review
                                  </button>
                                  <button
                                    onClick={() => generateInvoicePDF(od)}
                                    disabled={loadingPdf}
                                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 gap-1.5"
                                  >
                                    <FaFileInvoice className="text-xl" />
                                    <span className="font-medium">
                                      {loadingPdf
                                        ? "Generating..."
                                        : "Download Invoice"}
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => generateServiceReportPDF(od)}
                                    disabled={loadingPdf}
                                    className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 gap-1.5"
                                  >
                                    <FaFilePdf className="text-xl" />
                                    <span className="font-medium">
                                      {loadingPdf
                                        ? "Generating..."
                                        : "Service Report"}
                                    </span>
                                  </button>
                                </>
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
                        orders[0]?.coupon_name !== 0 && (
                          <div>
                            <p className="text-gray-500">Applied Coupon</p>
                            <p className="font-medium text-gray-900">
                              {orders[0]?.coupon_name}
                            </p>
                          </div>
                        )}
                      {orders[0]?.discount_amount &&
                        orders[0]?.discount_amount !== 0 && (
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

      {/* Pagination Component - Add if needed based on API support */}
      {Object.keys(groupedBookings).length > 0 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm isolate">
            <button className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
              Previous
            </button>
            <button className="relative -ml-px inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-10">
              1
            </button>
            <button className="relative -ml-px inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
              2
            </button>
            <button className="relative -ml-px inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
              3
            </button>
            <button className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
              Next
            </button>
          </nav>
        </div>
      )}

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
