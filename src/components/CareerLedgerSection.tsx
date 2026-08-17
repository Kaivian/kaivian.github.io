"use client";

import ScrollReveal, { ScrollStaggerGroup, ScrollStaggerItem } from "./ScrollReveal";

interface CareerItem {
  timeline: string;
  role: string;
  organization: string;
  description: string;
}

const careerHistory: CareerItem[] = [
  {
    timeline: "2026 — NOW",
    role: "Founder & Lead Architect",
    organization: "CVERIFY.IO",
    description:
      "Subject last seen building an AI-native talent intelligence platform — analyzing code repositories, commit activity, and technical artifacts to verify engineering capability.",
  },
  {
    timeline: "2025 — NOW",
    role: "Fullstack & System Developer",
    organization: "KAIVIAN LABS",
    description:
      "Observed daily building high-concurrency web applications, Spigot server plugins, and spatial discovery engines — working across both front-end and back-end architecture.",
  },
  {
    timeline: "2023 — 2025",
    role: "Software Developer",
    organization: "OPEN SOURCE & FREELANCE",
    description:
      "First recorded appearance. Built thread-safe Java utility libraries, custom GUI inventory handlers, and responsive web interfaces.",
  },
];

export default function CareerLedgerSection() {
  return (
    <section id="experience" className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin py-12 border-b-4 border-[#1A1A1A] scroll-mt-16">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Header Block */}
        <ScrollReveal direction="up" duration={0.6}>
          {/* Top Meta Bar */}
          <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#45413A] font-mono font-bold tracking-[1.8px] pb-3 uppercase whitespace-nowrap">
            <div>KNOWN WHEREABOUTS</div>
            <div>MOVEMENTS ON RECORD SINCE 2023</div>
          </div>

          {/* Top Hairline Divider */}
          <div className="w-full border-b border-[#b9b7b0] mb-4" />

          {/* Main Section Header */}
          <h2 className="font-(family-name:--font-libre-caslon-display) text-[32px] md:text-[46px] font-normal text-[#16140F] leading-none tracking-[-0.02em] mb-4">
            The Career Ledger
          </h2>

          {/* Solid Heavy Divider */}
          <div className="w-full border-b-[2.5px] border-[#1A1A1A] mb-8" />
        </ScrollReveal>

        {/* Ledger Entries List */}
        <ScrollStaggerGroup staggerDelay={0.15} className="border-t-2 border-b-2 border-[#1A1A1A] divide-y divide-[#1A1A1A]/30">
          {careerHistory.map((item, idx) => (
            <ScrollStaggerItem key={idx} direction="up" distance={25}>
              <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start">
                {/* Left Col: Timeline (2 Cols - closer to Role) */}
                <div className="md:col-span-2 font-mono text-[12px] md:text-[13px] text-[#6E6A63] font-semibold uppercase tracking-wider shrink-0">
                  {item.timeline}
                </div>

                {/* Middle Col: Role & Organization (5 Cols) */}
                <div className="md:col-span-5">
                  <h3 className="font-serif text-[22px] md:text-[26px] text-[#16140F] leading-tight mb-1">
                    {item.role}
                  </h3>
                  <div className="font-mono text-[11px] md:text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[1.5px]">
                    {item.organization}
                  </div>
                </div>

                {/* Right Col: Description (5 Cols) */}
                <div className="md:col-span-5 font-libre-franklin text-[13px] md:text-[14px] text-[#33302B] leading-relaxed">
                  {item.description}
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerGroup>
      </div>
    </section>
  );
}
