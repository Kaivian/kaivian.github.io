// src/components/Loading/LiquidLoading.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LiquidLoadingProps {
  /** The text to display as a mask for the liquid animation. */
  text?: string;
  /** The font family applied to the text mask. */
  fontFamily?: string;
  /** The background color of the loading overlay. */
  backgroundColor?: string;
  /** The initial color of the text before the liquid fills it. */
  baseTextColor?: string;
  /** The color of the liquid wave animation. */
  waveColor?: string;
  /** The duration of one complete wave cycle in seconds. */
  waveDuration?: number;
  /** The vertical offset amplitude for the wave generation. */
  maxOffset?: number;
  /** An array of image URLs to preload before completing the loading sequence. */
  assetsToPreload?: string[];
  /** The minimum duration (in milliseconds) the loading screen should remain active. */
  minimumLoadingTime?: number;
  /** The delay (in milliseconds) after reaching 100% before triggering the zoom exit animation. */
  delayBeforeZoom?: number;
  /** Callback function executed when the exit animation completes. */
  onFinished: () => void;
}

/**
 * A full-screen loading component that displays a liquid wave filling up a text mask.
 * It tracks both an artificial minimum time progress and actual asset preloading progress.
 */
export const LiquidLoading: React.FC<LiquidLoadingProps> = ({
  text = '',
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
  const [isReady, setIsReady] = useState<boolean>(false);
  const [visualProgress, setVisualProgress] = useState<number>(0);
  const [isZooming, setIsZooming] = useState<boolean>(false);

  const [realProgress, setRealProgress] = useState<number>(
    assetsToPreload.length === 0 ? 100 : 0
  );
  const [timeProgress, setTimeProgress] = useState<number>(0);

  // Delay the initial mount slightly to prevent hydration flickering
  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setIsReady(true);
    }, 250);

    return () => clearTimeout(mountTimer);
  }, []);

  // Generate SVG path for the wave based on sinusoidal mathematical functions
  const { pathData, wavePeriod } = useMemo(() => {
    const waveWidth = 800;
    const phase1 = 0;
    const phase2 = 1.74;
    const phase3 = 3.32;
    const pathLength = 1200 + waveWidth;
    const step = 10;

    let pathString = `M 0 50 `;

    for (let x = 0; x <= pathLength; x += step) {
      const y1 = 0.5 * Math.sin((x / waveWidth) * Math.PI * 2 + phase1);
      const y2 = 0.3 * Math.sin((x / (waveWidth / 2)) * Math.PI * 2 + phase2);
      const y3 = 0.2 * Math.sin((x / (waveWidth / 3)) * Math.PI * 2 + phase3);

      const y = (50 - (y1 + y2 + y3) * maxOffset).toFixed(2);
      pathString += `L ${x} ${y} `;
    }

    pathString += `L ${pathLength} 1000 L 0 1000 Z`;

    return { pathData: pathString, wavePeriod: waveWidth };
  }, [maxOffset]);

  // Calculate vertical offset for the wave relative to the current progress
  const textBottomY = 180;
  const textTopY = 40;
  const startY = textBottomY + maxOffset;
  const endY = textTopY - maxOffset;
  const totalTravel = startY - endY;

  const waveProgress = visualProgress * 1.1;
  const currentYOffset = startY - (waveProgress / 100) * totalTravel;

  // Handle actual asset preloading
  useEffect(() => {
    if (!assetsToPreload || assetsToPreload.length === 0) {
      setRealProgress(100);
      return;
    }

    let isMounted = true;
    let loadedAssetsCount = 0;
    const totalAssets = assetsToPreload.length;

    const handleAssetLoad = () => {
      loadedAssetsCount++;
      if (isMounted) {
        setRealProgress((loadedAssetsCount / totalAssets) * 100);
      }
    };

    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleAssetLoad;
      img.onerror = handleAssetLoad;
    });

    return () => {
      isMounted = false;
    };
  }, [assetsToPreload]);

  // Handle minimum time duration progress
  useEffect(() => {
    const startTime = Date.now();

    const timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / minimumLoadingTime) * 100, 100);

      setTimeProgress(progress);

      if (progress >= 100) {
        clearInterval(timerInterval);
      }
    }, 30);

    return () => clearInterval(timerInterval);
  }, [minimumLoadingTime]);

  // Synchronize visual progress with both real and time progress
  useEffect(() => {
    const combinedProgress = Math.min(realProgress, timeProgress);
    setVisualProgress(Math.floor(combinedProgress));

    if (realProgress >= 100 && timeProgress >= 100) {
      const zoomTimer = setTimeout(() => {
        setIsZooming(true);
      }, delayBeforeZoom);

      return () => clearTimeout(zoomTimer);
    }
  }, [realProgress, timeProgress, delayBeforeZoom]);

  if (!isReady) {
    return (
      <div
        className="fixed inset-0 z-9999"
        style={{ backgroundColor }}
      />
    );
  }

  return (
    <motion.div
      style={{ backgroundColor }}
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isZooming ? { scale: 80, opacity: 0 } : { opacity: 1 }}
      transition={
        isZooming
          ? { duration: 1.2, ease: [0.7, 0, 0.3, 1] }
          : { duration: 0.5 }
      }
      onAnimationComplete={() => {
        if (isZooming) onFinished();
      }}
    >
      <div className="relative w-full max-w-5xl px-4 flex flex-col items-center">
        <svg viewBox="0 0 800 250" className="w-full h-auto">
          <defs>
            <mask id="liquid-text-mask">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="140"
                fontWeight="900"
                fontFamily={fontFamily}
                fill="white"
                className="tracking-tighter"
              >
                {text}
              </text>
            </mask>
          </defs>

          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="140"
            fontWeight="900"
            fontFamily={fontFamily}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, fill: baseTextColor }}
            transition={{ duration: 0.5 }}
            className="tracking-tighter"
          >
            {text}
          </motion.text>

          <g mask="url(#liquid-text-mask)">
            <motion.path
              d={pathData}
              fill={waveColor}
              initial={false}
              animate={{
                y: currentYOffset,
                x: [0, -wavePeriod],
              }}
              transition={{
                y: { duration: 0.1, ease: 'linear' },
                x: {
                  repeat: Infinity,
                  duration: waveDuration,
                  ease: 'linear',
                },
              }}
            />
          </g>
        </svg>

        <AnimatePresence>
          {!isZooming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[68%] right-[21%] md:right-[20%] pt-[10px] md:pt-[20px] flex items-end gap-2 font-mono text-[10px] md:text-xs tracking-widest uppercase z-10"
            >
              <span className="text-zinc-500">loading...</span>
              <span style={{ color: waveColor }}>
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