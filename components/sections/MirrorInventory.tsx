"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const mirrors = [
  {
    id: "m1",
    name: "Peili #1 · Classic",
    location: "Varasto · Helsinki",
    status: "available" as const,
    next: "17.8. · Tech Oy",
  },
  {
    id: "m2",
    name: "Peili #2 · Compact",
    location: "Kuljetuksessa",
    status: "booked" as const,
    next: "18.8. · Korhonen",
  },
  {
    id: "m3",
    name: "Peili #3 · XL",
    location: "Hotel Kämp",
    status: "in_use" as const,
    next: "16.8. · palautus",
  },
  {
    id: "m4",
    name: "Peili #4 · Classic",
    location: "Huollossa",
    status: "unavailable" as const,
    next: "22.8. · vapaa",
  },
];

const statusStyle = {
  available: "bg-verdant/10 text-verdant border-verdant/20",
  booked: "bg-copper-wash text-copper border-copper/20",
  in_use: "bg-sand text-ink border-hairline",
  unavailable: "bg-cream text-faint border-hairline",
};

const statusLabel = {
  available: "Vapaa",
  booked: "Varattu",
  in_use: "Tapahtumassa",
  unavailable: "Ei käytössä",
};

export default function MirrorInventory() {
  const [selected, setSelected] = useState("m3");
  const active = mirrors.find((m) => m.id === selected)!;

  return (
    <section id="mirrors" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="Peilivarasto"
          title={
            <>
              Sijainti ja saatavuus
              <br />
              <em className="italic text-copper">yhdellä silmäyksellä.</em>
            </>
          }
          description="Peilin sijainnin ja saatavuuden seuranta — näette missä kukin peili on ja milloin se on varattu, ilman erillisiä listoja tai taulukkolaskentaa."
        />

        <ClickHint className="mb-6">Valitse peili nähdäksesi tiedot</ClickHint>

        <div className="grid gap-6 lg:grid-cols-3">
          {mirrors.map((m, i) => (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => setSelected(m.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`rounded-2xl border p-6 text-left shadow-card transition-all ${
                selected === m.id
                  ? "border-copper bg-copper-wash/30"
                  : "border-hairline bg-paper hover:border-copper/25"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-lg font-light text-ink">{m.name}</p>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] ${statusStyle[m.status]}`}
                >
                  {statusLabel[m.status]}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate">{m.location}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-caps text-faint">
                Seuraavaksi: {m.next}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="mt-8 rounded-2xl border border-hairline bg-paper p-8 shadow-card"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Valittu peili
              </p>
              <h3 className="mt-2 font-display text-2xl font-light text-ink">
                {active.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                Jokaisella peilillä on oma tietue: nykyinen sijainti, tila
                (vapaa, varattu, tapahtumassa, huollossa) ja linkitys kalenterin
                tapahtumiin. Tiimi näkee heti, mikä peili on vapaana uuteen varaukseen.
              </p>
            </div>
            <div className="rounded-xl border border-hairline bg-cream/80 p-5">
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                Esimerkkiaikajana · {active.name}
              </p>
              <div className="mt-4 space-y-2">
                {[
                  { t: "14.8.", e: "Toimitus tapahtumapaikalle" },
                  { t: "15.–16.8.", e: "Häät · Mäkinen" },
                  { t: "16.8.", e: "Palautus varastoon" },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="flex gap-3 rounded-lg border border-hairline bg-paper px-3 py-2 text-sm"
                  >
                    <span className="font-mono text-xs text-faint">{row.t}</span>
                    <span className="text-slate">{row.e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
