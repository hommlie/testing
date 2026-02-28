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
import { ChevronDown } from "lucide-react";
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
import Breadcrumb from "../../components/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

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
  const [isCartExpanded, setIsCartExpanded] = useState(false);

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
      const baseSlug = location ? slug.replace(`-in-${location.toLowerCase()}`, "") : slug;
      await axios
        .post(`${config.API_URL}/api/productdetails`, { slug: baseSlug })
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
    if (prodData && prodData.variations) {
      const attrs = [...new Set(prodData.variations.map(v => v.attribute_name))];
      setAttributes(attrs);
      setVariations(prodData.variations);

      if (attrs.length > 0) {
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
    <main className="bg-white container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex flex-col lg:space-x-8 pt-2 sm:pt-4 mb-12 scroll-smooth"
    >
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      ) : (
        <>
          {/* Dynamic Meta Tags */}
          <Helmet>
            <title>{prodData?.meta_title || "Hommlie services"}</title>
            <meta
              name="description"
              content={prodData?.meta_description || "Hommlie services"}
            />
            <link rel="canonical" href={generateCanonicalUrl()} />
          </Helmet>

          <Breadcrumb
            items={[
              {
                label: prodData?.category?.category_name,
                link: `${config.VITE_BASE_URL}/category/${prodData?.category?.slug}`
              },
              { label: prodData?.subcategory?.subcategory_name },
              { label: prodData?.product_name }
            ]}
          />
          <section className="flex flex-col-reverse lg:flex-row lg:space-x-10">
            <div className="flex-1 space-y-6 lg:w-7/12 lg:sticky lg:top-20 lg:self-start">
              <LoginSignup
                isOpen={isModalOpen}
                onClose={closeModal}
                checkoutPd={checkoutPd}
              />
              <section
                className="bg-transparent mt-0 md:mt-10 p-0 mb-6 border-none shadow-none"
              >
                <div
                  className="
                    relative
                    w-full
                    aspect-square
                    md:aspect-video
                    max-h-[500px]
                    overflow-hidden
                    rounded-2xl
                    bg-gray-50/50
                  "
                >
                  {imageItems.length > 0 && (
                    <div className="w-full h-full">
                      <img
                        src={imageItems[currentMediaIndex]?.image_url}
                        alt={imageItems[currentMediaIndex]?.alt_tag}
                        title={imageItems[currentMediaIndex]?.image_title}
                        className="w-full h-full object-contain"
                      />
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

                {imageItems.length > 1 && (
                  <div className="mt-3 flex items-center gap-2 overflow-x-auto">
                    {imageItems.map((it, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentMediaIndex(i)}
                        className={`flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-sm overflow-hidden border ${currentMediaIndex === i ? "border-[#249370]" : "border-gray-200"
                          }`}
                      >
                        <img
                          src={it.image_url}
                          alt={it.alt_tag}
                          title={it.image_title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </section>

              {/* Desktop-only: selected variation detail card below the image */}
              {selectedVariation && (
                <div className="hidden md:block mt-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative group">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-[#0463ac]/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-[#0463ac]/10 transition-colors"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold text-gray-900 leading-tight">
                        {selectedAttribute} <span className="text-gray-500 font-medium">({selectedVariation.variation})</span>
                      </h4>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl font-black text-[#0463ac]">
                          ₹{Number(selectedVariation.discounted_variation_price ?? 0).toFixed(2)}
                        </span>
                        <span className="text-sm font-medium text-gray-400 line-through">
                          ₹{Number(selectedVariation.price ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {selectedVariation.description && (
                      <div className="border-t border-dashed border-gray-200 pt-5 mt-2">
                        <ul className="grid grid-cols-1 gap-y-3">
                          {selectedVariation.description.split("|").map((desc, i) => (
                            <li key={i} className="flex items-start gap-3 group/item">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0463ac]/30 group-hover/item:bg-[#0463ac] transition-colors shrink-0"></div>
                              <span className="text-sm font-medium text-gray-600 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                                {desc.trim()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {(selectedVariation.variation_times || selectedVariation.variation_interval) && (
                      <div className="flex flex-wrap gap-4 mt-6 py-4 border-t border-gray-100 text-sm font-bold text-gray-700">
                        {selectedVariation.variation_times && (
                          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-gray-400">Total Services:</span>
                            <span>{selectedVariation.variation_times} Times</span>
                          </div>
                        )}
                        {selectedVariation.variation_interval && (
                          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-gray-400">Repeats every:</span>
                            <span>{selectedVariation.variation_interval} Days</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <section className="block md:hidden  space-y-4">
                {variations.length > 0 && (
                  <div className="space-y-4">
                    <div className="px-0 py-1 space-y-2">

                      {/* one single row: rating | price | time */}
                      <div className="flex flex-wrap items-center gap-4 py-1">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{selectedVariation
                              ? selectedVariation.discounted_variation_price
                              : prodData?.discounted_price}
                          </span>
                          <span className="text-sm font-medium text-gray-400 line-through">
                            ₹{selectedVariation ? selectedVariation.price : prodData?.product_price}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                          <Rating
                            value={reviewData?.avg_ratting ?? 4.9}
                            count={reviewData?.total ?? "1.4k"}
                          />
                        </div>

                        {/* Time */}
                        {prodData?.est_shipping_days != 0 && (
                          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                            <CiClock1 className="text-base" />
                            <span>{prodData?.est_shipping_days}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Select Frequency</h3>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-3">
                        {[...attributes]
                          .sort((a, b) => {
                            if (a === "One Time Service") return -1;
                            if (b === "One Time Service") return 1;
                            return 0;
                          })
                          .map((attr, index) => {
                            const isSelected = (selectedAttribute || attributes[0]) === attr;
                            return (
                              <button
                                key={attr}
                                className={`group relative w-full p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                                  ? "border-[#0463ac] bg-[#0463ac]/5 shadow-[0_0_0_1px_rgba(4,99,172,0.1)]"
                                  : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                                  }`}
                                onClick={() => handleAttributeSelect(attr)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`text-[15px] font-bold ${isSelected ? "text-[#0463ac]" : "text-gray-700"}`}>{attr}</span>
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-[#0463ac] border-[#0463ac]" : "border-gray-200"
                                    }`}>
                                    {isSelected && <IoCheckmark className="text-white text-xs font-bold" />}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                      </div>

                      {(selectedAttribute || attributes[0]) && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Select BHK</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {variations
                              .filter(
                                (v) => v.attribute_name === (selectedAttribute || attributes[0])
                              )
                              .sort((a, b) => parseInt(a.data.variation) - parseInt(b.data.variation))
                              .map((variation) => {
                                const isSelected = (selectedVariation?.id || variations.find(v => v.attribute_name === (selectedAttribute || attributes[0]))?.data.id) === variation.data.id;
                                return (
                                  <button
                                    key={variation.data.id}
                                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                                      ? "border-[#0463ac] bg-[#0463ac]/5"
                                      : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                                      }`}
                                    onClick={() => handleVariationSelect(variation)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className={`text-[15px] font-bold ${isSelected ? "text-[#0463ac]" : "text-gray-700"}`}>
                                        {variation.data.variation}
                                      </span>
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-[#0463ac] border-[#0463ac]" : "border-gray-200"
                                        }`}>
                                        {isSelected && <IoCheckmark className="text-white text-[10px] font-bold" />}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedVariation && (
                      <div className="mt-6 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative group">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-[#0463ac]/5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-[#0463ac]/10 transition-colors"></div>

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative z-10">
                          <h4 className="text-[16px] sm:text-[17px] font-bold text-gray-900 leading-tight">
                            {selectedAttribute}{" "}
                            <span className="text-gray-500 font-medium">({selectedVariation.variation})</span>
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1 sm:mt-0">
                            <span className="text-[20px] font-bold text-[#0463ac]">
                              ₹{Number(selectedVariation.discounted_variation_price ?? 0).toFixed(2)}
                            </span>
                            <span className="text-xs font-medium text-gray-400 line-through">
                              ₹{Number(selectedVariation.price ?? 0).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        {selectedVariation.description && (
                          <div className="relative z-10 border-t border-dashed border-gray-200 pt-4">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                              {selectedVariation.description.split("|").map((desc, i) => (
                                <li key={i} className="flex items-start gap-2.5 group/item">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0463ac]/40 group-hover/item:bg-[#0463ac] transition-colors shrink-0"></div>
                                  <span className="text-[13px] font-medium text-gray-600 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                                    {desc.trim()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Service Info */}
                        {(selectedVariation.variation_times || selectedVariation.variation_interval) && (
                          <div className="flex flex-wrap gap-4 mt-4 py-3 border-t border-gray-100 text-[13px] font-bold text-gray-700 relative z-10">
                            {selectedVariation.variation_times && (
                              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                                <span className="text-gray-400">Services:</span>
                                <span>{selectedVariation.variation_times} Times</span>
                              </div>
                            )}
                            {selectedVariation.variation_interval && (
                              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                                <span className="text-gray-400">Scheduled every:</span>
                                <span>{selectedVariation.variation_interval} Days</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}

                {prodData?.is_form === 0 && (
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-gray-200 hover:shadow-sm transition-all" onClick={openCouponModal}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0463ac]/10 flex items-center justify-center">
                        <BiSolidOffer className="text-xl text-[#0463ac]" />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-gray-900">Apply Coupon</h2>
                        <p className="text-xs font-medium text-gray-500">Save more on your service</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedCoupon && Object.keys(selectedCoupon).length ? (
                        <span className="text-[13px] font-bold text-[#249370] bg-[#249370]/10 px-3 py-1 rounded-lg">
                          {selectedCoupon?.coupon_name}
                        </span>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#0463ac] transition-colors">
                          <IoIosArrowForward className="text-gray-400 group-hover:text-[#0463ac]" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {prodData?.is_form === 0 && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-6 py-6 mb-8 mt-10">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">Payment Summary</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between group/row">
                        <span className="text-[15px] font-semibold text-black">Service Price</span>
                        <span className="text-[15px] font-bold text-gray-900">
                          ₹{selectedVariation ? selectedVariation.price : prodData?.product_price}
                        </span>
                      </div>

                      {discountPercentage ? (
                        <div className="flex items-center justify-between group/row">
                          <span className="text-[15px] font-semibold text-black">Service Discount</span>
                          <span className="text-[15px] font-bold text-[#05a357]">
                            - ₹{Math.floor(((selectedVariation ? selectedVariation.price : prodData?.product_price) * discountPercentage) / 100)}
                          </span>
                        </div>
                      ) : null}

                      {couponDiscount ? (
                        <div className="flex items-center justify-between group/row">
                          <div className="flex items-center gap-2">
                            <span className="text-[15px] font-semibold text-black">Coupon Applied</span>
                            <span className="text-[10px] font-black tracking-widest uppercase bg-[#249370]/10 text-[#249370] px-1.5 py-0.5 rounded">NEW</span>
                          </div>
                          <span className="text-[15px] font-bold text-[#05a357]">
                            - ₹{Number(couponDiscount ?? 0).toFixed(2)}
                          </span>
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between group/row">
                        <span className="text-[15px] font-semibold text-black">Platform Fee</span>
                        <span className="text-[15px] font-bold text-gray-900">
                          ₹{Number(taxAmount ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="my-6 border-t-2 border-dashed border-gray-100" />

                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-[15px] font-bold text-black uppercase tracking-wider">Total amount</p>
                        <p className="text-[12px] font-medium text-black">Inclusive of all taxes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-gray-900">
                          ₹{Number(totalAmount + taxAmount - couponDiscount).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      className="w-full h-14 rounded-2xl font-black text-base transition-all duration-300 bg-[#0463ac] text-white shadow-[0_8px_25px_rgba(4,99,172,0.25)] hover:shadow-[0_12px_30px_rgba(4,99,172,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 group"
                      onClick={handleProceed}
                      id="proceed-btn"
                    >
                      PROCEED TO CHECKOUT
                      <IoIosArrowForward className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
                {prodData?.is_form === 1 && (
                  <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] px-8 py-8 md:px-10 md:py-10 mb-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-[#0463ac]/10 flex items-center justify-center">
                        <CiClock1 className="text-2xl text-[#0463ac]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Book an Inspection</h3>
                        <p className="text-sm font-medium text-gray-400">Schedule a professional visit today</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            placeholder="e.g. John Doe"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] focus:ring-4 focus:ring-[#0463ac]/5 transition-all outline-none text-gray-900 font-medium"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="mobile" className="text-sm font-bold text-gray-700 ml-1">Mobile Number</label>
                          <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleFormChange}
                            placeholder="10-digit number"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] focus:ring-4 focus:ring-[#0463ac]/5 transition-all outline-none text-gray-900 font-medium"
                            required
                            minLength={10}
                            maxLength={10}
                          />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="your@email.com"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] focus:ring-4 focus:ring-[#0463ac]/5 transition-all outline-none text-gray-900 font-medium"
                            required
                          />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <label htmlFor="address" className="text-sm font-bold text-gray-700 ml-1">Service Address</label>
                          <LocationSuggestion
                            value={formData.address}
                            onChange={handleFormChange}
                            name="address"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm font-bold text-gray-700 ml-1">Preferred Date</label>
                          <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] transition-all outline-none text-gray-900 font-medium cursor-pointer"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="time" className="text-sm font-bold text-gray-700 ml-1">Preferred Time</label>
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleFormChange}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] transition-all outline-none text-gray-900 font-medium cursor-pointer"
                            required
                          >
                            <option value="">Select Time</option>
                            {timeSlots.map((slot, index) => (
                              <option key={index} value={slot}>{slot}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-dashed border-gray-100">
                        <div className="space-y-2">
                          <label htmlFor="width" className="text-sm font-bold text-gray-700 ml-1">Width (ft)</label>
                          <select
                            id="width"
                            name="width"
                            value={formData.width}
                            onChange={handleFormChange}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] transition-all outline-none text-gray-900 font-medium"
                          >
                            <option value="" hidden>Width</option>
                            {[...Array(120)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>{index + 1} ft</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="length" className="text-sm font-bold text-gray-700 ml-1">Length (ft)</label>
                          <input
                            type="number"
                            id="length"
                            name="length"
                            value={formData.length}
                            onChange={handleFormChange}
                            min="1"
                            placeholder="Length"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#0463ac] transition-all outline-none text-gray-900 font-medium"
                          />
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-2">
                          <label htmlFor="sqft" className="text-sm font-bold text-gray-700 ml-1">Total Sqft</label>
                          <div className="w-full px-5 py-4 bg-gray-100/50 border border-gray-100 rounded-2xl text-gray-900 font-black flex items-center">
                            {formData.sqft ? `${formData.sqft} sqft` : "—"}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#0463ac]/5 p-6 rounded-3xl border border-[#0463ac]/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Approx. Amount</p>
                          <p className="text-3xl font-black text-[#0463ac]">
                            ₹{Number(formData.total_amount ?? 0).toFixed(2)}
                          </p>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 max-w-[100px] text-right">Final pricing after physical survey</p>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-16 rounded-2xl font-black text-base tracking-wide transition-all duration-300 bg-[#249370] text-white shadow-[0_12px_40px_rgba(36,147,112,0.25)] hover:shadow-[0_15px_45px_rgba(36,147,112,0.35)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 uppercase group"
                      >
                        Schedule Inspection
                        <IoIosArrowForward className="text-xl transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>
                  </div>
                )}
              </section>

              {/*
                Descriptions tab removed per request.
                Previously this section contained the "Descriptions" tab header and reviews block.
                Kept as a JSX comment so it can be restored easily.
              */}
            </div>

            <div className="hidden md:block lg:w-5/12 h-fit space-y-8 mt-10 lg:min-w-[420px]">
              <div className="bg-transparent p-0 mb-4 border-none shadow-none hidden md:block">
                <div className="space-y-4">
                  {/* Title handled by breadcrumb */}

                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-4xl font-black text-gray-900">
                        ₹{selectedVariation
                          ? selectedVariation.discounted_variation_price
                          : prodData?.discounted_price}
                      </span>
                      <span className="text-lg font-medium text-gray-400 line-through">
                        ₹{selectedVariation ? selectedVariation.price : prodData?.product_price}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm">
                        <Rating value={reviewData?.avg_ratting ?? 4.9} count={reviewData?.total ?? "1.4k"} />
                      </div>

                      {prodData?.est_shipping_days != 0 && (
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm text-gray-600 font-bold text-sm">
                          <CiClock1 className="text-lg" />
                          <span>{prodData?.est_shipping_days}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {variations.length > 0 && (
                <div className="bg-transparent p-0 space-y-6 border-none shadow-none">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Select Frequency</h3>

                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                      {[...attributes].sort((a, b) => {
                        if (a === "One Time Service") return -1;
                        if (b === "One Time Service") return 1;
                        return 0;
                      }).map((attr) => {
                        const isSelected = selectedAttribute === attr;
                        return (
                          <button
                            key={attr}
                            className={`group relative w-full p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                              ? "border-[#0463ac] bg-[#0463ac]/5 shadow-[0_4px_12px_rgba(4,99,172,0.08)]"
                              : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                              }`}
                            onClick={() => handleAttributeSelect(attr)}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-bold ${isSelected ? "text-[#0463ac]" : "text-gray-700"}`}>
                                {attr}
                              </span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-[#0463ac] border-[#0463ac]" : "border-gray-200"
                                }`}>
                                {isSelected && <IoCheckmark className="text-white text-xs font-bold" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {selectedAttribute && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Select BHK</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {variations
                            .filter((v) => v.attribute_name === selectedAttribute)
                            .sort((a, b) => (parseInt(a.data.variation) || 0) - (parseInt(b.data.variation) || 0))
                            .map((variation) => {
                              const isSelected = selectedVariation?.id === variation.data.id;
                              return (
                                <button
                                  key={variation.data.id}
                                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                                    ? "border-[#0463ac] bg-[#0463ac]/5 shadow-[0_4px_12px_rgba(4,99,172,0.08)]"
                                    : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                                    }`}
                                  onClick={() => handleVariationSelect(variation)}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[15px] font-bold ${isSelected ? "text-[#0463ac]" : "text-gray-700"}`}>
                                      {variation.data.variation}
                                    </span>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-[#0463ac] border-[#0463ac]" : "border-gray-200"
                                      }`}>
                                      {isSelected && <IoCheckmark className="text-white text-[10px] font-bold" />}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 pt-4">
                    {/* Coupons Section */}
                    {prodData?.is_form === 0 && (
                      <div
                        className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-gray-200 hover:shadow-sm transition-all active:scale-[0.99]"
                        onClick={openCouponModal}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#0463ac]/10 flex items-center justify-center shadow-inner">
                            <BiSolidOffer className="text-2xl text-[#0463ac]" />
                          </div>
                          <div>
                            <h2 className="text-base font-bold text-gray-900">Apply Coupon</h2>
                            <p className="text-xs font-semibold text-gray-400">Save more on this order</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {selectedCoupon && Object.keys(selectedCoupon).length ? (
                            <div className="flex items-center gap-2 bg-[#249370]/10 px-3 py-1.5 rounded-lg border border-[#249370]/20">
                              <IoCheckmarkCircle className="text-[#249370] text-sm" />
                              <span className="text-[13px] font-black text-[#249370]">
                                {selectedCoupon?.coupon_name}
                              </span>
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#0463ac] shadow-sm transition-all">
                              <IoIosArrowForward className="text-gray-400 group-hover:text-[#0463ac]" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Payment Summary */}
                    {prodData?.is_form === 0 && (
                      <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] px-8 py-8 mt-4 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                        <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-8 relative z-10">Payment Summary</h3>

                        <div className="space-y-5 relative z-10">
                          <div className="flex items-center justify-between group/row">
                            <span className="text-base font-semibold text-black">Service Price</span>
                            <span className="text-base font-bold text-gray-800">
                              ₹{selectedVariation ? selectedVariation.price : prodData?.product_price}
                            </span>
                          </div>

                          {discountPercentage ? (
                            <div className="flex items-center justify-between group/row">
                              <span className="text-base font-semibold text-black">Service Discount</span>
                              <span className="text-base font-bold text-[#05a357]">
                                - ₹{Math.floor(((selectedVariation ? selectedVariation.price : prodData?.product_price) * discountPercentage) / 100)}
                              </span>
                            </div>
                          ) : null}

                          {couponDiscount ? (
                            <div className="flex items-center justify-between group/row">
                              <div className="flex items-center gap-2">
                                <span className="text-base font-semibold text-black">Coupon Applied</span>
                                <span className="text-[10px] font-black tracking-widest uppercase bg-[#249370]/10 text-[#249370] px-2 py-0.5 rounded-full">SAVED</span>
                              </div>
                              <span className="text-base font-bold text-[#05a357]">
                                - ₹{Number(couponDiscount ?? 0).toFixed(2)}
                              </span>
                            </div>
                          ) : null}

                          <div className="flex items-center justify-between group/row">
                            <span className="text-base font-semibold text-black">Platform Fee</span>
                            <span className="text-base font-bold text-gray-800">
                              ₹{Number(taxAmount ?? 0).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="my-8 border-t-2 border-dashed border-gray-50 relative z-10" />

                        <div className="flex items-end justify-between mb-10 relative z-10">
                          <div className="space-y-1">
                            <p className="text-xs font-black text-black uppercase tracking-widest">Amount Payable</p>
                            <p className="text-[11px] font-bold text-black flex items-center gap-1">
                              <IoCheckmarkCircle className="text-[#05a357] text-[10px]" />
                              Secure checkout enabled
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-4xl font-black text-gray-900 tracking-tighter">
                              ₹{Number(totalAmount + taxAmount - couponDiscount).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          className="w-full h-16 rounded-2xl font-black text-base tracking-wide transition-all duration-300 bg-[#0463ac] text-white shadow-[0_12px_40px_rgba(4,99,172,0.3)] hover:shadow-[0_15px_45px_rgba(4,99,172,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 group relative z-10"
                          onClick={handleProceed}
                          id="proceed-btn"
                        >
                          PROCEED TO CHECKOUT
                          <IoIosArrowForward className="text-xl transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex flex-col gap-10 mt-16 md:px-0">
            {/* Similar Services */}
            <section className="w-full">
              <ProdSection
                title="Similar Services You Might Like"
                items={visibleItems ? visibleItems : []}
                btnHidden
              />
            </section>

            {/* Product Info & Links */}
            <section className="w-full bg-white rounded-[20px] md:rounded-[32px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] px-4 py-6 md:px-10 md:py-10 space-y-6 md:space-y-8 mb-16">
              {/* Description Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-semibold text-black tracking-tight">Service Details</h2>
                  <button
                    className="text-xs font-bold text-[#0463ac] bg-[#0463ac]/5 px-3 py-1.5 rounded-lg hover:bg-[#0463ac]/10 transition-colors"
                    onClick={() => setIsDescOpen(!isDescOpen)}
                  >
                    {isDescOpen ? "Less Info" : "More Info"}
                  </button>
                </div>

                {isDescOpen && (
                  <div className="prose prose-blue max-w-none animate-in fade-in slide-in-from-top-2 duration-300">
                    {selectedVariation?.description ? (
                      <p className="text-[15px] text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                        {selectedVariation.description}
                      </p>
                    ) : (
                      <div
                        className="text-[15px] text-gray-600 leading-relaxed"
                        translate="no"
                        dangerouslySetInnerHTML={{ __html: prodData?.description }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Locations Section */}
              {locations && locations?.length ? (
                <div className="pt-6 border-t border-gray-50">
                  <div
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={toggleLocationsExpansion}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-0.5 h-4 bg-[#0463ac] rounded-full"></div>
                      <h2 className="text-[17px] md:text-[19px] font-semibold text-black tracking-tight">Available Locations</h2>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#0463ac]/10 transition-all duration-300 ${isLocationsExpanded ? 'rotate-180' : ''}`}>
                      <IoIosArrowDown className="text-lg text-gray-400 group-hover:text-[#0463ac]" />
                    </div>
                  </div>

                  {isLocationsExpanded && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {locations?.map((loc, index) => {
                        const formattedLoc = loc.trim();
                        const capitalizedLoc = formattedLoc.charAt(0).toUpperCase() + formattedLoc.slice(1);
                        return (
                          <a
                            key={index}
                            href={`${config.VITE_BASE_URL}/product/${prodData.slug
                              }-in-${formattedLoc.toLowerCase()}/${formattedLoc.toLowerCase()}`}
                            className="text-[13px] text-[#10847E] hover:underline transition-colors font-medium"
                          >
                            {prodData.product_name} in {capitalizedLoc}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}

              {/* Keywords Section */}
              {prodData?.tags && (
                <div className="pt-6 border-t border-gray-50">
                  <div
                    className="flex items-center justify-between cursor-pointer group mb-4"
                    onClick={toggleKeywordsExpansion}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-0.5 h-4 bg-black rounded-full"></div>
                      <h2 className="text-[17px] md:text-[19px] font-semibold text-black tracking-tight">Popular Search Keywords</h2>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-all duration-300 ${isKeywordsExpanded ? 'rotate-180' : ''}`}>
                      <IoIosArrowDown className="text-lg text-black group-hover:text-gray-900" />
                    </div>
                  </div>

                  {isKeywordsExpanded && (
                    <div className="flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                      {prodData.tags.split(",").map((tag, index) => (
                        <a
                          key={index}
                          onClick={() => handleTagClick(tag)}
                          className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-white border border-gray-100 text-black hover:border-[#249370] hover:text-[#249370] transition-all cursor-pointer shadow-sm"
                        >
                          #{tag.trim()}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
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

      {/* Mobile Floating Cart Summary */}
      <AnimatePresence>
        {cart?.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-6 left-0 right-0 z-[40] flex justify-center px-4"
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/add-to-cart')}
              className="bg-[#008000] rounded-full shadow-[0_12px_30px_rgba(0,128,0,0.4)] overflow-hidden flex items-center gap-[10px] p-1.5 pl-1.5 pr-3.5 cursor-pointer border border-white/10 max-w-max"
            >
              {/* Left: Thumbnail Circle */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/15 shadow-sm">
                {cart[cart.length - 1]?.product_image ? (
                  <img
                    src={`${config.API_URL}/public/product_images/${cart[cart.length - 1].product_image}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-[#008000]" />
                )}
              </div>

              {/* Center: Info */}
              <div className="text-left py-0.5">
                <h4 className="text-[14px] font-extrabold text-white leading-tight">View cart</h4>
                <p className="text-[11px] font-medium text-white/80 leading-none">
                  {cart.length} {cart.length > 1 ? 'items' : 'item'}
                </p>
              </div>

              {/* Right: Price & Arrow */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/15">
                <span className="text-[15px] font-black text-white">₹{cart.reduce((acc, curr) => acc + (Number(curr.price) * curr.qty), 0)}</span>
                <div className="bg-white/20 p-1 rounded-full">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

