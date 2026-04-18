// src/app/page.tsx
"use client"

import { useState, useEffect } from 'react';
import LiquidLoading from '@/components/Loading/LiquidLoading';
import DarkVeil from '@/components/Background/DarkVeil';
import ScrambledText from '@/components/UI/ScrambledText';
import EvidenceBoard from '@/components/UI/EvidenceBoard';

export default function Home() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [mouseState, setMouseState] = useState({ clientX: 0, clientY: 0, pageX: 0, pageY: 0, isActive: false });
  const [currentTime, setCurrentTime] = useState("00:00:00");

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION
    ? `v.${process.env.NEXT_PUBLIC_APP_VERSION}`
    : "v0.1.0";

  useEffect(() => {
    document.body.style.overflow = isAppLoading ? 'hidden' : 'auto';

    const handleMouseMove = (e: MouseEvent) => {
      setMouseState({
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        isActive: true
      });
    };

    const handleScroll = () => {
      setMouseState((prev) => ({
        ...prev,
        pageX: prev.clientX + window.scrollX,
        pageY: prev.clientY + window.scrollY,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, [isAppLoading]);

  const spotlightX = mouseState.isActive ? `${mouseState.pageX}px` : '50vw';
  const spotlightY = mouseState.isActive ? `${mouseState.pageY}px` : '50vh';

  return (
    <main className="relative min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-red-900/50">

      {!isAppLoading && mouseState.isActive && (
        <div className="hidden md:block pointer-events-none fixed top-0 left-0 z-100">
          <div
            className="absolute w-2 h-2 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-transform duration-75 ease-out"
            style={{ transform: `translate(${mouseState.clientX - 3}px, ${mouseState.clientY - 3}px)` }}
          />
          <div
            className="absolute text-[9px] text-red-500 font-mono tracking-widest ml-4 mt-2 opacity-80 transition-transform duration-75 ease-out"
            style={{ transform: `translate(${mouseState.clientX}px, ${mouseState.clientY}px)` }}
          >
            X:{mouseState.clientX} Y:{mouseState.clientY}
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <DarkVeil hueShift={-115} noiseIntensity={0} scanlineIntensity={1} speed={1} scanlineFrequency={0} warpAmount={1} resolutionScale={1} />
      </div>

      {isAppLoading && (
        <div className="fixed inset-0 z-60">
          <LiquidLoading
            text="kaivian"
            fontFamily="'Inter', sans-serif"
            backgroundColor="#000000"
            baseTextColor="#1a1a1a"
            waveColor="#ef4444"
            waveDuration={1.5}
            maxOffset={50}
            delayBeforeZoom={1000}
            assetsToPreload={[
              '/projects/celia.jpg',
              '/projects/pancras.jpg',
              '/projects/2026.jpg',
              '/projects/ciao.jpg',
              '/projects/hands.jpg',
              '/projects/apogee.jpg',
              '/projects/herzer.jpg',
            ]}
            onFinished={() => setIsAppLoading(false)}
          />
        </div>
      )}

      {!isAppLoading && (
        <>
          <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3 font-mono pointer-events-auto cursor-none">
            <div className="text-[10px] md:text-xs text-red-600 tracking-[0.2em] opacity-80">
              {currentTime} <span className="text-gray-600">ISO 800</span>
            </div>
            <div className="flex flex-col gap-1 text-[10px] tracking-widest">
              <button className="border border-red-900/60 bg-red-900/10 text-red-500 px-2 py-1 hover:bg-red-600 hover:text-white transition-all w-8 text-center relative group cursor-none">
                EN<span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="border border-gray-800 text-gray-500 px-2 py-1 hover:border-red-900/60 hover:text-red-500 transition-all w-8 text-center relative group cursor-none">
                VI<span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-1 font-mono text-[9px] md:text-[10px] tracking-widest text-gray-500 text-right uppercase">
            <div className="flex items-center gap-2">SYS. DIAGNOSTIC <span className="text-red-600">STABLE</span></div>
            <div>{appVersion} {'// © 2026 DOAN THE LUC'}</div>
          </div>

          <div className="fixed top-6 left-6 z-50 text-[10px] text-red-600 tracking-[0.2em] uppercase opacity-80 flex flex-col gap-1 pointer-events-none">
            <span>CAM_04 [REC]</span><span className="text-gray-500">SIGNAL_STRONG</span>
          </div>

          <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest pointer-events-none">
            <div className="w-2 h-2 bg-red-600 rounded-none animate-pulse" /> LIVE FEED
          </div>
        </>
      )}

      <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center z-10 px-4">

        <div
          className="hidden md:block absolute inset-0 z-45 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 1000px at ${spotlightX} ${spotlightY}, rgba(0,0,0,0) 0%, rgba(5,5,5,0.6) 70%, rgba(0,0,0,0.95) 100%)`
          }}
        />

        <section className={`flex flex-col items-center transition-all duration-1000 ease-out z-40 ${isAppLoading ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-none delay-500'}`}>
          <div className="w-3 h-3 bg-white rounded-full mb-6 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

          <div className="relative border border-red-900/60 bg-black/20 text-red-600 text-[10px] md:text-xs tracking-[0.3em] px-6 py-2 mb-8 uppercase backdrop-blur-sm">
            TOP SECRET // CASE #2026
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600" />
          </div>

          <div className="text-[10px] text-gray-600 tracking-widest mb-2 opacity-50 uppercase">
            Subject Identified
          </div>

          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] leading-none font-bold tracking-tight text-center pb-4 font-serif text-transparent bg-clip-text bg-linear-to-b from-gray-100 via-gray-400 to-gray-700 drop-shadow-2xl uppercase relative z-20">
            Doan The Luc
          </h1>

          <h2 className="text-red-500 text-xl md:text-2xl mt-2 mb-6 tracking-widest font-light">
            Kaivian.
          </h2>

          <div className="max-w-full flex flex-col items-center gap-1 text-center mt-4 px-6 py-4">
            <ScrambledText className="text-md md:text-2xl text-gray-400 tracking-wider font-mono" radius={40}>
              <span className='text-red-500'>Fullstack</span> Developer.<br />
              <span className='text-red-500'>Backend</span> Rigor and <span className='text-red-500'>Frontend</span> Interactivity.<br />
              Seeking graduation opportunities.
            </ScrambledText>
          </div>
        </section>

        <div className="absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-[#050505] to-transparent z-50 pointer-events-none" />
      </div>

      <EvidenceBoard />
    </main>
  );
}