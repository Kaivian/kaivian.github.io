"use client";

import { useState } from "react";
import { Copy, Check, Mail, Send } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "kaivian.dev@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin py-16 scroll-mt-16">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Meta Bar */}
        <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#45413A] font-mono font-bold tracking-[1.8px] pb-3 uppercase whitespace-nowrap">
          <div>DOSSIER INQUIRIES</div>
          <div>OPEN FOR FREELANCE &amp; FULL-TIME ROLES</div>
        </div>

        {/* Top Hairline Divider */}
        <div className="w-full border-b border-[#b9b7b0] mb-4" />

        {/* Main Section Header */}
        <h2 className="font-(family-name:--font-libre-caslon-display) text-[42px] md:text-[68px] font-normal text-[#16140F] leading-none tracking-[-0.02em] mb-4">
          Contact The Desk
        </h2>

        {/* Solid Heavy Divider */}
        <div className="w-full border-b-[2.5px] border-[#1A1A1A] mb-8" />

        {/* Contact Content Box */}
        <div className="border-2 border-[#1A1A1A] bg-[#FBF9F5] p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="text-[#B93829] font-mono font-bold text-[12px] uppercase tracking-widest">
              COMMUNICATION CHANNEL ESTABLISHED
            </div>
            <p className="font-libre-franklin text-[15px] sm:text-[16px] text-[#2A2723] leading-relaxed">
              Have a project inquiry, collaboration proposal, or technical case to discuss?
              Reach out directly via email or inspect the source code on GitHub.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleCopy}
              className="border-2 border-[#1A1A1A] bg-[#F4F1EA] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] text-[#1A1A1A] px-6 py-3.5 font-mono font-bold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="bg-[#1A1A1A] hover:bg-[#B93829] text-[#F4F1EA] px-7 py-3.5 font-mono font-bold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>SEND DISPATCH</span>
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
