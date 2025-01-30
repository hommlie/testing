import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "./index.css";
import cartIcon from "../../assets/images/cart-icon.svg";
import womenEmpLogo from "../../assets/images/women-emp-icon.png";
import commercialIcon from "../../assets/images/commercial-icon.svg";
import userIcon from "../../assets/images/user-icon.svg";
import Loading from "../Loading";
import emptyCart from "../../assets/images/illustrator/empty_cart.png";
import emptySearch from "../../assets/images/illustrator/empty_search.png";
import LoginSignup from "../LoginModal";
import AddressModal from "../AddressModal";
import ReferAndEarn from "../ReferAndEarnModal";
import GoogleMapLoader from "../GoogleMapLoader";
import LocationModal from "../LocationModal";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import { jwtDecode } from "jwt-decode";

export default function Header({ logo, logoAlt }) {
  const {
    prodData,
    user,
    isLoading,
    getSearchProdData,
    setUser,
    cart,
    getCart,
    setCart,
    setCartLength,
    cartLength,
    homeFeedData,
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
  const [searchPlaceholderData, setSearchPlaceholderData] = useState([]);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isReferAndEarnOpen, setIsReferAndEarnOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    "Get Current Location"
  );
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const navigate = useNavigate();
  const notify = useToast();
  const headerRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);

  const openPage = () => {
    setIsLocationModalOpen(true);
  };

  const closePage = () => {
    setIsLocationModalOpen(false);
  };

  useEffect(() => {
    // console.log(user);

    const handleClickOutside = (event) => {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setIsLoginOpen(false);
      }
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getCurrentLocation();
    const featuredProd =
      homeFeedData?.featured_products?.map((pd) => pd.product_name) || [];
    setSearchPlaceholderData(featuredProd);
  }, [cartLength, bookings]);

  useEffect(() => {
    if (searchPlaceholderData.length > 0) {
      const typingInterval = setInterval(() => {
        if (isTyping) {
          if (
            currentPlaceholder.length <
            searchPlaceholderData[currentPlaceholderIndex].length
          ) {
            setCurrentPlaceholder(
              (prev) =>
                prev +
                searchPlaceholderData[currentPlaceholderIndex][prev.length]
            );
          } else {
            setIsTyping(false);
            setTimeout(() => {
              setIsTyping(true);
              setCurrentPlaceholder("");
              setCurrentPlaceholderIndex(
                (prev) => (prev + 1) % searchPlaceholderData.length
              );
            }, 2000);
          }
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [
    searchPlaceholderData,
    currentPlaceholderIndex,
    currentPlaceholder,
    isTyping,
  ]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setCurrentLocation("Bannerghatta, Bangalore");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.GMAP_KEY}`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            // handleLocationSelect({
            //   name: data.results[0].formatted_address,
            //   address: data.results[0].formatted_address,
            //   location: {
            //     lat: latitude,
            //     lng: longitude
            //   }
            // });
            const locationStings =
              data.results[0]?.formatted_address.split(",");
            if (locationStings.length > 3) {
              setCurrentLocation(locationStings?.slice(0, 4)?.join(","));
            } else {
              setCurrentLocation(data.results[0]?.formatted_address);
            }
          } else {
            setCurrentLocation("Location could not be fetched");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          setCurrentLocation("Bannerghatta, Bangalore");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setCurrentLocation("Bannerghatta, Bangalore");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const openWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?phone=919844090440`, "_blank");
  };

  const callNumber = () => {
    window.location.href = `tel:+916363865658`;
  };

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
    navigate(`${config.VITE_BASE_URL}`);
  };

  const handleRemoveFromCart = async (id) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const user_id = jwtDecode(jwtToken);
      try {
        const response = await axios.post(
          `${config.API_URL}/api/deleteproduct`,
          {
            user_id: user_id.id,
            cart_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.data.status === 1) {
          console.log(response.data.message);
          getCart();
        }
      } catch (error) {
        console.log("error removing from cart:", error);
      }
    } else {
      console.log("User hasn't logged in");
    }
  };

  const handleQtyUpdate = async (id, qty) => {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      if (qty === 0) {
        handleRemoveFromCart(id);
      } else {
        try {
          const response = await axios.post(
            `${config.API_URL}/api/qtyUpdate`,
            {
              qty,
              cart_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          if (response.data.status === 1) {
            console.log(response.data.message);
            getCart();
          }
        } catch (error) {
          console.log("error updating cart:", error);
        }
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setIsSearchOpen(false);
      setSearchResults([]);
    } else {
      setIsSearchOpen(true);
      const results = prodData.filter((product) =>
        product.product_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const location = useLocation();

  return (
    <GoogleMapLoader>
      <header ref={headerRef} className="w-full sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <NavLink to={`${config.VITE_BASE_URL}/`}>
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-10 w-32 object-contain"
                />
              </NavLink>

              {/* <button
                onClick={getCurrentLocation}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border-[1px] border-gray-700"
              >
                <MdLocationOn className="text-sm md:text-xl" color="#32A071" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] md:text-sm font-medium">{currentLocation?.display_name ? currentLocation?.address?.neighbourhood : currentLocation}</span>
                  <span className="text-[10px] md:text-xs">{currentLocation?.address?.state_district} {currentLocation?.address?.state}</span>
                </div>
              </button> */}
              <div className="">
                <button
                  onClick={openPage}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg glow-border"
                >
                  <MdLocationOn
                    className="text-sm md:text-xl"
                    color="#32A071"
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-[10px] md:text-xs lg:text-sm max-w-[150px] md:max-w-[200px] lg:max-w-[350px] truncate">
                      {currentLocation?.display_name
                        ? currentLocation?.address?.neighbourhood
                        : currentLocation}
                    </span>
                    {/* <span className="text-[10px] md:text-xs lg:text-sm max-w-[150px] md:max-w-[200px] lg:max-w-[300px] truncate">
                      {currentLocation?.address?.state_district} {currentLocation?.address?.state}
                    </span> */}
                  </div>
                </button>

                {isLocationModalOpen && (
                  <LocationModal
                    onClose={closePage}
                    setCurrentLocation={setCurrentLocation}
                  />
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <NavLink
                to={`${config.VITE_BASE_URL}/women-empowerment`}
                className="flex flex-col items-center space-x-2"
              >
                <img
                  src={womenEmpLogo}
                  className="h-6"
                  alt="Women Empowerment"
                />
                <span className="text-sm font-medium">Women Empowerment</span>
              </NavLink>
              <NavLink
                to="https://b2b.hommlie.com/"
                className="flex flex-col items-center "
              >
                <img
                  src={commercialIcon}
                  className="h-6"
                  alt="Women Empowerment"
                />
                <span className="text-sm font-medium">Commercial</span>
              </NavLink>
              <div className="relative">
                <button
                  className="flex flex-col items-center "
                  onClick={() =>
                    user?.length !== 0
                      ? setIsLoginOpen(!isLoginOpen)
                      : setIsModalOpen(true)
                  }
                >
                  <img
                    src={user?.profileImage || userIcon}
                    alt="user icon"
                    className="h-6 w-6 rounded-full object-cover "
                  />
                  <span className="text-sm font-medium">
                    {user?.length !== 0 ? user.name : "Profile"}
                  </span>
                </button>
                {isLoginOpen && (
                  <div
                    ref={loginDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30"
                  >
                    <NavLink
                      onClick={() => setIsLoginOpen(false)}
                      to={`${config.VITE_BASE_URL}/my-bookings`}
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        location.pathname ===
                        `${config.VITE_BASE_URL}/my-bookings`
                          ? "bg-[#c5dbca]"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      My Bookings
                    </NavLink>
                    <NavLink
                      onClick={() => setIsLoginOpen(false)}
                      to={`${config.VITE_BASE_URL}/edit-profile`}
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        location.pathname ===
                        `${config.VITE_BASE_URL}/edit-profile`
                          ? "bg-[#c5dbca]"
                          : "hover:bg-gray-100"
                      } `}
                    >
                      Edit Profile
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsAddressModalOpen(true);
                        setIsLoginOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${
                        location.pathname ===
                        `${config.VITE_BASE_URL}/your-addresses`
                          ? "bg-[#c5dbca]"
                          : "hover:bg-gray-100"
                      } `}
                    >
                      Your Addresses
                    </button>
                    <button
                      onClick={() => {
                        setIsReferAndEarnOpen(true);
                        setIsLoginOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${
                        location.pathname ===
                        `${config.VITE_BASE_URL}/refer-and-earn`
                          ? "bg-[#c5dbca]"
                          : "hover:bg-gray-100"
                      } `}
                    >
                      Refer & Earn
                    </button>
                    <NavLink
                      onClick={() => setIsLoginOpen(false)}
                      to={`${config.VITE_BASE_URL}/contact-us`}
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        location.pathname ===
                        `${config.VITE_BASE_URL}/contact-us`
                          ? "bg-[#c5dbca]"
                          : "hover:bg-gray-100"
                      } `}
                    >
                      Help Center
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="flex flex-col items-center space-x-2"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <img src={cartIcon} alt="cart icon" className="h-7" />
                  <span className="text-sm font-medium">Bag</span>
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartLength || 0}
                  </span>
                </button>
                {isCartOpen && (
                  <div
                    ref={cartDropdownRef}
                    className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 bg-white rounded-lg shadow-xl py-2 z-30 max-h-[80vh] overflow-y-auto"
                  >
                    {cart?.length > 0 ? (
                      <>
                        {cart.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              {/* <img src={item.image_url} alt={item.product_name} className="w-16 h-16 object-cover rounded-md" /> */}
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {item.product_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.attribute_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.variation_name}
                                </p>
                                <p className="text-sm font-semibold text-gray-700 mt-1">
                                  ₹{item.price * item.qty}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                                <button
                                  onClick={() =>
                                    handleQtyUpdate(item.id, item.qty - 1)
                                  }
                                  className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQtyUpdate(item.id, item.qty + 1)
                                  }
                                  className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <RiDeleteBin5Line size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="p-4 border-t">
                          <p className="text-lg font-semibold text-gray-800">
                            Total: ₹{totalPrice}
                          </p>
                          <NavLink
                            to={`${config.VITE_BASE_URL}/add-to-cart`}
                            className="block w-full text-center bg-[#249370] text-white py-3 mt-3 hover:bg-[#1e7a5d] transition-colors font-medium"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Proceed to Checkout
                          </NavLink>
                        </div>
                      </>
                    ) : (
                      <div>
                        <img src={emptyCart} className="w-full" alt="" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <RxCross1 /> : <AiOutlineMenu />}
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="relative flex-grow mr-4">
              <BiSearchAlt className="absolute text-xs lg:text-xl left-1 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search for ${currentPlaceholder}`}
                className="glow-border w-full text-[10px] lg:text-base pl-5 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
                // onBlur={() => setIsSearchOpen(false)}
              />
              <button
                type="button"
                className="absolute text-[10px] lg:text-base right-1 lg:right-2 top-1/2 transform -translate-y-1/2 bg-[#10847E] text-white px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Search
              </button>
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg z-20 max-h-96 overflow-y-auto lg:grid lg:grid-cols-4 py-4">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() =>
                        navigate(
                          `${config.VITE_BASE_URL}/product/${product.id}/${product.slug}`
                        )
                      }
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={product.productimage.image_url}
                          alt={product.product_name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            {product.product_name}
                          </p>
                          <p className="flex gap-2">
                            <span className="text-xs text-blue-600">
                              ₹{product.discounted_price}
                            </span>
                            <span className="text-xs line-through">
                              ₹{product.product_price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {isSearchOpen && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg z-20 max-h-96 overflow-y-auto flex justify-center">
                  <img src={emptySearch} className="h-72 mb-4" alt="" />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={openWhatsApp}
                className="bg-[#249370] text-white flex items-center space-x-2 px-4 py-2 rounded-md animate-pulse"
              >
                <FaWhatsapp />
                <span className="hidden lg:inline">WhatsApp</span>
              </button>
              <button
                onClick={callNumber}
                className="bg-[#FF3269] text-white flex items-center space-x-2 px-4 py-2 rounded-md animate-bounce"
              >
                <FaPhoneAlt />
                <span className="hidden lg:inline">Call Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 space-y-4">
            <NavLink
              to={`${config.VITE_BASE_URL}/women-empowerment`}
              className="block py-2"
            >
              <img src={womenEmpLogo} className="h-8" alt="Women Empowerment" />
            </NavLink>
            <NavLink
              to="https://b2b.hommlie.com/"
              className="flex items-center space-x-2 py-2"
            >
              <PiBuildingApartmentFill className="h-6 w-6" />
              <span className="text-sm font-medium">Commercial</span>
            </NavLink>
            {Object.keys(user).length ? (
              <>
                <NavLink
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={`${config.VITE_BASE_URL}/my-bookings`}
                  className={`block py-2 ${
                    location.pathname === `${config.VITE_BASE_URL}/my-bookings`
                      ? "bg-[#c5dbca]"
                      : ""
                  } `}
                >
                  My Bookings
                </NavLink>
                <NavLink
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={`${config.VITE_BASE_URL}/edit-profile`}
                  className={`block py-2 ${
                    location.pathname === `${config.VITE_BASE_URL}/edit-profile`
                      ? "bg-[#c5dbca]"
                      : ""
                  } `}
                >
                  Edit Profile
                </NavLink>
                <button
                  onClick={() => {
                    setIsAddressModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 ${
                    location.pathname ===
                    `${config.VITE_BASE_URL}/your-addresses`
                      ? "bg-[#c5dbca]"
                      : ""
                  } `}
                >
                  Your Addresses
                </button>
                <button
                  onClick={() => {
                    setIsReferAndEarnOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 ${
                    location.pathname ===
                    `${config.VITE_BASE_URL}/refer-and-earn`
                      ? "bg-[#c5dbca]"
                      : ""
                  } `}
                >
                  Refer & Earn
                </button>
                <NavLink
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={`${config.VITE_BASE_URL}/contact-us`}
                  className={`block py-2 ${
                    location.pathname === `${config.VITE_BASE_URL}/contact-us`
                      ? "bg-[#c5dbca]"
                      : ""
                  } `}
                >
                  Help Center
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="block w-full text-left py-2"
              >
                Login / Sign Up
              </button>
            )}
            <button
              className="flex items-center space-x-2 py-2"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <img src={cartIcon} alt="cart icon" className="h-6" />
              <span className="text-sm font-medium">
                Bag ({cartLength || 0})
              </span>
            </button>
          </div>
        )}

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center md:hidden">
            <div className="bg-white w-11/12 max-w-md rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RxCross1 size={24} />
                </button>
              </div>
              {cart?.length > 0 ? (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.product_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.attribute_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.variation_name}
                          </p>
                          <p className="text-sm font-semibold text-gray-700 mt-1">
                            ₹{item.price * item.qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() =>
                              handleQtyUpdate(item.id, item.qty - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              handleQtyUpdate(item.id, item.qty + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <RiDeleteBin5Line size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="p-4">
                    <p className="text-lg font-semibold text-gray-800">
                      Total: ₹{totalPrice}
                    </p>
                    <NavLink
                      to={`${config.VITE_BASE_URL}/add-to-cart`}
                      className="block w-full text-center bg-[#249370] text-white py-3 mt-3 hover:bg-[#1e7a5d] transition-colors font-medium rounded-md"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Proceed to Checkout
                    </NavLink>
                  </div>
                </>
              ) : (
                <div className="p-4 flex flex-col items-center">
                  <img
                    src={emptyCart}
                    className="w-full max-w-xs"
                    alt="Empty Cart"
                  />
                  <p className="text-gray-500 mt-4">Your cart is empty</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modals */}
        <LoginSignup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
        />
        <ReferAndEarn
          isOpen={isReferAndEarnOpen}
          onClose={() => setIsReferAndEarnOpen(false)}
        />
      </header>
    </GoogleMapLoader>
  );
}
