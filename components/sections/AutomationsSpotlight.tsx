"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

type EmailPreview = {
  to: string;
  from: string;
  subject: string;
  body: string;
  audience: "team" | "customer";
};

const automations = [
  {
    id: "reminder",
    title: "Muistutus ennen tapahtumaa",
    trigger: "24 h ennen tapahtumaa",
    action: "Sähköposti vastuuhenkilölle / tiimille",
    timeline: ["Tapahtuma kalenterissa", "24 h ennen alkua", "Tiimin postilaatikko"],
    icon: ["M12 8v4l3 3", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"],
    email: {
      to: "operations@peilisi.fi",
      from: "Peilisi-alusta <notifications@peilisi.fi>",
      subject: "Huomenna: Häät · Mäkinen · Peili #3",
      body:
        "Hei,\n\nMuistutus huomisesta tapahtumasta:\n\nAsiakas: Mäkinen\nPeili: #3 (Classic Gold)\nPaikka: Hotel Kämp\nAika: klo 14.00\n\nAvaa tapahtuma alustalla →",
      audience: "team" as const,
    },
  },
  {
    id: "followup",
    title: "Jälkiseuranta tapahtuman jälkeen",
    trigger: "Tapahtuma merkitty toimitetuksi",
    action: "Tehtävä luodaan + sähköposti logistiikalle",
    timeline: ["Tapahtuma päättynyt", "Tila päivitetty", "Tehtävä + ilmoitus"],
    icon: ["M20 7L9 18l-5-5"],
    email: {
      to: "logistics@peilisi.fi",
      from: "Peilisi-alusta <notifications@peilisi.fi>",
      subject: "Tehtävä: Palauta Peili #3 varastolle",
      body:
        "Hei logistiikka,\n\nTapahtuma on toimitettu — varaa palautus:\n\nPeili: #3\nPaikka: Hotel Kämp\nMääräaika: 48 h kuluessa\n\nMerkitse valmiiksi alustalla kun tehty →",
      audience: "team" as const,
    },
  },
  {
    id: "quote-follow",
    title: "Tarjouksen seuranta",
    trigger: "Tarjous lähetetty, ei vastausta 3 päivään",
    action: "Muistutus myyntitiimille",
    timeline: ["Tarjous lähetetty", "3 pv, ei muutosta", "Myynnin postilaatikko"],
    icon: ["M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"],
    email: {
      to: "sales@peilisi.fi",
      from: "Peilisi-alusta <notifications@peilisi.fi>",
      subject: "Seuraa: Tech Oy · tarjous yhä auki",
      body:
        "Hei myynti,\n\nTech Oyn tarjous on ollut auki 3 päivää ilman tilamuutosta.\n\nAsiakas: Jari Virtanen\nTapahtuma: Yritysgala · 15.10.\nTarjouksen arvo: 2 400 €\n\nAvaa tarjous ja ota yhteyttä →",
      audience: "team" as const,
    },
  },
  {
    id: "lead",
    title: "Ilmoitus uudesta yhteydenotosta",
    trigger: "Yhteydenottolomake lähetetty",
    action: "Sähköposti + ilmoitus alustalla tiimille",
    timeline: ["Lomake peilisi.fi:ssä", "CRM-tietue luotu", "Tiimi ilmoitettu"],
    icon: ["M4 6h16v12H4z", "M4 8l8 5 8-5"],
    email: {
      to: "sales@peilisi.fi",
      from: "Peilisi-alusta <notifications@peilisi.fi>",
      subject: "Uusi yhteydenotto: Anna Korhonen · Häät",
      body:
        "Uusi yhteydenotto verkkosivulta:\n\nNimi: Anna Korhonen\nTapahtuma: Häät\nPäivämäärä: 22.9.\nViesti: Etsimme peiliä noin 120 vieraalle…\n\nAvaa CRM:ssä →",
      audience: "team" as const,
    },
  },
  {
    id: "thankyou",
    title: "Kiitosviesti tapahtuman jälkeen",
    trigger: "Tapahtuma merkitty valmiiksi",
    action: "Kiitosviesti asiakkaalle",
    timeline: ["Tapahtuma päättynyt", "Merkitty valmiiksi", "Asiakkaan postilaatikko"],
    icon: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
    email: {
      to: "anna.korhonen@example.fi",
      from: "Peilisi <hello@peilisi.fi>",
      subject: "Kiitos — tapahtumasi Peilisen kanssa",
      body:
        "Hei Anna,\n\nKiitos, että valitsitte Peilisen häihinne. Toivomme, että peili toi juhlaanne ripauksen erityistä.\n\nJos teillä on palautetta tai haluatte varata uudelleen, vastatkaa tähän viestiin.\n\nYstävällisin terveisin,\nPeilisi-tiimi",
      audience: "customer" as const,
    },
  },
];

const emailTypeExamples: Record<"team" | "customer", EmailPreview & { label: string; caption: string }> = {
  team: {
    label: "Tiimin ilmoitus",
    caption: "Menee tiimin postilaatikkoon — muistutukset, uudet yhteydenotot, tehtävät.",
    to: "sales@peilisi.fi",
    from: "Peilisi-alusta <notifications@peilisi.fi>",
    subject: "Uusi yhteydenotto: Anna Korhonen · Häät",
    body:
      "Uusi yhteydenotto verkkosivulta:\n\nNimi: Anna Korhonen\nTapahtuma: Häät · 22.9.\n\nAlusta loi CRM-tietueen automaattisesti. Avaa ja vastaa →",
    audience: "team",
  },
  customer: {
    label: "Asiakasviesti",
    caption: "Menee asiakkaalle — vahvistukset, kiitosviestit, päivitykset.",
    to: "anna.korhonen@example.fi",
    from: "Peilisi <hello@peilisi.fi>",
    subject: "Kiitos — tapahtumasi Peilisen kanssa",
    body:
      "Hei Anna,\n\nKiitos, että valitsitte Peilisen. Toivomme, että tapahtumanne oli juuri sellainen kuin toivoitte.\n\nYstävällisin terveisin,\nPeilisi-tiimi",
    audience: "customer",
  },
};

const emailRoles = [
  {
    id: "hsbridge",
    label: "HSBridge rakentaa",
    items: [
      "Milloin sähköposti lähtee — laukaisimet kalenteriin, tilaan tai lomakkeeseen",
      "Lähetyksen asetukset ja yhteys sähköpostidomainiin",
      "Muokattavat otsikko- ja sisältökentät alustalla",
      "Lähetysloki — mitä lähti ja milloin",
    ],
  },
  {
    id: "peilisi",
    label: "Peilisi toimittaa",
    items: [
      "Viestien sanamuoto — teidän sävy, suomen kieli, brändi",
      "Mitkä automaatiot otetaan käyttöön",
      "Kuka saa kunkin ilmoituksen",
    ],
  },
  {
    id: "meeting",
    label: "Vahvistetaan seuraavassa tapaamisessa",
    items: [
      "Vain tiimille vs. asiakkaalle menevät viestit",
      "Kuinka monta automaattista viestiä aloitetaan",
      "Kirjoittaako Peilisi tekstit vai mukautetaanko olemassa olevat",
    ],
  },
];

function AutomationIcon({ paths }: { paths: string[] }) {
  return (
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream text-copper">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

function EmailMock({
  preview,
  compact = false,
}: {
  preview: EmailPreview;
  compact?: boolean;
}) {
  const isTeam = preview.audience === "team";

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-paper shadow-card">
      <div className="flex items-center gap-2 border-b border-hairline bg-cream/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-sm ring-1 ring-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-sm ring-1 ring-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-sm ring-1 ring-hairline" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-caps text-faint">
          {isTeam ? "Tiimin postilaatikko" : "Asiakkaan postilaatikko"}
        </span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-caps ${
            isTeam
              ? "border border-verdant/25 bg-verdant/10 text-verdant"
              : "border border-copper/25 bg-copper-wash text-copper"
          }`}
        >
          {isTeam ? "Sisäinen" : "Asiakas"}
        </span>
      </div>

      <div className={compact ? "p-4" : "p-5 md:p-6"}>
        <div className="space-y-2 border-b border-hairline pb-4">
          <div className="flex gap-3 text-[11px]">
            <span className="min-w-[6.5rem] shrink-0 text-faint">Lähettäjä</span>
            <span className="min-w-0 break-words text-slate">{preview.from}</span>
          </div>
          <div className="flex gap-3 text-[11px]">
            <span className="min-w-[6.5rem] shrink-0 text-faint">Vastaanottaja</span>
            <span className="min-w-0 break-words text-slate">{preview.to}</span>
          </div>
          <div className="flex gap-3 text-[11px]">
            <span className="min-w-[6.5rem] shrink-0 text-faint">Aihe</span>
            <span className="min-w-0 break-words font-medium text-ink">{preview.subject}</span>
          </div>
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate">
          {preview.body}
        </p>
        {!compact && (
          <p className="mt-4 rounded-lg border border-copper/15 bg-copper-wash/30 px-3 py-2 text-[10px] text-slate">
            Havainnollistava esimerkki — lopullisen sanamuodon toimittaa Peilisi.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AutomationsSpotlight() {
  const [active, setActive] = useState("reminder");
  const [emailType, setEmailType] = useState<"team" | "customer">("team");
  const [roleTab, setRoleTab] = useState("hsbridge");

  const current = automations.find((a) => a.id === active)!;
  const roleContent = emailRoles.find((r) => r.id === roleTab)!;
  const typeExample = emailTypeExamples[emailType];

  return (
    <section id="automations" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          eyebrow="Automaatiot ja sähköposti"
          title={
            <>
              Esimerkkejä viesteistä,
              <br />
              <em className="italic text-copper">joita alusta voi lähettää.</em>
            </>
          }
          description="Havainnollistavia esikatseluja — tiimin ilmoitukset ja asiakasviestit. Sanamuoto ja laajuus vahvistetaan seuraavassa tapaamisessa."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="mt-14 grid gap-8 lg:grid-cols-2"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
              Kaksi automaattisen viestin tyyppiä
            </p>
            <h3 className="mt-2 font-display text-2xl font-light text-ink">
              Kenelle viesti menee?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Useimmat automaatiot alkavat sisäisillä tiimilmoituksilla. Asiakasviestit — kuten
              kiitosviestit tai vahvistukset — käyttävät samaa mekanismia, mutta menevät asiakkaan
              postilaatikkoon. Sisältö ja laajuus vahvistetaan seuraavassa tapaamisessa.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ClickHint>Vaihda tyyppiä</ClickHint>
              <div className="flex flex-wrap gap-2">
              {(["team", "customer"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEmailType(type)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                    emailType === type
                      ? "border-copper bg-copper-wash text-copper"
                      : "border-hairline text-slate hover:border-copper/30"
                  }`}
                >
                  {emailTypeExamples[type].label}
                </button>
              ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={emailType}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease }}
                className="mt-4 text-sm text-slate"
              >
                {typeExample.caption}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-verdant/20 bg-verdant/5 p-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-verdant">
                  Tyypillinen aloituspiste
                </p>
                <p className="mt-2 text-sm text-slate">
                  Sisäiset ilmoitukset — muistutukset ennen tapahtumia, uudet yhteydenotot ja
                  tehtävät tiimille.
                </p>
              </div>
              <div className="rounded-xl border border-copper/20 bg-copper-wash/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                  Asiakasviestit
                </p>
                <p className="mt-2 text-sm text-slate">
                  Kiitosviestit, varausvahvistukset ja seurannat — lähetetään teidän domainista
                  Peilisen toimittamalla sanamuodolla.
                </p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={emailType}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <EmailMock preview={typeExample} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
            Esimerkkiautomaatioita · havainnollistava
          </p>
          <h3 className="mt-2 font-display text-2xl font-light text-ink">
            Valitse esimerkki — näe viesti
          </h3>

          <ClickHint className="mt-2">Valitse esimerkki alta</ClickHint>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div className="flex flex-col gap-2">
              {automations.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                    active === a.id
                      ? "border-copper bg-copper-wash/40"
                      : "border-hairline bg-paper hover:border-copper/25"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AutomationIcon paths={a.icon} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-ink">{a.title}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-caps ${
                            a.email.audience === "team"
                              ? "bg-verdant/10 text-verdant"
                              : "bg-copper-wash text-copper"
                          }`}
                        >
                          {a.email.audience === "team" ? "Tiimi" : "Asiakas"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-slate">{a.email.subject}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-caps text-faint">
                  {current.title}
                </p>
                <EmailMock preview={current.email} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="mt-16 rounded-2xl border border-hairline bg-paper p-8 shadow-card"
        >
          <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
            Vastuunjako
          </p>
          <h3 className="mt-2 font-display text-2xl font-light text-ink">
            Kuka tekee mitä
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate">
            HSBridge rakentaa teknisen rungon — laukaisimet, ajastukset, lähetyksen ja muokattavat
            kentät. Peilisi toimittaa viestien sanamuodon ja päättää, mitkä automaatiot otetaan käyttöön.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {emailRoles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoleTab(r.id)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                  roleTab === r.id
                    ? "border-copper bg-copper-wash text-copper"
                    : "border-hairline text-slate hover:border-copper/30"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <motion.ul
            key={roleTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="mt-5 space-y-3"
          >
            {roleContent.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
