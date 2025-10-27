import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdStars } from "react-icons/md";
import {
  IoCheckmarkCircleSharp,
  IoCheckmarkCircleOutline,
  IoCheckmark,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiClock1 } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LoginSignup from "../../components/LoginModal";
import cartBag from "../../assets/images/cart-bag.png";
import "./index.css";
import { Helmet } from "react-helmet-async";
import { useCont } from "../../context/MyContext";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";
import { useToast } from "../../context/ToastProvider";
import Loading from "../../components/Loading";
import ProdSection from "../../components/ProdSection";
import CouponModal from "../../components/CouponModal";
import InspectionModal from "../../components/InspectionModal";
import LocationSuggestion from "../../components/LocationSuggestion";
import { BiSolidOffer } from "react-icons/bi";
import Rating from "../../components/Rating";
import ShareButton from "../ShareButtonservcies";

export default function ProductPage() {
  const {
    cart,
    setCart,
    user,
    getUser,
    getCart,
    cartLength,
    checkoutPd,
    setCheckoutPd,
    selectedCoupon,
    setSelectedCoupon,
    coupons,
    getCoupons,
  } = useCont();
  const { slug, tag, location } = useParams();
  const navigate = useNavigate();

  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");
  const warningNotify = (warning) => notify(warning, "warning");

  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prodData, setProdData] = useState({});
  const [prodVendors, setProdVendors] = useState([]);
  const [prodRelatedProds, setProdRelatedProds] = useState([]);
  const [prodReturnPolicy, setProdReturnPolicy] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [totalQty, setTotalQty] = useState(1);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [mediaItems, setMediaItems] = useState([]);
  const [imageItems, setImageItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [isLocationsExpanded, setisLocationsExpanded] = useState(false);
  const [isKeywordsExpanded, setIsKeywordsExpanded] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [variations, setVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [formData, setState] = useState({
    address: "",
    fullName: "",
    email: "",
    mobile: "",
    date: new Date(),
    time: "",
    width: null,
    length: null,
    sqft: null,
    total_amount: 0,
  });

  const timeSlots = [
    "9 to 11 AM",
    "11 to 1 PM",
    "1 to 3 PM",
    "3 to 5 PM",
    "5 to 7 PM",
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    const proceedBtn = document.getElementById("proceed-btn")?.onClick;
    if (typeof proceedBtn == undefined) {
      navigate(`${config.VITE_BASE_URL}/add-to-cart`);
    }
  };
  const openCouponModal = () => setIsCouponModalOpen(true);
  const closeCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  useEffect(() => {
    calculateCouponDiscount();
  }, [selectedCoupon, cart]);

  const calculateCouponDiscount = () => {
    if (selectedCoupon) {
      if (selectedCoupon.amount) {
        setCouponDiscount(Number(selectedCoupon.amount));
      } else if (selectedCoupon.percentage) {
        const discount =
          (totalAmount * Number(selectedCoupon.percentage)) / 100;
        setCouponDiscount(Number(discount));
      }
    } else {
      setCouponDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    localStorage.removeItem("HommlieselectedCoupon");
    setCouponDiscount(0);
  };

  const toggleLocationsExpansion = () => {
    setisLocationsExpanded(!isLocationsExpanded);
  };

  const toggleKeywordsExpansion = () => {
    setIsKeywordsExpanded(!isKeywordsExpanded);
  };

  const handleAddToCart = async () => {
    if (user.length === 0) {
      openModal();
    } else {
      setIsAddingToCart(true);
      const product = {
        user_id: user.id,
        product_id: prodData.id,
        vendor_id: prodData.vendor_id,
        product_name: prodData.product_name,
        image: imageItems[0]?.image_url,
        qty: 1,
        price: totalAmount,
        attribute: selectedVariation && selectedVariation.attribute_id,
        variation: selectedVariation && selectedVariation.id,
        tax: taxAmount,
        shipping_cost: prodData.shipping_cost,
      };

      try {
        const response = await axios.post(
          `${config.API_URL}/api/addtocart`,
          product
        );
        if (response.data.status === 1) {
          successNotify("Successfully added to Cart");
          getCart();
        }
      } catch (error) {
        errorNotify(error);
        console.log("error adding to cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
      setCart(product);
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      existingCart.push(product);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      getCart();
    }
  };

  const handleRemoveFromCart = async (id) => {
    setIsAddingToCart(true);
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const user_id = jwtDecode(jwtToken).id;
      try {
        const response = await axios.post(
          `${config.API_URL}/api/deleteProduct`,
          { user_id, cart_id: id },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        if (response.data.status === 1) {
          getCart();
        }
      } catch (error) {
        console.log("error removing from cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const handleQtyUpdate = async (id, qty) => {
    setIsAddingToCart(true);

    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      if (qty === 0) {
        handleRemoveFromCart(id);
      } else {
        try {
          const response = await axios.post(
            `${config.API_URL}/api/qtyUpdate`,
            { qty, cart_id: id },
            { headers: { Authorization: `Bearer ${jwtToken}` } }
          );
          if (response.data.status === 1) {
            getCart();
          }
        } catch (error) {
          console.log("error updating cart:", error);
        } finally {
          setIsAddingToCart(false);
        }
      }
    }
  };

  const handleProceed = async () => {
    if (user.length === 0) {
      openModal();
    } else {
      await handleAddToCart();
      navigate(`${config.VITE_BASE_URL}/add-to-cart`);
    }
  };

  useEffect(() => {
    const { width, length } = formData;

    if (width && length) {
      const squareFeet = (width * length).toFixed(2);

      const total = (squareFeet * totalAmount).toFixed(2);

      setState((prev) => ({
        ...prev,
        sqft: squareFeet,
        total_amount: parseInt(total),
      }));
    }
  }, [formData.width, formData.length, totalAmount]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setState((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${config.API_URL}/api/createInspection`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 1) {
        successNotify("Inspection request submitted successfully!");
        window.location.reload();
      } else {
        errorNotify("Failed to submit inspection request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      errorNotify("An error occurred. Please check the console for details.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    if (slug) {
      Promise.all([getProductDetails()])
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setIsLoading(false);
        });
    }
  }, [slug]);

  async function getProductDetails() {
    try {
      setIsLoading(true);
      await axios
        .post(`${config.API_URL}/api/productdetails`, { slug: slug })
        .then((response) => {
          handleRemoveCoupon();
          setProdData(response.data.data);
          setProdVendors(response.data.vendors);
          setProdRelatedProds(response.data.related_products);
          setProdReturnPolicy(response.data.returnpolicy);
          setReviewData(response.data.rattings);

          if (response.data.data.productimages) {
            setMediaItems(response.data.data.productimages);
          }

          if (response.data.data.variations) {
            setAttributes(Object.keys(response.data.data.variations));
          }

          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    } catch (err) {
      console.log("error: " + err);
    }
  }

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItemsCount(5);
      } else if (window.innerWidth >= 640) {
        setVisibleItemsCount(4);
      } else {
        setVisibleItemsCount(3);
      }
    };

    updateVisibleItemsCount();
    window.addEventListener("resize", updateVisibleItemsCount);

    return () => window.removeEventListener("resize", updateVisibleItemsCount);
  }, []);

  useEffect(() => {
    // if (prodData && prodData.variations) {
    //   const attrs = [
    //     ...new Set(prodData.variations.map((v) => v.attribute_name)),
    //   ];
    //   setAttributes(attrs);
    //   setVariations(prodData.variations);
    //   if (attrs.length > 0) {
    //     setSelectedAttribute(attrs[0]);
    //     const firstVariation = prodData.variations.find(
    //       (v) => v.attribute_name === attrs[0]
    //     );
    //     if (firstVariation) {
    //       setSelectedVariation(firstVariation.data);
    //     }
    //   }
    // }
    if (prodData && prodData.variations) {
  const attrs = [...new Set(prodData.variations.map(v => v.attribute_name))];
  setAttributes(attrs);
  setVariations(prodData.variations);

  if (attrs.length > 0) {
    // const firstAttr = attrs[0];
    // setSelectedAttribute(firstAttr);

    // const related = prodData.variations.filter(v => v.attribute_name === firstAttr);
    // Prefer "One Time Service" if available, else fallback to first
const defaultAttr = attrs.includes("One Time Service") ? "One Time Service" : attrs[0];
setSelectedAttribute(defaultAttr);

const related = prodData.variations.filter(v => v.attribute_name === defaultAttr);

    const sorted = [...related].sort((a, b) => {
      const num = v => {
        const m = String(v?.data?.variation).match(/\d+/);
        return m ? parseInt(m[0], 10) : Number.POSITIVE_INFINITY;
      };
      return num(a) - num(b);
    });

    if (sorted.length) setSelectedVariation(sorted[0].data); // -> 1 BHK
  }
}

  }, [prodData]);

  useEffect(() => {
    const calculatePrice = () => {
      if (selectedVariation) {
        const price = Number(selectedVariation.discounted_variation_price);
        const originalPrice = Number(selectedVariation.price);
        const tax =
          prodData.tax_type === "amount"
            ? Number(prodData.tax)
            : (Number(prodData.tax) / 100) * parseInt(price);

        setTaxAmount(Number(tax?.toFixed(2)));
        setTotalAmount(Number(price));
        setState((prev) => ({
          ...prev,
          total_amount: Number(price),
        }));

        const discount = originalPrice - price;
        const discountPercentage = (discount / originalPrice) * 100;

        setDiscountPercentage(Math.round(discountPercentage));
      } else {
        setTotalAmount(Number(prodData?.discounted_price));
        setState((prev) => ({
          ...prev,
          total_amount: Number(prodData?.discounted_price),
        }));
        setDiscountPercentage(0);
      }
    };
    calculatePrice();
  }, [selectedVariation, prodData]);

  const handleAttributeSelect = (attr) => {
  setSelectedAttribute(attr);

  const related = variations.filter(v => v.attribute_name === attr);
  if (related.length) {
    const sorted = [...related].sort((a, b) => {
      const num = v => {
        const m = String(v?.data?.variation).match(/\d+/);
        return m ? parseInt(m[0], 10) : Number.POSITIVE_INFINITY;
      };
      return num(a) - num(b);
    });

    setSelectedVariation(sorted[0].data); // -> resets to 1 BHK
  } else {
    setSelectedVariation(null);
  }
};


  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation.data);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? imageItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === imageItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (mediaItems) {
      setImageItems(mediaItems.filter((item) => item.media === "Image"));
      setVideoItems(mediaItems.filter((item) => item.media === "Video"));
    }
  }, [mediaItems]);

  const renderMedia = (item) => {
    return (
      <img
        className="w-full h-full object-contain"
        src={item?.image_url}
        title={item?.image_title}
        alt={item?.alt_tag}
        onLoad={() => {
          console.log("loaded");
        }}
      />
    );
  };

  const extractYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderYouTubeVideo = (url) => {
    const videoId = extractYouTubeVideoId(url);

    if (!videoId) {
      console.error("Invalid YouTube URL:", url);
      return <p>Invalid YouTube URL</p>;
    }

    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Product Video"
      ></iframe>
    );
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleTagClick = (tag) => {
    const slug = prodData?.product_name?.toLowerCase().replace(/ /g, "-");
    navigate(`${config.VITE_BASE_URL}/product/${slug}/tag/${tag.trim()}`);
    window.location.reload();
  };

  const visibleItems = prodRelatedProds?.slice(
    currentIndex,
    currentIndex + visibleItemsCount
  );

  const addBtn = () => {
    const totalCart = cart.filter((ct) => ct.product_id === prodData.id);
    const specificCart = totalCart?.filter(
      (ct) => ct?.variation == selectedVariation?.id
    );

    if (isAddingToCart) {
      return (
        <div
          className="w-[109px] h-[35px] flex items-center justify-center rounded-lg"
          style={{ border: "1px solid #249370" }}
        >
          <span className="loader"></span>
        </div>
      );
    }

    if (specificCart.length !== 0) {
      return (
        <div
          className="w-[109px] h-[35px] flex flex-row justify-around items-center text-2xl font-semibold rounded-lg"
          style={{ border: "1px solid #249370" }}
        >
          <button
            onClick={() =>
              handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty - 1)
            }
            style={{ color: "#249370" }}
          >
            -
          </button>
          <span style={{ color: "#249370" }}>{specificCart[0]?.qty}</span>
          <button
            onClick={() =>
              handleQtyUpdate(specificCart[0]?.id, specificCart[0]?.qty + 1)
            }
            style={{ color: "#249370" }}
          >
            +
          </button>
        </div>
      );
    } else if (totalCart.length !== 0) {
      return (
        <div
          className="w-[109px] h-[35px] flex flex-row justify-around items-center text-2xl font-semibold rounded-lg"
          style={{ border: "1px solid #249370" }}
        >
          <button
            onClick={() =>
              handleQtyUpdate(totalCart[0]?.id, totalCart[0]?.qty - 1)
            }
            style={{ color: "#249370" }}
          >
            -
          </button>
          <span style={{ color: "#249370" }}>{totalCart[0]?.qty}</span>
          <button
            onClick={() =>
              handleQtyUpdate(totalCart[0]?.id, totalCart[0]?.qty + 1)
            }
            style={{ color: "#249370" }}
          >
            +
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="bg-black h-[40px] sm:h-[48px] w-[100px] sm:w-[125px] rounded-lg px-4 py-2 text-white"
          style={{ backgroundColor: "#249370" }}
          onClick={handleAddToCart}
        >
          Add
        </button>
      );
    }
  };

  const locations = prodData?.location?.split("|") || [];
  const currentLocation =
    location?.charAt(0)?.toUpperCase() + location?.slice(1);
  const currentLocationTitle =
    location && currentLocation ? ` in ${currentLocation}` : "";

  // Generate canonical URL based on the current location
  const generateCanonicalUrl = () => {
    // Base URL from your config
    const baseUrl = config.VITE_BASE_URL || "https://www.hommlie.com";

    // Determine the path based on current parameters
    let path = `/product/${slug}`;

    // Complete canonical URL
    return `${baseUrl}${path}`;
  };


  const [selectedTab, setSelectedTab] = useState("testimonials");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Testimonials Data
  const testimonials = [
    { question: "Pets", answer: "The treatment is 100% safe for pets." },
    { question: "Kids & Elders", answer: "No harmful chemicals are used, safe for kids and elders." },
    { question: "Very professional and informative", answer: "Technicians explained everything clearly and were very professional." },
    { question: "Not a single cockroach!", answer: "After the service, cockroaches were completely gone." },
  ];

  // ✅ FAQs Data
  const faqs = [
    {
      question: "How to get rid of cockroaches permanently?",
      answer:
        "Cockroaches can be controlled with a 4D treatment plan involving sanitation, baiting, and sealing cracks. Regular professional service ensures permanent results."
    },
    {
      question: "Is it worth booking cockroach control services?",
      answer:
        "Yes, professional services use safe and effective methods to eliminate cockroaches quickly, reducing health risks and future infestations."
    },
    {
      question: "How is a 4D cockroach control service different from a standard cockroach control service?",
      answer:
        "The 4D service includes advanced monitoring, baiting, residual spray, and preventive measures, making it more effective than standard sprays."
    },
    {
      question: "What is the cost of 4D cockroach control?",
      answer:
        "Costs vary depending on property size and duration of contract (single service vs. annual/biannual contracts)."
    },
    {
      question: "What is the method used in 4D cockroach pest control?",
      answer:
        "It involves gel baiting, residual spray treatment, traps, and sealing entry points to ensure long-term protection."
    },
    {
      question: "Do I need to leave my house during a cockroach treatment?",
      answer:
        "Usually not required, as treatments are safe for children and pets. However, you may leave temporarily if advised by the technician."
    }
  ];

  // ✅ Pick current list (based on selected tab)
  const currentList = selectedTab === "testimonials" ? testimonials : faqs;

  const [isDescOpen, setIsDescOpen] = useState(false);

  return (
    <main className="bg-white container mx-auto px-4 sm:px-5 lg:px-6 max-w-7xl flex flex-col md:p-4 lg:space-x-4 mb-2 scroll-smooth"
   >
             <ShareButton />
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      ) : (
        <>
          {/* Dynamic Meta Tags */}
          <Helmet>
            <title>{prodData.meta_title || "Hommlie services"}</title>
            <meta
              name="description"
              content={prodData.meta_description || "Hommlie services"}
            />
            <link rel="canonical" href={generateCanonicalUrl()} />
          </Helmet>

          {/* <nav className="flex space-x-1 lg:space-x-2 text-gray-500 text-xs lg:text-base mt-4 md:mt-0 ml-4">
            <NavLink to="/" className="text-blue-500">
              Home
            </NavLink>
            <span>/</span>
            <span>Product</span>
            {tag ? (
              <>
                <span>/</span>
                <span>{tag}</span>
              </>
            ) : (
              <>
                <span>/</span>
                <span>{prodData?.product_name}</span>
              </>
            )}
          </nav> */}

          <section className="flex flex-col-reverse lg:flex-row lg:space-x-4 scroll-smooth">
            <div className="flex-1 space-y-6 lg:w-2/3">
              <LoginSignup
                isOpen={isModalOpen}
                onClose={closeModal}
                checkoutPd={checkoutPd}
              />

              <section className="bg-white rounded-lg md:p-4 md:mb-6 border border-black mt-5 md:mt-10">
                <div className="relative h-[250px] lg:h-[400px]">
                  {imageItems.length > 0 && (
                    <div className="w-full h-full">
                      {renderMedia(imageItems[currentMediaIndex])}
                    </div>
                  )}
                  {imageItems.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevMedia}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        <IoIosArrowBack />
                      </button>
                      <button
                        onClick={handleNextMedia}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        <IoIosArrowForward />
                      </button>
                    </>
                  )}
                </div>
              </section>

              <section className="block md:hidden lg:w-1/3 h-fit space-y-4">
                {/* <div className="bg-white rounded-lg p-4 mb-4 glow-border">
                  <div className="flex justify-between items-center">
                    
                    <div className="flex flex-row items-center">
                      <img
                        src={cartBag}
                        alt="Hommlie Cart"
                        className="w-[34px] h-[34px] p-[7px] rounded-full"
                        style={{ backgroundColor: "#EEF4FF" }}
                      />
                      <p className="text-lg font-medium ml-2">Cart</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p
                        className="text-xs font-semibold w-[18px] h-[18px] rounded-full flex justify-center items-center text-white"
                        style={{
                          backgroundColor: `${
                            cartLength == undefined || cartLength === 0
                              ? "#929B9B"
                              : "#FF3269"
                          }`,
                        }}
                      >
                        {cartLength == undefined || cartLength === 0
                          ? 0
                          : cartLength}
                      </p>
                      <p className="text-base font-semibold ml-2">Item Added</p>
                    </div>
                  </div>
                </div> */} 
                
                {variations.length > 0 && (
                  <div className="bg-white rounded-lg p-4 space-y-4 border border-black">
                    <div className="px-4 md:px-0 flex flex-col md:flex-row gap-4 justify-between block md:hidden  rounded-lg p-4 space-y-4 border border-black">
                      <div className="space-y-1 sm:space-y-3 lg:space-y-4">
                        <p className="text-[20px] sm:text-4xl font-bold mb-2">
                          {prodData?.product_name}
                        </p>
                        {/* <div className="flex items-center mb-2">
                          <MdStars
                            className="text-base md:text-2xl"
                            color="#FF3269"
                          />
                          <p className="text-base md:text-xl font-normal ml-2">
                            {reviewData?.avg_ratting} ({reviewData?.total} reviews)
                          </p>
                        </div> */}
                        <Rating value={reviewData?.avg_ratting ?? 4.9} count={reviewData?.total ?? "1.4k"} />
                        <p className="flex items-center">
                          <span className="text-xl md:text-3xl font-bold">
                            ₹
                            {selectedVariation
                              ? selectedVariation.discounted_variation_price
                              : prodData?.discounted_price}
                          </span>
                          <span
                            className="line-through text-lg md:text-2xl sm:text-3xl font-light ml-4"
                            style={{ color: "#545454" }}
                          >
                            ₹
                            {selectedVariation
                              ? selectedVariation.price
                              : prodData?.product_price}
                          </span>
                          {prodData?.est_shipping_days != 0 ? (
                            <span
                              className="flex flex-row items-center gap-2 text-base sm:text-2xl font-normal ml-8"
                              style={{ color: "#545454" }}
                            >
                              <CiClock1 />
                              {prodData?.est_shipping_days}
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">Select Frequency</h3>
                    {/* <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {attributes.map((attr) => (
                          <button
                            key={attr}
                            className={`w-full p-3 rounded-lg border ${
                              selectedAttribute === attr
                                ? "bg-[#10847E] text-white"
                                : "border-gray-300"
                            }`}
                            onClick={() => handleAttributeSelect(attr)}
                          >
                            <div className="flex items-center justify-between">
                              <span>{attr}</span>
                              <IoCheckmarkCircleSharp
                                className={`text-xl ${
                                  selectedAttribute === attr
                                    ? "text-white"
                                    : "text-gray-300"
                                }`}
                              />
                            </div>
                          </button>
                        ))}
                      </div>

                      {selectedAttribute && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Select BHK
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {variations
                              .filter(
                                (v) => v.attribute_name === selectedAttribute
                              )
                              .map((variation) => (
                                <button
                                  key={variation.data.id}
                                  className={`w-full p-3 rounded-lg border ${
                                    selectedVariation?.id === variation.data.id
                                      ? "bg-[#10847E] text-white"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleVariationSelect(variation)
                                  }
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {variation.data.variation}
                                    </span>
                                    <IoCheckmarkCircleSharp
                                      className={`text-xl ${
                                        selectedVariation?.id ===
                                        variation.data.id
                                          ? "text-white"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </div>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div> */}
                    <div className="space-y-4">
  <div className="grid grid-cols-2 gap-2">
    {[...attributes]
      .sort((a, b) => {
        // Ensure "One Time Service" or first attribute always comes first
        if (a === "One Time Service") return -1;
        if (b === "One Time Service") return 1;
        return 0;
      })
      .map((attr, index) => (
        <button
          key={attr}
          className={`w-full p-3 rounded-lg border ${
            // if no selection yet, auto-pick first attribute
            (selectedAttribute || attributes[0]) === attr
              ? "bg-[#0463ac] text-white"
              : "border-gray-300"
          }`}
          onClick={() => handleAttributeSelect(attr)}
        >
          <div className="flex items-center justify-between">
            <span>{attr}</span>
            <IoCheckmarkCircleSharp
              className={`text-xl ${
                (selectedAttribute || attributes[0]) === attr
                  ? "text-white"
                  : "text-gray-300"
              }`}
            />
          </div>
        </button>
      ))}
  </div>

  {(selectedAttribute || attributes[0]) && (
    <div>
      <h3 className="text-xl font-semibold mb-2">Select BHK</h3>
      <div className="grid grid-cols-2 gap-2">
        {variations
          .filter(
            (v) => v.attribute_name === (selectedAttribute || attributes[0])
          )
          .sort((a, b) => {
            // Extract number from "X BHK" and sort ascending
            const numA = parseInt(a.data.variation);
            const numB = parseInt(b.data.variation);
            return numA - numB;
          })
          .map((variation, index) => (
            <button
              key={variation.data.id}
              className={`w-full p-3 rounded-lg border ${
                // if no selection yet, auto-pick first variation (1 BHK)
                (selectedVariation?.id ||
                  variations.find(
                    (v) =>
                      v.attribute_name === (selectedAttribute || attributes[0])
                  )?.data.id) === variation.data.id
                  ? "bg-[#10847E] text-white"
                  : "border-gray-300"
              }`}
              onClick={() => handleVariationSelect(variation)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{variation.data.variation}</span>
                <IoCheckmarkCircleSharp
                  className={`text-xl ${
                    (selectedVariation?.id ||
                      variations.find(
                        (v) =>
                          v.attribute_name ===
                          (selectedAttribute || attributes[0])
                      )?.data.id) === variation.data.id
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                />
              </div>
            </button>
          ))}
      </div>
    </div>
  )}
</div>



                    {selectedVariation && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold mb-2">
                            {selectedAttribute} ({selectedVariation.variation})
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-[#249370]">
                            ₹{selectedVariation.discounted_variation_price}
                          </span>
                          <span className="text-sm line-through text-gray-500">
                            ₹{selectedVariation.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {selectedVariation.description}
                        </p>
                        {selectedVariation.variation_times &&
                          selectedVariation.variation_interval && (
                            <>
                              <p className="text-sm text-gray-600">
                                No. of Services :{" "}
                                {selectedVariation.variation_times} Times
                              </p>
                              <p className="text-sm text-gray-600">
                                Scheduled every :{" "}
                                {selectedVariation.variation_interval} Days
                              </p>
                            </>
                          )}
                      </div>
                    )}
                  </div>
                )}

                {prodData?.is_form === 0 && (
                  <div className="bg-white rounded-lg px-10 py-4 space-y-4 mb-4 border border-black">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <BiSolidOffer className="text-2xl text-[#249370] mr-2" />
                        <h2 className="text-lg font-semibold">Coupons</h2>
                      </div>
                      <button
                        onClick={openCouponModal}
                        style={{
                          border: "1px solid #249370",
                          color: "#249370",
                        }}
                        className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Explore Now
                      </button>
                    </div>
                    <div
                      className="mb-2"
                      style={{ border: "1px dotted #E5E7EB" }}
                    ></div>
                    <div style={{ color: "rgba(0,0,0,0.4)" }}>
                      {selectedCoupon && Object.keys(selectedCoupon).length ? (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <IoCheckmarkCircle className="text-[#249370] mr-2" />
                            <span className="font-semibold">
                              {selectedCoupon?.coupon_name}
                            </span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ) : coupons?.length ? (
                        <p className="font-semibold">
                          You have unlocked{" "}
                          <span className="text-[#249370]">
                            {coupons?.length} new coupons
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}

                {prodData?.is_form === 0 && (
                  <div className="bg-white rounded-lg px-10 py-4 space-y-4 mb-4 border border-black">
                    <h3 className="text-xl font-semibold">Payment Summary</h3>
                    <div className="space-y-2">
                      <div className="flex flex-row justify-between">
                        <p
                          className="text-base font-normal"
                          style={{ color: "#606571" }}
                        >
                          Service Price
                        </p>
                        <p className="text-base font-semibold">
                          ₹
                          {selectedVariation
                            ? selectedVariation.price
                            : prodData?.product_price}
                        </p>
                      </div>
                      {discountPercentage ? (
                        <div className="flex flex-row justify-between">
                          <p
                            className="text-base font-normal"
                            style={{ color: "#606571" }}
                          >
                            Service Discount
                          </p>
                          <p className="text-base font-semibold">{`₹${Math.floor(
                            ((selectedVariation
                              ? selectedVariation.price
                              : prodData?.product_price) *
                              discountPercentage) /
                              100
                          )} (${discountPercentage}%)`}</p>
                        </div>
                      ) : null}
                      <div className="flex flex-row justify-between">
                        <p
                          className="text-base font-normal"
                          style={{ color: "#606571" }}
                        >
                          Discounted Price
                        </p>
                        <p className="text-base font-semibold">
                          ₹{totalAmount}
                        </p>
                      </div>
                      {couponDiscount ? (
                        <div className="flex flex-row justify-between">
                          <p
                            className="text-base font-normal"
                            style={{ color: "#606571" }}
                          >
                            Coupon Discount
                          </p>
                          <p className="text-base font-semibold">
                            ₹{couponDiscount}
                          </p>
                        </div>
                      ) : null}
                      <div className="flex flex-row justify-between">
                        <p
                          className="text-base font-normal"
                          style={{ color: "#606571" }}
                        >
                         Platform Fee
                        </p>
                        <p className="text-base font-semibold">₹{taxAmount}</p>
                      </div>
                      <div
                        className="border-t-2 border-dotted border-black"
                        style={{ opacity: 0.22 }}
                      ></div>
                      <div className="flex flex-row justify-between">
                        <p className="text-base font-normal text-xl font-semibold">
                          Total Amount
                        </p>
                        <div className="text-right">
                          <p className="text-base font-semibold">
                            ₹
                            {Number(
                              totalAmount + taxAmount - couponDiscount
                            )?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        className="uppercase w-full text-center h-[52px] text-white rounded-md text-base font-bold"
                        style={{ backgroundColor: "#249370" }}
                        onClick={handleProceed}
                        id="proceed-btn"
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    </div>
                  </div>
                )}

                {prodData?.is_form === 1 && (
                  <div className="bg-white rounded-lg px-10 py-4 space-y-4 mb-4 border border-black">
                    <h3 className="text-xl font-semibold">
                      Book an Inspection
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <LocationSuggestion
                          value={formData.address}
                          onChange={handleFormChange}
                          name="address"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleFormChange}
                          className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                          required
                          minLength={10}
                          maxLength={10}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                          required
                        />
                      </div>

                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date
                          </label>
                          <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <label
                            htmlFor="time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Time
                          </label>
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleFormChange}
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                          >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot, index) => (
                              <option key={index} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="uppercase w-full text-center h-[52px] text-white rounded-md text-base font-bold bg-[#249370] hover:bg-[#1e7a5c]"
                      >
                        Schedule for Inspection
                      </button>
                      <div className="flex gap-2">
                        <div>
                          <label
                            htmlFor="width"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Width (ft)
                          </label>
                          <select
                            id="width"
                            name="width"
                            value={formData.width}
                            onChange={handleFormChange}
                            className="mt-1 p-2.5 mr-10 border border-[#10847E] block w-full rounded-md shadow-sm"
                            // required
                          >
                            <option value="" hidden>
                              Select Width
                            </option>
                            {[...Array(120 - 1)]?.map((_, index) => {
                              const value = 1 + index;
                              return (
                                <option key={value} value={value}>
                                  {value} sqft
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="lengthMm"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Length (ft)
                          </label>
                          <input
                            type="number"
                            id="length"
                            name="length"
                            value={formData.length}
                            onChange={handleFormChange}
                            min="1"
                            // max="3000"
                            className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                            // required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="sqft"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sqft
                          </label>
                          <input
                            type="text"
                            id="sqft"
                            value={formData.sqft ? `${formData.sqft} sqft` : ""}
                            className="bg-[#eee] mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                            // readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Approx. Amount:
                        </label>
                        <span className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm">
                          ₹{formData.total_amount}
                        </span>
                      </div>
                    </form>
                  </div>
                )}
              </section>

              {/* <div className="features-section ">
                <div className="features-box -mt-5">
                  <h2 className="features-heading">Service Features</h2>
                  <ul>
                    <li>
                      <strong>Deny Shelter</strong> with natural dust, drain enzymes in their hideouts; close the cracks, crevices with silicon gel
                    </li>
                    <li>
                      <strong>Deny Food</strong> using Sustainable Compostable Garbage Bags that have repellent effect
                    </li>
                    <li>
                      <strong>Destroy & Control</strong> with traps, gel baiting to kill hidden colonies & spray treatment for visible roaches
                    </li>
                    <li>
                      <strong>Digital Monitoring</strong> of end-to-end service treatment to maximize effectiveness with 100% safety
                    </li>
                  </ul>

                  <h2 className="service-feature">Scientifically designed service interventions</h2>
                  <h2 className="service-feature">100% safe & minimized use of synthetic chemicals</h2>
                  <h2 className="service-feature">Complementary Ant Treatment</h2>
                  <h2 className="service-feature">Single Service do not include warranty or complaint support unlike 1 and 2 year contract</h2>

              
                  <h2 className="section-heading">Details</h2>
                  <h3 className="service-feature">Video:</h3>
                  <div className="video-container">
                    <iframe
                      src="https://www.youtube.com/embed/VIDEO_ID"
                      title="Professional Cockroach Control"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="space">
                    <h3 className="service-feature">Visits:</h3>
                    <p className="visit">
                      Single Service – 1 Service <br />
                      1 Year AMC – 3 services, 1 every 4 months <br />
                      2 Year AMC – 6 services, 1 every 4 months
                    </p>

                    <h3 className="service-feature">Manpower:</h3>
                    <p className="visit">1 for each visit</p>
        
                   <h2 className="section-heading">Terms & Conditions</h2>
                    <div className="visit">
                      <h3 className="bullet-point">Efficacy will be effective post 15 days of service</h3>
                      <h3 className="bullet-point">Service needs to be taken within 30 days of the scheduled date</h3>
                      <h3 className="bullet-point">Important to maintain the hygiene of the kitchen for best effectiveness</h3>
                    </div>

                 
                    <h2 className="section-heading">Safety Precautions</h2>
                    <div className="visit">
                      <h3 className="bullet-point">3-Line of Defence to provide Covid Suraksha Kavach</h3>
                      <h3 className="bullet-point">Chemical is safe for kids, elderly people & pets</h3>
                    </div>
                  </div>
                </div>
              </div> */}

               {/* <div className="tabs-section ">
              
                <div className="tabs-header rounded-lg glow-border -mt-5">
                  <button
                    className={`tab-btn ${selectedTab === "testimonials" ? "active" : ""}`}
                    onClick={() => setSelectedTab("testimonials")}
                  >
                    Testimonials
                  </button>
                  <button
                    className={`tab-btn ${selectedTab === "faqs" ? "active" : ""}`}
                    onClick={() => setSelectedTab("faqs")}
                  >
                    FAQ's
                  </button>
                </div>

                
                <div className="tabs-content rounded-lg p-4 glow-border bg-white">
                  {currentList.map((item, index) => (
                    <div
                      key={index}
                      className={`faq-item ${openIndex === index ? "active" : ""}`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleFAQ(index)}
                      >
                        <span>{item.question}</span>
                        <span className="faq-icon">
                          {openIndex === index ? "−" : "+"}
                        </span>
                      </button>

                      {openIndex === index && (
                        <div className="faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}

              <section className="bg-white rounded-lg p-4 border border-black">
                <ul
                  className="flex mb-3"
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                >
                  <li
                    className={`mr-1 ${
                      activeTab === 1 ? "border-[#035240]" : ""
                    }`}
                  >
                    <button
                      className={`inline-block py-2 px-4 text-[#035240] ${
                        activeTab === 1 ? "font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(1)}
                      style={{
                        borderBottom:
                          activeTab === 1 ? "2px solid #20B526" : "none",
                      }}
                    >
                      Descriptions
                    </button>
                  </li>
                  <li
                    className={`mr-1 ${
                      activeTab === 2 ? "border-[#035240]" : ""
                    }`}
                  >
                    {/* <button
                      className={`hidden sm:inline-block py-2 px-4 text-[#035240] ${
                        activeTab === 2 ? "font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(2)}
                      style={{
                        borderBottom:
                          activeTab === 2 ? "2px solid #20B526" : "none",
                      }}
                    >
                      Frequently Ask Question
                    </button> */}
                    {/* <button
                      className={`inline-block sm:hidden py-2 px-4 text-[#035240] ${
                        activeTab === 2 ? "font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(2)}
                      style={{
                        borderBottom:
                          activeTab === 2 ? "2px solid #20B526" : "none",
                      }}
                    >
                      FAQs
                    </button> */}
                  </li>
                  <li
                    className={`mr-1 ${
                      activeTab === 3 ? "border-[#035240]" : ""
                    }`}
                  >
                    {/* <button
                      className={`hidden sm:inline-block py-2 px-4 text-[#035240] ${
                        activeTab === 3 ? "font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(3)}
                      style={{
                        borderBottom:
                          activeTab === 3 ? "2px solid #20B526" : "none",
                      }}
                    >
                      Customer Feedback
                    </button> */}
                    <button
                      className={`inline-block sm:hidden py-2 px-4 text-[#035240] ${
                        activeTab === 3 ? "font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(3)}
                      style={{
                        borderBottom:
                          activeTab === 3 ? "2px solid #20B526" : "none",
                      }}
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
                <div>
                  <div className="product-description">
                    {/* Toggle Button */}
                    <button
                      className="dropdown-toggle"
                      onClick={() => setIsDescOpen(!isDescOpen)}
                    >
                      {isDescOpen ? "Hide Description ▲" : "Show Description ▼"}
                    </button>

                    {/* Dropdown Content */}
                    {isDescOpen && (
                      <div
                        className="dropdown-content space-y-4 prose prose-sm sm:prose lg:prose-base max-w-none lg:max-w-[900px]"
                        dangerouslySetInnerHTML={{
                          __html: prodData?.description,
                        }}
                      />
                    )}
                  </div>
                  {/* {activeTab === 2 && (
                    <div
                      className="space-y-4 prose prose-sm sm:prose lg:prose-base max-w-none"
                      dangerouslySetInnerHTML={{ __html: prodData?.faqs }}
                    />
                  )} */}
                  {activeTab === 3 && (
                    <div className="p-4 space-y-6">
                      {prodData?.rattings.map((ratting, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex items-start space-x-4">
                            {/* <div className="flex-shrink-0">
                                                    <div className="h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                                        <span className="text-xl font-bold text-gray-600">
                                                            {user?.name ? user?.name : "Unknown"}
                                                        </span>
                                                    </div>
                                                </div> */}
                            <div className="flex-grow">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800">
                                  {user?.name ? user?.name : "Unknown"}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(
                                    ratting?.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[1].map((star, index) => {
                                  if (index != ratting?.ratting) {
                                    return (
                                      <svg
                                        key={star}
                                        className={`w-5 h-5 ${
                                          star <= ratting?.ratting
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    );
                                  }
                                })}
                                <span className="ml-2 text-sm font-medium text-gray-500">
                                  {ratting?.ratting} out of 5
                                </span>
                              </div>
                              <p className="text-gray-700 mt-2">
                                "{ratting?.comment}"
                              </p>
                              {ratting?.assigned_to ? (
                                <p className="text-gray-700 mt-2">
                                  Technician: {ratting?.assigned_to}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ))}
                      {prodData?.rattings.length === 0 && (
                        <div className="text-center text-gray-500">
                          No reviews yet. Be the first to leave a review!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* {videoItems?.length > 0 && (
                <section className="bg-white rounded-lg mt-6">
                 
                  <div className="">
                    {videoItems?.map((video, index) => (
                      <div key={index} className="video-container h-[500px]">
                        {renderYouTubeVideo(video.image_url)}
                      </div>
                    ))}
                  </div>
                </section>
              )} */}
            </div>

                <div className="hidden md:block md:sticky top-48 z-10  lg:w-1/3 h-fit space-y-4 mt-[40px] ">
                  <div className="bg-white rounded-lg p-4 mb-4 border border-black px-4 md:px-3 hidden md:flex flex-col md:flex-row gap-4 justify-between">
                    <div className="space-y-1 sm:space-y-3 lg:space-y-4">
                      <p className="text-2xl sm:text-2xl font-bold mb-2">
                        {prodData?.product_name}
                      </p>
                      {/* <div className="flex items-center mb-2">
                        <MdStars
                          className="text-base md:text-2xl"
                          color="#FF3269"
                        />
                        <p className="text-base md:text-xl font-normal ml-2">
                          {reviewData?.avg_ratting} ({reviewData?.total} reviews)
                        </p>
                      </div> */}
                      <Rating value={reviewData?.avg_ratting ?? 4.9} count={reviewData?.total ?? "1.4k"} />
                      <p className="flex items-center">
                        <span className="text-xl md:text-3xl font-bold">
                          ₹
                          {selectedVariation
                            ? selectedVariation.discounted_variation_price
                            : prodData?.discounted_price}
                        </span>
                        <span
                          className="line-through text-lg md:text-2xl sm:text-3xl font-light ml-4"
                          style={{ color: "#545454" }}
                        >
                          ₹
                          {selectedVariation
                            ? selectedVariation.price
                            : prodData?.product_price}
                        </span>
                        {prodData?.est_shipping_days != 0 ? (
                          <span
                            className="flex flex-row items-center gap-2 text-base sm:text-2xl font-normal ml-8"
                            style={{ color: "#545454" }}
                          >
                            <CiClock1 />
                            {prodData?.est_shipping_days}
                          </span>
                        ) : null}
                      </p>
                    </div>
                    {/* <div>
                      {addBtn()}
                    </div> */}
                  </div>
              {/* <div className="bg-white rounded-lg p-4 mb-4 glow-border">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row items-center">
                    <img
                      src={cartBag}
                      alt="Hommlie Cart"
                      className="w-[34px] h-[34px] p-[7px] rounded-full"
                      style={{ backgroundColor: "#EEF4FF" }}
                    />
                    <p className="text-lg font-medium ml-2">Cart</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p
                      className="text-xs font-semibold w-[18px] h-[18px] rounded-full flex justify-center items-center text-white"
                      style={{
                        backgroundColor: `${
                          cartLength == undefined || cartLength === 0
                            ? "#929B9B"
                            : "#FF3269"
                        }`,
                      }}
                    >
                      {cartLength == undefined || cartLength === 0
                        ? 0
                        : cartLength}
                    </p>
                    <p className="text-base font-semibold ml-2">Item Added</p>
                  </div>
                </div>
              </div> */}

              {variations.length > 0 && (
                <div className="bg-white rounded-lg p-4 space-y-4 border border-black">
                  <h3 className="text-xl font-semibold">Select Frequency</h3>
                  {/* <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {attributes.map((attr) => (
                        <button
                          key={attr}
                          className={`w-full p-2 rounded-lg border text-sm ${
                            selectedAttribute === attr
                              ? "bg-[#10847E] text-white"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleAttributeSelect(attr)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{attr}</span>
                            <IoCheckmarkCircleSharp
                              className={`text-lg ${
                                selectedAttribute === attr ? "text-white" : "text-gray-300"
                              }`}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                    {selectedAttribute && (
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Select BHK
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {variations
                            .filter(
                              (v) => v.attribute_name === selectedAttribute
                            )
                            .map((variation) => (
                              <button
                                key={variation.data.id}
                                className={`w-full p-3 rounded-lg border ${
                                  selectedVariation?.id === variation.data.id
                                    ? "bg-[#10847E] text-white"
                                    : "border-gray-300"
                                }`}
                                onClick={() => handleVariationSelect(variation)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">
                                    {variation.data.variation}
                                  </span>
                                  <IoCheckmarkCircleSharp
                                    className={`text-xl ${
                                      selectedVariation?.id ===
                                      variation.data.id
                                        ? "text-white"
                                        : "text-gray-300"
                                    }`}
                                  />
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div> */}
                  <div className="space-y-4">
  <div className="grid grid-cols-2 gap-2">
    {[...attributes].sort((a, b) => {
      // Ensure "One Time Service" comes first
      if (a === "One Time Service") return -1;
      if (b === "One Time Service") return 1;
      return 0;
    }).map((attr) => (
      <button
        key={attr}
        className={`w-full p-3 rounded-lg border ${
          selectedAttribute === attr
            ? "bg-[#0463ac] text-white"
            : "border-gray-300"
        }`}
        onClick={() => handleAttributeSelect(attr)}
      >
        <div className="flex items-center justify-between">
          <span>{attr}</span>
          <IoCheckmarkCircleSharp
            className={`text-xl ${
              selectedAttribute === attr ? "text-white" : "text-gray-300"
            }`}
          />
        </div>
      </button>
    ))}
  </div>

  {selectedAttribute && (
    <div>
      <h3 className="text-xl font-semibold mb-2">Select BHK</h3>
      <div className="grid grid-cols-2 gap-2">
        {variations
          .filter((v) => v.attribute_name === selectedAttribute)
          .sort((a, b) => {
            // Extract number from "X BHK" and sort ascending
            const numA = parseInt(a.data.variation);
            const numB = parseInt(b.data.variation);
            return numA - numB;
          })
          .map((variation) => (
            <button
              key={variation.data.id}
              className={`w-full p-3 rounded-lg border ${
                selectedVariation?.id === variation.data.id
                  ? "bg-[#0463ac] text-white"
                  : "border-gray-300"
              }`}
              onClick={() => handleVariationSelect(variation)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{variation.data.variation}</span>
                <IoCheckmarkCircleSharp
                  className={`text-xl ${
                    selectedVariation?.id === variation.data.id
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                />
              </div>
            </button>
          ))}
      </div>
    </div>
  )}
</div>

                  {selectedVariation && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold mb-2">
                          {selectedAttribute} ({selectedVariation.variation})
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-[#249370]">
                          ₹{selectedVariation.discounted_variation_price}
                        </span>
                        <span className="text-sm line-through text-gray-500">
                          ₹{selectedVariation.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedVariation.description}
                      </p>
                      {selectedVariation.variation_times &&
                        selectedVariation.variation_interval && (
                          <>
                            <p className="text-sm text-gray-600">
                              No. of Services :{" "}
                              {selectedVariation.variation_times} Times
                            </p>
                            <p className="text-sm text-gray-600">
                              Scheduled every :{" "}
                              {selectedVariation.variation_interval} Days
                            </p>
                          </>
                        )}
                    </div>
                  )}
                </div>
              )}

              {prodData?.is_form === 0 && (
                <div className="bg-white rounded-lg px-5 py-2 space-y-4 border border-black">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BiSolidOffer className="text-2xl text-[#249370] mr-2" />
                      <h2 className="text-lg font-semibold">Coupons</h2>
                    </div>
                    <button
                      onClick={openCouponModal}
                      style={{ border: "1px solid #249370", color: "#249370" }}
                      className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Explore Now
                    </button>
                  </div>
                  <div
                    className="mb-2"
                    style={{ border: "1px dotted #E5E7EB" }}
                  ></div>
                  <div style={{ color: "rgba(0,0,0,0.4)" }}>
                    {selectedCoupon && Object.keys(selectedCoupon).length ? (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <IoCheckmarkCircle className="text-[#249370] mr-2" />
                          <span className="font-semibold">
                            {selectedCoupon?.coupon_name}
                          </span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ) : coupons?.length ? (
                      <p className="font-semibold">
                        You have unlocked{" "}
                        <span className="text-[#249370]">
                          {coupons?.length} new coupons
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>
              )}

              {prodData?.is_form === 0 && (
                <div className="bg-white rounded-lg px-5 py-2 space-y-4 border border-black">
                  <h3 className="text-xl font-semibold">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex flex-row justify-between">
                      <p
                        className="text-base font-normal"
                        style={{ color: "#606571" }}
                      >
                        Service Price
                      </p>
                      <p className="text-base font-semibold">
                        ₹
                        {selectedVariation
                          ? selectedVariation.price
                          : prodData?.product_price}
                      </p>
                    </div>
                    {discountPercentage ? (
                      <div className="flex flex-row justify-between">
                        <p
                          className="text-base font-normal"
                          style={{ color: "#606571" }}
                        >
                          Service Discount
                        </p>
                        <p className="text-base font-semibold">{`₹${Math.floor(
                          ((selectedVariation
                            ? selectedVariation.price
                            : prodData?.product_price) *
                            discountPercentage) /
                            100
                        )} (${discountPercentage}%)`}</p>
                      </div>
                    ) : null}
                    <div className="flex flex-row justify-between">
                      <p
                        className="text-base font-normal"
                        style={{ color: "#606571" }}
                      >
                        Discounted Price
                      </p>
                      <p className="text-base font-semibold">₹{totalAmount}</p>
                    </div>
                    {couponDiscount ? (
                      <div className="flex flex-row justify-between">
                        <p
                          className="text-base font-normal"
                          style={{ color: "#606571" }}
                        >
                          Coupon Discount
                        </p>
                        <p className="text-base font-semibold">
                          ₹{couponDiscount}
                        </p>
                      </div>
                    ) : null}
                    <div className="flex flex-row justify-between">
                      <p
                        className="text-base font-normal"
                        style={{ color: "#606571" }}
                      >
                        Platform Fee
                      </p>
                      <p className="text-base font-semibold">₹{taxAmount}</p>
                    </div>
                    <div
                      className="border-t-2 border-dotted border-black"
                      style={{ opacity: 0.22 }}
                    ></div>
                    <div className="flex flex-row justify-between">
                      <p className="text-base font-normal text-xl font-semibold">
                        Total Amount
                      </p>
                      <div className="text-right">
                        <p className="text-base font-semibold">
                          ₹
                          {Number(
                            totalAmount + taxAmount - couponDiscount
                          )?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-[#0463ac] hover:bg-[#52852d] uppercase w-full text-center h-[52px] text-white rounded-md text-base font-bold"
                     
                      onClick={handleProceed}
                      id="proceed-btn"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              )}

              {prodData?.is_form === 1 && (
                <div className="bg-white rounded-lg px-10 py-4 space-y-4 mb-4 border border-black">
                  <h3 className="text-xl font-semibold">Book an Inspection</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <LocationSuggestion
                        value={formData.address}
                        onChange={handleFormChange}
                        name="address"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleFormChange}
                        className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                        required
                        minLength={10}
                        maxLength={10}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date
                        </label>
                        <DatePicker
                          selected={formData.date}
                          onChange={handleDateChange}
                          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Time
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleFormChange}
                          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          required
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="uppercase w-full text-center h-[52px] text-white rounded-md text-base font-bold bg-[#249370] hover:bg-[#1e7a5c]"
                    >
                      Schedule for Inspection
                    </button>
                    <div className="flex gap-2">
                      <div>
                        <label
                          htmlFor="width"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Width (ft)
                        </label>
                        <select
                          id="width"
                          name="width"
                          value={formData.width}
                          onChange={handleFormChange}
                          className="mt-1 p-2.5 mr-10 border border-[#10847E] block w-full rounded-md shadow-sm"
                          // required
                        >
                          <option value="" hidden>
                            Select Width
                          </option>
                          {[...Array(120 - 1)]?.map((_, index) => {
                            const value = 1 + index;
                            return (
                              <option key={value} value={value}>
                                {value} sqft
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="lengthMm"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Length (ft)
                        </label>
                        <input
                          type="number"
                          id="length"
                          name="length"
                          value={formData.length}
                          onChange={handleFormChange}
                          min="1"
                          // max="3000"
                          className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                          // required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="sqft"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sqft
                        </label>
                        <input
                          type="text"
                          id="sqft"
                          value={formData.sqft ? `${formData.sqft} sqft` : ""}
                          className="bg-[#eee] mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm"
                          // readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Approx. Amount:
                      </label>
                      <span className="mt-1 p-2 border border-[#10847E] block w-full rounded-md shadow-sm">
                        ₹{formData.total_amount}
                      </span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>

          <div className="flex flex-col gap-4 mt-4">
            <section className="bg-white rounded-lg w-full p-4 border border-black">
              <ProdSection
                title="Similar Services"
                items={visibleItems ? visibleItems : []}
                btnHidden
              />
            </section>

           <section className="w-full bg-white rounded-lg p-6 space-y-6 border border-green-300">
  {/* Locations Section */}
  {locations && locations?.length ? (
    <div>
      {/* Heading */}
      <h2 className="text-lg lg:text-2xl font-semibold text-[#10847E] mb-1">
        Quick Links
      </h2>
      <hr className="border-t-2 border-[#10847E] w-40 mb-4" />

      {/* Accordion Button */}
      <div
        className="bg-gray-100 rounded-md px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-200"
        onClick={toggleLocationsExpansion}
      >
        <span className="font-medium text-black">Available Locations</span>
        {isLocationsExpanded ? (
          <IoIosArrowUp className="text-black" />
        ) : (
          <IoIosArrowDown className="text-black" />
        )}
      </div>

      {/* Accordion Content */}
      {isLocationsExpanded && (
        <div className="mt-4 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations?.map((loc, index) => {
              const formattedLoc = loc.trim();
              const capitalizedLoc =
                formattedLoc.charAt(0).toUpperCase() +
                formattedLoc.slice(1);
              return (
                <a
                  key={index}
                  href={`${config.VITE_BASE_URL}/product/${
                    prodData.slug
                  }-in-${formattedLoc.toLowerCase()}/${formattedLoc.toLowerCase()}`}
                  className="text-[#10847E] hover:underline transition-colors"
                >
                  {prodData.product_name} in {capitalizedLoc}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  ) : null}

  {/* Keywords Section */}
  <div className="">
    {/* Heading */}
    {/* <h2 className="text-lg lg:text-2xl font-semibold text-[#10847E] mb-1">
      Keywords
    </h2>
    <hr className="border-t-2 border-[#10847E] w-28 mb-4" /> */}

    {/* Accordion Button */}
    <div
      className="bg-gray-100 rounded-md px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-200"
      onClick={toggleKeywordsExpansion}
    >
      <span className="font-medium text-black">Keywords</span>
      {isKeywordsExpanded ? (
        <IoIosArrowUp className="text-black" />
      ) : (
        <IoIosArrowDown className="text-black" />
      )}
    </div>

    {/* Accordion Content */}
    {isKeywordsExpanded && prodData?.tags && (
      <div className="mt-4 flex flex-wrap gap-3 transition-all duration-300 ease-in-out">
        {prodData.tags.split(",").map((tag, index) => (
          <a
            key={index}
            onClick={() => handleTagClick(tag)}
            className="px-3 py-1 text-sm rounded-md bg-[#E6F6F5] text-[#10847E] hover:bg-[#10847E] hover:text-white transition-colors cursor-pointer"
          >
            #{tag.trim()}
          </a>
        ))}
      </div>
    )}
  </div>
</section>

          </div>
        </>
      )}

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={closeCouponModal}
        totalAmount={totalAmount + taxAmount}
        cat_id={prodData.cat_id}
      />
      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
      />
    </main>
  );
}
