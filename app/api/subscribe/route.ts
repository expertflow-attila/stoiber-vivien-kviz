import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeToMailerLite, HAS_MAILERLITE } from "@/lib/mailerlite";
import { audienceOrder } from "@/content/audiences";

const Schema = z.object({
  email: z.string().email("Adj meg egy érvényes email-címet."),
  audience: z.enum(audienceOrder as [string, ...string[]]).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Érvénytelen adat." },
      { status: 400 },
    );
  }

  if (!HAS_MAILERLITE) {
    // Helyi/dev környezetben nincs feliratkozás, de NEM 500-zal akarunk
    // térni — a kliens success-state-et láthat, lévén opcionális mező.
    return NextResponse.json({ ok: true, alreadySubscribed: false, devNoop: true });
  }

  const result = await subscribeToMailerLite({
    email: parsed.data.email,
    audience: parsed.data.audience,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Most nem sikerült, később próbáld újra." },
      { status: result.status >= 500 ? 502 : 400 },
    );
  }

  return NextResponse.json({ ok: true, alreadySubscribed: result.alreadySubscribed });
}
