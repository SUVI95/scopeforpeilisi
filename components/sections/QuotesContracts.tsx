"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    id: "q1",
    type: "Quote",
    client: "Tech Oy · Corporate event",
    status: "sent" as const,
    value: "€1,240",
    updated: "11 Jun 2026",
  },
  {
    id: "q2",
    type: "Quote",
    client: "Mäkinen · Wedding",
    status: "accepted" as const,
    value: "€890",
    updated: "12 Jun 2026",
  },
  {
    id: "s1",
    type: "Contract",
    client: "Design Week · Trade fair",
    status: "draft" as const,
    value: "—",
    updated: "10 Jun 2026",
  },
  {
    id: "s2",
    type: "Contract",
    client: "Korhonen · Birthday",
    status: "signed" as const,
    value: "€650",
    updated: "3 Jun 2026",
  },
];

const statusStyle = {
  draft: "text-faint",
  sent: "text-copper",
  accepted: "text-verdant",
  signed: "text-verdant",
  declined: "text-slate line-through",
};

const statusLabel = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  signed: "Signed",
  declined: "Declined",
};

export default function QuotesContracts() {
  const [filter, setFilter] = useState<"all" | "quote" | "contract">("all");
  const [selected, setSelected] = useState("q2");

  const filtered = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "quote") return item.type === "Quote";
    return item.type === "Contract";
  });

  const active = items.find((i) => i.id === selected)!;

  return (
    <section id="quotes" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          eyebrow="Quotes & contracts"
          title={
            <>
              Status tracked clearly
              <br />
              <em className="italic text-copper">without a document tool.</em>
            </>
          }
          description="Quote and contract status tracking per customer — no document creation in the platform, but a clear view of where each item stands."
        />

        <ClickHint className="mb-4">Filter or select an item</ClickHint>
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["quote", "Quotes"],
              ["contract", "Contracts"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                filter === id
                  ? "border-copper bg-copper-wash text-copper"
                  : "border-hairline bg-paper text-slate hover:border-copper/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-2">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all ${
                  selected === item.id
                    ? "border-copper bg-copper-wash/40"
                    : "border-hairline bg-paper hover:border-copper/25"
                }`}
              >
                <div>
                  <p className="text-sm text-ink">{item.client}</p>
                  <p className="mt-0.5 text-xs text-slate">
                    {item.type} · updated {item.updated}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${statusStyle[item.status]}`}>
                    {statusLabel[item.status]}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-faint">{item.value}</p>
                </div>
              </button>
            ))}
          </div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="rounded-2xl border border-hairline bg-paper p-7 shadow-card"
          >
            <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
              What the platform does · what it does not
            </p>
            <h3 className="mt-2 font-display text-xl font-light text-ink">
              {active.client}
            </h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-verdant/20 bg-verdant/5 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-caps text-verdant">
                  Included
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate">
                  <li>· Status: draft → sent → accepted / declined</li>
                  <li>· Link to customer and event</li>
                  <li>· Last update and owner</li>
                  <li>· Notes and activity history</li>
                </ul>
              </div>
              <div className="rounded-lg border border-hairline bg-cream/80 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Outside project scope
                </p>
                <p className="mt-2 text-sm text-slate">
                  Actual PDF quotes and contract documents are created in your
                  existing tools — the platform tracks status, it does not
                  replace a document tool.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
