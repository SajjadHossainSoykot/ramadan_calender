import React from "react";

export default function Header({ dates }) {
  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-center md:justify-between md:text-left md:gap-6">
          {/* Left: Brand */}
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <i className="fas fa-mosque text-yellow-400 text-2xl md:text-3xl shrink-0" />

            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                সাহরী ও ইফতারের সময়সূচি
              </h1>
              <p className="mt-1 text-xs sm:text-sm opacity-90">
                ইসলামিক ফাউন্ডেশন বাংলাদেশ অনুযায়ী
              </p>
            </div>
          </div>

          {/* Right: Dates */}
          <div className="space-y-1 text-xs sm:text-sm md:text-sm lg:text-base opacity-95 md:text-right">
            <div>{dates?.en}</div>
            <div>{dates?.bn}</div>
            <div className="text-yellow-300 font-semibold">{dates?.hijri}</div>
          </div>
        </div>
      </div>
    </header>
  );
}