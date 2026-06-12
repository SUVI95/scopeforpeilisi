"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  {
    id: "crm",
    title: "Customers & contacts",
    summary: "All customer data in one place with search and activity history.",
    scope:
      "Customer records with contact persons, tags, notes, and chronological activity history. Search and filter by name, event type, or status. Linked to events, quotes, and mirror bookings.",
    icon: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M6 20v-1a6 6 0 0 1 12 0v1"],
    linkedSection: "#crm",
    featured: true,
  },
  {
    id: "pipeline",
    title: "Event & booking status tracking",
    summary: "From first contact to event and invoicing — clear status per customer.",
    scope:
      "Process stages: lead → offer → confirmed → event → invoicing done → follow-up. Each customer shows their current stage. Team queue and filtering by status.",
    icon: ["M4 19V5", "M4 19h16", "M8 15l3-3 3 3 4-5"],
    linkedSection: "#pipeline",
    featured: true,
  },
  {
    id: "calendar",
    title: "Event management & calendar",
    summary: "Which event is when and where — connected to a calendar view.",
    scope:
      "Day, week, month, and agenda views. Events linked to customer, location, and mirror. Event status and team visibility. Filter by date, customer, and status.",
    icon: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
    linkedSection: "#calendar",
    featured: true,
  },
  {
    id: "mirrors",
    title: "Mirror location & availability",
    summary: "A clear overview of where each mirror is and when it is booked.",
    scope:
      "Mirror records: name, type, current location, status (available, booked, in use, in maintenance). Linked to calendar bookings. Timeline for upcoming and past reservations.",
    icon: ["M4 4h16v16H4z", "M8 8h8v8H8z"],
    linkedSection: "#mirrors",
  },
  {
    id: "quotes",
    title: "Quote & contract tracking",
    summary: "No document creation — clear status tracking per customer.",
    scope:
      "Quote and contract entries with status (draft, sent, accepted, signed, declined). Linked to customer and event. Notes and update history.",
    icon: ["M4 6h16v14H4z", "M8 10h8", "M8 14h5"],
    linkedSection: "#quotes",
  },
  {
    id: "automations",
    title: "Automations",
    summary: "Pre-event reminders and automatic follow-up tasks after events.",
    scope:
      "Scheduled reminders for the team before events. Automatic follow-up task after delivery (e.g. mirror return). Quote follow-up and reminders. Triggers linked to calendar and status changes.",
    icon: ["M12 2v4", "M12 18v4", "M4.93 4.93l2.83 2.83", "M16.24 16.24l2.83 2.83"],
    linkedSection: "#automations",
    featured: true,
  },
  {
    id: "email",
    title: "Email automation",
    summary: "Automated sends when triggers fire — team notifications and customer messages.",
    scope:
      "HSBridge: triggers (calendar, status, form), sending setup, editable subject/body fields, send log. Peilisi: message wording and which automations to enable. Customer-facing emails are scoped and confirmed in your next meeting.",
    icon: ["M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"],
    linkedSection: "#automations",
  },
  {
    id: "webform",
    title: "Website contact form",
    summary: "New enquiries straight into the CRM — technical review before build.",
    scope:
      "Form fields (name, contact details, event type, date, message) synced to CRM. Automatic customer record creation and team notification. Automated replies to the enquirer are confirmed in your next meeting.",
    icon: ["M4 6h16", "M4 12h10", "M4 18h6"],
    linkedSection: "#contact-form",
  },
  {
    id: "auth",
    title: "Login & permissions",
    summary: "Secure sign-in and role-based access control.",
    scope:
      "Secure password login. Roles and permissions (e.g. admin, sales, operations). User-specific visibility. Session management and sign-out.",
    icon: ["M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"],
    linkedSection: "#security",
  },
];

function CapabilityCard({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const isFeatured = "featured" in cap && cap.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease }}
      className="gpu"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex h-full w-full cursor-pointer flex-col rounded-2xl border bg-paper p-7 text-left shadow-card transition-all duration-400 ${
          isFeatured
            ? "border-copper/30"
            : open
              ? "border-copper/40 shadow-lift"
              : "border-hairline hover:border-copper/25 hover:shadow-lift"
        }`}
      >
        {isFeatured && (
          <span className="mb-4 inline-flex w-fit rounded-full border border-copper/30 bg-copper-wash px-3 py-1 font-mono text-[10px] uppercase tracking-caps text-copper">
            Core area to discuss
          </span>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-copper">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl font-light text-ink">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {cap.summary}
              </p>
            </div>
          </div>
          <span className="mt-1 shrink-0 text-copper">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {cap.icon.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-hairline pt-5">
                <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                  Illustrative scope
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {cap.scope}
                </p>
                {"linkedSection" in cap && cap.linkedSection && (
                  <a
                    href={cap.linkedSection}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-block cursor-pointer text-xs text-copper underline-offset-2 hover:underline"
                  >
                    View detail section
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-caps text-faint">
          {open ? "Close" : "View scope detail"}
        </p>
      </button>
    </motion.article>
  );
}

export default function Features() {
  return (
    <section id="capabilities" className="relative bg-cream px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="08"
          eyebrow="Full scope"
          title={
            <>
              Nine platform areas.
              <br />
              <em className="italic text-copper">Within voucher budget.</em>
            </>
          }
          description="A summary of what we have in mind so far. Each area expands for illustration — fields can be added if something is missing, and the final design and feature set will be agreed in your next meeting."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {capabilities.map((c, i) => (
            <CapabilityCard key={c.id} cap={c} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm leading-relaxed text-slate">
          Delivery and the 15-day testing period are covered in the Delivery section.
          Nothing here is final until we align together in your next meeting.
        </p>
      </div>
    </section>
  );
}
