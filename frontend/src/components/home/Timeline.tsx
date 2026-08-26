"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { HeritageSite } from "@/types/heritage";

const PERIODS = ["Ancient", "Medieval", "Colonial", "Modern"] as const;

export default function Timeline({ sites }: { sites: HeritageSite[] }) {
  const [active, setActive] = useState<(typeof PERIODS)[number]>("Medieval");

  const filtered = sites.filter((s) => s.historical_period === active);

  return (
    <section className="bg-cream/50 py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Heritage Timeline"
          title="Ancient → Medieval → Colonial → Modern"
          subtitle="Select an era to see the heritage sites that belong to it."
        />

        {/* Timeline track */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gold/25" />
          <div className="relative flex justify-between">
            {PERIODS.map((period) => (
              <button
                key={period}
                onClick={() => setActive(period)}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={
                    "h-4 w-4 rounded-full border-2 transition-all duration-300 " +
                    (active === period
                      ? "scale-125 border-gold bg-gold shadow-gold"
                      : "border-gold/40 bg-ivory group-hover:border-gold")
                  }
                />
                <span
                  className={
                    "text-xs font-semibold uppercase tracking-widest md:text-sm " +
                    (active === period ? "text-gold-dark" : "text-brown/50")
                  }
                >
                  {period}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-brown/50">
              No sample sites tagged for this era yet — add more in
              src/lib/data/heritageSites.ts.
            </p>
          )}
          {filtered.map((site) => (
            <Link
              key={site.id}
              href={`/explore/${site.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-gold/10 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-gold"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.main_image}
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-brown">
                  {site.name}
                </p>
                <p className="text-xs text-brown/50">
                  {site.construction_date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
