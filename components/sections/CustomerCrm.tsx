"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const customers = [
  {
    id: "maki",
    name: "Mäkinen · Häät",
    contact: "Anna Mäkinen",
    email: "anna.maki@example.fi",
    phone: "+358 40 123 4567",
    tags: ["Häät", "Helsinki"],
    activity: [
      { when: "12.6.", what: "Tarjous hyväksytty" },
      { when: "10.6.", what: "Puhelu · Peili XL" },
      { when: "8.6.", what: "Yhteydenotto verkkolomakkeella" },
    ],
  },
  {
    id: "tech",
    name: "Tech Oy · Yritystilaisuus",
    contact: "Jari Virtanen",
    email: "jari@tech.fi",
    phone: "+358 50 987 6543",
    tags: ["Yritys", "Espoo"],
    activity: [
      { when: "11.6.", what: "Tarjous lähetetty" },
      { when: "9.6.", what: "Sähköpostiyhteydenotto" },
    ],
  },
  {
    id: "korh",
    name: "Korhonen · Synttärit",
    contact: "Liisa Korhonen",
    email: "liisa@example.fi",
    phone: "+358 44 555 1212",
    tags: ["Synttärit", "Vantaa"],
    activity: [
      { when: "5.6.", what: "Tapahtuma toimitettu" },
      { when: "1.6.", what: "Muistutus lähetetty automaattisesti" },
    ],
  },
];

export default function CustomerCrm() {
  const [selected, setSelected] = useState("maki");
  const [query, setQuery] = useState("");
  const active = customers.find((c) => c.id === selected)!;

  const filtered = customers.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.contact.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="crm" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Asiakastiedot"
          title={
            <>
              Kaikki asiakastiedot
              <br />
              <em className="italic text-copper">yhdessä paikassa.</em>
            </>
          }
          description="Asiakkaiden ja yhteyshenkilöiden hallinta, haku ja tapahtumahistoria — tieto ei hajoa viesteihin ja muistiinpanoihin."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-hairline bg-paper p-6 shadow-card"
          >
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                Asiakasluettelo
              </p>
              <ClickHint>Valitse asiakas</ClickHint>
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hae asiakasta tai yhteyshenkilöä..."
              className="mt-4 w-full rounded-xl border border-hairline bg-cream px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-copper/40 focus:outline-none"
            />
            <div className="mt-4 flex flex-col gap-2">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${
                    selected === c.id
                      ? "border-copper bg-copper-wash/40"
                      : "border-hairline hover:border-copper/25"
                  }`}
                >
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <p className="mt-0.5 text-xs text-slate">{c.contact}</p>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease }}
            className="rounded-2xl border border-hairline bg-paper p-7 shadow-card md:p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
              Asiakaskortti
            </p>
            <h3 className="mt-2 font-display text-2xl font-light text-ink">
              {active.name}
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-hairline bg-cream/80 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Yhteyshenkilö
                </p>
                <p className="mt-1 text-sm text-ink">{active.contact}</p>
              </div>
              <div className="rounded-lg border border-hairline bg-cream/80 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Sähköposti
                </p>
                <p className="mt-1 text-sm text-ink">{active.email}</p>
              </div>
              <div className="rounded-lg border border-hairline bg-cream/80 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Puhelin
                </p>
                <p className="mt-1 text-sm text-ink">{active.phone}</p>
              </div>
              <div className="rounded-lg border border-hairline bg-cream/80 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Tunnisteet
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-copper/20 bg-copper-wash px-2.5 py-0.5 text-[10px] text-copper"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-hairline pt-6">
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Tapahtumahistoria
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {active.activity.map((a) => (
                  <li
                    key={`${a.when}-${a.what}`}
                    className="flex gap-4 text-sm text-slate"
                  >
                    <span className="shrink-0 font-mono text-xs text-faint">
                      {a.when}
                    </span>
                    <span>{a.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
