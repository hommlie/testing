import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";

export default function PrivacyPolicy() {
  const { privacyPolicyData, getCMSPagesData } = useCont();

  useEffect(() => {
    if (!privacyPolicyData) getCMSPagesData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <div 
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: privacyPolicyData }} 
        />
      </div>
    </main>
  );
}