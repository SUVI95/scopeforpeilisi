"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const flowSteps = [
  {
    step: "1",
    title: "Something happens",
    detail: "An event is tomorrow, a form arrives, or a quote sits unanswered.",
  },
  {
    step: "2",
    title: "The platform notices",
    detail: "A rule you agreed on matches — date, status, or form submission.",
  },
  {
    step: "3",
    title: "Email sends automatically",
    detail: "The right person receives a message — no one has to remember to send it.",
  },
];

type EmailPreview = {
  to: string;
  from: string;
  subject: string;
  body: string;
  audience: "team" | "customer";
};

const automations = [
  {
    id: "reminder",
    title: "Pre-event reminder",
    trigger: "24 hours before event",
    action: "Email to assigned team member(s)",
    timeline: ["Event in calendar", "24h before start", "Team inbox"],
    icon: ["M12 8v4l3 3", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"],
    email: {
      to: "operations@peilisi.fi",
      from: "Peilisi Platform <notifications@peilisi.fi>",
      subject: "Tomorrow: Wedding · Mäkinen · Mirror #3",
      body:
        "Hi team,\n\nReminder for tomorrow:\n\nCustomer: Mäkinen family\nMirror: #3 (Classic Gold)\nLocation: Hotel Kämp\nTime: 14:00\n\nOpen event in platform →",
      audience: "team" as const,
    },
  },
  {
    id: "followup",
    title: "Post-event follow-up",
    trigger: "Event marked as delivered",
    action: "Task created + email to logistics",
    timeline: ["Event completed", "Status updated", "Task + notification"],
    icon: ["M20 7L9 18l-5-5"],
    email: {
      to: "logistics@peilisi.fi",
      from: "Peilisi Platform <notifications@peilisi.fi>",
      subject: "Task: Return Mirror #3 to warehouse",
      body:
        "Hi logistics,\n\nEvent delivered — please schedule return:\n\nMirror: #3\nFrom: Hotel Kämp\nDue: within 48 hours\n\nMark complete in platform when done →",
      audience: "team" as const,
    },
  },
  {
    id: "quote-follow",
    title: "Quote follow-up",
    trigger: "Offer sent, no reply after 3 days",
    action: "Reminder email to sales",
    timeline: ["Quote sent", "3 days, no change", "Sales inbox"],
    icon: ["M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"],
    email: {
      to: "sales@peilisi.fi",
      from: "Peilisi Platform <notifications@peilisi.fi>",
      subject: "Follow up: Tech Oy · offer still open",
      body:
        "Hi sales,\n\nTech Oy's offer has been open for 3 days with no status change.\n\nCustomer: Jari Virtanen\nEvent: Corporate gala · 15 Oct\nOffer value: €2,400\n\nView quote and follow up →",
      audience: "team" as const,
    },
  },
  {
    id: "lead",
    title: "New enquiry notification",
    trigger: "Contact form submitted",
    action: "Email + in-app alert to team",
    timeline: ["Form on peilisi.fi", "CRM record created", "Team notified"],
    icon: ["M4 6h16v12H4z", "M4 8l8 5 8-5"],
    email: {
      to: "sales@peilisi.fi",
      from: "Peilisi Platform <notifications@peilisi.fi>",
      subject: "New enquiry: Anna Korhonen · Wedding",
      body:
        "New lead from the website:\n\nName: Anna Korhonen\nEvent: Wedding\nDate: 22 September\nMessage: Looking for a mirror for 120 guests…\n\nOpen in CRM →",
      audience: "team" as const,
    },
  },
  {
    id: "thankyou",
    title: "Post-event thank-you",
    trigger: "Event marked complete",
    action: "Thank-you email to customer",
    timeline: ["Event finished", "Marked complete", "Customer inbox"],
    icon: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
    email: {
      to: "anna.korhonen@example.fi",
      from: "Peilisi <hello@peilisi.fi>",
      subject: "Thank you — your event with Peilisi",
      body:
        "Dear Anna,\n\nThank you for choosing Peilisi for your wedding. We hope the mirror added something special to your day.\n\nIf you have feedback or would like to book again, simply reply to this email.\n\nWarm regards,\nThe Peilisi team",
      audience: "customer" as const,
    },
  },
];

const emailTypeExamples: Record<"team" | "customer", EmailPreview & { label: string; caption: string }> = {
  team: {
    label: "Team notification",
    caption: "Goes to your team inbox — reminders, new leads, tasks.",
    to: "sales@peilisi.fi",
    from: "Peilisi Platform <notifications@peilisi.fi>",
    subject: "New enquiry: Anna Korhonen · Wedding",
    body:
      "New lead from the website:\n\nName: Anna Korhonen\nEvent: Wedding · 22 Sep\n\nThe platform created a CRM record automatically. Open it to respond →",
    audience: "team",
  },
  customer: {
    label: "Customer message",
    caption: "Goes to your customer — confirmations, thank-yous, updates.",
    to: "anna.korhonen@example.fi",
    from: "Peilisi <hello@peilisi.fi>",
    subject: "Thank you — your event with Peilisi",
    body:
      "Dear Anna,\n\nThank you for choosing Peilisi. We hope your event was everything you imagined.\n\nWarm regards,\nThe Peilisi team",
    audience: "customer",
  },
};

const emailRoles = [
  {
    id: "hsbridge",
    label: "HSBridge builds",
    items: [
      "When an email sends — triggers tied to calendar, status, or form",
      "Sending setup and connection to your email domain",
      "Editable subject and body fields inside the platform",
      "Send log — what went out and when",
    ],
  },
  {
    id: "peilisi",
    label: "Peilisi provides",
    items: [
      "Message wording — your tone, Finnish copy, brand voice",
      "Which automations to enable",
      "Who receives each notification",
    ],
  },
  {
    id: "meeting",
    label: "Confirm in next meeting",
    items: [
      "Team-only emails vs customer-facing emails",
      "How many automated emails to start with",
      "Whether Peilisi drafts copy or adapts existing messages",
    ],
  },
];

function AutomationIcon({ paths }: { paths: string[] }) {
  return (
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-cream text-copper">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

function FlowArrow() {
  return (
    <div className="hidden shrink-0 items-center justify-center md:flex" aria-hidden>
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="text-copper/50">
        <path d="M0 6h22M22 6l-5-4M22 6l-5 4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function EmailMock({
  preview,
  compact = false,
}: {
  preview: EmailPreview;
  compact?: boolean;
}) {
  const isTeam = preview.audience === "team";

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-paper shadow-card">
      <div className="flex items-center gap-2 border-b border-hairline bg-cream/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-sm ring-1 ring-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-sm ring-1 ring-hairline" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/80 shadow-sm ring-1 ring-hairline" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-caps text-faint">
          {isTeam ? "Team inbox" : "Customer inbox"}
        </span>
        <span
          className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-caps ${
            isTeam
              ? "border border-verdant/25 bg-verdant/10 text-verdant"
              : "border border-copper/25 bg-copper-wash text-copper"
          }`}
        >
          {isTeam ? "Internal" : "Customer"}
        </span>
      </div>

      <div className={compact ? "p-4" : "p-5 md:p-6"}>
        <div className="space-y-2 border-b border-hairline pb-4">
          <div className="flex gap-2 text-[11px]">
            <span className="w-12 shrink-0 text-faint">From</span>
            <span className="text-slate">{preview.from}</span>
          </div>
          <div className="flex gap-2 text-[11px]">
            <span className="w-12 shrink-0 text-faint">To</span>
            <span className="text-slate">{preview.to}</span>
          </div>
          <div className="flex gap-2 text-[11px]">
            <span className="w-12 shrink-0 text-faint">Subject</span>
            <span className="font-medium text-ink">{preview.subject}</span>
          </div>
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate">
          {preview.body}
        </p>
        {!compact && (
          <p className="mt-4 rounded-lg border border-copper/15 bg-copper-wash/30 px-3 py-2 text-[10px] text-slate">
            Automated — sent by the platform when the trigger fires. Wording is editable; Peilisi supplies the copy.
          </p>
        )}
      </div>
    </div>
  );
}

function TimelineStrip({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-hairline bg-cream px-3 py-1 text-[10px] text-slate">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-faint" aria-hidden>
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function AutomationsSpotlight() {
  const [active, setActive] = useState("reminder");
  const [emailType, setEmailType] = useState<"team" | "customer">("team");
  const [roleTab, setRoleTab] = useState("hsbridge");

  const current = automations.find((a) => a.id === active)!;
  const roleContent = emailRoles.find((r) => r.id === roleTab)!;
  const typeExample = emailTypeExamples[emailType];

  return (
    <section id="automations" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          eyebrow="Automations & email"
          title={
            <>
              When something happens,
              <br />
              <em className="italic text-copper">the right email goes out.</em>
            </>
          }
          description="Email automation means the platform sends a message when a defined event occurs — without anyone having to remember. Below is how it works, what it looks like in an inbox, and who builds what."
        />

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="mt-14 rounded-2xl border border-hairline bg-paper p-6 shadow-card md:p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
            How email automation works
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate">
            No technical background needed — this is the basic flow every automation follows.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-3">
            {flowSteps.map((item, i) => (
              <div key={item.step} className="flex flex-1 items-stretch gap-3 md:flex-col md:gap-0">
                <div className="flex flex-1 flex-col rounded-xl border border-hairline bg-cream/60 p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-copper/30 bg-copper-wash font-mono text-xs text-copper">
                    {item.step}
                  </span>
                  <p className="mt-3 text-sm font-medium text-ink">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate">{item.detail}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <>
                    <FlowArrow />
                    <div className="flex items-center justify-center py-1 md:hidden" aria-hidden>
                      <span className="text-copper/50">↓</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team vs customer email types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="mt-10 grid gap-8 lg:grid-cols-2"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
              Two types of automated email
            </p>
            <h3 className="mt-2 font-display text-2xl font-light text-ink">
              Who receives the message?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Most automations start with internal team notifications. Customer messages — such as
              thank-you notes or confirmations — use the same mechanism but go to your client&apos;s
              inbox. Content and scope are confirmed in your next meeting.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(["team", "customer"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEmailType(type)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                    emailType === type
                      ? "border-copper bg-copper-wash text-copper"
                      : "border-hairline text-slate hover:border-copper/30"
                  }`}
                >
                  {emailTypeExamples[type].label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={emailType}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease }}
                className="mt-4 text-sm text-slate"
              >
                {typeExample.caption}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-verdant/20 bg-verdant/5 p-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-verdant">
                  Typical starting point
                </p>
                <p className="mt-2 text-sm text-slate">
                  Internal notifications — reminders before events, new lead alerts, and task
                  assignments to the team.
                </p>
              </div>
              <div className="rounded-xl border border-copper/20 bg-copper-wash/30 p-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                  Customer messages
                </p>
                <p className="mt-2 text-sm text-slate">
                  Thank-you emails, booking confirmations, and follow-ups — sent from your domain
                  with wording Peilisi provides.
                </p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={emailType}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <EmailMock preview={typeExample} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Example automations with live email preview */}
        <div className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
            Example automations · illustrative
          </p>
          <h3 className="mt-2 font-display text-2xl font-light text-ink">
            Pick an example — see the trigger and the email
          </h3>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div className="flex flex-col gap-2">
              {automations.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                    active === a.id
                      ? "border-copper bg-copper-wash/40"
                      : "border-hairline bg-paper hover:border-copper/25"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AutomationIcon paths={a.icon} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-ink">{a.title}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-caps ${
                            a.email.audience === "team"
                              ? "bg-verdant/10 text-verdant"
                              : "bg-copper-wash text-copper"
                          }`}
                        >
                          {a.email.audience === "team" ? "Team" : "Customer"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate">{a.trigger}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="space-y-5"
              >
                <div className="rounded-xl border border-hairline bg-paper p-5">
                  <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                    Trigger → action
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[9px] text-faint">When</p>
                      <p className="mt-1 text-sm text-ink">{current.trigger}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-faint">Then</p>
                      <p className="mt-1 text-sm text-ink">{current.action}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="font-mono text-[9px] text-faint">Flow</p>
                    <div className="mt-2">
                      <TimelineStrip steps={current.timeline} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-caps text-faint">
                    What the recipient sees
                  </p>
                  <EmailMock preview={current.email} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="mt-16 rounded-2xl border border-hairline bg-paper p-8 shadow-card"
        >
          <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
            Responsibilities
          </p>
          <h3 className="mt-2 font-display text-2xl font-light text-ink">
            Who builds what
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate">
            HSBridge builds the technical framework — triggers, scheduling, delivery, and editable
            fields. Peilisi provides the message wording and decides which automations to enable.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {emailRoles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoleTab(r.id)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors ${
                  roleTab === r.id
                    ? "border-copper bg-copper-wash text-copper"
                    : "border-hairline text-slate hover:border-copper/30"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <motion.ul
            key={roleTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="mt-5 space-y-3"
          >
            {roleContent.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
