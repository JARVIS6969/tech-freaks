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
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-ivory/95 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between pl-4 pr-5 md:pl-6 md:pr-8">
        
        {/* ========== LOGO (top left) — change height here ========== */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/heritage-logo.jpeg"
            alt="HeritageLens"
            width={400}
            height={80}
            style={{ height: "120px", width: "auto" }}
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-brown md:hidden"
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
