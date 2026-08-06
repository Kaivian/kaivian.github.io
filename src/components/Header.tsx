"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, MapPin } from "lucide-react";
import StrokeText from "./StrokeText";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const day = now.getDate();
    const month = now.toLocaleDateString("en-US", { month: "long" });
    const year = now.getFullYear();
    setCurrentDate(`${dayName} ${day} ${month} ${year}`.toUpperCase());
  }, []);

  useEffect(() => {
    const sectionIds = ["work", "stack", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollFallback = () => {
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, []);

  return (
    <>
      {/* Top Header Section (scrolls away) */}
      <header className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin">
        <div className="max-w-275 mx-auto px-4 md:px-0">
          {/* Top Meta Bar */}
          <div className="flex justify-between md:grid md:grid-cols-3 items-center text-[8px] md:text-[11px] text-[#45413A] font-semibold tracking-[1.54px] py-3">
            <div>ĐÀ NẴNG, VIỆT NAM</div>
            <div className="hidden md:block md:text-center">THE INVESTIGATION EDITION</div>
            <div className="text-right md:text-right">EST. 2023</div>
          </div>

          {/* Divider Line 1 */}
          <div className="w-full border-[#1A1A1A] border-b-[2.5px]" />

          {/* Masthead Title */}
          <div className="text-center pt-1.5 flex flex-col items-center justify-center">
            <h1 className="w-full flex justify-center">
              <StrokeText
                text="Kaivian Doan"
                strokeColor="#16140F"
                fillColor="#16140F"
                strokeWidth={1.8}
                drawDuration={1.6}
                fillDelay={0.2}
                stagger={0.05}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={104}
                fontWeight={400}
                letterSpacing={-1}
                fontFamily="var(--font-libre-caslon-display), serif"
                className="max-w-175 mx-auto"
              />
            </h1>
            <p className="md:mt-2.5 md:pb-1.5 text-[8px] md:text-[14px] leading-5 font-semibold uppercase tracking-[2.5px] md:tracking-[6px] text-[#45413a]">
              THE PERSONAL RECORDS OF A FULLSTACK DEVELOPER
            </p>
          </div>

          {/* Divider Line 2 */}
          <div className="w-full border-[#1A1A1A] border-b-[2.5px]" />

          {/* Info Row */}
          <div className="py-2.5 text-center text-[8px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#45413a] flex flex-wrap justify-center items-center gap-x-4.5">
            <span>{currentDate || "WEDNESDAY 5 AUGUST 2026"}</span>
            <span className="text-[11px]">•</span>
            <span>VOL. III</span>
            <span className="text-[11px]">•</span>
            <span>SELECTED WORKS &amp; NOTES</span>
            <span className="text-[11px]">•</span>
            <span>PRICE: ONE COFFEE</span>
          </div>
          <div className="w-full border-[#1A1A1A] border-b-[2.5px]" />
        </div>
      </header>

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#F4F1EA] backdrop-blur-md text-[#1A1A1A] font-libre-franklin transition-all border-[#1A1A1A] border-b-[2.5px]">
        <div className="max-w-275 mx-auto px-4 md:px-0 py-2.5">
          {/* Main Nav Header Row */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMenuOpen(false);
              }}
              className="font-(family-name:--font-libre-caslon-display) text-[22px] md:text-[22px] font-normal text-[#16140F] tracking-[-0.22px] hover:opacity-75 transition-opacity"
            >
              Kaivian Doan
            </Link>

            {/* Desktop Nav Items & Hire Me Button */}
            <div className="hidden md:flex items-center gap-7">
              <div className="flex items-center gap-8 text-[12px] font-semibold uppercase tracking-[1.44px]">
                <a
                  href="#work"
                  className={`py-1 border-b-[2.5px] transition-all ${activeSection === "work"
                    ? "border-[#1A1A1A] text-[#16140F] opacity-100 font-bold"
                    : "border-transparent text-[#45413A] opacity-75 hover:opacity-100 hover:border-[#1A1A1A]"
                    }`}
                >
                  WORK
                </a>
                <a
                  href="#stack"
                  className={`py-1 border-b-[2.5px] transition-all ${activeSection === "stack"
                    ? "border-[#1A1A1A] text-[#16140F] opacity-100 font-bold"
                    : "border-transparent text-[#45413A] opacity-75 hover:opacity-100 hover:border-[#1A1A1A]"
                    }`}
                >
                  STACK
                </a>
                <a
                  href="#contact"
                  className={`py-1 border-b-[2.5px] transition-all ${activeSection === "contact"
                    ? "border-[#1A1A1A] text-[#16140F] opacity-100 font-bold"
                    : "border-transparent text-[#45413A] opacity-75 hover:opacity-100 hover:border-[#1A1A1A]"
                    }`}
                >
                  CONTACT
                </a>
              </div>

              <a
                href="#contact"
                className="bg-[#1A1A1A] hover:bg-[#F4F1EA] text-[#F4F1EA] hover:text-[#1A1A1A] border-[2.5px] border-[#1A1A1A] transition-colors px-3.5 py-2 text-[12px] font-bold uppercase tracking-[1.15px]"
              >
                HIRE HIM
              </a>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 border-2 border-[#1A1A1A] relative flex items-center justify-center cursor-pointer focus:outline-none overflow-hidden"
              aria-label="Toggle Menu"
            >
              {/* Lucide Menu Icon (visible when closed) */}
              <div
                className={`absolute transition-all duration-300 ease-in-out transform flex items-center justify-center ${isMenuOpen ? "rotate-90 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
                  }`}
              >
                <Menu className="w-5 h-5 text-[#1A1A1A]" />
              </div>

              {/* Lucide Close X Icon (visible when open) */}
              <div
                className={`absolute transition-all duration-300 ease-in-out transform flex items-center justify-center ${isMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-75"
                  }`}
              >
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </div>
            </button>
          </div>

          {/* Mobile Inline Expanding Menu with smooth transition */}
          <div
            className={`grid transition-[grid-template-rows,opacity,padding] duration-300 ease-in-out md:hidden ${isMenuOpen
              ? "grid-rows-[1fr] opacity-100 pt-4 pb-2"
              : "grid-rows-[0fr] opacity-0 pt-0 pb-0 pointer-events-none"
              }`}
          >
            <div className="overflow-hidden flex flex-col">
              <div className="w-full border-t border-[#1A1A1A]/20 mb-1" />

              <a
                href="#work"
                onClick={() => setIsMenuOpen(false)}
                className={`py-4 border-b border-[#1A1A1A]/20 flex justify-between items-center group ${activeSection === "work" ? "underline underline-offset-4 decoration-2" : ""
                  }`}
              >
                <span className="font-(family-name:--font-libre-caslon-display) text-3xl text-[#16140F]">
                  Work
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#1A1A1A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#stack"
                onClick={() => setIsMenuOpen(false)}
                className={`py-4 border-b border-[#1A1A1A]/20 flex justify-between items-center group ${activeSection === "stack" ? "underline underline-offset-4 decoration-2" : ""
                  }`}
              >
                <span className="font-(family-name:--font-libre-caslon-display) text-3xl text-[#16140F]">
                  Stack
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#1A1A1A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className={`py-4 border-b border-[#1A1A1A]/20 flex justify-between items-center group ${activeSection === "contact" ? "underline underline-offset-4 decoration-2" : ""
                  }`}
              >
                <span className="font-(family-name:--font-libre-caslon-display) text-3xl text-[#16140F]">
                  Contact
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#1A1A1A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* HIRE HIM Button */}
              <div className="pt-6 pb-4">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#F4F1EA] px-5 py-3 text-[12px] font-bold uppercase tracking-[1.15px] hover:bg-[#333333] transition-colors"
                >
                  <span>HIRE HIM</span>
                  <span>&rarr;</span>
                </a>
              </div>

              {/* Footer Info Row */}
              <div className="pb-2 flex flex-wrap items-center gap-6 text-[10px] font-semibold uppercase tracking-[1px] text-[#45413A]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>ĐÀ NẴNG, VN</span>
                </div>

                <a
                  href="https://github.com/kaivian"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-75"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#1A1A1A]" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GITHUB.COM/KAIVIAN</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
