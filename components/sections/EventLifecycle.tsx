"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

type EventView = "upcoming" | "completed";

const upcomingEvents = [
  { date: "15.8.2026", client: "Mäkinen · häät", mirror: "Peili #3", stage: "Vahvistettu" },
  { date: "17.8.2026", client: "Tech Oy · yritystilaisuus", mirror: "Peili #1", stage: "Tarjous auki" },
  { date: "22.8.2026", client: "Virtanen · synttärit", mirror: "Peili #4", stage: "Vahvistettu" },
  { date: "30.8.2026", client: "Design Week", mirror: "Peili #2", stage: "Vahvistettu" },
];

const completedSample = [
  { date: "8.6.2026", client: "Korhonen · synttärit", mirror: "Peili #2", stage: "Jälkiseuranta ok" },
  { date: "24.5.2026", client: "Lahti corporate gala", mirror: "Peili #1", stage: "Laskutus ok" },
  { date: "12.5.2026", client: "Helsinki summer party", mirror: "Peili #3", stage: "Arkistoitu" },
];

const flowSteps = [
  {
    label: "Tulevat",
    detail: "Hallintanäkymä, kalenteri ja prosessi näyttävät aktiiviset ja tulevat tapahtumat.",
  },
  {
    label: "Tapahtumapäivä",
    detail: "Tiimi työskentelee päivän näkymästä — peilit, paikka ja yhteystiedot käden ulottuvilla.",
  },
  {
    label: "Valmis",
    detail: "Merkitään valmiiksi tapahtuman ja jälkiseurannan jälkeen. Poistuu päivän näkymistä.",
  },
  {
    label: "Arkisto",
    detail: "Säilytetään pysyvästi. Haettava lista — ei sekoitu tuleviin töihin.",
  },
];

export default function EventLifecycle() {
  const [view, setView] = useState<EventView>("upcoming");
  const [year, setYear] = useState("2026");
  const [search, setSearch] = useState("");

  const completedTotal = 247;
  const pageSize = 50;
  const filteredCompleted = completedSample.filter(
    (e) => !search || e.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="events-lifecycle" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03b"
          eyebrow="Tapahtumat · tulevat ja valmiit"
          title={
            <>
              Päivän työ pysyy näkyvissä.
              <br />
              <em className="italic text-copper">Historia pysyy löydettävissä.</em>
            </>
          }
          description="Havainnollistava näkymä siitä, miten tulevat ja valmiit tapahtumat voidaan erottaa — hallintanäkymä pysyy kevyenä, vaikka menneitä tapahtumia olisi satoja. Tarkat säännöt vahvistetaan seuraavassa tapaamisessa."
        />

        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {flowSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="relative rounded-xl border border-hairline bg-paper p-5 shadow-card"
            >
              <span className="font-mono text-xs text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-light text-ink">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{step.detail}</p>
              {i < flowSteps.length - 1 && (
                <span
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-faint lg:inline"
                  aria-hidden
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-hairline bg-paper p-6 shadow-card"
          >
            <ClickHint className="mb-4">Vaihda näkymää tai selaa arkistoa</ClickHint>
            <div className="flex gap-2">
              {(
                [
                  ["upcoming", "Tulevat"],
                  ["completed", "Valmiit"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                    view === id
                      ? "border-copper bg-copper-wash text-copper"
                      : "border-hairline text-slate hover:border-copper/30"
                  }`}
                >
                  {label}
                  {id === "completed" && (
                    <span className="ml-1.5 text-faint">({completedTotal})</span>
                  )}
                </button>
              ))}
            </div>

            {view === "upcoming" ? (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Oletusnäkymä · seuraavat 30 päivää
                </p>
                <div className="mt-3 space-y-2">
                  {upcomingEvents.map((e) => (
                    <div
                      key={e.client + e.date}
                      className="flex items-center justify-between rounded-lg border border-hairline bg-cream/50 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm text-ink">{e.client}</p>
                        <p className="text-xs text-slate">
                          {e.date} · {e.mirror}
                        </p>
                      </div>
                      <span className="text-[10px] text-copper">{e.stage}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-faint">
                  Kalenteri ja hallintanäkymä lähtevät tästä — vain se, mitä tiimi tarvitsee nyt.
                </p>
              </div>
            ) : (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Tapahtuma-arkisto · haku ja suodatus
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Hae menneitä tapahtumia..."
                    className="min-w-[140px] flex-1 rounded-lg border border-hairline bg-cream px-3 py-2 text-xs text-ink placeholder:text-faint focus:border-copper/40 focus:outline-none"
                  />
                  {["2024", "2025", "2026"].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-[10px] ${
                        year === y
                          ? "border-copper bg-copper-wash text-copper"
                          : "border-hairline text-slate"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                <div className="mt-3 space-y-2">
                  {filteredCompleted.map((e) => (
                    <div
                      key={e.client + e.date}
                      className="flex items-center justify-between rounded-lg border border-hairline bg-cream/30 px-4 py-3 opacity-90"
                    >
                      <div>
                        <p className="text-sm text-ink">{e.client}</p>
                        <p className="text-xs text-slate">
                          {e.date} · {e.mirror}
                        </p>
                      </div>
                      <span className="text-[10px] text-faint">{e.stage}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                  <p className="font-mono text-[10px] text-faint">
                    Näytetään 1–{pageSize} / {completedTotal}
                  </p>
                  <div className="flex gap-1">
                    {["←", "→"].map((arrow) => (
                      <span
                        key={arrow}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-hairline text-xs text-slate"
                      >
                        {arrow}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
              className="rounded-2xl border border-copper/20 bg-copper-wash/30 p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Minne sadat valmiit tapahtumat menevät
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Ei hallintanäkymään</strong> — vain
                    lukumäärä ja linkki, esim. &quot;247 valmista tapahtumaa&quot;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Oma arkistolista</strong> — haku,
                    suodatus vuoden tai asiakkaan mukaan, 50 kerrallaan
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Asiakaskortilla</strong> — koko
                    historia kyseiselle asiakkaalle, menneet ja tulevat yhdessä
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Kalenterin kytkin</strong> — &quot;Näytä
                    menneet&quot; oletuksena pois, jotta viikkonäkymä pysyy siistinä
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="rounded-2xl border border-hairline bg-paper p-6 shadow-card"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                Milloin tapahtuma siirtyy &quot;valmiiksi&quot;?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Vaihtoehtoja sovitaan seuraavassa tapaamisessa — esimerkiksi manuaalisesti kun tiimi
                merkitsee jälkiseurannan valmiiksi, automaattisesti tapahtumapäivän jälkeen tietyn
                määrän päiviä, tai kun laskutus on merkitty hoidetuksi. Mitään ei poisteta; se vain
                poistuu aktiivisista näkymistä.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="rounded-xl border border-hairline bg-cream/80 px-5 py-4 text-xs leading-relaxed text-faint"
            >
              Havainnollistava — arkistosäännöt, säilytys ja vientitarpeet voidaan lisätä tai
              muuttaa, kun määrittelemme laajuuden yhdessä.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
