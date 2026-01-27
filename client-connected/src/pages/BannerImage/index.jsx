import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerImage = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden sm:flex w-full justify-center mb-3 -mt-10" >
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
            className="group px-6 py-3 bg-[#384c45] text-white text-base font-bold rounded-lg shadow-lg hover:bg-[#2c3e38] transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            Book 6D Prime ₹1399 <span className="text-xl leading-none group-hover:translate-x-1 transition-transform">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerImage;
