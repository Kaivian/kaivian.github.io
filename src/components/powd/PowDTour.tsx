"use client";

import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { tourDates } from "@/data/powdData";

export default function PowDTour() {
  return (
    <section id="dates" className="relative py-28 bg-[#0A0705] text-[#EDE6DD] border-t border-[#1F1610]">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#241A13] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#C88639] rounded-xs" />
              <span>LIVE TRANSMISSIONS & RESIDENCY</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#F3EDE4] uppercase font-display">
              TOUR DATES // 2026
            </h2>
          </div>

          <div className="text-right font-mono text-xs text-[#8A7D70]">
            <span className="text-[#C4B8A8] block">CLUB CIRCUIT</span>
            <span>VIETNAM • SOUTHEAST ASIA</span>
          </div>
        </div>

        {/* Tour List Rows */}
        <div className="divide-y divide-[#1F1610] border-y border-[#1F1610]">
          {tourDates.map((item) => (
            <div
              key={item.id}
              className="group py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#120D09] px-4 md:px-6 transition-colors rounded-xs"
            >
              {/* Date Column */}
              <div className="flex items-center gap-6 md:w-1/4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-[#140E0A] border border-[#2B2019] group-hover:border-[#C88639] rounded-xs transition-colors">
                  <span className="text-xl font-black text-[#F3EDE4] font-display">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-mono text-[#C88639] font-bold">
                    {item.month}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-mono text-[#8A7D70] block">SCHEDULED</span>
                  <span className="text-sm font-bold text-[#EDE6DD] font-mono">{item.date}</span>
                </div>
              </div>

              {/* Venue & City */}
              <div className="md:w-2/4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C88639] mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.city}, {item.country}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-[#F3EDE4] group-hover:text-[#E2A958] transition-colors uppercase font-display">
                  {item.venue}
                </h4>
                <p className="text-xs text-[#8A7D70] font-mono mt-0.5">
                  {item.event}
                </p>
              </div>

              {/* Status & Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 md:w-1/4">
                <span className="text-xs font-mono px-3 py-1 bg-[#1A130E] border border-[#2B2019] text-[#C4B8A8] rounded-xs">
                  {item.status}
                </span>

                <a
                  href="#contact"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#1F1611] hover:bg-[#C88639] hover:text-[#0A0705] text-[#EDE6DD] border border-[#33251B] text-xs font-mono font-bold tracking-wider transition-all rounded-xs"
                >
                  <span>GUESTLIST</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
