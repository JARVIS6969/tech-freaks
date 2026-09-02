"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { HeritageSite } from "@/types/heritage";
import { getSuggestedTopics } from "@/lib/siteTopics";
import { cn } from "@/lib/utils";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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
  const [voiceMode, setVoiceMode] = useState(true); // auto-speak replies
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useVoiceAssistant();

  const selectedSite = sites.find((s) => s.slug === selectedSlug);
  const suggestedTopics = selectedSite ? getSuggestedTopics(selectedSite, 3) : [];

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Push live mic transcript into the input box
  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;
    const newUserMessage: Message = { role: "user", content: question };
    setMessages((m) => [...m, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai-guide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          siteSlug: selectedSlug,
          history: messages, // send everything asked/answered so far
        }),
      });
      const data = await res.json();
      const answer: string = data.answer ?? data.error ?? "Sorry, something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
      if (voiceMode) speak(answer);
    } catch {
      const fallback = "I couldn't reach the guide service. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: fallback }]);
      if (voiceMode) speak(fallback);
    } finally {
      setLoading(false);
    }
  }

  function handleMicClick() {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking(); // don't listen while it's still talking
      startListening();
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
      <div className="flex h-[85vh] min-h-[640px] flex-col rounded-3xl border border-gold/15 bg-white shadow-card">
        <div className="flex items-center justify-between gap-2 border-b border-gold/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <p className="font-display font-semibold text-brown">
              Heritage Guide {selectedSite ? `· ${selectedSite.name}` : ""}
            </p>
            {isSpeaking && (
              <span className="flex items-center gap-1 text-xs text-gold">
                <Volume2 className="h-3.5 w-3.5 animate-pulse" /> speaking...
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (voiceMode) stopSpeaking();
              setVoiceMode((v) => !v);
            }}
            className="flex items-center gap-1.5 rounded-full border border-gold/25 px-3 py-1.5 text-xs text-brown/60 hover:border-gold hover:text-gold"
            title={voiceMode ? "Voice replies on" : "Voice replies off"}
          >
            {voiceMode ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            {voiceMode ? "Voice on" : "Voice off"}
          </button>
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
          {suggestedTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => selectedSite && sendMessage(topic.question(selectedSite))}
              className="rounded-full border border-gold/25 px-3 py-1.5 text-xs text-brown/60 hover:border-gold hover:text-gold"
            >
              {selectedSite ? topic.question(selectedSite) : ""}
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
          <button
            type="button"
            onClick={handleMicClick}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors",
              isListening
                ? "border-red-400 bg-red-50 text-red-500 animate-pulse"
                : "border-gold/25 text-brown/60 hover:border-gold hover:text-gold"
            )}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "What makes this monument special?"}
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
