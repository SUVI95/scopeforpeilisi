"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileDemo() {
  const [sensitive, setSensitive] = useState(false);
  const [managerOn, setManagerOn] = useState(false);

  const sealed = sensitive && !managerOn;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-hairline bg-obsidian/70 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/20 font-display text-sm text-copper-bright">
              EK
            </div>
            <div>
              <p className="text-sm text-ivory">E. Korhonen</p>
              <p className="text-xs text-muted">Ice Hockey · Forward</p>
            </div>
          </div>
          {/* view toggle */}
          <div className="flex rounded-full border border-hairline bg-surface p-0.5">
            {(["Standard", "Sensitive"] as const).map((v) => {
              const isActive = (v === "Sensitive") === sensitive;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSensitive(v === "Sensitive")}
                  className={`cursor-pointer rounded-full px-3 py-1 text-[11px] transition-colors ${
                    isActive ? "bg-copper/20 text-ivory" : "text-muted hover:text-ivory"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { label: "Club", value: "HC Aurora", protected: false },
            { label: "Agent", value: "S. Lindgren", protected: false },
            { label: "Contract value", value: "€1.4M / 2yr", protected: true },
            { label: "Medical status", value: "Cleared · 02 Jun", protected: true },
          ].map((row) => {
            const hidden = row.protected && sealed;
            return (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg border border-hairline bg-surface/60 px-3 py-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-caps text-muted">
                  {row.label}
                </span>
                <span
                  className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                    hidden ? "select-none text-faint blur-[4px]" : "text-ivory"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>

        {sensitive && (
          <motion.label
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex cursor-pointer items-center justify-between rounded-lg border border-copper/30 bg-copper/5 px-3 py-2.5"
          >
            <span className="flex items-center gap-2 text-xs text-ivory">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Manager authorisation
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={managerOn}
              onClick={() => setManagerOn((s) => !s)}
              className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${
                managerOn ? "bg-copper" : "bg-faint/40"
              }`}
            >
              <motion.span
                layout
                className="absolute top-0.5 h-4 w-4 rounded-full bg-ivory"
                animate={{ left: managerOn ? "calc(100% - 18px)" : "2px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </motion.label>
        )}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
        Sensitive fields stay sealed without authorisation
      </p>
    </div>
  );
}
