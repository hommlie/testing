import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const SEOPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${config.API_URL}/api/seopage/getPageBySlug/${slug}`
        );
        setPageData(response.data.data);

        // Update meta tags
        document.title = response.data.data.meta_title;
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            response.data.data.meta_description
          );
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
    <main className="min-h-screen bg-gray-50">
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
        className="container mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 md:p-8 lg:p-10">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.description }}
              />
            </div>
          </motion.div>

          {/* Additional Content Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid md:grid-cols-2 gap-6 mt-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {pageData.description
                  .split(".")
                  .slice(0, 4)
                  .map(
                    (point, index) =>
                      point.trim() && (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{point.trim()}</span>
                        </li>
                      )
                  )}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Overview</h3>
              <p className="text-gray-100">{pageData.meta_description}</p>
              <button className="mt-6 px-6 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have already taken the
            first step towards their goals.
          </p>
          <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors">
            Contact Us Now
          </button>
        </div>
      </motion.section>
    </main>
  );
};

export default SEOPage;
