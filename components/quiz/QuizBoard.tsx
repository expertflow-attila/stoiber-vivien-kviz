"use client";

import { motion, useReducedMotion } from "motion/react";
import { audienceOrder, audiences } from "@/content/audiences";
import { QuizCard } from "./QuizCard";

export function QuizBoard() {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-12 sm:gap-16" data-auto-reveal="false">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0 : 1.0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col items-center gap-5 text-center"
      >
        <span className="label-eyebrow">Szolgáltatásaim</span>
        <h1 className="text-display-xl sm:text-display-2xl font-display max-w-[26ch]">
          Kinek keresel{" "}
          <span className="serif-italic text-sage-700">segítséget</span>?
        </h1>
        <div className="divider-fade-soft mt-2 w-[140px]" />
      </motion.div>

      <div
        className="grid gap-5 sm:gap-6 lg:grid-cols-3"
        data-auto-reveal="false"
      >
        {audienceOrder.map((slug, i) => (
          <QuizCard
            key={slug}
            audience={audiences[slug]}
            index={i}
            reduce={!!reduce}
          />
        ))}
      </div>

    </div>
  );
}
