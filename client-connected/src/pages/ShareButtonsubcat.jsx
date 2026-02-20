import React from "react";
import { FaShareAlt } from "react-icons/fa";

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

  return (
    <button
      onClick={handleShare}
      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
      aria-label="Share"
    >
      <FaShareAlt className="w-5 h-5 text-black" />
    </button>
  );
}
