"use client";

import { ExternalLink, FolderGit2, Cpu, Terminal, Compass, Layers, Newspaper } from "lucide-react";

interface WorkItem {
  exhibit: string;
  category: string;
  title: string;
  url: string;
  displayUrl: string;
  description: string;
  tags: string[];
  timeline: string;
  role: string;
  isFlagship?: boolean;
  previewType: string;
}

const works: WorkItem[] = [
  {
    exhibit: "EXHIBIT A",
    category: "PROJECT 01 · FLAGSHIP",
    title: "CVerify",
    url: "https://cverify.io.vn",
    displayUrl: "cverify.io.vn",
    description:
      "An AI-native diagnostic and verification platform engineered to automate source code analysis, schema validation, and real-time report generation with automated feedback loops.",
    tags: ["Next.js", "Python", "ASP.NET Core", "PostgreSQL", "FastAPI"],
    timeline: "May 2026 — Present",
    role: "Lead Architect & Engineer",
    isFlagship: true,
    previewType: "cverify",
  },
  {
    exhibit: "EXHIBIT B",
    category: "MINECRAFT CORE · HIGH-CONCURRENCY GUI",
    title: "KWardrobe",
    url: "https://github.com/Kaivian/KWardrobe",
    displayUrl: "github.com/Kaivian/KWardrobe",
    description:
      "High-concurrency Minecraft server plugin providing players with a graphical user interface (GUI) to store, organize, and seamlessly switch armor sets in real-time.",
    tags: ["Java", "Spigot API", "NMS", "Bukkit"],
    timeline: "Jul 2025",
    role: "Core Developer",
    previewType: "kwardrobe",
  },
  {
    exhibit: "EXHIBIT C",
    category: "DEVELOPER UTILITIES · CORE FRAMEWORK",
    title: "KLibrary",
    url: "https://github.com/Kaivian/KLibrary",
    displayUrl: "github.com/Kaivian/KLibrary",
    description:
      "A lightweight, thread-safe core utility library designed to simplify event registration, custom config parsing, and concurrency handling across Minecraft server plugins.",
    tags: ["Java", "Gradle", "Spigot", "Concurrency"],
    timeline: "May 2026",
    role: "Author",
    previewType: "klibrary",
  },
  {
    exhibit: "EXHIBIT D",
    category: "SPATIAL DISCOVERY · WEB APP",
    title: "ExploreWorld",
    url: "https://github.com/Kaivian/ExploreWorld",
    displayUrl: "github.com/Kaivian/ExploreWorld",
    description:
      "Interactive web application centered on geographic discovery and spatial data visualization, connecting geographic coordinates with rich contextual metadata.",
    tags: ["JavaScript", "React", "Node.js", "Express"],
    timeline: "Jul 2025",
    role: "Fullstack Developer",
    previewType: "exploreworld",
  },
  {
    exhibit: "EXHIBIT E",
    category: "FULLSTACK ARCHITECTURE · ACADEMY",
    title: "MERN-Tutorial",
    url: "https://github.com/Kaivian/MERN-Tutorial",
    displayUrl: "github.com/Kaivian/MERN-Tutorial",
    description:
      "End-to-end full stack web architecture demonstrating JWT authentication, state management, RESTful APIs, and MongoDB database integration.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    timeline: "Oct 2025",
    role: "Creator",
    previewType: "mern",
  },
  {
    exhibit: "EXHIBIT F",
    category: "SYSTEM BOILERPLATE · STARTER FRAMEWORK",
    title: "Kaivian-Template",
    url: "https://github.com/Kaivian/Kaivian-Template",
    displayUrl: "github.com/Kaivian/Kaivian-Template",
    description:
      "Production-ready full stack web starter template crafted for high-performance application development, complete with pre-configured tooling and UI tokens.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Fullstack"],
    timeline: "Sep 2025",
    role: "Author",
    previewType: "template",
  },
  {
    exhibit: "EXHIBIT G",
    category: "DIGITAL ARCHIVE · EDITORIAL PORTFOLIO",
    title: "kaivian.github.io",
    url: "https://github.com/Kaivian/kaivian.github.io",
    displayUrl: "github.com/Kaivian/kaivian.github.io",
    description:
      "Vintage editorial newspaper portfolio inspired by investigative journalism, featuring server components, smooth animations, and custom aesthetic layout systems.",
    tags: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript"],
    timeline: "Jul 2025 — Present",
    role: "Designer & Engineer",
    previewType: "portfolio",
  },
];

