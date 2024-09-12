import React from 'react';
import { useCont } from '../../context/MyContext';
import LoadingAnimation from '../Loading';

const LoadingWrapper = ({ children }) => {
  const { isLoading } = useCont();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoadingAnimation />
        </div>
      )}
      {children}
    </>
  );
};

export default LoadingWrapper;