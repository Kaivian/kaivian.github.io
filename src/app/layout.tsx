import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { geistSans, geistMono, montserrat } from "@/config/font.config";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Kaivian",
  description: "Kaivian's Portfolio",
  icons: {
    icon: "/generals/Kaivian Logo Circle.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, montserrat.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}