"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { HeritageSite, HeritageType, HistoricalPeriod } from "@/types/heritage";
import HeritageCard from "@/components/heritage/HeritageCard";
import { cn } from "@/lib/utils";

const PERIODS: (HistoricalPeriod | "All")[] = [
  "All",
  "Ancient",
  "Medieval",
  "Colonial",
  "Modern",
];

const TYPES: (HeritageType | "All")[] = [
  "All",
  "Temple",
  "Fort",
  "Cave",
  "Stupa",
  "Palace",
  "Stepwell",
];

export default function ExploreGrid({ sites }: { sites: HeritageSite[] }) {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("All");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [unescoOnly, setUnescoOnly] = useState(false);

  const filtered = useMemo(() => {
    return sites.filter((site) => {
      const matchesQuery =
        query.trim().length === 0 ||
        site.name.toLowerCase().includes(query.toLowerCase()) ||
        site.state.toLowerCase().includes(query.toLowerCase()) ||
        site.city.toLowerCase().includes(query.toLowerCase());

      const matchesPeriod = period === "All" || site.historical_period === period;
      const matchesType = type === "All" || site.heritage_type === type;
      const matchesUnesco = !unescoOnly || site.is_unesco;

      return matchesQuery && matchesPeriod && matchesType && matchesUnesco;
    });
  }, [sites, query, period, type, unescoOnly]);

  return (
    <div>
      {/* Search */}
      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search temples, forts, monuments..."
          className="w-full rounded-full border border-gold/25 bg-white py-3 pl-11 pr-4 text-sm text-brown placeholder:text-brown/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <FilterGroup label="Period" options={PERIODS} value={period} onChange={setPeriod} />
        <FilterGroup label="Type" options={TYPES} value={type} onChange={setType} />
        <button
          onClick={() => setUnescoOnly((v) => !v)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
            unescoOnly
              ? "border-gold bg-gold text-ivory"
              : "border-gold/30 text-brown/60 hover:border-gold hover:text-gold"
          )}
        >
          UNESCO Sites
        </button>
      </div>

      {/* Results */}
      <p className="mt-8 text-center text-sm text-brown/50">
        {filtered.length} site{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((site) => (
          <HeritageCard key={site.id} site={site} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-brown/50">
            No sites match your filters. Try broadening your search.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-brown/40">
        {label}:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-full border border-gold/25 bg-white px-3 py-1.5 text-xs font-medium text-brown focus:border-gold focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
