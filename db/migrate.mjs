#!/usr/bin/env node
/**
 * Run: node db/migrate.mjs
 * Requires DATABASE_URL in .env.local or environment.
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const path = resolve(__dirname, "../.env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing. Set it in .env.local");
  process.exit(1);
}

const sql = neon(url);

const statements = [
  `CREATE TABLE IF NOT EXISTS discovery_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    respondent_name TEXT,
    respondent_email TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE
  )`,
  `CREATE TABLE IF NOT EXISTS discovery_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES discovery_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    section_id TEXT NOT NULL,
    section_title TEXT NOT NULL,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (session_id, question_id)
  )`,
  `CREATE INDEX IF NOT EXISTS discovery_sessions_updated_at_idx
    ON discovery_sessions (updated_at DESC)`,
  `CREATE INDEX IF NOT EXISTS discovery_sessions_completed_idx
    ON discovery_sessions (completed)`,
  `CREATE INDEX IF NOT EXISTS discovery_answers_session_id_idx
    ON discovery_answers (session_id)`,
  `CREATE INDEX IF NOT EXISTS discovery_answers_session_question_idx
    ON discovery_answers (session_id, question_id)`,
];

console.log(`Running ${statements.length} statements against Neon...`);

for (const statement of statements) {
  await sql`${sql.unsafe(statement)}`;
  const preview = statement.replace(/\s+/g, " ").slice(0, 70);
  console.log(`  ✓ ${preview}...`);
}

const tables = await sql`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('discovery_sessions', 'discovery_answers')
  ORDER BY table_name
`;

console.log("\nTables ready:");
for (const row of tables) {
  console.log(`  - ${row.table_name}`);
}

console.log("\nDone.");
