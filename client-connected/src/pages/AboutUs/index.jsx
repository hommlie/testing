import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";
import { Helmet } from "react-helmet-async";

export default function AboutUs() {
  const { getCMSPagesData, aboutData } = useCont();

  useEffect(() => {
    if (!aboutData) getCMSPagesData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl" 
      
    >
      {/* SEO Meta and Canonical */}
      <Helmet>
        <title>About Us - Hommlie | Trusted Home Services in Bangalore</title>
        <meta
          name="description"
          content="Learn more about Hommlie, your trusted partner for pest control, deep cleaning, and home services in Bangalore. Discover our mission, values, and customer-first approach."
        />
        <link
          rel="canonical"
          href="https://www.hommlie.com/about-us"
        />
      </Helmet>

      <div className="bg-white shadow-md rounded-lg glow-border p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: aboutData }}
        />
      </div>
    </main>
  );
}
