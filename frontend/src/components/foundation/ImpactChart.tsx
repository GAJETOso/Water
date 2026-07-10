"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
const DREDGED_KM = [120, 235, 310, 385, 430, 360]; // 2025 = year-to-date
const QUALITY_INDEX = [58, 63, 68, 74, 79, 82];

const W = 520;
const H = 260;
const PAD = { top: 24, right: 16, bottom: 34, left: 44 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

function Tooltip({ x, y, label, value }: { x: number; y: number; label: string; value: string }) {
  return (
    <g pointerEvents="none">
      <rect
        x={Math.min(Math.max(x - 46, 4), W - 96)}
        y={Math.max(y - 44, 4)}
        width="92"
        height="34"
        rx="8"
        fill="#040B16"
        stroke="rgba(165,243,252,0.35)"
      />
      <text
        x={Math.min(Math.max(x, 50), W - 50)}
        y={Math.max(y - 44, 4) + 14}
        textAnchor="middle"
        fontSize="10"
        fill="#94A3B8"
      >
        {label}
      </text>
      <text
        x={Math.min(Math.max(x, 50), W - 50)}
        y={Math.max(y - 44, 4) + 28}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#F1F5F9"
      >
        {value}
      </text>
    </g>
  );
}

function Grid({ ticks, max }: { ticks: number[]; max: number }) {
  return (
    <g>
      {ticks.map((t) => {
        const y = PAD.top + plotH - (t / max) * plotH;
        return (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
            />
            <text x={PAD.left - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#64748B">
              {t}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function XLabels() {
  return (
    <g>
      {YEARS.map((year, i) => {
        const x = PAD.left + (plotW / YEARS.length) * (i + 0.5);
        return (
          <text key={year} x={x} y={H - 12} textAnchor="middle" fontSize="10" fill="#64748B">
            {year}
          </text>
        );
      })}
    </g>
  );
}

function DredgingBars() {
  const [hover, setHover] = useState<number | null>(null);
  const max = 500;
  const slot = plotW / YEARS.length;
  const barW = 26;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Kilometers of waterways dredged per year, 2020 to 2025">
      <Grid ticks={[0, 125, 250, 375, 500]} max={max} />
      {DREDGED_KM.map((v, i) => {
        const h = (v / max) * plotH;
        const cx = PAD.left + slot * (i + 0.5);
        const y = PAD.top + plotH - h;
        return (
          <g key={YEARS[i]}>
            <motion.rect
              x={cx - barW / 2}
              width={barW}
              rx={4}
              initial={{ y: PAD.top + plotH, height: 0 }}
              whileInView={{ y, height: h }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              fill="#10B981"
              opacity={hover === null || hover === i ? 1 : 0.45}
            />
            {/* full-column hit target */}
            <rect
              x={cx - slot / 2}
              y={PAD.top}
              width={slot}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            {i === DREDGED_KM.length - 1 && (
              <text x={cx} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E2E8F0">
                {v} km
              </text>
            )}
          </g>
        );
      })}
      <XLabels />
      {hover !== null && (
        <Tooltip
          x={PAD.left + slot * (hover + 0.5)}
          y={PAD.top + plotH - (DREDGED_KM[hover] / max) * plotH}
          label={`${YEARS[hover]}${hover === YEARS.length - 1 ? " (YTD)" : ""}`}
          value={`${DREDGED_KM[hover]} km dredged`}
        />
      )}
    </svg>
  );
}

function QualityLine() {
  const [hover, setHover] = useState<number | null>(null);
  const max = 100;
  const slot = plotW / YEARS.length;
  const pt = (i: number) => ({
    x: PAD.left + slot * (i + 0.5),
    y: PAD.top + plotH - (QUALITY_INDEX[i] / max) * plotH,
  });
  const path = QUALITY_INDEX.map((_, i) => {
    const { x, y } = pt(i);
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  const area = `${path} L${pt(QUALITY_INDEX.length - 1).x},${PAD.top + plotH} L${pt(0).x},${PAD.top + plotH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Average water quality index in restored waterways, 2020 to 2025">
      <defs>
        <linearGradient id="quality-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Grid ticks={[0, 25, 50, 75, 100]} max={max} />
      <motion.path
        d={area}
        fill="url(#quality-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#38BDF8"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {QUALITY_INDEX.map((v, i) => {
        const { x, y } = pt(i);
        return (
          <g key={YEARS[i]}>
            <circle cx={x} cy={y} r={hover === i ? 6 : 4} fill="#38BDF8" stroke="#071426" strokeWidth={2} />
            <rect
              x={x - slot / 2}
              y={PAD.top}
              width={slot}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            {i === QUALITY_INDEX.length - 1 && (
              <text x={x} y={y - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E2E8F0">
                {v}
              </text>
            )}
          </g>
        );
      })}
      <XLabels />
      {hover !== null && (
        <Tooltip
          x={pt(hover).x}
          y={pt(hover).y}
          label={`${YEARS[hover]}`}
          value={`Index ${QUALITY_INDEX[hover]} / 100`}
        />
      )}
    </svg>
  );
}

export default function ImpactChart() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass rounded-3xl p-7">
        <h3 className="text-sm font-semibold text-white">Waterways dredged per year</h3>
        <p className="mt-1 text-xs text-slate-500">Kilometres · 2025 is year-to-date</p>
        <div className="mt-4">
          <DredgingBars />
        </div>
      </div>
      <div className="glass rounded-3xl p-7">
        <h3 className="text-sm font-semibold text-white">Water quality in restored waterways</h3>
        <p className="mt-1 text-xs text-slate-500">Composite index (0–100), independent lab sampling</p>
        <div className="mt-4">
          <QualityLine />
        </div>
      </div>

      {/* screen-reader / no-SVG fallback */}
      <table className="sr-only">
        <caption>Foundation impact by year</caption>
        <thead>
          <tr>
            <th>Year</th>
            <th>Kilometres dredged</th>
            <th>Water quality index (0–100)</th>
          </tr>
        </thead>
        <tbody>
          {YEARS.map((year, i) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{DREDGED_KM[i]}</td>
              <td>{QUALITY_INDEX[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
