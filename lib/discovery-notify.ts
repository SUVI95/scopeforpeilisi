type NotifyPayload = {
  sessionId: string;
  answerCount: number;
  completed: boolean;
};

function siteBaseUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function notifyDiscoveryComplete(payload: NotifyPayload) {
  const { sessionId, answerCount, completed } = payload;
  if (!completed) return;

  const adminUrl = `${siteBaseUrl()}/admin/discovery`;
  const shortId = sessionId.slice(0, 8);
  const message = [
    "Peilisi discovery questionnaire completed.",
    "",
    `Session: ${sessionId}`,
    `Answers saved: ${answerCount}`,
    `Admin: ${adminUrl}`,
    "",
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  const tasks: Promise<unknown>[] = [];

  const webhook = process.env.DISCOVERY_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "discovery.completed",
          sessionId,
          answerCount,
          adminUrl,
          completedAt: new Date().toISOString(),
        }),
      }).catch((err) => console.error("Discovery webhook failed:", err))
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.DISCOVERY_NOTIFY_EMAIL;
  if (resendKey && notifyEmail) {
    const from =
      process.env.RESEND_FROM ?? "Peilisi Discovery <onboarding@resend.dev>";

    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [notifyEmail],
          subject: `Peilisi kysely valmis · ${shortId}`,
          text: message,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const body = await res.text();
          console.error("Discovery Resend email failed:", res.status, body);
        }
      })
    );
  }

  if (tasks.length === 0) {
    console.info("Discovery completed (no notify channel configured):", sessionId);
    return;
  }

  await Promise.all(tasks);
}
