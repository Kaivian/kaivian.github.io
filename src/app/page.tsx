// src/app/page.tsx
"use client"

import { useState, useEffect } from 'react';
import LiquidLoading from '@/components/Loading/LiquidLoading';

export default function Home() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Lock scrolling while loading
  useEffect(() => {
    document.body.style.overflow = isAppLoading ? 'hidden' : 'unset';
  }, [isAppLoading]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white">

      {/* Dynamic, Highly Customized Liquid Loader */}
      {isAppLoading && (
        <LiquidLoading
          text="kaivian"
          fontFamily="'Inter', sans-serif"  // Custom font
          backgroundColor="#000000"         // True black background
          baseTextColor="#1a1a1a"           // Very dark gray for the empty text
          waveColor="#f3f4f6"               // Off-white for the wave
          waveDuration={1.5}                // Slightly faster wave
          maxOffset={50}                    // Sóng cao 50px
          delayBeforeZoom={1000}            // Wait 1 full second at 100% before zooming
          onFinished={() => setIsAppLoading(false)}
        />
      )}

      {/* Main Portfolio Content */}
      <div
        className={`relative w-full h-full transition-all duration-1000 ease-out ${isAppLoading ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
      >
        <section className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl font-black">Welcome to the Future.</h1>
        </section>
      </div>

    </main>
  );
}