import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import config from '../../config/config';
import { useToast } from "../../context/ToastProvider";
import hommlieLogo from '../../assets/images/hommlie-logo.png';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ isOpen, onClose }) => {
    const [phone, setPhone] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [counter, setCounter] = useState(60);
    const [referralCode, setReferralCode] = useState('');
    const otpRefs = useRef([]);
    const navigate = useNavigate();
    
    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');
    const warningNotify = (warning) => notify(warning, 'warning');
    
    const { token, setToken, user, setUser, getUser, getCart, getBookings, getAddresses, getCoupons, getPaymentList } = useCont();

    useEffect(() => {
        if (user?.length !== 0) onClose();

        let timer;
        if (isOtpSent && counter > 0) {
            timer = setInterval(() => setCounter(prevCounter => prevCounter - 1), 1000);
        } else if (counter === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isOtpSent, counter, user, isOpen]);

    useEffect(() => {
        if (isOtpSent) {
            otpRefs.current[0].focus();
        }
    }, [isOtpSent]);

    if (!isOpen) return null;

    const isLoginButtonEnabled = phone && termsAccepted;
    const isOtpButtonEnabled = otp.every(digit => digit);

    const handlePhoneChange = (phone) => {
        setPhone(phone.startsWith('+') ? phone : `+${phone}`);
    };

    const handleOtpChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                otpRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('Text').slice(0, otp.length);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            otpRefs.current[newOtp.length - 1].focus();
        }
        e.preventDefault();
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post(`${config.API_URL}/api/register`, { mobile: phone });
            if (response.data.status === 1) {
                console.log(response);
                
                setIsOtpSent(true);
                setCounter(60);
                warningNotify("OTP has been sent!");
            } else {
                errorNotify(response.data.message);
            }
        } catch (error) {
            errorNotify(error.response?.data?.message || "An error occurred");
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await axios.post(`${config.API_URL}/api/resendotp`, { mobile: phone });
            if (response.data.status === 1) {
                setCounter(60);
                setIsOtpSent(true);
                warningNotify("OTP resent!");
            } else {
                errorNotify(response.data.message);
            }
        } catch (error) {
            errorNotify(error.response?.data?.message || "An error occurred");
        }
    };

    const handleProceed = async (e) => {
        e.preventDefault();
        try {
            const newOtp = Number(otp.join(""));
            const response = await axios.post(`${config.API_URL}/api/verifyotp`, { 
                mobile: phone, 
                otp: newOtp,
                referral_code: referralCode 
            });
            if (response.data.status === 1) {
                const jwtToken = response.data.token;
                Cookies.set('HommlieUserjwtToken', jwtToken, { expires: 30, path: '/', secure: true, sameSite: 'strict' });
                setToken(jwtToken);
                const decodedToken = jwtDecode(jwtToken);
                setUser(decodedToken);
                console.log(decodedToken);
                
                localStorage.setItem("HommlieUser", JSON.stringify(decodedToken));
                successNotify("Welcome to Hommlie");
                getUser();
                getCart();
                getBookings();
                getAddresses();
                getCoupons();
                getPaymentList();
                onClose();
            } else {
                errorNotify(response.data.message);
            }
        } catch (error) {
            errorNotify(error.response?.data?.message || "An error occurred");
            setOtp(['', '', '', '']);
        }
    };

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-[90%] max-w-96 p-8 rounded-3xl shadow-2xl">
                <div className="absolute top-4 right-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div className="mb-8 text-center">
                    <img src={hommlieLogo} alt="Hommlie Logo" className="h-10 md:h-12 mx-auto" />
                    <h2 className="text-3xl font-semibold text-gray-800 my-10">Welcome to Hommlie</h2>
                </div>

                {isOtpSent ? (
                    <>
                        <button 
                            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
                            onClick={() => {setOtp(['', '', '', '']); setIsOtpSent(false);}}
                        >
                            <BsArrowLeftCircle className="w-6 h-6" />
                        </button>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Enter OTP</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Please enter the 4 digit code sent to <span className="font-medium text-[#035240]">{phone}</span>
                        </p>
                        <div className="flex space-x-4 mb-6" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => otpRefs.current[index] = el}
                                    type="text"
                                    value={digit}
                                    onChange={e => handleOtpChange(e.target.value, index)}
                                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    maxLength="1"
                                />
                            ))}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
                                Referral Code (Optional)
                            </label>
                            <input
                                type="text"
                                id="referralCode"
                                value={referralCode}
                                onChange={(e) => setReferralCode(e.target.value)}
                                className="w-full p-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter referral code"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <button 
                                onClick={handleResendOtp} 
                                className={`text-sm ${counter === 0 ? 'text-[#035240] hover:underline' : 'text-gray-400'}`}
                                disabled={counter > 0}
                            >
                                Resend OTP
                            </button>
                            <p className="text-sm text-gray-600">{`${Math.floor(counter / 60)}:${counter % 60 < 10 ? '0' : ''}${counter % 60}`}</p>
                        </div>
                        <button
                            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${isOtpButtonEnabled ? 'bg-[#035240] hover:bg-green-700' : 'bg-gray-300'}`}
                            disabled={!isOtpButtonEnabled}
                            onClick={handleProceed}
                        >
                            Verify & Proceed
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-600 mb-6">Enter your phone number to get started</p>
                        <div className="mb-6 w-full">
                            <PhoneInput
                                country={'in'}
                                value={phone}
                                onChange={handlePhoneChange}
                                inputClass="w-full p-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                buttonClass="bg-gray-100 hover:bg-gray-200 rounded-l-lg"
                                dropdownClass="bg-white"
                            />
                        </div>
                        <button
                            className={`w-full py-3 rounded-lg text-white font-semibold mb-4 transition-colors ${isLoginButtonEnabled ? 'bg-[#035240] hover:bg-green-700' : 'bg-gray-300'}`}
                            disabled={!isLoginButtonEnabled}
                            onClick={handleSendOtp}
                        >
                            Send OTP
                        </button>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                                className="mr-2 form-checkbox h-4 w-4 text-[#035240] transition duration-150 ease-in-out"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I accept the 
                                <button onClick={() => navigate(`${config.VITE_BASE_URL}/terms-conditions`)} className="text-[#035240] hover:underline">
                                Terms of Use</button> & 
                                <button onClick={() => navigate(`${config.VITE_BASE_URL}/privacy-policy`)} className="text-[#035240] hover:underline">Privacy Policy</button>
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;