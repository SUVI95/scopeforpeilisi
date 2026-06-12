"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const levels = [
  {
    id: "events",
    label: "Events only",
    visible: ["Schedule", "Event briefs"],
    sealed: ["Profile", "Contracts", "Medical"],
  },
  {
    id: "full",
    label: "Full profile",
    visible: ["Schedule", "Event briefs", "Profile", "Contracts", "Medical"],
    sealed: [],
  },
  {
    id: "custom",
    label: "Custom",
    visible: ["Schedule", "Profile"],
    sealed: ["Event briefs", "Contracts", "Medical"],
  },
] as const;

export default function SharingDemo() {
  const [level, setLevel] = useState(0);
  const current = levels[level];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-hairline bg-obsidian/70 p-5">
        {/* avatars */}
        <div className="mb-5 flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/25 font-display text-sm text-copper-bright">
              SL
            </div>
            <span className="text-[10px] text-muted">S. Lindgren</span>
          </div>
          <div className="relative h-px w-16 bg-hairline">
            <motion.div
              className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-copper-bright"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface font-display text-sm text-muted ring-1 ring-hairline">
              MJ
            </div>
            <span className="text-[10px] text-muted">M. Järvinen · cover</span>
          </div>
        </div>

        {/* permission slider */}
        <div className="mb-5">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full cursor-pointer accent-[#C08460]"
            aria-label="Permission level"
          />
          <div className="mt-1 flex justify-between">
            {levels.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevel(i)}
                className={`cursor-pointer text-[10px] transition-colors ${
                  i === level ? "text-copper-bright" : "text-faint hover:text-muted"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* what MJ sees */}
        <p className="mb-2 font-mono text-[10px] uppercase tracking-caps text-muted">
          M. Järvinen can see
        </p>
        <div className="flex flex-wrap gap-1.5">
          {current.visible.map((v) => (
            <motion.span
              key={v}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-full border border-verdant/30 bg-verdant/10 px-2.5 py-1 text-[11px] text-verdant"
            >
              {v}
            </motion.span>
          ))}
          {current.sealed.map((v) => (
            <motion.span
              key={v}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.6, scale: 1 }}
              className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11px] text-faint line-through"
            >
              {v}
            </motion.span>
          ))}
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
        Coverage access changes in real time
      </p>
    </div>
  );
}
