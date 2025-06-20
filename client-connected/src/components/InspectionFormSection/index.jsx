import React, { useState } from "react";
import { IoBusiness, IoCallOutline } from "react-icons/io5";
import axios from "axios";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InspectionFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    date: new Date(),
    time: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const notify = useToast();
  const successNotify = (msg) => notify(msg, "success");
  const errorNotify = (msg) => notify(msg, "error");

  const timeSlots = [
    "9 to 11 AM",
    "11 to 1 PM",
    "1 to 3 PM",
    "3 to 5 PM",
    "5 to 7 PM",
  ];

  const services = [
    { id: 1, name: "Pest Control" },
    { id: 2, name: "Cleaning" },
    { id: 3, name: "Bird Control" },
    { id: 4, name: "Disinfection" },
  ];

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.service) newErrors.service = "Service is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.time) newErrors.time = "Time slot is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStepTwo()) return;
    setLoading(true);

    try {
      const response = await axios.post(`${config.API_URL}/api/createInspection`, {
        fullName: formData.name,
        address: formData.address,
        mobile: formData.phone,
        email: formData.email,
        date: formData.date.toISOString(),
        time: formData.time,
        service: formData.service,
      });

      if (response.data.status === 1) {
        successNotify("Service request submitted successfully!");
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          service: "",
          date: new Date(),
          time: "",
        });
        setStep(1);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        errorNotify("Failed to submit service request. Try again.");
      }
    } catch (err) {
      console.error(err);
      errorNotify("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Schedule Your Inspection</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">Get professional help for your home or business</p>
          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <MdOutlineLocalPostOffice className="text-xl text-green-600 bg-green-100 rounded-full p-2 w-8 h-8" />
              <div>
                <h3 className="text-gray-500">Email</h3>
                <p className="text-gray-800 font-medium">reach@hommlie.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IoCallOutline className="text-xl text-green-600 bg-green-100 rounded-full p-2 w-8 h-8" />
              <div>
                <h3 className="text-gray-500">Phone</h3>
                <p className="text-gray-800 font-medium">+91-6363865658</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IoBusiness className="text-xl text-green-600 bg-green-100 rounded-full p-2 w-8 h-8" />
              <div>
                <h3 className="text-gray-500">Our Offices</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Bangalore", "Hyderabad", "Chennai", "Delhi"].map((city) => (
                    <span key={city} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">{city}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
            {[1, 2].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step === s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{s}</div>
                {i < 1 && <div className={`h-1 w-8 ${step > s ? 'bg-green-600' : 'bg-gray-300'}`} />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            {step === 1 && (
              <>
                <div>
                  <label className="block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
                    placeholder="Enter Your Name" 
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block mb-1">Phone Number *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-100 text-gray-600">+91</span>
                    <input 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                      className={`flex-1 px-3 py-2 border rounded-r-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
                      placeholder="9876543210" 
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block mb-1">Select Service *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.service ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Choose a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
                </div>
                <button 
                  type="button" 
                  onClick={() => validateStepOne() && setStep(2)} 
                  className="w-full bg-green-600 text-white py-2 rounded-lg"
                >
                  Continue to Schedule
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block mb-1">Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your full address with landmark"
                    rows={3}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Date *</label>
                    <DatePicker 
                      selected={formData.date} 
                      onChange={(date) => setFormData({ ...formData, date })} 
                      minDate={new Date()} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Time Slot *</label>
                    <select 
                      value={formData.time} 
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })} 
                      className={`w-full px-3 py-2 border rounded-lg ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select preferred time</option>
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="w-full border border-gray-300 py-2 rounded-lg"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-70"
                  >
                    {loading ? "Processing..." : "Confirm Inspection"}
                  </button>
                </div>
              </>
            )}
          </form>

          {submitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-xl shadow-xl text-center w-full max-w-md mx-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking Inspection Confirmed!</h3>
                <p className="text-sm text-gray-600 mb-4">We've received your request and will contact you shortly to confirm the details.</p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="w-full bg-green-600 text-white py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionFormSection;