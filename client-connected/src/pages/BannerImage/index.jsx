import React from 'react';

const BannerImage = () => {
  return (
    <div className="w-full">
      <img
        src="/images/banner.png" 
        alt="Banner"
        className="w-full h-auto object-cover border rounded-lg"
      />
    </div>
  );
};

export default BannerImage;
