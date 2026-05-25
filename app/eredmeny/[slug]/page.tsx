import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ServiceBlock } from "@/components/result/ServiceBlock";
import { MagnetBlock } from "@/components/result/MagnetBlock";
import { ArticleBlock } from "@/components/result/ArticleBlock";
import { audiences, audienceOrder, type AudienceSlug } from "@/content/audiences";
import { magnets, audienceMagnetMap } from "@/content/magnets";
import { articlesByAudience } from "@/content/articles";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";

export function generateStaticParams() {
  return audienceOrder.map((slug) => ({ slug }));
}

function isValidSlug(slug: string): slug is AudienceSlug {
  return (audienceOrder as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return { title: "Eredmény" };
  }
  const audience = audiences[slug];
  return {
    title: `${audience.resultTitle} — Stoiber Vivien`,
    description: audience.resultIntro,
    alternates: { canonical: `/eredmeny/${slug}` },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const audience = audiences[slug];
  const magnetMap = audienceMagnetMap[slug];
  const magnet = magnets[magnetMap.default];
  const articles = articlesByAudience[slug];

  return (
    <div className="premium-page">
      <Container width="default" className="pt-12 sm:pt-16">
        <Link
          href="/"
          className="hover-cta inline-flex items-center gap-2 text-sm text-ink-500 hover:text-sage-700"
          aria-label="Vissza a kvízhez"
        >
          <span aria-hidden="true">←</span> Vissza a kvízhez
        </Link>
      </Container>

      <Container width="default">
        <ServiceBlock audience={audience} />
        <div className="divider-fade-soft" />
        <MagnetBlock magnet={magnet} />
        <div className="divider-fade-soft" />
        <ArticleBlock articles={articles} />

        <section className="py-section-sm flex flex-col items-start gap-4">
          <span className="label-eyebrow text-sage-700">
            Egy lépés a teljes oldalra
          </span>
          <a
            href={audience.serviceUrl}
            className="hover-cta inline-flex items-center gap-3 rounded-[10px] bg-sage-700 px-7 py-3.5 text-base font-medium text-cream-50 hover:bg-sage-800"
          >
            {audience.serviceCtaLabel}
            <Arrow className="h-3 w-4" />
          </a>
        </section>
      </Container>
    </div>
  );
}
