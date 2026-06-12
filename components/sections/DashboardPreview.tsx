"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const tabs = [
  { id: "overview", label: "Dashboard" },
  { id: "events", label: "Events" },
  { id: "pipeline", label: "Pipeline" },
  { id: "mirrors", label: "Mirrors" },
  { id: "automations", label: "Tasks & email" },
  { id: "form", label: "Web form" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type EventTab = "upcoming" | "completed";

const pipelineStages = [
  { id: "lead", label: "Lead", color: "bg-sand" },
  { id: "offer", label: "Offer", color: "bg-copper-wash" },
  { id: "confirmed", label: "Confirmed", color: "bg-copper/15" },
  { id: "event", label: "Event", color: "bg-verdant/10" },
  { id: "invoicing", label: "Invoicing done", color: "bg-cream" },
  { id: "followup", label: "Follow-up", color: "bg-paper" },
];

const pipelineCards: Record<string, { title: string; meta: string }[]> = {
  lead: [{ title: "Design Week enquiry", meta: "Web form · today" }],
  offer: [
    { title: "Tech Oy · corporate", meta: "Offer sent · 3 days ago" },
    { title: "Virtanen · birthday", meta: "Draft offer" },
  ],
  confirmed: [{ title: "Mäkinen · wedding", meta: "Mirror #3 · 15 Aug" }],
  event: [{ title: "Korhonen · birthday", meta: "In progress · today" }],
  invoicing: [{ title: "Lahti corporate gala", meta: "Ready to invoice" }],
  followup: [{ title: "Helsinki summer party", meta: "Follow-up task complete" }],
};

const upcomingEvents = [
  { date: "15 Aug", client: "Mäkinen · wedding", mirror: "Mirror #3", status: "Confirmed" },
  { date: "17 Aug", client: "Tech Oy · corporate", mirror: "Mirror #1", status: "Offer open" },
  { date: "18 Aug", client: "Korhonen · birthday", mirror: "Mirror #2", status: "Event day" },
];

const openOffers = [
  { client: "Tech Oy", value: "€1,240", age: "3 days" },
  { client: "Virtanen", value: "€650", age: "1 day" },
];

const mirrors = [
  { name: "Mirror #1", status: "Booked", util: 78 },
  { name: "Mirror #2", status: "In use", util: 92 },
  { name: "Mirror #3", status: "Booked", util: 85 },
  { name: "Mirror #4", status: "Available", util: 34 },
];

const tasks = [
  { type: "Reminder", text: "Pre-event check · Mäkinen wedding · tomorrow 09:00", auto: true },
  { type: "Email", text: "Follow-up offer · Tech Oy · no reply in 3 days", auto: true },
  { type: "Task", text: "Return Mirror #2 to warehouse · after Korhonen event", auto: true },
  { type: "Task", text: "Follow-up complete · Helsinki summer party", auto: true },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
            ["upcoming", "Upcoming · 6"],
            ["completed", `Completed · ${archiveTotal}`],
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
            Active calendar and dashboard — next events only.
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
            Archive — paginated list, not shown on the main dashboard.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-md border border-hairline bg-cream/60 px-3 py-1.5 text-[10px] text-faint">
              Search past events...
            </div>
            <span className="rounded-md border border-hairline px-2 py-1.5 text-[10px] text-copper">
              2026
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            {["Korhonen · birthday · Jun", "Lahti gala · May", "… +244 more"].map(
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
            Page 1 of 5 · 50 per page
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
        <StatCard label="Upcoming events" value="6" sub="Next 14 days" accent />
        <StatCard label="Completed" value="247" sub="In archive · searchable" />
        <StatCard label="Mirror utilization" value="72%" sub="Fleet average" accent />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-paper p-4">
          <p className="font-mono text-[9px] uppercase tracking-caps text-faint">
            Upcoming events
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
            Open offers
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
            Mirror utilization
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
        Deal and event stages — cards move between columns in the live platform.
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
          Mirror inventory
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
          Availability calendar
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
          Each cell shows which mirror is booked. Click a date to see full event details.
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
          Task reminders and team email notifications — triggers fire automatically;
          message text supplied by Peilisi.
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
                <p className="mt-0.5 text-[10px] text-faint">Automated</p>
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
          peilisi.fi · contact form
        </p>
        <div className="mt-3 space-y-2">
          {[
            ["Name", "Anna Korhonen"],
            ["Email", "anna@example.fi"],
            ["Event", "Wedding · 22 Sep"],
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
          className="mt-4 w-full rounded-lg border border-copper/30 bg-copper-wash py-2 text-xs text-copper transition-colors hover:border-copper"
        >
          Simulate submission
        </button>
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
            CRM · new lead
          </p>
          {submitted ? (
            <div className="mt-3 space-y-2">
              {[
                "Customer record created",
                "Stage set to Lead",
                "Activity logged with timestamp",
                "Team notification sent",
              ].map((item) => (
                <div key={item} className="flex gap-2 text-xs text-slate">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-verdant" />
                  {item}
                </div>
              ))}
              <div className="mt-3 rounded-lg border border-verdant/20 bg-verdant/5 px-3 py-2 text-[11px] text-verdant">
                Anna Korhonen · Wedding · Lead
              </div>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate">
              Submit the form to see how a website enquiry flows into the CRM as a new lead.
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
          index="Preview"
          eyebrow="Concept preview"
          title={
            <>
              An idea of how it
              <br />
              <em className="italic text-copper">could look and work.</em>
            </>
          }
          description="An illustrative preview — not a final design. Fields, layout, and workflows shown here may be added, removed, or refined. The final design and feature set will be confirmed in your next meeting."
        />

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
              Preview
            </span>
          </div>

          <div className="flex min-h-[520px] flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="border-b border-white/10 bg-[#141014] p-4 lg:w-52 lg:border-b-0 lg:border-r">
              <p className="font-display text-sm text-cream">Peilisi</p>
              <p className="font-mono text-[9px] uppercase tracking-caps text-white/30">
                Operations
              </p>
              <nav className="mt-6 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
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
                    {tab === "overview" && "Operations overview"}
                    {tab === "events" && "Upcoming & completed events"}
                    {tab === "pipeline" && "Deal & event pipeline"}
                    {tab === "mirrors" && "Mirror inventory & calendar"}
                    {tab === "automations" && "Reminders & follow-up email"}
                    {tab === "form" && "Website form → CRM"}
                  </h3>
                </div>
                <span className="hidden rounded-full border border-hairline bg-paper px-2.5 py-1 font-mono text-[9px] text-faint sm:inline">
                  Illustrative only
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
            Before we build
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate">
            Missing a field or step? It can be added. This preview shows the
            direction of travel — final design, data fields, and features will
            be set together in your next meeting.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Lead → offer → confirmed → event → invoicing → follow-up",
            "Mirror inventory & availability calendar",
            "Task reminders & team email automation",
            "Dashboard: events, offers, utilization",
            "Website form capture into CRM",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-hairline bg-paper px-4 py-3 text-[11px] leading-relaxed text-slate"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
