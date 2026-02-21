import React, { useEffect, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";

export default function DistrictPicker({ value, onChange, options }) {
  const safeOptions = Array.isArray(options) ? options : [];
  const [query, setQuery] = useState("");

  const selectedOption = useMemo(() => {
    return safeOptions.find((o) => o.key === value) || safeOptions[0] || null;
  }, [safeOptions, value]);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return safeOptions;

    return safeOptions.filter((o) => {
      const name = (o.name || "").toLowerCase();
      const key = (o.key || "").toLowerCase();
      return name.includes(q) || key.includes(q);
    });
  }, [safeOptions, query]);

  useEffect(() => {
    setQuery("");
  }, [value]);

  return (
    <div className="bg-white rounded-xl shadow-md border-t-4 border-green-600 overflow-visible fade-in">
      <div className="p-4">
        <label className="block text-green-900 font-bold mb-2">
          <i className="fas fa-search mr-2 text-green-700" />
          আপনার জেলা নির্বাচন:
        </label>

        <Combobox
          value={selectedOption}
          onChange={(opt) => opt && onChange?.(opt.key)}
        >
          <div className="relative">
            <Combobox.Input
              className="w-full h-12 rounded-lg border border-green-200 bg-green-50/60 px-4 pr-10 text-base leading-none outline-none focus:ring-2 focus:ring-green-300"
              displayValue={(opt) => (opt ? opt.name : "")}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="জেলার নাম লিখুন..."
            />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-700">
              <i className="fas fa-chevron-down" />
            </Combobox.Button>

            <Combobox.Options className="absolute left-0 right-0 top-full mt-2 z-[9999] max-h-64 overflow-auto rounded-xl border border-green-200 bg-white shadow-lg focus:outline-none">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  কোনো জেলা পাওয়া যায়নি
                </div>
              ) : (
                filteredOptions.map((opt) => (
                  <Combobox.Option
                    key={opt.key}
                    value={opt}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-3 text-sm md:text-base ${
                        active ? "bg-green-100 text-green-900" : "text-gray-800"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span className={selected ? "font-bold" : "font-medium"}>
                          {opt.name}
                        </span>
                        {selected ? (
                          <span className="text-green-700 font-bold">✓</span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>

        <p className="mt-2 text-xs text-gray-500">
          টাইপ করে খুঁজুন অথবা তালিকা স্ক্রল করে নির্বাচন করুন।
        </p>
      </div>
    </div>
  );
}