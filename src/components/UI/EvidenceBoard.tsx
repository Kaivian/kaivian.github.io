// src/components/EvidenceBoard.tsx
"use client"

import { useState, useRef, useEffect } from 'react';
import LaserFlow from '@/components/Background/LaserFlow';

// --- MOCK DATA ---
const PROJECTS_DATA = [
  { id: '01', title: 'Célia', type: '3D EXPERIENCE', image: '/projects/celia.jpg' },
  { id: '02', title: 'J. Pancras', type: 'PORTFOLIO', image: '/projects/pancras.jpg' },
  { id: '03', title: '2026 Greetings', type: '3D EXPERIENCE', image: '/projects/2026.jpg' },
  { id: '04', title: 'Ciao', type: 'SHOWCASE WEBSITE', image: '/projects/ciao.jpg' },
  { id: '05', title: 'H.A.N.D.S.', type: 'INTERACTIVE EXPERIENCE', image: '/projects/hands.jpg' },
  { id: '06', title: 'Apogée', type: '3D EXPERIENCE', image: '/projects/apogee.jpg' },
  { id: '07', title: 'K. Herzer', type: 'PORTFOLIO', image: '/projects/herzer.jpg' },
];

const infiniteProjects = [...PROJECTS_DATA, ...PROJECTS_DATA, ...PROJECTS_DATA];

