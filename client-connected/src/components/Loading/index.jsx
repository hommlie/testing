import React from 'react';
import loadingImg from '../../assets/images/loading/loading-img.png';

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-transparent">
      {/* <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div> */}
      {/* <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p> */}
      <div className="relative w-48 flex flex-col items-center">
        {/* <div className="absolute inset-0 rounded-full opacity-75"></div> */}
        <img src={loadingImg} className="h-44 relative z-10" alt="Loading" />
        <div className="w-48 mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-loading-full-width"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;