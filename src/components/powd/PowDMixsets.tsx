"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, Clock, MapPin, Calendar, ExternalLink } from "lucide-react";
import { mixsets } from "@/data/powdData";
import { MixsetItem } from "@/types/powd";

export default function PowDMixsets() {
  const [selectedMix, setSelectedMix] = useState<MixsetItem | null>(null);

  return (
    <section id="mixsets" className="relative pt-36 pb-28 bg-[#0A0705] text-[#EDE6DD] border-t border-[#1F1610]">
      {/* Subtle Studio Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F161010_1px,transparent_1px),linear-gradient(to_bottom,#1F161010_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header with Seated Cutout on Header Line */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b-5 border-[#241A13] gap-8 min-h-[140px]">
          <div className="z-10 flex flex-col sm:flex-row sm:items-end justify-between w-full pr-0 lg:pr-80 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
                <span className="w-2 h-2 bg-[#C88639] rounded-xs" />
                <span>OFFICIAL YOUTUBE CHANNEL • @DJ-POWD</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#F3EDE4] uppercase font-display">
                SELECTED <br />MIXSETS
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@DJ-PowD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#17100B] hover:bg-[#241A12] border border-[#2B2019] hover:border-[#C88639]/60 text-xs font-mono tracking-wider text-[#EDE6DD] transition-colors rounded-xs shadow-md shrink-0 w-fit"
            >
              <span>VISIT YOUTUBE CHANNEL</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C88639]" />
            </a>
          </div>

          {/* Right: Seated Artist Cutout sitting directly on the Section Divider Line */}
          <div className="hidden sm:block absolute -right-33 -bottom-20 md:-bottom-42 w-100 h-105 pointer-events-none z-20">
            <Image
              src="/PowD/PowD Pose 7 - BG.png"
              alt="PowD Seated on Mixsets Line"
              fill
              className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* Mixsets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mixsets.map((mix) => (
            <div
              key={mix.id}
              className="bg-[#120D09] border border-[#241A13] hover:border-[#3D2C20] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg"
            >
              {/* Thumbnail Container with Custom Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0705]">
                <Image
                  src={mix.thumbnailUrl}
                  alt={mix.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120D09] via-transparent to-[#0A0705]/60" />

                {/* Series Badge */}
                <div className="absolute top-4 left-4 bg-[#0A0705]/85 backdrop-blur-md border border-[#2B2019] px-3 py-1 text-[11px] font-mono text-[#C88639] tracking-widest uppercase rounded-xs">
                  {mix.series} {mix.vol}
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-[#0A0705]/85 backdrop-blur-md border border-[#2B2019] px-2.5 py-1 text-[11px] font-mono text-[#EDE6DD] flex items-center gap-1.5 rounded-xs">
                  <Clock className="w-3 h-3 text-[#C88639]" />
                  <span>{mix.duration}</span>
                </div>

                {/* Central Play Trigger */}
                <button
                  onClick={() => setSelectedMix(mix)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#C88639]/90 hover:bg-[#E2A958] text-[#0A0705] flex items-center justify-center transition-all duration-300 shadow-2xl scale-95 group-hover:scale-105"
                  aria-label={`Play ${mix.title}`}
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              </div>

              {/* Mix Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8A7D70] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C88639]" />
                      {mix.recordedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C88639]" />
                      {mix.location}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-[#F3EDE4] group-hover:text-[#E2A958] transition-colors tracking-tight uppercase font-display">
                    {mix.title}
                  </h3>

                  <p className="text-xs text-[#C4B8A8] font-mono mt-2 leading-relaxed">
                    {mix.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#1E1610] flex items-center justify-between gap-4">
                  <span className="px-2.5 py-1 bg-[#1A130E] border border-[#2B2019] text-[#C88639] text-xs font-mono rounded-xs">
                    {mix.genre}
                  </span>

                  <button
                    onClick={() => setSelectedMix(mix)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1A130E] hover:bg-[#251B14] border border-[#2B2019] hover:border-[#C88639]/60 text-[#EDE6DD] hover:text-[#F3EDE4] text-xs font-mono tracking-wider transition-colors rounded-xs shadow-xs"
                  >
                    <span>WATCH SET</span>
                    <ExternalLink className="w-3 h-3 text-[#C88639]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Cinema Player */}
      {selectedMix && (
        <div className="fixed inset-0 z-50 bg-[#050302]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
          <div className="relative w-full max-w-5xl bg-[#120D09] border border-[#2B2019] rounded-sm overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[#0A0705] border-b border-[#241A13]">
              <div>
                <span className="text-[10px] font-mono text-[#C88639] tracking-widest uppercase">
                  {selectedMix.series} • {selectedMix.genre}
                </span>
                <h4 className="text-lg font-bold text-[#F3EDE4] tracking-tight">
                  {selectedMix.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedMix(null)}
                className="p-2 text-[#8A7D70] hover:text-[#EDE6DD] hover:bg-[#1E1611] rounded-xs transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video w-full bg-[#000000]">
              <iframe
                src={`https://www.youtube.com/embed/${selectedMix.youtubeId}?autoplay=1&rel=0`}
                title={selectedMix.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer / Telemetry */}
            <div className="p-4 bg-[#0E0B09] border-t border-[#241A13] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8A7D70]">
              <span>LOCATION: {selectedMix.location}</span>
              <span>DURATION: {selectedMix.duration}</span>
              <a
                href={selectedMix.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C88639] hover:underline flex items-center gap-1"
              >
                OPEN ON YOUTUBE <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
