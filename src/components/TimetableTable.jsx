import React from "react";

/* Convert English digits to Bangla */
function toBnNumber(input) {
  const bn = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return String(input).replace(/\d/g, (d) => bn[d]);
}

export default function TimetableTable({ timetable, highlightIndex }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center border-collapse">
        <thead className="bg-green-100 text-green-900 border-b-2 border-green-300">
          <tr>
            <Th className="w-16">রোজা</Th>
            <Th>ইংরেজি তারিখ</Th>
            <Th className="bg-green-200/50">সাহরী শেষ</Th>
            <Th className="hidden md:table-cell">ফজর আজান</Th>
            <Th className="bg-green-200/50">ইফতার</Th>
          </tr>
        </thead>

        <tbody className="text-base md:text-lg">
          {timetable.map((row, i) => {
            const isToday = i === highlightIndex;

            return (
              <tr
                key={row.day}
                className={
                  isToday
                    ? "bg-yellow-50 border-l-4 border-yellow-400"
                    : i % 2 === 0
                      ? "bg-white"
                      : "bg-green-50/40"
                }
              >
                <Td className="font-bold text-green-900 border-r border-green-100">
                  {toBnNumber(row.day)}
                </Td>

                <Td className="border-r border-green-100">
                  {row.dateStr}
                </Td>

                <Td className="font-extrabold text-green-900 bg-green-50/60 border-r border-green-100">
                  {toBnNumber(row.sahri)}
                </Td>

                <Td className="hidden md:table-cell border-r border-green-100">
                  {toBnNumber(row.fajr)}
                </Td>

                <Td className="font-extrabold text-orange-900 bg-green-50/60">
                  {toBnNumber(row.iftar)}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={`p-3 font-bold border-r border-green-200 text-center ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td
      className={`p-3 border-b border-green-100 text-center ${className}`}
    >
      {children}
    </td>
  );
}