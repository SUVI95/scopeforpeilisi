"use client";

import { useCallback, useState } from "react";
import { discoverySections, flatQuestions } from "@/lib/discovery-questions";
import { formatSessionPlainText, type DiscoverySessionRow } from "@/lib/discovery-format";

type ResponseRow = DiscoverySessionRow & {
  answeredCount: number;
  totalQuestions: number;
  answersMap: Record<
    string,
    {
      question_id: string;
      section_id: string;
      section_title: string;
      question_text: string;
      answer_text: string;
      updated_at: string;
    }
  >;
};

export default function DiscoveryAdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"plain" | "structured">("plain");

  const fetchResponses = useCallback(async (secret: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/discovery/responses", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unauthorized");
      setResponses(data.responses);
      setAuthed(true);
      sessionStorage.setItem("discovery_admin_key", secret);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResponses(key);
  };

  const active = responses.find((r) => r.id === selected);
  const plainText = active ? formatSessionPlainText(active) : "";

  const copyPlainText = async () => {
    if (!plainText) return;
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = (sessionId?: string) => {
    const params = new URLSearchParams({ format: "txt", key });
    if (sessionId) params.set("sessionId", sessionId);
    window.open(`/api/discovery/responses?${params.toString()}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-cream px-6 py-12 font-sans text-ink">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-light">Peilisi · Discovery</h1>
        <p className="mt-1 text-sm text-slate">
          HSBridge admin — vastaukset sellaisenaan asiakkaan kirjoittamina
        </p>

        {!authed ? (
          <form onSubmit={handleLogin} className="mt-10 max-w-md">
            <label className="font-mono text-xs uppercase tracking-caps text-faint">
              Admin secret
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-paper px-4 py-3 text-sm"
              placeholder="DISCOVERY_ADMIN_SECRET"
            />
            {error && <p className="mt-2 text-sm text-copper">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-full border border-copper/30 bg-copper-wash px-6 py-3 text-sm"
            >
              {loading ? "Ladataan..." : "Näytä vastaukset"}
            </button>
          </form>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-2">
              <div className="mb-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => downloadTxt()}
                  className="w-full rounded-xl border border-copper/30 bg-copper-wash/40 px-4 py-2 text-left text-xs"
                >
                  Lataa kaikki (.txt)
                </button>
              </div>

              {responses.length === 0 && (
                <p className="text-sm text-slate">Ei vastauksia vielä.</p>
              )}
              {responses.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelected(r.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${
                    selected === r.id
                      ? "border-copper bg-copper-wash/40"
                      : "border-hairline bg-paper"
                  }`}
                >
                  <p className="font-medium">
                    {r.respondent_name ?? "Peilisi Oy"}
                  </p>
                  <p className="text-xs text-slate">
                    {r.answeredCount}/{r.totalQuestions} ·{" "}
                    {new Date(r.updated_at).toLocaleString("fi-FI")}
                  </p>
                  {r.completed && (
                    <span className="mt-1 inline-block text-[10px] text-verdant">
                      Valmis
                    </span>
                  )}
                </button>
              ))}
            </aside>

            <div className="rounded-2xl border border-hairline bg-paper p-8">
              {!active ? (
                <p className="text-sm text-slate">Valitse vastaus vasemmalta.</p>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline pb-4">
                    <div>
                      <h2 className="font-display text-2xl font-light">
                        {active.respondent_name ?? "Peilisi Oy"}
                      </h2>
                      {active.respondent_email && (
                        <p className="text-sm text-slate">{active.respondent_email}</p>
                      )}
                      <p className="mt-1 font-mono text-[10px] text-faint">
                        {active.id}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setView("plain")}
                        className={`rounded-full px-3 py-1.5 text-xs ${
                          view === "plain"
                            ? "bg-copper-wash text-ink"
                            : "border border-hairline text-slate"
                        }`}
                      >
                        Pelkkä teksti
                      </button>
                      <button
                        type="button"
                        onClick={() => setView("structured")}
                        className={`rounded-full px-3 py-1.5 text-xs ${
                          view === "structured"
                            ? "bg-copper-wash text-ink"
                            : "border border-hairline text-slate"
                        }`}
                      >
                        Osioittain
                      </button>
                      <button
                        type="button"
                        onClick={copyPlainText}
                        className="rounded-full border border-hairline px-3 py-1.5 text-xs text-slate"
                      >
                        {copied ? "Kopioitu" : "Kopioi teksti"}
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadTxt(active.id)}
                        className="rounded-full border border-copper/30 bg-copper-wash/40 px-3 py-1.5 text-xs"
                      >
                        Lataa .txt
                      </button>
                    </div>
                  </div>

                  {view === "plain" ? (
                    <pre className="mt-8 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">
                      {plainText}
                    </pre>
                  ) : (
                    <div className="mt-8 space-y-10">
                      {discoverySections.map((section) => {
                        const sectionAnswers = section.questions
                          .map((q) => active.answersMap[q.id])
                          .filter(Boolean);
                        if (sectionAnswers.length === 0) return null;

                        return (
                          <div key={section.id}>
                            <h3 className="font-mono text-xs uppercase tracking-caps text-copper">
                              {section.title}
                            </h3>
                            <div className="mt-4 space-y-6">
                              {section.questions.map((q) => {
                                const a = active.answersMap[q.id];
                                if (!a) return null;
                                return (
                                  <div key={q.id}>
                                    <p className="text-sm font-medium text-ink">
                                      {q.text}
                                    </p>
                                    <p className="mt-2 whitespace-pre-wrap rounded-lg border border-hairline bg-cream/60 px-4 py-3 text-sm leading-relaxed text-slate">
                                      {a.answer_text}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      {flatQuestions.filter((q) => !active.answersMap[q.id]).length >
                        0 && (
                        <div>
                          <h3 className="font-mono text-xs uppercase tracking-caps text-faint">
                            Vastaamatta
                          </h3>
                          <ul className="mt-3 space-y-2 text-sm text-faint">
                            {flatQuestions
                              .filter((q) => !active.answersMap[q.id])
                              .map((q) => (
                                <li key={q.id}>· {q.text}</li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
