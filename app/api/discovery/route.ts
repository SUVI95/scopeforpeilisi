import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type AnswerPayload = {
  sessionId?: string;
  questionId: string;
  sectionId: string;
  sectionTitle: string;
  questionText: string;
  answer: string;
  completed?: boolean;
  respondentName?: string;
  respondentEmail?: string;
};

export async function POST(request: NextRequest) {
  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Tietokantaa ei ole vielä kytketty. HSBridge saa vastaukset pian käyttöön." },
      { status: 503 }
    );
  }

  let body: AnswerPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Virheellinen pyyntö" }, { status: 400 });
  }

  const {
    sessionId,
    questionId,
    sectionId,
    sectionTitle,
    questionText,
    answer,
    completed,
    respondentName,
    respondentEmail,
  } = body;

  if (!questionId || !sectionId || questionText === undefined) {
    return NextResponse.json({ error: "Puuttuvia kenttiä" }, { status: 400 });
  }

  // Store answer exactly as typed — no trimming beyond what client sent in payload
  const answerText = answer;

  try {
    let activeSessionId = sessionId;

    if (activeSessionId) {
      const existing = await db`
        SELECT id FROM discovery_sessions WHERE id = ${activeSessionId}::uuid
      `;

      if (existing.length === 0) {
        return NextResponse.json({ error: "Istuntoa ei löydy" }, { status: 404 });
      }

      await db`
        UPDATE discovery_sessions
        SET
          updated_at = NOW(),
          completed = ${completed ?? false},
          respondent_name = COALESCE(${respondentName ?? null}, respondent_name),
          respondent_email = COALESCE(${respondentEmail ?? null}, respondent_email)
        WHERE id = ${activeSessionId}::uuid
      `;
    } else {
      const inserted = await db`
        INSERT INTO discovery_sessions (completed, respondent_name, respondent_email)
        VALUES (
          ${completed ?? false},
          ${respondentName ?? "Peilisi Oy"},
          ${respondentEmail ?? null}
        )
        RETURNING id
      `;
      activeSessionId = (inserted[0] as { id: string }).id;
    }

    await db`
      INSERT INTO discovery_answers (
        session_id,
        question_id,
        section_id,
        section_title,
        question_text,
        answer_text
      )
      VALUES (
        ${activeSessionId}::uuid,
        ${questionId},
        ${sectionId},
        ${sectionTitle},
        ${questionText},
        ${answerText}
      )
      ON CONFLICT (session_id, question_id)
      DO UPDATE SET
        section_id = EXCLUDED.section_id,
        section_title = EXCLUDED.section_title,
        question_text = EXCLUDED.question_text,
        answer_text = EXCLUDED.answer_text,
        updated_at = NOW()
    `;

    return NextResponse.json({ sessionId: activeSessionId, saved: true });
  } catch (err) {
    console.error("Discovery save error:", err);
    return NextResponse.json({ error: "Tallennus epäonnistui" }, { status: 500 });
  }
}
