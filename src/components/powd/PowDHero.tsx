"use client";

import React from "react";
import Image from "next/image";
import { Play, Radio } from "lucide-react";
import { releaseTracks } from "@/data/powdData";
import { ReleaseTrack } from "@/types/powd";

interface PowDHeroProps {
  onPlayTrack: (track: ReleaseTrack) => void;
  isPlaying: boolean;
}

export default function PowDHero({ onPlayTrack, isPlaying }: PowDHeroProps) {
  const latestTrack = releaseTracks[0];

  return (
    <section
      id="top"
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-8 bg-[#0A0705] text-[#F3EDE4]"
    >
      {/* Background Atmosphere & Ambient Bronze Disc Halo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm Bronze Radial Halo (Derived from PowD Avatar.png) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 sm:w-150 md:w-212.5 h-105 sm:h-150 md:h-212.5 rounded-full bg-[radial-gradient(circle,#C8863935_0%,#8A562418_50%,transparent_75%)] blur-2xl pointer-events-none" />

        {/* Subtle Architectural Light Beam (Derived from PowD Avatar 2.png) */}
        <div className="absolute -top-32 right-1/4 w-175 h-[130%] bg-linear-to-b from-[#E2A958]/10 via-[#C88639]/5 to-transparent -rotate-12 blur-3xl opacity-50 pointer-events-none" />

        {/* Studio Grid & Alignment Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F161020_1px,transparent_1px),linear-gradient(to_bottom,#1F161020_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      {/* Top Telemetry Header Row */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-[11px] font-mono text-[#8A7D70] pt-2 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C88639]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C88639]/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C88639]/30" />
          </div>
          <div>
            <span className="text-[#C4B8A8] block font-semibold">LOCATION CODE</span>
            <span>ĐÀ NẴNG, VIỆT NAM • 16.0544° N, 108.2022° E</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span className="px-2.5 py-1 border border-[#2B2019] bg-[#120D09] text-[#C4B8A8] rounded-xs font-mono">
            STYLE: OPEN FORMAT
          </span>
          <span className="px-2.5 py-1 border border-[#2B2019] bg-[#120D09] text-[#C4B8A8] rounded-xs font-mono">
            RANGE: 120 - 174 BPM
          </span>
        </div>

        <div className="text-right">
          <span className="text-[#C4B8A8] block font-semibold">ESTABLISHED</span>
          <span className="text-[#C88639] font-bold">MMXXIV / 2024</span>
        </div>
      </div>

      {/* Massive Layered Editorial Hero Centerpiece */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full px-4 select-none py-6">
        {/* Layer 1: Giant Background Typography "POWD" */}
        <div className="relative w-full max-w-7xl flex items-center justify-center h-105 sm:h-130 md:h-160 lg:h-185">
          <h1 className="text-[28vw] md:text-[25vw] font-black tracking-tighter leading-none text-[#160F0A] select-none uppercase font-display text-center drop-shadow-2xl">
            POWD
          </h1>

          {/* Layer 2: Outlined Secondary Typography Layer */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <span
              className="text-[28vw] md:text-[25vw] font-black tracking-tighter leading-none text-transparent uppercase font-display text-center opacity-40"
              style={{
                WebkitTextStroke: "1.5px #C88639",
              }}
            >
              POWD
            </span>
          </div>

          {/* Layer 3: High-Resolution Cutout Artist in Foreground - Proportionally Scaled Up */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 sm:w-105 md:w-135 lg:w-160 h-107.5 sm:h-137.5 md:h-167.5 lg:h-192.5 pointer-events-none z-20">
            <Image
              src="/PowD/PowD Pose 4 - BG.png"
              alt="PowD DJ / Electronic Music Producer"
              fill
              priority
              className="object-contain object-bottom drop-shadow-[0_25px_55px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Layer 4: Floating Subtle Metadata Badges */}
          <div className="hidden lg:block absolute left-8 top-1/4 z-10 bg-[#0E0B09]/90 backdrop-blur-md border border-[#2B2019] p-4 rounded-xs max-w-xs shadow-2xl">
            <span className="text-[9px] font-mono text-[#C88639] tracking-widest block uppercase mb-1">
              [ ARTIST DIRECTIVE ]
            </span>
            <p className="text-xs text-[#EDE6DD] font-mono leading-relaxed">
              Multi-genre open format, heavy international club drive, and adaptive floor control calibrated to crowd energy.
            </p>
          </div>

          <div className="hidden lg:block absolute right-8 bottom-1/4 z-10 bg-[#0E0B09]/90 backdrop-blur-md border border-[#2B2019] p-4 rounded-xs shadow-2xl text-right">
            <span className="text-[9px] font-mono text-[#C88639] tracking-widest block uppercase mb-1">
              [ SIGNATURE DISCOGRAPHY ]
            </span>
            <span className="text-sm font-bold text-[#F3EDE4] block font-display">
              OBSIDIAN PULSE
            </span>
            <span className="text-[11px] font-mono text-[#8A7D70]">
              MINIMAL BASS • 2026
            </span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Artist Statement & Quick Launch */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-t border-[#241A13] pt-6">
          {/* Statement */}
          <div className="md:col-span-5 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C88639]" />
              <h2 className="text-xs uppercase tracking-[0.25em] font-mono text-[#C88639] font-semibold">
                OPEN FORMAT SELECTOR
              </h2>
            </div>
            <p className="text-sm text-[#C4B8A8] font-mono leading-snug">
              Specialized in international club frequencies, cross-genre transitions, and intuitive crowd energy reading.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2 text-[10px] font-mono text-[#8A7D70]">
            <span className="tracking-widest uppercase">EXPLORE</span>
            <div className="w-px h-8 bg-linear-to-b from-[#C88639] to-transparent animate-pulse" />
          </div>

          {/* Quick Play Card */}
          <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-3">
            <div className="flex items-center gap-3 bg-[#130E0A] hover:bg-[#1C150F] border border-[#2B2019] hover:border-[#423226] p-2.5 rounded-xs transition-all shadow-md group">
              <div className="relative w-12 h-12 rounded-xs overflow-hidden border border-[#3A2B20] shrink-0">
                <Image
                  src={latestTrack.coverImage}
                  alt={latestTrack.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 pr-2">
                <span className="text-[9px] font-mono text-[#C88639] tracking-wider uppercase block">
                  FEATURED RELEASE
                </span>
                <span className="text-xs font-bold text-[#F3EDE4] truncate block">
                  {latestTrack.title}
                </span>
                <span className="text-[10px] font-mono text-[#8A7D70]">
                  {latestTrack.genre} • {latestTrack.bpm} BPM
                </span>
              </div>

              <button
                onClick={() => onPlayTrack(latestTrack)}
                className="w-9 h-9 rounded-full bg-[#C88639] group-hover:bg-[#E2A958] text-[#0A0705] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                title="Play track preview"
                aria-label="Play featured release"
              >
                {isPlaying ? (
                  <Radio className="w-4 h-4 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Restrained Marquee Ticker */}
      <div className="relative z-10 mt-6 border-y border-[#1E1610] bg-[#0E0B09]/80 py-2.5 overflow-hidden whitespace-nowrap select-none">
        <div className="flex items-center gap-8 text-xs font-mono text-[#A89C8E] uppercase tracking-[0.25em] animate-marquee">
          <span>• BASS TECH HOUSE</span>
          <span className="text-[#C88639]">● OBSIDIAN PULSE</span>
          <span>• UNDERGROUND CLUB FREQUENCIES</span>
          <span className="text-[#C88639]">● 128 BPM PRESSURE</span>
          <span>• RAW ANALOG GROOVES</span>
          <span className="text-[#C88639]">● ESTD. 2024</span>
          <span>• PIONEER CDJ-3000 ENGINE</span>
          <span className="text-[#C88639]">● SUBTERRANEAN TENSION</span>
          <span>• BASS TECH HOUSE</span>
          <span className="text-[#C88639]">● OBSIDIAN PULSE</span>
          <span>• UNDERGROUND CLUB FREQUENCIES</span>
          <span className="text-[#C88639]">● 128 BPM PRESSURE</span>
        </div>
      </div>
    </section>
  );
}
