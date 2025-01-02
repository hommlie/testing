import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = new Date(2025, 0, 1); // January 1st, 2025
      const endDate = new Date(startDate.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days from start
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Calculate initially
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Function to format numbers as two digits
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0').split('');
  };

  // Digit display component
  const DigitDisplay = ({ value }) => (
    <div className="flex gap-2">
      {formatNumber(value).map((digit, index) => (
        <div
          key={index}
          className="w-8 h-12 bg-gradient-to-b from-[#D9EFDE] to-[#D9EFDE1A] rounded flex items-center justify-center text-xl font-mono"
        >
          {digit}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-around p-6 bg-white border rounded-lg shadow-sm">
        <div className="text-center">
          <DigitDisplay value={timeLeft.days} />
          <p className="mt-2 text-sm text-gray-600">Days</p>
        </div>
        
        <div className="text-center">
          <DigitDisplay value={timeLeft.hours} />
          <p className="mt-2 text-sm text-gray-600">Hours</p>
        </div>
        
        <div className="text-center">
          <DigitDisplay value={timeLeft.minutes} />
          <p className="mt-2 text-sm text-gray-600">Minutes</p>
        </div>

        <div className="text-center">
          <DigitDisplay value={timeLeft.seconds} />
          <p className="mt-2 text-sm text-gray-600">Seconds</p>
        </div>
      </div>
      <p className="text-center mt-4 text-xl font-semibold">Coming Soon</p>
    </div>
  );
};

export default CountdownTimer;