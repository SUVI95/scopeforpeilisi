"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  id: number;
  from: "me" | "manager";
  text: string;
};

const initialThread: Message[] = [
  {
    id: 1,
    from: "manager",
    text: "Morning — Korhonen's media day moved to Thursday 10:00. Can you confirm transport?",
  },
];

export default function MessagingDemo() {
  const [thread, setThread] = useState<Message[]>(initialThread);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [thread, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    setThread((t) => [...t, { id: idRef.current++, from: "me", text }]);
    setTyping(true);

    const minDelay = new Promise((r) => setTimeout(r, 1500));
    let reply =
      "Got it — I'll check the schedule and confirm with you before end of day.";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) reply = data.reply;
      }
    } catch {
      /* fallback reply stands */
    }
    await minDelay;

    setTyping(false);
    setThread((t) => [...t, { id: idRef.current++, from: "manager", text: reply }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-hairline bg-obsidian/70 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-copper/25 font-display text-[11px] text-copper-bright">
              SL
            </div>
            <span className="text-xs text-ivory">S. Lindgren</span>
            <span className="h-1.5 w-1.5 rounded-full bg-verdant" aria-hidden />
          </div>
          <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[9px] uppercase tracking-caps text-faint">
            AI demo
          </span>
        </div>

        <div
          ref={scrollRef}
          className="flex h-48 flex-col gap-2.5 overflow-y-auto pr-1"
        >
          <AnimatePresence initial={false}>
            {thread.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.from === "me"
                    ? "self-end rounded-br-sm bg-copper/20 text-ivory"
                    : "self-start rounded-bl-sm border border-hairline bg-surface text-ivory/90"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 self-start rounded-xl rounded-bl-sm border border-hairline bg-surface px-3.5 py-3"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-muted"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Reply to Sofia…"
            className="min-w-0 flex-1 rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-xs text-ivory placeholder:text-faint focus:border-copper/60 focus:outline-none"
            aria-label="Message"
          />
          <button
            type="button"
            onClick={send}
            disabled={typing}
            className="cursor-pointer rounded-lg border border-copper/40 bg-copper/10 px-4 text-xs text-ivory transition-colors hover:bg-copper/25 disabled:cursor-default disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
        Conversations never leave the platform
      </p>
    </div>
  );
}
