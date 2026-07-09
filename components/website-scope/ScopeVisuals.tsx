"use client";

const manualTasks = [
  "Tarkistaa onko peili vapaana valittuna päivänä",
  "Vahvistaa varauksen asiakkaalle sähköpostilla tai puhelimella",
  "Kirjaa tapahtuman ja peilin CRM-kalenteriin",
  "Seuraa maksun tilaa ja muistuttaa tarvittaessa",
];

export function ManualWorkCallout() {
  return (
    <div className="mb-10 rounded-2xl border-2 border-hs-gold/35 bg-hs-gold-wash/50 p-6">
      <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">A:ssa tiimi tekee käsin</p>
      <p className="mt-2 text-sm leading-relaxed text-hs-ink">
        Lomake ja maksu tulevat automaattisesti CRM:ään — mutta varauksen käsittely on edelleen tiimin vastuulla:
      </p>
      <ul className="mt-4 space-y-2">
        {manualTasks.map((task) => (
          <li key={task} className="flex gap-3 text-sm text-hs-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hs-gold" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ManualVsAutoBanner() {
  return (
    <div className="mb-12 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border-2 border-hs-gold/35 bg-hs-gold-wash/40 p-6">
        <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">Vaihtoehto A</p>
        <p className="mt-3 font-display text-xl text-hs-ink">Manuaalinen työ jatkuu</p>
        <p className="mt-2 text-sm leading-relaxed text-hs-muted">
          Verkko kerää pyynnön ja maksun — tiimi hoitaa peilin tarkistuksen, vahvistuksen ja kalenterin päivityksen käsin.
        </p>
      </div>
      <div className="rounded-2xl border-2 border-hs-teal/35 bg-hs-teal-wash/40 p-6">
        <p className="font-mono text-[10px] uppercase tracking-caps text-hs-teal">Vaihtoehto B</p>
        <p className="mt-3 font-display text-xl text-hs-ink">Automaatio korvaa manuaalityön</p>
        <p className="mt-2 text-sm leading-relaxed text-hs-muted">
          Järjestelmä tarkistaa saatavuuden, synkronoi kalenterin ja lähettää viestit — tiimin rooli pienenee merkittävästi.
        </p>
      </div>
    </div>
  );
}

const sharedFeatures = [
  { id: "site", label: "Uusi verkkosivu" },
  { id: "form", label: "Lomake → CRM" },
  { id: "stripe", label: "Stripe-maksu" },
  { id: "booking", label: "Yksinkertainen varaus" },
];

const bOnlyFeatures = [
  { id: "avail", label: "Peilien saatavuus" },
  { id: "widget", label: "Julkinen widget" },
  { id: "calendar", label: "Kalenterisynkronointi" },
  { id: "domain", label: "Domain Webnodesta" },
  { id: "email", label: "Sähköpostiautomaatiot" },
];

export function PackageMindMap() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-hs-hairline bg-hs-paper p-6 shadow-card md:p-10">
      <div className="mx-auto max-w-xl">
        {/* Center */}
        <div className="flex flex-col items-center">
          <div className="rounded-2xl border-2 border-hs-gold/40 bg-hs-gold-wash px-8 py-5 text-center shadow-card">
            <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">Ydinratkaisu</p>
            <p className="mt-2 font-display text-2xl text-hs-ink">peilisi.fi + CRM</p>
            <p className="mt-1 text-xs text-hs-muted">Verkkosivu liitettynä asiakashallintaan</p>
          </div>
          <div className="flex h-10 w-px bg-hs-gold/30" />
        </div>

        {/* Option A — first */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-2xl border border-hs-hairline bg-hs-bg p-5">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">1. Vaihtoehto A</p>
              <p className="mt-1 font-display text-3xl text-hs-ink">5 900 €</p>
              <p className="mt-2 inline-block rounded-full border border-hs-gold/40 bg-hs-gold-wash px-3 py-1 font-mono text-[9px] uppercase tracking-caps text-hs-gold">
                Manuaalinen työ
              </p>
            </div>
            <div className="mt-5 space-y-2">
              {sharedFeatures.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-lg border border-hs-hairline bg-hs-paper px-3 py-2.5 text-sm text-hs-muted"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hs-gold" />
                  {f.label}
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-hs-gold/30 bg-hs-gold-wash/60 px-3 py-3 text-center text-xs font-medium text-hs-ink">
              Tiimi tarkistaa peilin, vahvistaa päivän ja kirjaa kalenteriin käsin
            </p>
          </div>
          <div className="flex flex-col items-center py-3 text-hs-muted">
            <span className="text-sm">+</span>
          </div>
        </div>

        {/* Option B — second */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-2xl border-2 border-hs-teal/35 bg-hs-teal-wash/40 p-5">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-caps text-hs-teal">2. Vaihtoehto B</p>
              <p className="mt-1 font-display text-3xl text-hs-ink">9 900 €</p>
            </div>
            <div className="mt-5 space-y-2">
              <div className="rounded-lg border border-hs-teal/20 bg-hs-paper/80 px-3 py-2 text-center text-xs font-medium text-hs-teal">
                ✓ Kaikki vaihtoehdosta A
              </div>
              {bOnlyFeatures.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-lg border border-hs-teal/20 bg-hs-paper px-3 py-2.5 text-sm text-hs-ink"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hs-teal" />
                  {f.label}
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-hs-gold/20 bg-hs-paper px-3 py-2 text-center text-xs text-hs-muted">
              Järjestelmä tarkistaa saatavuuden automaattisesti
            </p>
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-caps text-hs-faint">
          B = A + 5 lisäominaisuutta (+ 4 000 €)
        </p>
      </div>
    </div>
  );
}

export function LayerStackVisual() {
  const baseLayer = {
    label: "Vaihtoehto A — pohja",
    price: "5 900 €",
    items: ["Verkkosivu", "Lomake → CRM", "Stripe Checkout", "Maksun tila CRM:ssä", "Yksinkertainen varaus"],
    className: "border-hs-hairline bg-hs-paper",
    width: "w-full",
  };
  const bLayer = {
    label: "Vaihtoehto B — lisäkerros A:n päälle",
    price: "+4 000 €",
    items: ["Saatavuustarkistus", "Varauswidget", "Kalenterisynkronointi", "Domain-siirto", "Automaatiot"],
    className: "border-hs-teal/40 bg-hs-teal-wash/50",
    width: "w-[92%]",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`rounded-2xl border p-6 shadow-card transition-all ${baseLayer.className} ${baseLayer.width}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">{baseLayer.label}</p>
          <p className="font-mono text-[10px] uppercase tracking-caps text-hs-faint">{baseLayer.price}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {baseLayer.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-hs-hairline bg-hs-bg px-3 py-1.5 text-xs text-hs-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 py-2 text-hs-muted">
        <span className="text-sm">+</span>
        <p className="font-mono text-[10px] uppercase tracking-caps">Lisäkerros</p>
      </div>
      <div
        className={`rounded-2xl border p-6 shadow-card transition-all ${bLayer.className} ${bLayer.width}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-caps text-hs-teal">{bLayer.label}</p>
          <p className="font-mono text-[10px] uppercase tracking-caps text-hs-faint">{bLayer.price}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {bLayer.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-hs-hairline bg-hs-bg px-3 py-1.5 text-xs text-hs-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-hs-faint">B = A + 5 lisäominaisuutta · yhteensä 9 900 €</p>
    </div>
  );
}

const flowA = [
  { label: "Asiakas", sub: "Täyttää lomakkeen", color: "bg-hs-bg" },
  { label: "CRM", sub: "Luo liidin", color: "bg-hs-paper" },
  { label: "Tiimi", sub: "Vahvistaa manuaalisesti", color: "bg-hs-section" },
  { label: "Stripe", sub: "Ennakkomaksu", color: "bg-hs-gold-wash" },
  { label: "CRM", sub: "Maksu näkyy", color: "bg-hs-paper" },
];

const flowB = [
  { label: "Asiakas", sub: "Valitsee päivän", color: "bg-hs-bg" },
  { label: "Järjestelmä", sub: "Tarkistaa peilit", color: "bg-hs-teal-wash" },
  { label: "CRM", sub: "Kalenteri päivittyy", color: "bg-hs-paper" },
  { label: "Stripe", sub: "Maksu + vahvistus", color: "bg-hs-gold-wash" },
  { label: "Automaatio", sub: "Sähköpostit", color: "bg-hs-section" },
];

function FlowArrow() {
  return (
    <div className="flex shrink-0 items-center justify-center px-1 text-hs-teal md:px-2">
      <span className="hidden md:inline">→</span>
      <span className="md:hidden">↓</span>
    </div>
  );
}

export function DualFlowVisual() {
  const flows = [
    { step: "1", title: "A:n polku", subtitle: "Manuaalinen vahvistus", steps: flowA, badge: "5 900 €" },
    { step: "2", title: "B:n polku", subtitle: "Automaattinen saatavuus", steps: flowB, badge: "9 900 €" },
  ];

  return (
    <div className="space-y-8">
      {flows.map((flow, flowIndex) => (
        <div key={flow.title}>
          {flowIndex > 0 && (
            <div className="mb-6 border-t border-hs-hairline pt-6" />
          )}
          <div className="rounded-2xl border border-hs-hairline bg-hs-paper p-6 shadow-card">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">
                  {flow.step}. {flow.title}
                </p>
                <p className="mt-1 text-sm text-hs-muted">{flow.subtitle}</p>
              </div>
              <span className="rounded-full border border-hs-gold/30 bg-hs-gold-wash px-3 py-1 font-mono text-[10px] text-hs-gold">
                {flow.badge}
              </span>
            </div>
            <div className="flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center">
              {flow.steps.map((step, i) => (
                <div key={step.label + i} className="flex items-center gap-2 md:contents">
                  <div className={`min-w-[100px] flex-1 rounded-xl border border-hs-hairline p-3 ${step.color}`}>
                    <p className="font-mono text-[10px] uppercase tracking-caps text-hs-faint">{step.label}</p>
                    <p className="mt-1 text-xs leading-snug text-hs-ink">{step.sub}</p>
                  </div>
                  {i < flow.steps.length - 1 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DifferenceHighlights() {
  const rows = [
    {
      topic: "Varaus",
      a: "Asiakas ehdottaa päivää → tiimi tarkistaa peilin ja vahvistaa",
      b: "Järjestelmä tarkistaa peilien saatavuuden automaattisesti",
    },
    {
      topic: "Kalenteri",
      a: "CRM päivittyy kun tiimi kirjaa tiedot",
      b: "Verkko ↔ CRM synkronoitu — yksi totuus",
    },
    {
      topic: "Viestintä",
      a: "Manuaaliset vastaukset (tai yksinkertainen vahvistus)",
      b: "Automaatiot: lomake, varaus, maksu, muistutukset",
    },
    {
      topic: "Domain",
      a: "Uusi sivu voi käynnistyä rinnakkain Webnoden kanssa",
      b: "peilisi.fi siirretään Webnodesta kokonaan",
    },
  ];

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.topic} className="overflow-hidden rounded-2xl border border-hs-hairline bg-hs-paper shadow-card">
          <div className="border-b border-hs-hairline bg-hs-section/50 px-5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">
              Ero: {row.topic}
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="border-b border-hs-hairline p-5 md:border-b-0 md:border-r">
              <p className="font-mono text-[10px] uppercase tracking-caps text-hs-faint">Vaihtoehto A</p>
              <p className="mt-2 text-sm leading-relaxed text-hs-muted">{row.a}</p>
            </div>
            <div className="bg-hs-teal-wash/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-caps text-hs-teal">Vaihtoehto B</p>
              <p className="mt-2 text-sm leading-relaxed text-hs-ink">{row.b}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChooseGuide() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-2xl border border-hs-hairline bg-hs-bg p-6">
        <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">Vaihtoehto A sopii, jos…</p>
        <ul className="mt-4 space-y-2 text-sm text-hs-muted">
          <li>• Haluatte kevyemmän lähtöpisteen</li>
          <li>• Tiimi vahvistaa ajankohdat käsin</li>
          <li>• Peilimäärä on hallittavissa ilman automaatiota</li>
          <li>• Budjetti on tärkeämpi kuin täysi synkronointi</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-hs-teal/30 bg-hs-teal-wash/40 p-6">
        <p className="font-mono text-[10px] uppercase tracking-caps text-hs-teal">Vaihtoehto B sopii, jos…</p>
        <ul className="mt-4 space-y-2 text-sm text-hs-muted">
          <li>• Haluatte vähentää manuaalista koordinaatiota</li>
          <li>• Päällekkäisvaraukset ovat ongelma</li>
          <li>• Haluatte pois Webnodesta kokonaan</li>
          <li>• Sähköpostit ja muistutukset automaattisesti</li>
        </ul>
      </div>
    </div>
  );
}

export function SystemDiagram() {
  const nodes = [
    { id: "web", x: 50, y: 12, label: "peilisi.fi", sub: "Julkinen sivu" },
    { id: "form", x: 20, y: 45, label: "Lomake", sub: "A + B" },
    { id: "stripe", x: 80, y: 45, label: "Stripe", sub: "A + B" },
    { id: "crm", x: 50, y: 78, label: "CRM", sub: "app.peilisi.fi" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-hs-hairline bg-hs-paper p-4 shadow-card md:p-8">
      <svg viewBox="0 0 100 100" className="mx-auto h-auto w-full max-w-lg" aria-hidden>
        <line x1="50" y1="18" x2="20" y2="40" stroke="rgba(155, 107, 79, 0.35)" strokeWidth="0.4" />
        <line x1="50" y1="18" x2="80" y2="40" stroke="rgba(155, 107, 79, 0.35)" strokeWidth="0.4" />
        <line x1="20" y1="50" x2="50" y2="72" stroke="rgba(155, 107, 79, 0.35)" strokeWidth="0.4" />
        <line x1="80" y1="50" x2="50" y2="72" stroke="rgba(155, 107, 79, 0.35)" strokeWidth="0.4" />
        <line x1="50" y1="18" x2="50" y2="72" stroke="rgba(122, 85, 64, 0.35)" strokeWidth="0.3" strokeDasharray="2 2" />
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x - 14}
              y={n.y - 6}
              width="28"
              height="12"
              rx="2"
              fill="#F4EBE4"
              stroke="rgba(155, 107, 79, 0.45)"
              strokeWidth="0.3"
            />
            <text x={n.x} y={n.y - 1} textAnchor="middle" fontSize="3" fill="#111317" fontWeight="500">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="2.2" fill="#5C6470">
              {n.sub}
            </text>
          </g>
        ))}
        <text x="50" y="94" textAnchor="middle" fontSize="2.5" fill="#8B9199">
          Vaihtoehto B lisää saatavuustarkistuksen ja kalenterisynkronoinnin
        </text>
      </svg>
    </div>
  );
}
