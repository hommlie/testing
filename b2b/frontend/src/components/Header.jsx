import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { FaUser, FaPhoneAlt, FaClock, FaSms, FaDownload } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Signin from "./Signin";
import Signup from "./Signup";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [showGetQuote, setShowGetQuote] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('/api/header/config')
      .then(res => res.json())
      .then(setHeaderData)
      .catch(err => console.error("Failed to load header config:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (type) => {
    setActiveDropdown(prev => prev === type ? null : type);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setShowUserMenu(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      closeAllDropdowns();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!headerData) return null;

  return (
    <>
      <div className={`header-container ${isScrolled ? 'scrolled' : ''}`} ref={dropdownRef}>
        <div className="logo">
          <Link to="/" onClick={closeAllDropdowns}>
            <img
              src={isScrolled ? headerData.logoScrolled : headerData.logo}
              alt="Hommlie Logo"
            />
          </Link>
        </div>


        <div className="nav-links">
          {headerData.navLinks.map((nav, idx) => {
            if (nav.type === 'link') {
              return <Link key={idx} to={nav.path} onClick={closeAllDropdowns}>{nav.label}</Link>;
            }
            if (nav.type === 'external') {
              return <a key={idx} href={nav.path} target="_blank" rel="noreferrer">{nav.label}</a>;
            }
            if (nav.type === 'dropdown') {
              return (
                <div className="dropdown" key={idx}>
                  <a className="nav-link" href="#" onClick={() => toggleDropdown(nav.section)}>{nav.label}</a>
                  {activeDropdown === nav.section && (
                    <div className="dropdown-content">
                      <div className="services-description">
                        <div className="services-title-wrapper">
                          <h3>{nav.overview.heading}</h3>
                          <p>{nav.overview.description}</p>
                          {nav.overview.link && nav.overview.linkText && (
                              <Link to={nav.overview.link} className="overview-link" onClick={closeAllDropdowns}>
                                {nav.overview.linkText}
                              </Link>
                            )}
                        </div>
                      </div>
                      <div className="services-links">
                        {nav.items.map((item, i) =>
                          item.download ? (
                            <a key={i} href={item.path} download className="download-brochure-btn" onClick={closeAllDropdowns}>
                              <FaDownload className="download-icon" /> {item.label}
                            </a>
                          ) : (
                            <Link key={i} to={item.path} onClick={closeAllDropdowns}>{item.label}</Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="icons">
          <div className="user-icon" onClick={() => setShowUserMenu(!showUserMenu)}>
            <FaUser size={20} />
            {showUserMenu && (
              <div className="user-menu">
                <div className="menu-item" onClick={() => {
                  setShowSignin(true);
                  setShowSignup(false);
                  setShowUserMenu(false);
                }}>Sign In</div>
                <hr />
                <div className="menu-item" onClick={() => {
                  setShowSignup(true);
                  setShowSignin(false);
                  setShowUserMenu(false);
                }}>Signup</div>
              </div>
            )}
          </div>
          <button className="get-quote-btn" onClick={() => setShowGetQuote(true)}>FREE INSPECTION</button>
        </div>
      </div>

      {showGetQuote && (
        <>
          <div className="popup-overlay" onClick={() => setShowGetQuote(false)}></div>
          <div className="get-quote-popup">
            <IoCloseSharp size={28} className="close-icon" onClick={() => setShowGetQuote(false)} />
            <h2>{headerData.quote.heading}</h2>
            <h1>{headerData.quote.title.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}</h1>
            <div className="quote-options">
              <div className="option"><FaPhoneAlt className="icon" /><div>Call us at <span className="call-number">{headerData.quote.phone}</span></div></div>
              <div className="option"><FaClock className="icon" /><div>Request a Callback</div></div>
              <div className="option"><FaSms className="icon" /><div>Text With Us</div></div>
            </div>
          </div>
        </>
      )}

      {showSignin && (
        <>
          <div className="modal-overlay" onClick={() => setShowSignin(false)}></div>
          <div className="signin-modal-container">
            <IoCloseSharp size={28} className="close-icon" onClick={() => setShowSignin(false)} />
            <Signin switchToSignup={() => {
              setShowSignin(false);
              setShowSignup(true);
            }} />
          </div>
        </>
      )}

      {showSignup && (
        <>
          <div className="modal-overlay" onClick={() => setShowSignup(false)}></div>
          <div className="signin-modal-container">
            <IoCloseSharp size={28} className="close-icon" onClick={() => setShowSignup(false)} />
            <Signup
              switchToSignin={() => {
                setShowSignup(false);
                setShowSignin(true);
              }}
              onSignupSuccess={() => {
                setShowSignup(false);
                setShowSignin(true);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
