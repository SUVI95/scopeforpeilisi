import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peilisi Oy — Verkkosivuehdotus",
  description: "Kaksi vaihtoehtoa Peilisi Oy:n uudelle verkkosivulle ja CRM-integraatiolle.",
  robots: { index: false, follow: false },
};

export default function ScopeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scope-theme min-h-screen bg-hs-bg text-hs-ink [&_::selection]:bg-hs-gold/25 [&_::selection]:text-hs-ink">
      {children}
    </div>
  );
}
