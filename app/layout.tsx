import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peilisi — Alustaehdotus",
  description:
    "Peilisille räätälöity hallintajärjestelmä — asiakkaat, tapahtumat, peilit, automaatiot ja sähköposti yhdessä paikassa.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FDF9FB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans bg-cream text-ink">{children}</body>
    </html>
  );
}
