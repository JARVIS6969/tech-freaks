interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-brown md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={
            "mt-4 text-brown/70 " +
            (align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")
          }
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
