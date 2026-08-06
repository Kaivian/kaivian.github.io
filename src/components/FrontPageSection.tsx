"use client";

import Image from "next/image";

export default function FrontPageSection() {
  return (
    <section className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin pt-6 pb-3 border-[#1A1A1A] border-b-4">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Category Header */}
        <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#45413A] font-bold tracking-[1.8px] pb-3 uppercase">
          <div>FRONT PAGE</div>
          <div>FILED UNDER: OPEN INVESTIGATIONS</div>
        </div>

        {/* Top Hairline Divider */}
        <div className="w-full border-b border-[#b9b7b0] mb-5" />

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-20 gap-8 lg:gap-10 items-start">
          {/* Left Column (Hero Title, Quote, Byline, CTA, Stats) */}
          <div className="lg:col-span-12 flex flex-col justify-between h-full">
            <div>
              {/* Tag / Subhead */}
              <div className="text-[11px] font-bold uppercase tracking-[2px] text-[#16140F] mb-3">
                CASE NO. 03 — FINDINGS PUBLISHED
              </div>

              {/* Main Headline */}
              <h1 className="font-(family-name:--font-libre-caslon-display) text-[38px] md:text-[76px] leading-[1.06] tracking-[-0.02em] text-[#16140F] mb-6">
                A Vietnamese software engineer who likes building things —{" "}
                <span className="italic">front to back.</span>
              </h1>

              {/* Quote / Subhead Banner */}
              <div className="border-l-4 border-[#1A1A1A] pl-4 my-6">
                <p className="font-(family-name:--font-libre-caslon-display) text-[20px] md:text-[23px] italic text-[#45413A] leading-snug">
                  Over 3 years in: Doan The Luc (Kaivian) engineers scalable backend systems at Hypixel Network, and builds AI-native platforms like CVerify.
                </p>
              </div>

              {/* Byline */}
              <div className="text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.72px] text-[#45413A] mb-8">
                BY <span className="font-extrabold text-[#1A1A1A]">THE INVESTIGATION DESK</span> · REPORTING FROM ĐÀ NẴNG, BETWEEN HYPIXEL NETWORK AND CVERIFY
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#work"
                  className="bg-[#1A1A1A] hover:bg-[#F4F1EA] text-[#F4F1EA] hover:text-[#1A1A1A] border-[2.5px] border-[#1A1A1A] transition-colors px-6 py-3.5 text-[12px] font-bold uppercase tracking-[1.4px]"
                >
                  READ THE WORK &rarr;
                </a>
                <a
                  href="#contact"
                  className="bg-[#F4F1EA] text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors px-6 py-3.5 text-[12px] font-bold uppercase tracking-[1.4px]"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>

            {/* Bottom Stats Strip */}
            <div className="w-full border-t border-[#1A1A1A] pt-4 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#1A1A1A]/40 text-left">
                {/* Stat 1 */}
                <div className="pr-3 pb-3 sm:pb-0">
                  <div className="font-(family-name:--font-libre-caslon-display) text-[26px] sm:text-[30px] font-normal leading-none text-[#16140F]">
                    30K+
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-[#45413A] mt-1.5">
                    PEAK PLAYERS · HYPIXEL NETWORK
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="px-3 pb-3 sm:pb-0">
                  <div className="font-(family-name:--font-libre-caslon-display) text-[26px] sm:text-[30px] font-normal leading-none text-[#16140F]">
                    3+ Yrs
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-[#45413A] mt-1.5">
                    EXPERIENCE · FULL-STACK & AI
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="px-3 pt-3 sm:pt-0">
                  <div className="font-(family-name:--font-libre-caslon-display) text-[26px] sm:text-[30px] font-normal leading-none text-[#16140F]">
                    Q4 Scopus
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-[#45413A] mt-1.5">
                    RESEARCH · AI DIAGNOSTICS
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="pl-3 pt-3 sm:pt-0">
                  <div className="font-(family-name:--font-libre-caslon-display) text-[26px] sm:text-[30px] font-normal leading-none text-[#16140F]">
                    3.7 / 4.0
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[1.2px] text-[#45413A] mt-1.5">
                    GPA · FPT UNIVERSITY
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Illustration + Article Content) */}
          <div className="md:col-span-8 lg:border-l lg:border-[#1A1A1A] lg:pl-6">
            {/* Illustration Frame */}
            <div className="border-2 border-[#1A1A1A] bg-[#F4F1EA] mb-2">
              <div className="relative w-full h-100 overflow-hidden">
                <Image
                  src="/generals/Avatar Style Removed BG.png"
                  alt="The handsome subject"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Picture Caption */}
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.8px] text-[#45413A] mb-6">
              PICTURED: <span className="font-normal text-[#5A554E] lowercase">the handsome subject (Kaivian).</span>
            </div>

            <div className="font-(family-name:--font-libre-caslon-display) text-[15px] md:text-[17px] text-[#2A2723] leading-[1.6]">
              <p className="mb-3">
                <span className="float-left font-(family-name:--font-libre-caslon-display) text-[50px] sm:text-[54px] leading-[0.75] pr-2 pt-1 font-normal text-[#16140F]">
                  H
                </span>
                e enjoys the whole engineering process &mdash; going from a rough idea to something scalable that ships. His main stack spans React, Next.js, and TypeScript on the front, with ASP.NET Core, Python, and PostgreSQL underneath for AI pipelines.
              </p>
              <p>
                When high-concurrency systems call for it, he reaches for Java, Spring Boot, Redis, and Docker. Through CVerify and Hypixel Network (supporting 30,000+ concurrent players), he builds robust software solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
