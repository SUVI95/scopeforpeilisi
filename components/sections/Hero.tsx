"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CountUp({
  to,
  duration = 1400,
  delay = 900,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    let raf = 0;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);

  return <span>{value}</span>;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184, 92, 138, 0.14), transparent 65%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,20,24,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,20,24,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center">
        <p className="font-mono text-xs uppercase tracking-caps text-copper">
          Proposal for Peilisi
        </p>

        <h1 className="mt-8 font-display text-5xl font-light leading-[1.06] text-ink md:text-7xl lg:text-[5.25rem] text-balance">
          Customers, events, and mirrors
          <br />
          <em className="italic text-copper">in one internal platform.</em>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate md:text-lg">
          A tailored management platform bringing customer records, events,
          bookings, mirror availability, and automations into one place —
          designed for the Peilisi team&apos;s day-to-day work. The platform code
          and full system remain yours after delivery.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.peilisi.fi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-hairline bg-paper px-4 py-2 text-xs text-slate transition-colors hover:border-copper/30 hover:text-ink"
          >
            peilisi.fi
          </a>
          <a
            href="https://instagram.com/peilisi_fi"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-hairline bg-paper px-4 py-2 text-xs text-slate transition-colors hover:border-copper/30 hover:text-ink"
          >
            @peilisi_fi
          </a>
          <span className="rounded-full border border-copper/20 bg-copper-wash px-4 py-2 text-xs text-copper">
            Turning moments into experiences
          </span>
        </div>

        <div className="mt-14 flex items-center justify-center gap-6 md:gap-10">
          <div className="text-right">
            <div className="font-display text-5xl font-light text-ink md:text-6xl">
              <CountUp to={9} />
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-caps text-slate">
              Areas to discuss
            </div>
          </div>
          <div className="h-14 w-px bg-hairline" aria-hidden />
          <div className="text-left">
            <div className="font-display text-5xl font-light text-copper md:text-6xl">
              <CountUp to={15} delay={1600} duration={900} />
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-caps text-slate">
              Days of testing
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-lg text-xs leading-relaxed text-faint">
          An illustrative overview for discussion. Fields, design, and features
          will be confirmed in your next meeting before development begins.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#preview"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-copper/30 bg-paper px-8 py-4 text-sm tracking-wide text-ink shadow-card transition-all duration-300 hover:border-copper hover:shadow-lift"
          >
            Explore dashboard preview
            <span className="text-copper transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <a
            href="#pipeline"
            className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate transition-colors hover:text-copper"
          >
            Full proposal scope
            <span>→</span>
          </a>
        </div>
      </div>

      {ready && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-sand/80"
      />
    </section>
  );
}
