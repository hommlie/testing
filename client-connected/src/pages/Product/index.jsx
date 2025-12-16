import React, { useState, useMemo } from "react";

/* ================== DATA ================== */

const PRODUCTS = [
  {
    id: 1,
    title: "Hompure Termite Control",
    img: "/images/product1.png",
    price: 1599,
    mrp: 2746,
    rating: 4.6,
    category: "Pest Control",
    bestseller: true,
  },
  {
    id: 2,
    title: "Hompure Bed Bug Spray",
    img: "/images/product1.png",
    price: 1399,
    mrp: 2067,
    rating: 4.4,
    category: "Pest Control",
  },
  {
    id: 3,
    title: "Hompure Floor Disinfectant",
    img: "/images/product1.png",
    price: 799,
    mrp: 1145,
    rating: 4.7,
    category: "Cleaning",
  },
  {
    id: 4,
    title: "Hompure Bathroom Cleaner",
    img: "/images/product1.png",
    price: 899,
    mrp: 1299,
    rating: 4.5,
    category: "Cleaning",
  },
];

/* ================== FILTER SIDEBAR ================== */

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <aside className="bg-white rounded-xl shadow-sm p-5 space-y-6">
      <h3 className="font-semibold text-lg">Filters</h3>

      {/* Category */}
      <div>
        <p className="font-medium mb-2">Category</p>
        {["All", "Pest Control", "Cleaning"].map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm mb-1">
            <input
              type="radio"
              checked={filters.category === cat}
              onChange={() => setFilters({ ...filters, category: cat })}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <p className="font-medium mb-2">Price</p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.under1000}
            onChange={(e) =>
              setFilters({ ...filters, under1000: e.target.checked })
            }
          />
          Under ₹1000
        </label>
      </div>

      {/* Rating */}
      <div>
        <p className="font-medium mb-2">Customer Rating</p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.rating4}
            onChange={(e) =>
              setFilters({ ...filters, rating4: e.target.checked })
            }
          />
          4★ & above
        </label>
      </div>
    </aside>
  );
};

/* ================== PRODUCT CARD ================== */

const ProductCard = ({ p }) => {
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img
          src={p.img}
          alt={p.title}
          className="h-56 w-full object-cover"
        />

        {p.bestseller && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Bestseller
          </span>
        )}

        <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {discount}% OFF
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{p.title}</h3>

        <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
          ★★★★☆ <span className="text-gray-500">({p.rating})</span>
        </div>

        <div className="mt-2">
          <span className="text-lg font-bold text-pink-600">₹{p.price}</span>
          <span className="ml-2 text-sm line-through text-gray-400">
            ₹{p.mrp}
          </span>
        </div>

        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

/* ================== MAIN PAGE ================== */

const Product = () => {
  const [filters, setFilters] = useState({
    category: "All",
    under1000: false,
    rating4: false,
  });

  const [sort, setSort] = useState("popular");

  const filteredProducts = useMemo(() => {
    let data = [...PRODUCTS];

    if (filters.category !== "All") {
      data = data.filter((p) => p.category === filters.category);
    }

    if (filters.under1000) {
      data = data.filter((p) => p.price < 1000);
    }

    if (filters.rating4) {
      data = data.filter((p) => p.rating >= 4);
    }

    if (sort === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "discount") {
      data.sort(
        (a, b) =>
          (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp
      );
    }

    return data;
  }, [filters, sort]);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[380px]">
        <img
          src="/images/productbanner.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hommlie"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-[1200px] mx-auto h-full flex flex-col justify-center px-4 text-white">
          <h1 className="text-4xl font-bold max-w-xl">
            Premium Home Care Products
          </h1>
          <p className="mt-3 max-w-md text-gray-200">
            Trusted by thousands of Indian homes
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div>
          {/* SORT */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} products
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="popular">Sort by Popularity</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
