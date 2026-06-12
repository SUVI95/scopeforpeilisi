export type SaveAnswerPayload = {
  sessionId?: string;
  questionId: string;
  sectionId: string;
  sectionTitle: string;
  questionText: string;
  answer: string;
  completed?: boolean;
};

export type SaveAnswerResult =
  | { ok: true; sessionId: string }
  | { ok: false; error: string; status: number; sessionNotFound?: boolean };

async function postOnce(payload: SaveAnswerPayload): Promise<SaveAnswerResult> {
  const res = await fetch("/api/discovery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: { sessionId?: string; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    return {
      ok: false,
      error: data.error ?? "Tallennus epäonnistui",
      status: res.status,
      sessionNotFound: res.status === 404,
    };
  }

  if (!data.sessionId) {
    return {
      ok: false,
      error: "Palvelin ei palauttanut istuntotunnusta",
      status: 500,
    };
  }

  return { ok: true, sessionId: data.sessionId };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function saveAnswerWithRetry(
  payload: SaveAnswerPayload,
  attempts = 4
): Promise<SaveAnswerResult> {
  let last: SaveAnswerResult = {
    ok: false,
    error: "Tallennus epäonnistui",
    status: 500,
  };

  for (let i = 0; i < attempts; i++) {
    last = await postOnce(payload);
    if (last.ok) return last;

    if (last.sessionNotFound) return last;

    const retryable = last.status >= 500 || last.status === 429 || last.status === 0;
    if (!retryable || i === attempts - 1) return last;

    await wait(400 * Math.pow(2, i));
  }

  return last;
}
