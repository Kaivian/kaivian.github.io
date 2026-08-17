"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, Camera } from "lucide-react";
import { galleryItems } from "@/data/powdData";

export default function PowDGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="archive" className="relative py-28 bg-[#0D0907] text-[#EDE6DD] border-t border-[#1F1610]">
      {/* Background Subtle Noise Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8863908_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#241A13] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL ARCHIVE & EDITORIAL LOOKBOOK</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#F3EDE4] uppercase font-display">
              VISUAL CATALOG
            </h2>
          </div>

          <div className="text-right font-mono text-xs text-[#8A7D70]">
            <span className="text-[#C4B8A8] block">STUDIO & SPATIAL STUDIES</span>
            <span>HIGH FASHION SILHOUETTE • 2026</span>
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-12 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`${item.span} group relative bg-[#130E0A] border border-[#241A13] hover:border-[#3D2C20] rounded-xs overflow-hidden transition-all duration-300 shadow-xl`}
            >
              {/* Image Container */}
              <div className={`relative ${item.aspectRatio} w-full overflow-hidden bg-[#0A0705]`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0E0B09]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Maximize Trigger */}
                <button
                  onClick={() => setActiveImage(item.image)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0A0705]/80 backdrop-blur-md border border-[#3A2B20] text-[#EDE6DD] hover:text-[#C88639] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                  aria-label={`Enlarge ${item.title}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-mono text-[#C88639] tracking-widest uppercase block mb-1">
                    {item.caption}
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-[#F3EDE4] tracking-tight uppercase font-display">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-[#050302]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={activeImage}
              alt="Enlarged view"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 p-3 bg-[#120D09] border border-[#2B2019] text-[#EDE6DD] hover:text-[#C88639] rounded-full shadow-2xl"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
