"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function PowDNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "01 // ABOUT", href: "#about" },
    { label: "02 // MUSIC", href: "#music" },
    { label: "03 // MIXSETS", href: "#mixsets" },
    { label: "04 // SOUND", href: "#sound" },
    { label: "05 // GALLERY", href: "#gallery" },
    { label: "06 // CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0705]/95 backdrop-blur-md border-b border-[#241A13]/80 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Brand Wordmark & ESTD */}
          <div className="flex items-center gap-4">
            <Link
              href="#top"
              className="group flex items-center gap-2.5 text-[#F3EDE4] hover:text-[#C88639] transition-colors"
            >
              <span className="text-2xl md:text-3xl font-black tracking-tighter font-display uppercase">
                POWD
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#8A7D70] border border-[#2B2019] px-1.5 py-0.5 rounded tracking-widest">
                ESTD. 2024
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono text-[#C4B8A8] hover:text-[#E2A958] tracking-widest uppercase transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C88639] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Booking CTA */}
          <div className="flex items-center gap-3">
            {/* Quick Contact CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C88639] hover:bg-[#E2A958] text-[#0A0705] text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 rounded-sm shadow hover:scale-[1.02]"
            >
              BOOKING
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#EDE6DD] hover:text-[#C88639] border border-[#2B2019] bg-[#120D09] rounded-sm transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0705]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden">
          <div className="flex items-center justify-between border-b border-[#241A13] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#F3EDE4] tracking-tighter">POWD</span>
              <span className="text-[10px] font-mono text-[#C88639] border border-[#3A2B20] px-1.5 py-0.5">
                ESTD 2024
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#EDE6DD] hover:text-[#C88639] border border-[#2B2019] rounded-sm"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-black tracking-tight text-[#EDE6DD] hover:text-[#C88639] transition-colors flex items-center justify-between border-b border-[#1A130E] pb-3"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 text-[#8A7D70]" />
              </a>
            ))}
          </div>

          <div className="border-t border-[#241A13] pt-6 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-[#C88639] text-[#0A0705] font-mono text-sm font-bold tracking-widest uppercase rounded-sm"
            >
              BOOKING INQUIRY
            </a>
            <div className="text-center text-[10px] font-mono text-[#8A7D70]">
              BASS TECH HOUSE • VIETNAM • GLOBAL
            </div>
          </div>
        </div>
      )}
    </>
  );
}
