// src/app/page.tsx
"use client"

import { useState, useEffect } from 'react';
import LiquidLoading from '@/components/Loading/LiquidLoading';
import DarkVeil from '@/components/Background/DarkVeil';
import ScrambledText from '@/components/UI/ScrambledText';

export default function Home() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Gộp tọa độ chuột và trạng thái kích hoạt vào một object để tránh re-render nhiều lần
  const [mouseState, setMouseState] = useState({ x: 0, y: 0, isActive: false });
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    // Khóa cuộn khi đang loading
    document.body.style.overflow = isAppLoading ? 'hidden' : 'auto';

    const handleMouseMove = (e: MouseEvent) => {
      setMouseState({ x: e.clientX, y: e.clientY, isActive: true });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cập nhật đồng hồ mỗi giây
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [isAppLoading]);

  // Logic xác định vị trí Spotlight: Nếu chưa di chuyển chuột thì nằm giữa màn hình (50vw, 50vh)
  const spotlightX = mouseState.isActive ? `${mouseState.x}px` : '50vw';
  const spotlightY = mouseState.isActive ? `${mouseState.y}px` : '50vh';

  return (
    <main className="relative min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">

      {/* --- FLASHLIGHT EFFECT --- */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(circle 900px at ${spotlightX} ${spotlightY}, rgba(0,0,0,0) 0%, rgba(5,5,5,0.4) 50%, rgba(0,0,0,0.8) 100%)`
        }}
      />

      {/* --- CUSTOM CURSOR & COORDINATES (LỚP Z-[100] CAO NHẤT) --- */}
      {!isAppLoading && mouseState.isActive && (
        <div className="pointer-events-none fixed top-0 left-0 z-100">
          {/* Chấm đỏ */}
          <div
            className="absolute w-2 h-2 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-transform duration-75 ease-out"
            style={{ transform: `translate(${mouseState.x - 3}px, ${mouseState.y - 3}px)` }}
          />
          {/* Tọa độ XY */}
          <div
            className="absolute text-[9px] text-red-500 font-mono tracking-widest ml-4 mt-2 opacity-80 transition-transform duration-75 ease-out"
            style={{ transform: `translate(${mouseState.x}px, ${mouseState.y}px)` }}
          >
            X:{mouseState.x} Y:{mouseState.y}
          </div>
        </div>
      )}

      {/* 1. Background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <DarkVeil
          hueShift={-115}
          noiseIntensity={0}
          scanlineIntensity={1}
          speed={1}
          scanlineFrequency={0}
          warpAmount={1}
          resolutionScale={1}
        />
      </div>

      {/* 2. Loading Screen */}
      {isAppLoading && (
        <div className="absolute inset-0 z-50">
          <LiquidLoading
            text="kaivian"
            fontFamily="'Inter', sans-serif"
            backgroundColor="#000000"
            baseTextColor="#1a1a1a"
            waveColor="#ef4444"
            waveDuration={1.5}
            maxOffset={50}
            delayBeforeZoom={1000}
            onFinished={() => setIsAppLoading(false)}
          />
        </div>
      )}

      {/* --- TOP RIGHT CORNER: TIME & LANGUAGE --- */}
      {!isAppLoading && (
        <div className="fixed top-8 right-8 z-40 flex flex-col items-end gap-3 font-mono pointer-events-auto cursor-none">
          <div className="text-[10px] md:text-xs text-red-600 tracking-[0.2em] opacity-80">
            {currentTime} <span className="text-gray-600">ISO 800</span>
          </div>
          <div className="flex flex-col gap-1 text-[10px] tracking-widest">
            <button className="border border-red-900/60 bg-red-900/10 text-red-500 px-2 py-1 hover:bg-red-600 hover:text-white transition-all w-8 text-center relative group cursor-none">
              EN
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="border border-gray-800 text-gray-500 px-2 py-1 hover:border-red-900/60 hover:text-red-500 transition-all w-8 text-center relative group cursor-none">
              VI
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      )}

      {/* --- BOTTOM RIGHT CORNER: VERSION & COPYRIGHT --- */}
      {!isAppLoading && (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-1 font-mono text-[9px] md:text-[10px] tracking-widest text-gray-500 text-right uppercase">
          <div className="flex items-center gap-2">
            SYS. DIAGNOSTIC <span className="text-red-600">STABLE</span>
          </div>
          <div>v0.1.0 // © 2026 DOAN THE LUC</div>
        </div>
      )}

      {/* 3. Content Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen z-10 px-4">
        <section
          className={`flex flex-col items-center transition-all duration-1000 ease-out ${isAppLoading
            ? 'opacity-0 translate-y-8 blur-sm'
            : 'opacity-100 translate-y-0 blur-none delay-500'
            }`}
        >
          <div className="w-3 h-3 bg-white rounded-full mb-6 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

          <div className="relative border border-red-900/60 text-red-600 text-[10px] md:text-xs tracking-[0.3em] px-6 py-2 mb-8 uppercase">
            TOP SECRET // CASE #2026
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-600" />
          </div>

          <div className="text-[10px] text-gray-600 tracking-widest mb-2 opacity-50 uppercase">
            Subject Identified
          </div>

          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] leading-none font-bold tracking-tight text-center pb-4 font-serif text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-400 to-gray-700 drop-shadow-2xl uppercase relative z-20">
            Doan The Luc
          </h1>

          <h2 className="text-red-500 text-xl md:text-2xl mt-2 mb-6 tracking-widest font-light">
            Kaivian.
          </h2>

          <div className="max-w-full flex flex-col items-center gap-1 text-center mt-4">
            <ScrambledText
              className="text-md md:text-base text-gray-400 tracking-wider font-mono"
              radius={20}
              duration={1}
              speed={0.5}
              scrambleChars=".:"
            >
              <span className='text-red-500'>Fullstack</span> Developer.<br />
              <span className='text-red-500'>Backend</span> Rigor & <span className='text-red-500'>Frontend</span> Interactivity.<br />
              Seeking graduation opportunities.
            </ScrambledText>
          </div>
        </section>
      </div>

      {/* --- TOP & BOTTOM LEFT CORNERS --- */}
      {!isAppLoading && (
        <>
          <div className="fixed top-8 left-8 z-40 text-[10px] text-red-600 tracking-[0.2em] uppercase opacity-80 flex flex-col gap-1 pointer-events-none">
            <span>CAM_04 [REC]</span>
            <span className="text-gray-500">SIGNAL_STRONG</span>
          </div>

          <div className="fixed bottom-8 left-8 z-40 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest pointer-events-none">
            <div className="w-2 h-2 bg-red-600 rounded-none animate-pulse" />
            LIVE FEED
          </div>
        </>
      )}
    </main>
  );
}