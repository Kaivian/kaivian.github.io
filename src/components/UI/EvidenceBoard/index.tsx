/**
 * @file index.tsx
 * @description The main wrapper for EvidenceBoard that composes Header, Slider, and List.
 */

import React, { useState, useCallback, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import LaserFlow from '@/components/Background/LaserFlow';
import { ViewMode } from './types';
import { EvidenceHeader } from './EvidenceHeader';
import { EvidenceSlider } from './EvidenceSlider';
import { EvidenceList } from './EvidenceList';

/**
 * EvidenceBoard Component
 * 
 * Acts as the centralized evidence board displaying projects.
 * Composes Header, Slider (for infinite 3D-like view), and List views.
 */
export const EvidenceBoard: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  
  // Create motion value at parent level so Header and Slider share it
  const dragX = useMotionValue(0);

  // References to slider navigation functions so Header can trigger them
  const slideNextRef = useRef<(() => void) | undefined>(undefined);
  const slidePrevRef = useRef<(() => void) | undefined>(undefined);

  const passSlideNext = useCallback((fn: () => void) => {
    slideNextRef.current = fn;
  }, []);

  const passSlidePrev = useCallback((fn: () => void) => {
    slidePrevRef.current = fn;
  }, []);

  const handleSlideNext = () => slideNextRef.current?.();
  const handleSlidePrev = () => slidePrevRef.current?.();

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden flex flex-col">
      {/* --- LASER ANCHOR SYSTEM --- */}
      <div className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none z-0">
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalSizing={1}
          color="#ef4444"
          fogIntensity={0.1}
        />
      </div>

      {/* --- MASTER CARD --- */}
      <div className="relative z-10 w-full mt-[25vh] mb-0 bg-[#050505]/60 backdrop-blur-xl border-t border-red-900/40 shadow-[0_-30px_100px_rgba(220,38,38,0.15)] flex flex-col min-h-[50vh] pb-24">
        
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-red-500 to-transparent opacity-80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20%] h-[3px] bg-red-500 blur-sm opacity-80" />

        {/* Header component with Toggle, Slider navigation */}
        <EvidenceHeader 
          viewMode={viewMode}
          setViewMode={setViewMode}
          onSlideNext={handleSlideNext}
          onSlidePrev={handleSlidePrev}
        />

        {/* Content Area */}
        <div className="relative w-full">
          {viewMode === 'slider' && (
            <EvidenceSlider 
              dragX={dragX} 
              triggerNextCb={passSlideNext} 
              triggerPrevCb={passSlidePrev} 
              isVisible={true} 
            />
          )}
          {viewMode === 'list' && (
            <EvidenceList />
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidenceBoard;
