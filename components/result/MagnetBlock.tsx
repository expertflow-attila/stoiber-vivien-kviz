"use client";

import { useState } from "react";
import type { AudienceSlug } from "@/content/audiences";
import type { Magnet } from "@/content/magnets";
import { Arrow } from "@/components/ui/Arrow";

export function MagnetBlock({
  magnet,
  audienceSlug,
}: {
  magnet: Magnet;
  audienceSlug: AudienceSlug;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "submitting") return;
    setState("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, audience: audienceSlug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Sajnos most nem sikerült. Próbáld újra később.");
      }
      setState("ok");
    } catch (err) {
      setState("error");
      setErrMsg(err instanceof Error ? err.message : "Hiba történt.");
    }
  };

  return (
    <section className="py-section-sm">
      <div className="flex flex-col gap-7">
        <span className="label-eyebrow text-sage-700">
          Amit most rögtön hasznosnak találsz
        </span>
        <div className="card-paper editorial-card relative overflow-hidden border border-cream-200 p-7 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* PDF icon — minimalista vonalas */}
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-cream-100 text-sage-700"
            >
              <svg
                width="24"
                height="28"
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 2.5h12L21 9v15.5a1.5 1.5 0 0 1-1.5 1.5h-16A1.5 1.5 0 0 1 2 24.5v-21A1.5 1.5 0 0 1 3 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path d="M15 2.5V9h6" stroke="currentColor" strokeWidth="1.3" />
                <path
                  d="M7 15.5h10M7 19h10M7 22h6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h3 className="text-display-md font-display text-ink-900">
                  {magnet.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-700">
                  {magnet.hook}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-ink-500">
                  PDF · {magnet.readTime} olvasás
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`/magnetek/${magnet.slug}.pdf`}
                  download
                  className="hover-cta inline-flex items-center gap-2.5 rounded-[10px] border border-sage-600 bg-cream-50 px-5 py-2.5 text-sm font-medium text-sage-800 hover:bg-sage-600 hover:text-cream-50"
                >
                  Letöltöm a PDF-et
                  <Arrow className="h-3 w-4" />
                </a>
              </div>

              {/* Opcionális email feliratkozás */}
              <details className="group rounded-[10px] border border-dashed border-cream-300 px-4 py-3 open:bg-cream-50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-ink-700">
                  <span>
                    Küldjünk még hasonló útmutatókat, ha lesz?{" "}
                    <span className="text-ink-500">(opcionális)</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sage-700 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                {state === "ok" ? (
                  <p className="mt-3 text-sm text-sage-800">
                    Köszönöm — sikerült. Várlak a leveleimben.
                  </p>
                ) : (
                  <form
                    onSubmit={onSubmit}
                    className="mt-3 flex flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="magnet-email" className="sr-only">
                      Email-címed
                    </label>
                    <input
                      id="magnet-email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="te@pelda.hu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-focus flex-1 rounded-[8px] border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm placeholder:text-ink-300"
                    />
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="hover-cta inline-flex items-center justify-center gap-2 rounded-[8px] bg-sage-700 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-sage-800 disabled:opacity-60"
                    >
                      {state === "submitting" ? "Küldöm…" : "Feliratkozom"}
                    </button>
                  </form>
                )}
                {state === "error" ? (
                  <p className="mt-2 text-sm text-rose-500">{errMsg}</p>
                ) : null}
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
