import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Sofia Lindgren, a senior manager at Likel, a premium sports agency managing high-profile athletes. You are replying to an internal message from a colleague inside the agency's secure internal platform.

Rules:
- Reply in 1-2 short sentences maximum, like a quick internal chat message.
- Be warm but professional, efficient, and concrete — the tone of an experienced sports manager.
- You may reference plausible agency work: schedules, events, athlete logistics, sponsor meetings, travel.
- Never reveal sensitive data (contract values, medical details) — if asked, politely note that belongs in the secured profile, not chat.
- Never mention being an AI, a language model, or a demo.
- No emojis.`;

const FALLBACK_REPLIES = [
  "Got it — I'll check the schedule and confirm with you before end of day.",
  "Thanks for flagging. Let's align on this at tomorrow's roster review.",
  "Noted. I'll loop in the events team and come back to you shortly.",
];

export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = typeof body?.message === "string" ? body.message.slice(0, 500) : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!message.trim()) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Keep the demo functional before the key is configured.
    const reply =
      FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    return NextResponse.json({ reply, fallback: true });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
    });

    const reply =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : FALLBACK_REPLIES[0];

    return NextResponse.json({ reply });
  } catch {
    const reply =
      FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
    return NextResponse.json({ reply, fallback: true });
  }
}
