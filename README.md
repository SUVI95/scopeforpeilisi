# Peilisi — Platform Proposal

Visual scope presentation for Peilisi Oy, prepared by HSBridge AI.

Covers all proposed areas from the client email, plus email automation.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Discovery questionnaire (Peilisi)

Interactive Finnish Q&A before the meeting. Answers save to Neon Postgres.

### Setup

1. Create a Neon database and run `node db/migrate.mjs` (or paste `db/schema.sql` in Neon SQL editor).
2. Copy `.env.example` to `.env.local` and set:
   - `DATABASE_URL` — Neon connection string
   - `DISCOVERY_ADMIN_SECRET` — password for HSBridge admin view
3. Peilisi answers at `#discovery` on the proposal page.
4. HSBridge reads full responses at `/admin/discovery` (enter admin secret).

Each answer is stored as **plain TEXT** in `discovery_answers.answer_text` — exactly as typed, including line breaks and spaces. No JSON in exports.

**Pull answers as plain text:**
- Admin UI → **Pelkkä teksti** view, **Kopioi teksti**, or **Lataa .txt**
- Direct download: `/api/discovery/responses?format=txt&key=YOUR_SECRET`
- Single session: add `&sessionId=UUID`
- Neon SQL:
  ```sql
  SELECT s.respondent_name, a.section_title, a.question_text, a.answer_text
  FROM discovery_answers a
  JOIN discovery_sessions s ON s.id = a.session_id
  ORDER BY s.updated_at DESC, a.section_id, a.question_id;
  ```

Responses are saved after each answer (resume supported via browser session).

## Structure

- **Hero** — overview and brand
- **Dashboard preview** — interactive rough sketch (illustrative only)
- **Pipeline** — lead to follow-up
- **Customers** — CRM visualisation
- **Calendar** — events and bookings
- **Mirrors** — location and availability
- **Quotes** — status tracking
- **Automations** — triggers, tasks, and email automation (copy from Peilisi)
- **Contact form** — peilisi.fi → CRM
- **Scope** — nine areas in summary
- **Delivery** — build, confirm, handover + 15 days support
- **Discovery** — interactive Finnish questionnaire → Neon
