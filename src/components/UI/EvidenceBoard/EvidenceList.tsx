/**
 * @file EvidenceList.tsx
 * @description List view for the Evidence Board. Shows projects in a vertically expanding list.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from './data';
import { ProjectData } from './types';

export interface EvidenceListProps {
  /** Should element be currently visible */
  isVisible?: boolean;
  /** Whether the list is still loading data/assets (triggers Skeleton view) */
  isLoading?: boolean;
}

/**
 * EvidenceList Component
 * 
 * Provides an alternative, simplified list view to the EvidenceSlider.
 * It's optimized for accessibility and quick info retrieval.
 * Keeps mounted even when invisible to prevent expensive unmounts and layout shifts.
 */
export const EvidenceList: React.FC<EvidenceListProps> = React.memo(({ isVisible = false, isLoading = false }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Instead of unmounting on !isVisible, we manipulate CSS `display` and `opacity`
  return (
    <motion.div
      key="list-view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: isVisible ? 'flex' : 'none',
      }}
      className="relative z-10 flex-col w-full px-6 md:px-16 border-t border-gray-800"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ListSkeleton key="skeleton" />
        ) : (
          <motion.div
            key="list-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full"
          >
            {PROJECTS_DATA.map((project) => (
              <EvidenceListItem
                key={`list-${project.id}`}
                project={project}
                isHovered={hoveredId === project.id}
                isAnyHovered={hoveredId !== null}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

EvidenceList.displayName = 'EvidenceList';

/**
 * ListSkeleton
 * 
 * Acts as a fallback UI while assets or data are being fetched.
 * Maintains precise 120px height mapping to avoid layout jumps on load.
 */
export const ListSkeleton: React.FC = React.memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full"
    >
      {Array.from({ length: PROJECTS_DATA.length }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="w-full flex items-center justify-between px-6 md:px-8 border-b border-gray-800 h-[120px] bg-transparent"
        >
          {/* Left Side: ID & Title Skeleton */}
          <div className="w-[70%] flex flex-col gap-3">
            <div className="h-2 w-24 bg-gray-800/50 rounded-md animate-pulse"></div>
            <div className="h-8 md:h-10 w-48 md:w-64 bg-gray-800/50 rounded-md animate-pulse"></div>
          </div>

          {/* Right Side: Type & Decrypt Skeleton */}
          <div className="w-[30%] flex flex-col items-end gap-3">
            <div className="hidden md:block h-2 w-32 bg-gray-800/50 rounded-md animate-pulse"></div>
            <div className="h-2 w-16 bg-gray-800/50 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </motion.div>
  );
});

ListSkeleton.displayName = 'ListSkeleton';


/** Atom component for individual list rows */
interface EvidenceListItemProps {
  project: ProjectData;
  isHovered: boolean;
  isAnyHovered: boolean;
  setHoveredId: React.Dispatch<React.SetStateAction<string | null>>;
}

const EvidenceListItem: React.FC<EvidenceListItemProps> = React.memo(({
  project, isHovered, isAnyHovered, setHoveredId
}) => {
  return (
    <motion.div
      layout
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isAnyHovered && !isHovered ? 0.4 : 1, y: 0, height: isHovered ? 200 : 120 }}
      transition={{ layout: { type: "spring", stiffness: 250, damping: 30 }, opacity: { duration: 0.3 } }}
      className="group relative w-full flex items-center justify-between px-6 md:px-8 border-b border-gray-800 bg-transparent cursor-pointer overflow-hidden"
    >
      <motion.div
        animate={{ opacity: isHovered ? 0.6 : 0, scale: isHovered ? 1 : 1.1, filter: isHovered ? "grayscale(0%)" : "grayscale(100%)" }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none z-0 bg-zinc-900"
        style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <motion.div animate={{ opacity: isHovered ? 1 : 0 }} className="absolute inset-0 bg-linear-to-r from-[#050505] via-[#050505]/70 to-transparent z-0 pointer-events-none" />
      <motion.div animate={{ height: isHovered ? '100%' : '0%' }} className="absolute left-0 top-0 w-1 bg-red-600 z-30" />

      <div className="relative z-10 flex flex-col gap-3 pointer-events-none w-[70%]">
        <motion.div animate={{ color: isHovered ? '#ef4444' : '#6b7280' }} className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase flex items-center gap-3 transition-colors duration-300">
          <motion.div animate={{ width: isHovered ? 30 : 0 }} className="h-[2px] bg-current" />
          Evidence #{project.id}
        </motion.div>
        <motion.h3 layout="position" animate={{ x: isHovered ? 20 : 0, color: isHovered ? "#ffffff" : "#6b7280" }} className="text-3xl md:text-5xl font-serif transition-colors duration-300">
          {project.title}
        </motion.h3>
      </div>

      <div className="relative z-10 flex flex-col items-end gap-3 pointer-events-none w-[30%]">
        <motion.span layout="position" animate={{ opacity: isHovered ? 1 : 0.6 }} className="hidden md:block text-[10px] font-mono tracking-widest uppercase text-gray-400 text-right">
          {project.type}
        </motion.span>
        <motion.div layout="position" animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.5 }} className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
          <span className={`hidden sm:inline ${isHovered ? 'text-red-500' : 'text-gray-500'}`}>[ Decrypt ]</span>
          <motion.span animate={{ x: isHovered ? 5 : 0, color: isHovered ? '#ef4444' : '#6b7280' }}>→</motion.span>
        </motion.div>
      </div>

      <motion.div
        animate={{ top: isHovered ? ['0%', '100%'] : '0%' }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute left-0 w-full h-Dpx bg-red-500/40 z-20 pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
});

EvidenceListItem.displayName = 'EvidenceListItem';
