"use client";

import { useState } from "react";
import { HeritageSite } from "@/types/heritage";
import GoldButton from "@/components/ui/GoldButton";
import { CheckCircle2 } from "lucide-react";

const ISSUE_TYPES = [
  "Inaccurate historical information",
  "Broken AR / 3D / VR experience",
  "Suggest a new heritage site",
  "Other feedback",
];

/**
 * PRODUCTION NOTE: this posts nowhere yet — wire the onSubmit handler to a
 * Route Handler (e.g. POST /api/report) that writes into a Supabase
 * `feedback_reports` table, or forwards to an email/Slack webhook.
 */
export default function ReportForm({ sites }: { sites: HeritageSite[] }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-gold/15 bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="h-10 w-10 text-gold" />
        <p className="font-display text-lg font-semibold text-brown">
          Thanks — your report was received.
        </p>
        <p className="text-sm text-brown/60">
          Our team reviews every submission. This demo form doesn&apos;t
          persist data yet — see the component&apos;s production note.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5 rounded-3xl border border-gold/15 bg-white p-8 shadow-card"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brown">
          Issue type
        </label>
        <select
          required
          className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown focus:border-gold focus:outline-none"
        >
          {ISSUE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brown">
          Related heritage site (optional)
        </label>
        <select className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown focus:border-gold focus:outline-none">
          <option value="">— None / general feedback —</option>
          {sites.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brown">
          Your email
        </label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brown">
          Details
        </label>
        <textarea
          required
          rows={4}
          placeholder="Describe the issue or the site you'd like to see added..."
          className="w-full rounded-xl border border-gold/25 bg-cream/30 px-4 py-2.5 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none"
        />
      </div>

      <GoldButton type="submit" className="w-full">
        Submit Report
      </GoldButton>
    </form>
  );
}
