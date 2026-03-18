import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCont } from "../../context/MyContext";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaFileInvoice, FaFilePdf, FaSearch, FaWhatsapp, FaChevronRight, FaTimes } from "react-icons/fa";
import { FiFilter, FiCalendar, FiClock, FiPackage, FiMapPin, FiCreditCard } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import emptyBooking from "../../assets/images/illustrator/empty_booking.png";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import ReviewModal from "../../components/ReviewModal";

export default function MyBookings() {
  const getStatusStyles = (status) => {
    const baseStyles = "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border";
    switch (status) {
      case 0: // Not Scheduled
        return `${baseStyles} bg-gray-50 text-gray-500 border-gray-200`;
      case 1: // Scheduled
        return `${baseStyles} bg-blue-50 text-blue-700 border-blue-100`;
      case 2: // Dispatched
        return `${baseStyles} bg-indigo-50 text-indigo-700 border-indigo-100`;
      case 3: // On Site
        return `${baseStyles} bg-purple-50 text-purple-700 border-purple-100`;
      case 4: // Completed
        return `${baseStyles} bg-emerald-50 text-emerald-700 border-emerald-100`;
      case 5: // Incomplete
        return `${baseStyles} bg-orange-50 text-orange-700 border-orange-100`;
      case 6: // Cancelled
        return `${baseStyles} bg-red-50 text-red-700 border-red-100`;
      default:
        return `${baseStyles} bg-gray-50 text-gray-400 border-gray-200`;
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

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: { start: "", end: "" },
    serviceType: "all",
  });
  const [sortOption, setSortOption] = useState("newest");
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      const types = [...new Set(bookings.map((booking) => booking.product_name))];
      setServiceTypes(types);
    }
    applyFiltersAndSearch();
  }, [bookings, filters, searchQuery, sortOption]);

  const applyFiltersAndSearch = () => {
    let filtered = [...bookings];

    if (filters.status !== "all") {
      const statusIndex = OrderStatuses.findIndex(status => status === filters.status);
      filtered = filtered.filter(booking => booking.order_status === statusIndex);
    }

    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      filtered = filtered.filter(booking => new Date(booking.desired_date) >= startDate);
    }

    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter(booking => new Date(booking.desired_date) <= endDate);
    }

    if (filters.serviceType !== "all") {
      filtered = filtered.filter(booking => booking.product_name === filters.serviceType);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.product_name.toLowerCase().includes(query) ||
        booking.order_number.toLowerCase().includes(query) ||
        booking.attribute?.toLowerCase().includes(query) ||
        booking.full_name.toLowerCase().includes(query)
      );
    }

    // Sorting Logic
    const parseDate = (item) => {
      const raw = item.desired_date || item.date || item.created_at || item.order_date;
      if (!raw) return new Date(0);
      if (raw instanceof Date) return raw;
      const iso = new Date(raw);
      if (!isNaN(iso)) return iso;
      // Handle DD-MM-YYYY
      const parts = String(raw).trim().replace(/\//g, "-").split("-").map(p => p.trim());
      if (parts.length === 3) {
        if (parts[0].length === 4) return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      return new Date(0);
    };

    switch (sortOption) {
      case "oldest": filtered.sort((a, b) => (a.id || 0) - (b.id || 0)); break;
      case "newest": filtered.sort((a, b) => (b.id || 0) - (a.id || 0)); break;
      case "priceHighToLow": filtered.sort((a, b) => parseFloat(b.grand_total) - parseFloat(a.grand_total)); break;
      case "priceLowToHigh": filtered.sort((a, b) => parseFloat(a.grand_total) - parseFloat(b.grand_total)); break;
      default: break;
    }

    // Grouping
    const grouped = filtered.reduce((acc, booking) => {
      if (!acc[booking.order_number]) acc[booking.order_number] = [];
      acc[booking.order_number].push(booking);
      return acc;
    }, {});

    setGroupedBookings(grouped);
  };

  const resetFilters = () => {
    setFilters({ status: "all", dateRange: { start: "", end: "" }, serviceType: "all" });
    setSearchQuery("");
    setSortOption("newest");
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return { ...prev, [parent]: { ...prev[parent], [child]: value } };
      }
      return { ...prev, [field]: value };
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

  // Logic Handlers
  const handleCancelOrder = async (id) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      try {
        const response = await axios.post(`${config.API_URL}/api/cancelorder`, {
          id, headers: { Authorization: `Bearer ${jwtToken}` },
        });
        if (response.data.status === 1) {
          successNotify(response.data.message);
          getBookings();
        } else {
          errorNotify(response.data.message);
        }
      } catch (err) {
        errorNotify(err.message);
      }
    }
  };

  const generateInvoicePDF = async (order) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) return errorNotify("Please login to download details");
    setLoadingInvoice(true);
    try {
      const response = await axios.get(`${config.API_URL}/api/downloadOrSendInvoice/${order.id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }, responseType: "blob",
      });
      downloadBlob(response.data, `Hommlie_Invoice_${order.order_number}.pdf`);
      successNotify("Invoice downloaded successfully");
    } catch { errorNotify("Failed to generate invoice."); }
    finally { setLoadingInvoice(false); }
  };

  const downloadBlob = (data, filename) => {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Complaint Logic
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [complaintOrder, setComplaintOrder] = useState(null);
  const [complaintText, setComplaintText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openComplaintModal = (order) => { setComplaintOrder(order); setIsComplaintModalOpen(true); };
  const closeComplaintModal = () => { setComplaintOrder(null); setComplaintText(""); setIsComplaintModalOpen(false); };

  const handleComplaintSubmit = async () => {
    if (isSubmitting) return;
    if (!complaintOrder?.id) return errorNotify("Invalid Order.");
    setIsSubmitting(true);
    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const headers = { "Content-Type": "application/json", Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined };
      const res = await axios.post(`${config.API_URL}/api/raisecomplaint`, { orderId: complaintOrder.id, complaintText: complaintText.trim() }, { headers });
      if (res?.data?.message) {
        successNotify("Complaint submitted successfully!");
        closeComplaintModal();
      } else {
        errorNotify(res?.data?.error || "Failed to submit complaint.");
      }
    } catch { errorNotify("Something went wrong. Please try again."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#033053] tracking-tight mb-2">My Bookings</h1>
            <p className="text-gray-500 font-medium text-lg">Manage your orders and track services</p>
          </div>

          <div className="w-full md:w-auto relative group">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3.5 bg-white border-none rounded-2xl shadow-sm text-gray-700 font-medium focus:ring-2 focus:ring-[#0463ac] focus:shadow-md transition-all placeholder:font-normal placeholder:text-gray-400"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0463ac] transition-colors" />
          </div>
        </div>

        {/* Filters Row */}
        {(filters.status !== "all" || filters.serviceType !== "all" || filters.dateRange.start) && (
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in-up">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-1">Active Filters:</span>
            {filters.status !== "all" && (
              <span className="bg-white border border-[#0463ac]/20 text-[#0463ac] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                Status: {filters.status}
                <button onClick={() => handleFilterChange("status", "all")} className="hover:text-red-500"><IoMdClose /></button>
              </span>
            )}
            <button onClick={resetFilters} className="text-xs font-bold text-gray-500 hover:text-[#0463ac] border-b-2 border-transparent hover:border-[#0463ac] transition-colors ml-auto md:ml-2">
              Reset All
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-8">
          {Object.keys(groupedBookings).length === 0 ? (
            <div className="bg-white rounded-[32px] p-16 text-center shadow-lg shadow-blue-500/5 border border-gray-100">
              <img src={emptyBooking} alt="No bookings" className="w-64 mx-auto mb-6 opacity-90" />
              <h3 className="text-2xl font-black text-[#033053] mb-2">No Bookings Found</h3>
              <p className="text-gray-500 font-medium max-w-md mx-auto">
                Looks like you haven't booked any services yet. Explore our services to get started!
              </p>
              <button onClick={() => navigate('/')} className="mt-8 px-8 py-3 bg-[#0463ac] text-white rounded-xl font-bold hover:bg-[#03528a] transition-colors shadow-lg shadow-blue-200">
                Explore Services
              </button>
            </div>
          ) : (
            Object.entries(groupedBookings).map(([orderNumber, orders]) => (
              <div
                key={orderNumber}
                className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#0463ac]/10 h-10 w-10 rounded-xl flex items-center justify-center text-[#0463ac]">
                      <FiPackage size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Order Number</p>
                      <p className="text-lg font-black text-[#033053] font-mono leading-none">#{orderNumber}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Date Placed</p>
                      <div className="flex items-center justify-end gap-1.5 font-bold text-gray-700 text-sm">
                        <FiCalendar className="text-gray-400" />
                        {new Date(orders[0]?.date || orders[0]?.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-50">
                  {orders.map((od, index) => (
                    <div key={index} className="p-6 md:p-8 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col lg:flex-row gap-8">

                        {/* Service Item Details */}
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 leading-tight">{od?.product_name}</h4>
                              <p className="text-sm font-medium text-gray-500 mt-1">
                                {od?.attribute} {od?.variation && <span className="text-gray-400">• {od.variation}</span>}
                              </p>
                            </div>
                            <span className={getStatusStyles(od?.order_status)}>
                              {OrderStatuses[od?.order_status]}
                            </span>
                          </div>

                          {/* Meta Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Scheduled For</p>
                              <div className="flex items-start gap-2">
                                <FiClock className="text-[#0463ac] mt-0.5 shrink-0" />
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-gray-900 leading-none">{od?.desired_date}</span>
                                  <span className="text-xs font-medium text-gray-500 mt-1">{od?.desired_time}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Total</p>
                              <p className="text-lg font-black text-gray-900">₹{Number(od?.grand_total || od?.price || 0).toFixed(2)}</p>
                            </div>
                            {od?.order_status === 0 && (
                              <div className="col-span-2 sm:col-span-1">
                                <button
                                  onClick={() => handleCancelOrder(od.id)}
                                  className="text-red-500 text-xs font-bold uppercase tracking-wide hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                >
                                  Cancel Order
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions Toolbar */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48 xl:w-56 lg:border-l lg:border-gray-50 lg:pl-8">
                          <NavLink
                            to={`${config.VITE_BASE_URL}/track-order/${od.id}`}
                            className="flex items-center justify-center gap-2 w-full bg-[#0463ac] hover:bg-[#034d85] text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-200 transition-all active:scale-95"
                          >
                            <LiaShippingFastSolid size={18} /> Track
                          </NavLink>

                          {od?.order_status === 4 && (
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => generateInvoicePDF(od)}
                                disabled={loadingInvoice}
                                className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-600 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all"
                              >
                                <FaFileInvoice className="text-blue-500 text-base" /> Invoice
                              </button>
                              <button
                                onClick={() => openReviewModal(od)}
                                className="flex flex-col items-center justify-center gap-1 bg-white border border-gray-200 hover:border-green-200 hover:bg-green-50 text-gray-600 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all"
                              >
                                <span className="text-green-500 text-lg">★</span> Review
                              </button>
                            </div>
                          )}

                          {/* Support Link */}
                          <div className="mt-auto pt-2 text-center lg:text-left">
                            {od?.order_status === 4 ? (
                              <button
                                onClick={() => openComplaintModal(od)}
                                className="w-full text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 py-2 rounded-xl transition-colors uppercase tracking-wide shadow-sm"
                              >
                                Raise a Complaint
                              </button>
                            ) : (
                              <a href="https://wa.me/" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 opacity-80 hover:opacity-100 transition-all">
                                <FaWhatsapp size={16} /> Need Help?
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Info */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex flex-wrap gap-6 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <FiCreditCard />
                    <span>Payment: <span className="text-gray-900 font-bold">{orders[0]?.payment?.payment_name || 'Online'}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin />
                    <span className="truncate max-w-xs">{orders[0]?.full_name}, {orders[0]?.mobile}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Modal Wrapper */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        orderId={selectedOrder?.id}
        productId={selectedOrder?.product_id}
        onReviewSubmitted={() => { successNotify("Review Submitted"); getBookings(); }}
      />

      {/* Modern Complaint Modal */}
      {isComplaintModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden transform transition-all">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-black text-[#033053]">Raise Complaint</h3>
                  <p className="text-sm font-medium text-gray-500">Order #{complaintOrder?.order_number}</p>
                </div>
                <button onClick={closeComplaintModal} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <IoMdClose className="text-gray-500 text-lg" />
                </button>
              </div>

              <textarea
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                rows={4}
                placeholder="Please describe the issue you are facing..."
                className="w-full border border-gray-200 bg-gray-50 rounded-xl p-4 text-gray-700 font-medium focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none mb-6 placeholder:text-gray-400 resize-none"
              />

              <div className="flex gap-3">
                <button onClick={closeComplaintModal} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleComplaintSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-100 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
            <div className="bg-red-50 p-4 text-center text-xs font-bold text-red-600/80 uppercase tracking-widest">
              Support Team will contact you shortly
            </div>
          </div>
        </div>
      )}
    </div>
  );
}