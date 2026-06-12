"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const milestones = [
  {
    id: "build",
    label: "Build",
    caption: "Development and integrations",
    icon: ["M4 21V9l8-6 8 6v12", "M9 21v-6h6v6"],
    deliverables: [
      "Customer and contact management with activity history",
      "Event, booking, and mirror tracking in calendar view",
      "Quote and contract status tracking",
      "Automations and email workflows (triggers + sending — copy from Peilisi)",
      "Website contact form to CRM (after technical review)",
      "Secure login and permission management",
    ],
  },
  {
    id: "confirm",
    label: "Confirm",
    caption: "Walkthrough with the Peilisi team",
    icon: ["M20 7L9 18l-5-5"],
    deliverables: [
      "Structured review of all platform areas with the team",
      "Automations and email triggers reviewed with Peilisi-supplied wording",
      "Roles and permissions aligned to actual workflows",
      "Feedback round with refinements applied",
    ],
  },
  {
    id: "handover",
    label: "Handover",
    caption: "The system stays with you",
    icon: ["M12 3v12", "M8 11l4 4 4-4", "M5 21h14"],
    deliverables: [
      "Production-ready system on your infrastructure",
      "Source code, credentials, and operational instructions transferred to you",
      "Platform code and full system owned by Peilisi Oy",
      "15 days of testing and bug fixes after delivery",
    ],
  },
];

function Modal({
  milestone,
  onClose,
}: {
  milestone: (typeof milestones)[number];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${milestone.label} deliverables`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()}
        className="gpu w-full max-w-lg rounded-2xl border border-hairline bg-paper p-8 shadow-lift"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
              Phase · {milestone.label}
            </p>
            <h3 className="mt-2 font-display text-3xl font-light text-ink">
              {milestone.caption}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline text-slate transition-colors hover:border-copper/40 hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {milestone.deliverables.map((d, i) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease }}
              className="flex gap-3 text-sm leading-relaxed text-slate"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper" aria-hidden />
              {d}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function Delivery() {
  const [open, setOpen] = useState<string | null>(null);
  const current = milestones.find((m) => m.id === open);

  return (
    <section id="delivery" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="11"
          eyebrow="Delivery"
          title={
            <>
              Build. Confirm.
              <br />
              <em className="italic text-copper">Hand over.</em>
            </>
          }
          description="The platform code and full system remain yours. After delivery, 15 days of testing and bug fixes — open each phase to see detailed deliverables."
        />

        <div className="relative">
          <div className="absolute left-0 right-0 top-10 hidden h-px md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-copper/40 via-copper/25 to-copper/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, delay: 0.3, ease }}
            />
          </div>

          <ClickHint className="mb-6 justify-center">Click a milestone for detail</ClickHint>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {milestones.map((m, i) => (
              <motion.button
                key={m.id}
                type="button"
                onClick={() => setOpen(m.id)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.18, ease }}
                className="gpu group relative cursor-pointer rounded-2xl p-2 text-left md:text-center"
              >
                <div className="flex items-center gap-5 md:flex-col md:gap-0">
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-hairline bg-paper text-copper shadow-card transition-all duration-300 group-hover:border-copper group-hover:bg-copper-wash md:mx-auto">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {m.icon.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </div>
                  <div className="md:mt-6">
                    <h3 className="font-display text-2xl font-light text-ink">
                      {m.label}
                    </h3>
                    <p className="mt-1 text-sm text-slate">{m.caption}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-caps text-faint transition-colors group-hover:text-copper">
                      View deliverables
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 rounded-2xl border border-copper/25 bg-copper-wash/40 p-8 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
            Ownership & support
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate">
            We have prior experience with a similar project — we know this is
            achievable within the business service voucher budget. The system is
            yours to own, not rent.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {current && <Modal milestone={current} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
