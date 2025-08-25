import { Star } from "lucide-react";

const formatCount = (n = 0) => {
  if (!n || n <= 0) return "0"; // no reviews
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
  return `${n}+`;
};

export default function Rating({ value = 4.9, count = 0, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={
            i <= Math.round(value)
              ? "text-[#facc14] fill-current"
              : "text-gray-300"
          }
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">
        {Number(value).toFixed(1)} ({formatCount(count)})
      </span>
    </div>
  );
}
