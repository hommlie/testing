import { Star } from "lucide-react";

const formatCount = (n = 0) => {
  if (!n || n <= 0) return "0"; // no reviews
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
  return `${n}+`;
};

export default function Rating({ value = 4.9, count = 0, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      {[1].map((i) => (
        <span key={i} className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0463ac]">
          <Star className="w-3 h-3 text-white" fill="currentColor" />
        </span>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">
        {Number(value).toFixed(1)} ({formatCount(count)})
      </span>
    </div>
  );
}
