"use client";

import { useEffect } from "react";

const REVEAL_CLASS = "auto-scroll-reveal";
const VISIBLE_CLASS = "is-visible";
const SECTION_SELECTOR = "section, article, [data-auto-reveal]";
const GROUP_SELECTOR = ".grid, ol, ul, [data-auto-reveal-group]";
const SKIP_SELECTOR = [
  "[data-scroll-reveal-managed]",
  "[data-auto-reveal='false']",
  "[data-no-auto-reveal]",
  "[data-hero-static]",
  ".editorial-hero",
  ".premium-hero",
  "[aria-hidden='true']",
  "header",
  "footer",
  "nav",
].join(", ");

type Props = {
  rootSelector?: string;
};

function isHTMLElement(element: Element): element is HTMLElement {
  return element instanceof HTMLElement;
}

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight && rect.bottom > 0;
}

function shouldSkip(root: HTMLElement, element: HTMLElement) {
  if (element === root) return true;
  if (!root.contains(element)) return true;
  if (
    element.closest(SKIP_SELECTOR)
  ) {
    return true;
  }

  const rect = element.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return true;

  const style = window.getComputedStyle(element);
  return style.display === "none" || style.visibility === "hidden" || style.position === "fixed";
}

function clearReveal(element: HTMLElement) {
  element.classList.remove(REVEAL_CLASS, VISIBLE_CLASS);
  element.style.removeProperty("--auto-reveal-delay");
  element.style.removeProperty("--auto-reveal-y");
}

export function AutoScrollReveal({ rootSelector = "main" }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let retryTimer: number | undefined;
    let cleanupRoot: (() => void) | undefined;

    const attach = (root: HTMLElement) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (media.matches) return undefined;

      const managed = new Set<HTMLElement>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add(VISIBLE_CLASS);
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.02 },
      );

      const register = (element: HTMLElement, delay = 0, distance = 18) => {
        if (managed.has(element) || shouldSkip(root, element)) return;

        managed.add(element);
        element.style.setProperty("--auto-reveal-delay", `${delay}ms`);
        element.style.setProperty("--auto-reveal-y", `${distance}px`);
        element.classList.add(REVEAL_CLASS);

        if (isInViewport(element)) {
          element.classList.add(VISIBLE_CLASS);
        } else {
          observer.observe(element);
        }
      };

      const collect = () => {
        root.querySelectorAll(SECTION_SELECTOR).forEach((element) => {
          if (isHTMLElement(element)) register(element, 0, 18);
        });

        root.querySelectorAll(GROUP_SELECTOR).forEach((group) => {
          if (!isHTMLElement(group) || shouldSkip(root, group)) return;
          Array.from(group.children).forEach((child, index) => {
            if (isHTMLElement(child)) {
              register(child, Math.min(index, 5) * 80, 16);
            }
          });
        });
      };

      let frame = window.requestAnimationFrame(collect);
      const mutationObserver = new MutationObserver(() => {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(collect);
      });

      mutationObserver.observe(root, { childList: true, subtree: true });

      const handleMotionPreference = () => {
        if (!media.matches) return;
        observer.disconnect();
        mutationObserver.disconnect();
        managed.forEach(clearReveal);
        managed.clear();
      };

      media.addEventListener("change", handleMotionPreference);

      return () => {
        window.cancelAnimationFrame(frame);
        observer.disconnect();
        mutationObserver.disconnect();
        media.removeEventListener("change", handleMotionPreference);
        managed.forEach(clearReveal);
      };
    };

    const boot = () => {
      const root = document.querySelector(rootSelector);
      if (!root || !(root instanceof HTMLElement)) {
        retryTimer = window.setTimeout(boot, 80);
        return;
      }
      cleanupRoot = attach(root);
    };

    boot();

    return () => {
      if (retryTimer) window.clearTimeout(retryTimer);
      cleanupRoot?.();
    };
  }, [rootSelector]);

  return null;
}
