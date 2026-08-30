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
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/heritage-logo.jpg"
            alt="HeritageLens"
            width={36}
            height={36}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight text-brown">
            Heritage<span className="text-gold">Lens</span>
          </span>
        </Link>

        {/* Center nav links (desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-gold" : "text-brown/70 hover:text-brown"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <GoldButton href="/explore" size="sm" className="hidden sm:inline-flex">
            Start Exploring
          </GoldButton>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-brown md:hidden"
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

      {/* Mobile dropdown menu */}
      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-gold/10 bg-cream px-5 py-4 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-gold" : "text-brown/70 hover:text-brown"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <GoldButton href="/explore" size="sm" className="mt-2 sm:hidden" onClick={() => setIsOpen(false)}>
            Start Exploring
          </GoldButton>
        </nav>
      )}
    </header>
  );
}