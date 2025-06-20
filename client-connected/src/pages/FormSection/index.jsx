import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const ContactForm = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!callbackName.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z ]+$/.test(callbackName.trim())) {
      newErrors.name = 'Name must contain only letters.';
    }

    if (!callbackPhone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{10,}$/.test(callbackPhone.trim())) {
      newErrors.phone = 'Phone must be at least 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const fullPhone = `${countryCode}${callbackPhone.trim()}`;
    console.log("Callback submitted:", { name: callbackName, phone: fullPhone });

    setIsSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setCallbackName('');
      setCallbackPhone('');
      setErrors({});
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm relative">
      {/* Request Callback Button */}
      <form onSubmit={handleSubmit} className="flex justify-center">
        <button
          type="submit"
          className="bg-white text-emerald-800 border border-emerald-800 hover:bg-emerald-800 hover:text-white font-medium py-3 px-8 rounded-md transition duration-200"
        >
          Request a call back
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full text-center">
            {!isSubmitted ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-emerald-800">Enter Your Details</h2>
                <form onSubmit={handlePhoneSubmit} className="space-y-4 text-left">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="+91">+91 🇮🇳</option>
                      <option value="+1">+1 🇺🇸</option>
                      <option value="+44">+44 🇬🇧</option>
                      <option value="+61">+61 🇦🇺</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

                  <button
                    type="submit"
                    className="w-full bg-emerald-800 text-white py-2 rounded-md hover:bg-emerald-700 transition"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setCallbackName('');
                      setCallbackPhone('');
                      setErrors({});
                    }}
                    className="w-full text-sm text-gray-500 mt-2 hover:underline"
                  >
                    Cancel
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <CheckCircle className="text-emerald-600 w-12 h-12 mb-3" />
                <p className="text-lg font-medium text-emerald-700">
                  Request has been sent successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
