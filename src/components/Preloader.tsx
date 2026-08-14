"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ASSETS_TO_PRELOAD = [
  "/generals/Avatar Style Removed BG.png",
  "/generals/Avatar.png",
  "/generals/Kaivian Logo Circle.png",
  "/generals/CVerify Black Logo.png",
  "/projects/CVerify.png",
  "/projects/Wardrobe.png",
  "/assets/iconpattern.png",
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("INITIALIZING DOSSIER...");
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Disable automatic browser scroll restoration & force scroll to top on mount
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Lock scroll on page while loading
    if (!isFinished) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isFinished]);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length + 1; // Assets + document load

    const incrementAssetCount = () => {
      loadedCount++;
    };

    // Preload image assets
    ASSETS_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        incrementAssetCount();
      } else {
        img.onload = incrementAssetCount;
        img.onerror = incrementAssetCount;
      }
    });

    // Check window/document ready state
    if (document.readyState === "complete") {
      incrementAssetCount();
    } else {
      const handleLoad = () => incrementAssetCount();
      window.addEventListener("load", handleLoad);
    }

    // Smooth percentage counter loop (starts AFTER fade-in animations complete at ~900ms)
    const fadeDelay = 900;
    let animFrameId: number;
    let hasCompleted = false;

    const startTimer = setTimeout(() => {
      const startTime = performance.now();
      const minDuration = 1200;

      const step = (now: number) => {
        if (hasCompleted) return;

        const elapsed = now - startTime;
        const timeRatio = Math.min(elapsed / minDuration, 1);
        const assetRatio = Math.min(loadedCount / totalAssets, 1);

        // Smooth progress calculation
        const currentPercent = Math.min(
          Math.floor(Math.min(timeRatio, assetRatio) * 100),
          100
        );

        setProgress(currentPercent);

        if (currentPercent < 25) {
          setStatusText("INITIALIZING INVESTIGATION DOSSIER...");
        } else if (currentPercent < 50) {
          setStatusText("PRELOADING EVIDENCE & GRAPHICS...");
        } else if (currentPercent < 75) {
          setStatusText("VERIFYING TELEMETRY & LAB DATA...");
        } else if (currentPercent < 100) {
          setStatusText("PREPARING FRONT PAGE EXPERIENCE...");
        } else {
          setStatusText("DOSSIER UNLOCKED — ACCESS GRANTED");
        }

        if (timeRatio >= 1 && assetRatio >= 1) {
          hasCompleted = true;
          setProgress(100);
          setStatusText("DOSSIER UNLOCKED — ACCESS GRANTED");

          // Wait 250ms for user to see 100% unlock status, then slide curtains
          setTimeout(() => {
            window.scrollTo(0, 0);
            if (typeof window !== "undefined") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).__PRELOADER_COMPLETE__ = true;
              window.dispatchEvent(new Event("preloaderComplete"));
            }
            setIsExiting(true);

            // Unlock scroll and unmount after curtain transition finishes (850ms)
            setTimeout(() => {
              window.scrollTo(0, 0);
              setIsFinished(true);
              if (onComplete) onComplete();
            }, 850);
          }, 250);
        } else {
          animFrameId = requestAnimationFrame(step);
        }
      };

      animFrameId = requestAnimationFrame(step);
    }, fadeDelay);

    return () => {
      clearTimeout(startTimer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <div
          className={`fixed inset-0 z-9999 flex flex-col justify-between overflow-hidden select-none font-libre-franklin ${isExiting ? "pointer-events-none" : "pointer-events-auto"
            }`}
        >
          {/* Top Panel (Slides Up) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#F4F1EA] text-[#16140F] border-b border-[#1A1A1A]/30 flex flex-col justify-center items-center p-6 sm:p-10 relative overflow-hidden"
          >
            {/* 1. Title / Headline Masthead (Fades in first) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="text-center"
            >
              <div className="text-[10px] sm:text-[12px] font-mono font-bold uppercase tracking-[4px] text-[#B93829] mb-3">
                THE PERSONAL RECORDS OF A FULLSTACK DEVELOPER
              </div>
              <h1 className="font-(family-name:--font-libre-caslon-display) text-[42px] sm:text-[72px] md:text-[88px] font-normal leading-none tracking-tight text-[#16140F]">
                Kaivian Doan
              </h1>
              <p className="font-libre-caslon-text italic text-[15px] sm:text-[19px] text-[#45413A] mt-3">
                Investigative Edition &mdash; Personal Records
              </p>
            </motion.div>

            {/* Bottom Crease Line Accent */}
            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1A1A1A]/20" />
          </motion.div>

          {/* Bottom Panel (Slides Down) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#F4F1EA] text-[#16140F] border-t border-[#1A1A1A]/30 flex flex-col justify-center items-center p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Top Crease Line Accent */}
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#1A1A1A]/20" />

            {/* 2. Center Loading Status & Progress Bar (Fades in next) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              className="max-w-xl mx-auto w-full flex flex-col items-center"
            >

              {/* Counter Display */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-(family-name:--font-libre-caslon-display) text-[54px] sm:text-[76px] font-normal leading-none text-[#16140F]">
                  {String(progress).padStart(2, "0")}
                </span>
                <span className="font-mono text-[24px] sm:text-[32px] text-[#B93829] font-bold">
                  %
                </span>
              </div>

              {/* Newspaper Bordered Progress Bar Container */}
              <div className="w-full border-2 border-[#1A1A1A] p-1 bg-[#FBF9F5] relative mb-3 shadow-xs">
                <div
                  className="h-2.5 sm:h-3 bg-[#1A1A1A] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Editorial Scale Marks */}
              <div className="w-full flex justify-between text-[9px] sm:text-[10px] font-mono text-[#45413A] font-bold tracking-widest uppercase mb-4 px-0.5">
                <span>00%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>

              {/* Dynamic Status Text Ticker */}
              <div className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[1.8px] text-[#16140F] uppercase text-center min-h-5">
                {statusText}
              </div>
            </motion.div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
