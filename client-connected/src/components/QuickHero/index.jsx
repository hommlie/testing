import React from 'react';

export default function QuickHero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#fef4f6] py-16 text-center overflow-hidden">
      {/* Sparkles */}
      <div className="absolute top-4 left-6 text-pink-500 text-3xl">✦</div>
      <div className="absolute top-4 right-6 text-pink-500 text-3xl">✦</div>
      <div className="absolute bottom-4 left-16 text-pink-500 text-3xl">✦</div>
      <div className="absolute bottom-4 right-20 text-pink-500 text-3xl">✦</div>

      {/* Headline */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#2a0014] leading-tight mb-4">
        INDIA'S FIRST <br />
        <span className="inline-block relative text-pink-600 font-extrabold italic">
          QUICK
          <span className="absolute left-0 bottom-0 w-full h-[5px] bg-pink-400 rounded-full -z-10 translate-y-[6px]" />
        </span>{' '}
        <span className="text-[#2a0014] font-extrabold">SERVICE APP</span>
      </h1>

      {/* Subheadline */}
      <p className="text-[#5c0b38] text-base md:text-lg font-medium mt-4">
        On-demand home services to empower <br className="hidden md:block" />
        urban households
      </p>
    </section>
  );
}
