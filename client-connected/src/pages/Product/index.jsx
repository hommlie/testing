import React, { useRef, useState, useEffect, useMemo } from "react";

const products = [
  { id: 1, img: "/images/product1.png", title: "Hompure", price: "₹1599", mrp: "₹2746" },
  { id: 2, img: "/images/product1.png", title: "Hompure", price: "₹1399", mrp: "₹2067" },
  { id: 3, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹1145" },
  { id: 4, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹998"  },
  { id: 5, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹998"  },
  { id: 6, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹998"  },
];

const bestsellers = [
   { id: 1, img: "/images/product1.png", title: "Hompure", price: "₹1599", mrp: "₹2746" },
  { id: 2, img: "/images/product1.png", title: "Hompure", price: "₹1399", mrp: "₹2067" },
  { id: 3, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹1145" },
  { id: 4, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹998"  },
  { id: 5, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹998"  },
  { id: 6, img: "/images/product1.png", title: "Hompure", price: "₹799",  mrp: "₹998"  },
];

const ANNOUNCEMENTS = [
  "NEW GST-REDUCED PRICES FROM 22ND SEPT",
  "USE CODE: TREAT10 AND ENJOY 10% OFF ON ALL ORDERS",
];

const AnnouncementBar = () => {
  const DURATION = 5000;
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [progress, setProgress] = useState(0);

  // measure the exact text width so the underline matches each sentence
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        const w = textRef.current.getBoundingClientRect().width;
        setTextWidth(w);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [idx]);

  // autoplay + restart underline animation every sentence
  useEffect(() => {
    setProgress(0);
    const t1 = setTimeout(() => setProgress(100), 50); // kick underline
    const t2 = setTimeout(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIdx((p) => (p + 1) % ANNOUNCEMENTS.length);
        setFade(true); // fade in next
      }, 250);
    }, DURATION);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [idx]);

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIdx((p) => (p - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
      setFade(true);
    }, 200);
  };
  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIdx((p) => (p + 1) % ANNOUNCEMENTS.length);
      setFade(true);
    }, 200);
  };

  return (
    <div className="w-full bg-[#1f1f1f] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-10 sm:h-12 flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous announcement"
            className="p-1 sm:p-2 opacity-80 hover:opacity-100 transition"
          >
            <span className="inline-block text-xl leading-none select-none">‹</span>
          </button>

          {/* Message */}
          <div className="flex-1 px-3 sm:px-6">
            <div
              className={`text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-center uppercase transition-opacity duration-200 ease-out ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <span ref={textRef}>{ANNOUNCEMENTS[idx]}</span>
            </div>
            {/* Underline progress – sized to the text width, centered */}
            <div
              className="mx-auto mt-0.5 h-[2px] bg-white/20"
              style={{ width: textWidth ? `${textWidth}px` : undefined, maxWidth: 460 }}
            >
              <div
                className="h-full bg-white"
                style={{
                  width: `${progress}%`,
                  transition: `width ${DURATION}ms linear`,
                }}
              />
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next announcement"
            className="p-1 sm:p-2 opacity-80 hover:opacity-100 transition"
          >
            <span className="inline-block text-xl leading-none select-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};
/* ================= End Announcement Bar ===================== */

const Product = () => {
  /* ===== First section refs/state (unchanged) ===== */
  const scrollRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);
  const desktopOverflows = useMemo(() => products.length > 4, []);
  const [desktopPages, setDesktopPages] = useState(1);
  const [activeDesktopPage, setActiveDesktopPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  /* ===== Second section (bestsellers) refs/state (added) ===== */
  const scrollRef2 = useRef(null);
  const [activeItem2, setActiveItem2] = useState(0);
  const desktopOverflows2 = useMemo(() => bestsellers.length > 4, []);
  const [desktopPages2, setDesktopPages2] = useState(1);
  const [activeDesktopPage2, setActiveDesktopPage2] = useState(0);
  const [itemsPerPage2, setItemsPerPage2] = useState(4);

  const computeCardFullWidth = (el) => {
    if (!el || !el.children.length) return 0;
    const first = el.children[0];
    const childWidth = first.getBoundingClientRect().width;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
    return childWidth + gap;
  };

  const recalc = (el, setPages, setActivePage, setItems, desktopFlag, setActiveDot) => {
    if (!el) return;
    const isDesktop = window.innerWidth >= 768;
    const full = computeCardFullWidth(el);
    if (full <= 0) return;

    if (isDesktop && desktopFlag) {
      const ipp = Math.max(1, Math.floor((el.clientWidth + (parseFloat(getComputedStyle(el).gap || "0") || 0)) / full));
      setItems(ipp);
      setPages(Math.max(1, Math.ceil(el.children.length / ipp)));
      const page = Math.round(el.scrollLeft / (full * ipp));
      setActivePage(Math.max(0, page));
    } else {
      const current = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((node, idx) => {
        const left = node.offsetLeft + node.clientWidth / 2;
        const dist = Math.abs(left - current);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      setActiveDot(bestIdx);
      setPages(1);
      setActivePage(0);
    }
  };

  useEffect(() => {
    const el1 = scrollRef.current;
    const el2 = scrollRef2.current;
    if (!el1 && !el2) return;

    const doRecalc = () => {
      recalc(el1, setDesktopPages, setActiveDesktopPage, setItemsPerPage, desktopOverflows, setActiveItem);
      recalc(el2, setDesktopPages2, setActiveDesktopPage2, setItemsPerPage2, desktopOverflows2, setActiveItem2);
    };

    doRecalc();
    window.addEventListener("resize", doRecalc);
    return () => window.removeEventListener("resize", doRecalc);
  }, []);

  const scrollToItem = (idx, ref) => {
    const el = ref.current;
    if (!el) return;
    const target = el.children[idx];
    if (!target) return;
    el.scrollTo({
      left: target.offsetLeft - parseInt(getComputedStyle(el).paddingLeft || "0", 10),
      behavior: "smooth",
    });
  };

  const scrollToPage = (pageIdx, ref, ipp) => {
    const el = ref.current;
    if (!el) return;
    const full = computeCardFullWidth(el);
    if (full <= 0) return;
    const left = pageIdx * ipp * full;
    el.scrollTo({ left, behavior: "smooth" });
  };

  const containerClasses = [
    "pb-4 flex gap-5 overflow-x-auto snap-x snap-mandatory",
    "[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]",
    "md:flex md:gap-6 md:overflow-x-auto md:snap-x md:snap-mandatory",
  ].join(" ");

  const cardClasses = "min-w-[260px] md:min-w-[280px] flex-shrink-0 snap-start";

  return (
    <>
      {/* === ADDED: Announcement bar above everything === */}
      <AnnouncementBar />

      {/* === Top Banner (kept) === */}
      <section className="w-full overflow-hidden">
        <div className="mx-auto relative h-[71svh] md:h-[400px] isolate px-3 max-w-[1400px]">
          <picture className="absolute inset-0 -z-10">
            <source media="(min-width:768px)" srcSet="/images/productbanner.png" />
            <img
              src="/images/scrap-desk.jpg"
              alt="Hommlie executive receiving scrap from customer"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </section>

      {/* === HOMMLIE SPECIAL (kept) === */}
      <section className="w-full md:w-[1210px] mx-auto">
        <div className="mx-auto px-4 sm:px-5 md:px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            HOMMLIE SPECIAL
          </h2>

          <div ref={scrollRef} className={containerClasses}>
            {products.map((p) => (
              <div key={p.id} className={cardClasses}>
                <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition mr-6">
                  <img src={p.img} alt={p.title} className="w-full h-48 sm:h-56 object-cover block" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-base md:text-lg font-semibold tracking-wide break-words leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-2">
                    <span className="text-pink-600 font-bold">{p.price}</span>{" "}
                    <span className="line-through text-gray-500 text-sm">{p.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All (kept) */}
          <div className="flex justify-center mt-6">
            <a
              href="/product"
              className="px-10 py-3 bg-[#15803d] hover:bg-[#52852d] text-white text-lg font-semibold transition"
              aria-label="View all products"
            >
              View All
            </a>
          </div>

          {/* Mobile dots (kept) */}
          <div className="flex justify-center mt-4 gap-2 md:hidden">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToItem(i, scrollRef)}
                aria-label={`Go to product ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i === activeItem ? "bg-green-600 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Desktop dots (kept, only if overflow) */}
          {desktopOverflows && (
            <div className="hidden md:flex justify-center mt-4 gap-2">
              {Array.from({ length: desktopPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToPage(i, scrollRef, itemsPerPage)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i === activeDesktopPage ? "bg-green-600 scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* === BESTSELLERS Scroll Section (kept added section) === */}
      <section className="w-full md:w-[1210px] mx-auto -mt-7">
        <div className="mx-auto px-4 sm:px-5 md:px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            BESTSELLERS
          </h2>

          <div ref={scrollRef2} className={containerClasses}>
            {bestsellers.map((p) => (
              <div key={p.id} className={cardClasses}>
                <div className="bg-white shadow-md overflow-hidden hover:shadow-lg transition mr-6">
                  <img src={p.img} alt={p.title} className="w-full h-48 sm:h-56 object-cover block" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-base md:text-lg font-semibold tracking-wide break-words leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-2">
                    <span className="text-pink-600 font-bold">{p.price}</span>{" "}
                    <span className="line-through text-gray-500 text-sm">{p.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All for Bestsellers */}
          <div className="flex justify-center mt-6">
            <a
              href="/product"
              className="px-10 py-3 bg-[#15803d] hover:bg-[#52852d] text-white text-lg font-semibold  transition"
              aria-label="View all bestsellers"
            >
              View All
            </a>
          </div>

          {/* Mobile dots for Bestsellers */}
          <div className="flex justify-center mt-4 gap-2 md:hidden">
            {bestsellers.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToItem(i, scrollRef2)}
                aria-label={`Go to bestseller ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i === activeItem2 ? "bg-green-600 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Desktop dots for Bestsellers (only if overflow) */}
          {desktopOverflows2 && (
            <div className="hidden md:flex justify-center mt-4 gap-2">
              {Array.from({ length: desktopPages2 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToPage(i, scrollRef2, itemsPerPage2)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i === activeDesktopPage2 ? "bg-green-600 scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Product;
