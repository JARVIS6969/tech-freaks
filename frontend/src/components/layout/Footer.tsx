import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-cream/60">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-base font-semibold text-brown">
              <Sparkles className="h-4 w-4 text-gold" />
              HeritageLens
            </div>
            <p className="mt-2 max-w-sm text-sm text-brown/60">
              Technology can help us experience the past. An immersive
              cultural-heritage platform built for AR, VR and 3D exploration.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Platform
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-brown/70">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li><Link href="/explore" className="hover:text-gold">Explore Heritage</Link></li>
              <li><Link href="/ai-guide" className="hover:text-gold">AI Heritage Guide</Link></li>
              <li><Link href="/report" className="hover:text-gold">Reports & Impact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Experiences
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-brown/70">
              <li><Link href="/explore#ar" className="hover:text-gold">AR Experience</Link></li>
              <li><Link href="/explore#3d" className="hover:text-gold">3D Heritage</Link></li>
              <li><Link href="/explore#vr" className="hover:text-gold">VR Tours</Link></li>
              <li><Link href="/explore#map" className="hover:text-gold">Heritage Map</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              About
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-brown/70">
              <li><Link href="/contact" className="hover:text-gold">About the project</Link></li>
              <li><Link href="/contact#contact" className="hover:text-gold">Contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-gold/15 pt-4 text-xs text-brown/50 md:flex-row">
          <p>© {new Date().getFullYear()} HeritageLens. Built for cultural heritage preservation.</p>
          <p className="md:pr-44">We don't just preserve history. We make people experience it.</p>
        </div>
      </div>
    </footer>
  );
}