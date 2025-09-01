import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import config from "../../config/config";
import Loading from "../../components/Loading";
import InspectionModal from "../../components/InspectionModal";
import ServiceSelector from "./ServiceSelector";
import { Helmet } from "react-helmet-async";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Lightweight skeleton for first paint on mobile
const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-56 sm:h-64 md:h-80 w-full rounded-xl bg-gray-200" />
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-3 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-200 rounded w-3/6" />
      </div>
      <div className="lg:col-span-2 space-y-3">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const SEOPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);

  // Derived / safe fallbacks
  const title = pageData?.meta_title || pageData?.title || "Hommlie Services";
  const description =
    pageData?.meta_description ||
    "Book professional pest control & home services with Hommlie.";
  const heroImage = pageData?.banner_url || "/og/fallback-hero.jpg";
  const heroAlt = pageData?.alt_tag || pageData?.title || "Hommlie banner";
  const imageTitle = pageData?.image_title || pageData?.title || "Hommlie";
  const canonicalUrl = useMemo(
    () => `https://www.hommlie.com/page/${encodeURIComponent(slug || "")}`,
    [slug]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get(
          `${config.API_URL}/api/seopage/getPageBySlug/${slug}`,
          { signal: controller.signal }
        );

        if (res?.data?.status === 1) {
          setPageData(res.data?.data?.pageData || null);
          setServices(res.data?.data?.services || []);
        } else {
          setError("Could not load the requested page.");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err?.response?.data?.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug]);

  // Error UI (mobile friendly)
  if (!isLoading && error) {
    return (
      <main className="min-h-screen max-w-7xl mx-auto px-3 sm:px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Oops!
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto">
      {/* SEO */}
      <Helmet>
        {/* Primary */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Hommlie" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={heroImage} />

        {/* Hinting */}
        <link rel="preconnect" href="https://www.hommlie.com" />
        {heroImage?.startsWith("http") && (
          <link rel="preconnect" href={new URL(heroImage).origin} />
        )}

        {/* Optional JSON-LD for the article/page */}
        {pageData?.title && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: pageData.title,
              description,
              mainEntityOfPage: canonicalUrl,
              image: heroImage,
              author: {
                "@type": "Organization",
                name: "Hommlie",
              },
              publisher: {
                "@type": "Organization",
                name: "Hommlie",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.hommlie.com/og/hommlie-logo.png",
                },
              },
            })}
          </script>
        )}
      </Helmet>

      {/* Top spacing for mobile */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4" />

      {/* Loading state – mobile-first skeleton to avoid CLS */}
      {isLoading ? (
        <div className="px-3 sm:px-4 pb-8">
          <Skeleton />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            className="
              relative
              w-full
              h-56 sm:h-64 md:h-80 lg:h-[50vh]
              min-h-[220px] sm:min-h-[260px] md:min-h-[320px]
              overflow-hidden rounded-xl sm:rounded-2xl
              mx-3 sm:mx-4
            "
          >
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt={heroAlt}
                title={imageTitle}
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/10" />
            </div>

            <div className="absolute inset-0 flex items-end sm:items-center justify-start">
              <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-0">
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="
                    text-white
                    text-2xl sm:text-3xl lg:text-4xl
                    font-extrabold leading-snug
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
                    max-w-[90%] sm:max-w-[80%]
                  "
                >
                  {pageData?.title || "Hommlie Services"}
                </motion.h1>

                {pageData?.sub_title ? (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="
                      mt-2 text-gray-200
                      text-base sm:text-lg
                      max-w-[90%] sm:max-w-[75%]
                    "
                  >
                    {pageData.sub_title}
                  </motion.p>
                ) : null}
              </div>
            </div>
          </motion.section>

          {/* Content + Sidebar */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-3 sm:px-4 py-6 sm:py-8 md:py-12"
          >
            <div
              className="
                grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8
                mx-auto
              "
            >
              {/* Content */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="
                  lg:col-span-3
                  bg-white rounded-xl sm:rounded-2xl
                  shadow-md sm:shadow-lg
                  overflow-hidden
                "
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div
                    className="
                      prose prose-sm sm:prose md:prose-lg
                      max-w-none
                      prose-img:rounded-xl
                      prose-img:w-full
                      prose-headings:scroll-mt-24
                      prose-a:break-words
                    "
                    // NOTE: make sure your HTML is sanitized server-side
                    dangerouslySetInnerHTML={{
                      __html: pageData?.description || "",
                    }}
                  />
                </div>
              </motion.article>

              {/* Sidebar (Service Selector) */}
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div
                  className="
                    sticky lg:top-6
                    space-y-4 sm:space-y-6
                  "
                >
                  <ServiceSelector
                    services={services || []}
                    onCallClick={() => setIsInspectionModalOpen(true)}
                  />

                  {/* Optional quick CTA block for mobile */}
                  <div className="block lg:hidden bg-white rounded-xl shadow-md p-4">
                    <p className="text-sm text-gray-700">
                      Prefer talking to an expert?
                    </p>
                    <button
                      onClick={() => setIsInspectionModalOpen(true)}
                      className="
                        mt-3 w-full
                        h-11 rounded-lg
                        bg-black text-white
                        font-medium
                        active:scale-[0.99]
                      "
                    >
                      Book Free Inspection
                    </button>
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.section>

          {/* Modal */}
          <InspectionModal
            isOpen={isInspectionModalOpen}
            onClose={() => setIsInspectionModalOpen(false)}
          />
        </>
      )}
    </main>
  );
};

export default SEOPage;
