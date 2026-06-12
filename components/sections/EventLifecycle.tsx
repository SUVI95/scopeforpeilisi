"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

type EventView = "upcoming" | "completed";

const upcomingEvents = [
  { date: "15 Aug 2026", client: "Mäkinen · wedding", mirror: "Mirror #3", stage: "Confirmed" },
  { date: "17 Aug 2026", client: "Tech Oy · corporate", mirror: "Mirror #1", stage: "Offer open" },
  { date: "22 Aug 2026", client: "Virtanen · birthday", mirror: "Mirror #4", stage: "Confirmed" },
  { date: "30 Aug 2026", client: "Design Week", mirror: "Mirror #2", stage: "Confirmed" },
];

const completedSample = [
  { date: "8 Jun 2026", client: "Korhonen · birthday", mirror: "Mirror #2", stage: "Follow-up done" },
  { date: "24 May 2026", client: "Lahti corporate gala", mirror: "Mirror #1", stage: "Invoicing done" },
  { date: "12 May 2026", client: "Helsinki summer party", mirror: "Mirror #3", stage: "Archived" },
];

const flowSteps = [
  {
    label: "Upcoming",
    detail: "Dashboard, calendar, and pipeline show what is active or coming next.",
  },
  {
    label: "Event day",
    detail: "Team works from today's view — mirrors, location, contacts at hand.",
  },
  {
    label: "Done",
    detail: "Marked complete after event + follow-up. Drops off daily views.",
  },
  {
    label: "Archive",
    detail: "Stored permanently. Searchable list — not mixed into upcoming work.",
  },
];

export default function EventLifecycle() {
  const [view, setView] = useState<EventView>("upcoming");
  const [year, setYear] = useState("2026");
  const [search, setSearch] = useState("");

  const completedTotal = 247;
  const pageSize = 50;
  const filteredCompleted = completedSample.filter(
    (e) => !search || e.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="events-lifecycle" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03b"
          eyebrow="Events · upcoming & done"
          title={
            <>
              Today&apos;s work stays visible.
              <br />
              <em className="italic text-copper">History stays findable.</em>
            </>
          }
          description="An illustrative view of how upcoming and completed events could be separated — keeping the dashboard responsive even with hundreds of past events. Exact rules are confirmed in your next meeting."
        />

        {/* Flow */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {flowSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="relative rounded-xl border border-hairline bg-paper p-5 shadow-card"
            >
              <span className="font-mono text-xs text-copper">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-light text-ink">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{step.detail}</p>
              {i < flowSteps.length - 1 && (
                <span
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-faint lg:inline"
                  aria-hidden
                >
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Interactive mock */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-hairline bg-paper p-6 shadow-card"
          >
            <ClickHint className="mb-4">Switch view or browse the archive</ClickHint>
            <div className="flex gap-2">
              {(
                [
                  ["upcoming", "Upcoming"],
                  ["completed", "Completed"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                    view === id
                      ? "border-copper bg-copper-wash text-copper"
                      : "border-hairline text-slate hover:border-copper/30"
                  }`}
                >
                  {label}
                  {id === "completed" && (
                    <span className="ml-1.5 text-faint">({completedTotal})</span>
                  )}
                </button>
              ))}
            </div>

            {view === "upcoming" ? (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Default view · next 30 days
                </p>
                <div className="mt-3 space-y-2">
                  {upcomingEvents.map((e) => (
                    <div
                      key={e.client + e.date}
                      className="flex items-center justify-between rounded-lg border border-hairline bg-cream/50 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm text-ink">{e.client}</p>
                        <p className="text-xs text-slate">
                          {e.date} · {e.mirror}
                        </p>
                      </div>
                      <span className="text-[10px] text-copper">{e.stage}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-faint">
                  Calendar and dashboard default to this — only what the team needs now.
                </p>
              </div>
            ) : (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Event archive · search & filter
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search past events..."
                    className="min-w-[140px] flex-1 rounded-lg border border-hairline bg-cream px-3 py-2 text-xs text-ink placeholder:text-faint focus:border-copper/40 focus:outline-none"
                  />
                  {["2024", "2025", "2026"].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-[10px] ${
                        year === y
                          ? "border-copper bg-copper-wash text-copper"
                          : "border-hairline text-slate"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                <div className="mt-3 space-y-2">
                  {filteredCompleted.map((e) => (
                    <div
                      key={e.client + e.date}
                      className="flex items-center justify-between rounded-lg border border-hairline bg-cream/30 px-4 py-3 opacity-90"
                    >
                      <div>
                        <p className="text-sm text-ink">{e.client}</p>
                        <p className="text-xs text-slate">
                          {e.date} · {e.mirror}
                        </p>
                      </div>
                      <span className="text-[10px] text-faint">{e.stage}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                  <p className="font-mono text-[10px] text-faint">
                    Showing 1–{pageSize} of {completedTotal}
                  </p>
                  <div className="flex gap-1">
                    {["←", "→"].map((arrow) => (
                      <span
                        key={arrow}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-hairline text-xs text-slate"
                      >
                        {arrow}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Brainstorm notes */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
              className="rounded-2xl border border-copper/20 bg-copper-wash/30 p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Where hundreds of done events go
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Not on the dashboard</strong> — only
                    a count and a link, e.g. &quot;247 completed events&quot;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Dedicated archive list</strong> — search,
                    filter by year or customer, 50 per page
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">On the customer record</strong> — full
                    history for that client, past and future together
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                  <span>
                    <strong className="font-normal text-ink">Calendar toggle</strong> — &quot;Show past
                    events&quot; off by default so the week view stays clean
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="rounded-2xl border border-hairline bg-paper p-6 shadow-card"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                When does an event move to &quot;done&quot;?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Options to discuss in your next meeting — for example: manually when the team marks
                follow-up complete, automatically after the event date plus a set number of days, or
                when invoicing is marked done. Nothing is deleted; it just leaves the active views.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="rounded-xl border border-hairline bg-cream/80 px-5 py-4 text-xs leading-relaxed text-faint"
            >
              Illustrative only — archive rules, retention, and export needs can be added or
              changed when we define the scope together.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
