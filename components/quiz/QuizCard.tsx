"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Audience } from "@/content/audiences";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

/**
 * Egyetlen kvíz-kártya. 3 kerül egymás mellé/alá a QuizBoard-on.
 * Mikro-magnetic effect a kurzorhoz (3px translate), prefers-reduced-motion
 * guarddal teljesen kikapcsolva.
 */
export function QuizCard({
  audience,
  index,
}: {
  audience: Audience;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--magnet-x", `${x * 6}px`);
    ref.current.style.setProperty("--magnet-y", `${y * 6}px`);
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--magnet-x", "0px");
    ref.current.style.setProperty("--magnet-y", "0px");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : 0.25 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        ref={ref}
        href={`/eredmeny/${audience.slug}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={`${audience.quizTitle} — ${audience.serviceCtaLabel}`}
        className={cn(
          "group relative flex h-full flex-col gap-5 rounded-[14px] border border-cream-200 bg-cream-50",
          "px-6 py-7 sm:px-7 sm:py-8",
          "hover-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100",
          "shadow-[0_1px_2px_rgba(60,50,30,0.04),0_8px_24px_rgba(60,50,30,0.06)]",
        )}
        style={{
          transform:
            "translate3d(var(--magnet-x, 0px), var(--magnet-y, 0px), 0)",
          transition: "transform 480ms cubic-bezier(0.22, 1, 0.36, 1), border-color 620ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 860ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* lance accent — egy halvány levelecske */}
        <svg
          aria-hidden="true"
          viewBox="0 0 40 80"
          className="absolute right-5 top-5 h-12 w-6 text-sage-500/40"
        >
          <path
            d="M20 4 C 32 18, 32 42, 20 76 C 8 42, 8 18, 20 4 Z"
            fill="currentColor"
            opacity="0.55"
          />
          <path
            d="M20 4 V 76"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.4"
          />
        </svg>

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

        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-sage-700">
          Ez vagyok én
          <Arrow className="h-3 w-4 transition-transform duration-[620ms] group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}
