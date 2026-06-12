"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const tabs = [
  { id: "overview", label: "Hallintanäkymä" },
  { id: "events", label: "Tapahtumat" },
  { id: "pipeline", label: "Prosessi" },
  { id: "mirrors", label: "Peilit" },
  { id: "automations", label: "Tehtävät ja sähköposti" },
  { id: "form", label: "Verkkolomake" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type EventTab = "upcoming" | "completed";

const pipelineStages = [
  { id: "lead", label: "Yhteydenotto", color: "bg-sand" },
  { id: "offer", label: "Tarjous", color: "bg-copper-wash" },
  { id: "confirmed", label: "Vahvistettu", color: "bg-copper/15" },
  { id: "event", label: "Tapahtuma", color: "bg-verdant/10" },
  { id: "invoicing", label: "Laskutus ok", color: "bg-cream" },
  { id: "followup", label: "Jälkiseuranta", color: "bg-paper" },
];

const pipelineCards: Record<string, { title: string; meta: string }[]> = {
  lead: [{ title: "Design Week -yhteydenotto", meta: "Verkkolomake · tänään" }],
  offer: [
    { title: "Tech Oy · yritystilaisuus", meta: "Tarjous lähetetty · 3 pv sitten" },
    { title: "Virtanen · synttärit", meta: "Tarjousluonnos" },
  ],
  confirmed: [{ title: "Mäkinen · häät", meta: "Peili #3 · 15.8." }],
  event: [{ title: "Korhonen · synttärit", meta: "Käynnissä · tänään" }],
  invoicing: [{ title: "Lahti corporate gala", meta: "Valmis laskutettavaksi" }],
  followup: [{ title: "Helsinki summer party", meta: "Jälkiseuranta valmis" }],
};

const upcomingEvents = [
  { date: "15.8.", client: "Mäkinen · häät", mirror: "Peili #3", status: "Vahvistettu" },
  { date: "17.8.", client: "Tech Oy · yritystilaisuus", mirror: "Peili #1", status: "Tarjous auki" },
  { date: "18.8.", client: "Korhonen · synttärit", mirror: "Peili #2", status: "Tapahtumapäivä" },
];

const openOffers = [
  { client: "Tech Oy", value: "1 240 €", age: "3 pv" },
  { client: "Virtanen", value: "650 €", age: "1 pv" },
];

const mirrors = [
  { name: "Peili #1", status: "Varattu", util: 78 },
  { name: "Peili #2", status: "Käytössä", util: 92 },
  { name: "Peili #3", status: "Varattu", util: 85 },
  { name: "Peili #4", status: "Vapaa", util: 34 },
];

const tasks = [
  { type: "Muistutus", text: "Ennakkotarkistus · Mäkinen häät · huomenna klo 09.00", auto: true },
  { type: "Sähköposti", text: "Tarjouksen seuranta · Tech Oy · ei vastausta 3 pv", auto: true },
  { type: "Tehtävä", text: "Palauta Peili #2 varastolle · Korhonen-tapahtuman jälkeen", auto: true },
  { type: "Tehtävä", text: "Jälkiseuranta valmis · Helsinki summer party", auto: true },
];

const weekDays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
const mirrorCalendar = [
  ["", "", "M2", "M3", "M3", "M1", "M2"],
  ["M4", "M1", "M1", "M3", "M2", "", ""],
];

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-hairline bg-paper p-4">
      <p className="font-mono text-[9px] uppercase tracking-caps text-faint">{label}</p>
      <p className={`mt-1 font-display text-2xl font-light ${accent ? "text-copper" : "text-ink"}`}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-slate">{sub}</p>
    </div>
  );
}

