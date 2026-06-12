import { NextRequest, NextResponse } from "next/server";
import { getDb, type DiscoveryAnswerRow, type DiscoverySessionRow } from "@/lib/db";
import { flatQuestions } from "@/lib/discovery-questions";
import {
  answersByQuestionId,
  formatAllSessionsPlainText,
  formatSessionPlainText,
} from "@/lib/discovery-format";

function authorized(request: NextRequest) {
  const secret = process.env.DISCOVERY_ADMIN_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  const query = request.nextUrl.searchParams.get("key");
  return header === `Bearer ${secret}` || query === secret;
}

async function fetchSessions(db: NonNullable<ReturnType<typeof getDb>>) {
  const sessions = await db`
    SELECT id, created_at, updated_at, respondent_name, respondent_email, completed
    FROM discovery_sessions
    ORDER BY updated_at DESC
  `;

  const answers = await db`
    SELECT
      session_id,
      question_id,
      section_id,
      section_title,
      question_text,
      answer_text,
      updated_at
    FROM discovery_answers
    ORDER BY updated_at ASC
  `;

  const bySession = new Map<string, DiscoveryAnswerRow[]>();
  for (const row of answers as (DiscoveryAnswerRow & { session_id: string })[]) {
    const list = bySession.get(row.session_id) ?? [];
    list.push({
      question_id: row.question_id,
      section_id: row.section_id,
      section_title: row.section_title,
      question_text: row.question_text,
      answer_text: row.answer_text,
      updated_at: row.updated_at,
    });
    bySession.set(row.session_id, list);
  }

  return (sessions as Omit<DiscoverySessionRow, "answers">[]).map((session) => ({
    ...session,
    answers: bySession.get(session.id) ?? [],
    answeredCount: (bySession.get(session.id) ?? []).length,
    totalQuestions: flatQuestions.length,
    answersMap: answersByQuestionId(bySession.get(session.id) ?? []),
  }));
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 503 });
  }

  const format = request.nextUrl.searchParams.get("format");
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  try {
    const sessions = await fetchSessions(db);

    if (format === "txt" || format === "text") {
      const filtered = sessionId
        ? sessions.filter((s) => s.id === sessionId)
        : sessions;

      if (sessionId && filtered.length === 0) {
        return new NextResponse("Istuntoa ei löydy.\n", {
          status: 404,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      const body =
        filtered.length === 1
          ? formatSessionPlainText(filtered[0])
          : formatAllSessionsPlainText(filtered);

      const filename = sessionId
        ? `peilisi-discovery-${sessionId.slice(0, 8)}.txt`
        : "peilisi-discovery-all.txt";

      return new NextResponse(body, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json({ responses: sessions });
  } catch (err) {
    console.error("Discovery fetch error:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
