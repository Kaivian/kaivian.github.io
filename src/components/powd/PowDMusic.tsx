"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ExternalLink, Disc, ArrowUpDown, ChevronDown, Check, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { releaseTracks } from "@/data/powdData";
import { ReleaseTrack } from "@/types/powd";

interface PowDMusicProps {
  currentTrack: ReleaseTrack | null;
  isPlaying: boolean;
  onPlayTrack: (track: ReleaseTrack) => void;
}

const ITEMS_PER_PAGE = 5;

const sortOptions = [
  { id: "latest", label: "LATEST RELEASE", desc: "Mới nhất / Chronological" },
  { id: "likes", label: "MOST LIKED", desc: "Số lượt tim cao nhất" },
  { id: "title", label: "TITLE: A → Z", desc: "Theo thứ tự bảng chữ cái" },
];

export default function PowDMusic({
  currentTrack,
  isPlaying,
  onPlayTrack,
}: PowDMusicProps) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterTabs = [
    { label: "ALL", filter: "ALL" },
    { label: "ORIGINALS", filter: "ORIGINAL" },
    { label: "EDITS & REMIXES", filter: "EDIT / REMIX" },
  ];

  const getTabCount = (filterType: string) => {
    if (filterType === "ALL") return releaseTracks.length;
    if (filterType === "ORIGINAL") {
      return releaseTracks.filter((t) => t.releaseType === "ORIGINAL").length;
    }
    if (filterType === "EDIT / REMIX") {
      return releaseTracks.filter((t) => t.releaseType !== "ORIGINAL").length;
    }
    return releaseTracks.filter((t) => t.releaseType === filterType).length;
  };

  const filteredAndSortedTracks = releaseTracks
    .filter((t) => {
      if (activeFilter === "ALL") return true;
      if (activeFilter === "ORIGINAL") return t.releaseType === "ORIGINAL";
      if (activeFilter === "EDIT / REMIX") return t.releaseType !== "ORIGINAL";
      return t.releaseType === activeFilter;
    })
    .sort((a, b) => {
      if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      // default "latest"
      if (b.year !== a.year) return b.year - a.year;
      return a.catalogNumber.localeCompare(b.catalogNumber);
    });

  const totalPages = Math.ceil(filteredAndSortedTracks.length / ITEMS_PER_PAGE) || 1;

  const paginatedTracks = filteredAndSortedTracks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const flagshipTrack = releaseTracks[0];

  return (
    <section id="music" className="relative py-28 bg-[#0D0907] text-[#EDE6DD] border-t border-[#1F1610]">
      {/* Background Texture Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8863908_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-[#241A13] gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full pr-0 lg:pr-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#C88639] font-mono text-xs tracking-widest uppercase">
                <span className="w-2 h-2 bg-[#C88639] rounded-xs animate-pulse" />
                <span>OFFICIAL SOUNDCLOUD ARCHIVE • @POWD-HERE</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#F3EDE4] uppercase font-display">
                RELEASES / ARCHIVE
              </h2>
            </div>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#140E0A] border border-[#2B2019] rounded-xs overflow-x-auto scrollbar-none">
              {filterTabs.map((tab) => {
                const count = getTabCount(tab.filter);
                const isActive = activeFilter === tab.filter;
                return (
                  <button
                    key={tab.label}
                    onClick={() => handleFilterChange(tab.filter)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded-xs whitespace-nowrap shrink-0 cursor-pointer ${isActive
                      ? "bg-[#C88639] text-[#0A0705] font-bold shadow-[0_0_14px_rgba(200,134,57,0.3)]"
                      : "text-[#8A7D70] hover:text-[#EDE6DD] hover:bg-[#1E1611]"
                      }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive
                        ? "bg-[#0A0705]/25 text-[#0A0705]"
                        : "bg-[#18110C] text-[#6E6256] border border-[#241A13]"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Sort Dropdown */}
            <div ref={sortRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 bg-[#140E0A] border rounded-xs text-xs font-mono transition-all duration-200 cursor-pointer ${isSortOpen
                  ? "border-[#C88639] text-[#EDE6DD] bg-[#1A130E] shadow-[0_0_15px_rgba(200,134,57,0.25)]"
                  : "border-[#2B2019] text-[#C4B8A8] hover:border-[#3D2C20] hover:text-[#EDE6DD] hover:bg-[#18110C]"
                  }`}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#C88639] shrink-0" />
                  <span className="text-[10px] text-[#8A7D70] uppercase font-bold tracking-wider shrink-0">
                    SORT:
                  </span>
                  <span className="text-xs font-bold text-[#F3EDE4] tracking-wide whitespace-nowrap">
                    {sortOptions.find((opt) => opt.id === sortBy)?.label || "LATEST RELEASE"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#8A7D70] transition-transform duration-300 ml-1 shrink-0 ${isSortOpen ? "rotate-180 text-[#C88639]" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu Popover */}
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 z-50 bg-[#120D09]/95 backdrop-blur-md border border-[#2B2019] shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(200,134,57,0.15)] rounded-xs py-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-[#1F1610] flex items-center justify-between text-[9px] font-mono text-[#8A7D70] uppercase tracking-widest">
                    <span>SORT ARCHIVE</span>
                    <span className="text-[#C88639]">POWD-SYS</span>
                  </div>

                  <div className="p-1 space-y-0.5">
                    {sortOptions.map((option) => {
                      const isSelected = sortBy === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSortChange(option.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-mono rounded-xs transition-colors text-left cursor-pointer ${isSelected
                            ? "bg-[#C88639]/15 text-[#E2A958] font-bold border border-[#C88639]/30"
                            : "text-[#8A7D70] hover:text-[#EDE6DD] hover:bg-[#1A130E]"
                            }`}
                        >
                          <div>
                            <span className="block tracking-wider">{option.label}</span>
                            <span className="block text-[9px] text-[#6E6256] font-normal">{option.desc}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#C88639] shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flagship Release Highlight Banner */}
        <div className="mb-16 bg-[#130E0A] border border-[#2B2019] p-6 md:p-10 rounded-xs shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C88639]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Artwork Frame */}
            <div className="lg:col-span-4 relative">
              <div className="relative aspect-square w-full max-w-sm mx-auto rounded-xs overflow-hidden border border-[#3A2B20] shadow-2xl group-hover:border-[#C88639]/60 transition-colors">
                <Image
                  src={flagshipTrack.coverImage}
                  alt={flagshipTrack.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#0A0705]/80 backdrop-blur-md border border-[#3A2B20] px-2 py-1 text-[10px] font-mono text-[#C88639] tracking-widest uppercase">
                  FLAGSHIP RELEASE
                </div>
              </div>
            </div>

            {/* Track Info & Player Trigger */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#C88639] mb-2">
                  <span>{flagshipTrack.catalogNumber}</span>
                  <span>•</span>
                  <span>{flagshipTrack.year}</span>
                  <span>•</span>
                  <span className="text-[#8A7D70] uppercase">{flagshipTrack.genre}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-[#F3EDE4] tracking-tight uppercase font-display">
                  {flagshipTrack.title}
                </h3>
                <p className="text-sm text-[#C4B8A8] font-mono mt-3 max-w-2xl leading-relaxed">
                  {flagshipTrack.description}
                </p>
              </div>

              {/* Telemetry specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#18110C] border border-[#241A13] rounded-xs text-xs font-mono">
                <div>
                  <span className="text-[#8A7D70] block text-[10px] uppercase">FAVORITED</span>
                  <span className="text-[#E2A958] font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#C88639]/30 text-[#C88639]" />
                    {flagshipTrack.likes ?? 1} LIKES
                  </span>
                </div>
                <div>
                  <span className="text-[#8A7D70] block text-[10px] uppercase">GENRE</span>
                  <span className="text-[#EDE6DD] font-bold">{flagshipTrack.genre}</span>
                </div>
                <div>
                  <span className="text-[#8A7D70] block text-[10px] uppercase">DURATION</span>
                  <span className="text-[#EDE6DD] font-bold">{flagshipTrack.duration}</span>
                </div>
                <div>
                  <span className="text-[#8A7D70] block text-[10px] uppercase">PLATFORM</span>
                  <span className="text-[#C88639] font-bold">SOUNDCLOUD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onPlayTrack(flagshipTrack)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#C88639] hover:bg-[#E2A958] text-[#0A0705] font-mono text-xs font-bold tracking-widest uppercase transition-all rounded-xs shadow-md cursor-pointer"
                >
                  {currentTrack?.id === flagshipTrack.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>PAUSE PREVIEW</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>LISTEN PREVIEW</span>
                    </>
                  )}
                </button>

                {flagshipTrack.links.soundcloud && (
                  <a
                    href={flagshipTrack.links.soundcloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-3 bg-[#1A130E] hover:bg-[#251B14] border border-[#33251B] text-[#EDE6DD] font-mono text-xs tracking-wider transition-colors rounded-xs"
                  >
                    SOUNDCLOUD <ExternalLink className="w-3.5 h-3.5 text-[#C88639]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Track Count Telemetry Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 px-1 gap-2 text-xs font-mono text-[#8A7D70]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C88639] animate-pulse" />
            <span>
              SHOWING <strong className="text-[#EDE6DD]">{paginatedTracks.length}</strong> OF{" "}
              <strong className="text-[#EDE6DD]">{filteredAndSortedTracks.length}</strong> TRACKS (PAGE {currentPage}/{totalPages})
            </span>
            {activeFilter !== "ALL" && (
              <span className="text-[10px] text-[#C88639] bg-[#1E1611] px-2 py-0.5 rounded-xs border border-[#2B2019]">
                FILTER: {activeFilter}
              </span>
            )}
          </div>
          <div className="text-[10px] text-[#6E6256] uppercase tracking-wider font-mono">
            SOUNDCLOUD DIRECT API SYNC • 5 TRACKS / PAGE
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-3">
          {paginatedTracks.length === 0 ? (
            <div className="py-16 text-center bg-[#120D09] border border-[#241A13] rounded-xs font-mono text-sm text-[#8A7D70]">
              <Disc className="w-8 h-8 text-[#C88639]/50 mx-auto mb-3 animate-spin" />
              NO RELEASES FOUND IN THIS CATEGORY.
            </div>
          ) : (
            paginatedTracks.map((track, idx) => {
              const isCurrentPlaying = currentTrack?.id === track.id && isPlaying;
              const trackNumber = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;

              return (
                <div
                  key={track.id}
                  className={`group flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-xs border transition-all duration-200 ${isCurrentPlaying
                    ? "bg-[#1C140E] border-[#C88639]"
                    : "bg-[#120D09]/90 border-[#241A13] hover:border-[#3D2C20] hover:bg-[#18110C]"
                    }`}
                >
                  {/* Left: Track Number & Artwork & Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-xs font-mono text-[#8A7D70] w-6 shrink-0">
                      {String(trackNumber).padStart(2, "0")}
                    </span>

                    <div className="relative w-14 h-14 rounded-xs overflow-hidden border border-[#2B2019] shrink-0 bg-[#0A0705]">
                      <Image
                        src={track.coverImage}
                        alt={track.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <button
                        onClick={() => onPlayTrack(track)}
                        className="absolute inset-0 bg-[#0A0705]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Play track"
                      >
                        <Play className="w-5 h-5 text-[#E2A958] fill-current" />
                      </button>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#C88639] uppercase">
                          {track.releaseType}
                        </span>
                        <span className="text-[10px] font-mono text-[#8A7D70]">• {track.year}</span>
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-[#F3EDE4] group-hover:text-[#E2A958] transition-colors truncate tracking-tight uppercase font-display">
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#8A7D70] font-mono truncate">
                        {track.genre} • {track.artist}
                      </p>
                    </div>
                  </div>

                  {/* Right: Telemetry & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#1F1610]">
                    <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#8A7D70]">
                      {track.likes !== undefined && (
                        <>
                          <span className="flex items-center gap-1.5 text-[#E2A958]" title={`${track.likes} SoundCloud Likes`}>
                            <Heart className="w-3.5 h-3.5 fill-[#C88639]/20 text-[#C88639]" />
                            <span>{track.likes}</span>
                          </span>
                          <span>•</span>
                        </>
                      )}
                      <span>{track.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayTrack(track)}
                        className={`px-3 py-1.5 rounded-xs text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${isCurrentPlaying
                          ? "bg-[#C88639] text-[#0A0705] font-bold"
                          : "bg-[#1E1611] text-[#EDE6DD] hover:bg-[#2C2018] border border-[#33251B]"
                          }`}
                      >
                        {isCurrentPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>PAUSE</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>PLAY</span>
                          </>
                        )}
                      </button>

                      {track.links.soundcloud && (
                        <a
                          href={track.links.soundcloud}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#140E0A] hover:bg-[#1E1611] border border-[#2B2019] text-[#8A7D70] hover:text-[#EDE6DD] rounded-xs transition-colors"
                          title="SoundCloud"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#241A13] mt-8">
            <div className="text-xs font-mono text-[#8A7D70]">
              PAGE <strong className="text-[#C88639]">{String(currentPage).padStart(2, "0")}</strong> / {String(totalPages).padStart(2, "0")} • TRACKS {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedTracks.length)} OF {filteredAndSortedTracks.length}
            </div>

            <div className="flex items-center gap-2">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono tracking-wider rounded-xs border transition-all ${currentPage === 1
                    ? "bg-[#100B08] text-[#554A3E] border-[#1C140E] cursor-not-allowed"
                    : "bg-[#140E0A] text-[#EDE6DD] border-[#2B2019] hover:border-[#C88639] hover:bg-[#1A130E] hover:text-[#E2A958] cursor-pointer"
                  }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>PREV</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-mono rounded-xs border transition-all cursor-pointer ${currentPage === page
                        ? "bg-[#C88639] text-[#0A0705] font-bold border-[#C88639] shadow-[0_0_12px_rgba(200,134,57,0.3)]"
                        : "bg-[#140E0A] text-[#8A7D70] border-[#2B2019] hover:border-[#3D2C20] hover:text-[#EDE6DD] hover:bg-[#1A130E]"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono tracking-wider rounded-xs border transition-all ${currentPage === totalPages
                    ? "bg-[#100B08] text-[#554A3E] border-[#1C140E] cursor-not-allowed"
                    : "bg-[#140E0A] text-[#EDE6DD] border-[#2B2019] hover:border-[#C88639] hover:bg-[#1A130E] hover:text-[#E2A958] cursor-pointer"
                  }`}
                aria-label="Next page"
              >
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
