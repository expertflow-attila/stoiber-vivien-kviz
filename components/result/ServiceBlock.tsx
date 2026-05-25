import type { Audience } from "@/content/audiences";
import { Arrow } from "@/components/ui/Arrow";

export function ServiceBlock({ audience }: { audience: Audience }) {
  return (
    <section className="py-section-sm">
      <div className="flex flex-col gap-7">
        <span className="label-eyebrow text-sage-700">
          Számodra ez való
        </span>
        <h2 className="text-display-xl font-display max-w-[20ch]">
          {audience.resultTitle}
          <span className="block sm:inline">
            {" "}
            <span className="serif-italic text-sage-700">
              {audience.resultItalic}
            </span>
          </span>
        </h2>
        <p className="text-body-lg text-ink-700 max-w-[58ch]">
          {audience.resultIntro}
        </p>
        <div>
          <a
            href={audience.serviceUrl}
            className="hover-cta inline-flex items-center gap-3 rounded-[10px] bg-sage-700 px-7 py-3.5 text-base font-medium text-cream-50 shadow-[0_2px_4px_rgba(60,50,30,0.08),0_12px_28px_rgba(60,50,30,0.12)] hover:bg-sage-800"
          >
            {audience.serviceCtaLabel}
            <Arrow className="h-3 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
