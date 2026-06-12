-- Run once in Neon SQL editor (https://console.neon.tech)
-- Each answer is stored as plain TEXT — exactly as the client typed it.

CREATE TABLE IF NOT EXISTS discovery_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  respondent_name TEXT,
  respondent_email TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS discovery_answers (
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
);

CREATE INDEX IF NOT EXISTS discovery_sessions_updated_at_idx
  ON discovery_sessions (updated_at DESC);

CREATE INDEX IF NOT EXISTS discovery_sessions_completed_idx
  ON discovery_sessions (completed);

CREATE INDEX IF NOT EXISTS discovery_answers_session_id_idx
  ON discovery_answers (session_id);

CREATE INDEX IF NOT EXISTS discovery_answers_session_question_idx
  ON discovery_answers (session_id, question_id);
