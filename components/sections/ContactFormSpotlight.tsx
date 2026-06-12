"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactFormSpotlight() {
  return (
    <section id="contact-form" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="07"
          eyebrow="Website"
          title={
            <>
              Contact form
              <br />
              <em className="italic text-copper">directly into the CRM.</em>
            </>
          }
          description="The peilisi.fi contact form connects to the management platform — each new enquiry becomes a customer record automatically, without manual copy-paste."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-hairline bg-paper p-7 shadow-card"
          >
            <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
              peilisi.fi · contact form
            </p>
            <div className="mt-6 space-y-4">
              {[
                { label: "Name", value: "Anna Mäkinen" },
                { label: "Email", value: "anna.maki@example.fi" },
                { label: "Phone", value: "+358 40 123 4567" },
                { label: "Event type", value: "Wedding" },
                { label: "Preferred date", value: "15 Aug 2026" },
                { label: "Message", value: "We would like a mirror for our wedding..." },
              ].map((field) => (
                <div key={field.label}>
                  <label className="font-mono text-[10px] uppercase tracking-caps text-faint">
                    {field.label}
                  </label>
                  <div className="mt-1 rounded-lg border border-hairline bg-cream/80 px-4 py-2.5 text-sm text-ink">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-full border border-copper/30 bg-copper-wash py-3 text-sm text-copper"
            >
              Send enquiry
            </button>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="flex items-center justify-center gap-4 py-4"
            >
              <span className="font-mono text-xs text-faint">Form</span>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-copper"
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-copper">CRM</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="rounded-2xl border border-copper/25 bg-copper-wash/50 p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Created automatically in CRM
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate">
                {[
                  "New customer record with contact details",
                  "Status: New enquiry",
                  "Activity entry with timestamp",
                  "Team notification (new lead)",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="rounded-2xl border border-hairline bg-paper p-6 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                Note before implementation
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                We would first review how the current peilisi.fi website is built,
                to confirm the technical approach. Whether and how the form connects
                will be decided in your next meeting alongside the rest of the scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
