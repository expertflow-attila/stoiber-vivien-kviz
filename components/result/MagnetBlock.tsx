import type { Magnet } from "@/content/magnets";
import { Arrow } from "@/components/ui/Arrow";

export function MagnetBlock({ magnet }: { magnet: Magnet }) {
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
                  PDF · {magnet.readTime} olvasás · ingyenes
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
                <a
                  href={`/magnetek/${magnet.slug}.pdf`}
                  target="_blank"
                  rel="noopener"
                  className="hover-cta inline-flex items-center gap-2 text-sm text-sage-700 hover:text-sage-800 underline-offset-4 hover:underline"
                >
                  Megnyitom új lapon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
