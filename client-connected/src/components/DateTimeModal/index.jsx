import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, X, CheckCircle2, Star, Zap } from 'lucide-react';

const DateTimeModal = ({ isOpen, onClose, reSchedule, order_id, slotFull }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { setSelectedDayTime, setRescheduleDayTime, cart } = useCont();
  const scrollRef = useRef(null);

  const notify = useToast();
  const successNotify = (msg) => notify(msg, 'success');
  const errorNotify = (msg) => notify(msg, 'error');

  const generateTimesForDate = (dateObj) => {
    if (!dateObj) return;
    const timesArray = [];
    const today = new Date();
    const isToday = formatDate(today) === dateObj.formattedDate;

    // Standard business hours for slots (UC style)
    const slots = [
      "09:00 AM - 11:00 AM",
      "11:00 AM - 01:00 PM",
      "01:00 PM - 03:00 PM",
      "03:00 PM - 05:00 PM",
      "05:00 PM - 07:00 PM",
      "07:00 PM - 09:00 PM"
    ];

    if (isToday) {
      const currentHour = today.getHours();
      // Only show slots starting at least 2 hours from now
      const availableFrom = currentHour + 2;

      slots.forEach(slot => {
        // Split to get only the start time part (e.g., "11:00 AM")
        const startTimePart = slot.split(" - ")[0];
        const startHourText = startTimePart.split(":")[0];
        let startHour = parseInt(startHourText);

        const isPM = startTimePart.includes("PM") && startHour !== 12;
        const reflectsAM = startTimePart.includes("AM") && startHour === 12;

        const normalizedStart = isPM ? startHour + 12 : (reflectsAM ? 0 : startHour);

        if (normalizedStart >= availableFrom) {
          timesArray.push(slot);
        }
      });
    } else {
      timesArray.push(...slots);
    }

    setTimes(timesArray);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem("HommlieselectedDayTime");
        const hasStored = stored && stored !== "undefined" && JSON.parse(stored);
        if (hasStored) {
          const storedDate = new Date(hasStored.date.formattedDate);
          if (storedDate >= new Date().setHours(0, 0, 0, 0)) {
            setSelectedDate(hasStored.date);
            setSelectedTime(hasStored.time);
          }
        }
      } catch (e) { }
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedDate) {
      generateTimesForDate(selectedDate);
      // Automatically scroll to time slots
      setTimeout(() => {
        const section = document.getElementById('time-slot-section');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setTimes([]);
    }
  }, [selectedDate]);

  const handleProceed = async () => {
    if (!selectedDate || !selectedTime) {
      errorNotify("Please select both date and time before proceeding.");
      return;
    }

    if (slotFull) {
      errorNotify("All slots are full for the selected day.");
      return;
    }

    setIsLoading(true);
    const dayTime = { date: selectedDate, time: selectedTime };

    if (reSchedule && order_id) {
      await rescheduleOrder(dayTime);
    } else {
      setSelectedDayTime(dayTime);
      localStorage.setItem("HommlieselectedDayTime", JSON.stringify(dayTime));
      onClose();
    }
    setIsLoading(false);
  };

  const rescheduleOrder = async (dayTime) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (!jwtToken) return;

    try {
      const response = await axios.post(`${config.API_URL}/api/rescheduleorder`, {
        id: order_id,
        desired_time: dayTime.time,
        desired_date: dayTime.date.formattedDate,
      }, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.data.status === 1) {
        setRescheduleDayTime(dayTime);
        successNotify(response.data.message);
        onClose();
      } else {
        errorNotify(response.data.message);
      }
    } catch (err) {
      errorNotify("Something went wrong. Please try again.");
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = [];
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-10 w-full" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isSelected = selectedDate && selectedDate.formattedDate === formatDate(date);
      const isFull = d % 11 === 0;

      days.push(
        <div key={d} className="relative group/day w-full flex flex-col items-center">
          <button
            disabled={isPast}
            onClick={() => {
              const formattedDate = formatDate(date);
              setSelectedDate({
                day: date.toLocaleString('en-US', { weekday: 'long' }),
                date: d,
                month: date.toLocaleString('en-US', { month: 'short' }),
                year: year,
                formattedDate
              });
              setSelectedTime(null);
            }}
            className={`h-11 w-11 flex flex-col items-center justify-center rounded-xl text-sm font-bold transition-all
              ${isPast ? 'text-gray-200 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}
              ${isSelected ? 'bg-[#e7f9f3] text-[#00a871] border border-[#00a871] shadow-sm' : ''}
              ${isFull && !isPast ? 'opacity-50' : ''}
            `}
          >
            {d}
          </button>
          {isFull && !isPast && (
            <span className="absolute -bottom-1 text-[8px] font-bold text-gray-400 uppercase">Full</span>
          )}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    if (newMonth.getFullYear() > new Date().getFullYear() || (newMonth.getFullYear() === new Date().getFullYear() && newMonth.getMonth() >= new Date().getMonth())) {
      setCurrentMonth(newMonth);
    }
  };

  const firstCartItemName = cart?.[0]?.product_name || "Home Service";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative bg-[#f7f8fa] w-full max-w-[480px] rounded-[2.5rem] shadow-2xl z-[1100] overflow-hidden flex flex-col max-h-[92vh]"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-8 pb-4 text-center relative bg-white">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-[22px] font-bold text-gray-900 leading-tight">
                When would you like our experts to visit?
              </h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                Select your preferred date and time for your service appointment.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {/* Calendar Card */}
              <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 px-1">
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="font-bold text-gray-800 text-base">
                      {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <span key={day} className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-wider">
                      {day}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2 place-items-center">
                  {renderCalendar()}
                </div>

              </div>

              {/* Time Slots */}
              <div id="time-slot-section" className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm border border-gray-100">
                    <Clock className="w-4 h-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Select Preferred Time Slot</h3>
                    <p className="text-gray-400 text-[11px] font-bold">Choose your preferred time window</p>
                  </div>
                </div>

                {/* Next Available Today Banner */}
                {selectedDate && formatDate(new Date()) === selectedDate.formattedDate && times.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-sm mx-1">
                    <div className="bg-yellow-100 p-1.5 rounded-lg">
                      <Zap className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">Next Available Today: <span className="text-gray-900 font-black">{times[0]}</span></span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-1">
                  {selectedDate ? (
                    times.length > 0 ? times.map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3.5 px-4 text-sm font-bold rounded-xl transition-all border
                          ${selectedTime === time
                            ? 'bg-[#e7f9f3] text-[#00a871] border-[#00a871] shadow-sm'
                            : 'bg-white text-gray-700 border-gray-100 hover:border-gray-200'}
                        `}
                      >
                        {time}
                      </button>
                    )) : (
                      <div className="col-span-2 py-8 bg-white rounded-xl text-center text-gray-400 font-bold text-xs border border-gray-100">
                        No slots available for this day
                      </div>
                    )
                  ) : (
                    <div className="col-span-2 py-8 bg-white rounded-xl text-center text-gray-400 font-bold text-xs border border-gray-100">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Card */}
              {selectedDate && selectedTime && (
                <div className="bg-white rounded-[1.5rem] p-5 border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Your Appointment
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-500 font-medium">Date: <span className="text-gray-900 font-bold">{selectedDate.day}, {selectedDate.date} {selectedDate.month}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-500 font-medium">Time: <span className="text-gray-900 font-bold">{selectedTime}</span></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Zap className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-500 font-medium">Service: <span className="text-gray-900 font-bold">{firstCartItemName}</span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-8 bg-white border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleProceed}
                disabled={isLoading || !selectedDate || !selectedTime}
                className="w-full bg-[#345953] text-white py-4 rounded-2xl font-bold text-base shadow-xl disabled:opacity-40 disabled:grayscale transition-all flex items-center justify-center hover:bg-[#2a4843]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                ) : 'Confirm & Proceed Securely'}
              </motion.button>

              <div className="flex justify-between items-center mt-6 px-1">
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-2"
                >
                  ← Clear Selection
                </button>
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DateTimeModal;
