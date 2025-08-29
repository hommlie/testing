import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";

export default function TermsConditions() {
  const { termsConditionsData, getCMSPagesData } = useCont();

  useEffect(() => {
    if (!termsConditionsData) getCMSPagesData();
    console.log(termsConditionsData);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl" 
       style={{
            background: "linear-gradient(135deg, #e6f6f1 0%, #fdf4f4 25%, #f0e6f9 50%, #e8f3fd 75%, #e6faec 100%)",
          }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions</h1>
        <div 
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: termsConditionsData }} 
        />
      </div>
    </main>
  );
}