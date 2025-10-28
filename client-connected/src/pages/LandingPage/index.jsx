import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import config from "../../config/config";
import StatsSection from "../../components/StatsSection";
import PopularCategorySection from "../../components/PopularCategorySection";
import InspectionFormSection from "../../components/InspectionFormSection";
import { Helmet } from "react-helmet-async";
import LandingPageForm from "../LandingPageForm/LandingPageForm";

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
    navigate(`/subcategory/${slug}`);
  };

  if (loading && !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
      </div>
    );
  }

  // ✅ Canonical URL dynamically generate with correct format
  const canonicalUrl = `https://www.hommlie.com/service/${slug}`;

  return (
    <main
    className="container mx-auto px-3 sm:px-5 lg:px-6 max-w-7xl font-sans space-y-16 sm:space-y-20"
      style={{
        background:
          "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
      }}
    >
      <Helmet>
        <title>{pageData?.landing_page?.meta_title}</title>
        <meta
          name="description"
          content={pageData?.landing_page?.meta_description}
        />
        {/* ✅ Correct canonical with key to force override */}
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Helmet>

     
      {/* Hero Section */}
<section className="relative px-3 sm:px-6 lg:px-8 -mt-0 sm:-mt-16">
  <div className="relative w-full max-w-7xl mx-auto">
    {/* Image */}
    <img
      src={pageData?.landing_page?.hero_image}
      alt={pageData?.landing_page?.alt_tag}
      className="w-full h-52 sm:h-auto object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[500px] rounded-lg sm:mt-0 mt-2"
    />

    {/* === Desktop: Form Overlay === */}
    <div className="absolute top-1/2 right-4 sm:right-8 transform -translate-y-1/2 hidden md:block w-80 lg:w-96 z-10">
      <LandingPageForm />
    </div>

    {/* === Mobile: Stack layout === */}
    <div className="mt-4 flex flex-col space-y-6  md:hidden">
      {/* Form */}
      <LandingPageForm />

      {/* Text Content */}
      <div className="w-full text-left">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          {displayText}
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 mb-5">
          {pageData?.landing_page?.sub_title}
        </p>
        <button
          onClick={scrollToForm}
          className="bg-hommlie text-white px-5 sm:px-8 py-2.5 rounded-md hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base"
        >
          Book Now
        </button>
      </div>
    </div>

    {/* === Desktop: Text Content (below image + form) === */}
    <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8 md:static md:mt-8 hidden md:block text-left md:text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
        {displayText}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
        {pageData?.landing_page?.sub_title}
      </p>
      <button
        onClick={scrollToForm}
        className="bg-hommlie text-white px-6 sm:px-8 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base md:text-lg"
      >
        Book Now
      </button>
    </div>
  </div>
</section>


      {/* Services Section */}
      <section className="px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <p className="text-hommlie font-semibold text-sm sm:text-base">
              SERVICES
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our Services
            </h2>
          </div>
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
  {pageData?.subcategories
    ?.slice(0, showAllServices ? undefined : 4)
    ?.map((service) => (
      <div
        key={service.id}
        className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
      >
        {/* Image with overlay */}
        <div className="relative w-full h-52 sm:h-44 lg:h-52 overflow-hidden">
          <img
            src={service.image_url}
            alt={service.subcategory_name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {service.subcategory_name}
          </h3>

          <div className="flex items-center mb-4 space-x-3">
            {/* Rating badge */}
            <div className="flex items-center bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-medium">
              <span className="mr-1">★</span>
              {service.avg_rating || "New"}
            </div>

            {/* Price badge */}
            <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
              From ₹{Number(service.starting_price ?? 0).toFixed(2)}/service
            </div>
          </div>

          <button
            onClick={() => handleServiceClick(service.slug, service.id)}
            className="mt-auto w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-hommlie to-yellow-500 hover:from-yellow-500 hover:to-hommlie transition-all duration-300 shadow-md"
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
              className="px-4 border border-hommlie text-hommlie py-2 rounded hover:bg-hommlie hover:text-white transition-colors duration-300 text-sm sm:text-base"
            >
              {showAllServices ? "Show Less" : "View All"}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              {pageData?.landing_page?.why_choose_title}
            </h2>
            <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-base">
              {pageData?.landing_page?.why_choose_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={pageData?.landing_page?.why_choose_banner}
                alt={pageData?.landing_page?.why_choose_title}
                className="rounded-lg shadow-xl w-full h-56 sm:h-72 md:h-96 object-cover"
              />
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              {pageData?.landing_page?.why_choose_content?.map(
                (feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex gap-4 sm:gap-6 pb-2 border-b last:border-none"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-4xl font-light text-gray-300">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-hommlie mb-1 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
        className="bg-hommlie-gradient px-3 sm:px-6 lg:px-8 rounded-lg"
        style={{
          backgroundImage: `url(${pageData?.landing_page?.banner})`,
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
        <div className="max-w-6xl mx-auto py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Schedule Your Inspection Today!
              </h2>
              <p className="text-white opacity-90 text-sm sm:text-base mb-5 sm:mb-6">
                Fill out the form below to book your inspection and reclaim your
                space.
              </p>
              <button
                onClick={scrollToForm}
                className="bg-white text-green-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Form Section */}
      <section id="contact-form" className="px-3 sm:px-6 lg:px-8">
        <InspectionFormSection />
      </section>

      {/* Stats Section */}
      <section className="px-3 sm:px-6 lg:px-8">
        <StatsSection />
      </section>

      {/* Popular Categories Section with Tabs */}
      <section className="px-3 sm:px-6 lg:px-8">
        <PopularCategorySection data={pageData?.all_categories} />
      </section>
    </main>
  );
};

export default LandingPage;
