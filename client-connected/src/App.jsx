import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import fetchSettings from "./config/settings";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ContProvider } from "./context/MyContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastProvider";

import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchSettings();
        if (data) setSettings(data);
      } catch (error) {
        console.error("❌ Error loading site settings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  return (
    <HelmetProvider>
      <ContProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              {/* ✅ Default Helmet SEO */}
              <Helmet>
                <title>{settings?.meta_title || "Hommlie - Pest Control & Cleaning Services in Bangalore"}</title>
                <meta
                  name="description"
                  content={
                    settings?.meta_description ||
                    "Hommlie provides professional pest control, deep cleaning, and home services in Bangalore. Book trusted experts today!"
                  }
                />
                <meta property="og:title" content={settings?.meta_title || "Hommlie"} />
                <meta property="og:description" content={settings?.meta_description || "Book pest control & cleaning services in Bangalore."} />
                <meta property="og:image" content={settings?.og_image || "/default-og-image.jpg"} />
                <meta property="og:type" content="website" />
                <meta name="author" content={settings?.site_title || "Hommlie"} />
                <link rel="canonical" href="https://www.hommlie.com/" key="canonical" />
              </Helmet>

              {/* ✅ Header */}
              <Header
                logo={settings?.logo}
                logoAlt={settings?.site_title || "Hommlie"}
                facebook={settings?.facebook}
                instagram={settings?.instagram}
                linkedin={settings?.linkedin}
                twitter={settings?.twitter}
                youtube={settings?.youtube}
              />

              {/* ✅ Routes (show loader until settings are fetched) */}
              {loading ? (
                <div className="flex items-center justify-center h-screen">
                  <p className="text-lg font-medium text-gray-600">Loading...</p>
                </div>
              ) : (
                <Routes />
              )}

              {/* ✅ Footer */}
              <Footer
                logo={settings?.logo}
                logoAlt={settings?.site_title || "Hommlie"}
                copyright={settings?.copyright}
                facebook={settings?.facebook}
                instagram={settings?.instagram}
                linkedin={settings?.linkedin}
                twitter={settings?.twitter}
                youtube={settings?.youtube}
                locations={settings?.locations}
              />
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ContProvider>
    </HelmetProvider>
  );
}

export default App;
