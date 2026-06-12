"use client";

import { motion } from "framer-motion";

const data = [
  { sport: "Ice Hockey", count: 7 },
  { sport: "Football", count: 5 },
  { sport: "Tennis", count: 3 },
  { sport: "Athletics", count: 4 },
  { sport: "Golf", count: 2 },
];

const max = Math.max(...data.map((d) => d.count));

export default function WorkspaceDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-hairline bg-obsidian/70 p-5">
        <div className="mb-5 flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-caps text-muted">
            My athletes · by sport
          </p>
          <p className="font-display text-2xl font-light text-copper-bright">21</p>
        </div>
        <div className="flex flex-col gap-3">
          {data.map((d, i) => (
            <div key={d.sport} className="group flex items-center gap-3">
              <span className="w-20 shrink-0 text-[11px] text-muted transition-colors group-hover:text-ivory">
                {d.sport}
              </span>
              <div className="h-5 flex-1 overflow-hidden rounded-sm bg-surface">
                <motion.div
                  className="gpu h-full rounded-sm bg-gradient-to-r from-copper-deep to-copper"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  style={{
                    width: `${(d.count / max) * 100}%`,
                    transformOrigin: "left",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.7 + i * 0.12 }}
                className="w-5 text-right font-mono text-xs text-ivory"
              >
                {d.count}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
        Each manager sees only their own roster
      </p>
    </div>
  );
}
