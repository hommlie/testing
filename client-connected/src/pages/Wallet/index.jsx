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
    <main className="min-h-screen bg-gray-50 pb-20 sm:pb-12">
      <div className="w-full mx-auto px-3 sm:px-6 pt-6 sm:pt-10">
        {/* Wallet Section */}
        <section className="w-full mb-6 sm:mb-8">
          <div className="w-[350px] sm:w-[0px] bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <FaWallet className="text-[#0CA87B] text-lg" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Digital Wallet
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Available Balance</p>
                <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                  ₹{Number(wallet?.balance ?? 0).toFixed(2)}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <FaWallet className="text-white/80" />
                Add Money
              </button>
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className="w-full mt-6">
          <div className="w-full flex items-center justify-between mb-4 px-1">
            <h3 className="text-gray-900 text-lg sm:text-xl font-bold tracking-tight">
              Transaction History
            </h3>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#0A6FA1] hover:text-[#085d85] font-semibold text-sm flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-[#0A6FA1]/5"
            >
              {showAll ? "See Less" : "See More"}
              <FaChevronRight className={`text-[10px] transition-transform ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>

          <div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0CA87B]/30 border-t-[#0CA87B]" />
              </div>
            ) : transactions.length > 0 ? (
              <div className="flex flex-col gap-3">
                {transactions.slice(0, showAll ? undefined : 5).map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl p-4 flex items-center justify-between gap-4 border border-gray-200 shadow-sm transition-all hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${t.transaction_type === "credit"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                          }`}
                      >
                        {t.transaction_type === "credit" ? (
                          <BsArrowUpCircleFill className="text-2xl" />
                        ) : (
                          <BsArrowDownCircleFill className="text-2xl" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-sm sm:text-base leading-tight mb-0.5">
                          {t.description}
                        </p>
                        <p className="text-gray-400 text-xs font-medium">
                          {format(new Date(t.created_at || t.createdAt), "MMM dd, yyyy • HH:mm")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={`text-base sm:text-lg font-bold ${t.transaction_type === "credit"
                          ? "text-emerald-600"
                          : "text-gray-900"
                          }`}
                      >
                        {t.transaction_type === "credit" ? "+" : "-"}₹{Number(t.amount ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <FaWallet className="text-3xl" />
                </div>
                <p className="text-gray-400 font-medium">
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
