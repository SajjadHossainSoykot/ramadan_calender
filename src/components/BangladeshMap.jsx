import React, { useEffect, useMemo, useRef, useState } from "react";
import mapSvgRaw from "../assets/bd-map.svg?raw";

/**
 * Map approach:
 * - We import the original SVG as a raw string (Vite ?raw).
 * - Then attach event listeners to all paths inside #bd-map.
 * - Each <path> must have a unique id matching your district key (same as rawDistrictData keys).
 */
export default function BangladeshMap({ selectedKey, onSelect }) {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svg = container.querySelector("#bd-map");
    if (!svg) return;

    const paths = svg.querySelectorAll("path[id]");
    const tooltip = tooltipRef.current;

    const moveTooltip = (e) => {
      if (!tooltip) return;
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
    };

    const showTooltip = (e, name) => {
      if (!tooltip) return;
      tooltip.textContent = name || "";
      tooltip.style.display = "block";
      moveTooltip(e);
    };

    const hideTooltip = () => {
      if (!tooltip) return;
      tooltip.style.display = "none";
    };

    // bind
    paths.forEach((p) => {
      const name = p.getAttribute("data-name") || p.getAttribute("id") || "";
      const enter = (e) => showTooltip(e, name);
      const move = (e) => moveTooltip(e);
      const leave = () => hideTooltip();
      const click = () => onSelect(p.getAttribute("id"));

      p.addEventListener("mouseenter", enter);
      p.addEventListener("mousemove", move);
      p.addEventListener("mouseleave", leave);
      p.addEventListener("click", click);

      // store for cleanup
      p.__handlers = { enter, move, leave, click };
    });

    return () => {
      paths.forEach((p) => {
        const h = p.__handlers;
        if (!h) return;
        p.removeEventListener("mouseenter", h.enter);
        p.removeEventListener("mousemove", h.move);
        p.removeEventListener("mouseleave", h.leave);
        p.removeEventListener("click", h.click);
        delete p.__handlers;
      });
    };
  }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const svg = container.querySelector("#bd-map");
    if (!svg) return;
    const paths = svg.querySelectorAll("path[id]");
    paths.forEach((p) => {
      if (p.getAttribute("id") === selectedKey) p.classList.add("active");
      else p.classList.remove("active");
    });
  }, [selectedKey]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="text-sm font-semibold text-green-800">বাংলাদেশ মানচিত্র</div>
      <p className="mt-1 text-xs text-gray-600">জেলায় ক্লিক করে নির্বাচন করুন</p>

      <div className="mt-4 h-[420px] w-full overflow-hidden rounded-2xl bg-green-50 p-2 ring-1 ring-green-200">
        <div ref={containerRef} className="h-full w-full flex items-center justify-center fade-in"
          dangerouslySetInnerHTML={{ __html: mapSvgRaw }}
        />
        <div ref={tooltipRef} className="map-tooltip" />
      </div>
    </div>
  );
}
