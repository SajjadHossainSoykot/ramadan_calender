import React, { useMemo } from "react";
import { formatHMS } from "../utils/timeUtils.js";

/* Convert English digits to Bangla digits */
function toBnNumber(input) {
  const bn = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return String(input).replace(/\d/g, (d) => bn[d]);
}

export default function TodayPanel({
  districtName,
  todayIndex,
  todayRow,
  nextEvent,
}) {

  const dayText = useMemo(() => {
    if (todayIndex < 0) return "রমজান শুরু হয়নি";
    if (todayIndex > 29) return "রমজান শেষ হয়েছে";
    return `রমজান: ${toBnNumber(todayIndex + 1)} তম দিন`;
  }, [todayIndex]);

  const hasNext = Boolean(nextEvent?.label);

  return (
    <div className="bg-white rounded-xl shadow-md border-t-4 border-yellow-500 overflow-hidden fade-in">

      {/* Header */}
      <div className="bg-yellow-50 p-3 border-b border-yellow-100 text-center">
        <h3 className="font-bold text-yellow-800 flex items-center justify-center gap-2 text-lg">
          <i className="fas fa-calendar-day" /> আজকের সময়সূচি
        </h3>
        <p className="mt-1 text-sm text-yellow-700">
          {districtName ?? "—"} • {dayText}
        </p>
      </div>

      {/* 3 Summary Tiles */}
      <div className="p-4 grid grid-cols-3 gap-3 text-center">
        <Info variant="green" label="সাহরী শেষ" value={todayRow?.sahri ?? "--:--"} />
        <Info variant="blue" label="ফজর আজান" value={todayRow?.fajr ?? "--:--"} />
        <Info variant="orange" label="ইফতার" value={todayRow?.iftar ?? "--:--"} />
      </div>

      {/* Countdown Card (Restored Design) */}
      <div className="px-4 pb-5">
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden">

          {/* Blue Header Strip */}
          <div className="bg-blue-50 p-3 border-b border-blue-200 text-center">
            <h3 className="font-bold text-blue-800 flex items-center justify-center gap-2 text-lg">
              <i className="fas fa-hourglass-half" /> পরবর্তী সময় (কাউন্টডাউন)
            </h3>
          </div>

          <div className="p-5 text-center">
            {!hasNext ? (
              <>
                <p className="text-sm text-gray-500">
                  আজকের জন্য আর কোনো ইভেন্ট নেই
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  নির্দিষ্ট জেলার সময় অনুযায়ী
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">পরবর্তী ইভেন্ট</p>

                <p className="mt-1 text-2xl md:text-3xl font-black text-blue-900">
                  {nextEvent.label}
                </p>

                <p className="mt-1 text-lg text-gray-600">
                  {nextEvent.timeStr}
                </p>

                {/* Big Countdown Box */}
                <div className="mt-4 bg-blue-100 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 font-bold mb-1">
                    বাকি সময়
                  </p>
                  <p className="font-mono text-3xl md:text-4xl font-black text-blue-900 tracking-wider">
                    {toBnNumber(formatHMS(nextEvent.remainingMs))}
                  </p>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  নির্দিষ্ট জেলার সময় অনুযায়ী
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Green Strip */}
      <div className="bg-green-800 text-white text-center py-2 text-sm font-medium">
        আজকের রোজা: {todayIndex >= 0 && todayIndex <= 29
          ? `${toBnNumber(todayIndex + 1)} তম`
          : "—"}
      </div>
    </div>
  );
}

/* Tile Component */
function Info({ variant, label, value }) {
  const styles =
    variant === "blue"
      ? "bg-blue-50 border-blue-100 text-blue-900"
      : variant === "orange"
      ? "bg-orange-50 border-orange-100 text-orange-900"
      : "bg-green-50 border-green-100 text-green-900";

  const labelStyles =
    variant === "blue"
      ? "text-blue-700"
      : variant === "orange"
      ? "text-orange-700"
      : "text-green-700";

  return (
    <div className={`${styles} p-3 rounded-lg border`}>
      <p className={`text-xs ${labelStyles} font-bold`}>
        {label}
      </p>
      <p className="text-xl md:text-2xl font-black leading-tight mt-1">
        {toBnNumber(value)}
      </p>
    </div>
  );
}