import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaStar, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import ProdSection from "../../components/ProdSection";
import CategorySlider from "../../components/CatSection";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Carousel } from "@material-tailwind/react";
// import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryModal from "../../components/CategoryModal";
import ExploreModal from "../../components/ExploreModal";
import { useCont } from "../../context/MyContext";
import "./index.css";
import Cookies from "js-cookie";
// import { jwtDecode } from 'jwt-decode';
import { motion } from "framer-motion";
// import { RxDotFilled } from "react-icons/rx";
import config from "../../config/config";
import downloadApp from "../../assets/images/app-bnr-bg/download-app.png";
import downloadAppMobile from "../../assets/images/app-bnr-bg/download-app-mobile.png";
import referIcon from "../../assets/images/refer-icon.png";
import discoverImg1 from "../../assets/images/discover-1.png";
import discoverImg3 from "../../assets/images/discover-3.png";
import discoverImg4 from "../../assets/images/discover-4.png";
import discoverImg5 from "../../assets/images/discover-5.png";
import whyHommlie1 from "../../assets/images/why-hommlie-1.png";
import whyHommlie2 from "../../assets/images/why-hommlie-2.png";
import whyHommlie3 from "../../assets/images/why-hommlie-3.png";
import whyHommlie4 from "../../assets/images/why-hommlie-4.png";
import whyHommlie5 from "../../assets/images/why-hommlie-5.png";
import whyHommlie6 from "../../assets/images/why-hommlie-6.png";
import whyHommlie7 from "../../assets/images/why-hommlie-7.png";
import InspectionModal from "../../components/InspectionModal";
import ReferAndEarn from "../../components/ReferAndEarnModal";
import TestimonialSection from "../../components/TestimonialSection";
import DefaultThumbnail from "../../assets/images/thumb-default.svg";
import Loading from "../../components/Loading";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";
import BannerSlider from "../../components/BannerSection";
import BannerSection from "../../components/BannerSection";

