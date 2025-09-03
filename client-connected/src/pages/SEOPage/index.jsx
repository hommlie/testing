// src/pages/seo/SEOPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import ServiceSelector from "./ServiceSelector";
import InspectionModal from "../../components/InspectionModal";

const SEOPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [services, setServices] = useState([]);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${config.API_URL}/api/seopage/getPageBySlug/${slug}`)
      .then((res) => {
        if (res?.data?.status === 1) {
          setPageData(res.data?.data?.pageData || {});
          setServices(res.data?.data?.services || []);
        }
      })
      .catch(() => {
        setPageData(null);
      });
  }, [slug]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section
        className="
          sm:ml-8
          relative 
          w-full lg:w-[196vh] 
          h-52 sm:h-64 md:h-80 lg:h-[50vh] 
          rounded-xl overflow-hidden
        "
      >
        <img
          src={pageData?.banner_url || "/og/fallback-hero.jpg"}
          alt={pageData?.alt_tag || "Hommlie Services"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-4 sm:px-6">
          <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-2">
            {pageData?.title || "Hommlie Services"}
          </h1>
          {pageData?.sub_title && (
            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl">
              {pageData.sub_title}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section
        className="
          sm:ml-8
          sm:mr-10
          grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 
          mt-6 sm:mt-8 
          px-0 sm:px-6 lg:px-0
        "
      >
        {/* Sidebar first on mobile, second on desktop */}
        <aside className="lg:col-span-2 space-y-6 order-1 lg:order-2">
          <ServiceSelector
            services={services}
            onCallClick={() => setIsInspectionModalOpen(true)}
          />

          {/* Mobile CTA */}
          <div className="block lg:hidden bg-white shadow-md rounded-xl p-4">
            <p className="text-sm text-gray-700">Prefer talking to an expert?</p>
            <button
              onClick={() => setIsInspectionModalOpen(true)}
              className="mt-3 w-full h-11 bg-black text-white rounded-lg font-medium"
            >
              Book Free Inspection
            </button>
          </div>
        </aside>

        {/* Main Content comes after sidebar on mobile */}
        <article className="lg:col-span-3 bg-white shadow-md rounded-xl p-4 sm:p-6 order-2 lg:order-1">
          {pageData?.description ? (
            <div
              className="
                prose max-w-none 
                prose-headings:text-lg sm:prose-headings:text-xl 
                prose-p:text-gray-700 prose-p:text-sm sm:prose-p:text-base
              "
              dangerouslySetInnerHTML={{ __html: pageData.description }}
            />
          ) : (
            <p className="text-gray-600">Details for this page are coming soon.</p>
          )}
        </article>
      </section>

      {/* Modal */}
      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
      />
    </main>
  );
};

export default SEOPage;
