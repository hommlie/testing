import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import WhyChooseBg from "../../assets/bg/why-choose-img.jpg";
import ScheduleImg from "../../assets/bg/schedule-img.svg";
import Customers from "../../assets/icons/customer.svg";
import Reviews from "../../assets/icons/reviews.svg";
import Cities from "../../assets/icons/cities.svg";
import Warranty from "../../assets/icons/warranty.svg";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import config from "../../config/config";

// Static data for other sections
const staticData = {
  features: [
    {
      id: 1,
      title: "24/7 SERVICE",
      description:
        "Pests Don't Wait, And Neither Do We! Whether It's A Sudden Infestation Or An Urgent Pest Issue, Our Emergency Response Team Is Available 24/7 To Assist You.",
    },
    {
      id: 2,
      title: "ECO-FRIENDLY & SAFE SOLUTIONS",
      description:
        "We Prioritize The Safety Of Your Family, Pets, And The Environment By Using Non-Toxic, Eco-Friendly Pest.",
    },
    {
      id: 3,
      title: "CERTIFIED & EXPERIENCED TECHNICIANS",
      description:
        "Our Team Consists Of Licensed And Highly Trained Pest Control Professionals With Years Of Experience In Handling All Types Of Pests.",
    },
  ],
  stats: [
    {
      id: 1,
      count: "10 Lacs+",
      title: "Happy Customers",
      description: "Happy Customers",
      icon: Customers,
    },
    {
      id: 2,
      count: "04/05",
      title: "400+ Reviews on Google",
      description: "400+ Reviews on Google",
      icon: Reviews,
    },
    {
      id: 3,
      count: "30+ Cities",
      title: "Presence Across India",
      description: "Presence Across India",
      icon: Cities,
    },
    {
      id: 4,
      count: "Warranty",
      title: "Warranty Backed Service",
      description: "Warranty Backed Service",
      icon: Warranty,
    },
  ],
};

const useTypewriter = (text = "", speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTypingComplete(false);
  }, [text]);

  useEffect(() => {
    if (!text || currentIndex >= text.length) {
      setIsTypingComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [text, currentIndex, speed]);

  return { displayText, isTypingComplete };
};

const LandingPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const { displayText } = useTypewriter(pageData?.landing_page?.title || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/landing/getPageBySlug/${slug}`
        );
        if (response.data.status === 1) {
          setPageData(response.data.data);
          // Set initial active category
          if (response.data.data.all_categories?.length > 0) {
            setActiveCategory(response.data.data.all_categories[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceClick = (slug, id) => {
    navigate(`/subcategory/${slug}/${id}`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };

  if (loading && !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  const activeTabContent = pageData?.all_categories?.find(
    (category) => category.id === activeCategory
  );

  return (
    <main className="min-h-screen max-w-7xl font-poppins space-y-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {displayText}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {pageData?.landing_page?.sub_title}
              </p>
              <button
                onClick={scrollToForm}
                className="bg-hommlie text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src={pageData?.landing_page?.hero_image}
                alt={pageData?.landing_page?.alt_tag}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <p className="text-hommlie font-semibold">SERVICES</p>
          </div>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Pest Control Services
            </h2>
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="px-4 border border-hommlie text-hommlie py-2 rounded hover:bg-hommlie hover:text-white transition-colors duration-300"
            >
              {showAllServices ? "Show Less" : "View All"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData?.subcategories
              ?.slice(0, showAllServices ? undefined : 3)
              ?.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={service.image_url}
                    alt={service.subcategory_name}
                    className="w-full h-auto"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.subcategory_name}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-600">
                          {service.avg_rating || "New"}
                        </span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-gray-600">
                        {service.subcategory_sub_title}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleServiceClick(service.slug, service.id)
                      }
                      className="px-4 border border-hommlie text-hommlie py-2 rounded hover:bg-hommlie hover:text-white transition-colors duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose Us
            </h2>
            <p className="mt-4 text-gray-600">
              Experience the Best Pest Control Service with Our Expert Team!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={WhyChooseBg}
                alt="Pest control technician"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </motion.div>

            <div className="space-y-8">
              {staticData?.features?.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <span className="text-4xl font-light text-gray-300">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hommlie mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="bg-hommlie-gradient px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Schedule Your Pest Control Today!
              </h2>
              <p className="text-white opacity-90 mb-6">
                Fill out the form below to book your pest control service and
                reclaim your space.
              </p>
              <button
                onClick={scrollToForm}
                className="bg-white text-green-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <img
                src={ScheduleImg}
                alt="Pest Control Professional"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-hommlie font-semibold mb-4">INSPECTION</p>
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-8">We're here to help you!</p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full text-hommlie flex items-center justify-center mr-4">
                    <MdOutlineLocalPostOffice />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">info@pestcontrol.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full text-hommlie flex items-center justify-center mr-4">
                    <IoCallOutline />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full text-hommlie flex items-center justify-center mr-4">
                    <IoLocationOutline />
                  </div>
                  <div className="max-w-sm">
                    <p className="text-sm text-gray-600">Office</p>
                    <p className="font-medium">
                      57 2nd floor, Place building, 6th Main Rd, Nagendra Block,
                      Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka
                      560050
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border glow-border rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4">Book an Inspection</h2>
              <p className="text-gray-600 mb-8">
                Our friendly team would love to hear from you.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-hommlie text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
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
                      Sending...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>

              {submitted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-400 text-green-700 rounded-md">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {staticData.stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-gray-50 rounded-full">
                    <img src={stat.icon} alt={stat.title} className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.count}
                  </h3>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Section with Tabs */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>

          {/* Category Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex overflow-x-auto space-x-4">
              {pageData?.all_categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeCategory === category.id
                      ? "border-b-2 border-hommlie text-hommlie"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTabContent?.subcategories?.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => handleServiceClick(subcat.slug, subcat.id)}
                className="p-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {subcat.subcategory_name}
                </h3>
                <p className="text-sm text-gray-500">
                  Click to view service details
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
