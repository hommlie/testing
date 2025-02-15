import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WhyChooseBg from "../../assets/bg/why-choose-img.jpg";
import ScheduleImg from "../../assets/bg/schedule-img.svg";
import axios from "axios";
import config from "../../config/config";
import StatsSection from "../../components/StatsSection";
import PopularCategorySection from "../../components/PopularCategorySection";
import InspectionFormSection from "../../components/InspectionFormSection";

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
  const [showAllServices, setShowAllServices] = useState(false);
  const [loading, setLoading] = useState(true);
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
    if (formElement) {
      const offset = 180;
      const elementPosition =
        formElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleServiceClick = (slug, id) => {
    navigate(`/subcategory/${slug}/${id}`);
  };

  if (loading && !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-5 lg:px-6 max-w-7xl font-poppins space-y-20">
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
          </div>
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {pageData?.subcategories
              ?.slice(0, showAllServices ? undefined : 4)
              ?.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={service.image_url}
                    alt={service.subcategory_name}
                    className="w-full h-auto object-cover"
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
                        From ₹{service.starting_price}/service
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
          <div className="w-full flex justify-center">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="px-4 border border-hommlie text-hommlie py-2 rounded hover:bg-hommlie hover:text-white transition-colors duration-300"
            >
              {showAllServices ? "Show Less" : "View All"}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {pageData?.landing_page?.why_choose_title}
            </h2>
            <p className="mt-4 text-gray-600">
              {pageData?.landing_page?.why_choose_subtitle}
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
                src={pageData?.landing_page?.why_choose_banner}
                alt="Pest control technician"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </motion.div>

            <div className="space-y-8">
              {pageData?.landing_page?.why_choose_content?.map(
                (feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex gap-6 pb-2 border-b last:border-none"
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
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section
        className="bg-hommlie-gradient px-4 sm:px-6 lg:px-8 rounded-lg"
        style={{
          backgroundImage: `url(${
            pageData?.landing_page?.banner || ScheduleImg
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "multiply",
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="max-w-6xl mx-auto py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Schedule Your Inspection Today!
              </h2>
              <p className="text-white opacity-90 mb-6">
                Fill out the form below to book your inspection and reclaim your
                space.
              </p>
              <button
                onClick={scrollToForm}
                className="bg-white text-green-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Form Section */}
      <section id="contact-form" className="px-4 sm:px-6 lg:px-8">
        <InspectionFormSection />
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <StatsSection />
      </section>

      {/* Popular Categories Section with Tabs */}
      <section className="px-4 sm:px-6 lg:px-8">
        <PopularCategorySection data={pageData?.all_categories} />
      </section>
    </main>
  );
};

export default LandingPage;
