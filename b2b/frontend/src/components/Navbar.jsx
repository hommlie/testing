import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ headerData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setShowServicesMenu(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showSignin) setShowSignin(false);
    if (showSignup) setShowSignup(false);
    // Add your authentication logic here
  };

  if (!headerData) return null;

  const servicesDropdown = headerData.navLinks.find(n => n.section === 'services');

  return (
    <>
      <nav className="mobile-navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Company Logo" />
        </Link>

        <div className="navbar-right">
          <div className="user-icon-container" onClick={() => setShowUserMenu(!showUserMenu)}>
            <FaUser className="user-icon" />
            {showUserMenu && (
              <div className="user-dropdown">
                <button 
                  className="dropdown-item" 
                  onClick={() => { setShowSignin(true); setShowUserMenu(false); }}
                >
                  Sign In
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item" 
                  onClick={() => { setShowSignup(true); setShowUserMenu(false); }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="navbar-icons">
            <Link to="/" className="nav-icon">
              <i className="fas fa-home"></i>
            </Link>
            <button className="menu-toggle" onClick={toggleMenu}>
              {menuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/about" className="menu-item" onClick={toggleMenu}>About Us</Link>
            <Link to="/products" className="menu-item" onClick={toggleMenu}>Products</Link>
            
            <div className="menu-item" onClick={() => setShowServicesMenu(!showServicesMenu)}>
              Services <i className={`fas fa-chevron-${showServicesMenu ? 'up' : 'down'}`}></i>
            </div>

            {showServicesMenu && servicesDropdown && (
              <div className="submenu">
                <div className="submenu-header">
                  <h4>{servicesDropdown.overview?.heading}</h4>
                  <p>{servicesDropdown.overview?.description}</p>
                  <Link 
                    to={servicesDropdown.overview?.link} 
                    className="submenu-link"
                    onClick={toggleMenu}
                  >
                    {servicesDropdown.overview?.linkText}
                  </Link>
                </div>
                <div className="submenu-items">
                  {servicesDropdown.items.map((item, i) => (
                    <Link
                      key={i}
                      to={item.path}
                      onClick={toggleMenu}
                      className="submenu-item"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link to="#" className="menu-item" onClick={toggleMenu}>Resources</Link>
          </div>
        )}
      </nav>

      {/* Auth Modals */}
      {(showSignin || showSignup) && (
        <div className="modal-container">
          <div className="modal-backdrop" onClick={() => showSignin ? setShowSignin(false) : setShowSignup(false)}></div>
          <div className="auth-modal">
            <button className="modal-close" onClick={() => showSignin ? setShowSignin(false) : setShowSignup(false)}>
              <IoCloseSharp />
            </button>
            <h2>{showSignin ? 'Sign In' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>{showSignin ? 'Password' : 'Create Password'}</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <button type="submit" className="auth-btn">
                {showSignin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <p className="auth-toggle">
              {showSignin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => {
                setShowSignin(!showSignin);
                setShowSignup(!showSignup);
              }}>
                {showSignin ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;