// components/ShareButton.jsx
import React from "react";
import { FaShareAlt, FaArrowLeft } from "react-icons/fa";

export default function ShareButton() {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check this out!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("✅ Link copied to clipboard!");
    }
  };

  const handleBack = () => {
    window.location.href = "/"; // 👈 always go to home
  };

  return (
    <>
      {/* Back Button (Top-Left) */}
      <button
        onClick={handleBack}
        className="fixed mt-3 top-34 left-5 bg-white text-black p-3 rounded-full shadow-lg transition z-50 md:hidden"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Share Button (Top-Right) */}
      <button
        onClick={handleShare}
        className="fixed mt-3 top-43 right-5 bg-white text-black p-3 rounded-full shadow-lg transition z-50 md:hidden"
      >
        <FaShareAlt size={20} />
      </button>
    </>
  );
}
