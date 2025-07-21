import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerImageMobile = () => {
  const navigate = useNavigate();

  return (
    <div className="sm:hidden pt-6 mb-6" >
      <div className="relative w-full rounded-lg overflow-hidden">
        <img
          src="/images/banner-bg-mobile.png"
          alt="Banner Mobile"
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <button
            onClick={() =>
                navigate('/product/cockroach-control-services-in-bangalore')
            }
            className="px-4 py-2 bg-[#92b775] text-white text-sm font-semibold rounded-md shadow-md hover:from-emerald-700 hover:to-lime-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
            Book Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default BannerImageMobile;
