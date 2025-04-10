import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";
import { FaCartPlus } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import InspectionModal from "../../components/InspectionModal";
import ServiceSelector from "./ServiceSelector";
import InspectionForm from "./ServiceForm";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const SEOPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPageData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${config.API_URL}/api/seopage/getPageBySlug/${slug}`
        );
        if (response.data?.status === 1) {
          setPageData(response.data?.data?.pageData);
          setServices(response.data?.data?.services);

          // Update meta tags
          document.title = response.data?.data?.pageData?.meta_title;
          const metaDescription = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescription) {
            metaDescription.setAttribute(
              "content",
              response.data?.data?.pageData?.meta_description
            );
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        className="relative h-[50vh] min-h-[400px] w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={pageData.banner_url}
            alt={pageData.alt_tag}
            title={pageData.image_title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {pageData.title}
            </motion.h1>
            {pageData.sub_title && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-200"
              >
                {pageData.sub_title}
              </motion.p>
            )}
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <div className="flex flex-col-reverse md:flex-row  gap-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full md:w-3/5 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 md:p-8 lg:p-10">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.description }}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full md:w-2/5"
          >
            <ServiceSelector
              services={services}
              onCallClick={() => setIsInspectionModalOpen(true)}
            />
            {/* <InspectionForm /> */}
          </motion.div>
        </div>
      </motion.section>

      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
      />
    </main>
  );
};

export default SEOPage;
