// import { calendarSettings, rawDistrictData } from "../data/timetabledata.js";

// const BN = "০১২৩৪৫৬৭৮৯";

// export function bnDigits(s) {
//   return String(s).replace(/\d/g, (d) => BN[d]);
// }

// export function toBengaliNumber(n) {
//   return String(n).replace(/[0-9]/g, (d) => BN[d]);
// }

// export function getProcessedData() {
//   const processed = {};
//   const startDate = new Date(calendarSettings.startYear, calendarSettings.startMonth, calendarSettings.startDay);

//   Object.keys(rawDistrictData).forEach((key) => {
//     const district = rawDistrictData[key];
//     const sahriList = district.sahriTimes ? district.sahriTimes.split(",").map((s) => s.trim()) : [];
//     const fajrList = district.fajrTimes ? district.fajrTimes.split(",").map((s) => s.trim()) : [];
//     const iftarList = district.iftarTimes ? district.iftarTimes.split(",").map((s) => s.trim()) : [];

//     const timetable = [];
//     for (let i = 0; i < 30; i++) {
//       const d = new Date(startDate);
//       d.setDate(startDate.getDate() + i);

//       timetable.push({
//         day: i + 1,
//         fullDate: d,
//         dateStr: d.toLocaleDateString("bn-BD", { day: "numeric", month: "long" }),
//         sahri: sahriList[i] || "---",
//         fajr: fajrList[i] || "---",
//         iftar: iftarList[i] || "---",
//       });
//     }

//     processed[key] = { name: district.name, timetable };
//   });

//   return processed;
// }

// export function formatBnDate(dateObj) {
//   const fmt = new Intl.DateTimeFormat("bn-BD", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
//   return fmt.format(dateObj);
// }

// export function formatHijri(dateObj) {
//   // Many browsers support Islamic calendar via Intl (fallback to bn date if not)
//   try {
//     const fmt = new Intl.DateTimeFormat("bn-BD-u-ca-islamic", { year: "numeric", month: "long", day: "numeric" });
//     return fmt.format(dateObj) + " (হিজরি)";
//   } catch {
//     return formatBnDate(dateObj);
//   }
// }

// export function parseTimeToDate(baseDate, timeStr) {
//   const t = String(timeStr || "")
//     .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
//     .trim();
//   const parts = t.split(":");
//   if (parts.length < 2) return null;
//   const h = parseInt(parts[0], 10);
//   const m = parseInt(parts[1], 10);
//   if (Number.isNaN(h) || Number.isNaN(m)) return null;
//   const d = new Date(baseDate);
//   d.setHours(h, m, 0, 0);
//   return d;
// }

// export function pickNextEvent(now, sahriEnd, fajr, iftar) {
//   const candidates = [
//     { label: "সাহরী শেষ", t: sahriEnd, timeStr: sahriEnd ? sahriEnd.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" }) : "" },
//     { label: "ফজর আজান", t: fajr, timeStr: fajr ? fajr.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" }) : "" },
//     { label: "ইফতার", t: iftar, timeStr: iftar ? iftar.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" }) : "" },
//   ].filter((x) => x.t instanceof Date && !Number.isNaN(x.t.getTime()));

//   for (const c of candidates) {
//     if (c.t.getTime() > now.getTime()) return c;
//   }
//   return null;
// }

// export function formatHMS(ms) {
//   const total = Math.max(0, Math.floor(ms / 1000));
//   const hh = Math.floor(total / 3600);
//   const mm = Math.floor((total % 3600) / 60);
//   const ss = total % 60;
//   const pad = (n) => String(n).padStart(2, "0");
//   return bnDigits(`${pad(hh)}:${pad(mm)}:${pad(ss)}`);
// }

// export function computeNextEvent(todayRow, now = new Date()) {
//   if (!todayRow?.fullDate) return null;
//   const base = todayRow.fullDate;
//   const sahriEnd = parseTimeToDate(base, todayRow.sahri);
//   const fajr = parseTimeToDate(base, todayRow.fajr);
//   const iftar = parseTimeToDate(base, todayRow.iftar);

//   const next = pickNextEvent(now, sahriEnd, fajr, iftar);
//   if (!next) return null;

//   return {
//     label: next.label,
//     timeStr: next.timeStr,
//     remainingMs: next.t.getTime() - now.getTime(),
//   };
// }

import { calendarSettings, rawDistrictData } from "../data/timetabledata.js";

const BN = "০১২৩৪৫৬৭৮৯";

export function bnDigits(s) {
  return String(s).replace(/\d/g, (d) => BN[d]);
}

export function toBengaliNumber(n) {
  return String(n).replace(/[0-9]/g, (d) => BN[d]);
}

