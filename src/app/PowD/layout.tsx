import type { Metadata } from "next";
import { Syne, Space_Grotesk, Space_Mono } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-powd-display",
  weight: ["400", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-powd-sans",
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-powd-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PowD | DJ & Electronic Music Artist",
  description:
    "Official artist portfolio and sound archive of PowD. Bass-driven electronic music, raw club energy, and underground frequencies.",
  icons: {
    icon: "/PowD/PowD Avatar.png",
  },
};

export default function PowDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} min-h-screen bg-[#0A0705] text-[#EDE6DD] selection:bg-[#C88639] selection:text-[#0A0705] font-sans antialiased`}
      style={{
        fontFamily: "var(--font-powd-sans), sans-serif",
      }}
    >
      <style>{`
        .font-display {
          font-family: var(--font-powd-display), sans-serif;
        }
        .font-mono {
          font-family: var(--font-powd-mono), monospace;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 25s linear infinite;
        }
        /* Custom Dark Espresso Scrollbar for /PowD */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0E0B09;
          border-left: 1px solid #241A13;
        }
        ::-webkit-scrollbar-thumb {
          background: #2C2018;
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #C88639;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #2C2018 #0E0B09;
        }
      `}</style>
      {children}
    </div>
  );
}
