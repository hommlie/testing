// src/components/Layout.jsx
import React from "react";
import "./Layout.css"; // Create a global layout style

export default function Layout({ children }) {
  return (
    <div className="global-container">
      {children}
    </div>
  );
}
