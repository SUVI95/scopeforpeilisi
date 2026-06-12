"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-sand">
      <div className="relative mx-auto max-w-7xl px-6 py-28 text-center md:px-10 md:py-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease }}
          className="font-mono text-xs uppercase tracking-caps text-copper"
        >
          Seuraava askel
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="mx-auto mt-8 max-w-3xl font-display text-4xl font-light leading-[1.12] text-ink md:text-5xl text-balance"
        >
          Sovitaan lyhyt tapaaminen, vahvistetaan sisältö ja ulkoasu — ja rakennetaan
          alusta, joka tukee teidän arkea.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
        >
          <a
            href="tel:+358449784936"
            className="inline-flex cursor-pointer items-center rounded-full border border-copper/30 bg-paper px-8 py-4 text-sm tracking-wide text-ink shadow-card transition-all duration-300 hover:border-copper hover:shadow-lift"
          >
            +358 44 9784 936
          </a>
          <a
            href="mailto:suvi@hsbridgeai.fi"
            className="inline-flex cursor-pointer items-center rounded-full border border-hairline bg-paper px-8 py-4 text-sm tracking-wide text-slate shadow-card transition-all duration-300 hover:border-copper/30 hover:text-ink"
          >
            suvi@hsbridgeai.fi
          </a>
          <a
            href="mailto:henri@hsbridgeai.fi"
            className="inline-flex cursor-pointer items-center rounded-full border border-hairline bg-paper px-8 py-4 text-sm tracking-wide text-slate shadow-card transition-all duration-300 hover:border-copper/30 hover:text-ink"
          >
            henri@hsbridgeai.fi
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 rounded-2xl bg-ink px-8 py-10 md:px-12"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-left">
              <p className="font-display text-lg text-cream">Peilisi</p>
              <p className="mt-1 text-xs text-faint">
                Alustaehdotus · kesäkuu 2026
              </p>
              <p className="mt-2 text-xs text-faint/80">
                peilisi.fi · @peilisi_fi
              </p>
            </div>

            <a
              href="https://www.hsbridgeai.fi/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer flex-col items-center gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-caps text-faint transition-colors group-hover:text-cream/70">
                Laatija
              </span>
              <Image
                src="/hsbridge-logo.png"
                alt="HSBridge AI"
                width={180}
                height={42}
                className="h-auto w-44 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              />
            </a>

            <div className="text-right">
              <p className="font-mono text-[10px] text-faint">
                © 2026 HSBridge Oy
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
