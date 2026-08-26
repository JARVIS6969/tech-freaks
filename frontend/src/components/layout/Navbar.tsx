"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "AI Guide", href: "/ai-guide" },
  { label: "Report", href: "/report" },
  { label: "Contact / About", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-ivory/90 shadow-[0_1px_0_0_rgba(201,154,46,0.18)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-semibold text-brown"
        >
          <Sparkles className="h-5 w-5 text-gold" strokeWidth={2} />
          HeritageLens
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-gold",
                  active ? "text-gold" : "text-brown/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <GoldButton href="/explore" size="sm">
            Start Exploring
          </GoldButton>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-brown md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gold/15 bg-ivory px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-brown/90 hover:bg-cream hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <GoldButton href="/explore" className="w-full">
              Start Exploring
            </GoldButton>
          </div>
        </div>
      )}
    </header>
  );
}
