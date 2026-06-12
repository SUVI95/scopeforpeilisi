"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClickHint from "@/components/ui/ClickHint";
import {
  discoverySections,
  flatQuestions,
  totalQuestionCount,
} from "@/lib/discovery-questions";

const ease = [0.22, 1, 0.36, 1] as const;
const SESSION_KEY = "peilisi_discovery_session";

type Phase = "intro" | "questions" | "done";

export default function DiscoveryForm() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSectionIntro, setShowSectionIntro] = useState(true);

  const current = flatQuestions[step];
  const currentSection = useMemo(
    () => discoverySections.find((s) => s.id === current?.sectionId),
    [current]
  );

  const isFirstInSection =
    current && flatQuestions.findIndex((q) => q.id === current.id) ===
      flatQuestions.findIndex((q) => q.sectionId === current.sectionId);

  const progress = phase === "questions" ? ((step + 1) / totalQuestionCount) * 100 : 0;

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) setSessionId(stored);
  }, []);

  useEffect(() => {
    if (phase === "questions" && isFirstInSection) {
      setShowSectionIntro(true);
    }
  }, [step, phase, isFirstInSection]);

  const saveAnswer = useCallback(
    async (
      text: string,
      opts?: { completed?: boolean }
    ) => {
      if (!current) return null;
      setSaving(true);
      setError(null);

      try {
        const res = await fetch("/api/discovery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionId ?? undefined,
            questionId: current.id,
            sectionId: current.sectionId,
            sectionTitle: current.sectionTitle,
            questionText: current.text,
            answer: text,
            completed: opts?.completed ?? false,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Tallennus epäonnistui");

        if (data.sessionId && !sessionId) {
          localStorage.setItem(SESSION_KEY, data.sessionId);
          setSessionId(data.sessionId);
        }
        return data.sessionId as string;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Tallennus epäonnistui");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [current, sessionId]
  );

  const handleStartQuestions = () => {
    setPhase("questions");
    setStep(0);
    setShowSectionIntro(true);
  };

  const handleNext = async () => {
    const isLast = step >= totalQuestionCount - 1;
    const saved = await saveAnswer(answer, { completed: isLast });
    if (!saved) return;

    setAnswer("");
    if (!isLast) {
      setStep((s) => s + 1);
    } else {
      setPhase("done");
    }
  };

  const handleSkip = async () => {
    const isLast = step >= totalQuestionCount - 1;
    const saved = await saveAnswer("—", { completed: isLast });
    if (!saved) return;

    setAnswer("");
    if (!isLast) {
      setStep((s) => s + 1);
    } else {
      setPhase("done");
    }
  };

  return (
    <section id="discovery" className="relative bg-sand px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="12"
          eyebrow="Ennen seuraavaa tapaamista"
          title={
            <>
              Valmistautuminen
              <br />
              <em className="italic text-copper">seuraavaan tapaamiseen.</em>
            </>
          }
          description="Lyhyt kysely, jossa vastaatte muutamaan kysymykseen kerrallaan. Vastaukset tallentuvat suoraan HSBridgelle, jotta voimme valmistautua tapaamiseen asianmukaisesti."
          align="center"
        />

        <div className="overflow-hidden rounded-2xl border border-hairline bg-paper shadow-card">
          {phase === "questions" && (
            <div className="h-1 bg-cream">
              <motion.div
                className="h-full bg-copper"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease }}
                  className="text-center"
                >
                  <p className="text-base leading-relaxed text-slate">
                    Kysely auttaa meitä ymmärtämään nykyistä toimintaanne ennen
                    seuraavaa tapaamista. Vastatkaa omalla tahdillanne; voitte
                    ohittaa kysymyksen tarvittaessa.
                  </p>
                  <p className="mt-4 text-sm text-faint">
                    {totalQuestionCount} kysymystä · arvioitu kesto 10–15 minuuttia
                  </p>
                  <ClickHint className="mt-6 justify-center">
                    Klikkaa aloittaaksesi
                  </ClickHint>
                  <button
                    type="button"
                    onClick={handleStartQuestions}
                    className="mt-8 inline-flex cursor-pointer items-center rounded-full border border-copper/30 bg-copper-wash px-8 py-4 text-sm text-ink transition-all hover:border-copper hover:shadow-lift"
                  >
                    Aloita kysely
                  </button>
                </motion.div>
              )}

              {phase === "questions" && current && currentSection && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-caps text-faint">
                    {current.sectionTitle} · {step + 1} / {totalQuestionCount}
                  </p>

                  {showSectionIntro && isFirstInSection && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 rounded-xl border border-copper/15 bg-copper-wash/30 px-4 py-3 text-sm leading-relaxed text-slate"
                    >
                      {currentSection.intro}
                    </motion.p>
                  )}

                  <h3 className="mt-6 font-display text-2xl font-light leading-snug text-ink md:text-3xl">
                    {current.text}
                  </h3>

                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={5}
                    placeholder="Kirjoittakaa vastauksenne tähän..."
                    className="mt-6 w-full resize-none rounded-xl border border-hairline bg-cream px-4 py-4 text-sm leading-relaxed text-ink placeholder:text-faint focus:border-copper/40 focus:outline-none"
                  />

                  {error && (
                    <p className="mt-3 text-sm text-copper">{error}</p>
                  )}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={handleSkip}
                      disabled={saving}
                      className="cursor-pointer text-xs text-faint transition-colors hover:text-slate disabled:opacity-50"
                    >
                      Ohita
                    </button>
                    <div className="flex gap-3">
                      {showSectionIntro && isFirstInSection && (
                        <button
                          type="button"
                          onClick={() => setShowSectionIntro(false)}
                          className="cursor-pointer rounded-full border border-hairline px-5 py-3 text-xs text-slate hover:border-copper/30"
                        >
                          Selvä
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={saving || !answer.trim()}
                        className="cursor-pointer rounded-full border border-copper/30 bg-copper-wash px-8 py-3 text-sm text-ink transition-all hover:border-copper disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {saving
                          ? "Tallennetaan..."
                          : step < totalQuestionCount - 1
                            ? "Seuraava"
                            : "Lähetä vastaukset"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {phase === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                  className="text-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-caps text-copper">
                    Kiitos
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-light text-ink">
                    Vastaukset tallennettu.
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate">
                    HSBridge käy vastaukset läpi ennen tapaamista. Näemme
                    vastaukset kokonaisuudessaan, jotta keskustelu perustuu
                    teidän antamiinne tietoihin.
                  </p>
                  <p className="mt-6 text-xs text-faint">
                    Voitte palata myöhemmin ja jatkaa samasta selaimesta;
                    vastaukset tallentuvat samaan istuntoon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-faint">
          Vastaukset tallennetaan turvallisesti. Vain HSBridge-tiimi näkee ne.
        </p>
      </div>
    </section>
  );
}
