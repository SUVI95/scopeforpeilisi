"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const events: Record<number, { athlete: string; type: string; time: string }> = {
  3: { athlete: "E. Korhonen", type: "Media day", time: "10:00" },
  8: { athlete: "A. Niemi", type: "Sponsor meeting", time: "14:30" },
  12: { athlete: "L. Virtanen", type: "Match · away", time: "19:00" },
  17: { athlete: "E. Korhonen", type: "Medical review", time: "09:15" },
  21: { athlete: "T. Mäkelä", type: "Contract signing", time: "11:00" },
  26: { athlete: "A. Niemi", type: "Training camp", time: "08:00" },
};

export default function CalendarDemo() {
  const today = useMemo(() => new Date(), []);
  const [selected, setSelected] = useState<number | null>(null);

  const { monthLabel, daysInMonth, firstWeekday } = useMemo(() => {
    const y = today.getFullYear();
    const m = today.getMonth();
    const first = new Date(y, m, 1);
    return {
      monthLabel: first.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      // Monday-first index
      firstWeekday: (first.getDay() + 6) % 7,
    };
  }, [today]);

  const event = selected !== null ? events[selected] : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-hairline bg-obsidian/70 p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-caps text-muted">
          {monthLabel}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={`${d}-${i}`} className="pb-1 text-[10px] text-faint">
              {d}
            </span>
          ))}
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const hasEvent = day in events;
            const isToday = day === today.getDate();
            const isSelected = day === selected;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelected(isSelected ? null : day)}
                className={`relative flex h-8 cursor-pointer items-center justify-center rounded-md text-xs transition-colors ${
                  isSelected
                    ? "bg-copper/25 text-ivory"
                    : isToday
                      ? "bg-surface text-copper-bright"
                      : "text-muted hover:bg-surface hover:text-ivory"
                }`}
              >
                {day}
                {hasEvent && (
                  <span
                    className="absolute bottom-1 h-1 w-1 rounded-full bg-copper"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3 min-h-[64px]">
          <AnimatePresence mode="wait">
            {event ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border border-copper/30 bg-copper/5 px-4 py-3"
              >
                <p className="text-sm text-ivory">{event.type}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {event.athlete} · {event.time}
                </p>
              </motion.div>
            ) : selected !== null ? (
              <motion.p
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-1 pt-2 text-xs text-faint"
              >
                No events scheduled.
              </motion.p>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-1 pt-2 text-xs text-faint"
              >
                Select a marked day to open its event.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
        One calendar across the whole roster
      </p>
    </div>
  );
}
