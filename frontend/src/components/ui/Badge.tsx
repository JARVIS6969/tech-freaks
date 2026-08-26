import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gold/40 bg-cream/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-dark backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
