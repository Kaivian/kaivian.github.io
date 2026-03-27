import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { geistSans, geistMono, montserrat } from "@/config/font.config";

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
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}