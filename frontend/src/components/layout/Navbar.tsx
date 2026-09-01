"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import GoldButton from "@/components/ui/GoldButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/ai-guide", label: "AI Guide" },
  { href: "/report", label: "Report" },
  { href: "/contact", label: "Contact / About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-ivory/95 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between pl-4 pr-5 md:pl-6 md:pr-8">

        {/* ========== LOGO (top left) — change height here ========== */}
        <Link href="/" className="flex items-center shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/heritage-logo-cropped.png"
            alt="HeritageLens"
            width={400}
            height={80}
            style={{ height: "70px", width: "auto" }}
            className="object-contain"
            priority
          />
        </Link>

        {/* ========== NAV LINKS (center) ========== */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  isActive
                    ? "text-gold"
                    : "text-brown/70 hover:text-brown"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ========== START EXPLORING (top right) ========== */}
        <div className="flex items-center gap-3">
          <GoldButton href="/explore" size="lg" className="hidden sm:inline-flex px-6 py-2.5 text-base">
            Start Exploring
          </GoldButton>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-brown md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ========== MOBILE DROPDOWN MENU ========== */}
      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-gold/10 bg-ivory px-5 py-4 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive ? "text-gold" : "text-brown/70 hover:text-brown"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <GoldButton
            href="/explore"
            size="lg"
            className="mt-2 sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            Start Exploring
          </GoldButton>
        </nav>
      )}
    </header>
  );
}