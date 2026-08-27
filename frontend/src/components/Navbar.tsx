"use client";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo — top left */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
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

        {/* Center nav links (hidden on mobile) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
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

        {/* Start Exploring — top right */}
        <div className="flex items-center gap-3">
          <GoldButton href="/explore" size="sm" className="hidden sm:inline-flex">
            Start Exploring
          </GoldButton>

          {/* Mobile menu button (optional – expand later if needed) */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-brown md:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