export function getProcessedData() {
  const processed = {};
  const startDate = new Date(
    calendarSettings.startYear,
    calendarSettings.startMonth,
    calendarSettings.startDay
  );

  Object.keys(rawDistrictData).forEach((key) => {
    const district = rawDistrictData[key];
    const sahriList = district.sahriTimes
      ? district.sahriTimes.split(",").map((s) => s.trim())
      : [];
    const fajrList = district.fajrTimes
      ? district.fajrTimes.split(",").map((s) => s.trim())
      : [];
    const iftarList = district.iftarTimes
      ? district.iftarTimes.split(",").map((s) => s.trim())
      : [];

    const timetable = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      timetable.push({
        day: i + 1,
        fullDate: d,
        dateStr: d.toLocaleDateString("bn-BD", { day: "numeric", month: "long" }),
        sahri: sahriList[i] || "---",
        fajr: fajrList[i] || "---",
        iftar: iftarList[i] || "---",
      });
    }

    processed[key] = { name: district.name, timetable };
  });

  return processed;
}

export function formatBnDate(dateObj) {
  const fmt = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return fmt.format(dateObj);
}

export function formatHijri(dateObj) {
  // Many browsers support Islamic calendar via Intl (fallback to bn date if not)
  try {
    const fmt = new Intl.DateTimeFormat("bn-BD-u-ca-islamic", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return fmt.format(dateObj) + " (হিজরি)";
  } catch {
    return formatBnDate(dateObj);
  }
}

/**
 * Parse "৫:১৫" -> Date with correct hours/minutes.
 * mode:
 * - "morning": keep hour as is
 * - "evening": if hour < 12 => add 12 (so ৬:০৩ => ১৮:০৩)
 * - "auto": same as morning (kept for compatibility)
 */
export function parseTimeToDate(baseDate, timeStr, mode = "auto") {
  const t = String(timeStr || "")
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .trim();

  const parts = t.split(":");
  if (parts.length < 2) return null;

  let h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);

  if (Number.isNaN(h) || Number.isNaN(m)) return null;

  // ✅ Fix: treat iftar as PM (evening)
  if (mode === "evening") {
    if (h < 12) h += 12;
  }

  const d = new Date(baseDate);
  d.setHours(h, m, 0, 0);
  return d;
}

export function pickNextEvent(now, sahriEnd, fajr, iftar) {
  const candidates = [
    {
      label: "সাহরী শেষ",
      t: sahriEnd,
      timeStr: sahriEnd
        ? sahriEnd.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" })
        : "",
    },
    {
      label: "ফজর আজান",
      t: fajr,
      timeStr: fajr
        ? fajr.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" })
        : "",
    },
    {
      label: "ইফতার",
      t: iftar,
      timeStr: iftar
        ? iftar.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" })
        : "",
    },
  ].filter((x) => x.t instanceof Date && !Number.isNaN(x.t.getTime()));

  for (const c of candidates) {
    if (c.t.getTime() > now.getTime()) return c;
  }
  return null;
}

export function formatHMS(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return bnDigits(`${pad(hh)}:${pad(mm)}:${pad(ss)}`);
}

/**
 * ✅ FIXED:
 * - Iftar parsed as evening (PM)
 * - If all today's events passed, switch to tomorrow's Sahri (if tomorrowRow provided)
 */
export function computeNextEvent(todayRow, tomorrowRow = null, now = new Date()) {
  if (!todayRow?.fullDate) return null;

  const baseToday = todayRow.fullDate;

  // morning events
  const sahriEnd = parseTimeToDate(baseToday, todayRow.sahri, "morning");
  const fajr = parseTimeToDate(baseToday, todayRow.fajr, "morning");

  // ✅ evening event
  const iftar = parseTimeToDate(baseToday, todayRow.iftar, "evening");

  const nextToday = pickNextEvent(now, sahriEnd, fajr, iftar);
  if (nextToday) {
    return {
      label: nextToday.label,
      timeStr: nextToday.timeStr,
      remainingMs: nextToday.t.getTime() - now.getTime(),
    };
  }

  // ✅ If no more event today, show tomorrow sahri countdown (if tomorrowRow exists)
  if (tomorrowRow?.fullDate) {
    const baseTomorrow = tomorrowRow.fullDate;
    const sahriTomorrow = parseTimeToDate(baseTomorrow, tomorrowRow.sahri, "morning");

    if (sahriTomorrow && sahriTomorrow.getTime() > now.getTime()) {
      return {
        label: "সাহরী শেষ",
        timeStr: sahriTomorrow.toLocaleTimeString("bn-BD", {
          hour: "numeric",
          minute: "2-digit",
        }),
        remainingMs: sahriTomorrow.getTime() - now.getTime(),
      };
    }
  }

  return null;
}