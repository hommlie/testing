import React from 'react';

const DeleteAccountPage = () => {
    
  return (
    <div className="bg-white min-h-screen py-10 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Delete Account</h1>
        <p className="text-gray-600 mb-8">Last Updated: March 09, 2024</p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Step 1 - Open Rider or Driver App</h2>
            <p className="text-gray-600">Open the Rider or Driver app.</p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Step 2 - Goto home page click on top left menu</h2>
            <p className="text-gray-600">Go to the home page and click on the top left menu.</p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Step 3 - Goto settings</h2>
            <p className="text-gray-600">Navigate to the settings section.</p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Step 4 - Click on Delete account</h2>
            <p className="text-gray-600">Click on the "Delete account" option.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;