function RenderPreview({ type, exhibit, displayUrl }: { type: string; exhibit: string; displayUrl: string }) {
  return (
    <div className="relative pt-3">
      {/* Masking tape effect on top center */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E6E0D3]/90 border border-[#D3CCBE] -rotate-2 mt-2 shadow-[0_1px_3px_rgba(0,0,0,0.1)] z-20 pointer-events-none" />

      {/* Polaroid Card Frame Box */}
      <div className="border border-[#D8D2C6] bg-[#fbfaf5] group-hover:bg-[#efeadd] p-3 md:p-3.5 rounded-xs shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col justify-between group-hover:border-[#B93829] transition-colors duration-300">
        {/* Single Content Preview Container (Static Frame with Overflow Hidden) */}
        <div className="relative overflow-hidden border border-[#D5D0C5] bg-[#121316] rounded-[1px] min-h-35 flex flex-col justify-center mb-2.5">
          {type === "cverify" && (
            <img
              src="/projects/CVerify.png"
              alt="CVerify Evidence"
              className="w-full h-auto object-cover block grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-102 origin-center"
            />
          )}

          {type === "kwardrobe" && (
            <div className="p-3.5 flex items-center justify-around py-1 grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105 origin-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 border border-[#30363D] bg-[#161B22] rounded flex items-center justify-center text-[#58A6FF]">
                  🪖
                </div>
                <span className="text-[9px] text-[#8B949E]">HELMET</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 border border-[#3B82F6] bg-[#1F2937] rounded flex items-center justify-center text-[#60A5FA] shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                  🛡️
                </div>
                <span className="text-[9px] text-[#60A5FA] font-bold">CHESTPLATE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 border border-[#30363D] bg-[#161B22] rounded flex items-center justify-center text-[#58A6FF]">
                  👖
                </div>
                <span className="text-[9px] text-[#8B949E]">LEGGINGS</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 border border-[#30363D] bg-[#161B22] rounded flex items-center justify-center text-[#58A6FF]">
                  👢
                </div>
                <span className="text-[9px] text-[#8B949E]">BOOTS</span>
              </div>
            </div>
          )}

          {type === "klibrary" && (
            <div className="p-3.5 space-y-1 text-[10px] text-[#C9D1D9] grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105 origin-center">
              <div>
                <span className="text-[#FF7B72]">public class</span>{" "}
                <span className="text-[#FFA657]">KLibrary</span>{" "}
                <span className="text-[#FF7B72]">extends</span>{" "}
                <span className="text-[#79C0FF]">JavaPlugin</span> &#123;
              </div>
              <div className="pl-4 text-[#8B949E]">
                <span className="text-[#D29922]">@Override</span>
              </div>
              <div className="pl-4">
                <span className="text-[#FF7B72]">public void</span>{" "}
                <span className="text-[#D2A8FF]">onEnable</span>() &#123;
              </div>
              <div className="pl-8 text-[#7EE787]">
                EventManager.register(<span className="text-[#79C0FF]">this</span>);
              </div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </div>
          )}

          {type === "exploreworld" && (
            <div className="p-3.5 relative flex flex-col items-center justify-center py-2 text-center grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105 origin-center">
              <Compass className="w-8 h-8 text-[#58A6FF] mb-1 animate-spin-[spin_12s_linear_infinite]" />
              <div className="text-[11px] font-bold text-[#F0F6FC]">
                SPATIAL DATA COORDINATOR
              </div>
              <div className="text-[9px] text-[#8B949E]">
                LAT: 16.0544° N // LON: 108.2022° E
              </div>
            </div>
          )}

          {type === "mern" && (
            <div className="p-3.5 space-y-1 text-[10px] grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105 origin-center">
              <div className="flex items-center justify-between text-[#3FB950] font-bold border-b border-[#21262D] pb-1">
                <span>POST /api/v1/auth/login</span>
                <span className="bg-[#238636]/30 px-1.5 py-0.5 rounded text-[9px]">200 OK</span>
              </div>
              <div className="text-[#8B949E] pt-1">
                &#123; <span className="text-[#79C0FF]">&quot;status&quot;</span>: <span className="text-[#A5D6FF]">&quot;success&quot;</span>, <span className="text-[#79C0FF]">&quot;token&quot;</span>: <span className="text-[#A5D6FF]">&quot;eyJhbGci...&quot;</span> &#125;
              </div>
            </div>
          )}

          {type === "template" && (
            <div className="p-3.5 space-y-1 text-[10px] text-[#8B949E] grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105 origin-center">
              <div className="flex items-center gap-1 text-[#F0F6FC] font-bold">
                <Layers className="w-3.5 h-3.5 text-[#A5D6FF]" />
                <span>FULLSTACK TEMPLATE TREE</span>
              </div>
              <div className="pl-2">├── src/app/ (App Router)</div>
              <div className="pl-2">├── src/components/ (Design Tokens)</div>
              <div className="pl-2">└── package.json (Configured)</div>
            </div>
          )}

          {type === "portfolio" && (
            <div className="p-3.5 flex flex-col items-center justify-center py-2 text-center border border-[#30363D] bg-[#161B22] p-2 grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105 origin-center">
              <Newspaper className="w-7 h-7 text-[#D29922] mb-1" />
              <div className="text-[11px] font-bold text-[#F0F6FC] font-serif uppercase tracking-wider">
                THE INVESTIGATION EDITION
              </div>
              <div className="text-[9px] text-[#8B949E]">
                KAIVIAN.GITHUB.IO · NEXT.JS 15
              </div>
            </div>
          )}

          {/* CONFIRMED Stamp Overlay (Appears on hover) */}
          <div className="absolute top-3 right-3 z-10 border-2 border-[#B93829] text-[#B93829] bg-[#efeadd]/90 px-2 py-0.5 text-[11px] md:text-[12px] font-extrabold tracking-[2px] font-mono uppercase rotate-[5deg] shadow-sm pointer-events-none select-none opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
            CONFIRMED
          </div>
        </div>

        {/* Polaroid Bottom Label Strip */}
        <div className="pt-2.5 pb-0.5 flex items-center justify-between">
          <div className="relative inline-flex items-center justify-center px-2 py-0.5 shrink-0 whitespace-nowrap">
            <svg className="absolute inset-0 w-full h-full text-[#B93829]" viewBox="0 0 76 26" fill="none">
              <ellipse cx="38" cy="13" rx="36" ry="11" stroke="currentColor" strokeWidth="1.5" strokeDasharray="40 2" transform="rotate(-1 38 13)" />
            </svg>
            <span className="text-[#B93829] font-extrabold text-[10px] font-mono tracking-wider relative z-10 px-1 whitespace-nowrap">
              {exhibit}
            </span>
          </div>
          <div className="text-[10px] font-mono text-[#6E6A63] truncate">
            recovered from {displayUrl}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWorksSection() {
  const flagship = works.find((w) => w.isFlagship) || works[0];
  const gridWorks = works.filter((w) => !w.isFlagship);

  return (
    <section id="work" className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin py-12 border-b-4 border-[#1A1A1A]">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Meta Bar */}
        <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#45413A] font-bold tracking-[1.8px] pb-3 uppercase whitespace-nowrap">
          <div>THE EVIDENCE</div>
          <div>EXHIBITS A &ndash; G &middot; ENTERED 2023 &ndash; NOW</div>
        </div>

        {/* Top Hairline Divider */}
        <div className="w-full border-b border-[#b9b7b0] mb-4" />

        {/* Main Section Header */}
        <h2 className="font-(family-name:--font-libre-caslon-display) text-[42px] md:text-[68px] font-normal text-[#16140F] leading-none tracking-[-0.02em] mb-4">
          Selected Works
        </h2>

        {/* Solid Heavy Divider */}
        <div className="w-full border-b-[2.5px] border-[#1A1A1A] mb-12" />

        {/* Flagship Exhibit A (Featured 2-Column Row) */}
        <div
          className="mb-16 pb-12 border-b border-[#1A1A1A]/30 group cursor-pointer"
          onClick={() => window.open(flagship.url, "_blank")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Graphic Polaroid Frame */}
            <div className="lg:col-span-6">
              <RenderPreview type={flagship.previewType} exhibit={flagship.exhibit} displayUrl={flagship.displayUrl} />
            </div>

            {/* Right: Flagship Project Details */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                {/* Exhibit Red Stamp Label */}
                <div className="text-[#B93829] font-bold text-[11px] md:text-[12px] uppercase tracking-[2px] mb-1.5 whitespace-nowrap">
                  {flagship.exhibit}
                </div>

                {/* Subtitle / Category & Website Link */}
                <div className="text-[#16140F] font-extrabold text-[12px] md:text-[13px] uppercase tracking-[1.5px] mb-3 flex items-center justify-between">
                  <span>{flagship.category}</span>
                  <a
                    href={flagship.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-[#B93829] transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {flagship.displayUrl}
                  </a>
                </div>

                {/* Project Title */}
                <h3 className="font-(family-name:--font-libre-caslon-display) text-[36px] md:text-[48px] text-[#16140F] leading-tight tracking-[-0.02em] mb-4 cursor-pointer">
                  <a href={flagship.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    {flagship.title}
                  </a>
                </h3>

                {/* Description Paragraph */}
                <p className="font-libre-franklin text-[14px] md:text-[15px] text-[#33302B] leading-relaxed mb-6">
                  {flagship.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {flagship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#1A1A1A] text-[#1A1A1A] font-mono text-[10px] md:text-[11px] px-2.5 py-1 uppercase tracking-wider bg-[#EBE7DF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta Row & Link */}
              <div className="border-t border-[#1A1A1A]/40 pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#45413A]">
                  {flagship.timeline} &middot; <span className="text-[#1A1A1A] font-bold">{flagship.role}</span>
                </div>

                <a
                  href={flagship.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B93829] hover:text-[#1A1A1A] font-bold text-[11px] md:text-[12px] uppercase tracking-[1.2px] inline-flex items-center gap-1.5 transition-colors border-b border-[#B93829] hover:border-[#1A1A1A] pb-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>OPEN CASE FILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Grid for Exhibits B through G (3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {gridWorks.map((work) => (
            <div
              key={work.exhibit}
              className="flex flex-col justify-between border-b md:border-b-0 border-[#1A1A1A]/30 pb-8 md:pb-0 group cursor-pointer"
              onClick={() => window.open(work.url, "_blank")}
            >
              <div>
                {/* Exhibit Red Stamp Label */}
                <div className="text-[#B93829] font-bold text-[11px] uppercase tracking-[1.8px] mb-1 whitespace-nowrap">
                  {work.exhibit}
                </div>

                {/* Subtitle / Category & Website Link */}
                <div className="text-[#45413A] font-extrabold text-[11px] uppercase tracking-[1.2px] mb-2 flex items-center justify-between">
                  <span className="truncate pr-2">{work.category}</span>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-[#B93829] transition-all shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {work.displayUrl}
                  </a>
                </div>

                {/* Project Title */}
                <h3 className="font-(family-name:--font-libre-caslon-display) text-[26px] md:text-[30px] text-[#16140F] leading-tight mb-3 cursor-pointer">
                  <a href={work.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    {work.title}
                  </a>
                </h3>

                {/* Preview Graphic Box */}
                <div className="mb-4">
                  <RenderPreview type={work.previewType} exhibit={work.exhibit} displayUrl={work.displayUrl} />
                </div>

                {/* Description Paragraph */}
                <p className="font-libre-franklin text-[13px] text-[#33302B] leading-relaxed mb-4 line-clamp-3">
                  {work.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#1A1A1A]/80 text-[#1A1A1A] font-mono text-[9px] md:text-[10px] px-2 py-0.5 uppercase tracking-wider bg-[#EBE7DF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Link Row */}
              <div className="border-t border-[#1A1A1A]/30 pt-3 flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="font-semibold uppercase tracking-[0.5px] text-[#45413A]">
                  {work.timeline}
                </span>

                <a
                  href={work.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B93829] hover:text-[#1A1A1A] font-bold uppercase tracking-[1px] inline-flex items-center gap-1 transition-colors border-b border-[#B93829] hover:border-[#1A1A1A] pb-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>OPEN CASE FILE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
