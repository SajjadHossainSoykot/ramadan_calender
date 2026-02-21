import React, { useEffect, useMemo, useState } from "react";
import { calendarSettings, rawDistrictData } from "./data/timetabledata.js";
import { getProcessedData, computeNextEvent, formatBnDate, formatHijri } from "./utils/timeUtils.js";
import Header from "./components/Header.jsx";
import DistrictPicker from "./components/DistrictPicker.jsx";
import TodayPanel from "./components/TodayPanel.jsx";
import BangladeshMap from "./components/BangladeshMap.jsx";
import TimetableTable from "./components/TimetableTable.jsx";
import Footer from "./components/Footer.jsx";

/* Convert English digits to Bangla digits */
function toBnNumber(input) {
  const bn = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return String(input).replace(/\d/g, (d) => bn[d]);
}

export default function App() {
  const processed = useMemo(() => getProcessedData(), []);

  // Default district = Dhaka, but persist user's last selection
  const [selectedKey, setSelectedKey] = useState(() => {
    try {
      return localStorage.getItem("selectedDistrict") || "dhaka";
    } catch {
      return "dhaka";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("selectedDistrict", selectedKey);
    } catch {
      // ignore (privacy mode)
    }
  }, [selectedKey]);

  const todayIndex = useMemo(() => {
    const start = new Date(
      calendarSettings.startYear,
      calendarSettings.startMonth,
      calendarSettings.startDay
    );
    const now = new Date();
    const a = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const b = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return Math.floor((b - a) / (24 * 60 * 60 * 1000));
  }, []);

  const district = processed[selectedKey] || processed["dhaka"];
  const todayRow = district?.timetable?.[todayIndex] ?? null;

  // ✅ Tomorrow row (needed to switch to tomorrow sahri after iftar)
  const tomorrowRow = district?.timetable?.[todayIndex + 1] ?? null;

  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    // ✅ Now computeNextEvent knows about tomorrowRow too
    const tick = () => setNextEvent(computeNextEvent(todayRow, tomorrowRow, new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [todayRow, tomorrowRow]);

  const headerDates = useMemo(() => {
    const now = new Date();

    const en = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const bn = formatBnDate(now);

    // ✅ Keep header "Ramadan day" consistent with timetable logic (todayIndex)
    // Use fallback to real hijri only if outside Ramadan range
    const hijri =
      todayIndex >= 0 && todayIndex <= 29
        ? `${toBnNumber(todayIndex + 1)} রমজান, ১৪৪৭ হিজরী`
        : formatHijri(now);

    return { en, bn, hijri };
  }, [todayIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header dates={headerDates} />

      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <section className="lg:col-span-4 space-y-4">
            <DistrictPicker
              value={selectedKey}
              onChange={setSelectedKey}
              options={Object.entries(rawDistrictData).map(([key, v]) => ({
                key,
                name: v.name,
              }))}
            />

            <TodayPanel
              districtName={district?.name}
              todayIndex={todayIndex}
              todayRow={todayRow}
              nextEvent={nextEvent}
            />

            <BangladeshMap selectedKey={selectedKey} onSelect={setSelectedKey} />
          </section>

          {/* Main Table Content */}
          <section className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-green-200">
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-6 text-white flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-4xl font-bold">{district?.name ?? "—"}</h2>
                  <p className="opacity-90 mt-1 flex items-center justify-center gap-2">
                    <i className="far fa-calendar-alt" /> মাহে রমজান ১৪৪৭ হিজরী (২০২৬)
                  </p>
                </div>
              </div>

              <TimetableTable timetable={district?.timetable ?? []} highlightIndex={todayIndex} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}