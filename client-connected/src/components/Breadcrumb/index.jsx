import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import config from "../../config/config";

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    return (
        <nav className="flex flex-wrap items-center gap-y-1 mb-4 sm:mb-6 mt-1 sm:mt-0">
            {/* Home Link */}
            <div
                onClick={() => { navigate(`${config.VITE_BASE_URL}/`); window.scrollTo(0, 0); }}
                className="flex items-center text-[12px] sm:text-[13px] text-gray-500 font-medium hover:text-[#249370] cursor-pointer transition-colors duration-200"
            >
                <Home className="w-3.5 h-3.5 mr-1" />
                <span>Home</span>
            </div>

            {/* Path Items */}
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-3 h-3 text-gray-400 mx-1 flex-shrink-0" />
                    {index === items.length - 1 ? (
                        <span className="text-[14px] sm:text-[16px] font-bold text-[#035240] leading-tight">
                            {item.label}
                        </span>
                    ) : item.link ? (
                        <div
                            onClick={() => { navigate(item.link); window.scrollTo(0, 0); }}
                            className="text-[12px] sm:text-[13px] text-gray-500 font-medium hover:text-[#249370] cursor-pointer transition-colors duration-200"
                        >
                            {item.label}
                        </div>
                    ) : (
                        <span className="text-[12px] sm:text-[13px] text-gray-500 font-medium">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
