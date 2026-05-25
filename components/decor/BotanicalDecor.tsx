"use client";

import { useEffect, useRef } from "react";

/**
 * Vivien botanikai dekor — két variánst rajzol a háttérre:
 *   - leafy-sprig (jobb felül, hero corner)
 *   - flowing-branch (bal alul, section-háttér)
 *
 * A levél-pozíciók kiszámítása futási időben történik a böngésző SVG
 * path API-jával (getTotalLength + getPointAtLength), pontosan ahogyan
 * a vivien-botanikai-preview projekt csinálja. Ezzel megőrizzük a
 * preview-ban kalibrált organikus eloszlást.
 *
 * Mindkettő `aria-hidden`, `pointer-events-none`, halvány sage-700.
 * Mobile-on (< lg) elrejtve, hogy ne lopja el a fókuszt a kvíz blokkokról.
 */

type Placement = {
  atPct: number;
  side: -1 | 1;
  tilt: number;
  len: number;
  w: number;
  opacity: number;
};

function lanceOutline(len: number, w: number, opacity: number) {
  const d = `M 0 0 C ${len * 0.25} ${-w * 0.7}, ${len * 0.7} ${-w * 0.95}, ${len} 0 C ${len * 0.7} ${w * 0.95}, ${len * 0.25} ${w * 0.7}, 0 0 Z`;
  return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.0" stroke-opacity="${opacity}" stroke-linejoin="round" stroke-linecap="round"/>`;
}

function placeLeavesOnPath(
  pathD: string,
  viewBox: string,
  placements: Placement[],
): string {
  const ns = "http://www.w3.org/2000/svg";
  const tmpSvg = document.createElementNS(ns, "svg");
  tmpSvg.setAttribute("viewBox", viewBox);
  const tmpPath = document.createElementNS(ns, "path");
  tmpPath.setAttribute("d", pathD);
  tmpSvg.appendChild(tmpPath);
  document.body.appendChild(tmpSvg);
  tmpSvg.style.position = "absolute";
  tmpSvg.style.opacity = "0";
  tmpSvg.style.pointerEvents = "none";

  const totalLen = tmpPath.getTotalLength();
  let out = "";

  for (const p of placements) {
    const len = totalLen * p.atPct;
    const point = tmpPath.getPointAtLength(len);
    const eps = 0.5;
    const p1 = tmpPath.getPointAtLength(Math.max(0, len - eps));
    const p2 = tmpPath.getPointAtLength(Math.min(totalLen, len + eps));
    const tangentDeg =
      (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
    const perpDeg = tangentDeg + (p.side > 0 ? 90 : -90);
    const tilt = p.tilt ?? 0;
    const leafAngle = perpDeg + (p.side > 0 ? -tilt : tilt);

    out += `<g transform="translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${leafAngle.toFixed(2)})">${lanceOutline(p.len, p.w, p.opacity)}</g>`;
  }

  document.body.removeChild(tmpSvg);
  return out;
}

function leafySprigMarkup(): string {
  const pathD = "M 70 230 C 75 180, 50 140, 70 90 S 90 30, 70 10";
  const placements: Placement[] = [
    { atPct: 0.18, side: -1, tilt: 18, len: 38, w: 11, opacity: 0.55 },
    { atPct: 0.32, side: 1, tilt: 14, len: 44, w: 13, opacity: 0.55 },
    { atPct: 0.5, side: -1, tilt: 10, len: 48, w: 14, opacity: 0.55 },
    { atPct: 0.66, side: 1, tilt: 8, len: 42, w: 12, opacity: 0.55 },
    { atPct: 0.8, side: -1, tilt: 4, len: 34, w: 10, opacity: 0.55 },
  ];
  const tipLeaf = `<g transform="translate(70 10) rotate(-92)">${lanceOutline(30, 9, 0.55)}</g>`;
  const leafSvg = placeLeavesOnPath(pathD, "0 0 140 240", placements);
  return `<svg viewBox="0 0 140 240" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
    <path d="${pathD}" stroke="currentColor" stroke-width="1.0" stroke-opacity="0.55" stroke-linecap="round" fill="none"/>
    ${leafSvg}
    ${tipLeaf}
  </svg>`;
}

function flowingBranchMarkup(): string {
  const pathD =
    "M 30 240 C 50 200, 90 180, 80 130 S 30 80, 70 50 S 130 30, 120 10";
  const placements: Placement[] = [
    { atPct: 0.12, side: -1, tilt: 20, len: 28, w: 8, opacity: 0.55 },
    { atPct: 0.26, side: 1, tilt: 18, len: 36, w: 10, opacity: 0.55 },
    { atPct: 0.42, side: -1, tilt: 14, len: 42, w: 12, opacity: 0.55 },
    { atPct: 0.58, side: 1, tilt: 12, len: 38, w: 11, opacity: 0.55 },
    { atPct: 0.74, side: -1, tilt: 10, len: 32, w: 9, opacity: 0.55 },
    { atPct: 0.88, side: 1, tilt: 8, len: 26, w: 8, opacity: 0.55 },
  ];
  const leafSvg = placeLeavesOnPath(pathD, "0 0 160 260", placements);
  return `<svg viewBox="0 0 160 260" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
    <path d="${pathD}" stroke="currentColor" stroke-width="1.0" stroke-opacity="0.55" stroke-linecap="round" fill="none"/>
    ${leafSvg}
  </svg>`;
}

export function BotanicalDecor() {
  const sprigRef = useRef<HTMLDivElement | null>(null);
  const branchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sprigRef.current) sprigRef.current.innerHTML = leafySprigMarkup();
    if (branchRef.current) branchRef.current.innerHTML = flowingBranchMarkup();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 hidden overflow-hidden lg:block"
    >
      {/* Hero corner — leafy sprig, top right, halvány */}
      <div
        ref={sprigRef}
        className="absolute right-[6%] top-[4rem] w-[140px] text-sage-700"
        style={{ opacity: 0.32 }}
      />
      {/* Section background — flowing branch, bal alul, nagyobb */}
      <div
        ref={branchRef}
        className="absolute -bottom-8 left-[3%] w-[200px] text-sage-700"
        style={{ opacity: 0.28 }}
      />
    </div>
  );
}
