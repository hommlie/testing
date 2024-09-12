import React from 'react';
import loadingImg from '../../assets/images/loading/loading-img.png';

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-transparent">
      {/* <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div> */}
      {/* <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p> */}
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping delay-1000 opacity-75"></div>
        <img src={loadingImg} className="h-44 relative z-10" alt="Loading" />
      </div>
    </div>
  );
};

export default Loading;