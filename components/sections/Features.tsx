"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  {
    id: "crm",
    title: "Asiakkaat ja yhteystiedot",
    summary: "Kaikki asiakastiedot yhdessä paikassa — haku ja tapahtumahistoria mukana.",
    scope:
      "Asiakaskortit yhteyshenkilöineen, tunnisteineen, muistiinpanoineen ja aikajärjestyksessä olevine tapahtumineen. Haku ja suodatus nimen, tapahtumatyypin tai tilan mukaan. Linkitys tapahtumiin, tarjouksiin ja peilivarauksiin.",
    icon: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M6 20v-1a6 6 0 0 1 12 0v1"],
    linkedSection: "#crm",
    featured: true,
  },
  {
    id: "pipeline",
    title: "Tapahtuma- ja varausten seuranta",
    summary: "Ensimmäisestä yhteydenotosta tapahtumaan ja laskutukseen — selkeä tila per asiakas.",
    scope:
      "Prosessivaiheet: yhteydenotto → tarjous → vahvistettu → tapahtuma → laskutus ok → jälkiseuranta. Jokaisella asiakkaalla näkyy nykyinen vaihe. Tiimin työjono ja suodatus tilan mukaan.",
    icon: ["M4 19V5", "M4 19h16", "M8 15l3-3 3 3 4-5"],
    linkedSection: "#pipeline",
    featured: true,
  },
  {
    id: "calendar",
    title: "Tapahtumahallinta ja kalenteri",
    summary: "Mikä tapahtuma milloin ja missä — yhteydessä kalenterinäkymään.",
    scope:
      "Päivä-, viikko-, kuukausi- ja listanäkymät. Tapahtumat linkitettynä asiakkaaseen, paikkaan ja peiliin. Tapahtuman tila ja tiimin näkyvyys. Suodatus päivämäärän, asiakkaan ja tilan mukaan.",
    icon: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
    linkedSection: "#calendar",
    featured: true,
  },
  {
    id: "mirrors",
    title: "Peilien sijainti ja saatavuus",
    summary: "Selkeä kuva siitä, missä kukin peili on ja milloin se on varattu.",
    scope:
      "Peilitiedot: nimi, tyyppi, nykyinen sijainti, tila (vapaa, varattu, käytössä, huollossa). Linkitys kalenterivarauksiin. Aikajana tuleville ja menneille varauksille.",
    icon: ["M4 4h16v16H4z", "M8 8h8v8H8z"],
    linkedSection: "#mirrors",
  },
  {
    id: "quotes",
    title: "Tarjous- ja sopimusseuranta",
    summary: "Ei dokumenttien luontia — selkeä tilaseuranta per asiakas.",
    scope:
      "Tarjous- ja sopimusmerkinnät tiloineen (luonnos, lähetetty, hyväksytty, allekirjoitettu, hylätty). Linkitys asiakkaaseen ja tapahtumaan. Muistiinpanot ja päivityshistoria.",
    icon: ["M4 6h16v14H4z", "M8 10h8", "M8 14h5"],
    linkedSection: "#quotes",
  },
  {
    id: "automations",
    title: "Automaatiot",
    summary: "Muistutukset ennen tapahtumaa ja automaattiset jälkiseurannan tehtävät sen jälkeen.",
    scope:
      "Ajastetut muistutukset tiimille ennen tapahtumia. Automaattinen jälkiseurannan tehtävä toimituksen jälkeen (esim. peilin palautus). Tarjouksen seuranta ja muistutukset. Laukaisimet linkitettynä kalenteriin ja tilamuutoksiin.",
    icon: ["M12 2v4", "M12 18v4", "M4.93 4.93l2.83 2.83", "M16.24 16.24l2.83 2.83"],
    linkedSection: "#automations",
    featured: true,
  },
  {
    id: "email",
    title: "Sähköpostiautomaatio",
    summary: "Automaattiset lähetykset laukaisimen mukaan — tiimin ilmoitukset ja asiakasviestit.",
    scope:
      "HSBridge: laukaisimet (kalenteri, tila, lomake), lähetyksen asetukset, muokattavat otsikko- ja sisältökentät, lähetysloki. Peilisi: viestien sanamuoto ja mitkä automaatiot otetaan käyttöön. Asiakkaalle menevät viestit määritellään ja vahvistetaan seuraavassa tapaamisessa.",
    icon: ["M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"],
    linkedSection: "#automations",
  },
  {
    id: "webform",
    title: "Verkkosivun yhteydenottolomake",
    summary: "Uudet yhteydenotot suoraan CRM:ään — tekninen tarkistus ennen toteutusta.",
    scope:
      "Lomakekentät (nimi, yhteystiedot, tapahtumatyyppi, päivämäärä, viesti) synkronoituna CRM:ään. Automaattinen asiakastietueen luonti ja tiimin ilmoitus. Automaattiset vastaukset yhteydenottajalle vahvistetaan seuraavassa tapaamisessa.",
    icon: ["M4 6h16", "M4 12h10", "M4 18h6"],
    linkedSection: "#contact-form",
  },
  {
    id: "auth",
    title: "Kirjautuminen ja käyttöoikeudet",
    summary: "Turvallinen sisäänkirjautuminen ja roolipohjainen pääsynhallinta.",
    scope:
      "Turvallinen salasanakirjautuminen. Roolit ja oikeudet (esim. ylläpito, myynti, operatiivinen). Käyttäjäkohtainen näkyvyys. Istunnon hallinta ja uloskirjautuminen.",
    icon: ["M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"],
    linkedSection: "#security",
  },
];

