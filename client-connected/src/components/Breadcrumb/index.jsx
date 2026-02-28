import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import config from "../../config/config";

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    return (
        <nav className="flex flex-col gap-1 sm:gap-1.5 mb-4 sm:mb-6 mt-1 sm:mt-0">
            {/* Breadcrumb Path Row */}
            <div className="flex flex-wrap items-center gap-x-2 text-[12px] sm:text-[13px] text-gray-500 font-medium">
                <div
                    onClick={() => { navigate(`${config.VITE_BASE_URL}/`); window.scrollTo(0, 0); }}
                    className="flex items-center hover:text-[#249370] cursor-pointer transition-colors duration-200"
                >
                    <Home className="w-3.5 h-3.5 mr-1" />
                    <span>Home</span>
                </div>

                {items.slice(0, -1).map((item, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        {item.link ? (
                            <div
                                onClick={() => { navigate(item.link); window.scrollTo(0, 0); }}
                                className="hover:text-[#249370] cursor-pointer transition-colors duration-200"
                            >
                                {item.label}
                            </div>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </React.Fragment>
                ))}
                {/* separator for the last item which is below */}
                {items.length > 0 && (
                    <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                )}
            </div>

            {/* Active Page Name (Last Item) below the path */}
            {items.length > 0 && (
                <div className="text-[16px] sm:text-[18px] font-bold text-[#035240] leading-tight">
                    {items[items.length - 1].label}
                </div>
            )}
        </nav>
    );
};

export default Breadcrumb;
