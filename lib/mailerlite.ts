const ENDPOINT = "https://connect.mailerlite.com/api/subscribers";

const apiKey = process.env.MAILERLITE_API_KEY;
const defaultGroup = process.env.MAILERLITE_GROUP_ID;

export const HAS_MAILERLITE = Boolean(apiKey);

/**
 * MailerLite-os feliratkoztatás. Az `audience` mező audience-tag-ként megy
 * át — későbbi szegmentálási sablonokhoz használható.
 *
 * NB.: ha a MAILERLITE_API_KEY env hiányzik, csendes 503-mal tér vissza
 * (a klienst nem akarjuk megakasztani a build idején, csak runtime-ban
 * fail-er nyugodtan).
 */
export type SubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; error: string; status: number };

export async function subscribeToMailerLite(input: {
  email: string;
  audience?: string;
  groupId?: string;
}): Promise<SubscribeResult> {
  if (!apiKey) {
    return { ok: false, error: "MAILERLITE_NOT_CONFIGURED", status: 503 };
  }

  const groupId = input.groupId ?? defaultGroup;
  const groups = groupId ? [groupId] : undefined;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        fields: input.audience ? { audience: input.audience } : undefined,
        groups,
      }),
      cache: "no-store",
    });

    if (res.ok) return { ok: true, alreadySubscribed: false };
    if (res.status === 422) return { ok: true, alreadySubscribed: true };

    const errText = await res.text().catch(() => "");
    return {
      ok: false,
      error: errText.slice(0, 200) || `HTTP_${res.status}`,
      status: res.status,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "NETWORK_ERROR",
      status: 500,
    };
  }
}
