import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerImage = () => {
  const navigate = useNavigate();

  return (
    <div className=" hidden sm:block w-full relative rounded-lg overflow-hidden">
      <img
        src="/images/banner.png"
        alt="Banner"
        className="w-full h-auto object-cover"
      />

      {/* Button: hidden on mobile, visible on sm+ */}
      <div className="absolute bottom-20 left-20 hidden sm:block">
        <button
          onClick={() => navigate('/product/cockroach-control-services-in-bangalore')}
          className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BannerImage;
