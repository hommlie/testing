import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { BsArrowLeftCircle } from 'react-icons/bs';

const OtpVerificationModal = ({ isOpen, phone, onVerificationSuccess }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [counter, setCounter] = useState(60);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const otpRefs = useRef([]);

    useEffect(() => {
        let timer;
        if (isOtpSent && counter > 0) {
            timer = setInterval(() => setCounter(prevCounter => prevCounter - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isOtpSent, counter]);

    useEffect(() => {
        if (isOpen) {
            handleSendOtp();
            otpRefs.current[0]?.focus();
        }
    }, [isOpen, phone]);

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
        const pastedData = e.clipboardData.getData('Text').slice(0, 4);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('').slice(0, 4);
            setOtp(newOtp);
            otpRefs.current[newOtp.length - 1].focus();
        }
        e.preventDefault();
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post(`${config.API_URL}/api/register`, { 
                mobile: `+91${phone}`
            });
            
            if (response.data.status === 1) {
                setIsOtpSent(true);
                setCounter(60);
                alert("OTP has been sent!");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to send OTP");
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await axios.post(`${config.API_URL}/api/resendotp`, { 
                mobile: `+91${phone}`
            });
            
            if (response.data.status === 1) {
                setCounter(60);
                setIsOtpSent(true);
                alert("OTP resent successfully!");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to resend OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const otpNumber = Number(otp.join(""));
            const response = await axios.post(`${config.API_URL}/api/verifyotp`, { 
                mobile: `+91${phone}`, 
                otp: otpNumber,
            });
            
            if (response.data.status === 1) {
                onVerificationSuccess();
            } else {
                alert(response.data.message);
                setOtp(['', '', '', '']);
                otpRefs.current[0].focus();
            }
        } catch (error) {
            alert(error.response?.data?.message || "Failed to verify OTP");
            setOtp(['', '', '', '']);
            otpRefs.current[0].focus();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-[90%] max-w-96 p-8 rounded-3xl shadow-2xl">

                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Verify Phone Number</h2>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-700">Enter OTP</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Please enter the 4 digit code sent to <span className="font-medium text-[#035240]">+91 {phone}</span>
                </p>

                <div className="w-full flex justify-between mb-6" onPaste={handlePaste}>
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

                <div className="flex justify-between items-center mb-6">
                    <button 
                        onClick={handleResendOtp} 
                        className={`text-sm ${counter === 0 ? 'text-[#035240] hover:underline' : 'text-gray-400'}`}
                        disabled={counter > 0}
                    >
                        Resend OTP
                    </button>
                    <p className="text-sm text-gray-600">
                        {`${Math.floor(counter / 60)}:${counter % 60 < 10 ? '0' : ''}${counter % 60}`}
                    </p>
                </div>

                <button
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
                        otp.every(digit => digit) ? 'bg-[#035240] hover:bg-green-700' : 'bg-gray-300'
                    }`}
                    disabled={!otp.every(digit => digit)}
                    onClick={handleVerifyOtp}
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OtpVerificationModal;