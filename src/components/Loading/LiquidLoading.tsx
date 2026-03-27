// src/components/Loading/LiquidLoading.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// INTERFACES & TYPES
// ==========================================

/**
 * Configuration properties for the LiquidLoading component.
 */
export interface LiquidLoadingProps {
  /** The main text to be displayed and filled by the wave. Default: 'NeoLeaf' */
  text?: string;
  /** Custom font family for the text. Default: 'sans-serif' */
  fontFamily?: string;
  /** Background color of the entire loading screen. Default: '#110c17' */
  backgroundColor?: string;
  /** The initial, empty color of the text. Default: '#333333' */
  baseTextColor?: string;
  /** The color of the liquid/wave filling the text. Default: '#ffffff' */
  waveColor?: string;
  /** Duration (in seconds) for the wave to complete one horizontal cycle. Default: 3 */
  waveDuration?: number;
  /** The maximum variance (height and organic chaos) of the wave. Default: 20 */
  maxOffset?: number;
  /** Array of image URLs to physically preload into the browser cache. */
  assetsToPreload?: string[];
  /** Minimum time (in ms) for the wave to rise from 0% to 100%. Default: 3000 */
  minimumLoadingTime?: number;
  /** Time (in ms) to wait at 100% before triggering the final zoom portal effect. Default: 400 */
  delayBeforeZoom?: number;
  /** Callback fired when loading reaches 100% and the zoom transition completes. */
  onFinished: () => void;
}

// ==========================================
// COMPONENT: LiquidLoading
// ==========================================

/**
 * A cinematic loading screen that fills a text mask with an organic, continuous wave.
 * Includes dual-track progress monitoring (network assets + minimum aesthetic time).
 * Optimized for both Desktop and Mobile viewports.
 */
