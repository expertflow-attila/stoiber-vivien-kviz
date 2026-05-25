import type { Article } from "@/content/articles";

const VIVIEN_SITE = "https://stoiber-vivien-weboldal.vercel.app";

const kindLabel: Record<Article["kind"], string> = {
  cikk: "Cikk",
  interju: "Interjú",
  podcast: "Beszélgetés",
};

export function ArticleBlock({ articles }: { articles: Article[] }) {
  return (
    <section className="py-section-sm">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <span className="label-eyebrow text-sage-700">
            Ha többet olvasnál
          </span>
          <h2 className="text-display-lg font-display max-w-[24ch]">
            Vivien írásai{" "}
            <span className="serif-italic text-sage-700">erről</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-card group flex h-full flex-col gap-3 rounded-[12px] border border-cream-200 bg-cream-50 p-5"
            >
              <span className="label-eyebrow text-xs text-sage-700">
                {kindLabel[article.kind]} · {article.outlet}
              </span>
              <h3 className="font-display text-[1.25rem] leading-tight text-ink-900">
                {article.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink-500 line-clamp-3">
                {article.summary}
              </p>
              <span className="mt-auto text-xs text-sage-700 underline-offset-4 group-hover:underline">
                Olvasom →
              </span>
            </a>
          ))}
        </div>

        <div>
          <a
            href={`${VIVIEN_SITE}/megjelenesek`}
            className="hover-cta inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-800"
          >
            Mind a megjelenések →
          </a>
        </div>
      </div>
    </section>
  );
}
