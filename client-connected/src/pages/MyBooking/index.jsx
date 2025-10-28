import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaFileInvoice, FaFilePdf, FaSearch, } from "react-icons/fa";
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
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  // New states for filtering and search
  const [searchQuery, setSearchQuery] = useState("");
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
    const parseDate = (item) => {
      // Prefer desired_date if present, fallback to date or created_at
      const raw = item.desired_date || item.date || item.created_at || item.order_date;
      if (!raw) return new Date(0);

      // If it's already a Date object
      if (raw instanceof Date) return raw;

      // Try ISO parse first
      const iso = new Date(raw);
      if (!isNaN(iso)) return iso;

      // Handle common DD-MM-YYYY or DD/MM/YYYY formats
      const normalized = String(raw).trim().replace(/\//g, "-");
      const parts = normalized.split("-").map((p) => p.trim());
      if (parts.length === 3) {
        // If first part looks like year (YYYY), assume YYYY-MM-DD
        if (parts[0].length === 4) {
          return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
        }
        // Otherwise assume DD-MM-YYYY
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }

      // Last resort
      const fallback = new Date(raw);
      return isNaN(fallback) ? new Date(0) : fallback;
    };

    switch (sortOption) {
      case "oldest":
        filtered.sort((a, b) => parseDate(a) - parseDate(b));
        break;
      case "newest":
        filtered.sort((a, b) => parseDate(b) - parseDate(a));
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
    setFilteredBookings(filtered);
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

  // inside MyBookings component
const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
const [complaintOrder, setComplaintOrder] = useState(null);
const [complaintText, setComplaintText] = useState("");
const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);


const openComplaintModal = (order) => {
  setComplaintOrder(order);
  setIsComplaintModalOpen(true);
};

const closeComplaintModal = () => {
  setComplaintOrder(null);
  setComplaintText("");
  setIsComplaintModalOpen(false);
};

// const handleComplaintSubmit = async () => {
//   if (!complaintText.trim()) {
//     errorNotify("Please enter a description.");
//     return;
//   }

//   setIsSubmittingComplaint(true);
//   try {
//     // Optional auth header if your API needs it:
//     const jwtToken = Cookies.get("HommlieUserjwtToken");
//     const headers = { "Content-Type": "application/json" };
//     if (jwtToken) headers.Authorization = `Bearer ${jwtToken}`;

//    const res = await axios.post(
//   `${config.API_URL}/api/raisecomplaint`,
//   {
//     orderId: complaintOrder?.id,
//     complaintText,
//   },
//   { headers }
// );

//     console.log("Server Response:", res.data);
//     successNotify("Complaint submitted successfully!");
//     closeComplaintModal();
//   } catch (err) {
//     console.error("Error submitting complaint:", err);
//     errorNotify(
//       err?.response?.data?.error || "Failed to submit complaint. Please try again."
//     );
//   } finally {
//     setIsSubmittingComplaint(false);
//   }
// };
  // Add New Complaint 
  // const handleComplaintSubmit = async () => {
  //   if (isSubmittingComplaint) return;
  //   const order = complaintOrder?.id || {};
  //   const text = (complaintText || "").trim();
  //   if (!order || !Number.isInteger(Number(order))) {
  //     errorNotify("Invalid Order. Please reopen the complaint form.");
  //     return;
  //   }
  //   setIsSubmittingComplaint(true);
  //   try {
  //     const jwtToken = Cookies.get("HommlieUserjwtToken");
  //     const headers = { "Content-Type": "application/json" };
  //     if (jwtToken) headers.Authorization = `Bearer ${jwtToken}`;
  //     const data = {
  //       user_id:             order.user_id,
  //       vendor_id:           order.vendor_id,
  //       product_id:          order.product_id,
  //       product_name:        order.product_name,
  //       order_number:        order.order_number,
  //       service_number:      order.service_number,
  //       image:               order.image,
  //       qty:                 order.qty,
  //       price:               0,
  //       tax:                 0,
  //       order_total:         order.order_total,
  //       full_name:           order.full_name,
  //       email:               order.email,
  //       mobile:              order.mobile,
  //       landmark:            order.landmark,
  //       street_address:      order.street_address,
  //       pincode:             order.pincode,
  //       latitude:            order.latitude,
  //       longitude:           order.longitude,
  //       // desired_date:      (removed)
  //       // desired_time:      (removed)
  //       employee_name:       order.employee_name,
  //       billing:             order.billing,
  //       account_type:        order.account_type,
  //       account_sub_type:    order.account_sub_type,
  //       business_region:     order.business_region,
  //       business_sub_region: order.business_sub_region,
  //       branch_code:         order.branch_code,
  //       customer_type:       order.customer_type,
  //       business_lead:       order.business_lead,
  //       house_number:        order.house_number,
  //       attribute:           order.attribute,
  //       variation:           order.variation,
  //       variations_sku:      order.variations_sku,
  //       service_center_type: order.service_center_type,
  //       assigned_to:         null,          // no random assignment
  //       payment_id:          null,
  //       coupon_name:         "",
  //       coupon_id:           0,
  //       discount_amount:     0,
  //       extra_charges:       0,
  //       extra_charge_remark: "",
  //       shipping_cost:       0,
  //       order_notes:         "",
  //       comment:             "",
  //       vendor_comment:      "",
  //       remark:              "",
  //       return_reason:       "",
  //       return_number:       "",
  //       otp:                 null,
  //       emp_onsite_image:    null,
  //       signature:           null,
  //       chemicalsUsed:       null,
  //       is_otp_verified:     0,
  //       payment_type:        order.payment_type,
  //       status:              1,
  //       order_status:        2,
  //       reselling_order_flag:"no",
  //       resell_margin:       null,
  //       slug:                null,
  //       is_booked_by:        order.is_booked_by,
  //       complaint_remark:    text,
  //       order_type:          1, 
  //     };
  //     const payload = {
  //       orderId: Number(order.id),
  //       clonedData: data,
  //     };
  //     const res = await axios.post(
  //       `${config.API_URL}/api/raisecomplaint`,
  //       payload,
  //       { headers, timeout: 20000 }
  //     );
  //     const result = res?.data || {};
  //     if (result?.status === "success") {
  //       const cid = result?.complaint_id;
  //       successNotify(cid ? `Complaint submitted successfully! ID: ${cid}` : "Complaint submitted successfully!");
  //       closeComplaintModal();
  //     } else {
  //       errorNotify(result?.error || "Failed to submit complaint. Please try again.");
  //     }
  //   } catch (err) {
  //     const status = err?.response?.status;
  //     if (status === 422) {
  //       errorNotify(err?.response?.data?.error || "Validation failed. Please check your input.");
  //     } else if (status === 404) {
  //       errorNotify("Order not found. Please refresh and try again.");
  //     } else if (status === 500) {
  //       errorNotify("Server error. Please try again in a moment.");
  //     } else if (err?.code === "ECONNABORTED") {
  //       errorNotify("Request timed out. Please check your connection and try again.");
  //     } else {
  //       errorNotify(err?.response?.data?.error || "Failed to submit complaint. Please try again.");
  //     }
  //     console.error("Error submitting complaint:", err);
  //   } finally {
  //     setIsSubmittingComplaint(false);
  //   }
  // };
const handleComplaintSubmit = async () => {
  if (isSubmittingComplaint) return;

  const order = complaintOrder; // keep full booking object
  const text = (complaintText || "").trim();

  if (!order?.id) {
    errorNotify("Invalid Order. Please reopen the complaint form.");
    return;
  }

  setIsSubmittingComplaint(true);
  try {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    const headers = { "Content-Type": "application/json" };
    if (jwtToken) headers.Authorization = `Bearer ${jwtToken}`;

    // Only send orderId and complaintText as required by backend
    const payload = {
      orderId: order.id,
      complaintText: text,
    };

    const res = await axios.post(
      `${config.API_URL}/api/raisecomplaint`,
      payload,
      { headers, timeout: 20000 }
    );

    const result = res?.data || {};
    if (result?.message) {
      successNotify("Complaint submitted successfully!");
      closeComplaintModal();
    } else {
      errorNotify(result?.error || "Failed to submit complaint. Please try again.");
    }
  } catch (err) {
    console.error("Error submitting complaint:", err);
    if (err.response?.data?.error) {
      errorNotify(err.response.data.error);
    } else if (err.code === "ECONNABORTED") {
      errorNotify("Request timed out. Please check your connection and try again.");
    } else {
      errorNotify("Something went wrong. Please try again.");
    }
  } finally {
    setIsSubmittingComplaint(false);
  }
};

  return (
    <div className="sm:mx-7xl bg-cover bg-center bg-no-repeat">
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
          </div>

          
          {/* <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div> */}
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
                      {/* Order Number */}
                      <p className="text-sm text-gray-500">Order Number</p>

                      <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-3 md:justify-end text-right">
                        {/* Raise Complaint Button - only show if order status is Completed */}
                        {orders[0]?.order_status === 4 && (
                          <button
                            onClick={() => openComplaintModal(orders[0])}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium text-sm transition-colors duration-200 mt-2 md:mt-0"
                          >
                            <FaFileInvoice className="text-base" />
                            Raise Complaint
                          </button>
                        )}
                        {/* Order Number */}
                        <p className="font-medium text-gray-900">#{orderNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {orders.map((od, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-xl overflow-hidden mb-6 border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left side - Product Image (commented out) */}
                      {/*
                      <div
                        onClick={() => handleProductClick(od)}
                        className="w-full lg:w-1/4 cursor-pointer"
                      >
                        <div className="relative overflow-hidden h-52 lg:h-full group">
                          <img
                            src={od.image || "/placeholder.jpg"}
                            alt={od.product_name}
                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      */}

                      {/* Right side - Order Details (now full width) */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        {/* Top Row: Status + Actions */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <span
                            className={`inline-block px-4 py-1.5 rounded-full text-sm border font-medium ${getStatusStyles(
                              od?.order_status
                            )}`}
                          >
                            {OrderStatuses[od?.order_status]}
                          </span>

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
                                    {loadingPdf ? "Generating..." : "Download Invoice"}
                                  </span>
                                </button>
                                <button
                                  onClick={() => generateServiceReportPDF(od)}
                                  disabled={loadingPdf}
                                  className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 gap-1.5"
                                >
                                  <FaFilePdf className="text-xl" />
                                  <span className="font-medium">
                                    {loadingPdf ? "Generating..." : "Service Report"}
                                  </span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="mt-4">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {od?.product_name}
                          </h4>
                          <p className="text-gray-600">
                            {od?.attribute} {od?.variation ? `(${od?.variation})` : null}
                          </p>
                        </div>

                        {/* Order Info Grid */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p className="font-medium text-gray-900">{od?.qty}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Price (Including Tax)</p>
                            <p className="font-medium text-gray-900">₹{Number(od?.price ?? 0).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Scheduled Time</p>
                            <p className="font-medium text-gray-900">
                              {od?.desired_date} at {od?.desired_time}
                            </p>
                          </div>
                          {/* Uncomment if you want Total */}
                          {/* <div>
                            <p className="text-gray-500">Total Amount</p>
                            <p className="font-medium text-gray-900">₹{Number(od?.grand_total ?? 0).toFixed(2)}</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                  <div className="bg-gray-50 p-6">
                    <h5 className="font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h5>
                    <div className="flex flex-col md:flex-row md:items-start md:gap-10 text-sm">
                      {/* Delivery Address */}
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

                      {/* Payment Method */}
                      <div>
                        <p className="text-gray-500">Payment Method</p>
                        <p className="font-medium text-gray-900">
                          {orders[0]?.payment?.payment_name}
                        </p>
                      </div>

                      {/* Applied Coupon */}
                      {orders[0]?.coupon_name && orders[0]?.coupon_name !== 0 && (
                        <div>
                          <p className="text-gray-500">Applied Coupon</p>
                          <p className="font-medium text-gray-900">
                            {orders[0]?.coupon_name}
                          </p>
                        </div>
                      )}

                      {/* Discount (optional) */}
                      {orders[0]?.discount_amount && orders[0]?.discount_amount !== 0 && (
                        <div>
                          {/* <p className="text-gray-500">Total Discount</p>
                          <p className="font-medium text-gray-900">
                            ₹{Number(findTotalDiscount(orders) ?? 0).toFixed(2)}
                          </p> */}
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
      {/* Complaint Modal */}
        {isComplaintModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
              {/* Close Button */}
              <button
                onClick={closeComplaintModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Raise a Complaint
              </h3>

              {/* Complaint Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your issue
                </label>
                <textarea
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  rows={4}
                  placeholder="Write your issue here..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Upload Image */}
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a photo (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setComplaintImage(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                />
                {complaintImage && (
                  <img
                    src={URL.createObjectURL(complaintImage)}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-lg border"
                  />
                )}
              </div> */}

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeComplaintModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleComplaintSubmit}
                  disabled={isSubmittingComplaint}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmittingComplaint ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}