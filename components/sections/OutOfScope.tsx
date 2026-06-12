"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const excluded = [
  {
    title: "Payments",
    detail: "Online payments and payment links — we recommend a dedicated payment provider.",
    alt: "Stripe, Paytrail, or similar",
  },
  {
    title: "Invoicing",
    detail: "Actual invoice creation and accounting — the platform tracks status only.",
    alt: "Netvisor, Procountor, or similar",
  },
  {
    title: "Newsletters",
    detail: "Mass messaging and marketing automation are a separate capability.",
    alt: "Mailchimp, Brevo, or similar",
  },
];

export default function OutOfScope() {
  return (
    <section id="out-of-scope" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="09"
          eyebrow="Outside this project"
          title={
            <>
              We recommend existing tools
              <br />
              <em className="italic text-copper">for these areas.</em>
            </>
          }
          description="Payments, invoicing, and newsletters remain outside this project. They integrate well with the management platform, but are best handled by specialised services."
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
                Not in this project
              </p>
              <h3 className="mt-3 font-display text-xl font-light text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {item.detail}
              </p>
              <p className="mt-4 rounded-lg border border-hairline bg-cream/80 px-3 py-2 text-xs text-copper">
                Suggested: {item.alt}
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
          The management platform acts as the hub: it tracks status and links
          customers to events, while specialised tools handle payments, invoices,
          and marketing more efficiently.
        </motion.p>
      </div>
    </section>
  );
}
