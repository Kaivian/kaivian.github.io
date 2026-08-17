"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/powdData";

export default function PowDFooter() {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080504] text-[#EDE6DD] border-t border-[#1C140E] py-14 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* DIGITAL ECOSYSTEM Grid */}
        <div className="pb-12 border-b border-[#1A120D]">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[#C88639] rounded-xs" />
              <span>DIGITAL ECOSYSTEM</span>
            </div>
            <span className="text-[10px] font-mono text-[#6E6255] uppercase tracking-widest hidden sm:block">
              OFFICIAL TRANSMISSION CHANNELS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#0E0A07] hover:bg-[#160F0A] border border-[#1F1610] hover:border-[#C88639]/50 rounded-xs flex flex-col justify-between gap-3 transition-all group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F3EDE4] group-hover:text-[#E2A958] font-mono tracking-wider transition-colors">
                    {social.platform}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6E6255] group-hover:text-[#C88639] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <span className="text-[10px] font-mono text-[#8A7D70] group-hover:text-[#C4B8A8] truncate block transition-colors">
                  {social.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Brand & Moniker & Studio Time Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-b border-[#1A120D]">
          {/* Brand & Moniker */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-2xl font-black text-[#F3EDE4] tracking-tighter uppercase font-display">
                POWD
              </span>
              <span className="text-[10px] font-mono text-[#C88639] border border-[#2B2019] px-1.5 py-0.5 rounded-xs tracking-widest">
                ESTD. 2024
              </span>
            </div>
            <p className="text-xs font-mono text-[#8A7D70]">
              BASS TECH HOUSE • UNDERGROUND CLUB FREQUENCIES
            </p>
          </div>

          {/* Local Studio Clock */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#8A7D70]">
            <div>
              <span className="text-[10px] text-[#C4B8A8] block uppercase">STUDIO TIME (GMT+7)</span>
              <span className="text-sm font-bold text-[#E2A958]">{localTime || "00:00:00"}</span>
            </div>
            <div className="h-6 w-[1px] bg-[#241A13]" />
            <div>
              <span className="text-[10px] text-[#C4B8A8] block uppercase">STATUS</span>
              <span className="text-[#C88639] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C88639] animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#120D09] hover:bg-[#1A130E] border border-[#241A13] hover:border-[#C88639] text-xs font-mono text-[#EDE6DD] transition-all rounded-xs"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C88639]" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7A6E62]">
          <div>
            POWD © {new Date().getFullYear()}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>SOUND ARCHITECTURE</span>
            <span>•</span>
            <span>HIGH FASHION EDITORIAL</span>
            <span>•</span>
            <span>VIETNAM / GLOBAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