function EventsPanel() {
  const [eventView, setEventView] = useState<EventTab>("upcoming");
  const archiveTotal = 247;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(
          [
            ["upcoming", "Tulevat · 6"],
            ["completed", `Valmiit · ${archiveTotal}`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setEventView(id)}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-[10px] transition-colors ${
              eventView === id
                ? "border-copper bg-copper-wash text-copper"
                : "border-hairline text-slate"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {eventView === "upcoming" ? (
        <div className="rounded-xl border border-hairline bg-paper p-4">
          <p className="text-[11px] text-slate">
            Aktiivinen kalenteri ja hallintanäkymä — vain seuraavat tapahtumat.
          </p>
          <div className="mt-3 space-y-2">
            {upcomingEvents.map((e) => (
              <div
                key={e.client}
                className="flex justify-between rounded-lg border border-hairline bg-cream/50 px-3 py-2 text-xs"
              >
                <span className="text-ink">{e.client}</span>
                <span className="text-faint">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-hairline bg-paper p-4">
          <p className="text-[11px] text-slate">
            Arkisto — sivutettu lista, ei näy päänäkymässä.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-md border border-hairline bg-cream/60 px-3 py-1.5 text-[10px] text-faint">
              Hae menneitä tapahtumia...
            </div>
            <span className="rounded-md border border-hairline px-2 py-1.5 text-[10px] text-copper">
              2026
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            {["Korhonen · synttärit · kesä", "Lahti gala · touko", "… +244 muuta"].map(
              (row) => (
                <div
                  key={row}
                  className="rounded-md border border-hairline bg-cream/30 px-3 py-1.5 text-[10px] text-slate"
                >
                  {row}
                </div>
              )
            )}
          </div>
          <p className="mt-3 font-mono text-[9px] text-faint">
            Sivu 1 / 5 · 50 kerrallaan
          </p>
        </div>
      )}
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Tulevat tapahtumat" value="6" sub="Seuraavat 14 pv" accent />
        <StatCard label="Valmiit" value="247" sub="Arkistossa · haettavissa" />
        <StatCard label="Peilien käyttöaste" value="72 %" sub="Koko kaluston keskiarvo" accent />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-paper p-4">
          <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
            Tulevat tapahtumat
          </p>
          <div className="mt-3 space-y-2">
            {upcomingEvents.map((e) => (
              <div
                key={e.client}
                className="flex items-center justify-between rounded-lg border border-hairline bg-cream/50 px-3 py-2"
              >
                <div>
                  <p className="text-xs font-medium text-ink">{e.client}</p>
                  <p className="text-[10px] text-slate">
                    {e.date} · {e.mirror}
                  </p>
                </div>
                <span className="rounded-full bg-copper-wash px-2 py-0.5 text-[9px] text-copper">
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-paper p-4">
          <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
            Avoimet tarjoukset
          </p>
          <div className="mt-3 space-y-2">
            {openOffers.map((o) => (
              <div
                key={o.client}
                className="flex items-center justify-between rounded-lg border border-hairline bg-cream/50 px-3 py-2"
              >
                <p className="text-xs font-medium text-ink">{o.client}</p>
                <div className="text-right">
                  <p className="text-xs text-copper">{o.value}</p>
                  <p className="text-[10px] text-faint">{o.age}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-caps text-faint">
            Peilien käyttöaste
          </p>
          <div className="mt-2 space-y-2">
            {mirrors.map((m) => (
              <div key={m.name}>
                <div className="mb-1 flex justify-between text-[10px]">
                  <span className="text-slate">{m.name}</span>
                  <span className="text-faint">{m.util}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full bg-copper transition-all"
                    style={{ width: `${m.util}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelinePanel() {
  const [activeStage, setActiveStage] = useState("confirmed");

  return (
    <div>
      <p className="mb-3 text-[11px] text-slate">
        Tapahtuma- ja varausvaiheet — kortit siirtyvät sarakkeiden välillä valmiassa alustassa.
      </p>

      {/* Mobile stage picker */}
      <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
        {pipelineStages.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveStage(stage.id)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] ${
              activeStage === stage.id
                ? "border-copper bg-copper-wash text-copper"
                : "border-hairline text-slate"
            }`}
          >
            {stage.label}
          </button>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:hidden">
        {(pipelineCards[activeStage] ?? []).map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-hairline bg-paper p-3 shadow-sm"
          >
            <p className="text-xs text-ink">{card.title}</p>
            <p className="mt-0.5 text-[10px] text-slate">{card.meta}</p>
          </div>
        ))}
      </div>

      {/* Desktop kanban */}
      <div className="mt-2 hidden gap-2 lg:grid lg:grid-cols-6">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="flex flex-col">
            <p className="mb-2 font-mono text-[8px] uppercase tracking-caps text-faint">
              {stage.label}
            </p>
            <div
              className={`min-h-[120px] flex-1 space-y-2 rounded-lg border border-hairline ${stage.color} p-2`}
            >
              {(pipelineCards[stage.id] ?? []).map((card) => (
                <div
                  key={card.title}
                  className="rounded-md border border-hairline bg-paper px-2 py-1.5"
                >
                  <p className="text-[10px] font-medium text-ink">{card.title}</p>
                  <p className="text-[9px] text-slate">{card.meta}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MirrorsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-hairline bg-paper p-4">
        <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
          Peilivarasto
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {mirrors.map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-hairline bg-cream/50 px-3 py-2"
            >
              <p className="text-xs font-medium text-ink">{m.name}</p>
              <p className="text-[10px] text-slate">{m.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-hairline bg-paper p-4">
        <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
          Saatavuuskalenteri
        </p>
        <div className="mt-3 grid grid-cols-7 gap-1">
          {weekDays.map((d) => (
            <span key={d} className="text-center text-[9px] text-faint">
              {d}
            </span>
          ))}
          {mirrorCalendar.flat().map((cell, i) => (
            <div
              key={`cell-${i}`}
              className={`flex h-8 items-center justify-center rounded text-[9px] ${
                cell
                  ? "bg-copper-wash font-mono text-copper"
                  : "bg-cream/60 text-transparent"
              }`}
            >
              {cell || "·"}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-slate">
          Jokainen ruutu näyttää varatun peilin. Klikkaa päivää nähdäksesi tapahtuman tiedot.
        </p>
      </div>
    </div>
  );
}

function AutomationsPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-copper/20 bg-copper-wash/30 px-4 py-3">
        <p className="text-[11px] text-ink">
          Tehtävämuistutukset ja tiimin sähköposti-ilmoitukset — laukaisimet toimivat automaattisesti;
          viestien sanamuodon toimittaa Peilisi.
        </p>
      </div>
      <div className="space-y-2">
        {tasks.map((t) => (
          <div
            key={t.text}
            className="flex items-start gap-3 rounded-xl border border-hairline bg-paper px-4 py-3"
          >
            <span className="mt-0.5 rounded-full border border-hairline bg-cream px-2 py-0.5 font-mono text-[8px] uppercase tracking-caps text-copper">
              {t.type}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink">{t.text}</p>
              {t.auto && (
                <p className="mt-0.5 text-[10px] text-faint">Automaattinen</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormPanel() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-hairline bg-paper p-4">
        <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
          peilisi.fi · yhteydenottolomake
        </p>
        <div className="mt-3 space-y-2">
          {[
            ["Nimi", "Anna Korhonen"],
            ["Sähköposti", "anna@example.fi"],
            ["Tapahtuma", "Häät · 22.9."],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[9px] text-faint">{label}</p>
              <div className="mt-0.5 rounded-md border border-hairline bg-cream/60 px-3 py-1.5 text-xs text-ink">
                {value}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-4 w-full cursor-pointer rounded-lg border border-copper/30 bg-copper-wash py-2 text-xs text-copper transition-colors hover:border-copper"
        >
          Simuloi lähetys
        </button>
        {!submitted && (
          <ClickHint className="mt-3 justify-center w-full">
            Klikkaa nähdäksesi miten se toimii
          </ClickHint>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={submitted ? "done" : "waiting"}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.35, ease }}
          className="rounded-xl border border-hairline bg-paper p-4"
        >
          <p className="font-mono text-[9px] uppercase tracking-caps text-copper">
            CRM · uusi yhteydenotto
          </p>
          {submitted ? (
            <div className="mt-3 space-y-2">
              {[
                "Asiakastietue luotu",
                "Vaihe: Yhteydenotto",
                "Tapahtuma kirjattu aikaleimalla",
                "Tiimin ilmoitus lähetetty",
              ].map((item) => (
                <div key={item} className="flex gap-2 text-xs text-slate">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-verdant" />
                  {item}
                </div>
              ))}
              <div className="mt-3 rounded-lg border border-verdant/20 bg-verdant/5 px-3 py-2 text-[11px] text-verdant">
                Anna Korhonen · Häät · Yhteydenotto
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate">
              Lähetä lomake nähdäksesi, miten verkkosivun yhteydenotto päätyy CRM:ään.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const panelMap: Record<TabId, () => JSX.Element> = {
  overview: OverviewPanel,
  events: EventsPanel,
  pipeline: PipelinePanel,
  mirrors: MirrorsPanel,
  automations: AutomationsPanel,
  form: FormPanel,
};

export default function DashboardPreview() {
  const [tab, setTab] = useState<TabId>("overview");
  const Panel = panelMap[tab];

  return (
    <section id="preview" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="Esikatselu"
          eyebrow="Konseptiesikatselu"
          title={
            <>
              Aavistus siitä, miltä se
              <br />
              <em className="italic text-copper">voisi näyttää ja toimia.</em>
            </>
          }
          description="Havainnollistava esikatselu — ei lopullinen ulkoasu. Kentät, asettelu ja työnkulut voivat muuttua tai tarkentua. Lopullinen rakenne ja ominaisuudet vahvistetaan seuraavassa tapaamisessa."
        />

        <ClickHint className="mb-6">Interaktiivinen esikatselu — klikkaile ja tutki</ClickHint>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="overflow-hidden rounded-2xl border border-hairline bg-ink shadow-lift"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-ink px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="mx-auto flex h-7 max-w-md flex-1 items-center rounded-md bg-white/5 px-3">
              <span className="font-mono text-[10px] text-white/40">
                app.peilisi.internal/dashboard
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-caps text-copper-light">
              Esikatselu
            </span>
          </div>

          <div className="flex min-h-[520px] flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="border-b border-white/10 bg-[#141014] p-4 lg:w-52 lg:border-b-0 lg:border-r">
              <p className="font-display text-sm text-cream">Peilisi</p>
              <p className="font-mono text-[9px] uppercase tracking-caps text-white/30">
                Operatiivinen
              </p>
              <ClickHint variant="dark" className="mt-4">
                Kokeile valikkoa
              </ClickHint>
              <nav className="mt-3 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`shrink-0 rounded-lg px-3 py-2 text-left text-xs transition-colors lg:w-full ${
                      tab === t.id
                        ? "bg-copper/20 text-copper-light"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 bg-cream p-4 md:p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
                    {tabs.find((t) => t.id === tab)?.label}
                  </p>
                  <h3 className="font-display text-xl font-light text-ink">
                    {tab === "overview" && "Operatiivinen yhteenveto"}
                    {tab === "events" && "Tulevat ja valmiit tapahtumat"}
                    {tab === "pipeline" && "Tapahtuma- ja varausprosessi"}
                    {tab === "mirrors" && "Peilivarasto ja kalenteri"}
                    {tab === "automations" && "Muistutukset ja seurantasähköpostit"}
                    {tab === "form" && "Verkkolomake → CRM"}
                  </h3>
                </div>
                <span className="hidden rounded-full border border-hairline bg-paper px-2.5 py-1 font-mono text-[9px] text-faint sm:inline">
                  Havainnollistava
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
          className="mt-8 rounded-2xl border border-copper/20 bg-copper-wash/30 px-6 py-5 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
            Ennen toteutusta
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate">
            Puuttuuko kenttä tai vaihe? Se voidaan lisätä. Tämä esikatselu näyttää suunnan —
            lopullinen ulkoasu, tiedot ja ominaisuudet sovitaan yhdessä seuraavassa tapaamisessa.
          </p>
        </motion.div>

        <CapabilityHighlights />
      </div>
    </section>
  );
}

const capabilityCards = [
  {
    id: "pipeline",
    title: "Myynti- ja tapahtumaprosessi",
    description: "Jokainen asiakas etenee selkeissä vaiheissa — ensimmäisestä yhteydenotosta jälkiseurantaan.",
    href: "#pipeline",
    span: "lg:col-span-3",
  },
  {
    id: "dashboard",
    title: "Operatiivinen hallintanäkymä",
    description: "Tapahtumat, avoimet tarjoukset ja peilien käyttöaste yhdellä silmäyksellä.",
    href: "#preview",
    span: "",
  },
  {
    id: "mirrors",
    title: "Peilivarasto ja kalenteri",
    description: "Mikä peili on varattu, vapaa tai matkalla — yhteisessä kalenterissa.",
    href: "#mirrors",
    span: "",
  },
  {
    id: "automations",
    title: "Tehtävät ja sähköpostiautomaatio",
    description: "Muistutukset ja seurannat lähtevät automaattisesti laukaisimen mukaan.",
    href: "#automations",
    span: "",
  },
  {
    id: "form",
    title: "Verkkolomake → CRM",
    description: "Yhteydenotot peilisi.fi:stä asiakastietueiksi — ilman copy-pastea.",
    href: "#contact-form",
    span: "md:col-span-2 lg:col-span-3",
  },
] as const;

function PipelineMiniVisual() {
  return (
    <div className="mt-4 overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-1.5">
        {pipelineStages.map((stage, i) => (
          <span key={stage.id} className="flex items-center gap-1.5">
            <span
              className={`flex flex-col items-center rounded-xl border border-hairline px-3 py-2.5 ${stage.color}`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-copper/20 bg-paper font-mono text-[9px] text-copper">
                {i + 1}
              </span>
              <span className="mt-1.5 whitespace-nowrap text-[10px] font-medium text-ink">
                {stage.label}
              </span>
            </span>
            {i < pipelineStages.length - 1 && (
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                className="shrink-0 text-copper/40"
                aria-hidden
              >
                <path
                  d="M0 5h10M10 5l-4-3M10 5l-4 3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardMiniVisual() {
  const stats = [
    { label: "Tulevat tapahtumat", value: "12", accent: "text-ink" },
    { label: "Avoimet tarjoukset", value: "5", accent: "text-copper" },
    { label: "Peilien käyttö", value: "78 %", accent: "text-verdant" },
  ];
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-hairline bg-cream/80 px-2 py-3 text-center"
        >
          <p className={`font-display text-xl font-light ${s.accent}`}>{s.value}</p>
          <p className="mt-1 text-[8px] leading-tight text-faint">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function MirrorsMiniVisual() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const booked = new Set([3, 4, 8, 9, 12]);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[8px] uppercase tracking-caps text-faint">Kesäkuu</p>
        <span className="rounded-full border border-copper/20 bg-copper-wash px-2 py-0.5 text-[8px] text-copper">
          Peili #3 · varattu
        </span>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((d) => (
          <span
            key={d}
            className={`flex h-6 items-center justify-center rounded-md text-[9px] ${
              booked.has(d)
                ? "border border-copper/30 bg-copper-wash font-medium text-copper"
                : "border border-hairline bg-paper text-faint"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function AutomationsMiniVisual() {
  return (
    <div className="mt-4 space-y-2">
      {[
        { tag: "Auto", text: "Muistutus · Häät huomenna · Peili #3" },
        { tag: "Auto", text: "Uusi yhteydenotto · Anna Korhonen · Häät" },
      ].map((item) => (
        <div
          key={item.text}
          className="flex items-start gap-2 rounded-xl border border-hairline bg-cream/80 px-3 py-2"
        >
          <span className="mt-0.5 shrink-0 rounded border border-copper/25 bg-copper-wash px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-caps text-copper">
            {item.tag}
          </span>
          <p className="text-[10px] leading-snug text-slate">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function FormMiniVisual() {
  return (
    <div className="mt-4 flex items-stretch gap-2">
      <div className="flex-1 rounded-xl border border-hairline bg-cream/80 p-3">
        <p className="font-mono text-[7px] uppercase tracking-caps text-faint">peilisi.fi</p>
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-full rounded bg-hairline/80" />
          <div className="h-2 w-4/5 rounded bg-hairline/60" />
          <div className="h-5 w-full rounded-md border border-copper/20 bg-copper-wash/50" />
        </div>
      </div>
      <div className="flex shrink-0 items-center text-copper/50" aria-hidden>
        →
      </div>
      <div className="flex-1 rounded-xl border border-verdant/20 bg-verdant/5 p-3">
        <p className="font-mono text-[7px] uppercase tracking-caps text-verdant">CRM</p>
        <p className="mt-2 text-[10px] font-medium text-ink">Anna Korhonen</p>
        <p className="mt-0.5 text-[9px] text-slate">Häät · Yhteydenotto · juuri nyt</p>
      </div>
    </div>
  );
}

function CapabilityVisual({ id }: { id: (typeof capabilityCards)[number]["id"] }) {
  switch (id) {
    case "pipeline":
      return <PipelineMiniVisual />;
    case "dashboard":
      return <DashboardMiniVisual />;
    case "mirrors":
      return <MirrorsMiniVisual />;
    case "automations":
      return <AutomationsMiniVisual />;
    case "form":
      return <FormMiniVisual />;
  }
}

function CapabilityHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease }}
      className="mt-10"
    >
      <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
        Mitä alusta kattaa
      </p>
      <h3 className="mt-2 font-display text-2xl font-light text-ink md:text-3xl">
        Viisi yhteen liittyvää aluetta, yksi työpiste
      </h3>
      <ClickHint className="mt-3">Klikkaa korttia siirtyäksesi kohtaan</ClickHint>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilityCards.map((card, index) => (
          <motion.a
            key={card.id}
            href={card.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.06, ease }}
            className={`group block rounded-2xl border border-hairline bg-paper p-5 shadow-card transition-all duration-300 hover:border-copper/30 hover:shadow-lift ${card.span}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[9px] uppercase tracking-caps text-copper">
                0{index + 1}
              </p>
              <span className="text-xs text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-copper">
                →
              </span>
            </div>
            <h4 className="mt-2 font-display text-lg font-light text-ink">{card.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-slate">{card.description}</p>
            <CapabilityVisual id={card.id} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
