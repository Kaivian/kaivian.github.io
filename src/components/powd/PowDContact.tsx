"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { Mail, Copy, Check, Download, FileText, Loader2, Send, ChevronDown } from "lucide-react";
import { bookingInfo } from "@/data/powdData";

const eventTypeOptions = [
  { value: "Club Performance", label: "Club Performance", sub: "Peak Time / Extended Club Set" },
  { value: "Festival Stage", label: "Festival Stage", sub: "Main Stage & Electronic Festival Showcase" },
  { value: "Secret Underground Set", label: "Secret Underground Set", sub: "Warehouse Session / Private Selector" },
  { value: "Remix Commission", label: "Remix Commission", sub: "Track Rework / Label Collaboration" },
  { value: "Curated Sound Design", label: "Curated Sound Design", sub: "Commercial Sync / Audio Branding" },
  { value: "Other Inquiries", label: "General Inquiry", sub: "Press, Media & Management Inquiries" },
];

export default function PowDContact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "Club Performance",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(bookingInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "c93c7055-9a48-4128-a02c-8696a26d7642";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: formData.name,
          email: formData.email,
          subject: `PowD Booking Inquiry: [${formData.eventType}] from ${formData.name}`,
          message: `Inquiry Type: ${formData.eventType}\n\nDetails:\n${formData.message}`,
          from_name: "PowD Booking Desk",
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", eventType: "Club Performance", message: "" });
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        triggerMailto();
      }
    } catch (err) {
      console.error("Web3Forms error, fallback to mailto:", err);
      triggerMailto();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailto = () => {
    const mailtoSubject = encodeURIComponent(`[${formData.eventType}] Booking Request from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Promoter / Org: ${formData.name}\nContact Email: ${formData.email}\nInquiry Type: ${formData.eventType}\n\nDetails:\n${formData.message}`
    );
    window.location.href = `mailto:${bookingInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsSubmitted(true);
    setFormData({ name: "", email: "", eventType: "Club Performance", message: "" });
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0D0907] text-[#EDE6DD] border-t border-[#1F1610] overflow-hidden">
      {/* Ambient Bronze Glow */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#C88639]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Massive Headline Callout */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-3 text-[#C88639] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-[#C88639] rounded-xs" />
            <span>BOOKINGS • COLLABORATIONS • TRANSMISSIONS</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-[#F3EDE4] uppercase font-display leading-none">
            LET&apos;S MAKE SOME NOISE.
          </h2>
        </div>

        {/* Contact & Booking Section Container */}
        <div className="relative">
          {/* Left Block: Direct Booking Terminal & Digital Ecosystem (75% Width) */}
          <div className="w-full lg:w-[80%] space-y-6 relative z-0">
            {/* DIRECT BOOKING DESK Card */}
            <div className="p-8 md:p-10 lg:p-10 lg:pr-24 xl:pr-28 bg-[#120D09] border border-[#241A13] rounded-xs space-y-6 shadow-2xl relative">
              <div>
                <span className="text-[10px] font-mono text-[#C88639] tracking-widest uppercase block mb-1">
                  DIRECT BOOKING DESK
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#F3EDE4] tracking-tight uppercase font-display">
                  SCHEDULE A PERFORMANCE
                </h3>
                <p className="text-xs md:text-sm text-[#C4B8A8] font-mono mt-2 leading-relaxed max-w-2xl">
                  Available for club bookings, festival stages, label collaborations, and private selector sessions worldwide.
                </p>
              </div>

              {/* Quick Contact & Copy Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-[#18110C] border border-[#2B2019] rounded-xs max-w-2xl xl:max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#241912] border border-[#3A2B20] text-[#C88639] rounded-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#8A7D70] tracking-widest block uppercase">
                      OFFICIAL BOOKING CHANNEL
                    </span>
                    <a
                      href={`mailto:${bookingInfo.email}`}
                      className="text-xs md:text-sm font-bold text-[#F3EDE4] hover:text-[#C88639] font-mono select-all transition-colors"
                    >
                      {bookingInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#241912] hover:bg-[#C88639] text-[#EDE6DD] hover:text-[#0A0705] border border-[#3A2B20] hover:border-[#C88639] text-xs font-mono font-bold tracking-wider uppercase transition-all rounded-xs shadow cursor-pointer active:scale-95 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>
              </div>

              {/* Functional Transmission Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl xl:max-w-3xl pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest text-[#8A7D70] uppercase mb-1.5">
                      NAME / PROMOTER / ORGANIZATION *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Club Apex / John Doe"
                      className="w-full bg-[#18110C] border border-[#2B2019] focus:border-[#C88639] focus:ring-1 focus:ring-[#C88639] px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#F3EDE4] placeholder:text-[#5A4F44] focus:outline-hidden transition-colors rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest text-[#8A7D70] uppercase mb-1.5">
                      CONTACT EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="promoter@venue.com"
                      className="w-full bg-[#18110C] border border-[#2B2019] focus:border-[#C88639] focus:ring-1 focus:ring-[#C88639] px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#F3EDE4] placeholder:text-[#5A4F44] focus:outline-hidden transition-colors rounded-xs"
                    />
                  </div>
                </div>

                {/* Custom Styled Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-mono font-bold tracking-widest text-[#8A7D70] uppercase">
                      INQUIRY / PERFORMANCE TYPE
                    </label>
                    <span className="text-[#C88639] text-[9px] font-mono lowercase">[select transmission mode]</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-[#18110C] border ${isDropdownOpen ? "border-[#C88639] ring-1 ring-[#C88639]" : "border-[#2B2019] hover:border-[#3E2F23]"
                      } px-3.5 py-2.5 text-xs sm:text-sm font-mono text-left text-[#F3EDE4] transition-all rounded-xs flex items-center justify-between cursor-pointer group`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C88639] shrink-0" />
                      <span className="font-bold tracking-wide">
                        {eventTypeOptions.find((opt) => opt.value === formData.eventType)?.label || formData.eventType}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A7D70] hidden sm:inline truncate">
                        • {eventTypeOptions.find((opt) => opt.value === formData.eventType)?.sub}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8A7D70] group-hover:text-[#C88639] transition-transform duration-200 shrink-0 ml-2 ${isDropdownOpen ? "rotate-180 text-[#C88639]" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu Overlay */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#140E0A] border border-[#3A2B20] rounded-xs shadow-2xl z-50 overflow-hidden backdrop-blur-md">
                      <div className="p-1.5 divide-y divide-[#1F1610] max-h-64 overflow-y-auto">
                        {eventTypeOptions.map((opt) => {
                          const isSelected = formData.eventType === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, eventType: opt.value });
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full p-2.5 flex items-center justify-between text-left rounded-xs transition-all cursor-pointer ${isSelected
                                ? "bg-[#241912] border-l-2 border-[#C88639] text-[#F3EDE4]"
                                : "hover:bg-[#1C130D] text-[#C4B8A8] hover:text-[#F3EDE4]"
                                }`}
                            >
                              <div className="space-y-0.5 min-w-0 pr-2">
                                <div className="text-xs font-mono font-bold tracking-wide flex items-center gap-2">
                                  <span className={`w-1 h-1 rounded-full shrink-0 ${isSelected ? "bg-[#C88639]" : "bg-[#4A3C30]"}`} />
                                  <span className={isSelected ? "text-[#E2A958]" : "text-[#EDE6DD]"}>{opt.label}</span>
                                </div>
                                <div className="text-[10px] font-mono text-[#7A6E62] pl-3 truncate">
                                  {opt.sub}
                                </div>
                              </div>

                              {isSelected && <Check className="w-4 h-4 text-[#C88639] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold tracking-widest text-[#8A7D70] uppercase mb-1.5">
                    TRANSMISSION DETAILS (DATES, VENUE, SET REQUIREMENTS) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify proposed event date, location/city, sound system specs, or collaboration brief..."
                    className="w-full bg-[#18110C] border border-[#2B2019] focus:border-[#C88639] focus:ring-1 focus:ring-[#C88639] px-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#F3EDE4] placeholder:text-[#5A4F44] focus:outline-hidden transition-colors rounded-xs resize-y min-h-22.5"
                  />
                </div>

                {/* Form Action & Reply Notice */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="text-[10px] font-mono text-[#8A7D70] uppercase tracking-wider">
                    ⚡ DIRECT DESK DISPATCH • REPLIES WITHIN 24H
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C88639] hover:bg-[#E2A958] text-[#0A0705] text-xs font-mono font-bold tracking-wider uppercase transition-all rounded-xs shadow cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>INQUIRY TRANSMITTED!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT BOOKING REQUEST</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Rider & Press Kit Actions */}
              <div className="pt-4 border-t border-[#1F1610] flex flex-wrap items-center gap-3 max-w-2xl xl:max-w-3xl">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Technical Rider will be provided upon booking request.");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A130E] hover:bg-[#251B14] border border-[#2B2019] text-[#EDE6DD] text-xs font-mono tracking-wider transition-colors rounded-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C88639]" />
                  <span>TECHNICAL RIDER</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Electronic Press Kit will be provided upon booking request.");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A130E] hover:bg-[#251B14] border border-[#2B2019] text-[#EDE6DD] text-xs font-mono tracking-wider transition-colors rounded-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#C88639]" />
                  <span>PRESS KIT (EPK)</span>
                </a>
              </div>
            </div>
          </div>

          {/* PowD Cutout - Independent absolute element adjusted via right / bottom */}
          <div className="relative mt-8 w-full max-w-md mx-auto lg:mx-0 lg:mt-0 lg:max-w-none lg:absolute lg:-bottom-8 lg:right-0 xl:-right-18 lg:w-150 lg:h-195 pointer-events-none z-10">
            {/* Ambient Warm Backlight */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C88639]/15 rounded-full blur-3xl pointer-events-none" />
            <Image
              src="/PowD/PowD Pose 8 - BG.png"
              alt="PowD Leaning Portrait"
              fill
              className="object-contain object-bottom filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] relative z-10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
