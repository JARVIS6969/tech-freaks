"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { HeritageSite } from "@/types/heritage";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "Why was this temple built?",
  "Who built it?",
  "What does this sculpture represent?",
  "How old is this monument?",
  "Show me how it looked historically.",
  "Tell me the history in 60 seconds.",
];

export default function AIChatPage({
  sites,
  initialSiteSlug,
}: {
  sites: HeritageSite[];
  initialSiteSlug?: string;
}) {
  const [selectedSlug, setSelectedSlug] = useState(
    initialSiteSlug ?? sites[0]?.slug ?? ""
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! I'm your Heritage Guide. Pick a monument on the left, then ask me anything — how it was built, who commissioned it, or what a sculpture means.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const selectedSite = sites.find((s) => s.slug === selectedSlug);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-guide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, siteSlug: selectedSlug }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer ?? data.error ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn't reach the guide service. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Site selector */}
      <aside className="rounded-3xl border border-gold/15 bg-white p-4 shadow-card lg:h-fit">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-gold">
          Choose a Site
        </p>
        <div className="flex flex-col gap-1">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSlug(site.slug)}
              className={cn(
                "rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                selectedSlug === site.slug
                  ? "bg-cream font-medium text-gold-dark"
                  : "text-brown/70 hover:bg-cream/60"
              )}
            >
              {site.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <div className="flex h-[70vh] flex-col rounded-3xl border border-gold/15 bg-white shadow-card">
        <div className="flex items-center gap-2 border-b border-gold/10 px-6 py-4">
          <Sparkles className="h-4 w-4 text-gold" />
          <p className="font-display font-semibold text-brown">
            Heritage Guide {selectedSite ? `· ${selectedSite.name}` : ""}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-gold-gradient text-ivory"
                    : "bg-cream text-brown"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-brown/50">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        <div className="flex flex-wrap gap-2 border-t border-gold/10 px-6 py-3">
          {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="rounded-full border border-gold/25 px-3 py-1.5 text-xs text-brown/60 hover:border-gold hover:text-gold"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2 border-t border-gold/10 p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What makes this monument special?"
            className="flex-1 rounded-full border border-gold/25 bg-cream/40 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-ivory shadow-gold disabled:opacity-50"
            aria-label="Send question"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
