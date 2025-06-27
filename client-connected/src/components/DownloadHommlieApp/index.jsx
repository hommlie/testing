import React from 'react';

const DownloadHommlieApp = () => {
  return (
    <div className="fixed left-4 bottom-24 z-50 shadow-lg rounded-2xl bg-white p-5 w-[320px] flex items-center gap-6 border border-gray-200">
      {/* Text Block */}
      <div className="flex-shrink-0">
        <p className="text-sm font-semibold text-gray-700">DOWNLOAD THE</p>
        <h2 className="text-2xl font-extrabold text-[#ff4c7b] leading-tight">Hommlie</h2>
      </div>

      {/* Button Block */}
      <div className="flex flex-col gap-3 w-full">
        <a
          href="https://play.google.com/store/apps/details?id=com.hommlie"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/playstore.svg"
            alt="Get it on Google Play"
            className="h-12 object-contain"
          />
        </a>
        <a
          href="https://apps.apple.com/app/id1234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/appstore.svg"
            alt="Download on the App Store"
            className="h-12 object-contain"
          />
        </a>
      </div>
    </div>
  );
};

export default DownloadHommlieApp;
