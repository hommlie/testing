import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, X, ChevronDown } from 'lucide-react';

const DateTimeModal = ({ isOpen, onClose, startDate, startTime, reSchedule, order_id, order_type, slotFull, autoSelect = true }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const { setSelectedDayTime, setRescheduleDayTime } = useCont();
  const timeSectionRef = useRef(null);

  const notify = useToast();
  const successNotify = (msg) => notify(msg, 'success');
  const errorNotify = (msg) => notify(msg, 'error');

  const generateTimesForDate = (dateObj) => {
    if (!dateObj) return;
    const timesArray = [];
    const today = new Date();
    const isToday = formatDate(today) === dateObj.formattedDate;

    let currentHour, currentMinutes;
    if (startTime) {
      const [time, modifier] = startTime.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      currentHour = hours;
      currentMinutes = minutes;
    } else {
      currentHour = today.getHours();
      currentMinutes = today.getMinutes();
    }

    const currentTime = currentHour * 60 + currentMinutes;

    const addTimeSlot = (hour, minute) => {
      const timeSlot = new Date();
      timeSlot.setHours(hour);
      timeSlot.setMinutes(minute);
      timesArray.push(timeSlot.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };

    if (isToday) {
      if (currentTime < 9 * 60) {
        for (let hour = 9; hour < 20; hour++) addTimeSlot(hour, 0);
      } else if (currentTime >= 9 * 60 && currentTime < 20 * 60) {
        let nextHour = currentHour + 1;
        while (nextHour < 20) {
          addTimeSlot(nextHour, 0);
          nextHour++;
        }
      }
    } else {
      for (let hour = 9; hour < 20; hour++) addTimeSlot(hour, 0);
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
          // Initialize with stored date if valid for current context
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
      // Auto-scroll to time selection
      setTimeout(() => {
        timeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      alert("All slots are full for the next few days. We will add more slots soon. Please check back later.");
      onClose();
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

  // Calendar Helpers
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

    // Padding for start of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-10 w-10 text-gray-200" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isSelected = selectedDate && selectedDate.formattedDate === formatDate(date);

      days.push(
        <motion.button
          key={d}
          whileHover={!isPast ? { scale: 1.1 } : {}}
          whileTap={!isPast ? { scale: 0.95 } : {}}
          disabled={isPast}
          onClick={() => {
            const formattedDate = formatDate(date);
            setSelectedDate({
              day: date.toLocaleString('en-US', { weekday: 'short' }),
              date: d,
              month: date.toLocaleString('en-US', { month: 'long' }),
              formattedDate
            });
            setSelectedTime(null);
            setIsTimeDropdownOpen(true);
          }}
          className={`h-11 w-11 flex items-center justify-center rounded-xl text-sm font-semibold transition-all
            ${isPast ? 'text-gray-200 cursor-not-allowed' : 'text-gray-700 hover:bg-[#0463ac]/10 hover:text-[#0463ac]'}
            ${isSelected ? 'bg-[#0463ac] text-white hover:bg-[#0463ac] hover:text-white shadow-lg shadow-[#0463ac]/20' : ''}
          `}
        >
          {d}
        </motion.button>
      );
    }

    return days;
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    if (newMonth.getMonth() >= new Date().getMonth() || newMonth.getFullYear() > new Date().getFullYear()) {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white w-full max-w-[400px] rounded-[2rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] z-[110] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#0463ac] to-[#034a81] text-white shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/15 rounded-xl">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Select Slot</h2>
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Choose date & time</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
              {/* Calendar Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">
                    {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => changeMonth(1)}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <span key={day} className="text-[10px] font-black uppercase tracking-widest text-gray-400 py-3">
                      {day}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 place-items-center">
                  {renderCalendar()}
                </div>
              </div>

              {/* Time Section */}
              <div ref={timeSectionRef} className="space-y-4 pt-6 border-t border-gray-50">
                <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0463ac]" />
                  Preferred Time
                </h3>

                <div className="relative">
                  <button
                    disabled={!selectedDate}
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all 
                      ${!selectedDate ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-50' : 'bg-white border-gray-100 hover:border-[#0463ac]/20 active:scale-[0.99]'}
                      ${isTimeDropdownOpen ? 'border-[#0463ac] shadow-sm' : ''}
                      ${selectedTime ? 'bg-[#0463ac]/5 border-[#0463ac]/10' : ''}
                    `}
                  >
                    <span className={`font-bold text-sm ${selectedTime ? 'text-[#0463ac]' : 'text-gray-400'}`}>
                      {selectedTime || (selectedDate ? "Select time slot" : "Pick a date first")}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTimeDropdownOpen ? 'rotate-180 text-[#0463ac]' : 'text-gray-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isTimeDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-[120] max-h-48 overflow-y-auto p-2 custom-scrollbar"
                      >
                        <div className="grid grid-cols-2 gap-1.5">
                          {times.length > 0 ? times.map((time, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSelectedTime(time);
                                setIsTimeDropdownOpen(false);
                              }}
                              className={`p-3 text-[13px] font-bold rounded-lg transition-all
                                ${selectedTime === time
                                  ? 'bg-[#0463ac] text-white shadow-sm'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#0463ac]'}
                              `}
                            >
                              {time}
                            </button>
                          )) : (
                            <div className="col-span-2 p-6 text-center text-gray-400 font-medium text-xs">
                              No slots available
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-50 bg-gray-50/20 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setSelectedDayTime(null);
                  localStorage.removeItem("HommlieselectedDayTime");
                }}
                className="text-[11px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                Reset
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                disabled={isLoading || !selectedDate || !selectedTime}
                className="bg-[#0463ac] text-white px-10 py-4 rounded-xl font-black text-[11px] tracking-[0.1em] shadow-lg shadow-[#0463ac]/20 disabled:opacity-30 disabled:shadow-none transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>LOADING...</span>
                  </div>
                ) : 'PROCEED'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DateTimeModal;
