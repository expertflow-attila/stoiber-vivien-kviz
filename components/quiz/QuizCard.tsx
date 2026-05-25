"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import type { Audience } from "@/content/audiences";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

/**
 * Egyetlen kvíz-kártya. 3 kerül egymás mellé/alá a QuizBoard-on.
 *
 * Architektúra:
 *   <motion.div>   — staggered entry (parent wrapper, csak transform-ja a fade-in)
 *     <Link>       — a magnetic hover effekt itt él (külön transform)
 *
 * Így a motion-entry transform-ja és a magnet-hover transform-ja két külön
 * DOM-elemen él, nem írják felül egymást.
 */
export function QuizCard({
  audience,
  index,
  reduce,
}: {
  audience: Audience;
  index: number;
  reduce: boolean;
}) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    linkRef.current.style.setProperty("--magnet-x", `${x * 5}px`);
    linkRef.current.style.setProperty("--magnet-y", `${y * 5}px`);
  };

  const handleLeave = () => {
    if (!linkRef.current) return;
    linkRef.current.style.setProperty("--magnet-x", "0px");
    linkRef.current.style.setProperty("--magnet-y", "0px");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 1.2,
        delay: reduce ? 0 : 0.3 + index * 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        ref={linkRef}
        href={`/eredmeny/${audience.slug}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={`${audience.quizTitle} — ${audience.serviceCtaLabel}`}
        className={cn(
          "group relative flex h-full flex-col gap-5 rounded-[14px] border border-cream-200 bg-cream-50",
          "px-7 py-8 sm:px-8 sm:py-9 lg:px-7 lg:py-8",
          "hover-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100",
          "shadow-[0_1px_2px_rgba(60,50,30,0.04),0_8px_24px_rgba(60,50,30,0.06)]",
        )}
        style={{
          transform:
            "translate3d(var(--magnet-x, 0px), var(--magnet-y, 0px), 0)",
          transition:
            "transform 620ms cubic-bezier(0.22, 1, 0.36, 1), border-color 860ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span className="label-eyebrow text-sage-700">
          {audience.quizEyebrow}
        </span>

        <div className="flex flex-1 flex-col gap-3">
          <h3 className="text-display-md font-display text-ink-900">
            {audience.quizTitle}
          </h3>
          <p className="text-[15px] leading-relaxed text-ink-500">
            {audience.quizBody}
          </p>
        </div>

        <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sage-700">
          Tovább
          <Arrow className="h-3 w-4 transition-transform duration-[620ms] group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}
