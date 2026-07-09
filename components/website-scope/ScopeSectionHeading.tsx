type ScopeSectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  compact?: boolean;
  id?: string;
};

export default function ScopeSectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  compact = false,
  id,
}: ScopeSectionHeadingProps) {
  const centered = align === "center";
  return (
    <div id={id} className={`scroll-mt-28 ${compact ? "mb-10" : "mb-16 md:mb-20"} ${centered ? "text-center" : ""}`}>
      <div className={`flex items-baseline gap-4 ${centered ? "justify-center" : ""}`}>
        <span className="font-mono text-xs text-hs-gold">{index}</span>
        <span className="font-mono text-xs uppercase tracking-caps text-hs-muted">{eyebrow}</span>
      </div>
      <h2
        className={`mt-4 font-display font-light leading-[1.08] text-hs-ink text-balance ${
          compact ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-hs-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function ScopeSubheading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h3 className="font-display text-2xl font-light text-hs-ink">{title}</h3>
      {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-hs-muted">{description}</p>}
    </div>
  );
}

export { ScopeSubheading };
