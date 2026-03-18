import {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";

import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import config from "../config/config";
import LoadingWrapper from "../components/Loading/LoadingWrapper";

const constructSafeUrl = (base, path, params = {}) => {
  try {
    const url = new URL(path, base);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url.toString();
  } catch (error) {
    console.error("Error constructing URL:", error);
    return null;
  }
};

const getLocalStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  try {
    if (item === null || item === "undefined") return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const MyContext = createContext();

export function useCont() {
  return useContext(MyContext);
}

export function ContProvider({ children }) {
  const [prodData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeApiCalls, setActiveApiCalls] = useState(0);
  const [token, setToken] = useState(() => Cookies.get("HommlieUserjwtToken") || "");
  const [user, setUser] = useState(() =>
    getLocalStorageItem(`Hommlieuser`, {})
  );
  const [homeFeedData, setHomeFeedData] = useState(() =>
    getLocalStorageItem(`HommliehomeFeedData`, [])
  );
  const [categoryData, setCategoryData] = useState(() =>
    getLocalStorageItem(`HommliecategoryData`, [])
  );
  const [bannerData, setBannerData] = useState(() =>
    getLocalStorageItem(`HommliebannerData`, [])
  );
  const [privacyPolicyData, setPrivacyPolicyData] = useState();
  const [aboutData, setAboutData] = useState();
  const [termsConditionsData, setTermsConditionsData] = useState();
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [cartProds, setCartProds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [checkoutPd, setCheckoutPd] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddrs, setSelectedAddrs] = useState(() =>
    getLocalStorageItem(`HommlieselectedAddrs`, null)
  );
  const [selectedDayTime, setSelectedDayTime] = useState(() =>
    getLocalStorageItem(`HommlieselectedDayTime`, null)
  );
  const [rescheduleDayTime, setRescheduleDayTime] = useState();
  const [paymentList, setPaymentList] = useState(() =>
    getLocalStorageItem(`HommliepaymentList`, [])
  );
  const [paymentType, setPaymentType] = useState();
  const [bookings, setBookings] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(() =>
    getLocalStorageItem(`HommlieselectedCoupon`, null)
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isReferAndEarnOpen, setIsReferAndEarnOpen] = useState(false);
  const [isWalletBonusModalOpen, setIsWalletBonusModalOpen] = useState(false);


  const [currentLocation, setCurrentLocation] = useState("Get Current Location");
  const [pincode, setPincode] = useState(() =>
    localStorage.getItem("HommliePincode") || ""
  );

  const setGlobalPincode = (pc) => {
    localStorage.setItem("HommliePincode", pc);
    setPincode(pc);
  };

  // If currentLocation contains a 6-digit pincode, populate global pincode.
  useEffect(() => {
    try {
      if (currentLocation) {
        const matches = String(currentLocation).match(/\b(\d{6})\b/);
        if (matches && matches[1]) {
          const found = matches[1];
          if (found !== pincode) {
            setGlobalPincode(found);
          }
        }
      }
    } catch (err) {
      console.warn("Error extracting pincode from currentLocation:", err);
    }
  }, [currentLocation]);

  const incrementApiCall = useCallback(() => {
    setActiveApiCalls((prev) => prev + 1);
    setIsLoading(true);
  }, []);

  const decrementApiCall = useCallback(() => {
    setActiveApiCalls((prev) => {
      if (prev > 0) {
        const newCount = prev - 1;
        if (newCount === 0) {
          setIsLoading(false);
        }
        return newCount;
      }
      return prev;
    });
  }, []);

  const getHomeFeeds = useCallback(async () => {
    // incrementApiCall();
    const user_id = 10001;
    try {
      const response = await axios.post(`${config.API_URL}/api/homefeeds`, {
        user_id,
      });
      setHomeFeedData(response.data);
      localStorage.setItem(
        "HommliehomeFeedData",
        JSON.stringify(response.data)
      );
    } catch (err) {
      console.log("error: " + err);
    } finally {
      // decrementApiCall();
    }
  }, []);

  const getCategoryData = useCallback(async () => {
    // incrementApiCall();
    try {
      const response = await axios.get(`${config.API_URL}/api/category`);
      setCategoryData(response.data);
      localStorage.setItem(
        "HommliecategoryData",
        JSON.stringify(response.data)
      );
    } catch (err) {
      console.log("error: " + err);
    } finally {
      // decrementApiCall();
    }
  }, []);

  const getBannerData = useCallback(async () => {
    // incrementApiCall();
    try {
      const response = await axios.get(`${config.API_URL}/api/banner`);
      if (response.data.status === 1) {
        setBannerData(response.data);
        // console.log(response.data);

        localStorage.setItem(
          "HommliebannerData",
          JSON.stringify(response.data)
        );
      }
    } catch (err) {
      console.log("error: " + err);
    } finally {
      // decrementApiCall();
    }
  }, []);

  const getUser = useCallback(async () => {
    // incrementApiCall();
    setUser([]);
    const jwtToken = Cookies.get(`HommlieUserjwtToken`);
    if (jwtToken) {
      const id = jwtDecode(jwtToken);
      try {
        const response = await axios.post(`${config.API_URL}/api/getprofile`, {
          user_id: id.id,
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        if (response.data.status === 1) {
          const userData = response.data.data;
          if (userData.is_available !== 1) {
            setUser(userData);
            localStorage.setItem(`Hommlieuser`, JSON.stringify(userData));
          } else {
            alert("Your account has been blocked!");
          }
        }
      } catch (error) {
        console.log("Error getting user details: ", error);
      }
    } else {
      localStorage.removeItem(`Hommlieuser`);
      Cookies.remove(`HommlieUserjwtToken`);
      console.log("User hasn't logged in");
    }
    // decrementApiCall();
  }, []);

  const getCart = useCallback(async () => {
    // incrementApiCall();
    setCart([]);
    const jwtToken = Cookies.get(`HommlieUserjwtToken`);
    if (jwtToken) {
      const id = jwtDecode(jwtToken);
      try {
        const response = await axios.post(`${config.API_URL}/api/getcart`, {
          user_id: id.id,
          headers: { Authorization: `Bearer ${jwtToken}` },
        });
        if (response.data.status === 1) {
          const cart = response.data.data;
          const total = cart.reduce((acc, ct) => acc + ct.price * ct.qty, 0);
          setTotalPrice(total);
          setCart(cart);
          setCartLength(cart.length);
        } else if (response.data.status === 0) {
          setCartLength(0);
        }
      } catch (error) {
        console.log("Error getting cart:", error);
      }
    }
    // decrementApiCall();
  }, []);

  async function getBookings() {
    setBookings([]);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const id = jwtDecode(jwtToken);
      await axios
        .post(`${config.API_URL}/api/orderhistory`, {
          user_id: id.id,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          if (response.data.status === 1) {
            setBookings(response.data.data);
          }
        })
        .catch((err) => {
          console.log("error: " + err);
        });
    } else {
      console.log("User hasn't logged in");
    }
  }

  async function getAddresses() {
    setAddresses([]);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const id = jwtDecode(jwtToken);
      try {
        const response = await axios.post(`${config.API_URL}/api/getaddress`, {
          user_id: id.id,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.data.status === 1) {
          const allAddresses = response.data.data;
          setAddresses(allAddresses);

          // ✅ Reset selectedAddrs if the address was deleted
          const storedSelectedAddrs = JSON.parse(localStorage.getItem("HommlieselectedAddrs"));
          const stillExists = allAddresses.find(addr => addr.id === storedSelectedAddrs?.id);

          if (!stillExists) {
            localStorage.removeItem("HommlieselectedAddrs");
            setSelectedAddrs(null);
          }
        } else {
          console.log(response.data.message);
          setSelectedAddrs(null);
          localStorage.removeItem("HommlieselectedAddrs");
        }
      } catch (err) {
        console.log("error: " + err);
      }
    } else {
      console.log("User hasn't logged in");
    }
  }


  // async function getCoupons() {
  //   await axios.get(`${config.API_URL}/api/coupons`)
  //   .then(response => {
  //       if(response.data.status === 1) {
  //           setCoupons(response.data.data);
  //           localStorage.setItem(`HommlieCoupons`, JSON.stringify(response.data.data));
  //       }
  //   })
  //   .catch(error => {
  //       console.log("error getting coupons:", error);
  //   })
  // }

  async function getPaymentList() {
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const user_id = 1;
      await axios
        .post(`${config.API_URL}/api/paymentlist`, 
          { user_id },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        )
        .then((response) => {
          if (response.data.status === 1) {
            setPaymentList(response.data.paymentlist);
            localStorage.setItem(
              `HommliepaymentList`,
              JSON.stringify(response.data.paymentlist)
            );
          }
        })
        .catch((error) => {
          console.log("error getting payment list:", error);
        });
    }
  }

  async function getCMSPagesData() {
    await axios
      .get(`${config.API_URL}/api/cmspages`)
      .then((response) => {
        if (response.data.status === 1) {
          setPrivacyPolicyData(response.data.privacypolicy);
          setAboutData(response.data.about);
          setTermsConditionsData(
            response.data.termsconditions?.terms_conditions
          );
        }
      })
      .catch((error) => {
        console.log("error getting coupons:", error);
      });
  }

  const getSearchProdData = useCallback(async () => {
    // incrementApiCall();
    try {
      const response = await axios.get(`${config.API_URL}/api/searchproducts`);
      setData(response.data.data);
    } catch (err) {
      console.log("error: " + err);
    } finally {
      // decrementApiCall();
    }
  }, []);

  useEffect(() => {
    // fetchAllData();
    getUser();
    getCart();
    // getBookings();
    // getAddresses();
    // getCoupons();
    // getPaymentList();
    // getCMSPagesData();
    // getSearchProdData();
  }, [getHomeFeeds]);

  const handleLogout = useCallback(() => {
    setUser([]);
    Cookies.remove("HommlieUserjwtToken");
    localStorage.removeItem("Hommlieuser");
    localStorage.removeItem("HommlieselectedAddrs");
    localStorage.removeItem("Hommliecart");
    getUser();
    getCart();
    setCart([]);
    setCartLength(0);
    toast.success("Successfully logged out");
  }, [getUser, getCart]);


  const fetchAllData = async () => {
    incrementApiCall();
    try {
      await Promise.all([getHomeFeeds(), getCategoryData(), getBannerData()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      decrementApiCall();
    }
  };

  const states = {
    isLoading,
    setIsLoading,
    activeApiCalls,
    incrementApiCall,
    decrementApiCall,
    token,
    setToken,
    user,
    setUser,
    homeFeedData,
    setHomeFeedData,
    categoryData,
    setCategoryData,
    bannerData,
    setBannerData,
    privacyPolicyData,
    setPrivacyPolicyData,
    aboutData,
    setAboutData,
    termsConditionsData,
    setTermsConditionsData,
    getCMSPagesData,
    cart,
    setCart,
    cartLength,
    setCartLength,
    cartProds,
    setCartProds,
    orders,
    setOrders,
    checkoutPd,
    setCheckoutPd,
    getUser,
    totalPrice,
    setTotalPrice,
    addresses,
    setAddresses,
    getAddresses,
    selectedAddrs,
    setSelectedAddrs,
    selectedDayTime,
    setSelectedDayTime,
    paymentList,
    setPaymentList,
    getPaymentList,
    paymentType,
    setPaymentType,
    rescheduleDayTime,
    setRescheduleDayTime,
    bookings,
    setBookings,
    selectedCoupon,
    setSelectedCoupon,
    // coupons, setCoupons, getCoupons,
    prodData,
    setData,
    getSearchProdData,
    getHomeFeeds,
    getCategoryData,
    getBannerData,
    getCart,
    getBookings,
    fetchAllData,
    currentLocation,
    setCurrentLocation,
    pincode,
    setPincode: setGlobalPincode,
    handleLogout,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isAddressModalOpen,
    setIsAddressModalOpen,
    isReferAndEarnOpen,
    setIsReferAndEarnOpen,
    isWalletBonusModalOpen,
    setIsWalletBonusModalOpen,

    startLoading: () => setIsLoading(true),
    stopLoading: () => setIsLoading(false),
  };


  return (
    <MyContext.Provider value={states}>
      <LoadingWrapper>{children}</LoadingWrapper>
    </MyContext.Provider>
  );
}