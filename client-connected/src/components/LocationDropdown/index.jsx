import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import config from "../../config/config";

const LocationDropdown = ({ locationArray }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredLocations = locationArray.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative text-right w-fit ml-auto">
      {/* Trigger */}
      <div
        className="flex items-center gap-2 cursor-pointer justify-end"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-lg font-medium text-[#035240]">
          We are available in:
        </span>
        <ChevronDown className={`w-5 h-5 text-[#035240] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Panel - Now positioned above */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-50 w-[250px] max-h-[300px] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
          {/* Search Input */}
          <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search locations..."
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#035240]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Locations List */}
          <div className="p-3">
            {filteredLocations.length > 0 ? (
              <div className="flex flex-col gap-2 text-sm max-h-[250px] overflow-y-auto">
                {filteredLocations.map((location) => (
                  <a
                    key={location}
                    href={`${config.VITE_BASE_URL}/${location.trim().toLowerCase()}`}
                    className="text-[#035240] hover:text-hommlie hover:underline transition-all text-center py-1.5"
                  >
                    {location.trim()}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500 py-2">
                No locations found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;