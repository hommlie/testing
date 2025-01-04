import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../context/ToastProvider";
import config from "../../config/config";
import { FaWallet } from "react-icons/fa";
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

  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const user = jwtDecode(jwtToken);

      const response = await axios.post(`${config.API_URL}/api/wallet/transactions`, 
        {
            userId: user.id
        },
        {
            headers: {
            Authorization: `Bearer ${jwtToken}`,
            },
        }
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
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
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
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Wallet Balance Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaWallet className="text-3xl text-[#249370]" />
              <div>
                <h2 className="text-2xl font-semibold">Wallet Balance</h2>
                <p className="text-4xl font-bold text-[#249370] mt-2">
                  ₹{wallet?.balance || 0}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-[#249370] text-white font-medium rounded-lg hover:bg-[#1a745a] transition-colors"
            >
              Add Money
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Transaction History</h3>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#249370]"></div>
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {transaction.transaction_type === 'credit' ? (
                      <BsArrowUpCircleFill className="text-2xl text-green-500" />
                    ) : (
                      <BsArrowDownCircleFill className="text-2xl text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(transaction.created_at), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <p className={`font-semibold ${
                    transaction.transaction_type === 'credit'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {transaction.transaction_type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No transactions found</p>
          )}
        </div>

        {/* Add Money Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold mb-4">Add Money to Wallet</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Enter Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#249370]"
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRecharge}
                    disabled={isProcessing}
                    className="flex-1 py-3 bg-[#249370] text-white font-medium rounded-lg hover:bg-[#1a745a] transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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