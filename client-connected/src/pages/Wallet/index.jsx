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
        theme: { color: "#249370" },
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
   <main className="sm:bg-[linear-gradient(135deg,#e6f6f1_0%,#fdf4f4_25%,#f0e6f9_50%,#e8f3fd_75%,#e6faec_100%)]">
      <div className="mt-10 mb-10" >
        {/* Wallet Card */}
        <section className="relative mx-auto sm:-ml-0 -ml-10 w-[130%] sm:w-[95%] md:w-full rounded-[20px] sm:rounded-[28px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 rounded-[20px] sm:rounded-[28px] bg-white/10 opacity-10 pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 rounded-[20px] sm:rounded-[28px] bg-gradient-to-r from-[#0CA87B] to-[#0A6FA1] px-6 sm:px-10 py-8 sm:py-10">
            <div className="col-span-12 md:col-span-7 lg:col-span-8 flex items-center gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/15 backdrop-blur-[1px] flex items-center justify-center">
                <FaWallet className="text-white text-xl sm:text-2xl" />
              </div>
              <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">
                Digital Wallet
              </h2>
            </div>

            <div className="col-span-12 md:col-span-5 lg:col-span-4 flex md:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-[#92B775] px-6 sm:px-8 py-3 text-white text-base sm:text-lg font-semibold shadow-[0_8px_16px_rgba(255,106,92,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
              >
                Add Money
              </button>
            </div>

            <div className="col-span-12 pt-2">
              <p className="text-white/90 text-lg sm:text-xl">Available Balance</p>
              <p className="mt-2 text-white text-4xl sm:text-6xl font-bold leading-none">
                ₹{Number(wallet?.balance ?? 0).toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* Transactions Card */}
        <section className="sm:-ml-0 -ml-10 w-[130%] sm:w-[100%] mt-8 sm:mt-10 rounded-[20px] sm:rounded-[28px] bg-[rgba(7,20,45,0.65)] backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          <div className="px-6 sm:px-10 py-6 sm:py-8">
            <h3 className="text-white text-2xl sm:text-3xl font-semibold">
              Transaction History
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="h-10 w-10 sm:h-12 sm:w-12 animate-spin rounded-full border-4 border-white/30 border-t-transparent" />
              </div>
            ) : transactions.length > 0 ? (
              <div className="mt-4 sm:mt-6 divide-y divide-white/5">
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 py-4 sm:py-5 transition-colors hover:bg-white/5 rounded-xl px-3 sm:px-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full ${
                          t.transaction_type === "credit"
                            ? "bg-emerald-400/15"
                            : "bg-red-400/15"
                        }`}
                      >
                        {t.transaction_type === "credit" ? (
                          <BsArrowUpCircleFill className="text-emerald-400 text-xl sm:text-2xl" />
                        ) : (
                          <BsArrowDownCircleFill className="text-red-400 text-xl sm:text-2xl" />
                        )}
                      </div>
                      <div>
                        <p className="text-white/95 font-medium text-sm sm:text-base">
                          {t.description}
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {format(new Date(t.created_at || t.createdAt), "MMM dd, yyyy HH:mm")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <p
                        className={`text-base sm:text-lg font-semibold ${
                          t.transaction_type === "credit"
                            ? "text-emerald-300"
                            : "text-red-300"
                        }`}
                      >
                        {t.transaction_type === "credit" ? "+" : "-"}₹{Number(t.amount ?? 0).toFixed(2)}
                      </p>
                      <FaChevronRight className="hidden sm:block text-white/40 group-hover:text-white/70 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 sm:py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/5">
                  <FaWallet className="text-white/60 text-xl sm:text-2xl" />
                </div>
                <p className="text-white/70 text-base sm:text-lg">
                  No transactions found
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Add Money Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Add Money to Wallet
              </h4>
              <div className="mt-6 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Enter Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:ring-2 focus:ring-[#0CA87B]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-xl border border-gray-200 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRecharge}
                    disabled={isProcessing}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#0CA87B] to-[#0A6FA1] py-3 font-semibold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                        Processing…
                      </span>
                    ) : (
                      "Proceed to Pay"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
