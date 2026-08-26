"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * "From Then to Now" — drag-to-compare historical reconstruction vs present
 * day. In production, `beforeImage` should point to a rendered historical
 * reconstruction asset (historical_reconstruction_url) and `afterImage` to a
 * present-day photograph of the same monument angle.
 */
export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Historical Reconstruction",
  afterLabel = "Present Day",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl shadow-card"
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onMouseMove={(e) => dragging && updatePosition(e.clientX)}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
        onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
      >
        {/* After (present day) — full width base layer */}
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="pointer-events-none object-cover"
        />

        {/* Before (reconstruction) — clipped by slider position */}
       {/* Before (reconstruction) — revealed via clip-path, no width conflict */}
<div
  className="pointer-events-none absolute inset-0"
  style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
>
  <Image
    src={beforeImage}
    alt={beforeLabel}
    fill
    className="object-cover"
  />
</div>

        {/* Divider handle */}
        <div
          className="absolute inset-y-0 z-10 w-1 bg-gold shadow-gold"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient text-ivory shadow-gold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 6L2 12L8 18M16 6L22 12L16 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 rounded-full bg-brown/80 px-3 py-1 text-xs font-medium text-ivory">
          {beforeLabel}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-brown/80 px-3 py-1 text-xs font-medium text-ivory">
          {afterLabel}
        </span>

        {/* Full-range input for accessibility / keyboard control */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Compare historical reconstruction with present day"
          className="absolute inset-x-0 bottom-0 z-20 h-8 w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
