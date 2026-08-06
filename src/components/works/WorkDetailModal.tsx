"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { WorkItem } from "@/types/work";
import { works } from "@/data/works";
import { RenderPreviewContent } from "./RenderPreviewContent";

const smoothSpring = {
  type: "spring" as const,
  damping: 30,
  stiffness: 350,
  mass: 0.6,
};

interface WorkDetailModalProps {
  selectedWork: WorkItem | null;
  onClose: () => void;
  onSelectWork: (work: WorkItem) => void;
}

export function WorkDetailModal({ selectedWork, onClose, onSelectWork }: WorkDetailModalProps) {
  return (
    <AnimatePresence>
      {selectedWork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 w-full h-full bg-[#F4F1EA] text-[#1A1A1A] overflow-y-auto font-libre-franklin flex flex-col transform-gpu"
        >
          {/* Sticky Top Bar Header */}
          <div className="sticky top-0 z-40 bg-[#F4F1EA]/95 backdrop-blur-xs border-b border-[#1A1A1A] px-4 sm:px-8 md:px-12 py-3 flex items-center justify-between text-[11px] md:text-[12px] font-mono font-bold tracking-wider uppercase text-[#33302B] shadow-xs">
            {/* Top Bar Back Button with single arrow and red wavy line draw animation */}
            <button
              onClick={onClose}
              className="relative group inline-flex items-center text-[#1A1A1A] hover:text-[#B93829] transition-colors cursor-pointer py-0.5"
            >
              <span>
                {selectedWork.ctaLeftText
                  ? selectedWork.ctaLeftText.startsWith("←")
                    ? selectedWork.ctaLeftText
                    : `← ${selectedWork.ctaLeftText}`
                  : "← BACK TO THE CASE"}
              </span>

              {/* Red organic wavy underline drawing from left to right on hover */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-1.5 text-[#B93829] pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
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
            </button>

            <div className="hidden sm:block text-center font-serif text-[#1A1A1A] tracking-[2px] font-normal">
              THE KAIVIAN TIMES &mdash; CASE FILES
            </div>

            <div>FILED FROM VIETNAM</div>
          </div>

          {/* Main Newspaper Sheet Container */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 space-y-8 flex-1">
            {/* CASE FILE HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <div className="text-[#B93829] font-bold text-[11px] md:text-[12px] uppercase tracking-[2px] mb-2 font-mono flex items-center gap-1">
                <span>CASE FILE &bull; {selectedWork.exhibit} &bull;</span>
                <a
                  href={selectedWork.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-[#B93829] hover:text-[#1A1A1A] transition-colors"
                >
                  {selectedWork.displayUrl}
                </a>
              </div>

              <h1 className="font-(family-name:--font-libre-caslon-display) text-[36px] sm:text-[54px] md:text-[68px] font-normal text-[#16140F] leading-tight tracking-[-0.02em] mb-4">
                {selectedWork.headline}
              </h1>

              <p className="font-serif italic text-[16px] sm:text-[20px] md:text-[22px] text-[#33302B] leading-relaxed mb-6 max-w-4xl">
                {selectedWork.subtitle}
              </p>

              <div className="text-[11px] md:text-[12px] font-mono uppercase tracking-[1.5px] text-[#6E6A63] border-b-2 border-[#1A1A1A] pb-4 flex flex-wrap items-center justify-between gap-2">
                <span>
                  {selectedWork.role.startsWith("BY ") ? (
                    <>
                      <strong className="text-[#1A1A1A]">{selectedWork.role}</strong> &mdash; {selectedWork.timeline}
                    </>
                  ) : (
                    <>
                      BY <strong className="text-[#1A1A1A]">THE INVESTIGATION DESK</strong> &mdash; {selectedWork.timeline}
                    </>
                  )}
                </span>
                {!selectedWork.role.startsWith("BY ") && (
                  <span className="font-bold text-[#B93829]">{selectedWork.role}</span>
                )}
              </div>
            </motion.div>

            {/* LARGE EXHIBIT MEDIA PREVIEW WITH OPTIMIZED MATCHING LAYOUT ID */}
            <motion.div
              layoutId={`preview-box-${selectedWork.exhibit}`}
              transition={smoothSpring}
              className="relative border-2 border-[#1A1A1A] bg-[#121316] p-3 md:p-4 rounded-xs shadow-md overflow-hidden flex flex-col justify-center min-h-64 sm:min-h-80 md:min-h-110 transform-gpu will-change-transform"
            >
              <RenderPreviewContent type={selectedWork.previewType} isModal />

              {/* Exhibit Caption Strip */}
              <div className="mt-3 pt-2.5 border-t border-[#30363D] flex items-center justify-between text-[11px] md:text-[12px] font-mono text-[#8B949E]">
                <span className="text-[#B93829] font-bold tracking-wider">{selectedWork.exhibit}</span>
                <span className="truncate pl-2">{selectedWork.figCaption}</span>
              </div>
            </motion.div>

            {/* 2-COLUMN ARTICLE + TABLE GRID */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-4"
            >
              {/* LEFT 7 COLS: Article Text */}
              <div className="lg:col-span-7 space-y-5 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[#2A2723]">
                {selectedWork.articleText1.split("\n\n").map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "first-letter:float-left first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:pr-3 first-letter:leading-none first-letter:text-[#16140F]"
                        : ""
                    }
                  >
                    {para}
                  </p>
                ))}

                {/* Pull quote */}
                <blockquote className="border-y-2 border-[#1A1A1A] py-5 my-6 italic font-serif text-[17px] sm:text-[19px] text-center text-[#1A1A1A] font-medium leading-relaxed px-4">
                  {selectedWork.quote}
                </blockquote>

                {selectedWork.articleText2.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* RIGHT 5 COLS: Sidebar Table Box */}
              <div className="lg:col-span-5 border-2 border-[#1A1A1A] bg-[#FBF9F5] shadow-sm flex flex-col justify-between self-start">
                <div>
                  <div className="bg-[#1A1A1A] text-[#F4F1EA] px-4 py-3 text-[12px] font-mono font-bold tracking-widest uppercase">
                    {selectedWork.sidebarTitle || "HOW IT WAS BUILT"}
                  </div>
                  <div className="divide-y divide-[#1A1A1A]/20 text-[12px] sm:text-[13px]">
                    {selectedWork.sidebarItems ? (
                      selectedWork.sidebarItems.map((item, idx) => (
                        <div key={idx} className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">{item.label}</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{item.value}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">FRONT-END</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{selectedWork.techDetails.frontend}</span>
                        </div>
                        <div className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">DATA</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{selectedWork.techDetails.data}</span>
                        </div>
                        <div className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">HOSTING</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{selectedWork.techDetails.hosting}</span>
                        </div>
                        <div className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">ROLE</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{selectedWork.techDetails.role}</span>
                        </div>
                        <div className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">ENTERED</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{selectedWork.techDetails.entered}</span>
                        </div>
                        <div className="px-4 py-2.5 flex justify-between gap-3">
                          <span className="font-mono text-[#6E6A63] uppercase shrink-0">STATUS</span>
                          <span className="font-medium text-[#1A1A1A] text-right">{selectedWork.techDetails.status}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* RELATED EXHIBITS */}
                <div className="border-t-2 border-[#1A1A1A] p-4 bg-[#EBE7DF]">
                  <div className="font-mono font-bold text-[11px] text-[#6E6A63] uppercase tracking-wider mb-2.5">
                    RELATED EXHIBITS
                  </div>
                  <div className="space-y-2 text-[12px] font-mono">
                    {selectedWork.customRelatedExhibits ? (
                      selectedWork.customRelatedExhibits.map((item) => {
                        const relWork = works.find((w) => w.exhibit === item.code);
                        return (
                          <button
                            key={item.code}
                            onClick={() => relWork && onSelectWork(relWork)}
                            className="block w-full text-left text-[#1A1A1A] hover:text-[#B93829] hover:underline font-bold transition-colors cursor-pointer truncate"
                          >
                            {item.code} &mdash; {item.label}
                          </button>
                        );
                      })
                    ) : (
                      selectedWork.relatedExhibits.map((exCode) => {
                        const relWork = works.find((w) => w.exhibit === exCode);
                        if (!relWork) return null;
                        return (
                          <button
                            key={exCode}
                            onClick={() => onSelectWork(relWork)}
                            className="block w-full text-left text-[#1A1A1A] hover:text-[#B93829] hover:underline font-bold transition-colors cursor-pointer truncate"
                          >
                            {relWork.exhibit} &mdash; {relWork.title}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BOTTOM ACTION BUTTONS BAR */}
            <div className="border-t-2 border-[#1A1A1A] pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left Button: Secondary Outlined Light Button (← BACK TO THE CASE / ARCHIVE) */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-[#F4F1EA] text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] px-6 py-3 font-mono font-bold text-[12px] md:text-[13px] uppercase tracking-wider transition-all text-center cursor-pointer shadow-xs"
              >
                <span>
                  {selectedWork.ctaLeftText
                    ? selectedWork.ctaLeftText.startsWith("←")
                      ? selectedWork.ctaLeftText
                      : `← ${selectedWork.ctaLeftText}`
                    : "← BACK TO THE CASE"}
                </span>
              </button>

              {/* Right Button: Primary Solid Dark Button (INSPECT THE EVIDENCE — VISIT SITE → / EXPLORE CVERIFY →) */}
              <a
                href={selectedWork.url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#F4F1EA] text-[#F4F1EA] hover:text-[#1A1A1A] border-[2.5px] border-[#1A1A1A] px-7 py-3 font-mono font-bold text-[12px] md:text-[13px] uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>
                  {selectedWork.ctaRightText
                    ? selectedWork.ctaRightText.endsWith("→") || selectedWork.ctaRightText.endsWith("->")
                      ? selectedWork.ctaRightText
                      : `${selectedWork.ctaRightText} →`
                    : "INSPECT THE EVIDENCE — VISIT SITE →"}
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
