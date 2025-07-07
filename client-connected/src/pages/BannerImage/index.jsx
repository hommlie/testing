import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerImage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/images/banner.png"
          alt="Banner"
          className="w-[1250px] h-auto object-cover"
        />

        {/* Button: hidden on mobile, visible on sm+ */}
        <div className="absolute bottom-20 left-20 hidden sm:block">
          <button
            onClick={() =>
              navigate('/product/cockroach-control-services-in-bangalore')
            }
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-lime-600 text-white text-base font-bold rounded-full shadow-lg hover:from-emerald-700 hover:to-lime-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            🚀 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerImage;
