"use client";

import React from "react";
import Image from "next/image";
import { Quote, Cpu } from "lucide-react";
import { artistProfile } from "@/data/powdData";

export default function PowDAbout() {
  return (
    <section id="about" className="relative py-28 bg-[#0A0705] text-[#EDE6DD] border-t border-[#1F1610]">
      {/* Studio Shadow Diagonal Light Beam */}
      <div className="absolute top-0 right-1/3 w-100 h-full bg-linear-to-b from-[#C88639]/5 via-transparent to-transparent -rotate-45 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-[#241A13]">
          <div className="flex items-center gap-2 mb-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-[#C88639] rounded-xs" />
            <span>BIOGRAPHY & PHILOSOPHY</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#F3EDE4] uppercase font-display">
            ABOUT POWD
          </h2>
        </div>

        {/* Editorial Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Multi-Frame Photography Spread */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Portrait Card */}
            <div className="relative aspect-4/5 w-full rounded-xs overflow-hidden border border-[#2B2019] shadow-2xl bg-[#120D09] group">
              <Image
                src="/PowD/PowD Avatar 2.png"
                alt="PowD Editorial Portrait"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0A0705] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#EDE6DD]">
                <span className="text-[#C88639]">POWD • PROFILE STUDY</span>
                <span className="text-[#8A7D70]">ESTD 2024</span>
              </div>
            </div>

            {/* Secondary Supporting Image with Architecture Column */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-3/4 rounded-xs overflow-hidden border border-[#2B2019] bg-[#120D09]">
                <Image
                  src="/PowD/PowD Pose 8.png"
                  alt="PowD Studio Column"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 bg-[#120D09] border border-[#2B2019] rounded-xs flex flex-col justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#C88639] tracking-widest uppercase block mb-1">
                    [ RESIDENCY ]
                  </span>
                  <p className="text-[#C4B8A8] leading-relaxed">
                    Underground clubs, secret warehouse sessions, and curated tech house showcases.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#1F1610] text-[10px] text-[#8A7D70]">
                  ORIGIN: VN • GLOBAL
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Biography, Quote & Gear Setup */}
          <div className="lg:col-span-7 space-y-10">
            {/* Editorial Quote */}
            <div className="p-8 bg-[#120D09] border-l-2 border-[#C88639] border-y border-r rounded-r-xs space-y-3">
              <Quote className="w-8 h-8 text-[#C88639]/40" />
              <p className="text-xl md:text-2xl font-bold text-[#F3EDE4] tracking-tight uppercase font-display leading-snug">
                “{artistProfile.quotes[0].quote}”
              </p>
              <span className="text-xs font-mono text-[#C88639] tracking-widest uppercase block pt-1">
                — {artistProfile.quotes[0].author} • {artistProfile.quotes[0].context}
              </span>
            </div>

            {/* Narrative Biography */}
            <div className="space-y-4 text-sm font-mono text-[#C4B8A8] leading-relaxed">
              {artistProfile.bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Gear & Performance Rig Breakdown */}
            <div className="space-y-4 pt-4 border-t border-[#1F1610]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C88639] tracking-widest uppercase">
                <Cpu className="w-4 h-4 text-[#C88639]" />
                <span>HARDWARE & PERFORMANCE RIG</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {artistProfile.gear.map((g) => (
                  <div
                    key={g.category}
                    className="p-4 bg-[#140E0A] border border-[#241A13] rounded-xs space-y-2"
                  >
                    <span className="text-[10px] font-mono text-[#8A7D70] tracking-widest uppercase block">
                      {g.category}
                    </span>
                    <ul className="space-y-1 text-xs font-mono text-[#EDE6DD]">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#C88639]" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
