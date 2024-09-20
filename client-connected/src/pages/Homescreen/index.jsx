import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaStar, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight  } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import ProdSection from "../../components/ProdSection";
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { Carousel } from "@material-tailwind/react";
// import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryModal from "../../components/CategoryModal";
import ExploreModal from "../../components/ExploreModal";
import { useCont } from "../../context/MyContext";
import "./index.css";
import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
// import { RxDotFilled } from "react-icons/rx";
import config from "../../config/config";
import downloadApp from '../../assets/images/app-bnr-bg/download-app.png';
import downloadAppMobile from '../../assets/images/app-bnr-bg/download-app-mobile.png';
import referIcon from '../../assets/images/refer-icon.png';
import discoverImg1 from '../../assets/images/discover-1.png';
import discoverImg3 from '../../assets/images/discover-3.png';
import discoverImg4 from '../../assets/images/discover-4.png';
import discoverImg5 from '../../assets/images/discover-5.png';
import whyHommlie1 from '../../assets/images/why-hommlie-1.png';
import whyHommlie2 from '../../assets/images/why-hommlie-2.png';
import whyHommlie3 from '../../assets/images/why-hommlie-3.png';
import whyHommlie4 from '../../assets/images/why-hommlie-4.png';
import whyHommlie5 from '../../assets/images/why-hommlie-5.png';
import whyHommlie6 from '../../assets/images/why-hommlie-6.png';
import whyHommlie7 from '../../assets/images/why-hommlie-7.png';
import InspectionModal from "../../components/InspectionModal";
import ReferAndEarn from "../../components/ReferAndEarnModal";
import TestimonialSection from "../../components/TestimonialSection";
import DefaultThumbnail from '../../assets/images/thumb-default.svg';
import Loading from "../../components/Loading";
import LoadingWrapper from "../../components/Loading/LoadingWrapper";

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
  
  const facts = [
    { label: "App Users", value: "2 Millions+" },
    { label: "Completed Jobs", value: "15 Thousands+" },
    { label: "Monthly Job Request", value: "15 Thousands+" }
  ];

  const { user, getHomeFeeds, getCategoryData, getBannerData, fetchAllData, homeFeedData, categoryData, bannerData } = useCont();
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const [currentIndexTopSlider, setCurrentIndexTopSlider] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isInspectionModalOpen, setIsInspectionModalOpen]= useState(false);
  const [isReferModalOpen, setIsReferModalOpen]= useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  }

  const closeCatModal = () => {
    setIsCatModalOpen(false);
  }

  const openExploreModal = (items, title) => {
    setSelectedItems(items);
    setSelectedTitle(title);
    setIsExploreModalOpen(true);
  }

  const closeExploreModal = () => {
    setIsExploreModalOpen(false);
  }

  const openWhatsApp = () => {
    window.open(`https://wa.link/8whe95`, '_blank');
  };

  const prevSlideTopSlider = () => {
    const isFirstSlide = currentIndexTopSlider === 0;
    const newIndex = isFirstSlide ? bannerData.sliders.length - 1 : currentIndexTopSlider - 1;
    setCurrentIndexTopSlider(newIndex);
  }

  const nextSlideTopSlider = () => {
    const isLastSlide = currentIndexTopSlider === bannerData.sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndexTopSlider + 1;
    setCurrentIndexTopSlider(newIndex);
  }

  const goToSlideTopSlider = (slideIndex) => {
    setCurrentIndexTopSlider(slideIndex);
  }

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
    <main className="content w-full px-8 bg-white scroll-smooth">

      <CategoryModal isOpen={isCatModalOpen} onClose={closeCatModal} category={selectedCat} />
      <ExploreModal isOpen={isExploreModalOpen} onClose={closeExploreModal} title={selectedTitle} items={selectedItems} />
      <InspectionModal isOpen={isInspectionModalOpen} onClose={() => setIsInspectionModalOpen(false)} />
      <ReferAndEarn isOpen={isReferModalOpen} onClose={() => setIsReferModalOpen(false)} />

      <section className="w-full my-16 relative group">
        <div style={{backgroundImage: `url(${bannerData ? bannerData?.sliders[currentIndexTopSlider].image_url : ""})`}} className="w-full h-40 lg:h-96 rounded-xl bg-center bg-cover bg-no-repeat duration-500"></div>
        <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-1 cursor-pointer" style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
          <IoIosArrowBack onClick={prevSlideTopSlider} size={30} color="grey" />
        </div>
        <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-1 cursor-pointer" style={{backgroundColor: "rgba(0,0,0,0.1)"}}>
          <IoIosArrowForward onClick={nextSlideTopSlider} size={30} color="grey" />
        </div>
        <div className="flex top-4 justify-center py-2">
          {
            bannerData?.sliders?.map((slide, index) => (
              <div key={index} onClick={() => goToSlideTopSlider(index)} className="text-2xl cursor-pointer">
                <RxDotFilled />
              </div>
            ))
          }
        </div>
      </section>
      
      <section className="w-full mx-auto section">
        {/* {user?.name ?  */}
        <h1 className="text-[#035240] text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">
          HELLO {user?.name ? user.name : null} <span className="waving-hand">👋</span>
        </h1>        
        {/* :null} */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">What you are looking for today</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {categoryData.data?.map((ct, index) => {
              if(index === 6) {
                return null
              } else {
                return (
                  <div key={index} onClick={() => openCatModal([ct.id, ct.category_name])} className="p-2 cursor-pointer">
                    <div className="w-max mx-auto h-32 sm:h-36 md:h-48 lg:h-52 flex flex-col justify-center">
                        <NavLink className="flex justify-end items-end h-full">
                          <img className="w-max h-full object-cover" src={ct.image_url} alt={ct.category_name} />
                        </NavLink>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </section>

      {/* <section className="flex flex-col md:flex-row gap-4 my-8">
        <div className="w-full md:w-1/2 p-4 rounded-lg flex items-center gap-4" style={{backgroundColor: "#F8F9FF"}}>
          <img src={joinPremiumIcon} alt="" />
          <h3 className="font-semibold text-lg">Join Premium Club And Save 10% Off On Every Service @199</h3>
        </div>
        <div className="w-full md:w-1/2 p-4 rounded-lg flex items-center gap-4" style={{backgroundColor: "#F8F9FF"}}>
          <img src={extraOffIcon} alt="" />
          <h3 className="font-semibold text-lg">Extra 5 % Off On Every Service By Doing Online Payment Apply Code: 44949</h3>
        </div>
      </section> */}

      {homeFeedData?.cleaning_services?.length ?
        <ProdSection
          openExploreModal = {openExploreModal}
          title = "Cleaning Services"
          items = {homeFeedData ? homeFeedData?.cleaning_services : []}
        /> : null
      }

      {homeFeedData?.pest_control?.length ?
        <ProdSection
          openExploreModal = {openExploreModal}
          title = "Pest Control"
          items = {homeFeedData ? homeFeedData?.pest_control : []}
        /> : null
      }

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

      {homeFeedData?.safety_pro_netting?.length ?
        <ProdSection
          openExploreModal = {openExploreModal}
          title = "Safety-Pro Netting"
          items = {homeFeedData ? homeFeedData?.safety_pro_netting : []}
        /> : null
      }

      {homeFeedData?.mosquito_mesh?.length ?
        <ProdSection
          openExploreModal = {openExploreModal}
          title = "Mosquito Mesh"
          items = {homeFeedData ? homeFeedData?.mosquito_mesh : []}
        /> : null
      }

      <section id="offer-scroller" className="w-full overflow-hidden py-4" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(20)].map((_, index) => (
            <span key={index} className="relative inline-flex items-center mx-4">
              <span className="text-xl font-semibold" style={{ color: '#035240' }}>
                lowest price ever
              </span>
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></span>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></span>
            </span>
          ))}
        </div>
      </section>

      {homeFeedData?.most_booked_services?.length ?
        <ProdSection
          openExploreModal = {openExploreModal}
          title = "Most Booked Services"
          items = {homeFeedData ? homeFeedData?.most_booked_services : []}
        /> : null
      }

      <section className="mt-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">Discover</h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <NavLink to={`${config.VITE_BASE_URL}/my-bookings`} className="flex flex-col gap-2 items-center group">
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img src={discoverImg1} className="h-full w-full" alt="" />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">My Orders</span>
          </NavLink>
          {/* <NavLink to={"#new-services"} className="flex flex-col gap-2 items-center group">
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img src={discoverImg2}className="h-full w-full" alt="" />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">Upcoming Services</span>
          </NavLink> */}
          <NavLink to={`${config.VITE_BASE_URL}/contact-us`} className="flex flex-col gap-2 items-center group">
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img src={discoverImg3} className="h-full w-full" alt="" />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">Complaints</span>
          </NavLink>
          <button onClick={() => setIsInspectionModalOpen(true)} className="flex flex-col it gap-2 items-center group">
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img src={discoverImg4} className="h-full w-full" alt="" />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">Book an Inspection</span>
          </button>
          <button onClick={() => openWhatsApp()} className="flex flex-col gap-2 items-center group">
            <div className="w-10 h-10 mt-4 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-2 transition-colors">
              <img src={discoverImg5} className="h-full w-full" alt="" />
            </div>
            <span className="text-sm text-center text-[#035240] font-semibold transition-colors">Book on Whatsapp</span>
          </button>
        </div>
      </section>

      {homeFeedData?.videos?.length &&
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8">Thoughtful Curations</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {homeFeedData?.videos?.map((item, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                {playingVideo === index ? (
                  <video 
                    src={item.video_url} 
                    className="w-full h-48 object-cover" 
                    autoPlay 
                    controls
                    onEnded={() => setPlayingVideo(null)}
                  />
                ) : (
                  <>
                    <img 
                      src={item.thumbnail || DefaultThumbnail} 
                      alt="Video thumbnail" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={() => setPlayingVideo(index)}
                        className="w-12 h-12 bg-white bg-opacity-75 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
                      >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section> 
      }

      <section className="w-full mx-auto section px-4 py-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">Why Hommlie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {whyChoose.map((item, index) => (
            <div key={index} className="flex flex-row items-center p-4 rounded-lg gap-4">
              <img src={item.icon} className="w-10 h-10" alt="" />
              <p className="font-semibold" style={{color: "#035240"}}>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section 
        onClick={() => {
          const jwtToken = Cookies.get('HommlieUserjwtToken');
          if (jwtToken) {
            setIsReferModalOpen(true) 
          }
        }}
        className="w-full mx-auto section px-4 py-8 rounded-lg mt-8" 
        style={{backgroundColor: "#D9EFDE"}}
      >
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <img src={referIcon} alt="Referral" className="w-40 mx-auto" />
          </div>
          <div className="w-full sm:w-3/4">
            <h2 className="text-2xl font-bold mb-2" style={{color: "#035240"}}>Refer & Get Free Services</h2>
            <p className="text-gray-700">
              Invite Your Friends And Family And Get Instant 100rs Off In Your Hommlie Wallet.
            </p>
          </div>
        </div>
      </section>
      
      {homeFeedData?.shop_now?.length ?
        <ProdSection
          openExploreModal = {openExploreModal}
          title = "Shop Now"
          items = {homeFeedData ? homeFeedData?.shop_now : []}
        /> : null
      }

      {homeFeedData?.testimonials?.length > 0 && (
        <TestimonialSection testimonials={homeFeedData.testimonials} />
      )}

      <section className="w-full mx-auto py-10" style={{ background: '#f8f9fa' }}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 
            className="text-2xl font-semibold text-center mb-8"
            style={{ color: '#035240' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Some interesting facts about Hommlie Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {facts.map((fact, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.p 
                  className="text-3xl font-bold mb-1" 
                  style={{ color: "#035240" }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {fact.value}
                </motion.p>
                <p className="text-gray-600 text-sm">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden lg:block relative w-full overflow-hidden">
        <div className="w-full h-full">
          <img 
            src={downloadApp} 
            alt="Background" 
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
            alt="Background" 
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
