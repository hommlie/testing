import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import OldHeader from "./components/Header/indexcopy";
import Footer from "./components/Footer";
import fetchSettings from "./config/settings";
import { HelmetProvider } from "react-helmet-async";
import { ContProvider, useCont } from "./context/MyContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastProvider";
import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchSettings();
      if (data) {
        setSettings(data);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      // Update favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = settings?.favicon;
      } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = settings?.favicon;
        document.head.appendChild(newFavicon);
      }

      // Update meta tags
      const updateMetaTag = (name, content) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (metaTag) {
          metaTag.content = content;
        } else {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          metaTag.content = content;
          document.head.appendChild(metaTag);
        }
      };

      let title = document.querySelector("title");
      if (title) {
        title.content = settings?.site_title;
      } else {
        const newTitle = document.createElement("title");
        newTitle.content = settings?.site_title;
        document.head.appendChild(newTitle);
      }

      updateMetaTag("title", settings?.meta_title);
      updateMetaTag("description", settings?.meta_description);
      updateMetaTag("og:image", settings?.og_image);
      // updateMetaTag("keywords", settings[0]?.metaKeywords);
      updateMetaTag("author", settings?.site_title);
    }
  }, [settings]);

  return (
    <HelmetProvider>
      <ContProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <OldHeader logo={settings?.logo} logoAlt={settings?.site_title} />
              <Routes />
              <Footer
                logo={settings?.logo}
                logoAlt={settings?.site_title}
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