export const LiquidLoading: React.FC<LiquidLoadingProps> = ({
  text = 'NeoLeaf',
  fontFamily = 'sans-serif',
  backgroundColor = '#110c17',
  baseTextColor = '#333333',
  waveColor = '#ffffff',
  waveDuration = 3,
  maxOffset = 20,
  assetsToPreload = [],
  minimumLoadingTime = 3000,
  delayBeforeZoom = 400,
  onFinished,
}) => {
  // Visual state
  const [visualProgress, setVisualProgress] = useState<number>(0);
  const [isZooming, setIsZooming] = useState<boolean>(false);

  // Dual-track progress state
  const [realProgress, setRealProgress] = useState<number>(assetsToPreload.length === 0 ? 100 : 0);
  const [timeProgress, setTimeProgress] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // 1. HARMONIC WAVE GENERATOR
  // ---------------------------------------------------------------------------
  const { pathData, wavePeriod } = useMemo(() => {
    const W = 800; // Fixed wave period for seamless looping
    const p1 = 0;
    const p2 = 1.74; // Fixed phase shifts to prevent hydration mismatch
    const p3 = 3.32;

    const pathLength = 1200 + W;
    const step = 10;

    let d = `M 0 50 `;

    for (let x = 0; x <= pathLength; x += step) {
      // Superposition of 3 sine waves for organic fluid appearance
      const y1 = 0.5 * Math.sin((x / W) * Math.PI * 2 + p1);
      const y2 = 0.3 * Math.sin((x / (W / 2)) * Math.PI * 2 + p2);
      const y3 = 0.2 * Math.sin((x / (W / 3)) * Math.PI * 2 + p3);

      // Hydration Fix: Enforce 2 decimal places so Node.js (Server) and Chrome (Client) output identical strings
      const y = (50 - (y1 + y2 + y3) * maxOffset).toFixed(2);
      d += `L ${x} ${y} `;
    }

    // Close the SVG path at the bottom
    d += `L ${pathLength} 1000 L 0 1000 Z`;

    return { pathData: d, wavePeriod: W };
  }, [maxOffset]);

  // ---------------------------------------------------------------------------
  // 2. Y-AXIS MATHEMATICS & OFFSET
  // ---------------------------------------------------------------------------
  const textBottomY = 180;
  const textTopY = 40;

  const startY = textBottomY + maxOffset;
  const endY = textTopY - maxOffset;
  const totalTravel = startY - endY;

  // Wave Lead Logic: The wave travels 10% faster/higher than the visual percentage.
  // This guarantees the text is completely submerged when the counter hits 100%.
  const waveProgress = visualProgress * 1.1;
  const currentYOffset = startY - (waveProgress / 100) * totalTravel;

  // ---------------------------------------------------------------------------
  // 3. PROGRESS TRACKING (ASSETS & TIME)
  // ---------------------------------------------------------------------------

  // Track actual network requests
  useEffect(() => {
    if (assetsToPreload.length === 0) {
      setRealProgress(100);
      return;
    }

    let isMounted = true;
    let loadedAssets = 0;
    const totalAssets = assetsToPreload.length;

    const handleAssetLoad = () => {
      loadedAssets++;
      if (isMounted) setRealProgress((loadedAssets / totalAssets) * 100);
    };

    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleAssetLoad;
      img.onerror = handleAssetLoad; // Prevent hanging on broken links
    });

    return () => { isMounted = false; };
  }, [assetsToPreload]);

  // Track minimum required display time
  useEffect(() => {
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let calculatedTimeProgress = (elapsed / minimumLoadingTime) * 100;

      if (calculatedTimeProgress >= 100) {
        calculatedTimeProgress = 100;
        clearInterval(timerInterval);
      }

      setTimeProgress(calculatedTimeProgress);
    }, 30);

    return () => clearInterval(timerInterval);
  }, [minimumLoadingTime]);

  // Synchronize tracks and trigger exit animation
  useEffect(() => {
    const currentProgress = Math.min(realProgress, timeProgress);
    setVisualProgress(Math.floor(currentProgress));

    if (realProgress >= 100 && timeProgress >= 100) {
      const completionTimer = setTimeout(() => {
        setIsZooming(true);
      }, delayBeforeZoom);

      return () => clearTimeout(completionTimer);
    }
  }, [realProgress, timeProgress, delayBeforeZoom]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      style={{ backgroundColor }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={isZooming ? { scale: 80, opacity: 0 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
      onAnimationComplete={() => {
        if (isZooming) onFinished();
      }}
    >
      <div className="relative w-full max-w-5xl px-4 flex flex-col items-center">
        <svg
          suppressHydrationWarning // Safeguard for strict SSR frameworks
          viewBox="0 0 800 250"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="liquid-text-mask">
              <text
                x="50%" y="50%"
                textAnchor="middle" dominantBaseline="central"
                fontSize="140" fontWeight="900" fontFamily={fontFamily}
                fill="white" // White acts as the visible area in SVG masks
                className="tracking-tighter"
              >
                {text}
              </text>
            </mask>
          </defs>

          {/* Base Empty Text */}
          <text
            x="50%" y="50%"
            textAnchor="middle" dominantBaseline="central"
            fontSize="140" fontWeight="900" fontFamily={fontFamily}
            fill={baseTextColor}
            className="tracking-tighter"
          >
            {text}
          </text>

          {/* Animated Wave Layer */}
          <g mask="url(#liquid-text-mask)">
            <motion.path
              d={pathData}
              fill={waveColor}
              animate={{
                y: currentYOffset,
                x: [0, -wavePeriod],
              }}
              transition={{
                y: { duration: 0.1, ease: "linear" }, // Quick snap for vertical progression
                x: { repeat: Infinity, duration: waveDuration, ease: "linear" }, // Infinite horizontal flow
              }}
            />
          </g>
        </svg>

        {/* Loading Counter - Mobile & Desktop Optimized */}
        <AnimatePresence>
          {!isZooming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[68%] right-[20%] md:right-[20%] pt-[10px] md:pt-[20px] flex items-end gap-2 font-mono text-[10px] md:text-xs tracking-widest uppercase z-10"
            >
              <span className="text-zinc-500 lowercase">loading...</span>
              <span style={{ color: waveColor }} className="w-8 text-right font-bold">
                {visualProgress}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LiquidLoading;