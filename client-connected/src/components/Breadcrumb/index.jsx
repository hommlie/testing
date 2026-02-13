import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import config from "../../config/config";

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    return (
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2 text-[13px] sm:text-sm font-medium mb-6 bg-gray-50/50 p-2 sm:p-3 rounded-lg border border-gray-100">
            <div
                onClick={() => navigate(`${config.VITE_BASE_URL}/`)}
                className="flex items-center text-gray-500 hover:text-[#249370] cursor-pointer transition-colors duration-200"
            >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
                <span className="hidden sm:inline">Home</span>
                <span className="sm:hidden text-xs">Home</span>
            </div>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    {item.link ? (
                        <div
                            onClick={() => navigate(item.link)}
                            className="text-gray-500 hover:text-[#249370] cursor-pointer transition-colors duration-200 max-w-[120px] sm:max-w-none truncate"
                        >
                            {item.label}
                        </div>
                    ) : (
                        <span className="text-[#035240] font-bold truncate max-w-[150px] sm:max-w-none">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
