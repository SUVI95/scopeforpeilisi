import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const hasDb = Boolean(process.env.DATABASE_URL);
  const hasAdminSecret = Boolean(process.env.DISCOVERY_ADMIN_SECRET);
  const hasNotify =
    Boolean(process.env.DISCOVERY_NOTIFY_EMAIL && process.env.RESEND_API_KEY) ||
    Boolean(process.env.DISCOVERY_WEBHOOK_URL);

  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        database: false,
        adminSecret: hasAdminSecret,
        notify: hasNotify,
        message: "DATABASE_URL is not configured — answers will NOT be saved.",
      },
      { status: 503 }
    );
  }

  try {
    await db`SELECT 1 AS ok`;
    return NextResponse.json({
      ok: true,
      database: true,
      adminSecret: hasAdminSecret,
      notify: hasNotify,
    });
  } catch (err) {
    console.error("Discovery health check failed:", err);
    return NextResponse.json(
      {
        ok: false,
        database: false,
        adminSecret: hasAdminSecret,
        notify: hasNotify,
        message: "Database connection failed.",
      },
      { status: 503 }
    );
  }
}