export default function EvidenceBoard() {
  const [viewMode, setViewMode] = useState<'slider' | 'list'>('slider');

  // --- DRAG TO SCROLL LOGIC ---
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (viewMode === 'slider' && sliderRef.current) {
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.scrollLeft = sliderRef.current.scrollWidth / 3;
        }
      }, 50);
    }
  }, [viewMode]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider || isDragging) return; // Không can thiệp lúc đang kéo chuột

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const oneThird = slider.scrollWidth / 3;

    if (slider.scrollLeft >= maxScroll - 10) {
      slider.scrollLeft -= oneThird;
    } else if (slider.scrollLeft <= 10) {
      slider.scrollLeft += oneThird;
    }
  };

  // --- MOUSE EVENTS CỦA DRAG (ĐÃ NÂNG CẤP VỚI MOMENTUM) ---
  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const triggerSnapMomentum = () => {
    setIsDragging(false);
    // Đánh thức CSS Snap: Ép slider tự động lướt mượt mà vào trung tâm thẻ gần nhất
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 0, behavior: 'smooth' });
    }
  };

  const onMouseLeave = () => {
    if (isDragging) triggerSnapMomentum();
  };

  const onMouseUp = () => {
    if (isDragging) triggerSnapMomentum();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.8; // Hệ số kéo mượt hơn
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- BUTTON EVENTS ---
  const slideNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const slidePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden flex flex-col">

      {/* --- LASER ANCHOR SYSTEM --- */}
      <div className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none z-0 overflow-visible">
        <div className="absolute top-0 left-0 w-full h-full">
          <LaserFlow
            horizontalBeamOffset={0.0}
            verticalBeamOffset={0.0}
            verticalSizing={1.2}
            color="#ef4444"
            fogIntensity={0.6}
          />
        </div>
      </div>

      {/* --- MASTER CARD --- */}
      <div className="relative z-10 w-full mt-[25vh] mb-0 bg-[#050505]/60 backdrop-blur-xl border-t border-red-900/40 shadow-[0_-30px_100px_rgba(220,38,38,0.15)] flex flex-col min-h-[50vh] pb-24">

        {/* Glow Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-red-500 to-transparent opacity-80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20%] h-[3px] bg-red-500 blur-sm opacity-80" />

        {/* --- HEADER --- */}
        <div className="relative z-10 px-8 md:px-16 pt-12 mb-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-800/50 pb-8">
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tight text-gray-200">
              Evidence Board
            </h2>
            <div className="text-[10px] font-mono text-gray-500 text-right tracking-widest uppercase">
              Sector: Web <br /> Scanning: <span className="text-red-500">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex font-mono text-[10px] tracking-widest border border-gray-800 bg-black/50 cursor-none">
              <button
                onClick={() => setViewMode('slider')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors relative group ${viewMode === 'slider' ? 'text-red-500 bg-red-900/10' : 'text-gray-500 hover:text-white'}`}
              >
                {viewMode === 'slider' && <div className="absolute top-0 left-0 w-full h-px bg-red-500" />}
                <div className="flex gap-[2px] h-3 w-3"><div className="w-1/2 bg-current h-full" /><div className="w-1/2 bg-current h-full" /></div>
                SLIDER
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors border-l border-gray-800 relative group ${viewMode === 'list' ? 'text-red-500 bg-red-900/10' : 'text-gray-500 hover:text-white'}`}
              >
                {viewMode === 'list' && <div className="absolute top-0 left-0 w-full h-px bg-red-500" />}
                <div className="flex flex-col gap-[2px] h-3 w-3"><div className="h-1/3 bg-current w-full" /><div className="h-1/3 bg-current w-full" /><div className="h-1/3 bg-current w-full" /></div>
                LIST
              </button>
            </div>

            {viewMode === 'slider' && (
              <div className="flex gap-1 font-mono text-[12px] cursor-none">
                <button onClick={slidePrev} className="w-10 h-10 flex items-center justify-center border border-gray-800 bg-black/50 text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
                  &larr;
                </button>
                <button onClick={slideNext} className="w-10 h-10 flex items-center justify-center border border-gray-800 bg-black/50 text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors">
                  &rarr;
                </button>
              </div>
            )}

            <div className="w-32 hidden md:block"></div>
          </div>
        </div>

        {/* --- SLIDER VIEW --- */}
        {viewMode === 'slider' && (
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={`relative z-10 flex w-full overflow-x-auto gap-4 px-8 md:px-16 pb-12 scrollbar-hide select-none transition-all duration-300 ${isDragging
                ? 'cursor-grabbing snap-none'
                : 'cursor-grab snap-x snap-mandatory'
              }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteProjects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className={`group relative min-w-[300px] md:min-w-[400px] h-[60vh] md:h-[70vh] bg-[#0a0a0a] transition-all duration-500 ease-out ${isDragging
                    ? 'scale-[0.97] opacity-70'
                    : 'scale-100 opacity-100 snap-center'
                  }`}
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
              >
                {/* Góc Card - Cyberpunk Style */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/0 group-hover:border-white/50 transition-colors z-30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/0 group-hover:border-white/50 transition-colors z-30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/0 group-hover:border-white/50 transition-colors z-30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/0 group-hover:border-white/50 transition-colors z-30" />

                {/* Overlays */}
                <div className="absolute inset-0 border border-gray-800 group-hover:border-gray-600 transition-colors z-20 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/60 to-[#050505] z-10 pointer-events-none group-hover:via-[#050505]/40 transition-all" />

                {/* Background Image */}
                <div
                  className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 ease-out bg-zinc-800 pointer-events-none"
                  style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                <div className="absolute bottom-6 left-6 right-6 h-px bg-red-600/0 group-hover:bg-red-600/80 transition-colors duration-500 z-30" />

                {/* Typography & Details */}
                <div className="absolute top-8 right-6 z-20 flex items-center gap-2 [writing-mode:vertical-rl] text-[9px] font-mono tracking-widest text-gray-500 uppercase rotate-180 group-hover:text-gray-300 transition-colors pointer-events-none">
                  {project.type}
                  <span className="w-1 h-1 bg-red-600 rounded-full" />
                </div>

                <div className="absolute top-8 left-6 z-20 font-mono text-[9px] tracking-widest text-red-600 flex flex-col gap-1 pointer-events-none">
                  <div className="flex flex-col gap-[2px]">
                    <span className="w-1 h-[2px] bg-red-600"></span>
                    <span className="w-1 h-[2px] bg-red-600"></span>
                    <span className="w-1 h-[2px] bg-red-600"></span>
                    <span className="w-1 h-[2px] bg-red-600 opacity-50 group-hover:opacity-100 transition-opacity"></span>
                  </div>
                </div>

                <div className="absolute bottom-10 left-6 z-20 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="text-[10px] font-mono text-red-600 tracking-widest uppercase mb-2">
                    Evidence #{project.id}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-gray-400 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-[9px] font-mono text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    [ CLICK TO DECRYPT ]
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- LIST VIEW --- */}
        {viewMode === 'list' && (
          <div className="relative z-10 flex flex-col w-full px-8 md:px-16 border-t border-gray-800">
            {PROJECTS_DATA.map((project) => (
              <div
                key={`list-${project.id}`}
                className="group relative w-full h-32 md:h-40 flex items-center justify-between px-6 border-b border-gray-800 bg-transparent hover:bg-white/5 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-30" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-red-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 tracking-widest">
                  X: 1059 Y: 590
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 grayscale-0 bg-zinc-900 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
                  <div className="text-[10px] font-mono text-red-600 tracking-widest uppercase flex items-center gap-3">
                    <div className="w-[2px] h-3 bg-red-600" />
                    Evidence #{project.id}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-gray-500 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center gap-12 pointer-events-none">
                  <span className="hidden md:block text-[10px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors tracking-widest uppercase">
                    {project.type}
                  </span>
                  <div className="text-[10px] font-mono text-gray-600 tracking-widest uppercase group-hover:text-red-500 transition-colors flex items-center gap-2">
                    [ Click to Decrypt ] <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}