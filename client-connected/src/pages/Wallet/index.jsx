import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../context/ToastProvider";
import config from "../../config/config";
import { FaWallet, FaChevronRight } from "react-icons/fa";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { format } from 'date-fns';

export default function Wallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const notify = useToast();
  const successNotify = (success) => notify(success, 'success');
  const errorNotify = (error) => notify(error, 'error');

  useEffect(() => {
    fetchWalletData();
  }, []);

  // Keeping all the existing functionality methods unchanged
  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const user = jwtDecode(jwtToken);

      const response = await axios.post(
        `${config.API_URL}/api/wallet/transactions`,
        { userId: user.id },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );

      if (response.data.status === 1) {
        setTransactions(response.data.transactions);
        setWallet(response.data.wallet);
      } else {
        errorNotify(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      errorNotify('Error fetching wallet data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecharge = async () => {
    if (!amount || amount <= 0) {
      errorNotify('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    const user = jwtDecode(jwtToken);

    try {
      const orderResponse = await axios.post(
        `${config.API_URL}/api/initiatePayment`,
        {
          amount: Number(amount),
          currency: "INR",
          user_id: user.id,
        },
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      const options = {
        key: config.RAZORPAY_KEY_ID,
        amount: orderResponse.data.data.amount,
        currency: orderResponse.data.data.currency,
        name: "Hommlie",
        description: "Wallet Recharge",
        order_id: orderResponse.data.data.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              `${config.API_URL}/api/verifyPayment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${jwtToken}` },
              }
            );

            if (verifyResponse.data.status === 1) {
              await addMoneyToWallet(user.id, response.razorpay_payment_id);
            } else {
              errorNotify("Payment verification failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            errorNotify("Payment verification failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#249370",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      errorNotify("Error processing payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const addMoneyToWallet = async (userId, paymentId) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/api/wallet/add-money`,
        {
          userId,
          amount: Number(amount),
          description: "Wallet recharge",
          payment_id: paymentId,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("HommlieUserjwtToken")}`,
          },
        }
      );

      if (response.data.status === 1) {
        successNotify("Money added successfully");
        setAmount('');
        setIsModalOpen(false);
        fetchWalletData();
      } else {
        errorNotify(response.data.message);
      }
    } catch (error) {
      console.error("Error adding money to wallet:", error);
      errorNotify("Error adding money to wallet");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Modern Card Design */}
        <div className="relative mb-12 transition-all duration-300 hover:transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl transform rotate-1 opacity-20"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaWallet className="text-2xl text-white" />
                </div>
                <h2 className="text-xl text-white font-medium">Digital Wallet</h2>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-white text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add Money
                </button>
              </div>
            </div>
            <div className="text-white">
              <p className="text-lg opacity-80">Available Balance</p>
              <p className="text-5xl font-bold mt-2">₹{wallet?.balance || 0}</p>
            </div>
            <div className="absolute bottom-8 right-8 opacity-10">
              <div className="w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="w-16 h-16 border-2 border-white rounded-full -mt-8 ml-8"></div>
            </div>
          </div>
        </div>

        {/* Transactions List with Animation */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800">Transaction History</h3>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="transform transition-all duration-300 hover:scale-102 hover:bg-gray-50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.transaction_type === 'credit' ? 'bg-emerald-100' : 'bg-red-100'
                      }`}>
                        {transaction.transaction_type === 'credit' ? (
                          <BsArrowUpCircleFill className="text-2xl text-emerald-500" />
                        ) : (
                          <BsArrowDownCircleFill className="text-2xl text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {format(new Date(transaction.created_at), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`text-lg font-semibold ${
                        transaction.transaction_type === 'credit'
                          ? 'text-emerald-500'
                          : 'text-red-500'
                      }`}>
                        {transaction.transaction_type === 'credit' ? '+' : '-'}₹{transaction.amount}
                      </p>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWallet className="text-2xl text-gray-400" />
              </div>
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>

        {/* Enhanced Modal Design */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 scale-100 animate-slideUp">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Add Money to Wallet</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Enter Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 text-gray-600 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRecharge}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Proceed to Pay'
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