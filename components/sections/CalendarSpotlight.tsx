"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";

const ease = [0.22, 1, 0.36, 1] as const;

const weekEvents = [
  {
    id: "thu",
    day: "Thu",
    date: "15 Aug",
    label: "Wedding · Mäkinen",
    location: "Hotel Kämp, Helsinki",
    mirror: "Mirror #3 · XL",
    status: "Confirmed",
  },
  {
    id: "sat",
    day: "Sat",
    date: "17 Aug",
    label: "Corporate event · Tech Oy",
    location: "Messukeskus, Helsinki",
    mirror: "Mirror #1 · Classic",
    status: "Quote pending",
  },
  {
    id: "sun",
    day: "Sun",
    date: "18 Aug",
    label: "Birthday · Korhonen",
    location: "Private venue · Vantaa",
    mirror: "Mirror #2 · Compact",
    status: "Delivered",
  },
];

const views = ["Day", "Week", "Month", "Agenda"];

export default function CalendarSpotlight() {
  const [selected, setSelected] = useState("thu");
  const [view, setView] = useState("Week");
  const active = weekEvents.find((e) => e.id === selected)!;

  return (
    <section id="calendar" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Calendar"
          title={
            <>
              Events and bookings
              <br />
              <em className="italic text-copper">in one calendar view.</em>
            </>
          }
          description="Event management and calendar view — see immediately which event is when and where, linked to customer records and mirror reservations."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="gpu rounded-2xl border border-hairline bg-paper p-6 shadow-card md:p-8"
          >
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Calendar view · {view}
                </p>
                <p className="mt-1 font-display text-xl font-light text-ink">
                  August 2026
                </p>
              </div>
              <div className="flex gap-1.5">
                {views.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] transition-colors ${
                      view === v ? "bg-copper-wash text-copper" : "text-faint hover:text-slate"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <ClickHint className="mb-4">Click an event in the week</ClickHint>

            <div className="flex flex-col gap-3">
              {weekEvents.map((ev, i) => (
                <motion.button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelected(ev.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all ${
                    selected === ev.id
                      ? "border-copper ring-1 ring-copper/20 bg-copper-wash/30"
                      : "border-hairline bg-cream/60 hover:border-copper/25"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">{ev.label}</p>
                    <p className="mt-0.5 text-xs text-slate">
                      {ev.day} {ev.date} · {ev.location}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-caps text-copper">
                    {ev.status}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="rounded-2xl border border-copper/25 bg-copper-wash/50 p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                Selected event
              </p>
              <h3 className="mt-2 font-display text-2xl font-light text-ink">
                {active.label}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-slate">
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Date</span>
                  {active.day} {active.date}
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Location</span>
                  {active.location}
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Mirror</span>
                  {active.mirror}
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-faint">Status</span>
                  {active.status}
                </li>
              </ul>
            </motion.div>

            <div className="rounded-2xl border border-hairline bg-paper p-7 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                What the calendar does
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "Shows all events in day, week, and month views",
                  "Links each event to customer, location, and mirror",
                  "Displays booking status clearly for the whole team",
                  "Powers automations (reminders, follow-up tasks)",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
