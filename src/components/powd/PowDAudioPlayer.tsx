"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { releaseTracks } from "@/data/powdData";
import { ReleaseTrack } from "@/types/powd";

interface AudioPlayerProps {
  currentTrack: ReleaseTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (track: ReleaseTrack) => void;
}

function parseDurationToSeconds(durationStr: string): number {
  if (!durationStr) return 180;
  const parts = durationStr.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 180;
}

function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function PowDAudioPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
}: AudioPlayerProps) {
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof window !== "undefined" && !!(window as any).SC?.Widget;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; time: string } | null>(null);

  const [waveformLevels, setWaveformLevels] = useState<number[]>([
    20, 45, 75, 30, 85, 95, 60, 40, 70, 90, 65, 35, 80, 100, 55, 45, 90, 70, 30, 60, 85, 40, 95, 50, 75, 30, 85, 60, 40, 70
  ]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const totalDurationSeconds = useMemo(() => {
    return currentTrack ? parseDurationToSeconds(currentTrack.duration) : 180;
  }, [currentTrack]);

  // Load SoundCloud Widget API SDK once
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).SC?.Widget) {
      return;
    }

    const scriptId = "sc-widget-api-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = () => {
        setIsSdkLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      script.addEventListener("load", () => setIsSdkLoaded(true));
    }
  }, []);

  // Initialize or rebind Widget when SDK is loaded and iframe exists
  const initWidget = useCallback(() => {
    if (!iframeRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SC = (window as any).SC;
    if (!SC?.Widget) return;

    try {
      const widget = SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind(SC.Widget.Events.READY, () => {
        widget.setVolume(isMuted ? 0 : volume * 100);
        if (isPlayingRef.current) {
          widget.play();
        }
      });

      widget.bind(SC.Widget.Events.PLAY_PROGRESS, (data: { relativePosition: number; currentPosition: number }) => {
        if (!isDragging && data && typeof data.relativePosition === "number") {
          const pct = data.relativePosition * 100;
          setProgress(pct);
          if (data.currentPosition) {
            setCurrentTime(data.currentPosition / 1000);
          } else {
            setCurrentTime(data.relativePosition * totalDurationSeconds);
          }
        }
      });

      widget.bind(SC.Widget.Events.FINISH, () => {
        setProgress(0);
        setCurrentTime(0);
      });
    } catch (err) {
      console.warn("SoundCloud Widget initialization error:", err);
    }
  }, [isMuted, volume, isDragging, totalDurationSeconds]);

  useEffect(() => {
    if (isSdkLoaded) {
      initWidget();
    }
  }, [isSdkLoaded, initWidget, currentTrack?.soundCloudTrackId]);

  // Handle Play/Pause
  useEffect(() => {
    if (!widgetRef.current) return;
    try {
      if (isPlaying) {
        widgetRef.current.play();
      } else {
        widgetRef.current.pause();
      }
    } catch {
      // Ignored
    }
  }, [isPlaying]);

  // Handle Volume & Mute
  useEffect(() => {
    if (!widgetRef.current) return;
    try {
      widgetRef.current.setVolume(isMuted ? 0 : volume * 100);
    } catch {
      // Ignored
    }
  }, [volume, isMuted]);

  // Dynamic Waveform animation tick when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWaveformLevels((prev) =>
        prev.map(() => Math.floor(Math.random() * 80) + 20)
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Seek handler by absolute click/drag position
  const seekToPosition = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const ratio = clickX / rect.width;
      const targetSeconds = ratio * totalDurationSeconds;
      const targetMs = targetSeconds * 1000;

      setProgress(ratio * 100);
      setCurrentTime(targetSeconds);

      if (widgetRef.current) {
        try {
          widgetRef.current.seekTo(targetMs);
        } catch {
          // Fallback
        }
      }
    },
    [totalDurationSeconds]
  );

  // Relative Seek (Fast forward / Rewind by delta in seconds)
  const seekRelative = useCallback(
    (deltaSeconds: number) => {
      const newTime = Math.max(0, Math.min(totalDurationSeconds, currentTime + deltaSeconds));
      const newProgress = (newTime / totalDurationSeconds) * 100;
      setCurrentTime(newTime);
      setProgress(newProgress);

      if (widgetRef.current) {
        try {
          widgetRef.current.seekTo(newTime * 1000);
        } catch {
          // Fallback
        }
      }
    },
    [currentTime, totalDurationSeconds]
  );

  // Skip Track Handlers
  const handlePrevTrack = useCallback(() => {
    if (!currentTrack) return;
    const idx = releaseTracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = releaseTracks[(idx - 1 + releaseTracks.length) % releaseTracks.length];
    onSelectTrack(prevTrack);
  }, [currentTrack, onSelectTrack]);

  const handleNextTrack = useCallback(() => {
    if (!currentTrack) return;
    const idx = releaseTracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = releaseTracks[(idx + 1) % releaseTracks.length];
    onSelectTrack(nextTrack);
  }, [currentTrack, onSelectTrack]);

  // Scrubber Mouse / Touch Events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    seekToPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const hoverX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = hoverX / rect.width;
    const hoverTime = formatTime(ratio * totalDurationSeconds);

    setHoverPosition({ x: hoverX, time: hoverTime });

    if (isDragging) {
      seekToPosition(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto select-none">
      {/* Non-throttled SoundCloud Widget Iframe for Real Audio Streaming */}
      {currentTrack.soundCloudTrackId && (
        <iframe
          ref={iframeRef}
          key={currentTrack.soundCloudTrackId}
          src={`https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F${currentTrack.soundCloudTrackId}&auto_play=false&show_artwork=false&visual=false&buying=false&liking=false&download=false&sharing=false&show_comments=false&show_playcount=false&show_user=false&hide_related=true`}
          width="300"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media"
          style={{
            position: "fixed",
            left: "-9999px",
            bottom: "0px",
            width: "300px",
            height: "166px",
            opacity: 0.01,
            pointerEvents: "none",
          }}
          title="SoundCloud Audio Stream"
        />
      )}

      {/* Expanded Track Drawer */}
      {isExpanded && (
        <div className="bg-[#120D09]/98 backdrop-blur-xl border-t border-[#2C2119] px-6 py-6 max-w-7xl mx-auto shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3 flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-[#3A2B20] shrink-0">
                <Image
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C88639] font-mono">
                  {currentTrack.catalogNumber}
                </span>
                <h4 className="text-lg font-bold text-[#F3EDE4] tracking-tight">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-[#8A7D70] uppercase tracking-wider">
                  {currentTrack.artist} • {currentTrack.year}
                </p>
              </div>
            </div>

            <div className="md:col-span-6 space-y-2">
              <p className="text-xs text-[#C4B8A8] font-mono leading-relaxed">
                {currentTrack.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                <span className="px-2 py-0.5 bg-[#1E1712] border border-[#3A2B20] text-[#E2A958] rounded">
                  {currentTrack.genre}
                </span>
                {currentTrack.likes !== undefined && (
                  <span className="px-2 py-0.5 bg-[#1E1712] border border-[#3A2B20] text-[#E2A958] rounded">
                    LIKES: {currentTrack.likes}
                  </span>
                )}
                <span className="px-2 py-0.5 bg-[#1E1712] border border-[#3A2B20] text-[#8A7D70] rounded">
                  DURATION: {currentTrack.duration}
                </span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-wrap md:justify-end gap-2">
              {currentTrack.links.soundcloud && (
                <a
                  href={currentTrack.links.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1712] hover:bg-[#2A2019] text-[#F3EDE4] border border-[#3A2B20] text-xs font-mono tracking-wider transition-colors"
                >
                  SOUNDCLOUD <ExternalLink className="w-3 h-3 text-[#C88639]" />
                </a>
              )}
            </div>
          </div>

          {/* Embedded Native SoundCloud Waveform Player inside Drawer */}
          {currentTrack.soundCloudTrackId && (
            <div className="mt-4 pt-4 border-t border-[#241A13]">
              <iframe
                src={`https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F${currentTrack.soundCloudTrackId}&color=%23c88639&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false`}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                className="rounded-xs border border-[#2B2019]"
                title={`${currentTrack.title} SoundCloud Player`}
              />
            </div>
          )}
        </div>
      )}

      {/* Main Bottom Bar */}
      <div className="bg-[#0E0B09]/95 backdrop-blur-lg border-t border-[#2C2119] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Track Info */}
          <div className="flex items-center gap-3 min-w-0 md:w-1/4">
            <div className="relative w-11 h-11 rounded-sm overflow-hidden border border-[#3A2B20] shrink-0 bg-[#1A130E]">
              <Image
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-[#C88639]/20 flex items-center justify-center transition-opacity ${
                  isPlaying ? "opacity-100" : "opacity-0"
                }`}
              >
                <Disc className="w-4 h-4 text-[#F3EDE4] animate-spin" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono tracking-widest text-[#C88639] uppercase">
                  {isPlaying ? "PLAYING AUDIO PREVIEW" : "TRACK READY"}
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C88639] animate-pulse" />
              </div>
              <h5 className="text-sm font-bold text-[#F3EDE4] truncate tracking-tight">
                {currentTrack.title}
              </h5>
              <p className="text-[11px] text-[#8A7D70] font-mono truncate">
                {currentTrack.artist} • {currentTrack.genre}
              </p>
            </div>
          </div>

          {/* Center: Playback Controls & Interactive Scrubber */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
            {/* Control Buttons Cluster */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Prev Track */}
              <button
                onClick={handlePrevTrack}
                aria-label="Previous track"
                title="Previous track"
                className="p-1.5 text-[#8A7D70] hover:text-[#EDE6DD] transition-colors rounded-xs hover:bg-[#1A130E]"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              {/* Rewind 10s */}
              <button
                onClick={() => seekRelative(-10)}
                aria-label="Rewind 10 seconds"
                title="Rewind 10s"
                className="flex items-center gap-0.5 px-2 py-1 text-[11px] font-mono text-[#8A7D70] hover:text-[#C88639] bg-[#140E0A] hover:bg-[#1E1712] border border-[#2B2019] rounded-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>-10s</span>
              </button>

              {/* Main Play / Pause Button */}
              <button
                onClick={onTogglePlay}
                aria-label={isPlaying ? "Pause track" : "Play track"}
                className="w-10 h-10 rounded-full bg-[#C88639] hover:bg-[#E2A958] text-[#0E0B09] flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Fast Forward 10s */}
              <button
                onClick={() => seekRelative(10)}
                aria-label="Fast forward 10 seconds"
                title="Fast forward 10s"
                className="flex items-center gap-0.5 px-2 py-1 text-[11px] font-mono text-[#8A7D70] hover:text-[#C88639] bg-[#140E0A] hover:bg-[#1E1712] border border-[#2B2019] rounded-xs transition-colors"
              >
                <span>+10s</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* Next Track */}
              <button
                onClick={handleNextTrack}
                aria-label="Next track"
                title="Next track"
                className="p-1.5 text-[#8A7D70] hover:text-[#EDE6DD] transition-colors rounded-xs hover:bg-[#1A130E]"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Scrubber Bar & Waveform with Timers */}
            <div className="w-full flex items-center gap-3">
              {/* Current Time */}
              <span className="text-[11px] font-mono font-semibold text-[#C88639] min-w-[34px] text-right">
                {formatTime(currentTime)}
              </span>

              {/* Interactive Timeline & Waveform Container */}
              <div
                ref={progressBarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative flex-1 h-6 flex items-center cursor-pointer group"
              >
                {/* Background Waveform Bars */}
                <div className="w-full h-4 flex items-center gap-0.5">
                  {waveformLevels.map((lvl, idx) => {
                    const barProgress = (idx / waveformLevels.length) * 100;
                    const isPlayed = barProgress <= progress;
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-[#1E1712] rounded-xs overflow-hidden flex items-end h-full group-hover:opacity-90"
                      >
                        <div
                          style={{ height: `${lvl}%` }}
                          className={`w-full transition-all duration-100 ${
                            isPlayed
                              ? "bg-linear-to-t from-[#C88639] to-[#E2A958]"
                              : "bg-[#33251B]"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Scrubber Track Line Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#241A13] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-linear-to-r from-[#C88639] to-[#E2A958] transition-all duration-75"
                  />
                </div>

                {/* Scrubber Playhead Handle */}
                <div
                  style={{ left: `${progress}%` }}
                  className="absolute bottom-[-1px] -translate-x-1/2 w-3 h-3 rounded-full bg-[#EDE6DD] border-2 border-[#C88639] shadow-md transition-all duration-75 group-hover:scale-125 opacity-0 group-hover:opacity-100"
                />

                {/* Hover Position Tooltip */}
                {hoverPosition && (
                  <div
                    style={{ left: `${hoverPosition.x}px` }}
                    className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 bg-[#1F1711] border border-[#3A2B20] text-[#E2A958] text-[10px] font-mono rounded shadow-lg pointer-events-none whitespace-nowrap"
                  >
                    {hoverPosition.time}
                  </div>
                )}
              </div>

              {/* Total Duration */}
              <span className="text-[11px] font-mono text-[#8A7D70] min-w-[34px]">
                {currentTrack.duration || formatTime(totalDurationSeconds)}
              </span>
            </div>
          </div>

          {/* Right: Volume & Expand */}
          <div className="flex items-center justify-end gap-3 md:w-1/4">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#8A7D70] hover:text-[#EDE6DD] transition-colors"
                aria-label="Toggle mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 bg-[#2C2119] accent-[#C88639] rounded-full cursor-pointer"
              />
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A130E] hover:bg-[#251B14] border border-[#33251B] text-[#C4B8A8] hover:text-[#F3EDE4] text-xs font-mono transition-colors"
            >
              <span className="hidden sm:inline">{isExpanded ? "COLLAPSE" : "DETAILS"}</span>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
