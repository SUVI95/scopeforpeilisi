"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const layers = [
  {
    id: "tls",
    name: "TLS-salaus",
    radius: 230,
    detail:
      "Kaikki liikenne selaimen ja palvelimen välillä on salattu. Tietoja ei lähetetä avoimena.",
  },
  {
    id: "auth",
    name: "Turvallinen kirjautuminen",
    radius: 184,
    detail:
      "Salasanasuojattu sisäänkirjautuminen, istunnon hallinta ja turvallinen uloskirjautuminen.",
  },
  {
    id: "rbac",
    name: "Käyttöoikeudet",
    radius: 138,
    detail:
      "Roolipohjaiset oikeudet — kukin näkee vain sen, mihin hänellä on pääsy.",
  },
  {
    id: "audit",
    name: "Lokitiedot",
    radius: 92,
    detail:
      "Kirjautumiset ja tärkeät muutokset tallentuvat käyttäjätunnuksella ja aikaleimalla.",
  },
  {
    id: "eu",
    name: "EU-tietojen sijainti",
    radius: 46,
    detail:
      "Tiedot tallennetaan EU-alueen palvelimille. Data ei siirry EU:n ulkopuolelle.",
  },
];

const SIZE = 480;
const C = SIZE / 2;

export default function Security() {
  const [active, setActive] = useState<string>("eu");
  const current = layers.find((l) => l.id === active)!;
  const activeIndex = layers.findIndex((l) => l.id === active);

  return (
    <section id="security" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="10"
          eyebrow="Tietoturva"
          title={
            <>
              Turvallinen pääsy
              <br />
              <em className="italic text-copper">ja oikeuksien hallinta.</em>
            </>
          }
          description="Suojattu kirjautuminen ja käyttöoikeudet — asiakastiedot pysyvät turvassa ja oikeat henkilöt näkevät oikeat asiat."
        />

        <ClickHint className="mb-6">Klikkaa kerrosta tai painiketta</ClickHint>

        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="relative mx-auto w-full max-w-[480px]"
            style={{ opacity: 1 }}
          >
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="h-auto w-full"
              role="group"
              aria-label="Tietoturvakerrokset"
            >
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(184,92,138,0.15)" />
                  <stop offset="100%" stopColor="rgba(184,92,138,0)" />
                </radialGradient>
              </defs>

              <circle cx={C} cy={C} r={70} fill="url(#coreGlow)" />

              {[...layers].reverse().map((l) => {
                const isActive = l.id === active;
                return (
                  <circle
                    key={l.id}
                    cx={C}
                    cy={C}
                    r={l.radius}
                    fill="none"
                    stroke={isActive ? "#B85C8A" : "#5C4F56"}
                    strokeOpacity={isActive ? 1 : 0.35}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    pointerEvents="stroke"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(l.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(l.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={l.name}
                    aria-pressed={isActive}
                  />
                );
              })}

              {layers.map((l) => {
                const isActive = l.id === active;
                const y = C - l.radius;
                return (
                  <g
                    key={`label-${l.id}`}
                    onClick={() => setActive(l.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(l.id);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    role="button"
                    tabIndex={0}
                    aria-label={l.name}
                  >
                    <circle
                      cx={C}
                      cy={y}
                      r={5}
                      fill={isActive ? "#B85C8A" : "#9A8A92"}
                    />
                    <text
                      x={C + 12}
                      y={y + 4}
                      fontSize="12"
                      className="font-mono"
                      fill={isActive ? "#1A1418" : "#5C4F56"}
                    >
                      {l.name}
                    </text>
                  </g>
                );
              })}

              <text
                x={C}
                y={C + 4}
                textAnchor="middle"
                fontSize="11"
                fill="#B85C8A"
                className="font-mono"
              >
                EU
              </text>
            </svg>
          </motion.div>

          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease }}
                className="gpu rounded-2xl border border-hairline bg-paper p-8 shadow-card"
              >
                <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                  Kerros {String(activeIndex + 1).padStart(2, "0")} / 05
                </p>
                <h3 className="mt-3 font-display text-3xl font-light text-ink">
                  {current.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  {current.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap gap-2">
              {layers.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setActive(l.id)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[11px] transition-colors ${
                    l.id === active
                      ? "border-copper/40 bg-copper-wash text-ink"
                      : "border-hairline text-slate hover:border-copper/30 hover:text-ink"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
