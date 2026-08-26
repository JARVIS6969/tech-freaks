"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

/**
 * Floating gold chat launcher shown across the app. Clicking it links to the
 * full AI Guide page (/ai-guide) rather than opening an inline chat, so the
 * same conversation logic in AIChatPage isn't duplicated. Swap `href` for a
 * popover if a lighter-weight inline experience is preferred later.
 */
export default function AIGuideWidget() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <Link
        href="/ai-guide"
        className="group flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-ivory shadow-gold transition-transform hover:-translate-y-0.5"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">Ask the Heritage Guide</span>
      </Link>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss Heritage Guide button"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory text-brown/40 shadow-card hover:text-brown"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
