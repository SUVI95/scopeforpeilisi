"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const weekEvents = [
  {
    id: "thu",
    day: "To",
    date: "15.8.",
    label: "Häät · Mäkinen",
    location: "Hotel Kämp, Helsinki",
    mirror: "Peili #3 · XL",
    status: "Vahvistettu",
  },
  {
    id: "sat",
    day: "La",
    date: "17.8.",
    label: "Yritystilaisuus · Tech Oy",
    location: "Messukeskus, Helsinki",
    mirror: "Peili #1 · Classic",
    status: "Tarjous odottaa",
  },
  {
    id: "sun",
    day: "Su",
    date: "18.8.",
    label: "Synttärit · Korhonen",
    location: "Yksityistila · Vantaa",
    mirror: "Peili #2 · Compact",
    status: "Toimitettu",
  },
];

const views = [
  { id: "Day", label: "Päivä" },
  { id: "Week", label: "Viikko" },
  { id: "Month", label: "Kuukausi" },
  { id: "Agenda", label: "Lista" },
];

export default function CalendarSpotlight() {
  const [selected, setSelected] = useState("thu");
  const [view, setView] = useState("Week");
  const active = weekEvents.find((e) => e.id === selected)!;
  const viewLabel = views.find((v) => v.id === view)?.label ?? view;

  return (
    <section id="calendar" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Kalenteri"
          title={
            <>
              Tapahtumat ja varaukset
              <br />
              <em className="italic text-copper">samassa kalenterissa.</em>
            </>
          }
          description="Tapahtumien hallinta ja kalenterinäkymä — näette heti, mikä tapahtuma on milloin ja missä, linkitettynä asiakastietoihin ja peilivarauksiin."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="gpu rounded-2xl border border-hairline bg-paper p-6 shadow-card md:p-8"
          >
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Kalenterinäkymä · {viewLabel}
                </p>
                <p className="mt-1 font-display text-xl font-light text-ink">
                  Elokuu 2026
                </p>
              </div>
              <div className="flex gap-1.5">
                {views.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setView(v.id)}
                    className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] transition-colors ${
                      view === v.id ? "bg-copper-wash text-copper" : "text-faint hover:text-slate"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <ClickHint className="mb-4">Valitse tapahtuma viikolta</ClickHint>

            <div className="flex flex-col gap-3">
              {weekEvents.map((ev, i) => (
                <motion.button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelected(ev.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all ${
                    selected === ev.id
                      ? "border-copper ring-1 ring-copper/20 bg-copper-wash/30"
                      : "border-hairline bg-cream/60 hover:border-copper/25"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">{ev.label}</p>
                    <p className="mt-0.5 text-xs text-slate">
                      {ev.day} {ev.date} · {ev.location}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-caps text-copper">
                    {ev.status}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="rounded-2xl border border-copper/25 bg-copper-wash/50 p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Valittu tapahtuma
              </p>
              <h3 className="mt-2 font-display text-2xl font-light text-ink">
                {active.label}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-slate">
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Päivä</span>
                  {active.day} {active.date}
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Paikka</span>
                  {active.location}
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Peili</span>
                  {active.mirror}
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Tila</span>
                  {active.status}
                </li>
              </ul>
            </motion.div>

            <div className="rounded-2xl border border-hairline bg-paper p-7 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                Mitä kalenteri tekee
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "Näyttää kaikki tapahtumat päivä-, viikko- ja kuukausinäkymissä",
                  "Linkittää tapahtuman asiakkaaseen, paikkaan ja peiliin",
                  "Näyttää varauksen tilan selkeästi koko tiimille",
                  "Toimii automaatioiden pohjana (muistutukset, jatkotehtävät)",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
