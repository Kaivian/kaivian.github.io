"use client";

import React from "react";
import Image from "next/image";
import { Activity, Sliders, Disc, Zap } from "lucide-react";
import { artistProfile } from "@/data/powdData";

export default function PowDSound() {
  const genres = [
    { title: "OPEN FORMAT DYNAMICS", desc: "Wide spectrum transitions spanning house, tech, bass, and peak-time momentum" },
    { title: "BASS TECH HOUSE", desc: "Heavy rolling sub-basslines and crisp syncopated percussion" },
    { title: "UNDERGROUND CLUB", desc: "Dark tension, warehouse dynamics, and hypnotic momentum" },
    { title: "RAW GROOVES", desc: "Stripped-back minimal rhythm architecture built for floor control" },
  ];

  return (
    <section id="sound" className="relative py-28 bg-[#0E0B09] text-[#EDE6DD] border-t border-[#1F1610] overflow-hidden">
      {/* Background Architectural Grid & Light Sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8863908_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C88639]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-[#241A13]">
          <div className="flex items-center gap-2 mb-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-[#C88639] rounded-xs" />
            <span>SONIC ARCHITECTURE & BLUEPRINT</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#F3EDE4] uppercase font-display">
            SOUND IDENTITY
          </h2>
        </div>

        {/* Asymmetric Split Layout with Crouched Cutout Pose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Giant Typographic Sound Categories */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {genres.map((genre, idx) => (
                <div
                  key={genre.title}
                  className="group p-6 bg-[#130E0A] hover:bg-[#1C140E] border border-[#241A13] hover:border-[#C88639]/50 rounded-sm transition-all duration-300 shadow-md"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11px] font-mono text-[#C88639] tracking-widest uppercase">
                      {"CODE 0" + (idx + 1) + " //"}
                    </span>
                    <span className="text-xs font-mono text-[#8A7D70]">
                      FREQ. {126 + idx} BPM
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-[#F3EDE4] group-hover:text-[#E2A958] tracking-tight uppercase font-display transition-colors">
                    {genre.title}
                  </h3>
                  <p className="text-xs text-[#C4B8A8] font-mono mt-2 leading-relaxed">
                    {genre.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Sound Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {artistProfile.soundMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 bg-[#140E0A] border border-[#2B2019] rounded-xs"
                >
                  <span className="text-[9px] font-mono text-[#8A7D70] tracking-widest block uppercase mb-1">
                    {metric.label}
                  </span>
                  <span className="text-sm font-bold text-[#E2A958] block font-mono">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Artist Cutout breaking boundary & Studio telemetry card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Background Halo Disc */}
            <div className="relative w-full aspect-[4/5] max-w-md bg-[#130E0A] border border-[#2B2019] rounded-sm p-6 flex flex-col justify-between overflow-hidden shadow-2xl group">
              {/* Glowing Amber Center Disc */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#C88639]/20 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

              {/* Top Card Info */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8A7D70] border-b border-[#241A13] pb-3">
                <span className="text-[#C88639] font-bold">UNDERGROUND POSITION</span>
                <span>ESTD 2024</span>
              </div>

              {/* Cutout Image of Crouched Pose */}
              <div className="relative w-full h-[380px] sm:h-[420px] z-10 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/PowD/cutouts/PowD-Pose-3-cutout.png"
                  alt="PowD Underground Stance"
                  fill
                  className="object-contain object-bottom filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Bottom Card Telemetry */}
              <div className="relative z-10 border-t border-[#241A13] pt-3 text-center">
                <span className="text-xs font-mono text-[#EDE6DD] font-semibold tracking-wider block">
                  POWD • CLUB ENERGY & BASS PRESSURE
                </span>
                <span className="text-[10px] font-mono text-[#8A7D70]">
                  CALIBRATED FOR PEAK TIME FLOOR CONTROL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