const HomePageFirstSection = () => {
  const whyChoose = [
    {
      icon: whyHommlie1,
      title: "ISO Certified Company",
    },
    {
      icon: whyHommlie2,
      title: "In-house trained professionals",
    },
    {
      icon: whyHommlie3,
      title: "Warranty Backed Service",
    },
    {
      icon: whyHommlie4,
      title: "Digital Monitoring",
    },
    {
      icon: whyHommlie5,
      title: "CIB Approved Chemical",
    },
    {
      icon: whyHommlie6,
      title: "Cost effective",
    },
    {
      icon: whyHommlie7,
      title: "Health, Safety and Eco Friendly service and products",
    },
  ];

  // const facts = [
  //   { label: "App Users", value: "2 Millions+" },
  //   { label: "Completed Jobs", value: "150 Thousands+" },
  //   { label: "Monthly Job Request", value: "15 Thousands+" }
  // ];

  const facts = [
    { label: "Completed Jobs", value: "5,000+" },
    { label: "Monthly Job Opportunities (Oct 2024)", value: "1,000+" },
    { label: "Google Service Rating", value: "4.95" },
  ];

  const {
    user,
    getHomeFeeds,
    getCategoryData,
    getBannerData,
    fetchAllData,
    homeFeedData,
    categoryData,
    bannerData,
  } = useCont();
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const [currentIndexTopSlider, setCurrentIndexTopSlider] = useState(0);
  const [currentIndexBottomSlider, setCurrentIndexBottomSlider] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ClickedSubId, setClickedSubId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
    fetchAllData();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const openCatModal = (category, items) => {
    setSelectedCat(category);
    setSelectedItems(items);
    setIsCatModalOpen(true);
  };

  const openSubCatModal = (category, items) => {
    setClickedSubId(category[0]);
    setSelectedItems(items);
    setIsCatModalOpen(true);
  };

  const closeCatModal = () => {
    setIsCatModalOpen(false);
  };

  const openExploreModal = (items, title) => {
    setSelectedItems(items);
    setSelectedTitle(title);
    setIsExploreModalOpen(true);
  };

  const closeExploreModal = () => {
    setIsExploreModalOpen(false);
  };

  const openWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?phone=919844090440`, "_blank");
  };

  const prevSlideTopSlider = () => {
    const isFirstSlide = currentIndexTopSlider === 0;
    const newIndex = isFirstSlide
      ? bannerData.sliders.length - 1
      : currentIndexTopSlider - 1;
    setCurrentIndexTopSlider(newIndex);
  };

  const nextSlideTopSlider = useCallback(() => {
    setCurrentIndexTopSlider(
      (prevIndex) => (prevIndex + 1) % bannerData.sliders.length
    );
  }, [bannerData.sliders]);

  const goToSlideTopSlider = (slideIndex) => {
    setCurrentIndexTopSlider(slideIndex);
  };

  const prevSlideBottomSlider = () => {
    const isFirstSlide = currentIndexBottomSlider === 0;
    const newIndex = isFirstSlide
      ? bannerData.bottombanner?.length - 1
      : currentIndexBottomSlider - 1;
    setCurrentIndexBottomSlider(newIndex);
  };

  const nextSlideBottomSlider = useCallback(() => {
    setCurrentIndexBottomSlider(
      (prevIndex) => (prevIndex + 1) % bannerData.bottombanner.length
    );
  }, [bannerData.bottombanner]);

  const goToSlideBottomSlider = (slideIndex) => {
    setCurrentIndexBottomSlider(slideIndex);
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
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Product Video"
      ></iframe>
    );
  };

  useEffect(() => {
    const topInterval = setInterval(() => {
      nextSlideTopSlider();
    }, 4000);

    const bottomInterval = setInterval(() => {
      nextSlideBottomSlider();
    }, 4000);

    return () => {
      clearInterval(topInterval);
      clearInterval(bottomInterval);
    };
  }, [nextSlideTopSlider, nextSlideBottomSlider]);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
    fetchAllData();
    // if (!homeFeedData.length) getHomeFeeds();
    // if (!categoryData.length) getCategoryData();
    // if (!bannerData.length) getBannerData();
    console.log(homeFeedData);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loading />
      </div>
    );
  }

  return (
    <main className="content w-full scroll-smooth space-y-2 lg:space-y-3">
      <Helmet>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16578324784"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16578324784');
          `}
        </script>
        <script>
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5110081,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      </Helmet>

      <CategoryModal
        isOpen={isCatModalOpen}
        onClose={() => {
          setClickedSubId(null);
          closeCatModal();
        }}
        category={selectedCat}
        ClickedSubId={ClickedSubId}
      />
      <ExploreModal
        isOpen={isExploreModalOpen}
        onClose={closeExploreModal}
        title={selectedTitle}
        items={selectedItems}
      />
      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
      />
      <ReferAndEarn
        isOpen={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />

      <div className="w-full relative group py-0">
        <div className="w-full h-24 md:h-40 lg:h-[500px] rounded-xl overflow-hidden">
          {bannerData?.sliders?.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndexTopSlider ? "opacity-100" : "opacity-0"
              }`}
            >
              <a href={slide?.link}>
                <img
                  src={slide.image_url}
                  title={slide.image_title}
                  alt={slide.alt_tag}
                  className="w-full h-full"
                />
              </a>
            </div>
          ))}
        </div>
        <div
          className="hidden lg:group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-1 cursor-pointer"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          <IoIosArrowBack onClick={prevSlideTopSlider} size={30} color="grey" />
        </div>
        <div
          className="hidden lg:group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-1 cursor-pointer"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        >
          <IoIosArrowForward
            onClick={nextSlideTopSlider}
            size={30}
            color="grey"
          />
        </div>
        <div className="flex top-4 justify-center py-2">
          {bannerData?.sliders?.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlideTopSlider(index)}
              className={`text-2xl cursor-pointer ${
                index === currentIndexTopSlider
                  ? "text-gray-800"
                  : "text-gray-400"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <section className="w-full px-4 md:px-10 py-6 md:py-12">
        <div className="">
          {/* Welcome Header */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#035240] text-xl sm:text-2xl lg:text-3xl font-semibold mb-4"
          >
            HELLO {user?.name && <span className="">{user.name}</span>}{" "}
            <span className="waving-hand animate-wave inline-block">👋</span>
          </motion.h1>

          {/* Category Header */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8 text-[#10847E]"
          >
            What are you looking for today?
          </motion.h1>

          {/* Category Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8"
          >
            {categoryData?.data?.map((ct, index) => {
              if (index === 6) return null;

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                      },
                    },
                    hover: {
                      scale: 1.05,
                      transition: {
                        duration: 0.2,
                      },
                    },
                  }}
                  whileHover="hover"
                  className="relative group"
                >
                  <div
                    onClick={() =>
                      navigate(`${config.VITE_BASE_URL}/${ct?.slug}/${ct?.id}`)
                    }
                    // onClick={() => openCatModal([ct?.id, ct?.category_name])}
                    className="p-2 cursor-pointer transition-transform duration-300 ease-in-out"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
                      <div className="aspect-square">
                        <NavLink className="block w-full h-full">
                          <img
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            src={ct?.image_url}
                            alt={ct?.alt_tag}
                            loading="lazy"
                          />
                        </NavLink>
                      </div>

                      {/* Overlay with category name */}
                      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                        <div className="w-full p-3 text-white [#10847E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-sm font-medium text-center">
                            {ct?.category_name}
                          </h3>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {homeFeedData?.pest_control?.length ? (
        <CategorySlider
          openSubCatModal={openSubCatModal}
          title="Pest Control"
          categories={homeFeedData ? homeFeedData?.pest_control : []}
        />
      ) : null}

      {homeFeedData?.cleaning_services?.length ? (
        <CategorySlider
          openSubCatModal={openSubCatModal}
          title="Cleaning Services"
          categories={homeFeedData ? homeFeedData?.cleaning_services : []}
        />
      ) : null}

      {/* <section className="w-full my-7 relative group">
        <div className="w-full h-40 lg:h-[32rem] rounded-xl overflow-hidden">
          {bannerData?.bottombanner?.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndexBottomSlider ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image_url}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="hidden lg:group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-1 cursor-pointer" style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
          <IoIosArrowBack onClick={prevSlideBottomSlider} size={30} color="grey" />
        </div>
        <div className="hidden lg:group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-1 cursor-pointer" style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
          <IoIosArrowForward onClick={nextSlideBottomSlider} size={30} color="grey" />
        </div>
        <div className="flex top-4 justify-center py-2">
          {bannerData?.bottombanner?.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlideBottomSlider(index)}
              className={`text-2xl cursor-pointer ${
                index === currentIndexBottomSlider ? "text-gray-800" : "text-gray-400"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </section> */}

      {bannerData?.topbanner?.length ? (
        <BannerSection bannerData={bannerData?.topbanner} />
      ) : null}

      {/* <section className="w-full my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Hommlie Bike Home Parcel Delivery</h2>
        <div className="bg-[#F8F9FF] rounded-lg p-6 flex items-center">
          <div className="mr-6">
            <img src="/path-to-your-delivery-image.png" alt="Delivery" className="w-24 h-24 object-contain" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#035240] mb-2">Hommlie Quick Parcel Delivery</h3>
            <p className="text-gray-700 mb-1">Starting At <span className="font-bold">Rs 30/-</span></p>
            <p className="text-gray-600 text-sm">Send And Receive Anything Without Leaving Your Home, Enjoy Fast And Affordable Delivery</p>
          </div>
        </div>
      </section> */}

      {homeFeedData?.safety_pro_netting?.length ? (
        <CategorySlider
          openSubCatModal={openSubCatModal}
          title="Bird Control"
          categories={homeFeedData ? homeFeedData?.safety_pro_netting : []}
        />
      ) : null}

      {homeFeedData?.mosquito_mesh?.length ? (
        <CategorySlider
          openSubCatModal={openSubCatModal}
          title="Mosquito Mesh"
          categories={homeFeedData ? homeFeedData?.mosquito_mesh : []}
        />
      ) : null}

      <div
        id="offer-scroller"
        className="w-full overflow-hidden py-4 md:px-8"
        style={{ backgroundColor: "white" }}
      >
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(20)].map((_, index) => (
            <span
              key={index}
              className="relative inline-flex items-center mx-4"
            >
              <span
                className="text-base md:text-xl font-semibold"
                style={{ color: "#035240" }}
              >
                lowest price ever
              </span>
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#f5f5f5] rounded-full"></span>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#f5f5f5] rounded-full"></span>
            </span>
          ))}
        </div>
      </div>

      <section className="md:px-10 py-5 md:py-10">
        {homeFeedData?.most_booked_services?.length ? (
          <ProdSection
            openExploreModal={openExploreModal}
            title="Most Booked Services"
            items={homeFeedData ? homeFeedData?.most_booked_services : []}
          />
        ) : null}
      </section>

      <section className="mt-12 md:px-10 py-5 md:py-10">
        <h2 className="px-2 md:px-0 text-xl sm:text-2xl lg:text-3xl font-semibold md:mb-8 text-[#10847E]">
          Discover
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <NavLink
            to={`${config.VITE_BASE_URL}/my-bookings`}
            className="flex flex-col gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg1}
                className="h-full w-full"
                alt="Discover our services"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              My Orders
            </span>
          </NavLink>
          {/* <NavLink to={"#new-services"} className="flex flex-col gap-2 items-center group">
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img src={discoverImg2}className="h-full w-full" alt="" />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">Upcoming Services</span>
          </NavLink> */}
          <NavLink
            to={`${config.VITE_BASE_URL}/contact-us`}
            className="flex flex-col gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg3}
                className="h-full w-full"
                alt="Discover"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              Complaints
            </span>
          </NavLink>
          <button
            onClick={() => setIsInspectionModalOpen(true)}
            className="flex flex-col it gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg4}
                className="h-full w-full"
                alt="Discover"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              Book an Inspection
            </span>
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="flex flex-col gap-2 items-center group"
          >
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img
                src={discoverImg5}
                className="h-full w-full"
                alt="Discover"
              />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">
              Book on Whatsapp
            </span>
          </button>
        </div>
      </section>

      {homeFeedData?.videos?.length ? (
        <section className="mt-12 px-2 md:px-10 py-5 md:py-10">
          <h2 className="px-2 md:px-0 text-xl sm:text-2xl lg:text-3xl font-semibold mb-5 md:mb-8 text-[#10847E]">
            Thoughtful Curations
          </h2>
          <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 md:gap-10">
            {homeFeedData?.videos?.map((item, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <img
                  src={item.thumbnail || DefaultThumbnail}
                  alt="Hommlie videos"
                  className="w-full h-20 lg:h-[250px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setPlayingVideo(index)}
                    className="w-12 h-12 bg-white bg-opacity-75 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {playingVideo !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative bg-transparent rounded-lg overflow-hidden h-full w-full p-8">
                <button
                  className="absolute top-3 right-3 z-20 text-white bg-black bg-opacity-75 rounded-full p-1"
                  onClick={() => setPlayingVideo(null)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="w-full h-full">
                  {renderYouTubeVideo(homeFeedData.videos[playingVideo].video)}
                </div>
              </div>
            </div>
          )}
        </section>
      ) : null}

      <section className="w-full section px-2 md:px-10 py-5 md:py-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 text-[#10847E]">
          Why Hommlie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {whyChoose?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center p-4 rounded-lg gap-4"
            >
              <img
                src={item.icon}
                className="w-10 h-10"
                alt="Why choose hommlie?"
              />
              <p className="font-semibold" style={{ color: "#035240" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        onClick={() => {
          const jwtToken = Cookies.get("HommlieUserjwtToken");
          if (jwtToken) {
            setIsReferModalOpen(true);
          }
        }}
        className="w-full section px-4 py-5 md:py-10 rounded-lg mt-8 md:px-10"
        style={{ backgroundColor: "#D9EFDE" }}
      >
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <img src={referIcon} alt="Referral" className="w-40 mx-auto" />
          </div>
          <div className="w-full sm:w-3/4">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#035240" }}
            >
              Refer & Get Free Services
            </h2>
            <p className="text-gray-700">
              Invite Your Friends And Family And Get Instant 100rs Off In Your
              Hommlie Wallet.
            </p>
          </div>
        </div>
      </section>

      {homeFeedData?.shop_now?.length ? (
        <ProdSection
          openExploreModal={openExploreModal}
          title="Shop Now"
          items={homeFeedData ? homeFeedData?.shop_now : []}
        />
      ) : null}

      {homeFeedData?.testimonials?.length > 0 && (
        <TestimonialSection testimonials={homeFeedData.testimonials} />
      )}

      <section className="w-full py-10">
        <div className="flex flex-col items-center gap-4 px-4">
          <motion.h2
            className="text-2xl font-semibold text-center"
            style={{ color: "#035240" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Some interesting facts about Hommlie Services
          </motion.h2>
          <div className="max-w-5xl grid grid-cols-3 gap-6">
            {facts?.map((fact, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.p
                  className="text-xl md:text-3xl font-bold mb-1"
                  style={{ color: "#035240" }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {fact.value}
                </motion.p>
                <p className="text-gray-600 text-xs md:text-sm">{fact.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center text-sm md:text-base text-[#035240]">
            <p>
              Thank you for being a valued part of the Hommlie community! Your
              support has been essential to our growth, and we’re thrilled to
              enhance your experience with the launch of our new app.
            </p>
            <p>
              Stay tuned for more updates—we can’t wait to share what’s coming
              next!
            </p>
          </div>
        </div>
      </section>

      <section className="hidden lg:block relative w-full overflow-hidden px-8 bg-transparent">
        <div className="w-full h-full">
          <img
            src={downloadApp}
            alt="Download hommlie app"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="lg:absolute inset-0 flex items-center justify-center sm:justify-end">
          <div className="w-full sm:w-auto sm:max-w-xl px-4 py-8 sm:px-8 md:px-12 lg:px-16 text-white">
            <div className="flex flex-col gap-2 lg:gap-5 ">
              <h3 className="hidden md:block font-bold sm:text-3xl lg:text-4xl text-center sm:text-left">
                Best Services In Few Minutes At Your Door
              </h3>
              <p className="font-semibold sm:text-xl lg:text-2xl text-center sm:text-left">
                Download the App for Free
              </p>
              <div className="flex flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                <button className="w-full sm:w-48 h-14 rounded-xl flex items-center justify-center gap-2 bg-[#035240] hover:bg-[#024535] transition-colors">
                  <IoLogoGooglePlaystore className="text-white w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </button>
                <button className="w-full sm:w-48 h-14 rounded-xl flex items-center justify-center gap-2 bg-[#035240] hover:bg-[#024535] transition-colors">
                  <IoLogoApple className="text-white w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <p className="text-xs">Download it on</p>
                    <p className="text-sm font-semibold">Apple Store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:hidden items-center relative w-full bg-[#10847E] overflow-hidden">
        <div className="w-full h-full mt-8 flex justify-center">
          <img
            src={downloadAppMobile}
            alt="download hommlie app"
            className="w-1/2 h-auto object-cover"
          />
        </div>

        <div className="lg:absolute inset-0 flex items-center justify-center sm:justify-end">
          <div className="w-full sm:w-auto sm:max-w-xl px-4 py-8 text-white">
            <div className="flex flex-col gap-2 lg:gap-5">
              <h3 className="font-semibold text-2xl text-center sm:text-left">
                Best Services In Few Minutes At Your Door
              </h3>
              <p className="font-semibold text-lg text-center sm:text-left">
                Download the App for Free
              </p>
              <div className="flex flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                <button className="w-full sm:w-48 h-14 rounded-xl flex items-center justify-center gap-2 bg-[#035240] hover:bg-[#024535] transition-colors">
                  <IoLogoGooglePlaystore className="text-white w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </button>
                <button className="w-full sm:w-48 h-14 rounded-xl flex items-center justify-center gap-2 bg-[#035240] hover:bg-[#024535] transition-colors">
                  <IoLogoApple className="text-white w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <p className="text-xs">Download it on</p>
                    <p className="text-sm font-semibold">Apple Store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePageFirstSection;
