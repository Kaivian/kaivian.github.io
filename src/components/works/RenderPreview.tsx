"use client";

import { motion } from "framer-motion";
import { RenderPreviewContent } from "./RenderPreviewContent";

const smoothSpring = {
  type: "spring" as const,
  damping: 30,
  stiffness: 350,
  mass: 0.6,
};

export function RenderPreview({
  type,
  exhibit,
  displayUrl,
  url,
}: {
  type: string;
  exhibit: string;
  displayUrl: string;
  url: string;
}) {
  return (
    <div className="relative pt-3">
      {/* Masking tape effect on top center */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E6E0D3]/90 border border-[#D3CCBE] -rotate-2 mt-2 shadow-[0_1px_3px_rgba(0,0,0,0.1)] z-20 pointer-events-none" />

      {/* Polaroid Card Frame Box */}
      <div className="border border-[#D8D2C6] bg-[#fbfaf5] group-hover:bg-[#efeadd] p-3 md:p-3.5 rounded-xs shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col justify-between group-hover:border-[#B93829] transition-colors duration-300">
        {/* Shared Layout Preview Frame */}
        <motion.div
          layoutId={`preview-box-${exhibit}`}
          transition={smoothSpring}
          className="relative overflow-hidden border border-[#D5D0C5] bg-[#121316] rounded-[1px] min-h-35 flex flex-col justify-center mb-2.5 transform-gpu will-change-transform"
        >
          <RenderPreviewContent type={type} />

          {/* CONFIRMED Stamp Overlay */}
          <div className="absolute top-3 right-3 z-10 border-2 border-[#B93829] text-[#B93829] bg-[#efeadd]/90 px-2 py-0.5 text-[11px] md:text-[12px] font-extrabold tracking-[2px] font-mono uppercase rotate-[5deg] shadow-sm pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            CONFIRMED
          </div>
        </motion.div>

        {/* Polaroid Bottom Label Strip */}
        <div className="pt-2.5 pb-0.5 flex items-center justify-between">
          <div className="relative inline-flex items-center justify-center px-2 py-0.5 shrink-0 whitespace-nowrap">
            <svg className="absolute inset-0 w-full h-full text-[#B93829]" viewBox="0 0 76 26" fill="none">
              <ellipse cx="38" cy="13" rx="36" ry="11" stroke="currentColor" strokeWidth="1.5" strokeDasharray="40 2" transform="rotate(-1 38 13)" />
            </svg>
            <span className="text-[#B93829] font-extrabold text-[10px] font-mono tracking-wider relative z-10 px-1 whitespace-nowrap">
              {exhibit}
            </span>
          </div>
          <div className="text-[10px] font-mono text-[#6E6A63] truncate">
            recovered from{" "}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-[#B93829] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {displayUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
