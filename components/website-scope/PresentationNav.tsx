const sections = [
  { id: "vaihtoehdot", label: "Yleiskuva" },
  { id: "vaihtoehto-a", label: "Vaihtoehto A" },
  { id: "vaihtoehto-b", label: "Vaihtoehto B" },
  { id: "vertailu", label: "Vertailu" },
  { id: "valinta", label: "Valinta" },
  { id: "crm", label: "CRM-yhteys" },
  { id: "kulut", label: "Juoksevat kulut" },
  { id: "yhteys", label: "Yhteystiedot" },
];

export default function PresentationNav() {
  return (
    <nav
      aria-label="Sisällysluettelo"
      className="sticky top-16 z-40 border-b border-hs-hairline bg-hs-paper/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3 md:px-10">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-full border border-transparent px-3 py-1.5 font-mono text-[10px] uppercase tracking-caps text-hs-muted transition-colors hover:border-hs-gold/30 hover:bg-hs-gold-wash hover:text-hs-ink"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
