/**
 * @file EvidenceHeader.tsx
 * @description The header area for the Evidence Board displaying title, sector info, and view toggles.
 */

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewMode } from './types';
import { ToggleButton } from '@/components/Shared/ToggleButton';
import { IconButton } from '@/components/Shared/IconButton';

export interface EvidenceHeaderProps {
  /** Current active view mode ('slider' or 'list') */
  viewMode: ViewMode;
  /** Callback to change the view mode */
  setViewMode: (mode: ViewMode) => void;
  /** Function to trigger the previous slide (Only applicable if viewMode is slider) */
  onSlidePrev?: () => void;
  /** Function to trigger the next slide (Only applicable if viewMode is slider) */
  onSlideNext?: () => void;
}

/**
 * EvidenceHeader Component
 * 
 * Renders the title "Evidence Board" alongside system scanning status, 
 * tab toggles for list/slider views, and navigation arrows for the slider.
 */
export const EvidenceHeader: React.FC<EvidenceHeaderProps> = ({
  viewMode,
  setViewMode,
  onSlidePrev,
  onSlideNext
}) => {
  return (
    <div className="relative z-10 px-6 md:px-16 pt-12 mb-8 flex flex-col gap-8">
      <div className="flex flex-row justify-between items-end gap-4 border-b border-gray-800/50 pb-8">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif uppercase tracking-tight text-gray-200 leading-none mb-[-4px]">
          Evidence Board
        </h2>
        <div className="text-[9px] sm:text-[10px] font-mono text-gray-500 text-right tracking-widest uppercase shrink-0">
          Sector: Web <br /> Scanning: <span className="text-red-500 animate-pulse">Active</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Tab Controls */}
        <div className="flex font-mono text-[10px] tracking-widest border border-gray-800 bg-black/50 cursor-pointer">
          <ToggleButton
            label="SLIDER"
            isActive={viewMode === 'slider'}
            onClick={() => setViewMode('slider')}
            icon={<div className="flex gap-[2px] h-3 w-3"><div className="w-1/2 bg-current h-full" /><div className="w-1/2 bg-current h-full" /></div>}
          />

          <ToggleButton
            label="LIST"
            isActive={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            className="border-l border-gray-800"
            icon={<div className="flex flex-col gap-[2px] h-3 w-3"><div className="h-1/3 bg-current w-full" /><div className="h-1/3 bg-current w-full" /><div className="h-1/3 bg-current w-full" /></div>}
          />
        </div>

        {/* Slider Navigation */}
        <AnimatePresence>
          {viewMode === 'slider' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-1 font-mono text-[12px]"
            >
              <IconButton onClick={onSlidePrev}>&larr;</IconButton>
              <IconButton onClick={onSlideNext}>&rarr;</IconButton>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-32 hidden md:block"></div>
      </div>
    </div>
  );
};
