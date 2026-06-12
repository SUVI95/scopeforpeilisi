"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#preview", label: "Esikatselu" },
  { href: "#pipeline", label: "Prosessi" },
  { href: "#crm", label: "Asiakkaat" },
  { href: "#calendar", label: "Kalenteri" },
  { href: "#events-lifecycle", label: "Tapahtumat" },
  { href: "#mirrors", label: "Peilit" },
  { href: "#automations", label: "Automaatiot" },
  { href: "#capabilities", label: "Sisältö" },
  { href: "#delivery", label: "Toteutus" },
  { href: "#discovery", label: "Kysely" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-hairline bg-cream/90 backdrop-blur-md shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="group flex items-baseline gap-2 cursor-pointer">
          <span className="font-display text-lg tracking-wide text-ink">Peilisi</span>
          <span className="font-mono text-[10px] uppercase tracking-caps text-slate transition-colors group-hover:text-copper">
            Alustaehdotus
          </span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cursor-pointer text-xs uppercase tracking-caps text-slate transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <span className="font-mono text-[10px] uppercase tracking-caps text-faint">
          HSBridge AI · 2026
        </span>
      </div>
    </header>
  );
}
