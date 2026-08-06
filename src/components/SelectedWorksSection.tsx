"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { WorkItem } from "@/types/work";
import { works } from "@/data/works";
import { RenderPreview } from "./works/RenderPreview";
import { WorkDetailModal } from "./works/WorkDetailModal";

export default function SelectedWorksSection() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const flagship = works.find((w) => w.isFlagship) || works[0];
  const gridWorks = works.filter((w) => !w.isFlagship);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedWork(null);
      }
    };
    if (selectedWork) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedWork]);

  return (
    <section id="work" className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin py-12 border-b-4 border-[#1A1A1A]">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Meta Bar */}
        <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#45413A] font-bold tracking-[1.8px] pb-3 uppercase whitespace-nowrap">
          <div>THE EVIDENCE</div>
          <div>EXHIBITS A &ndash; G &middot; ENTERED 2023 &ndash; NOW</div>
        </div>

        {/* Top Hairline Divider */}
        <div className="w-full border-b border-[#b9b7b0] mb-4" />

        {/* Main Section Header */}
        <h2 className="font-(family-name:--font-libre-caslon-display) text-[32px] md:text-[46px] font-normal text-[#16140F] leading-none tracking-[-0.02em] mb-4">
          Selected Works
        </h2>

        {/* Solid Heavy Divider */}
        <div className="w-full border-b-[2.5px] border-[#1A1A1A] mb-12" />

        {/* Flagship Exhibit A (Featured 2-Column Row) */}
        <div
          className="mb-16 pb-12 border-b border-[#1A1A1A]/30 group cursor-pointer"
          onClick={() => setSelectedWork(flagship)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Graphic Polaroid Frame */}
            <div className="lg:col-span-6">
              <RenderPreview
                type={flagship.previewType}
                exhibit={flagship.exhibit}
                displayUrl={flagship.displayUrl}
                url={flagship.url}
              />
            </div>

            {/* Right: Flagship Project Details */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                {/* Exhibit Red Stamp Label */}
                <div className="text-[#B93829] font-bold text-[11px] md:text-[12px] uppercase tracking-[2px] mb-1.5 whitespace-nowrap">
                  {flagship.exhibit}
                </div>

                {/* Subtitle / Category & Website Link */}
                <div className="text-[#16140F] font-extrabold text-[12px] md:text-[13px] uppercase tracking-[1.5px] mb-3 flex items-center justify-between gap-2">
                  <span className="truncate min-w-0">{flagship.category}</span>
                  <a
                    href={flagship.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-[#6E6A63] hover:text-[#B93829] transition-all font-mono font-bold text-[11px] md:text-[12px] shrink-0 cursor-pointer flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Project Title */}
                <h3 className="font-(family-name:--font-libre-caslon-display) text-[36px] md:text-[48px] text-[#16140F] group-hover:text-[#B93829] transition-colors leading-tight tracking-[-0.02em] mb-4">
                  {flagship.title}
                </h3>

                {/* Description Paragraph */}
                <p className="font-libre-franklin text-[14px] md:text-[15px] text-[#33302B] leading-relaxed mb-6">
                  {flagship.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {flagship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#1A1A1A] text-[#1A1A1A] font-mono text-[10px] md:text-[11px] px-2.5 py-1 uppercase tracking-wider bg-[#EBE7DF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta Row & Link */}
              <div className="border-t border-[#1A1A1A]/40 pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#45413A]">
                  {flagship.timeline} &middot; <span className="text-[#1A1A1A] font-bold">{flagship.role}</span>
                </div>

                <div className="relative text-[#B93829] font-bold text-[11px] md:text-[12px] uppercase tracking-[1.2px] inline-flex items-center gap-1.5 py-0.5">
                  <span>OPEN CASE FILE</span>
                  <ArrowRight className="w-3.5 h-3.5" />

                  {/* Red organic wavy underline drawing from left to right on card hover */}
                  <svg
                    className="absolute -bottom-0.5 left-0 w-full h-1.5 text-[#B93829] pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    viewBox="0 0 160 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M1 5C30 2 60 7 90 4C120 1 140 6 159 3"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid for Exhibits B through G (3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {gridWorks.map((work) => (
            <div
              key={work.exhibit}
              className="flex flex-col justify-between border-b md:border-b-0 border-[#1A1A1A]/30 pb-8 md:pb-0 group cursor-pointer"
              onClick={() => setSelectedWork(work)}
            >
              <div>
                {/* Exhibit Red Stamp Label */}
                <div className="text-[#B93829] font-bold text-[11px] uppercase tracking-[1.8px] mb-1 whitespace-nowrap">
                  {work.exhibit}
                </div>

                {/* Subtitle / Category & Website Link */}
                <div className="text-[#45413A] font-extrabold text-[11px] uppercase tracking-[1.2px] mb-2 flex items-center justify-between gap-2">
                  <span className="truncate min-w-0">{work.category}</span>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-[#6E6A63] hover:text-[#B93829] transition-all font-mono font-bold text-[10px] md:text-[11px] shrink-0 cursor-pointer flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Project Title */}
                <h3 className="font-(family-name:--font-libre-caslon-display) text-[26px] md:text-[30px] text-[#16140F] group-hover:text-[#B93829] transition-colors leading-tight mb-3">
                  {work.title}
                </h3>

                {/* Preview Graphic Box */}
                <div className="mb-4">
                  <RenderPreview
                    type={work.previewType}
                    exhibit={work.exhibit}
                    displayUrl={work.displayUrl}
                    url={work.url}
                  />
                </div>

                {/* Description Paragraph */}
                <p className="font-libre-franklin text-[13px] text-[#33302B] leading-relaxed mb-4 line-clamp-3">
                  {work.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#1A1A1A]/80 text-[#1A1A1A] font-mono text-[9px] md:text-[10px] px-2 py-0.5 uppercase tracking-wider bg-[#EBE7DF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Link Row */}
              <div className="border-t border-[#1A1A1A]/30 pt-3 flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="font-semibold uppercase tracking-[0.5px] text-[#45413A]">
                  {work.timeline}
                </span>

                <div className="text-[#B93829] font-bold text-[10px] md:text-[11px] uppercase tracking-[1px] inline-flex items-center gap-1 border-b border-[#B93829] pb-0.5">
                  <span>OPEN CASE FILE</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN NEWSPAPER CASE FILE VIEW */}
      <WorkDetailModal
        selectedWork={selectedWork}
        onClose={() => setSelectedWork(null)}
        onSelectWork={(w) => setSelectedWork(w)}
      />
    </section>
  );
}
