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
    <main className="bg-white min-h-screen text-gray-900 font-sans selection:bg-hommlie/10">
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
      <section className="relative pt-6 sm:pt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative rounded-[3rem] overflow-hidden bg-[#02513E] min-h-[500px] lg:min-h-[600px] flex flex-col justify-center">
            {/* Background Image with sophisticated overlay */}
            <div className="absolute inset-0">
              <img
                src={pageData?.landing_page?.hero_image}
                alt={pageData?.landing_page?.alt_tag}
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#02513E] via-[#02513E]/40 to-transparent" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center px-6 md:px-12 lg:px-20 py-16">
              {/* Hero Text Content */}
              <div className="md:col-span-12 lg:col-span-7 text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-green-300 text-xs font-bold uppercase tracking-widest mb-6">
                    Professional Care for Your Home
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tighter shadow-sm">
                    {displayText}
                  </h1>
                  <p className="text-lg md:text-xl text-green-50/80 font-medium leading-relaxed max-w-xl mb-10">
                    {pageData?.landing_page?.sub_title}
                  </p>

                  <div className="flex flex-wrap gap-5">
                    <button
                      onClick={scrollToForm}
                      className="group relative bg-white text-[#02513E] px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-3 active:scale-95"
                    >
                      <span>Book Free Quote</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>

                    <button className="px-10 py-5 rounded-full font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-lg">
                      Our Portfolio
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Desktop Form Section */}
              <div className="hidden lg:block lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <LandingPageForm />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Form: Moved below hero for better clarity on smaller screens */}
          <div className="mt-[-80px] px-4 md:mt-10 lg:hidden">
            <LandingPageForm />
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10 lg:mb-16">
            <span className="text-hommlie font-bold tracking-widest text-xs uppercase bg-green-50 px-3 py-1 rounded-full mb-4 inline-block">
              Premium Pest Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2">
              Our Professional Services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pageData?.subcategories
              ?.slice(0, showAllServices ? undefined : 4)
              ?.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-[2.5rem] p-4 border border-gray-100 hover:border-green-100 shadow-sm hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 flex flex-col"
                >
                  {/* Image with overlay */}
                  <div className="relative w-full h-60 rounded-[2rem] overflow-hidden mb-6">
                    <img
                      src={service.image_url}
                      alt={service.subcategory_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="px-2 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-hommlie transition-colors duration-300">
                      {service.subcategory_name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      {/* Rating badge */}
                      <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                        <span className="mr-1 text-sm">★</span>
                        {service.avg_rating || "New"}
                      </div>

                      {/* Price badge */}
                      <div className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                        From ₹{Number(service.starting_price ?? 0).toFixed(0)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleServiceClick(service.slug, service.id)}
                      className="mt-auto w-full py-4 text-[#02513E] font-bold rounded-2xl bg-gray-50 group-hover:bg-[#02513E] group-hover:text-white transition-all duration-300 shadow-sm"
                    >
                      Book Free Inspection
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="px-10 py-4 border-2 border-[#02513E] text-[#02513E] rounded-full font-bold hover:bg-[#02513E] hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-900/10"
            >
              {showAllServices ? "Show Less" : "View All Services"}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="text-hommlie font-bold tracking-widest text-xs uppercase bg-green-100/50 px-3 py-1 rounded-full mb-4 inline-block">
              Why Hommlie?
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {pageData?.landing_page?.why_choose_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-green-500/5 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              <img
                src={pageData?.landing_page?.why_choose_banner}
                alt={pageData?.landing_page?.why_choose_title}
                className="relative rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover"
              />
            </motion.div>

            <div className="grid gap-8 sm:gap-10">
              {pageData?.landing_page?.why_choose_content?.map(
                (feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-xl font-bold text-hommlie group-hover:bg-hommlie group-hover:text-white transition-all duration-300">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed font-medium">
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
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div
            className="relative rounded-[3rem] overflow-hidden py-16 px-8 md:px-20 text-center md:text-left"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(2, 81, 62, 0.95), rgba(2, 81, 62, 0.8)), url(${pageData?.landing_page?.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Ready to reclaim your space from pests?
              </h2>
              <p className="text-green-50/90 text-lg md:text-xl mb-10 font-medium">
                Schedule your professional inspection today and get a custom treatment plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="bg-white text-hommlie px-10 py-5 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-xl"
                >
                  Book Free Inspection
                </button>
                <a
                  href="tel:+911234567890"
                  className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                >
                  Call Support
                </a>
              </div>
            </div>
            {/* Abstract Shape Overlay */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Bottom Sections Spacing */}
      <div className="pb-20 space-y-24">
        <section id="contact-form">
          <InspectionFormSection />
        </section>

        <section>
          <PopularCategorySection data={pageData?.all_categories} />
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
