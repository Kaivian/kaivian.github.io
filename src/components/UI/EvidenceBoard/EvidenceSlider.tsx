/**
 * @file EvidenceSlider.tsx
 * @description The draggable 3D-like slider interface displaying projects using infinite scroll techniques.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue, animate, MotionValue } from 'framer-motion';
import { getTripleProjects } from './data';
import { ProjectDataWithKey } from './types';

export interface EvidenceSliderProps {
  /** The current dragged X coordinate of the slider */
  dragX: MotionValue<number>;
  /** External function to manually slide next */
  triggerNextCb?: (fn: () => void) => void;
  /** External function to manually slide prev */
  triggerPrevCb?: (fn: () => void) => void;
  /** Controls component visibility to optimize re-renders */
  isVisible?: boolean;
}

/**
 * EvidenceSlider Component
 * 
 * Displays project cards in a horizontal, draggable slider. To give the illusion 
 * of infinite looping, the standard cards are rendered three times (left, center, right).
 */
export const EvidenceSlider: React.FC<EvidenceSliderProps> = React.memo(({ dragX, triggerNextCb, triggerPrevCb, isVisible = true }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use Memo for static duplicated data layout
  const TRIPLE_PROJECTS = useMemo(() => getTripleProjects(), []);
  
  // Responsive Dimensions
  const baseWidth = isMobile ? 220 : 400;
  const hoverWidth = isMobile ? 280 : 640;
  const shrunkWidth = isMobile ? 210 : 360;

  // The total width of a single "chunk" or section
  // gap-4 is ~16px
  const PROJECTS_COUNT = TRIPLE_PROJECTS.length / 3;
  const chunkWidth = PROJECTS_COUNT * (baseWidth + 16);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Center the view on initial load via setting dragX
      const cw = PROJECTS_COUNT * ((mobile ? 220 : 400) + 16);
      dragX.set(-cw);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [dragX, PROJECTS_COUNT]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setHoveredId(null);
  }, []);

  const handleDrag = useCallback(() => {
    const currentX = dragX.get();
    // Teleportation Logic seamlessly keeps scrolling within bounds
    if (currentX <= -2 * chunkWidth) {
      dragX.set(currentX + chunkWidth);
    } else if (currentX >= 0) {
      dragX.set(currentX - chunkWidth);
    }
  }, [dragX, chunkWidth]);

  const handleDragEnd = useCallback(() => {
    setTimeout(() => setIsDragging(false), 150);
  }, []);

  const slideNext = useCallback(() => {
    let startX = dragX.get();
    if (startX <= -2 * chunkWidth + (baseWidth + 16)) {
      startX += chunkWidth;
      dragX.set(startX);
    }
    animate(dragX, startX - (baseWidth + 16), { type: "spring", stiffness: 200, damping: 30 });
  }, [dragX, chunkWidth, baseWidth]);

  const slidePrev = useCallback(() => {
    let startX = dragX.get();
    if (startX >= -(baseWidth + 16)) {
      startX -= chunkWidth;
      dragX.set(startX);
    }
    animate(dragX, startX + (baseWidth + 16), { type: "spring", stiffness: 200, damping: 30 });
  }, [dragX, chunkWidth, baseWidth]);

  // Bind external triggers if provided
  useEffect(() => {
    if (triggerNextCb) triggerNextCb(slideNext);
    if (triggerPrevCb) triggerPrevCb(slidePrev);
  }, [triggerNextCb, triggerPrevCb, slideNext, slidePrev]);

  return (
    <motion.div
      className="relative z-10 w-full px-6 md:px-16 pb-12 overflow-hidden"
      style={{
        display: isVisible ? 'block' : 'none', // Prevents layout shifting cost vs mounting/unmounting
        opacity: isVisible ? 1 : 0
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        drag="x"
        dragElastic={0}
        style={{ x: dragX }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className={`flex gap-4 w-max ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {TRIPLE_PROJECTS.map((project: ProjectDataWithKey) => {
          const isHovered = hoveredId === project.id;
          const isAnyHovered = hoveredId !== null;

          return (
            <EvidenceCard 
              key={project.uniqueKey}
              project={project}
              isHovered={isHovered}
              isAnyHovered={isAnyHovered}
              isDragging={isDragging}
              baseWidth={baseWidth}
              hoverWidth={hoverWidth}
              shrunkWidth={shrunkWidth}
              setHoveredId={setHoveredId}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
});

EvidenceSlider.displayName = 'EvidenceSlider';


/** Atom component for individual cards in the Slider view */
interface EvidenceCardProps {
  project: ProjectDataWithKey;
  isHovered: boolean;
  isAnyHovered: boolean;
  isDragging: boolean;
  baseWidth: number;
  hoverWidth: number;
  shrunkWidth: number;
  setHoveredId: React.Dispatch<React.SetStateAction<string | null>>;
}

const EvidenceCard: React.FC<EvidenceCardProps> = React.memo(({
  project, isHovered, isAnyHovered, isDragging, baseWidth, hoverWidth, shrunkWidth, setHoveredId
}) => (
  <motion.div
    layout
    onHoverStart={() => !isDragging && setHoveredId(project.id)}
    onHoverEnd={() => !isDragging && setHoveredId(null)}
    initial={{ minWidth: baseWidth }}
    animate={{
      minWidth: isHovered ? hoverWidth : isAnyHovered ? shrunkWidth : baseWidth,
      scale: isDragging ? 0.98 : 1
    }}
    transition={{ layout: { type: "spring", stiffness: 250, damping: 25 }, scale: { duration: 0.2 } }}
    className="group relative h-[45vh] md:h-[65vh] bg-[#0a0a0a] overflow-hidden shrink-0"
  >
    {/* Decors */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/0 group-hover:border-red-500/80 transition-colors duration-500 z-30" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/0 group-hover:border-red-500/80 transition-colors duration-500 z-30" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/0 group-hover:border-red-500/80 transition-colors duration-500 z-30" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/0 group-hover:border-red-500/80 transition-colors duration-500 z-30" />

    <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/40 to-[#050505] z-10 pointer-events-none" />

    <motion.div
      animate={{ filter: isHovered ? "grayscale(0%) brightness(1)" : isAnyHovered ? "grayscale(100%) brightness(0.3)" : "grayscale(50%) brightness(0.6)" }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none bg-zinc-800"
      style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    />

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="absolute bottom-6 left-6 right-6 h-px bg-red-600/80 shadow-[0_0_10px_#dc2626] z-30" />

    {/* Typography */}
    <div className={`absolute top-6 right-5 md:top-8 md:right-6 z-20 flex items-center gap-2 [writing-mode:vertical-rl] text-[8px] md:text-[9px] font-mono tracking-widest uppercase rotate-180 pointer-events-none transition-colors duration-300 ${isHovered ? 'text-gray-200' : 'text-gray-600'}`}>
      {project.type}
      <span className={`w-1 h-1 rounded-full transition-all ${isHovered ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-gray-800'}`} />
    </div>

    <div className="absolute top-6 left-5 md:top-8 md:left-6 z-20 font-mono text-[9px] tracking-widest text-red-600 flex flex-col gap-1 pointer-events-none">
      <div className="flex flex-col gap-[2px]"><span className="w-1 h-[2px] bg-red-600" /><span className="w-1 h-[2px] bg-red-600" /><span className="w-1 h-[2px] bg-red-600" /></div>
    </div>

    <motion.div animate={{ y: isHovered ? -15 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute bottom-8 left-5 md:bottom-10 md:left-6 z-20 pointer-events-none">
      <div className="text-[9px] md:text-[10px] font-mono text-red-600 tracking-widest uppercase mb-2">Evidence #{project.id}</div>

      <motion.h3
        animate={{ color: isHovered ? "#ffffff" : "#6b7280", scale: isHovered ? 1.05 : 1 }}
        style={{ transformOrigin: "0% 100%" }}
        className="font-serif text-3xl md:text-5xl"
      >
        {project.title}
      </motion.h3>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }} className="text-[8px] md:text-[9px] font-mono text-red-400 mt-4">
        [ CLICK TO DECRYPT ]
      </motion.div>
    </motion.div>
  </motion.div>
));

EvidenceCard.displayName = 'EvidenceCard';
