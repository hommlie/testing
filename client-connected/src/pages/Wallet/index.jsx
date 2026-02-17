import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../context/ToastProvider";
import config from "../../config/config";
import { FaWallet, FaChevronRight } from "react-icons/fa";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { format } from "date-fns";

export default function Wallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const notify = useToast();
  const successNotify = (m) => notify(m, "success");
  const errorNotify = (m) => notify(m, "error");

  useEffect(() => {
    fetchWalletData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      if (!jwtToken) return;
      const user = jwtDecode(jwtToken);

      const res = await axios.post(
        `${config.API_URL}/api/wallet/transactions`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      if (res.data.status === 1) {
        setTransactions(res.data.transactions);
        setWallet(res.data.wallet);
      } else {
        if (
          res.data.message &&
          res.data.message.toLowerCase().includes("wallet not found")
        ) {
          setWallet({ balance: 0 });
          setTransactions([]);
        } else {
          errorNotify(res.data.message || "Something went wrong");
        }
      }
    } catch (e) {
      console.error(e);
      errorNotify("Error fetching wallet data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecharge = async () => {
    if (!amount || Number(amount) <= 0) {
      errorNotify("Please enter a valid amount");
      return;
    }
    setIsProcessing(true);

    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const user = jwtDecode(jwtToken);

      const orderRes = await axios.post(
        `${config.API_URL}/api/initiatePayment`,
        { amount: Number(amount), currency: "INR", user_id: user.id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      const options = {
        key: config.RAZORPAY_KEY_ID,
        amount: orderRes.data.data.amount,
        currency: orderRes.data.data.currency,
        name: "Hommlie",
        description: "Wallet Recharge",
        order_id: orderRes.data.data.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              `${config.API_URL}/api/verifyPayment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${jwtToken}` } }
            );

            if (verifyRes.data.status === 1) {
              await addMoneyToWallet(user.id, response.razorpay_payment_id);
            } else {
              errorNotify("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            errorNotify("Payment verification failed");
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#0463ac" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (e) {
      console.error(e);
      errorNotify("Error processing payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const addMoneyToWallet = async (userId, paymentId) => {
    try {
      const res = await axios.post(
        `${config.API_URL}/api/wallet/add-money`,
        {
          userId,
          amount: Number(amount),
          description: "Wallet recharge",
          payment_id: paymentId,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("HommlieUserjwtToken")}` } }
      );

      if (res.data.status === 1) {
        successNotify("Money added successfully");
        setAmount("");
        setIsModalOpen(false);
        fetchWalletData();
      } else {
        errorNotify(res.data.message || "Unable to add money");
      }
    } catch (e) {
      console.error(e);
      errorNotify("Error adding money to wallet");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 sm:pb-12">
      <div className="w-full mx-auto px-4 sm:px-6 pt-4 sm:pt-12">
        {/* Wallet Section */}
        <section className="w-full mb-6 sm:mb-12 flex justify-center">
          <div className="w-full lg:max-w-7xl relative overflow-hidden bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] lg:flex lg:items-center lg:justify-between lg:gap-12 group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)]">
            {/* Background Accent for Desktop */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0463ac]/5 rounded-full blur-3xl group-hover:bg-[#0463ac]/10 transition-colors duration-500 hidden lg:block" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-tr from-[#0463ac] to-[#0580ca] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 duration-500">
                  <FaWallet className="text-white text-2xl sm:text-3xl" />
                </div>
                <div className="flex flex-col text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-left">
                    Digital Wallet
                  </h2>
                  <p className="text-gray-400 text-sm font-semibold mt-0.5 text-left">Secure & Instant Payments</p>
                </div>
              </div>

              <div className="hidden lg:block h-16 w-px bg-gray-100" />

              <div className="text-left">
                <p className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 text-left">Available Balance</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-semibold text-gray-400">₹</span>
                  <h3 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tighter tabular-nums text-left">
                    {Number(wallet?.balance ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 lg:mt-0 w-full lg:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full lg:w-auto bg-gradient-to-r from-[#0463ac] to-[#0580ca] hover:from-[#0580ca] hover:to-[#0463ac] text-white px-8 py-4 sm:py-5 rounded-2xl font-semibold shadow-[0_10px_25px_rgba(4,99,172,0.3)] hover:shadow-[0_15px_30px_rgba(4,99,172,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg group/btn"
              >
                <div className="bg-white/20 p-1.5 rounded-lg group-hover/btn:rotate-12 transition-transform">
                  <FaWallet className="text-white" />
                </div>
                Add Money
              </button>
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className="w-full max-w-7xl mx-auto px-1 sm:px-0">
          <div className="w-full flex items-center justify-between mb-6 sm:mb-8 px-4 sm:px-2">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-gradient-to-b from-[#0463ac] to-[#0580ca] rounded-full shadow-sm" />
              <h3 className="text-gray-900 text-xl sm:text-2xl font-bold tracking-tight">
                Transaction History
              </h3>
            </div>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#0463ac] bg-blue-50/50 hover:bg-blue-100/50 font-bold text-[13px] sm:text-sm flex items-center gap-1.5 transition-all px-4 py-2 rounded-full border border-blue-100/30"
            >
              <span className="uppercase tracking-wider">{showAll ? "Show Less" : "View All"}</span>
              <FaChevronRight className={`text-[10px] transition-transform duration-300 ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0463ac]/10 border-t-[#0463ac]" />
                <p className="text-gray-400 font-semibold animate-pulse">Loading secure data...</p>
              </div>
            ) : transactions.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {transactions.slice(0, showAll ? undefined : 6).map((t, idx) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-[1.5rem] p-5 sm:p-6 flex items-center justify-between gap-4 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100 group"
                    style={{ animationDelay: `${idx * 50}ms`, animation: 'fadeInUp 0.5s ease-out forwards' }}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div
                        className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${t.transaction_type === "credit"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                          }`}
                      >
                        {t.transaction_type === "credit" ? (
                          <BsArrowUpCircleFill className="text-2xl sm:text-3xl" />
                        ) : (
                          <BsArrowDownCircleFill className="text-2xl sm:text-3xl" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-bold text-base sm:text-lg leading-tight mb-1">
                          {t.description}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm font-medium flex items-center gap-2">
                          <span className="inline-block w-1 h-1 bg-gray-300 rounded-full" />
                          {format(new Date(t.created_at || t.createdAt), "MMM dd, yyyy • HH:mm")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={`text-lg sm:text-xl font-bold tabular-nums transition-all ${t.transaction_type === "credit"
                          ? "text-emerald-600"
                          : "text-gray-900"
                          }`}
                      >
                        {t.transaction_type === "credit" ? "+" : "-"}₹{Number(t.amount ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50 text-gray-300 transform -rotate-12 transition-transform hover:rotate-0 duration-500">
                  <FaWallet className="text-4xl" />
                </div>
                <h4 className="text-gray-900 font-bold text-xl mb-2">No Transactions Yet</h4>
                <p className="text-gray-400 font-semibold max-w-xs mx-auto">
                  Your wallet activity will appear here once you start using it.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Add Money Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] grid place-items-center bg-gray-900/60 backdrop-blur-md px-4 transition-all duration-300">
            <div className="w-full max-w-md rounded-[2.5rem] bg-white p-8 sm:p-10 shadow-2xl transform transition-all animate-scaleUp">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-4">
                  <FaWallet className="text-[#0463ac] text-3xl" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-center">
                  Add Money
                </h4>
                <p className="text-gray-400 font-semibold mt-1 text-center">Refill your digital wallet instantly</p>
              </div>

              <div className="space-y-8">
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300 group-focus-within:text-[#0463ac] transition-colors">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    placeholder="Enter amount"
                    className="w-full bg-gray-50 rounded-2xl border-2 border-transparent px-12 py-5 text-2xl font-bold outline-none transition-all focus:bg-white focus:border-[#0463ac] focus:ring-4 focus:ring-[#0463ac]/10 placeholder:text-gray-300 placeholder:font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleRecharge}
                    disabled={isProcessing}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#0463ac] to-[#0580ca] py-5 font-bold text-white text-lg shadow-[0_10px_25px_rgba(4,99,172,0.3)] transition-all hover:shadow-[0_15px_30px_rgba(4,99,172,0.4)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-3">
                        <span className="h-5 w-5 animate-spin rounded-full border-3 border-white/70 border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      "Proceed to Pay Securely"
                    )}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full rounded-2xl border-2 border-gray-100 py-4 font-bold text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Premium Feel */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
