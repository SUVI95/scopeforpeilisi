"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    id: "lead",
    label: "Yhteydenotto",
    short: "Uusi yhteydenotto",
    detail:
      "Asiakas ottaa yhteyttä verkkolomakkeella, sähköpostilla tai puhelimella. Tiedot tallentuvat järjestelmään ja näkyvät tiimin jonossa.",
    example: "Häät · Anna M. · 15.8.2026",
    color: "bg-sand text-ink border-hairline",
  },
  {
    id: "offer",
    label: "Tarjous",
    short: "Tarjous lähetetty",
    detail:
      "Tarjouksen tila seurataan alustalla — asiakirjoja ei luoda järjestelmässä, mutta tila on selkeä: luonnos, lähetetty, hyväksytty tai hylätty.",
    example: "Peili XL + kuljetus · 890 €",
    color: "bg-copper-wash text-copper border-copper/20",
  },
  {
    id: "confirmed",
    label: "Vahvistettu",
    short: "Varaus vahvistettu",
    detail:
      "Kun tarjous hyväksytään, tapahtuma vahvistuu. Peili varataan kalenteriin ja näkyy saatavuusnäkymässä.",
    example: "Peili #3 · Hotel Kämp · 15.8.",
    color: "bg-paper text-ink border-copper/30",
  },
  {
    id: "event",
    label: "Tapahtuma",
    short: "Toimitettu",
    detail:
      "Tapahtuman aikana ja jälkeen tiimillä on koko kuva yhdellä silmäyksellä. Automaatiot voivat muistuttaa etukäteen ja luoda jatkotehtäviä jälkeenpäin.",
    example: "Hääjuhla · 120 vierasta · Valmis",
    color: "bg-verdant/10 text-verdant border-verdant/20",
  },
  {
    id: "invoicing",
    label: "Laskutus ok",
    short: "Valmis laskutettavaksi",
    detail:
      "Alusta seuraa, milloin laskutus on hoidettu. Varsinainen laskujen laatiminen tapahtuu erillisessä työkalussa — projektin ulkopuolella.",
    example: "Merkitty valmiiksi · laskutus ulkoisessa järjestelmässä",
    color: "bg-cream text-slate border-hairline",
  },
  {
    id: "followup",
    label: "Jälkiseuranta",
    short: "Tapahtuman jälkeinen seuranta",
    detail:
      "Sisäiset jatkotehtävät ja tiimilmoitukset viimeistelevät prosessin jokaisen tapahtuman jälkeen.",
    example: "Jatkotehtävä luotu · peilin palautus · tapaus arkistoitu",
    color: "bg-copper-wash/50 text-copper border-copper/20",
  },
];

export default function WorkflowPipeline() {
  const [active, setActive] = useState("confirmed");
  const current = stages.find((s) => s.id === active)!;
  const activeIndex = stages.findIndex((s) => s.id === active);

  return (
    <section id="pipeline" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          eyebrow="Koko prosessi"
          title={
            <>
              Ensimmäisestä yhteydenotosta
              <br />
              <em className="italic text-copper">tapahtumaan ja laskutukseen.</em>
            </>
          }
          description="Havainnollistava näkymä varauksen etenemisestä — vaiheet ja kentät voidaan tarkentaa tapaamisessa."
        />

        <ClickHint className="mb-4 hidden md:flex">Klikkaa vaihetta tutkiaksesi</ClickHint>
        <div className="mb-10 hidden md:block">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-mono transition-all ${
                    active === s.id
                      ? "border-copper bg-copper text-paper shadow-lift"
                      : "border-hairline bg-paper text-slate hover:border-copper/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`max-w-[5rem] text-center text-[10px] uppercase tracking-caps ${
                    active === s.id ? "text-copper" : "text-faint"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="rounded-2xl border border-hairline bg-paper p-8 shadow-card"
          >
            <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
              Vaihe {String(activeIndex + 1).padStart(2, "0")} · {current.label}
            </p>
            <h3 className="mt-3 font-display text-3xl font-light text-ink">
              {current.short}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate">
              {current.detail}
            </p>
            <div className={`mt-6 rounded-xl border px-4 py-3 text-sm ${current.color}`}>
              Esimerkki: {current.example}
            </div>
          </motion.div>

          <div className="flex flex-col gap-3 md:hidden">
            {stages.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  active === s.id
                    ? "border-copper bg-copper-wash/50"
                    : "border-hairline bg-paper"
                }`}
              >
                <span className="font-mono text-xs text-copper">{s.label}</span>
                <p className="mt-1 text-sm text-ink">{s.short}</p>
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-hairline bg-paper p-7 shadow-card"
          >
            <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
              Esimerkkinäkymä · Asiakkaan tila
            </p>
            <div className="mt-5 space-y-3">
              {[
                { client: "Häät · Mäkinen", status: "Vahvistettu", stage: "confirmed" },
                { client: "Yritystilaisuus · Tech Oy", status: "Tarjous lähetetty", stage: "offer" },
                { client: "Synttärit · Korhonen", status: "Tapahtuma toimitettu", stage: "event" },
                { client: "Messu · Design Week", status: "Uusi yhteydenotto", stage: "lead" },
              ].map((row) => (
                <div
                  key={row.client}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                    row.stage === active
                      ? "border-copper/40 bg-copper-wash/30"
                      : "border-hairline bg-cream/60"
                  }`}
                >
                  <span className="text-sm text-ink">{row.client}</span>
                  <span className="text-xs text-slate">{row.status}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-caps text-faint">
              Kaikki asiakkaat yhdessä näkymässä · haku ja suodatus
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
