import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "../../components/CountDownTimer";

export default function CommunitySoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && email.includes("@")) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const features = [
    {
      title: "Community Posts",
      description:
        "Share your home improvement experiences and tips with others",
    },
    {
      title: "Service Reviews",
      description: "View and leave authentic reviews for service providers",
    },
    {
      title: "DIY Guides",
      description:
        "Access community-created guides for simple home maintenance",
    },
    {
      title: "Q&A Forum",
      description: "Get your home maintenance questions answered by experts",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center text-[#035240] bg-[#C4DBC9] px-4 py-2 rounded-full mb-6">
            <span className="mr-2">🚀</span>
            Exciting New Feature Coming Soon
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Hommlie Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with homeowners and service providers across India to share
            experiences, tips, and discover better ways to maintain your home.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#035240] text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mockup Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 bg-[#035240] rounded-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Preview Our Community
              </h2>
              <p className="text-green-100 mb-6">
                Hommlie Community is designed to connect homeowners with
                reliable service providers and empower them with knowledge and
                support for all their home maintenance needs.
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-white text-sm">
                  "I found an amazing pest control service through Hommlie's
                  community recommendations. The forum helped me understand
                  exactly what I needed!"
                </p>
                <p className="text-green-100 text-sm mt-2">
                  - Future Community Member
                </p>
              </div>
              <ul className="text-green-100 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Connect with verified service providers
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Share before and after project photos
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Get advice on home maintenance issues
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-4 flex items-center justify-center">
              <div className="w-full max-w-sm border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="h-12 bg-[#035240] flex items-center px-4">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-3">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded mt-1"></div>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Form */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Be the First to Know</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified when we launch the Hommlie Community
            feature.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 sm:gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg sm:rounded-l-lg sm:rounded-r-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#035240] text-white rounded-r-lg rounded-l-lg sm:rounded-l-none hover:bg-emerald-700 transition-colors duration-300"
            >
              Notify Me
            </button>
          </form>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-2 text-center text-green-800 bg-green-100 rounded-lg"
            >
              Thanks! You'll be notified when we launch.
            </motion.div>
          )}

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </motion.div> */}
      </div>
    </div>
  );
}
