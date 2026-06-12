"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const excluded = [
  {
    title: "Maksut",
    detail: "Verkkomaksut ja maksulinkit — suosittelemme erillistä maksupalvelua.",
    alt: "Stripe, Paytrail tai vastaava",
  },
  {
    title: "Laskutus",
    detail: "Itse laskujen laatiminen ja kirjanpito — alustalla seurataan vain tilaa.",
    alt: "Netvisor, Procountor tai vastaava",
  },
  {
    title: "Uutiskirjeet",
    detail: "Massaviestintä ja markkinointiautomaatio ovat erillinen kokonaisuus.",
    alt: "Mailchimp, Brevo tai vastaava",
  },
];

export default function OutOfScope() {
  return (
    <section id="out-of-scope" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="09"
          eyebrow="Projektin ulkopuolella"
          title={
            <>
              Näihin suosittelemme
              <br />
              <em className="italic text-copper">valmiita työkaluja.</em>
            </>
          }
          description="Maksut, laskutus ja uutiskirjeet eivät kuulu tähän projektiin. Ne sopivat hyvin yhteen hallintajärjestelmän kanssa, mutta kannattaa hoitaa erikoistuneilla palveluilla."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {excluded.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="rounded-2xl border border-hairline bg-paper p-7 shadow-card"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                Ei tässä projektissa
              </p>
              <h3 className="mt-3 font-display text-xl font-light text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {item.detail}
              </p>
              <p className="mt-4 rounded-lg border border-hairline bg-cream/80 px-3 py-2 text-xs text-copper">
                Ehdotus: {item.alt}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate"
        >
          Hallintajärjestelmä toimii keskuspaikkana: siellä nähdään tilat ja linkitykset
          asiakkaisiin ja tapahtumiin, kun maksut, laskut ja markkinointi hoituvat
          omilla erikoistuneilla työkaluillaan.
        </motion.p>
      </div>
    </section>
  );
}
