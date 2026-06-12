import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`mb-16 md:mb-24 ${centered ? "text-center" : ""}`}>
      <Reveal>
        <div
          className={`flex items-baseline gap-4 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="font-mono text-xs text-copper">{index}</span>
          <span className="font-mono text-xs uppercase tracking-caps text-slate">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-4xl font-light leading-[1.08] text-ink md:text-6xl text-balance">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 max-w-xl text-base leading-relaxed text-slate md:text-lg ${
              centered ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
