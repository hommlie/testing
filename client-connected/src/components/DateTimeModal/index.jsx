import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import 'react-phone-input-2/lib/style.css';
import { useCont } from '../../context/MyContext';
import axios from 'axios';
import config from '../../config/config';
import { useToast } from '../../context/ToastProvider';

const DateTimeModal = ({ isOpen, onClose, startDate, startTime, reSchedule, order_id, order_type }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setSelectedDayTime, setRescheduleDayTime } = useCont();

    const notify = useToast();
    const successNotify = (success) => notify(success, 'success');
    const errorNotify = (error) => notify(error, 'error');
    const warningNotify = (warning) => notify(warning, 'warning');

    const generateTimesForDate = (selectedDate) => {
        const timesArray = [];
        const today = new Date();

        let currentHour, currentMinutes;
        if (startTime) {
            const [time, modifier] = startTime.split(' ');
            let [hours, minutes] = time.split(':');
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);
            if (modifier === 'PM' && hours < 12) {
                hours += 12;
            }
            if (modifier === 'AM' && hours === 12) {
                hours = 0;
            }
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

        const todayDate = today.getDate();
        if (selectedDate.date === todayDate) {
            if (currentTime < 9 * 60) {
                for (let hour = 9; hour < 20; hour += 1) {
                    addTimeSlot(hour, 0);
                }
            } else if (currentTime >= 9 * 60 && currentTime < 20 * 60) {
                let nextHour = currentHour + 1;
                while (nextHour < 18) {
                    addTimeSlot(nextHour, 0);
                    nextHour += 1;
                }
            } else {
                for (let hour = 9; hour < 20; hour += 1) {
                    addTimeSlot(hour, 0);
                }
            }
        } else {
            for (let hour = 9; hour < 20; hour += 1) {
                addTimeSlot(hour, 0);
            }
        }

        setTimes(timesArray);
        if (timesArray.length > 0) {
            setSelectedTime(startTime ? startTime : timesArray[0]);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const generateDates = () => {
            const datesArray = [];
            const today = new Date();
            let startDay = startDate ? 
                new Date(startDate) : 
                new Date(today.setDate(order_type === "AMC" ? today.getDate() + 1 : today.getDate()));

            for (let i = 0; i < 5; i++) {
                const nextDate = new Date(startDay);
                nextDate.setDate(startDay.getDate() + i);
                const day = nextDate.toLocaleString('en-US', { weekday: 'short' });
                const date = nextDate.getDate();
                const formattedDate = formatDate(nextDate);
                datesArray.push({ day, date, formattedDate });
            }
            setDates(datesArray);
            if (datesArray.length > 0) {
                const initialDate = datesArray[0];
                setSelectedDate(initialDate);
                generateTimesForDate(initialDate);
            }
        };

        generateDates();
    }, [startDate, startTime]);

    function formatDateString(dateString) {
        const date = new Date(dateString);
        const options = {
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          timeZoneName: 'short'
        };
      
        return date.toLocaleString('en-US', options);
      }

    useEffect(() => {
        if (selectedDate) {
            generateTimesForDate(selectedDate);
        }
    }, [selectedDate]);

    if (!isOpen) return null;

    const handleProceed = async() => {
        setIsLoading(true);
        const dayTime = {
            date: selectedDate,
            time: selectedTime,
        };
        if (reSchedule && order_id) {
            await rescheduleOrder()
        } else {
            setSelectedDayTime(dayTime);
            onClose();
        }
        setIsLoading(false);
    };

    async function rescheduleOrder() {
        setIsLoading(true);
        const dayTime = {
            date: selectedDate,
            time: selectedTime,
        };
        const jwtToken = Cookies.get("HommlieUserjwtToken");
        if (jwtToken) {
            await axios.post(`${config.API_URL}/api/rescheduleorder`, 
            {
                id: order_id,
                desired_time: selectedTime,
                desired_date: selectedDate.formattedDate,
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 1) {
                    setRescheduleDayTime(dayTime);
                    console.log(response.data.message);
                    successNotify(response.data.message);
                    onClose();
                } else if (response.data.status === 0) {
                    errorNotify(response.data.message);
                }
            })
            .catch((err) => {
                errorNotify(err);
                console.log("error: " + err);
            })
        } else {
            console.log("User hasn't logged in");
        }
        setIsLoading(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 opacity-60" style={{ backgroundColor: "black" }} onClick={onClose}></div>
            <div className="relative bg-white w-[80%] md:w-full max-w-[24rem] max-h-[40rem] overflow-y-scroll p-4 md:p-8 md:px-12 rounded-2xl shadow-lg overflow-hidden z-30 space-y-4 scrollbar-hide">
                <h2 className='text-lg font-bold'>Select Date & Time for the appointment</h2>
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold'>When would you like your service?</h3>
                    <div className='flex flex-row justify-around gap-2 w-72'>
                        {
                            dates.map((dt, index) => (
                                <div 
                                    key={index} 
                                    className={`w-12 h-12 flex flex-col justify-center items-center p-2 rounded border cursor-pointer`}
                                    style={{color: `${selectedDate && selectedDate.date === dt.date ? '#249370' : ''}`, border: `1px solid ${selectedDate && selectedDate.date === dt.date ? '#249370' : '#C7C9D9'}`}}
                                    onClick={() => setSelectedDate(dt)}
                                >
                                    <span className='text-sm'>{dt.day}</span>
                                    <span className='font-bold'>{dt.date}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold'>At what time?</h3>
                    <div className='flex flex-wrap justify-around gap-2 w-72'>
                        {
                            times.map((time, index) => (
                                <div 
                                    key={index} 
                                    className={`w-[135px] h-[39px] flex flex-row justify-center items-center p-2 rounded border cursor-pointer`}
                                    style={{color: `${selectedTime === time ? '#249370' : ''}`, border: `1px solid ${selectedTime === time ? '#249370' : '#C7C9D9'}`}}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    <span className='text-sm'>{time}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button 
                        style={{ backgroundColor: "#249370" }} 
                        className={`block mt-4 px-8 py-2 text-xs text-center text-white tracking-widest disabled:opacity-60 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={handleProceed}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                <span className="ml-2">Loading...</span>
                            </div>
                        ) : (
                            'PROCEED'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateTimeModal;
