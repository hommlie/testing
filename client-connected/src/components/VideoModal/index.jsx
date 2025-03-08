import React from "react";
import { X } from "lucide-react";

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  // Function to parse and convert YouTube URL to embed format
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    // Extract video ID from different YouTube URL formats
    let videoId = "";

    // Format 1: youtu.be/VIDEO_ID
    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1];
    }
    // Format 2: youtube.com/watch?v=VIDEO_ID
    else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      videoId = urlParams.get("v");
    }
    // Format 3: youtube.com/embed/VIDEO_ID
    else if (url.includes("youtube.com/embed")) {
      videoId = url.split("youtube.com/embed/")[1];
    }

    // Remove any additional parameters (like ?si=xxx or &t=xxx)
    if (videoId && videoId.includes("?")) {
      videoId = videoId.split("?")[0];
    }
    if (videoId && videoId.includes("&")) {
      videoId = videoId.split("&")[0];
    }

    // Return the proper embed URL
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          className="absolute -top-10 right-0 text-white p-2 hover:text-gray-300 transition-colors"
          onClick={onClose}
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={getYoutubeEmbedUrl(videoUrl)}
            className="w-full h-full"
            allowFullScreen
            title={`Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