function CapabilityCard({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const isFeatured = "featured" in cap && cap.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease }}
      className="gpu"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex h-full w-full cursor-pointer flex-col rounded-2xl border bg-paper p-7 text-left shadow-card transition-all duration-400 ${
          isFeatured
            ? "border-copper/30"
            : open
              ? "border-copper/40 shadow-lift"
              : "border-hairline hover:border-copper/30 hover:shadow-lift"
        }`}
      >
        {isFeatured && (
          <span className="mb-4 inline-flex w-fit rounded-full border border-copper/30 bg-copper-wash px-3 py-1 font-mono text-[10px] uppercase tracking-caps text-copper">
            Keskeinen keskustelualue
          </span>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-copper">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl font-light text-ink">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {cap.summary}
              </p>
            </div>
          </div>
          <span className="mt-1 shrink-0 text-copper">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {cap.icon.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-hairline pt-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Havainnollistava laajuus
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {cap.scope}
                </p>
                {"linkedSection" in cap && cap.linkedSection && (
                  <a
                    href={cap.linkedSection}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-block cursor-pointer text-xs text-copper underline-offset-2 hover:underline"
                  >
                    Katso tarkempi osio
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-caps text-faint">
          {open ? "Sulje" : "Näytä laajuus"}
        </p>
      </button>
    </motion.article>
  );
}

export default function Features() {
  return (
    <section id="capabilities" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="08"
          eyebrow="Koko laajuus"
          title={
            <>
              Yhdeksän aluetta.
              <br />
              <em className="italic text-copper">Voucher-budjetin puitteissa.</em>
            </>
          }
          description="Yhteenveto siitä, mitä olemme tähän mennessä ajatelleet. Jokainen alue avautuu havainnollistavaksi — kenttiä voidaan lisätä, jos jokin puuttuu, ja lopullinen rakenne sekä ominaisuudet sovitaan seuraavassa tapaamisessa."
        />

        <ClickHint className="mb-6">Klikkaa korttia nähdäksesi laajuuden</ClickHint>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {capabilities.map((c, i) => (
            <CapabilityCard key={c.id} cap={c} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm leading-relaxed text-slate">
          Toimitus ja 15 päivän testausjakso käydään läpi Toimitus-osiossa.
          Mikään tästä ei ole lopullista ennen kuin sovimme yhdessä seuraavassa tapaamisessa.
        </p>
      </div>
    </section>
  );
}
