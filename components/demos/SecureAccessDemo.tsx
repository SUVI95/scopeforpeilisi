"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Verdict = "idle" | "accepted" | "rejected";

export default function SecureAccessDemo() {
  const [email, setEmail] = useState("");
  const [verdict, setVerdict] = useState<Verdict>("idle");

  const check = () => {
    if (!email.includes("@")) return;
    const domain = email.split("@")[1]?.toLowerCase() ?? "";
    setVerdict(
      domain === "likel.com" || domain === "likel.fi" ? "accepted" : "rejected"
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-hairline bg-obsidian/70 p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-caps text-muted">
          Likel · Sign in
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setVerdict("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="name@likel.com"
            className="min-w-0 flex-1 rounded-lg border border-hairline bg-surface px-4 py-2.5 text-sm text-ivory placeholder:text-faint focus:border-copper/60 focus:outline-none"
            aria-label="Email address"
          />
          <button
            type="button"
            onClick={check}
            className="cursor-pointer rounded-lg border border-copper/40 bg-copper/10 px-4 py-2.5 text-sm text-ivory transition-colors hover:bg-copper/25"
          >
            Verify
          </button>
        </div>

        <div className="mt-4 h-9">
          <AnimatePresence mode="wait">
            {verdict === "accepted" && (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-verdant"
              >
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <motion.path
                    d="M4 12.5l5 5L20 6.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.svg>
                Domain verified — session opening
              </motion.div>
            )}
            {verdict === "rejected" && (
              <motion.div
                key="no"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: [0, -5, 5, -3, 3, 0] }}
                exit={{ opacity: 0 }}
                transition={{ x: { duration: 0.4 } }}
                className="flex items-center gap-2 text-sm text-signal"
              >
                <span aria-hidden>✕</span>
                Outside domain — access refused
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
        Try any address — only @likel passes
      </p>
    </div>
  );
}
