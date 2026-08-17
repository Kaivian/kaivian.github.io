"use client";

import React, { useState } from "react";
import PowDNavigation from "@/components/powd/PowDNavigation";
import PowDHero from "@/components/powd/PowDHero";
import PowDMusic from "@/components/powd/PowDMusic";
import PowDMixsets from "@/components/powd/PowDMixsets";
import PowDSound from "@/components/powd/PowDSound";
import PowDAbout from "@/components/powd/PowDAbout";
import PowDGallery from "@/components/powd/PowDGallery";
import PowDContact from "@/components/powd/PowDContact";
import PowDFooter from "@/components/powd/PowDFooter";
import PowDAudioPlayer from "@/components/powd/PowDAudioPlayer";
import { releaseTracks } from "@/data/powdData";
import { ReleaseTrack } from "@/types/powd";

export default function PowDPage() {
  const [currentTrack, setCurrentTrack] = useState<ReleaseTrack | null>(releaseTracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlayTrack = (track: ReleaseTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0705] text-[#EDE6DD] selection:bg-[#C88639] selection:text-[#0A0705]">
      {/* Navigation */}
      <PowDNavigation />

      {/* Main Content Sections */}
      <main>
        <PowDHero
          onPlayTrack={handlePlayTrack}
          isPlaying={isPlaying}
        />

        <PowDAbout />

        <PowDMusic
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayTrack={handlePlayTrack}
        />

        <PowDMixsets />

        <PowDSound />

        <PowDGallery />

        <PowDContact />
      </main>

      {/* Footer */}
      <PowDFooter />

      {/* Floating Audio Player Bar */}
      <PowDAudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSelectTrack={handlePlayTrack}
      />
    </div>
  );
}
