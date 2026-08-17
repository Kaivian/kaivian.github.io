"use client";

import { Mail, FileText } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#16140F] text-[#F4F1EA] font-libre-caslon-text pt-14 pb-8 border-t border-[#33302B]">
      <ScrollReveal direction="up" duration={0.8} className="max-w-275 mx-auto px-4 md:px-0">
        {/* Large Name Header */}
        <div className="text-center pb-8">
          <h2 className="font-(family-name:--font-libre-caslon-display) text-[52px] sm:text-[76px] md:text-[88px] font-normal tracking-tight leading-none text-[#F4F1EA]">
            Kaivian Doan
          </h2>
        </div>

        {/* Top Hairline Divider */}
        <div className="w-full border-b border-[#33302B] mb-10" />

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12 items-start">
          {/* Column 1: Bio */}
          <div className="md:col-span-5">
            <p className="text-[15px] sm:text-[16px] text-[#B8B3A8] leading-relaxed">
              A software engineer in Đà Nẵng, Việt Nam. Building scalable backend systems at Hypixel Network, and founding CVerify — an AI-native talent intelligence platform. This broadsheet is hand-set in Caslon and Franklin.
            </p>
          </div>

          {/* Column 2: Sections */}
          <div className="md:col-span-2">
            <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.5px] text-[#8E887D] uppercase mb-4">
              SECTIONS
            </div>
            <ul className="space-y-2 text-[15px] sm:text-[16px]">
              <li>
                <a href="#work" className="text-[#F4F1EA] hover:text-[#B93829] transition-colors">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#lab" className="text-[#F4F1EA] hover:text-[#B93829] transition-colors">
                  The Stack
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#F4F1EA] hover:text-[#B93829] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Desk */}
          <div className="md:col-span-3">
            <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.5px] text-[#8E887D] uppercase mb-4">
              THE DESK
            </div>
            <div className="space-y-1 text-[15px] sm:text-[16px] text-[#F4F1EA]">
              <div>Đà Nẵng, Việt Nam</div>
              <div className="text-[#B8B3A8]">GMT+7 · Fulltime-first</div>
              <div>
                <a href="mailto:theluc.1746@gmail.com" className="text-[#F4F1EA] hover:text-[#B93829] transition-colors">
                  theluc.1746@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Wire Services */}
          <div className="md:col-span-2">
            <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.5px] text-[#8E887D] uppercase mb-4">
              WIRE SERVICES
            </div>
            <ul className="space-y-2 text-[15px] sm:text-[16px]">
              <li>
                <a
                  href="https://drive.google.com/file/d/1AFQvKxF2payGiwMqwEZyBkxMyKS5Z3MS/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4F1EA] hover:text-[#B93829] transition-colors"
                >
                  Curriculum Vitae
                </a>
              </li>
              <li>
                <a
                  href="https://cverify.io.vn/kaivian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4F1EA] hover:text-[#B93829] transition-colors"
                >
                  CVerify
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kaivian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4F1EA] hover:text-[#B93829] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/kaivian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4F1EA] hover:text-[#B93829] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rubber Stamp Graphic: CASE CLOSED */}
        <div className="flex justify-center py-6">
          <div className="inline-block border-[2.5px] border-[#B93829] text-[#B93829] px-6 py-2 rounded-xs font-mono font-black text-[18px] sm:text-[22px] uppercase tracking-[3px] -rotate-3 shadow-xs opacity-90 hover:opacity-100 transition-opacity">
            CASE CLOSED
          </div>
        </div>

        {/* Bottom Hairline Divider */}
        <div className="w-full border-b border-[#33302B] my-8" />

        {/* Bottom Meta Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono font-bold tracking-[1.2px] text-[#767269] uppercase">
          <div>
            © 2026 THE KAIVIAN DOAN TIMES · ALL RIGHTS RESERVED · PRINTED IN ĐÀ NẴNG
          </div>

          {/* Social Icon Square Buttons */}
          <div className="flex items-center gap-2.5">
            {/* CV */}
            <div className="relative group/tooltip inline-block">
              <a
                href="https://drive.google.com/file/d/1AFQvKxF2payGiwMqwEZyBkxMyKS5Z3MS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Curriculum Vitae"
                className="w-8 h-8 border border-[#33302B] flex items-center justify-center text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                <div className="bg-[#F4F1EA] text-[#16140F] border border-[#16140F] px-2 py-0.5 text-[9px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                  Curriculum Vitae
                </div>
                <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#F4F1EA] mx-auto -mt-px" />
              </div>
            </div>

            {/* CVerify */}
            <div className="relative group/tooltip inline-block">
              <a
                href="https://cverify.io.vn/kaivian"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CVerify"
                className="w-8 h-8 border border-[#33302B] flex items-center justify-center text-[#F4F1EA] hover:bg-[#F4F1EA] group transition-colors cursor-pointer"
              >
                <img
                  src="/generals/CVerify Black Logo.png"
                  alt="CVerify"
                  className="w-4 h-4 object-contain invert group-hover:invert-0 transition-all"
                />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                <div className="bg-[#F4F1EA] text-[#16140F] border border-[#16140F] px-2 py-0.5 text-[9px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                  CVerify Profile
                </div>
                <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#F4F1EA] mx-auto -mt-px" />
              </div>
            </div>

            {/* GitHub */}
            <div className="relative group/tooltip inline-block">
              <a
                href="https://github.com/Kaivian"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 border border-[#33302B] flex items-center justify-center text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                <div className="bg-[#F4F1EA] text-[#16140F] border border-[#16140F] px-2 py-0.5 text-[9px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                  GitHub Profile
                </div>
                <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#F4F1EA] mx-auto -mt-px" />
              </div>
            </div>

            {/* LinkedIn */}
            <div className="relative group/tooltip inline-block">
              <a
                href="https://linkedin.com/in/kaivian"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-[#33302B] flex items-center justify-center text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                <div className="bg-[#F4F1EA] text-[#16140F] border border-[#16140F] px-2 py-0.5 text-[9px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                  LinkedIn Profile
                </div>
                <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#F4F1EA] mx-auto -mt-px" />
              </div>
            </div>

            {/* Mail */}
            <div className="relative group/tooltip inline-block">
              <a
                href="mailto:theluc.1746@gmail.com"
                aria-label="Email"
                className="w-8 h-8 border border-[#33302B] flex items-center justify-center text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:-translate-y-1 transition-all duration-200 ease-out z-20 whitespace-nowrap">
                <div className="bg-[#F4F1EA] text-[#16140F] border border-[#16140F] px-2 py-0.5 text-[9px] font-mono font-bold tracking-[1.2px] uppercase rounded-xs shadow-md">
                  Send Email
                </div>
                <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#F4F1EA] mx-auto -mt-px" />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
