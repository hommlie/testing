import React from "react";
import WasteComingSoon from "../components/WasteComingSoon";

export default function WasteManagement() {
  return (
    <WasteComingSoon
      asPage
      // Point to your actual logos inside public/assets/logo/
      leftLogoSrc = "/assets/logo/hommlieloogo.png"
      rightLogoSrc = "/assets/logo/ecospare-logo.png"
      leftAlt="Hommlie"
      rightAlt="EcoSphere"
      collabText="Hommlie × EcoSphere"
    />
  );
}
