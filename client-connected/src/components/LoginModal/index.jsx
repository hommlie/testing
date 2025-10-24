import React, { useState, useEffect, useRef } from "react";
import { BsArrowLeftCircle, BsCheckCircle } from "react-icons/bs";
import { useCont } from "../../context/MyContext";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import hommlieLogo from "/assets/logo/loogo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginSignup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [counter, setCounter] = useState(60);
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const notify = useToast();
  const successNotify = (msg) => notify(msg, "success");
  const errorNotify = (msg) => notify(msg, "error");
  const warningNotify = (msg) => notify(msg, "warning");

  const {
    token,
    setToken,
    user,
    setUser,
    getUser,
    getCart,
    getBookings,
    getAddresses,
    getPaymentList,
  } = useCont();

  useEffect(() => {
    if (user?.length !== 0) onClose();
    let timer;
    if (isOtpSent && counter > 0) {
      timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
    } else if (counter === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, counter, user, isOpen]);

  useEffect(() => {
    if (isOtpSent) {
      otpRefs.current[0]?.focus();
    }
  }, [isOtpSent]);

  if (!isOpen) return null;

  const isLoginButtonEnabled = phone.length === 10 && termsAccepted;
  const isOtpButtonEnabled = otp.every((digit) => digit) && name.trim() !== "";

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, otp.length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      otpRefs.current[newOtp.length - 1]?.focus();
    }
    e.preventDefault();
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/api/register`, {
        mobile: `+91${phone}`,
      });
      if (response.data.status === 1) {
        if (response.data?.user_name) {
          setName(response.data?.user_name);
        }
        setIsOtpSent(true);
        setCounter(60);
        warningNotify("OTP has been sent!");
      } else {
        errorNotify(response.data.message);
      }
    } catch (error) {
      errorNotify(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/api/resendotp`, {
        mobile: `+91${phone}`,
      });
      if (response.data.status === 1) {
        setCounter(60);
        setIsOtpSent(true);
        warningNotify("OTP resent!");
      } else {
        errorNotify(response.data.message);
      }
    } catch (error) {
      errorNotify(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newOtp = Number(otp.join(""));
      const response = await axios.post(`${config.API_URL}/api/verifyotp`, {
        mobile: `+91${phone}`,
        otp: newOtp,
        name: name.trim(),
        referral_code: referralCode,
      });
      if (response.data.status === 1) {
        const jwtToken = response.data.token;
        Cookies.set("HommlieUserjwtToken", jwtToken, {
          expires: 30,
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        setToken(jwtToken);
        const decodedToken = jwtDecode(jwtToken);
        setUser(decodedToken);
        localStorage.setItem("HommlieUser", JSON.stringify(decodedToken));
        successNotify("Welcome to Hommlie");
        getUser();
        getCart();
        getBookings();
        getAddresses();
        getPaymentList();
        // call onClose then invoke onLoginSuccess if provided
        onClose();
        if (typeof onLoginSuccess === "function") {
          try {
            onLoginSuccess();
          } catch (e) {
            // ignore errors from callback
            console.error("onLoginSuccess callback error:", e);
          }
        }
      } else {
        errorNotify(response.data.message);
      }
    } catch (error) {
      errorNotify(error.response?.data?.message || "An error occurred");
      setOtp(["", "", "", ""]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    // Ensure login modal stacks above other site modals (increase z-index)
    <div className="fixed inset-0 z-[2002] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-[90%] max-w-96 p-8 rounded-3xl shadow-2xl md:hidden">
        {/* Mobile view logic here (can be filled in as needed) */}
          <div className="text-center mb-6">
            <img src={hommlieLogo} alt="Hommlie Logo" className="h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Welcome to Hommlie</h2>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>
  
          <form className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="flex items-center text-gray-500">
                    <img src="https://flagcdn.com/w20/in.png" alt="India" className="h-4 mr-2" />+91
                  </span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-20 p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035240] focus:border-transparent"
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  minLength="10"
                  disabled={isOtpSent}
                />
              </div>
            </div>
  
            {isOtpSent && (
              <>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp.join("")}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setOtp(value.split(""));
                      }}
                      onPaste={(e) => {
                        const pastedData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 4);
                        setOtp(pastedData.split(""));
                        e.preventDefault();
                      }}
                      maxLength={4}
                      className="w-full tracking-[1em] text-center text-2xl font-bold p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035240] focus:border-transparent"
                      placeholder="- - - -"
                    />
                  </div>
                <div className="flex justify-between items-center text-sm">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={counter > 0 || isLoading}
                    className={`${counter > 0 ? "text-gray-400" : "text-[#035240]"} font-medium`}
                  >
                    Resend OTP
                  </button>
                  <span className="text-gray-500">
                    {counter > 0 ? `Resend in ${Math.floor(counter / 60)}:${String(counter % 60).padStart(2, "0")}` : "OTP expired"}
                  </span>
                </div>
              </>
            )}
  
            {isOtpSent && !name && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035240] focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
  
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="h-4 w-4 text-[#035240] focus:ring-[#035240] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the {" "}
                  <button
                    onClick={() => navigate(`${config.VITE_BASE_URL}/terms-conditions`)}
                    className="text-[#035240] hover:underline font-medium"
                  >
                    Terms of Service
                  </button>{" "}
                  and {" "}
                  <button
                    onClick={() => navigate(`${config.VITE_BASE_URL}/privacy-policy`)}
                    className="text-[#035240] hover:underline font-medium"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            </div>
  
            <div>
              <button
                type="button"
                onClick={isOtpSent ? handleProceed : handleSendOtp}
                disabled={
                  isLoading ||
                  !termsAccepted ||
                  (isOtpSent ? !isOtpButtonEnabled : !isLoginButtonEnabled)
                }
                className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all ${
                  isLoading
                    ? "bg-[#02876A] cursor-wait"
                    : isOtpSent
                    ? isOtpButtonEnabled && termsAccepted
                      ? "bg-[#035240] hover:bg-[#024235]"
                      : "bg-gray-300 cursor-not-allowed"
                    : isLoginButtonEnabled
                    ? "bg-[#035240] hover:bg-[#024235]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : isOtpSent ? (
                  "Verify & Continue"
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>
        </div>

      <div className="hidden md:flex w-[90%] max-w-4xl">
        <div className="w-1/2 bg-gradient-to-br from-[#035240] to-[#02876A] flex items-center justify-center p-12 rounded-l-2xl overflow-hidden">
          <div className="text-white text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl font-bold mb-4"
            >
              Join Hommlie Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm opacity-90"
            >
              Experience seamless services at your fingertips
            </motion.p>
            <motion.img
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              src="/images/auth-side-image.webp"
              alt="Welcome"
              className="w-64 h-64 mx-auto mt-4 rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="w-1/2 p-10 bg-gray-50 rounded-r-2xl border border-gray-200 shadow-xl flex flex-col justify-center">
          <div className="relative">
            <div className="absolute top-0 right-0">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-8">
              <img src={hommlieLogo} alt="Hommlie Logo" className="h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">
                {isOtpSent ? "Verify Your Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-600 mt-2">
                {isOtpSent ? "Enter the OTP sent to your mobile" : "Sign in or create an account"}
              </p>
            </div>

            {/* Continue your form JSX from here as already included in earlier code */}
            <form className="space-y-6">
            {/* Phone Number Field (always visible) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="flex items-center text-gray-500">
                    <img
                      src="https://flagcdn.com/w20/in.png"
                      alt="India"
                      className="h-4 mr-2"
                    />
                    +91
                  </span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-20 p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035240] focus:border-transparent transition-all"
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  minLength="10"
                  disabled={isOtpSent}
                />
              </div>
            </div>

            {/* OTP Fields (visible when OTP sent) */}
            {isOtpSent && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp.join("")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setOtp(value.split(""));
                  }}
                  onPaste={(e) => {
                    const pastedData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 4);
                    setOtp(pastedData.split(""));
                    e.preventDefault();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && otp.every((digit) => digit) && name.trim() !== "") {
                      handleProceed(e);
                    }
                  }}
                  maxLength={4}
                  className="w-full tracking-[1em] text-center text-2xl font-bold p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035240] focus:border-transparent"
                  placeholder="- - - -"
                />
              </div>
            )}

            {/* Name Field (visible when OTP sent and name not pre-filled) */}
            {isOtpSent && !name && (
              <div className="animate-fadeIn">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#035240] focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            {/* Terms Checkbox */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="h-4 w-4 text-[#035240] focus:ring-[#035240] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <button
                    onClick={() =>
                      navigate(`${config.VITE_BASE_URL}/terms-conditions`)
                    }
                    className="text-[#035240] hover:underline font-medium"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    onClick={() =>
                      navigate(`${config.VITE_BASE_URL}/privacy-policy`)
                    }
                    className="text-[#035240] hover:underline font-medium"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={isOtpSent ? handleProceed : handleSendOtp}
                disabled={
                  isLoading ||
                  !termsAccepted ||
                  (isOtpSent ? !isOtpButtonEnabled : !isLoginButtonEnabled)
                }
                className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all ${
                  isLoading
                    ? "bg-[#02876A] cursor-wait"
                    : isOtpSent
                    ? isOtpButtonEnabled && termsAccepted
                      ? "bg-[#035240] hover:bg-[#024235]"
                      : "bg-gray-300 cursor-not-allowed"
                    : isLoginButtonEnabled
                    ? "bg-[#035240] hover:bg-[#024235]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : isOtpSent ? (
                  "Verify & Continue"
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
