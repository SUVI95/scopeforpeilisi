"use client";

import Image from "next/image";

type ScopeOption = {
  title: string;
  subtitle: string;
  price: string;
  summary: string;
  tag: string;
  includes: string[];
};

const optionA: ScopeOption = {
  title: "Vaihtoehto A",
  subtitle: "Sivusto + varauspyyntö + Stripe-ennakko",
  price: "5 900 €",
  tag: "Manuaalinen työ tiimille",
  summary:
    "Uusi verkkosivu liitettynä CRM:ään. Lomake ja maksu tulevat järjestelmään automaattisesti — mutta peilin tarkistus, varauksen vahvistus ja kalenterin päivitys tapahtuvat tiimin toimesta käsin.",
  includes: [
    "Uusi verkkosivu (peilisi.fi)",
    "Pyydä tarjous / varaa aika -toiminto",
    "Lomake → CRM-liidi / tapahtuma",
    "Stripe: ennakko",
    "Maksun tila näkyy CRM:ssä",
    "Yksinkertainen varaus — tiimi tarkistaa peilin ja vahvistaa päivän käsin",
    "Domainin siirto Webnodesta",
  ],
};

const optionB: ScopeOption = {
  title: "Vaihtoehto B",
  subtitle: "Saatavuus, kalenteri ja automaatiot",
  price: "9 900 €",
  tag: "Automaatio",
  summary:
    "Kaikki vaihtoehdosta A, plus järjestelmä hoitaa peilien saatavuuden, kalenterisynkronoinnin ja sähköpostiautomaatiot. Tiimin manuaalinen koordinaatio vähenee merkittävästi.",
  includes: [
    "Kaikki vaihtoehdosta A",
    "Varaus tarkistaa laitteiden saatavuuden",
    "Julkinen widget + täysi CRM-kalenterisynkronointi",
    "Sähköpostiautomaatiot (lomake, varaus, maksu)",
  ],
};

function OptionPanel({ data, manual }: { data: ScopeOption; manual?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-hs-paper p-6 shadow-card md:p-8 ${
        manual ? "border-hs-gold/40" : "border-hs-teal/35"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[10px] uppercase tracking-caps text-hs-gold">{data.title}</p>
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-caps ${
            manual
              ? "border-hs-gold/40 bg-hs-gold-wash text-hs-gold"
              : "border-hs-teal/40 bg-hs-teal-wash text-hs-teal"
          }`}
        >
          {data.tag}
        </span>
      </div>

      <h2 className="mt-4 font-display text-2xl font-light text-hs-ink md:text-3xl">{data.subtitle}</h2>
      <p className="mt-4 font-display text-4xl text-hs-ink">{data.price}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-caps text-hs-faint">ilman ALV</p>

      <p className="mt-6 text-sm leading-relaxed text-hs-muted">{data.summary}</p>

      <div className="mt-8 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-caps text-hs-faint">Mitä sisältyy</p>
        <ul className="mt-4 space-y-3">
          {data.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-hs-muted">
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${manual ? "bg-hs-gold" : "bg-hs-teal"}`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WebsiteScopePage() {
  return (
    <div className="min-h-screen bg-hs-bg text-hs-ink">
      <header className="border-b border-hs-hairline bg-hs-paper">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6 md:px-10">
          <a href="https://www.hsbridgeai.fi/" target="_blank" rel="noopener noreferrer">
            <Image src="/hsbridge-logo.png" alt="HSBridge AI" width={160} height={40} className="h-8 w-auto" priority />
          </a>
          <div className="hidden text-right sm:block">
            <p className="font-display text-lg text-hs-ink">Peilisi Oy</p>
            <p className="font-mono text-[10px] uppercase tracking-caps text-hs-muted">Verkkosivuehdotus</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
        <div className="text-center">
          <h1 className="font-display text-4xl font-light leading-tight text-hs-ink md:text-5xl">
            Uusi verkkosivu ja <em className="italic text-hs-gold">asiakashallinta</em>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-hs-muted md:text-base">
            Kaksi vaihtoehtoa Peilisi Oy:lle. Hinnat ilman ALV:tä.
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-caps text-hs-faint">
            Päivitetty 9.7.2026
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <OptionPanel data={optionA} manual />
          <OptionPanel data={optionB} />
        </div>
      </main>

      <footer className="border-t border-hs-hairline bg-hs-ink px-6 py-12 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Image src="/hsbridge-logo.png" alt="HSBridge AI" width={180} height={45} className="mx-auto h-9 w-auto" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-caps text-hs-gold">Yhteystiedot</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="tel:+358449784936"
              className="rounded-full border border-hs-gold/40 bg-hs-paper px-5 py-2.5 text-sm text-hs-ink"
            >
              +358 44 9784 936
            </a>
            <a
              href="mailto:suvi@hsbridgeai.fi"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-hs-paper/90"
            >
              suvi@hsbridgeai.fi
            </a>
            <a
              href="mailto:henri@hsbridgeai.fi"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-hs-paper/90"
            >
              henri@hsbridgeai.fi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
