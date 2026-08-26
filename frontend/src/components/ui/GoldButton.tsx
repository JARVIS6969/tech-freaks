import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = "filled",
  size = "md",
  className,
  type = "button",
}: GoldButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm md:text-base",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  const variants = {
    filled:
      "bg-gold-gradient text-ivory shadow-gold hover:shadow-lg hover:-translate-y-0.5",
    outline:
      "border border-gold text-gold hover:bg-gold hover:text-ivory",
    ghost: "text-brown hover:text-gold",
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
