"use client";

import { useEffect, useState } from "react";

export interface WakatimeLangItem {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  text: string;
  hours: number;
  minutes: number;
}

export interface DynamicLabRow {
  substance: string;
  code: string;
  detected: string;
  finding: "PRIMARY TOOL" | "COMFORTABLE" | "IN TRAINING" | "TRACE AMOUNT";
}

const fallbackRows: DynamicLabRow[] = [
  { substance: "TypeScript", code: "254 hrs 15 mins", detected: "Most days", finding: "PRIMARY TOOL" },
  { substance: "C#", code: "54 hrs 33 mins", detected: "Most days", finding: "PRIMARY TOOL" },
  { substance: "Java", code: "53 hrs 12 mins", detected: "Most days", finding: "PRIMARY TOOL" },
  { substance: "Markdown", code: "45 hrs 19 mins", detected: "In projects", finding: "COMFORTABLE" },
  { substance: "JavaScript", code: "41 hrs 29 mins", detected: "In projects", finding: "COMFORTABLE" },
  { substance: "Python", code: "25 hrs 42 mins", detected: "In projects", finding: "COMFORTABLE" },
  { substance: "JSON", code: "14 hrs 4 mins", detected: "In projects", finding: "COMFORTABLE" },
  { substance: "Bash", code: "11 hrs 2 mins", detected: "When needed", finding: "TRACE AMOUNT" },
  { substance: "YAML", code: "6 hrs 57 mins", detected: "When needed", finding: "TRACE AMOUNT" },
  { substance: "HTML", code: "5 hrs 59 mins", detected: "When needed", finding: "TRACE AMOUNT" },
];

const ignoredLangs = new Set([
  "other",
  "text",
  "git config",
  "gitignore file",
  ".env file",
  "ini",
  "lni",
  "public key",
  "cookie storage file",
  "java properties",
  "csproj",
  "hcl",
  "properties",
]);

