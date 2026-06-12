import { discoverySections } from "@/lib/discovery-questions";

export type DiscoveryAnswerRow = {
  question_id: string;
  section_id: string;
  section_title: string;
  question_text: string;
  answer_text: string;
  updated_at: string;
};

export type DiscoverySessionRow = {
  id: string;
  created_at: string;
  updated_at: string;
  respondent_name: string | null;
  respondent_email: string | null;
  completed: boolean;
  answers: DiscoveryAnswerRow[];
};

export function answersByQuestionId(answers: DiscoveryAnswerRow[]) {
  return Object.fromEntries(answers.map((a) => [a.question_id, a]));
}

export function formatSessionPlainText(session: DiscoverySessionRow): string {
  const lines: string[] = [];
  const divider = "─".repeat(60);

  lines.push("PEILISI · LÖYTÖKYSELY");
  lines.push("");
  lines.push(`Nimi: ${session.respondent_name ?? "—"}`);
  lines.push(`Sähköposti: ${session.respondent_email ?? "—"}`);
  lines.push(`Valmis: ${session.completed ? "kyllä" : "kesken"}`);
  lines.push(`Päivitetty: ${new Date(session.updated_at).toLocaleString("fi-FI")}`);
  lines.push(`Istunto: ${session.id}`);
  lines.push("");

  for (const section of discoverySections) {
    const sectionAnswers = section.questions
      .map((q) => session.answers.find((a) => a.question_id === q.id))
      .filter(Boolean) as DiscoveryAnswerRow[];

    if (sectionAnswers.length === 0) continue;

    lines.push(divider);
    lines.push(section.title.toUpperCase());
    lines.push(divider);
    lines.push("");

    for (const q of section.questions) {
      const a = session.answers.find((row) => row.question_id === q.id);
      if (!a) continue;

      lines.push(q.text);
      lines.push("");
      lines.push(a.answer_text);
      lines.push("");
    }
  }

  const answeredIds = new Set(session.answers.map((a) => a.question_id));
  const unanswered = discoverySections.flatMap((s) =>
    s.questions.filter((q) => !answeredIds.has(q.id)).map((q) => q.text)
  );

  if (unanswered.length > 0) {
    lines.push(divider);
    lines.push("VASTAAMATTA");
    lines.push(divider);
    lines.push("");
    for (const q of unanswered) {
      lines.push(`· ${q}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function formatAllSessionsPlainText(sessions: DiscoverySessionRow[]): string {
  if (sessions.length === 0) return "Ei vastauksia vielä.\n";

  return sessions
    .map((session, index) => {
      const header =
        index === 0
          ? formatSessionPlainText(session)
          : `\n\n${"═".repeat(60)}\n\n${formatSessionPlainText(session)}`;
      return header;
    })
    .join("");
}
