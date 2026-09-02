import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIGuideWidget from "@/components/ai/AIGuideWidget";
import ScrollToTop from "@/components/layout/ScrollToTop";

import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HeritageLens — Experience History Like Never Before",
  description:
    "An immersive cultural-heritage platform: explore Indian monuments through AR, VR, 3D models, drone views and an AI Heritage Guide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        {/* Google Model Viewer Script for AR functionality */}
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ivory font-body text-brown antialiased">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIGuideWidget />
      </body>
    </html>
  );
}