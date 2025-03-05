import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import userIcon from "../../assets/images/user-icon.svg";
import cartIcon from "../../assets/images/cart-icon.svg";
import { jwtDecode } from "jwt-decode";
import { useCont } from "../../context/MyContext";
import LoginSignup from "../LoginModal";
import AddressModal from "../AddressModal";
import ReferAndEarn from "../ReferAndEarnModal";

const Header = ({ logo, logoAlt }) => {
  const {
    user,
    getSearchProdData,
    setUser,
    cart,
    getCart,
    setCart,
    setCartLength,
    cartLength,
    getUser,
    totalPrice,
    getAddresses,
    bookings,
  } = useCont();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isReferAndEarnOpen, setIsReferAndEarnOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);

  const showBottomHeader = !["/", "/home"].includes(location.pathname);

  const handleLogout = () => {
    setUser([]);
    Cookies.remove("HommlieUserjwtToken");
    localStorage.removeItem("Hommlieuser");
    localStorage.removeItem("HommlieselectedAddrs");
    localStorage.removeItem("Hommliecart");
    getUser();
    getCart();
    setCart([]);
    setCartLength(0);
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
    notify("Successfully logged out", "success");
    navigate("/");
  };

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-20 bg-white shadow-md font-headerFont"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLink to="/">
              <img
                src={logo}
                alt={logoAlt}
                className="h-8 w-28 object-contain"
              />
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="text-lg hidden md:flex items-center space-x-6">
              <NavLink
                to="/services"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Services
              </NavLink>
              <NavLink
                to="https://b2b.hommlie.com/"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                B2B
              </NavLink>
              <NavLink
                to="/hub"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Hub
              </NavLink>
              <NavLink
                to="/konnect"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Konnect
              </NavLink>
              <NavLink
                to="/community"
                className="text-gray-700 hover:text-green-700 font-medium"
              >
                Community
              </NavLink>
            </nav>
            <NavLink
              to="/register-free-listing"
              className="hidden md:block px-4 py-2 text-green-700 border border-green-700 rounded hover:bg-green-50 transition-colors font-medium"
            >
              Free Listing
            </NavLink>

            <div className="relative">
              {user?.length !== 0 ? (
                <button
                  onClick={() => setIsLoginOpen(!isLoginOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user?.profileImage || userIcon}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition-colors font-medium"
                >
                  Sign Up
                </button>
              )}

              {isLoginOpen && (
                <div
                  ref={loginDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30"
                >
                  <NavLink
                    to="/my-bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  <NavLink
                    to="/edit-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLoginOpen(false)}
                  >
                    Edit Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsAddressModalOpen(true);
                      setIsLoginOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Addresses
                  </button>
                  <button
                    onClick={() => {
                      setIsReferAndEarnOpen(true);
                      setIsLoginOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Refer & Earn
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>

            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <RxCross1 /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>

        {/* Bottom Header - Only show if not on home page */}
        {showBottomHeader && (
          <div className="transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between py-4">
              <div className="relative flex-grow mr-4">
                <BiSearchAlt className="absolute text-xl left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // Implement search logic here
                  }}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send?phone=919844090440",
                      "_blank"
                    )
                  }
                  className="bg-green-600 text-white flex items-center space-x-2 px-4 py-2 rounded-md animate-pulse"
                >
                  <FaWhatsapp />
                  <span className="hidden lg:inline">WhatsApp</span>
                </button>
                <button
                  onClick={() => (window.location.href = "tel:+916363865658")}
                  className="bg-red-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md animate-bounce"
                >
                  <FaPhoneAlt />
                  <span className="hidden lg:inline">Call Us</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t">
          <nav className="space-y-4">
            <NavLink
              to="https://b2b.hommlie.com/"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              B2B
            </NavLink>
            <NavLink
              to="/services"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink
              to="/hub"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hub
            </NavLink>
            <NavLink
              to="/konnect"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Konnect
            </NavLink>
            <NavLink
              to="/community"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </NavLink>
            <NavLink
              to="/register-free-listing"
              className="block py-2 text-green-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Free Listing
            </NavLink>
          </nav>
        </div>
      )}

      {/* Modals */}
      <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
      <ReferAndEarn
        isOpen={isReferAndEarnOpen}
        onClose={() => setIsReferAndEarnOpen(false)}
      />
    </header>
  );
};

export default Header;
