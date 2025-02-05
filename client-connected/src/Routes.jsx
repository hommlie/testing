import React from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import config from "./config/config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import NotFound from "./pages/NotFound";
import Homescreen from "./pages/Homescreen/index";
import ProductPage from "./pages/ProductPage";
import AddtoCart from "./pages/AddtoCart";
import ReviewBooking from "./pages/ReviewBooking";
import BookingSuccess from "./pages/BookingSuccess";
import EditProfile from "./pages/EditProfile";
import MyBookings from "./pages/MyBooking";
import TrackOrder from "./pages/TrackOrder";
import WomenEmpowerment from "./pages/WomenEmpowerment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CareerPage from "./pages/Career";
import PartnerWithUs from "./pages/PartnerUs";
import DeleteAccountPage from "./pages/DeleteAccount";
import { useToast } from "./context/ToastProvider";
import CleaningProductPage from "./pages/CleaningProductPage";
import ServiceProviderRegistration from "./pages/RegisterFreeListing";
import Wallet from "./pages/Wallet";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductListPage from "./pages/ProductListPage";
import SEOPage from "./pages/SEOPage";
import BlogPage from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";

const ProjectRoutes = () => {
  const notify = useToast();
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = Cookies.get("HommlieUserjwtToken");

    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      notify("Please log in to access this page", "error");
      navigate(`${config.VITE_BASE_URL}/`);
    }
    return children;
  };

  let element = useRoutes([
    { path: "*", element: <NotFound /> },
    { path: `${config.VITE_BASE_URL}/`, element: <Homescreen /> },
    { path: `${config.VITE_BASE_URL}/home`, element: <Homescreen /> },
    {
      path: `${config.VITE_BASE_URL}/:categorySlug/:categoryId`,
      element: <SubCategoryPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/:categorySlug/:categoryId/:location`,
      element: <SubCategoryPage />,
    },

    {
      path: `${config.VITE_BASE_URL}/subcategory/:slug/:id`,
      element: <CleaningProductPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/subcategory/:slug/:id/:location`,
      element: <CleaningProductPage />,
    },

    {
      path: `${config.VITE_BASE_URL}/products/:subcategorySlug/:subcategoryId`,
      element: <ProductListPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/products/:subcategorySlug/:subcategoryId/:location`,
      element: <ProductListPage />,
    },

    {
      path: `${config.VITE_BASE_URL}/product/:id/:slug`,
      element: <ProductPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/product/:id/:slug/:location`,
      element: <ProductPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/product/:id/:slug/tag/:tag`,
      element: <ProductPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/page/:slug`,
      element: <SEOPage />,
    },

    {
      path: `${config.VITE_BASE_URL}/blogs`,
      element: <BlogPage />,
    },
    {
      path: `${config.VITE_BASE_URL}/blog/:slug`,
      element: <BlogPost />,
    },

    {
      path: `${config.VITE_BASE_URL}/add-to-cart`,
      element: (
        <ProtectedRoute>
          <AddtoCart />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/review-booking`,
      element: (
        <ProtectedRoute>
          <ReviewBooking />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/booking-success/:id`,
      element: (
        <ProtectedRoute>
          <BookingSuccess />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/edit-profile`,
      element: (
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/my-wallet`,
      element: (
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/my-bookings`,
      element: (
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/track-order/:id`,
      element: (
        <ProtectedRoute>
          <TrackOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: `${config.VITE_BASE_URL}/women-empowerment`,
      element: <WomenEmpowerment />,
    },
    {
      path: `${config.VITE_BASE_URL}/privacy-policy`,
      element: <PrivacyPolicy />,
    },
    { path: `${config.VITE_BASE_URL}/about-us`, element: <AboutUs /> },
    { path: `${config.VITE_BASE_URL}/contact-us`, element: <ContactUs /> },
    { path: `${config.VITE_BASE_URL}/careers`, element: <CareerPage /> },
    { path: `${config.VITE_BASE_URL}/partner-us`, element: <PartnerWithUs /> },
    {
      path: `${config.VITE_BASE_URL}/terms-conditions`,
      element: <TermsConditions />,
    },
    {
      path: `${config.VITE_BASE_URL}/delete-account`,
      element: <DeleteAccountPage />,
    },

    {
      path: `${config.VITE_BASE_URL}/register-free-listing`,
      element: <ServiceProviderRegistration />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
