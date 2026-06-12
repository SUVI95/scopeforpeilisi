export const SESSION_KEY = "peilisi_discovery_session";
const BACKUP_KEY = "peilisi_discovery_backup";

export type StoredAnswer = {
  questionId: string;
  sectionId: string;
  sectionTitle: string;
  questionText: string;
  answer: string;
  synced: boolean;
  savedAt: string;
};

export type DiscoveryBackup = {
  sessionId: string | null;
  answers: Record<string, StoredAnswer>;
};

function readBackup(): DiscoveryBackup {
  if (typeof window === "undefined") {
    return { sessionId: null, answers: {} };
  }
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) return { sessionId: null, answers: {} };
    const parsed = JSON.parse(raw) as DiscoveryBackup;
    return {
      sessionId: parsed.sessionId ?? null,
      answers: parsed.answers ?? {},
    };
  } catch {
    return { sessionId: null, answers: {} };
  }
}

function writeBackup(backup: DiscoveryBackup) {
  localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
}

export function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

export function setSessionId(id: string) {
  localStorage.setItem(SESSION_KEY, id);
  const backup = readBackup();
  backup.sessionId = id;
  writeBackup(backup);
}

export function clearSessionId() {
  localStorage.removeItem(SESSION_KEY);
  const backup = readBackup();
  backup.sessionId = null;
  writeBackup(backup);
}

export function storeLocalAnswer(entry: Omit<StoredAnswer, "synced" | "savedAt">) {
  const backup = readBackup();
  backup.answers[entry.questionId] = {
    ...entry,
    synced: false,
    savedAt: new Date().toISOString(),
  };
  writeBackup(backup);
}

export function markAnswerSynced(questionId: string) {
  const backup = readBackup();
  const row = backup.answers[questionId];
  if (!row) return;
  backup.answers[questionId] = { ...row, synced: true };
  writeBackup(backup);
}

export function getPendingAnswers(): StoredAnswer[] {
  return Object.values(readBackup().answers).filter((a) => !a.synced);
}

export function getLocalAnswer(questionId: string): string | undefined {
  return readBackup().answers[questionId]?.answer;
}

export function getAllLocalAnswers(): Record<string, string> {
  const backup = readBackup();
  return Object.fromEntries(
    Object.entries(backup.answers).map(([id, row]) => [id, row.answer])
  );
}

export function countSyncedAnswers(): number {
  return Object.values(readBackup().answers).filter((a) => a.synced).length;
}
