import React from 'react';
import FooterDropdown from './FooterDropdown';
import './CopyRight.css';

const CopyRight = () => {
  return (
    <footer className="roachx-footer">
      <div className="footer-content">
        <div className="footer-left">
          <FooterDropdown />
        </div>
        <div className="footer-right">
          <p> {new Date().getFullYear()} Copyright ©️ ADML TECHNOSERVICES PRIVATE LIMITED. All Rights Reserved.</p>
          <p>Powered by Hommlie Privacy Policy Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default CopyRight;