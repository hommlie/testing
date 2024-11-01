import React, { useState, useEffect, useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

// import { RiDeleteBin5Line } from "react-icons/ri";
// import { MdEdit, MdCall } from "react-icons/md";

// import { useCont } from "../../context/MyContext";

// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import config from "../../config/config";
// import { useToast } from "../../context/ToastProvider";
// import { IoMdClose } from "react-icons/io";

function LocationPage({ onClose }) {
  // const [currentLocation, setCurrentLocation] = useState("Set Location");
  const [currentLocationName, setCurrentLocationName] = useState("");
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "in" },
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) {
        alert("No details available for this place.");
        return;
      }

      const address = place.formatted_address;
      setCurrentLocationName(address);
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation && window.isSecureContext) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setCurrentLocationName(data.display_name);
          } catch (error) {
            console.error("Error fetching location data:", error);
            alert("Failed to fetch current location.");
          }
        },
        error => {
          console.error("Error getting location:", error);
          alert("Unable to get location.");
        }
      );
    } else {
      alert("Geolocation is not supported or not in a secure context.");
    }
  };
  return (
    <div className="">
    

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
        <div className="relative flex flex-col items-center gap-4 p-4 rounded-lg bg-gray-100 w-[500px] ">
        
          <IoMdClose onClick={onClose} className="absolute  top-[-33px] right-[1px] text-gray-600 cursor-pointer bg-gray-100 rounded-full" size={24} />

          {/* Input box with auto-suggest */}
          <div className="w-full max-w-lg">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for your location/society/apartment"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Button to use current location */}
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none" onClick={getCurrentLocation}>
            <GrLocation className="text-lg" />
            Use current location
          </button>

          {/* Display selected/current location */}
          <p className="text-gray-600 text-center">{currentLocationName ? `Current Location: ${currentLocationName}` : "No location selected"}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationPage;
