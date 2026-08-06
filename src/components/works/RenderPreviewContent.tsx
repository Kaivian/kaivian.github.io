"use client";

import { Compass, Layers, Newspaper } from "lucide-react";

export function RenderPreviewContent({ type, isModal }: { type: string; isModal?: boolean }) {
  return (
    <>
      {type === "cverify" && (
        <img
          src="/projects/CVerify.png"
          alt="CVerify Evidence"
          className={
            isModal
              ? "w-full max-h-[75vh] object-contain rounded-[1px] block transform-gpu will-change-transform"
              : "w-full h-auto object-cover block grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center transform-gpu"
          }
        />
      )}

      {type === "kwardrobe" && (
        <img
          src="/projects/Wardrobe.png"
          alt="KWardrobe Evidence"
          className={
            isModal
              ? "w-full max-h-[75vh] object-contain rounded-[1px] block transform-gpu will-change-transform"
              : "w-full h-auto object-cover block grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center transform-gpu"
          }
        />
      )}

      {type === "klibrary" && (
        <div
          className={`p-4 space-y-1.5 text-xs sm:text-sm md:text-base font-mono text-[#C9D1D9] w-full transform-gpu ${
            isModal
              ? ""
              : "grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center"
          }`}
        >
          <div>
            <span className="text-[#FF7B72]">public class</span>{" "}
            <span className="text-[#FFA657]">KLibrary</span>{" "}
            <span className="text-[#FF7B72]">extends</span>{" "}
            <span className="text-[#79C0FF]">JavaPlugin</span> &#123;
          </div>
          <div className="pl-4 text-[#8B949E]">
            <span className="text-[#D29922]">@Override</span>
          </div>
          <div className="pl-4">
            <span className="text-[#FF7B72]">public void</span>{" "}
            <span className="text-[#D2A8FF]">onEnable</span>() &#123;
          </div>
          <div className="pl-8 text-[#7EE787]">
            EventManager.register(<span className="text-[#79C0FF]">this</span>);
          </div>
          <div className="pl-4">&#125;</div>
          <div>&#125;</div>
        </div>
      )}

      {type === "exploreworld" && (
        <div
          className={`p-4 relative flex flex-col items-center justify-center py-8 text-center w-full transform-gpu ${
            isModal
              ? ""
              : "grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center"
          }`}
        >
          <Compass className="w-12 h-12 md:w-16 md:h-16 text-[#58A6FF] mb-3 animate-spin-[spin_12s_linear_infinite]" />
          <div className="text-sm md:text-base font-bold text-[#F0F6FC] font-mono">
            SPATIAL DATA COORDINATOR
          </div>
          <div className="text-xs md:text-sm text-[#8B949E] font-mono mt-1">
            LAT: 16.0544° N // LON: 108.2022° E
          </div>
        </div>
      )}

      {type === "mern" && (
        <div
          className={`p-4 space-y-2.5 text-xs sm:text-sm md:text-base font-mono w-full transform-gpu ${
            isModal
              ? ""
              : "grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center"
          }`}
        >
          <div className="flex items-center justify-between text-[#3FB950] font-bold border-b border-[#21262D] pb-2">
            <span>POST /api/v1/auth/login</span>
            <span className="bg-[#238636]/30 px-2.5 py-0.5 rounded text-xs md:text-sm">200 OK</span>
          </div>
          <div className="text-[#8B949E] pt-1 leading-relaxed">
            &#123; <span className="text-[#79C0FF]">&quot;status&quot;</span>: <span className="text-[#A5D6FF]">&quot;success&quot;</span>, <span className="text-[#79C0FF]">&quot;token&quot;</span>: <span className="text-[#A5D6FF]">&quot;eyJhbGci...&quot;</span> &#125;
          </div>
        </div>
      )}

      {type === "template" && (
        <div
          className={`p-4 space-y-2 text-xs sm:text-sm md:text-base font-mono text-[#8B949E] w-full transform-gpu ${
            isModal
              ? ""
              : "grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center"
          }`}
        >
          <div className="flex items-center gap-2 text-[#F0F6FC] font-bold">
            <Layers className="w-5 h-5 text-[#A5D6FF]" />
            <span>FULLSTACK TEMPLATE TREE</span>
          </div>
          <div className="pl-4">├── src/app/ (App Router)</div>
          <div className="pl-4">├── src/components/ (Design Tokens)</div>
          <div className="pl-4">└── package.json (Configured)</div>
        </div>
      )}

      {type === "portfolio" && (
        <div
          className={`p-4 flex flex-col items-center justify-center py-8 text-center border border-[#30363D] bg-[#161B22] w-full transform-gpu ${
            isModal
              ? ""
              : "grayscale group-hover:grayscale-0 transition-opacity duration-300 origin-center"
          }`}
        >
          <Newspaper className="w-10 h-10 md:w-14 md:h-14 text-[#D29922] mb-2" />
          <div className="text-sm md:text-base font-bold text-[#F0F6FC] font-serif uppercase tracking-wider">
            THE INVESTIGATION EDITION
          </div>
          <div className="text-xs md:text-sm text-[#8B949E] font-mono mt-1">
            KAIVIAN.GITHUB.IO · NEXT.JS 15
          </div>
        </div>
      )}
    </>
  );
}
