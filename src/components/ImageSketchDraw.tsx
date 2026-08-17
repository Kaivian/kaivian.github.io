"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface ImageSketchDrawProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ImageSketchDraw({
  src,
  alt,
  className = "",
  priority = false,
}: ImageSketchDrawProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Triggers only once when entering view/loading page
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isPreloaderDone, setIsPreloaderDone] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof window !== "undefined" && !!(window as any).__PRELOADER_COMPLETE__;
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window === "undefined" || (window as any).__PRELOADER_COMPLETE__) return;

    const handleComplete = () => setIsPreloaderDone(true);
    window.addEventListener("preloaderComplete", handleComplete);
    return () => window.removeEventListener("preloaderComplete", handleComplete);
  }, []);

  const shouldAnimate = isInView && isPreloaderDone;
  const maskId = "brush-mask-once";

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden bg-[#F4F1EA] ${className}`}
    >
      {/* SVG Mask Definition for Brush Stroke Reveal */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <mask
            id={maskId}
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            {/* Dark background = hidden */}
            <rect width="1" height="1" fill="#000" />

            {/* Brush Stroke 1: Top-Left to Top-Right Curved Sweep */}
            <motion.path
              d="M -0.1 0.18 C 0.3 0.05, 0.7 0.28, 1.1 0.12"
              stroke="#FFF"
              strokeWidth="0.32"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            />

            {/* Brush Stroke 2: Right-to-Left Diagonal Sweep across Face */}
            <motion.path
              d="M 1.15 0.42 C 0.75 0.28, 0.35 0.52, -0.15 0.38"
              stroke="#FFF"
              strokeWidth="0.35"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
            />

            {/* Brush Stroke 3: Left-to-Right Wide Body Sweep */}
            <motion.path
              d="M -0.15 0.68 C 0.3 0.58, 0.7 0.78, 1.15 0.62"
              stroke="#FFF"
              strokeWidth="0.38"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.55, delay: 0.9, ease: "easeOut" }}
            />

            {/* Brush Stroke 4: Right-to-Left Bottom Base Sweep */}
            <motion.path
              d="M 1.15 0.92 C 0.7 0.82, 0.3 0.98, -0.15 0.88"
              stroke="#FFF"
              strokeWidth="0.4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
            />

            {/* Final Merge Fill (Blends strokes into 100% full image) */}
            <motion.rect
              width="1"
              height="1"
              fill="#FFF"
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.7 }}
            />
          </mask>
        </defs>
      </svg>

      {/* 1. Paper Texture Background (Canvas Base with Pencil Watermark) */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-15 filter grayscale contrast-150">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          priority={priority}
        />
      </div>

      {/* 2. Main Image - Masked with Brush Strokes */}
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          WebkitMaskImage: `url(#${maskId})`,
          maskImage: `url(#${maskId})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          priority={priority}
        />
      </div>

      {/* 3. Outer Newspaper Border Frame */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

