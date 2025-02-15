import Customers from "../../assets/icons/customer.svg";
import Reviews from "../../assets/icons/reviews.svg";
import Cities from "../../assets/icons/cities.svg";
import Warranty from "../../assets/icons/warranty.svg";

// Static data
const statsData = [
  {
    id: 1,
    count: "10 Lacs+",
    title: "Happy Customers",
    description: "Happy Customers",
    icon: Customers,
  },
  {
    id: 2,
    count: "04/05",
    title: "400+ Reviews on Google",
    description: "400+ Reviews on Google",
    icon: Reviews,
  },
  {
    id: 3,
    count: "30+ Cities",
    title: "Presence Across India",
    description: "Presence Across India",
    icon: Cities,
  },
  {
    id: 4,
    count: "Warranty",
    title: "Warranty Backed Service",
    description: "Warranty Backed Service",
    icon: Warranty,
  },
];

const StatsSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-gray-50 rounded-full">
                <img src={stat.icon} alt={stat.title} className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {stat.count}
              </h3>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
