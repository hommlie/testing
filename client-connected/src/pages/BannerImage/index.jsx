import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerImage = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden sm:flex w-full justify-center mb-3 mt-2" >
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/images/baner.webp"
          alt="Banner Desktop"
          className="w-[1250px] h-auto object-cover"
        />
        <div className="absolute bottom-14 left-10">
          <button
            onClick={() =>
              navigate('/product/cockroach-control-services-in-bangalore')
            }
            className="px-6 py-3 bg-[#0463ac] text-white text-base font-bold rounded-md shadow-lg hover:from-emerald-700 hover:to-lime-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
             Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerImage;