export default function LabReportSection() {
  const [rows, setRows] = useState<DynamicLabRow[]>(fallbackRows);
  const [totalHumanReadable, setTotalHumanReadable] = useState<string>("539 hrs 30 mins");
  const [wakaRange, setWakaRange] = useState<string>("SINCE JUN 13, 2025 — PRESENT");

  useEffect(() => {
    async function fetchWakatime() {
      const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY || "";
      if (!apiKey) return;
      const wakaUrl = `https://wakatime.com/api/v1/users/current/stats/all_time?api_key=${apiKey}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let json: any = null;

      // 1. Try direct fetch first
      try {
        const directRes = await fetch(wakaUrl);
        if (directRes.ok) {
          json = await directRes.json();
        }
      } catch {
        // Direct fetch failed (likely CORS in browser), fallback to CORS proxy
        try {
          const proxyRes = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(wakaUrl)}`
          );
          if (proxyRes.ok) {
            const proxyData = await proxyRes.json();
            if (proxyData?.contents) {
              json = JSON.parse(proxyData.contents);
            }
          }
        } catch {
          // Proxy fetch failed silently
        }
      }

      if (!json) return;

      try {
        if (json?.data?.languages && Array.isArray(json.data.languages)) {
          const uniqueMap = new Map<string, WakatimeLangItem>();

          for (const lang of json.data.languages) {
            const cleanName = lang.name.trim();
            const lower = cleanName.toLowerCase();
            if (ignoredLangs.has(lower)) continue;

            if (!uniqueMap.has(lower)) {
              uniqueMap.set(lower, lang);
            }
          }

          const top10List = Array.from(uniqueMap.values())
            .sort((a, b) => b.total_seconds - a.total_seconds)
            .slice(0, 10);

          if (top10List.length > 0) {
            const formattedRows: DynamicLabRow[] = top10List.map((item, idx) => {
              let finding: "PRIMARY TOOL" | "COMFORTABLE" | "TRACE AMOUNT" = "TRACE AMOUNT";
              let detected = "When needed";

              if (idx < 3) {
                finding = "PRIMARY TOOL";
                detected = "Most days";
              } else if (idx < 7) {
                finding = "COMFORTABLE";
                detected = "In projects";
              } else {
                finding = "TRACE AMOUNT";
                detected = "Learning";
              }

              return {
                substance: item.name,
                code: item.text,
                detected,
                finding,
              };
            });

            setRows(formattedRows);
          }
        }
        if (json?.data?.human_readable_total) {
          setTotalHumanReadable(json.data.human_readable_total);
        }
        if (json?.data?.human_readable_range) {
          setWakaRange(`${json.data.human_readable_range.toUpperCase()} — PRESENT`);
        } else if (json?.data?.start) {
          const startDate = new Date(json.data.start);
          const dateStr = startDate
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toUpperCase();
          setWakaRange(`SINCE ${dateStr} — PRESENT`);
        }
      } catch (err) {
        console.error("Wakatime parse error:", err);
      }
    }

    fetchWakatime();
  }, []);

  return (
    <section id="stack" className="w-full bg-[#F4F1EA] text-[#1A1A1A] font-libre-franklin py-12 scroll-mt-16">
      <div className="max-w-275 mx-auto px-4 md:px-0">
        {/* Top Meta Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] md:text-[11px] text-[#45413A] font-mono font-bold tracking-[1.8px] pb-3 uppercase gap-1">
          <div>FORENSICS</div>
          <div>
            SUBSTANCES DETECTED {wakaRange}
            {totalHumanReadable ? ` (${totalHumanReadable.toUpperCase()} TOTAL CODED)` : ""}
          </div>
        </div>

        {/* Top Hairline Divider */}
        <div className="w-full border-b border-[#b9b7b0] mb-4" />

        {/* Main Section Header */}
        <h2 className="font-(family-name:--font-libre-caslon-display) text-[42px] md:text-[68px] font-normal text-[#16140F] leading-none tracking-[-0.02em] mb-4">
          The Lab Report
        </h2>

        {/* Solid Heavy Divider */}
        <div className="w-full border-b-[2.5px] border-[#1A1A1A] mb-8" />

        {/* Forensic Table Container Matching Image Standard */}
        <div className="border-2 border-[#1A1A1A] bg-[#FBF9F5] shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-160">
            {/* Header Row */}
            <thead>
              <tr className="bg-[#1A1A1A] text-[#F4F1EA] font-mono font-bold text-[11px] md:text-[12px] uppercase tracking-widest border-b-2 border-[#1A1A1A]">
                <th className="py-3 px-4 md:px-6 w-[40%]">SUBSTANCE</th>
                <th className="py-3 px-4 md:px-6 w-[18%] border-l border-[#33302B]">CODE</th>
                <th className="py-3 px-4 md:px-6 w-[22%] border-l border-[#33302B]">DETECTED</th>
                <th className="py-3 px-4 md:px-6 w-[20%] border-l border-[#33302B] text-right">FINDING</th>
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody className="divide-y divide-[#1A1A1A]/20">
              {rows.map((item, idx) => (
                <tr key={`${item.substance}-${idx}`} className="hover:bg-[#EBE7DF]/50 transition-colors">
                  {/* Substance Name */}
                  <td className="py-3.5 px-4 md:px-6 font-serif text-[17px] md:text-[19px] text-[#16140F] font-normal">
                    {item.substance}
                  </td>

                  {/* Wakatime Coded Time in CODE column */}
                  <td className="py-3.5 px-4 md:px-6 font-mono text-[12px] md:text-[13px] text-[#33302B] uppercase border-l border-[#1A1A1A]/20">
                    {item.code}
                  </td>

                  {/* Detection Frequency */}
                  <td className="py-3.5 px-4 md:px-6 font-mono text-[12px] md:text-[13px] text-[#33302B] border-l border-[#1A1A1A]/20">
                    {item.detected}
                  </td>

                  {/* Finding Stamp Badge */}
                  <td className="py-3.5 px-4 md:px-6 text-right border-l border-[#1A1A1A]/20">
                    {item.finding === "PRIMARY TOOL" && (
                      <span className="inline-block border-2 border-[#B93829] text-[#B93829] bg-[#F4F1EA] px-2.5 py-0.5 font-mono font-bold text-[10px] md:text-[11px] uppercase tracking-wider -rotate-1">
                        PRIMARY TOOL
                      </span>
                    )}
                    {item.finding === "COMFORTABLE" && (
                      <span className="inline-block border-2 border-[#1A1A1A] text-[#1A1A1A] bg-[#F4F1EA] px-2.5 py-0.5 font-mono font-bold text-[10px] md:text-[11px] uppercase tracking-wider">
                        COMFORTABLE
                      </span>
                    )}
                    {item.finding === "TRACE AMOUNT" && (
                      <span className="inline-block border-2 border-[#1A1A1A] text-[#1A1A1A] bg-[#F4F1EA] px-2.5 py-0.5 font-mono font-bold text-[10px] md:text-[11px] uppercase tracking-wider">
                        TRACE AMOUNT
                      </span>
                    )}
                    {item.finding === "IN TRAINING" && (
                      <span className="inline-block border-2 border-[#1A1A1A] text-[#1A1A1A] bg-[#F4F1EA] px-2.5 py-0.5 font-mono font-bold text-[10px] md:text-[11px] uppercase tracking-wider">
                        IN TRAINING
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Explanatory Caption Matching Image Standard */}
        <div className="mt-3 text-right text-[11px] md:text-[12px] font-mono text-[#6E6A63]">
          Findings are illustrative &mdash; what he reaches for day to day, not a ranking.
        </div>
      </div>
    </section>
  );
}
