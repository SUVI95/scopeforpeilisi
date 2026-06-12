"use client";

import { motion } from "framer-motion";

type ClickHintProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export default function ClickHint({
  children = "Click to explore",
  className = "",
  variant = "light",
}: ClickHintProps) {
  const isDark = variant === "dark";

  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-caps ${
        isDark ? "text-copper-light/90" : "text-copper"
      } ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
            isDark ? "bg-copper-light" : "bg-copper"
          }`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isDark ? "bg-copper-light" : "bg-copper/80"
          }`}
        />
      </span>
      {children}
      <span className="opacity-70" aria-hidden>
        →
      </span>
    </motion.p>
  );
}
