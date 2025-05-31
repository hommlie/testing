import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import roachxlogo from '../assets/logo.svg';
import playstore from '../assets/playstore.svg';
import appstore from '../assets/applestore.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={roachxlogo} alt="RoachX Logo" className="footer-logo" />
          <p>
            One click to transform your home into a sparkling haven with our professional
            cleaning services. From deep cleans.
          </p>
          <div className="footer-socials">
            <i className="fa-brands fa-facebook-f" />
            <i className="fa-brands fa-instagram" />
            <i className="fa-brands fa-twitter" />
            <i className="fa-brands fa-linkedin-in" />
            <i className="fa-brands fa-youtube" />
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company Info</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/partner">Partner us</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Our Brands</h4>
            <ul>
              <li><Link to="/brands/hommlie">Hommlie</Link></li>
              <li><Link to="/brands/hompure">Hompure</Link></li>
              <li><Link to="/brands/hoy-smart">Hoy Smart</Link></li>
              <li><Link to="/brands/roachx">RoachX</Link></li>
              <li><Link to="/brands/pink-store">Pink Store</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/women-empowerment">Women Empowerment</Link></li>
              <li><Link to="/b2b-services">B2B Services</Link></li>
              <li><Link to="/register-professional">Register as Professional</Link></li>
              <li><Link to="/newsletter">Newsletter</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-apps">
          <a href="https://play.google.com" target="_blank" rel="noreferrer">
            <img src={playstore} alt="Get it on Google Play" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
            <img src={appstore} alt="Download on the App Store" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
