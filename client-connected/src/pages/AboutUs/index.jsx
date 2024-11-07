import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";

export default function AboutUs() {
  const { getCMSPagesData, aboutData } = useCont();

  useEffect(() => {
    if (!aboutData) getCMSPagesData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
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